"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, Tent, Ticket } from "lucide-react";
import type { CampingType, TicketType } from "@/lib/presale-db";

type Option = {
  value: string;
  title: string;
  text: string;
};

const ticketOptions: Option[] = [
  {
    value: "weekend",
    title: "Weekend ticket",
    text: "Vrijdag tot en met zondag, inclusief toegang tot de volledige weekendervaring.",
  },
  {
    value: "friday",
    title: "Vrijdag ticket",
    text: "Een losse dag voor de vrijdag.",
  },
  {
    value: "saturday",
    title: "Zaterdag ticket",
    text: "Een losse dag voor de zaterdag.",
  },
  {
    value: "sunday",
    title: "Zondag ticket",
    text: "Een losse dag voor de zondag.",
  },
];

const campingOptions: Option[] = [
  {
    value: "regular",
    title: "Regular Camping",
    text: "Dicht bij het terrein, simpel en gezellig met je crew.",
  },
  {
    value: "silent",
    title: "Silent Camping",
    text: "Rustiger slapen na het feest.",
  },
  {
    value: "couples",
    title: "Couples Camping",
    text: "Meer privacy voor jou en je plus-een.",
  },
  {
    value: "24-hours",
    title: "24 Hours Camping",
    text: "Voor wie zo dicht mogelijk bij de actie wil blijven.",
  },
];

async function saveStep(id: string, payload: Record<string, unknown>) {
  const response = await fetch("/api/presale", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...payload }),
  });

  if (!response.ok) {
    throw new Error("Opslaan is mislukt.");
  }
}

function StepShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="site-background min-h-screen px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
          {eyebrow}
        </span>
        <h1 className="section-heading glow-magenta mt-3 text-4xl text-bone sm:text-5xl">
          {title}
        </h1>
        <div className="mt-10">{children}</div>
      </div>
    </main>
  );
}

function useSignupId() {
  const searchParams = useSearchParams();
  return searchParams.get("signup") ?? "";
}

export function TicketStep() {
  const router = useRouter();
  const signupId = useSignupId();
  const [selected, setSelected] = useState<TicketType | "">("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signupId || !selected) return;

    try {
      await saveStep(signupId, { ticketType: selected });
      const nextStep = selected === "weekend" ? "camping" : "slapen";
      router.push(`/aanmelden/${nextStep}?signup=${signupId}`);
    } catch {
      setError("We konden je keuze niet opslaan. Probeer het opnieuw.");
    }
  }

  return (
    <StepShell eyebrow="Stap 1" title="Kies je ticket">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {ticketOptions.map((option) => (
            <label
              key={option.value}
              className="ticket-stub flex cursor-pointer gap-4 p-5 transition-colors hover:bg-bone/10"
            >
              <input
                type="radio"
                name="ticket"
                value={option.value}
                checked={selected === option.value}
                onChange={() => setSelected(option.value as TicketType)}
                className="mt-1 h-4 w-4 accent-magenta"
                required
              />
              <span>
                <Ticket className="mb-4 h-6 w-6 text-acid" aria-hidden="true" />
                <span className="block font-display text-2xl text-bone">
                  {option.title}
                </span>
                <span className="mt-2 block font-body text-sm leading-relaxed text-bone/65">
                  {option.text}
                </span>
              </span>
            </label>
          ))}
        </div>
        {error && <p className="font-mono text-xs uppercase text-acid">{error}</p>}
        <button className="glow-box-magenta inline-flex w-fit items-center gap-3 border-2 border-magenta bg-magenta px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.15em] text-void">
          Doorgaan
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </StepShell>
  );
}

