import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type TicketType = "weekend" | "friday" | "saturday" | "sunday";
export type CampingType = "regular" | "silent" | "couples" | "24-hours";

export type PresaleSubmission = {
  id: string;
  email: string;
  ticketType?: TicketType;
  wantsSleepover?: boolean;
  campingType?: CampingType;
  extraAnswers?: {
    name?: string;
    crewName?: string;
    note?: string;
    nonRefundableAccepted?: boolean;
  };
  createdAt: string;
  updatedAt: string;
};

type PresaleDatabase = {
  submissions: PresaleSubmission[];
};

const databaseDir = path.join(process.cwd(), "data");
const databasePath = path.join(databaseDir, "presale-submissions.json");

async function readDatabase(): Promise<PresaleDatabase> {
  try {
    const raw = await readFile(databasePath, "utf8");
    return JSON.parse(raw) as PresaleDatabase;
  } catch {
    return { submissions: [] };
  }
}

async function writeDatabase(database: PresaleDatabase) {
  await mkdir(databaseDir, { recursive: true });
  await writeFile(databasePath, JSON.stringify(database, null, 2), "utf8");
}

export async function createSubmission(email: string) {
  const database = await readDatabase();
  const now = new Date().toISOString();
  const submission: PresaleSubmission = {
    id: crypto.randomUUID(),
    email,
    createdAt: now,
    updatedAt: now,
  };

  database.submissions.push(submission);
  await writeDatabase(database);
  return submission;
}

export async function getSubmission(id: string) {
  const database = await readDatabase();
  return database.submissions.find((submission) => submission.id === id) ?? null;
}

export async function updateSubmission(
  id: string,
  patch: Partial<Omit<PresaleSubmission, "id" | "createdAt" | "updatedAt">>,
) {
  const database = await readDatabase();
  const index = database.submissions.findIndex((submission) => submission.id === id);

  if (index === -1) {
    return null;
  }

  database.submissions[index] = {
    ...database.submissions[index],
    ...patch,
    extraAnswers: {
      ...database.submissions[index].extraAnswers,
      ...patch.extraAnswers,
    },
    updatedAt: new Date().toISOString(),
  };

  await writeDatabase(database);
  return database.submissions[index];
}
