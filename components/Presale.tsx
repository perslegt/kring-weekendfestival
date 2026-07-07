"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ticket, ShieldCheck, Send } from "lucide-react";
import QRPlaceholder from "./QRPlaceholder";

const steps = [
  {
    icon: Send,
    title: "Meld je aan",
    text: "Laat je e-mailadres achter of scan de QR-code zodra de presale live gaat.",
  },
  {
    icon: Ticket,
    title: "Betaal de aanbetaling",
    text: "Je betaalt een kleine aanbetaling om je plek vast te leggen op het terrein.",
  },
  {
    icon: ShieldCheck,
    title: "Je plek is zeker",
    text: "Je ticket voor het volledige weekendfestival ligt vast — geen sold-out stress achteraf.",
  },
];

export default function Presale() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setError("");

    const response = await fetch("/api/presale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      setError("Aanmelden lukte niet. Probeer het opnieuw.");
      return;
    }

    const data = await response.json();
    router.push(`/aanmelden/ticket?signup=${data.submission.id}`);
  }

  return (
    <section id="presale" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-magenta">
            Presale
          </span>
          <h2 className="section-heading glow-magenta text-4xl text-bone sm:text-5xl">
            Zeker van je plek.
            <br />
            Geen twijfel.
          </h2>
          <p className="mt-4 max-w-2xl font-body text-bone/70">
            Meld je aan voor de presale en je bent verzekerd van een ticket
            voor het volledige Kring Weekendfestival. Geen wachtrij, geen
            gok of het lukt — jouw weekend staat vast voordat de reguliere
            verkoop überhaupt begint.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Stappen + formulier */}
          <div className="flex flex-col gap-8">
            <ol className="grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="ticket-stub flex flex-col gap-3 p-5"
                >
                  <step.icon className="h-6 w-6 text-acid" aria-hidden="true" />
                  <span className="font-mono text-[11px] tracking-[0.2em] text-concrete">
                    STAP {i + 1}
                  </span>
                  <h3 className="font-display text-lg tracking-wide text-bone">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-bone/65">{step.text}</p>
                </li>
              ))}
            </ol>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 border border-bone/15 bg-ink p-6 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="presale-email" className="sr-only">
                E-mailadres
              </label>
              <input
                id="presale-email"
                type="email"
                required
                placeholder="jouw@email.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full flex-1 border border-bone/20 bg-void px-4 py-3 font-mono text-sm text-bone placeholder:text-bone/30 focus:border-magenta focus:outline-none"
              />
              <button
                type="submit"
                className="glow-box-magenta whitespace-nowrap border-2 border-magenta bg-magenta px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.15em] text-void transition-colors hover:bg-transparent hover:text-magenta"
              >
                Meld je aan
              </button>
            </form>
            {error && (
              <p
                role="alert"
                className="font-mono text-xs uppercase tracking-[0.2em] text-acid"
              >
                {error}
              </p>
            )}

            <p className="max-w-xl font-mono text-[11px] leading-relaxed text-concrete">
              De presale-aanbetaling is niet restitueerbaar, omdat dit dient
              als aanbetaling voor het festivalterrein/accommodatie.
            </p>
          </div>

          {/* QR blok */}
          <div className="glow-box-violet flex flex-col items-center justify-center gap-6 border border-violet/40 bg-ink px-6 py-10">
            <span className="stamp font-mono text-xs text-violet">
              LIMITED PRESALE
            </span>
            <QRPlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
}
