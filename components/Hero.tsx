import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-32 sm:pt-36"
    >
      {/* Achtergrond gloed */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-magenta/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-violet/20 blur-[130px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="stamp font-mono text-xs text-acid">
            WEEKEND 01 — ZOMER 2027
          </span>
          <span className="stamp stamp-rotate-r font-mono text-xs text-magenta">
            PRESALE BINNENKORT OPEN
          </span>
        </div>

        <h1 className="mt-8 font-display text-[15vw] leading-[0.85] tracking-tight text-bone sm:text-[10vw] lg:text-[7.5rem]">
          HET KRING
          <br />
          <span className="glow-magenta text-magenta">WEEKEND</span>
          <span className="glow-violet text-violet">FESTIVAL</span>
        </h1>

        <p className="mt-6 font-mono text-lg uppercase tracking-[0.35em] text-bone/80 sm:text-xl">
          Coming Summer 2027
        </p>

        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-bone/70 sm:text-lg">
          Drie dagen hardcore, uptempo en keiharde kicks op een terrein dat
          helemaal van ons is. Geen line-up van gladde artiesten, geen halve
          maatregelen — gewoon jouw crew, harde muziek en een weekend dat je
          niet snel vergeet.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#presale"
            className="glow-box-magenta inline-flex items-center justify-center border-2 border-magenta bg-magenta/10 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-magenta hover:text-void"
          >
            Meld je aan voor de presale
          </a>
          <a
            href="#vibe"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-bone/60 transition-colors hover:text-acid"
          >
            <ArrowDown className="h-4 w-4" />
            Bekijk de vibe
          </a>
        </div>
      </div>
    </section>
  );
}
