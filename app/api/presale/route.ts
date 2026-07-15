import { NextResponse } from "next/server";
import { createSubmission, getSubmission, updateSubmission } from "@/lib/presale-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Inschrijving ontbreekt." }, { status: 400 });
  }

  const submission = await getSubmission(id);

  if (!submission) {
    return NextResponse.json({ error: "Inschrijving niet gevonden." }, { status: 404 });
  }

  return NextResponse.json({ submission });
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ error: "E-mailadres is verplicht." }, { status: 400 });
  }

  const submission = await createSubmission(email);
  return NextResponse.json({ submission }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const id = typeof body.id === "string" ? body.id : "";

  if (!id) {
    return NextResponse.json({ error: "Inschrijving ontbreekt." }, { status: 400 });
  }

  const patch: Parameters<typeof updateSubmission>[1] = {};

  if (Object.prototype.hasOwnProperty.call(body, "ticketType")) {
    patch.ticketType = body.ticketType;
  }
  if (Object.prototype.hasOwnProperty.call(body, "wantsSleepover")) {
    patch.wantsSleepover = body.wantsSleepover;
  }
  if (Object.prototype.hasOwnProperty.call(body, "campingType")) {
    patch.campingType = body.campingType;
  }
  if (Object.prototype.hasOwnProperty.call(body, "extraAnswers")) {
    patch.extraAnswers = body.extraAnswers;
  }

  const submission = await updateSubmission(id, patch);

  if (!submission) {
    return NextResponse.json({ error: "Inschrijving niet gevonden." }, { status: 404 });
  }

  return NextResponse.json({ submission });
}
