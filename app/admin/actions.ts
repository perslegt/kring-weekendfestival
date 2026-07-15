"use server";

import { revalidatePath } from "next/cache";
import {
  deleteSubmission,
  setSubmissionConfirmed,
} from "@/lib/presale-db";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function submissionId(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string" || !uuidPattern.test(id)) {
    throw new Error("Ongeldige registratie.");
  }
  return id;
}

export async function saveConfirmation(formData: FormData) {
  await setSubmissionConfirmed(
    submissionId(formData),
    formData.get("confirmed") === "on",
  );
  revalidatePath("/admin");
}

export async function removeSubmission(formData: FormData) {
  await deleteSubmission(submissionId(formData));
  revalidatePath("/admin");
}
