"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { PresaleSubmission, TicketType } from "@/lib/presale-db";

const ticketConfig: Record<
  TicketType,
  { label: string; price: number; qrSrc: string }
> = {
  weekend: {
    label: "WEEKEND TICKET",
    price: 160,
    qrSrc: "/weekend-tikkie.jpg",
  },
  friday: {
    label: "VRIJDAG TICKET",
    price: 85,
    qrSrc: "/dag-tikkie.jpg",
  },
  saturday: {
    label: "ZATERDAG TICKET",
    price: 85,
    qrSrc: "/dag-tikkie.jpg",
  },
  sunday: {
    label: "ZONDAG TICKET",
    price: 85,
    qrSrc: "/dag-tikkie.jpg",
  },
};

export default function PaymentStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupId = searchParams.get("signup");
  const [submission, setSubmission] = useState<PresaleSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!signupId) {
      router.replace("/#presale");
      return;
    }

    fetch(`/api/presale?id=${signupId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Aanmelding niet gevonden");
        return response.json();
      })
      .then((data) => {
        const loadedSubmission = data.submission as PresaleSubmission | null;

        if (!loadedSubmission?.ticketType) {
          router.replace(`/aanmelden/ticket?signup=${signupId}`);
          return;
        }

        setSubmission(loadedSubmission);
      })
      .catch(() => router.replace("/#presale"))
      .finally(() => setLoading(false));
  }, [router, signupId]);

  const selectedTicket = submission?.ticketType
    ? ticketConfig[submission.ticketType]
    : null;
  const ticketLabel = selectedTicket?.label ?? "TICKET NIET GEVONDEN";

  if (loading || !selectedTicket) {
    return (
      <main className="site-background flex min-h-screen items-center justify-center px-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-acid">
          Ticketkeuze laden...
        </p>
      </main>
    );
  }

  return (
    <main className="site-background min-h-screen px-5 py-20">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
            Betalen
          </span>
          <h1 className="section-heading glow-magenta mt-3 text-4xl text-bone sm:text-5xl">
            Scan je QR-code
          </h1>
          <p className="mt-5 max-w-2xl font-body text-bone/70">
            Deze betaalcode hoort bij je gekozen ticket. Na betaling staat je
            aanmelding met alle keuzes opgeslagen.
          </p>

          <dl className="mt-8 grid max-w-xl gap-3 font-mono text-xs uppercase tracking-[0.18em] text-bone/75">
            <div className="flex justify-between border-b border-bone/15 pb-3">
              <dt>E-mail</dt>
              <dd className="text-right text-acid">
                {loading ? "Laden..." : submission?.email ?? "Onbekend"}
              </dd>
            </div>
            <div className="flex justify-between border-b border-bone/15 pb-3">
              <dt>Ticket</dt>
              <dd className="text-right text-acid">{ticketLabel}</dd>
            </div>
            <div className="flex justify-between border-b border-bone/15 pb-3">
              <dt>Prijs</dt>
              <dd className="text-right text-acid">
                {selectedTicket
                  ? new Intl.NumberFormat("nl-NL", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    }).format(selectedTicket.price)
                  : "—"}
              </dd>
            </div>
            {submission?.campingType && (
              <div className="flex justify-between border-b border-bone/15 pb-3">
                <dt>Camping</dt>
                <dd className="text-right text-acid">{submission.campingType}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="glow-box-violet flex flex-col items-center justify-center gap-6 border border-violet/40 bg-ink px-6 py-10">
          <span className="stamp font-mono text-xs text-bone">
            {ticketLabel}
          </span>
          {selectedTicket ? (
            <>
              <div className="relative aspect-square w-full max-w-sm overflow-hidden bg-white">
                <Image
                  src={selectedTicket.qrSrc}
                  alt={`Betaalcode van €${selectedTicket.price} voor ${ticketLabel}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 384px, calc(100vw - 88px)"
                  className="object-contain"
                />
              </div>
              <span className="font-display text-3xl text-bone">
                €{selectedTicket.price}
              </span>
            </>
          ) : (
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-acid">
              Kies eerst een ticket
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
