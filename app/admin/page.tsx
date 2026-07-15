import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllSubmissions,
  type PresaleSubmission,
} from "@/lib/presale-db";
import { ActionControls, ConfirmationCheckbox } from "./RegistrationActions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Registraties | Kring Weekendfestival",
  robots: { index: false, follow: false },
};

const ticketLabels = {
  weekend: "Weekend",
  friday: "Vrijdag",
  saturday: "Zaterdag",
  sunday: "Zondag",
} as const;

const campingLabels = {
  regular: "Regulier",
  silent: "Stil",
  couples: "Koppels",
  "24-hours": "24-uurs",
} as const;

const columns = [
  ["createdAt", "Aangemeld"],
  ["name", "Naam"],
  ["email", "E-mail"],
  ["ticketType", "Ticket"],
  ["wantsSleepover", "Slapen"],
  ["campingType", "Camping"],
  ["paymentConfirmedAt", "Betaling"],
  ["confirmed", "Confirmed"],
] as const;

type SortField = (typeof columns)[number][0];
type SortDirection = "asc" | "desc";

const sortFields = new Set<SortField>(columns.map(([field]) => field));

function sortValue(item: PresaleSubmission, field: SortField) {
  switch (field) {
    case "name": return item.extraAnswers?.name ?? "";
    case "wantsSleepover": return item.wantsSleepover ? 1 : 0;
    default: return item[field] ?? "";
  }
}

function sortSubmissions(
  submissions: PresaleSubmission[],
  field: SortField,
  direction: SortDirection,
) {
  return [...submissions].sort((left, right) => {
    const leftValue = sortValue(left, field);
    const rightValue = sortValue(right, field);
    const comparison = typeof leftValue === "number" && typeof rightValue === "number"
      ? leftValue - rightValue
      : String(leftValue).localeCompare(String(rightValue), "nl", {
          numeric: true,
          sensitivity: "base",
        });
    return direction === "asc" ? comparison : -comparison;
  });
}

async function loadSubmissions() {
  return { submissions: await getAllSubmissions(), source: "JSON" };
}

function date(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(new Date(value));
}

function value(value: string | boolean | undefined) {
  if (value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Ja" : "Nee";
  return value;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { sort?: string; direction?: string };
}) {
  const result = await loadSubmissions();
  const sort = sortFields.has(searchParams.sort as SortField)
    ? searchParams.sort as SortField
    : "createdAt";
  const direction: SortDirection = searchParams.direction === "asc" ? "asc" : "desc";
  const submissions = sortSubmissions(result.submissions, sort, direction);
  const { source } = result;
  const ticketStats = [
    ["Mensen", submissions.length],
    ["Weekendtickets", submissions.filter((item) => item.ticketType === "weekend").length],
    ["Vrijdagtickets", submissions.filter((item) => item.ticketType === "friday").length],
    ["Zaterdagtickets", submissions.filter((item) => item.ticketType === "saturday").length],
  ] as const;

  return (
    <main className="min-h-screen bg-[#f5efe3] px-4 py-8 text-void sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-magenta">
              Admin · bron: {source}
            </p>
            <h1 className="font-display text-4xl uppercase sm:text-6xl">Registraties</h1>
          </div>
          <p className="font-mono text-sm text-concrete">Laatst geladen: {date(new Date().toISOString())}</p>
        </header>

        <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Samenvatting">
          {ticketStats.map(([label, count]) => (
            <div key={label} className="border-2 border-void bg-bone p-5 shadow-[5px_5px_0_#062d47]">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-concrete">{label}</p>
              <p className="mt-1 font-display text-4xl text-magenta">{count}</p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden border-2 border-void bg-white shadow-[7px_7px_0_#062d47]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1450px] border-collapse text-left text-sm">
              <thead className="bg-void font-mono text-xs uppercase tracking-wider text-bone">
                <tr>
                  {columns.map(([field, heading]) => (
                    <th key={field} className="whitespace-nowrap p-0">
                      <Link
                        href={{
                          pathname: "/admin",
                          query: {
                            sort: field,
                            direction: sort === field && direction === "asc" ? "desc" : "asc",
                          },
                        }}
                        className="flex items-center gap-2 px-4 py-3 transition-colors hover:bg-ink focus-visible:outline-offset-[-3px]"
                      >
                        {heading}
                        <span aria-hidden="true" className={sort === field ? "text-acid" : "text-bone/40"}>
                          {sort === field ? (direction === "asc" ? "▲" : "▼") : "↕"}
                        </span>
                      </Link>
                    </th>
                  ))}
                  <th className="whitespace-nowrap px-4 py-3">Acties</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((item) => (
                  <tr key={item.id} className="border-b border-[#d8cbb6] align-top odd:bg-white even:bg-[#fbf7f0] hover:bg-[#fff1d2]">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{date(item.createdAt)}</td>
                    <td className="px-4 py-3 font-semibold">{value(item.extraAnswers?.name)}</td>
                    <td className="px-4 py-3"><a className="underline decoration-magenta decoration-2 underline-offset-2" href={`mailto:${item.email}`}>{item.email}</a></td>
                    <td className="px-4 py-3">{item.ticketType ? ticketLabels[item.ticketType] : "—"}</td>
                    <td className="px-4 py-3">{value(item.wantsSleepover)}</td>
                    <td className="px-4 py-3">{item.campingType ? campingLabels[item.campingType] : "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3">{item.paymentConfirmedAt ? date(item.paymentConfirmedAt) : "Niet bevestigd"}</td>
                    <td className="px-4 py-3">
                      <ConfirmationCheckbox id={item.id} confirmed={item.confirmed ?? false} />
                    </td>
                    <td className="px-4 py-3">
                      <ActionControls id={item.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {submissions.length === 0 && (
            <p className="p-10 text-center font-mono text-concrete">Nog geen registraties gevonden.</p>
          )}
        </section>
      </div>
    </main>
  );
}
