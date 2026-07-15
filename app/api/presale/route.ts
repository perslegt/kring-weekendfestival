import { NextResponse } from "next/server";
import {
  campingTypes,
  createSubmission,
  getSubmission,
  ticketTypes,
  updateSubmission,
  type ExtraAnswers,
  type SubmissionPatch,
} from "@/lib/presale-db";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function readJson(request: Request) {
  try {
    return (await request.json()) as unknown;
  } catch {
    return null;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateExtraAnswers(value: unknown): ExtraAnswers | null {
  if (!isObject(value)) return null;

  const allowedKeys = new Set([
    "name",
    "crewName",
    "note",
    "nonRefundableAccepted",
  ]);

  if (Object.keys(value).some((key) => !allowedKeys.has(key))) return null;

  const answers: ExtraAnswers = {};

  for (const key of ["name", "crewName", "note"] as const) {
    if (value[key] !== undefined) {
      if (typeof value[key] !== "string") return null;
      const trimmed = value[key].trim();
      if (!trimmed || trimmed.length > 500) return null;
      answers[key] = trimmed;
    }
  }

  if (value.nonRefundableAccepted !== undefined) {
    if (typeof value.nonRefundableAccepted !== "boolean") return null;
    answers.nonRefundableAccepted = value.nonRefundableAccepted;
  }

  return answers;
}

function handleServerError(error: unknown) {
  console.error("Presale API-fout:", error);
  return errorResponse("Er ging iets mis bij het opslaan. Probeer het later opnieuw.", 500);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";

  if (!uuidPattern.test(id)) {
    return errorResponse("Ongeldige inschrijving.", 400);
  }

  try {
    const submission = await getSubmission(id);

    if (!submission) {
      return errorResponse("Inschrijving niet gevonden.", 404);
    }

    return NextResponse.json({ submission });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function POST(request: Request) {
  const body = await readJson(request);

  if (!isObject(body)) {
    return errorResponse("Ongeldige aanvraag.", 400);
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!emailPattern.test(email) || email.length > 254) {
    return errorResponse("Vul een geldig e-mailadres in.", 400);
  }

  try {
    const submission = await createSubmission(email);
    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PATCH(request: Request) {
  const body = await readJson(request);

  if (!isObject(body)) {
    return errorResponse("Ongeldige aanvraag.", 400);
  }

  const id = typeof body.id === "string" ? body.id : "";

  if (!uuidPattern.test(id)) {
    return errorResponse("Ongeldige inschrijving.", 400);
  }

  const patch: SubmissionPatch = {};

  if (body.ticketType !== undefined) {
    if (!ticketTypes.includes(body.ticketType as (typeof ticketTypes)[number])) {
      return errorResponse("Ongeldig tickettype.", 400);
    }
    patch.ticketType = body.ticketType as (typeof ticketTypes)[number];
  }

  if (body.wantsSleepover !== undefined) {
    if (typeof body.wantsSleepover !== "boolean") {
      return errorResponse("Ongeldige overnachtingskeuze.", 400);
    }
    patch.wantsSleepover = body.wantsSleepover;
  }

  if (body.campingType !== undefined) {
    if (!campingTypes.includes(body.campingType as (typeof campingTypes)[number])) {
      return errorResponse("Ongeldig campingtype.", 400);
    }
    patch.campingType = body.campingType as (typeof campingTypes)[number];
  }

  if (body.extraAnswers !== undefined) {
    const answers = validateExtraAnswers(body.extraAnswers);
    if (!answers) return errorResponse("Ongeldige antwoorden.", 400);
    patch.extraAnswers = answers;
  }

  if (body.paymentConfirmed !== undefined) {
    if (body.paymentConfirmed !== true) {
      return errorResponse("Ongeldige betalingsbevestiging.", 400);
    }
    patch.paymentConfirmedAt = new Date().toISOString();
  }

  if (Object.keys(patch).length === 0) {
    return errorResponse("Geen geldige wijzigingen ontvangen.", 400);
  }

  try {
    const submission = await updateSubmission(id, patch);

    if (!submission) {
      return errorResponse("Inschrijving niet gevonden.", 404);
    }

    return NextResponse.json({ submission });
  } catch (error) {
    return handleServerError(error);
  }
}
