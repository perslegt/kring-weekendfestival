import Image from "next/image";
import { ArrowDown, Ticket } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-void px-5 pb-10 pt-28 sm:pb-14 sm:pt-32"
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

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-start gap-6">
        <h1 className="sr-only">Het Kring Weekendfestival</h1>

        <div className="relative h-[180px] w-full max-w-[760px] sm:h-[250px] lg:h-[310px]">
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
            WEEKEND 01 / ZOMER 2027
          </span>
          <span className="stamp stamp-rotate-r font-mono text-xs font-bold text-bone">
            PRESALE BINNENKORT OPEN
          </span>
        </div>

        <div className="max-w-2xl">
          <p className="font-display text-4xl leading-none text-bone drop-shadow-[4px_5px_0_rgba(6,45,71,0.75)] sm:text-5xl">
            Coming Summer 2027
          </p>
          <p className="mt-4 max-w-xl font-body text-base font-semibold leading-relaxed text-bone sm:text-lg">
            Drie dagen hardcore, uptempo en keiharde kicks op een terrein dat
            helemaal van ons is. Jouw crew, harde muziek en een zomerweekend
            dat je niet snel vergeet.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#presale"
            className="glow-box-magenta inline-flex items-center justify-center gap-3 border-2 border-violet bg-magenta px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-bone transition-colors hover:bg-acid hover:text-violet"
          >
            <Ticket className="h-5 w-5" aria-hidden="true" />
            Meld je aan voor de presale
          </a>
          <a
            href="#vibe"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:text-acid"
          >
            <ArrowDown className="h-4 w-4" />
            Bekijk de vibe
          </a>
        </div>
      </div>
    </section>
  );
}
