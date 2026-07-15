import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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

type PresaleData = { submissions: PresaleSubmission[] };

const dataPath = path.join(process.cwd(), "data", "presale-submissions.json");
let writeQueue: Promise<void> = Promise.resolve();

export class PresaleDatabaseError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "PresaleDatabaseError";
  }
}

async function readData(): Promise<PresaleData> {
  try {
    const parsed = JSON.parse(await readFile(dataPath, "utf8")) as PresaleData;
    const submissions = Array.isArray(parsed.submissions) ? parsed.submissions : [];
    return {
      submissions: submissions.map((submission) => ({
        ...submission,
        confirmed: submission.confirmed ?? false,
      })),
    };
  } catch (error) {
    throw new PresaleDatabaseError("Registraties uit JSON lezen is mislukt.", error);
  }
}

async function writeData(data: PresaleData) {
  await writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function updateData<T>(change: (data: PresaleData) => Promise<T> | T): Promise<T> {
  const operation = writeQueue.then(async () => {
    const data = await readData();
    const result = await change(data);
    await writeData(data);
    return result;
  });
  writeQueue = operation.then(() => undefined, () => undefined);
  return operation;
}

export async function createSubmission(email: string) {
  return updateData((data) => {
    const now = new Date().toISOString();
    const submission: PresaleSubmission = {
      id: crypto.randomUUID(),
      email,
      confirmed: false,
      createdAt: now,
      updatedAt: now,
    };
    data.submissions.push(submission);
    return submission;
  });
}

export async function getSubmission(id: string) {
  const data = await readData();
  return data.submissions.find((submission) => submission.id === id) ?? null;
}

export async function getAllSubmissions() {
  const data = await readData();
  return data.submissions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function setSubmissionConfirmed(id: string, confirmed: boolean) {
  return updateData((data) => {
    const submission = data.submissions.find((item) => item.id === id);
    if (!submission) throw new PresaleDatabaseError("Registratie niet gevonden.");
    submission.confirmed = confirmed;
    submission.updatedAt = new Date().toISOString();
  });
}

export async function deleteSubmission(id: string) {
  return updateData((data) => {
    const index = data.submissions.findIndex((item) => item.id === id);
    if (index === -1) throw new PresaleDatabaseError("Registratie niet gevonden.");
    data.submissions.splice(index, 1);
  });
}

export async function updateSubmission(id: string, patch: SubmissionPatch) {
  return updateData((data) => {
    const submission = data.submissions.find((item) => item.id === id);
    if (!submission) return null;
    Object.assign(submission, patch, { updatedAt: new Date().toISOString() });
    return submission;
  });
}
