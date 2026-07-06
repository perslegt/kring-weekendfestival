"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Wat houdt de presale precies in?",
    answer:
      "Als je je aanmeldt voor de presale en de aanbetaling betaalt, ben je verzekerd van een ticket voor het volledige weekendfestival, nog voordat de reguliere verkoop start.",
  },
  {
    question: "Kan ik de aanbetaling terugkrijgen?",
    answer:
      "Nee. De presale-aanbetaling is niet restitueerbaar, omdat dit dient als aanbetaling voor het festivalterrein/accommodatie.",
  },
  {
    question: "Wanneer wordt de line-up bekendgemaakt?",
    answer:
      "De volledige line-up volgt later. Presale-aanmelders horen dit als eerste, via e-mail.",
  },
  {
    question: "Welke camping opties zijn er?",
    answer:
      "Je kunt kiezen uit Regular Camping, Silent Camping, Couples Camping en 24 Hours Camping. Elke optie heeft een eigen sfeer, van rustig tot non-stop.",
  },
  {
    question: "Is dit geschikt voor een groep vrienden?",
    answer:
      "Zeker. Het Kring Weekendfestival is opgezet als een vriendenweekend: kies samen een camping, boek samen je plek en breng het hele weekend door met je crew.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
          Vragen
        </span>
        <h2 className="section-heading mt-2 text-4xl text-bone sm:text-5xl">
          Veelgestelde vragen
        </h2>

        <div className="mt-10 divide-y divide-bone/10 border-y border-bone/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg tracking-wide text-bone sm:text-xl">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-magenta" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-bone/50" />
                  )}
                </button>
                {isOpen && (
                  <p className="pb-6 font-body text-sm leading-relaxed text-bone/65 sm:text-base">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
