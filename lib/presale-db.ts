import "server-only";

import {
  BlobNotFoundError,
  BlobPreconditionFailedError,
  del,
  get,
  list,
  put,
} from "@vercel/blob";

export const ticketTypes = ["weekend", "friday", "saturday", "sunday"] as const;
export const campingTypes = ["regular", "silent", "couples", "24-hours"] as const;

export type TicketType = (typeof ticketTypes)[number];
export type CampingType = (typeof campingTypes)[number];

export type ExtraAnswers = {
  name?: string;
  crewName?: string;
  note?: string;
  nonRefundableAccepted?: boolean;
};

export type PresaleSubmission = {
  id: string;
  email: string;
  ticketType?: TicketType;
  wantsSleepover?: boolean;
  campingType?: CampingType;
  paymentConfirmedAt?: string;
  confirmed: boolean;
  extraAnswers?: ExtraAnswers;
  createdAt: string;
  updatedAt: string;
};

export type SubmissionPatch = Partial<
  Omit<PresaleSubmission, "id" | "email" | "createdAt" | "updatedAt">
>;

const PRESALE_PREFIX = "presale/";
const JSON_CONTENT_TYPE = "application/json; charset=utf-8";
const MAX_UPDATE_ATTEMPTS = 3;

export class PresaleDatabaseError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "PresaleDatabaseError";
  }
}

function pathname(id: string) {
  return `${PRESALE_PREFIX}${id}.json`;
}

function parseSubmission(value: string, source: string): PresaleSubmission {
  try {
    const submission = JSON.parse(value) as PresaleSubmission;

    if (
      !submission ||
      typeof submission !== "object" ||
      typeof submission.id !== "string" ||
      typeof submission.email !== "string" ||
      typeof submission.createdAt !== "string" ||
      typeof submission.updatedAt !== "string"
    ) {
      throw new Error("Het JSON-record heeft niet het verwachte formaat.");
    }

    return { ...submission, confirmed: submission.confirmed ?? false };
  } catch (error) {
    throw new PresaleDatabaseError(`Registratie ${source} bevat ongeldige JSON.`, error);
  }
}

async function readSubmission(id: string) {
  const result = await get(pathname(id), { access: "private", useCache: false });
  if (!result) return null;

  return {
    submission: parseSubmission(await new Response(result.stream).text(), pathname(id)),
    etag: result.blob.etag,
  };
}

async function writeSubmission(
  submission: PresaleSubmission,
  options: { overwrite: boolean; etag?: string },
) {
  await put(pathname(submission.id), `${JSON.stringify(submission, null, 2)}\n`, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: options.overwrite,
    contentType: JSON_CONTENT_TYPE,
    cacheControlMaxAge: 60,
    ifMatch: options.etag,
  });
}

export async function createSubmission(email: string) {
  const now = new Date().toISOString();
  const submission: PresaleSubmission = {
    id: crypto.randomUUID(),
    email,
    confirmed: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await writeSubmission(submission, { overwrite: false });
    return submission;
  } catch (error) {
    throw new PresaleDatabaseError("Registratie opslaan in Blob Storage is mislukt.", error);
  }
}

export async function getSubmission(id: string) {
  try {
    return (await readSubmission(id))?.submission ?? null;
  } catch (error) {
    if (error instanceof PresaleDatabaseError) throw error;
    if (error instanceof BlobNotFoundError) return null;
    throw new PresaleDatabaseError("Registratie uit Blob Storage lezen is mislukt.", error);
  }
}

export async function getAllSubmissions() {
  try {
    const blobPathnames: string[] = [];
    let cursor: string | undefined;

    do {
      const page = await list({ prefix: PRESALE_PREFIX, limit: 1000, cursor });
      blobPathnames.push(
        ...page.blobs
          .map((blob) => blob.pathname)
          .filter((name) => name.endsWith(".json")),
      );
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);

    const submissions: PresaleSubmission[] = [];
    for (let offset = 0; offset < blobPathnames.length; offset += 20) {
      const batch = blobPathnames.slice(offset, offset + 20);
      const records = await Promise.all(
        batch.map(async (blobPathname) => {
          const result = await get(blobPathname, { access: "private", useCache: false });
          if (!result) return null;
          return parseSubmission(await new Response(result.stream).text(), blobPathname);
        }),
      );
      submissions.push(...records.filter((record): record is PresaleSubmission => record !== null));
    }

    return submissions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (error) {
    if (error instanceof PresaleDatabaseError) throw error;
    throw new PresaleDatabaseError("Registraties uit Blob Storage lezen is mislukt.", error);
  }
}

async function changeSubmission(
  id: string,
  change: (submission: PresaleSubmission) => void,
) {
  for (let attempt = 1; attempt <= MAX_UPDATE_ATTEMPTS; attempt += 1) {
    const current = await readSubmission(id);
    if (!current) return null;

    change(current.submission);
    current.submission.updatedAt = new Date().toISOString();

    try {
      await writeSubmission(current.submission, { overwrite: true, etag: current.etag });
      return current.submission;
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError && attempt < MAX_UPDATE_ATTEMPTS) {
        continue;
      }
      throw error;
    }
  }

  return null;
}

export async function setSubmissionConfirmed(id: string, confirmed: boolean) {
  try {
    const submission = await changeSubmission(id, (current) => {
      current.confirmed = confirmed;
    });
    if (!submission) throw new PresaleDatabaseError("Registratie niet gevonden.");
  } catch (error) {
    if (error instanceof PresaleDatabaseError) throw error;
    throw new PresaleDatabaseError("Registratie bijwerken in Blob Storage is mislukt.", error);
  }
}

export async function deleteSubmission(id: string) {
  try {
    const current = await readSubmission(id);
    if (!current) throw new PresaleDatabaseError("Registratie niet gevonden.");
    await del(pathname(id), { ifMatch: current.etag });
  } catch (error) {
    if (error instanceof PresaleDatabaseError) throw error;
    throw new PresaleDatabaseError("Registratie verwijderen uit Blob Storage is mislukt.", error);
  }
}

export async function updateSubmission(id: string, patch: SubmissionPatch) {
  try {
    return await changeSubmission(id, (submission) => {
      Object.assign(submission, patch);
    });
  } catch (error) {
    throw new PresaleDatabaseError("Registratie bijwerken in Blob Storage is mislukt.", error);
  }
}
