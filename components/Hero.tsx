import Image from "next/image";
import { ArrowDown, Ticket } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-section relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-void px-5 pb-10 pt-28 sm:pb-14 sm:pt-32"
    >
      <Image
        src="/kring-weekendfestival-background.png"
        alt="Zomerse festivalweide met palmbomen, tenten en reuzenrad bij zonsondergang"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center"
      />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-void/20 via-transparent to-void/72"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-void via-void/55 to-transparent"
        aria-hidden="true"
      />

      <div className="hero-layout relative z-20 mx-auto flex w-full max-w-6xl shrink-0 flex-col items-start gap-6">
        <h1 className="sr-only">Het Kring Weekendfestival</h1>

        <div className="hero-logo relative h-[180px] w-full max-w-[760px] shrink-0 sm:h-[250px] lg:h-[310px]">
          <Image
            src="/kring-weekendfestival-logo.png"
            alt="Het Kring Weekendfestival"
            fill
            priority
            sizes="(min-width: 1024px) 760px, 92vw"
            className="object-contain object-left drop-shadow-[0_18px_28px_rgba(6,45,71,0.45)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="stamp font-mono text-xs font-bold text-acid">
            29 APRIL T/M 3 MEI 2027
          </span>
          <span className="stamp stamp-rotate-r font-mono text-xs font-bold text-bone">
            PRESALE GEOPEND
          </span>
        </div>

        <div className="hero-copy w-full max-w-5xl">
          <p className="hero-title font-display text-[clamp(2.125rem,5.5vw,4.25rem)] leading-[0.98] text-bone drop-shadow-[4px_5px_0_rgba(6,45,71,0.75)]">
            Vier dagen. Eén villa. Eén Kring.
          </p>
          <p className="hero-intro mt-4 max-w-4xl font-body text-base font-semibold leading-relaxed text-bone sm:text-lg">
            Welkom bij Het Kring Weekendfestival 2027! Vier dagen lang verruilen we het normale leven voor ons eigen festivalterrein, compleet met muziek, feest, activiteiten, verblijf en natuurlijk de beste mensen om je heen.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#presale"
            className="glow-box-magenta inline-flex items-center justify-center gap-3 border-2 border-violet bg-magenta px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-bone transition-colors hover:bg-acid hover:text-violet"
          >
            <Ticket className="h-5 w-5" aria-hidden="true" />
            Meld je aan voor de reguliere verkoop
          </a>
          <a
            href="#vibe"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:text-acid"
          >
            <ArrowDown className="h-4 w-4" />
            Bekijk de line-up
          </a>
        </div>
      </div>
    </section>
  );
}