export function SleepoverStep() {
  const router = useRouter();
  const signupId = useSignupId();
  const [wantsSleepover, setWantsSleepover] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signupId || wantsSleepover === null) return;

    try {
      await saveStep(signupId, { wantsSleepover });
      router.push(`/aanmelden/${wantsSleepover ? "camping" : "vragen"}?signup=${signupId}`);
    } catch {
      setError("We konden je keuze niet opslaan. Probeer het opnieuw.");
    }
  }

  return (
    <StepShell eyebrow="Stap 2" title="Blijf je slapen?">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { value: true, title: "Ja, ik blijf slapen", text: "Je kiest hierna je camping." },
            { value: false, title: "Nee, alleen een dagje", text: "Je gaat direct door naar de laatste vragen." },
          ].map((option) => (
            <label
              key={option.title}
              className="ticket-stub flex cursor-pointer gap-4 p-5 transition-colors hover:bg-bone/10"
            >
              <input
                type="radio"
                name="sleepover"
                checked={wantsSleepover === option.value}
                onChange={() => setWantsSleepover(option.value)}
                className="mt-1 h-4 w-4 accent-magenta"
                required
              />
              <span>
                <span className="block font-display text-2xl text-bone">
                  {option.title}
                </span>
                <span className="mt-2 block font-body text-sm leading-relaxed text-bone/65">
                  {option.text}
                </span>
              </span>
            </label>
          ))}
        </div>
        {error && <p className="font-mono text-xs uppercase text-acid">{error}</p>}
        <button className="glow-box-magenta inline-flex w-fit items-center gap-3 border-2 border-magenta bg-magenta px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.15em] text-void">
          Doorgaan
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </StepShell>
  );
}

export function CampingStep() {
  const router = useRouter();
  const signupId = useSignupId();
  const [selected, setSelected] = useState<CampingType | "">("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signupId || !selected) return;

    try {
      await saveStep(signupId, { campingType: selected });
      router.push(`/aanmelden/vragen?signup=${signupId}`);
    } catch {
      setError("We konden je campingkeuze niet opslaan. Probeer het opnieuw.");
    }
  }

  return (
    <StepShell eyebrow="Camping" title="Kies je camping">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {campingOptions.map((option) => (
            <label
              key={option.value}
              className="ticket-stub flex cursor-pointer gap-4 p-5 transition-colors hover:bg-bone/10"
            >
              <input
                type="radio"
                name="camping"
                value={option.value}
                checked={selected === option.value}
                onChange={() => setSelected(option.value as CampingType)}
                className="mt-1 h-4 w-4 accent-magenta"
                required
              />
              <span>
                <Tent className="mb-4 h-6 w-6 text-acid" aria-hidden="true" />
                <span className="block font-display text-2xl text-bone">
                  {option.title}
                </span>
                <span className="mt-2 block font-body text-sm leading-relaxed text-bone/65">
                  {option.text}
                </span>
              </span>
            </label>
          ))}
        </div>
        {error && <p className="font-mono text-xs uppercase text-acid">{error}</p>}
        <button className="glow-box-magenta inline-flex w-fit items-center gap-3 border-2 border-magenta bg-magenta px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.15em] text-void">
          Doorgaan
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </StepShell>
  );
}

export function QuestionsStep() {
  const router = useRouter();
  const signupId = useSignupId();
  const [crewName, setCrewName] = useState("");
  const [note, setNote] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signupId || !accepted) return;

    try {
      await saveStep(signupId, {
        extraAnswers: {
          crewName,
          note,
          nonRefundableAccepted: accepted,
        },
      });
      router.push(`/aanmelden/betalen?signup=${signupId}`);
    } catch {
      setError("We konden je antwoorden niet opslaan. Probeer het opnieuw.");
    }
  }

  return (
    <StepShell eyebrow="Laatste stap" title="Nog een paar vragen">
      <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-5">
        <label className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.18em] text-bone">
          Crewnaam
          <input
            value={crewName}
            onChange={(e) => setCrewName(e.target.value)}
            className="border border-bone/20 bg-void px-4 py-3 font-body text-base normal-case tracking-normal text-bone focus:border-magenta focus:outline-none"
            placeholder="Naam van je groep"
          />
        </label>
        <label className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.18em] text-bone">
          Opmerking
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-32 border border-bone/20 bg-void px-4 py-3 font-body text-base normal-case tracking-normal text-bone focus:border-magenta focus:outline-none"
            placeholder="Extra vraag volgt later, deze ruimte is alvast voorbereid."
          />
        </label>
        <label className="ticket-stub flex cursor-pointer gap-4 p-5 font-body text-bone">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-5 w-5 accent-magenta"
            required
          />
          <span>
            Je bent je ervan bewust dat je dit bedrag niet terug krijgt?
          </span>
        </label>
        {error && <p className="font-mono text-xs uppercase text-acid">{error}</p>}
        <button className="glow-box-magenta inline-flex w-fit items-center gap-3 border-2 border-magenta bg-magenta px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.15em] text-void">
          <Check className="h-5 w-5" aria-hidden="true" />
          Akkoord en doorgaan
        </button>
      </form>
    </StepShell>
  );
}
