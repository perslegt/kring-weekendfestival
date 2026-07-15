"use client";

import { useFormStatus } from "react-dom";
import { removeSubmission, saveConfirmation } from "./actions";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-void px-3 py-2 font-mono text-xs font-bold uppercase text-bone transition-colors hover:bg-ink disabled:opacity-50"
    >
      {pending ? "Opslaan…" : "Opslaan"}
    </button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="border-2 border-magenta px-3 py-1.5 font-mono text-xs font-bold uppercase text-magenta transition-colors hover:bg-magenta hover:text-white disabled:opacity-50"
    >
      {pending ? "Verwijderen…" : "Verwijder"}
    </button>
  );
}

export function ConfirmationCheckbox({
  id,
  confirmed,
}: {
  id: string;
  confirmed: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 font-mono text-xs font-bold uppercase">
          <input
            type="checkbox"
            name="confirmed"
            form={`confirmation-${id}`}
            defaultChecked={confirmed}
            className="h-5 w-5 accent-[#e72f68]"
          />
          Klopt
    </label>
  );
}

export function ActionControls({ id }: { id: string }) {
  return (
    <div className="flex items-center gap-2">
      <form id={`confirmation-${id}`} action={saveConfirmation}>
        <input type="hidden" name="id" value={id} />
        <SaveButton />
      </form>
      <form
        action={removeSubmission}
        onSubmit={(event) => {
          if (!window.confirm("Weet je zeker dat je deze registratie wilt verwijderen? Dit kan niet ongedaan worden gemaakt.")) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <DeleteButton />
      </form>
    </div>
  );
}
