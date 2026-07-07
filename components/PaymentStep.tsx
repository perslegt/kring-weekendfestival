"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QRPlaceholder from "./QRPlaceholder";
import type { PresaleSubmission } from "@/lib/presale-db";

const ticketLabels = {
  weekend: "WEEKEND TICKET",
  friday: "VRIJDAG TICKET",
  saturday: "ZATERDAG TICKET",
  sunday: "ZONDAG TICKET",
};

export default function PaymentStep() {
  const searchParams = useSearchParams();
  const signupId = searchParams.get("signup");
  const [submission, setSubmission] = useState<PresaleSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!signupId) return;

    fetch(`/api/presale?id=${signupId}`)
      .then((response) => response.json())
      .then((data) => setSubmission(data.submission ?? null))
      .finally(() => setLoading(false));
  }, [signupId]);

  const ticketLabel = submission?.ticketType
    ? ticketLabels[submission.ticketType]
    : "TICKET";

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
            {submission?.campingType && (
              <div className="flex justify-between border-b border-bone/15 pb-3">
                <dt>Camping</dt>
                <dd className="text-right text-acid">{submission.campingType}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="glow-box-violet flex flex-col items-center justify-center gap-6 border border-violet/40 bg-ink px-6 py-10">
          <span className="stamp font-mono text-xs text-violet">
            {ticketLabel}
          </span>
          <QRPlaceholder label={`QR BETALEN ${ticketLabel}`} />
        </div>
      </div>
    </main>
  );
}
