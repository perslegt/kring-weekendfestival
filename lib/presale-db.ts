import { getSupabaseAdmin } from "@/lib/supabase-admin";

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

type SubmissionRow = {
  id: string;
  email: string;
  ticket_type: TicketType | null;
  wants_sleepover: boolean | null;
  camping_type: CampingType | null;
  payment_confirmed_at: string | null;
  confirmed: boolean;
  extra_answers: ExtraAnswers | null;
  created_at: string;
  updated_at: string;
};

export class PresaleDatabaseError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "PresaleDatabaseError";
  }
}

function mapSubmission(row: SubmissionRow): PresaleSubmission {
  return {
    id: row.id,
    email: row.email,
    ...(row.ticket_type ? { ticketType: row.ticket_type } : {}),
    ...(row.wants_sleepover !== null ? { wantsSleepover: row.wants_sleepover } : {}),
    ...(row.camping_type ? { campingType: row.camping_type } : {}),
    ...(row.payment_confirmed_at
      ? { paymentConfirmedAt: row.payment_confirmed_at }
      : {}),
    confirmed: row.confirmed ?? false,
    ...(row.extra_answers ? { extraAnswers: row.extra_answers } : {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createSubmission(email: string) {
  const id = crypto.randomUUID();
  const { data, error } = await getSupabaseAdmin()
    .from("presale_submissions")
    .insert({ id, email })
    .select("*")
    .single<SubmissionRow>();

  if (error || !data) {
    throw new PresaleDatabaseError("Aanmelding aanmaken is mislukt.", error);
  }

  return mapSubmission(data);
}

export async function getSubmission(id: string) {
  const { data, error } = await getSupabaseAdmin()
    .from("presale_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle<SubmissionRow>();

  if (error) {
    throw new PresaleDatabaseError("Aanmelding ophalen is mislukt.", error);
  }

  return data ? mapSubmission(data) : null;
}

export async function getAllSubmissions() {
  const { data, error } = await getSupabaseAdmin()
    .from("presale_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<SubmissionRow[]>();

  if (error) {
    throw new PresaleDatabaseError("Aanmeldingen ophalen is mislukt.", error);
  }

  return (data ?? []).map(mapSubmission);
}

export async function setSubmissionConfirmed(id: string, confirmed: boolean) {
  const { error } = await getSupabaseAdmin()
    .from("presale_submissions")
    .update({ confirmed })
    .eq("id", id);

  if (error) {
    throw new PresaleDatabaseError("Bevestiging opslaan is mislukt.", error);
  }
}

export async function deleteSubmission(id: string) {
  const { error } = await getSupabaseAdmin()
    .from("presale_submissions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new PresaleDatabaseError("Aanmelding verwijderen is mislukt.", error);
  }
}

export async function updateSubmission(id: string, patch: SubmissionPatch) {
  const databasePatch: Record<string, unknown> = {};

  if (patch.ticketType !== undefined) databasePatch.ticket_type = patch.ticketType;
  if (patch.wantsSleepover !== undefined) {
    databasePatch.wants_sleepover = patch.wantsSleepover;
  }
  if (patch.campingType !== undefined) databasePatch.camping_type = patch.campingType;
  if (patch.paymentConfirmedAt !== undefined) {
    databasePatch.payment_confirmed_at = patch.paymentConfirmedAt;
  }
  if (patch.extraAnswers !== undefined) databasePatch.extra_answers = patch.extraAnswers;

  const { data, error } = await getSupabaseAdmin()
    .from("presale_submissions")
    .update(databasePatch)
    .eq("id", id)
    .select("*")
    .maybeSingle<SubmissionRow>();

  if (error) {
    throw new PresaleDatabaseError("Aanmelding bijwerken is mislukt.", error);
  }

  return data ? mapSubmission(data) : null;
}
