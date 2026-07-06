import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-bone/10 px-5 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-3xl tracking-wide text-bone">
              HET KRING WEEKENDFESTIVAL
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-magenta">
              Coming Summer 2027
            </p>
          </div>

          <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.2em] text-bone/70">
            <a
              href="#presale"
              className="flex items-center gap-2 transition-colors hover:text-acid"
            >
              <Mail className="h-4 w-4" /> Presale
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 transition-colors hover:text-acid"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>

        <div className="tape-divider" aria-hidden="true" />

        <div className="flex flex-col gap-4 font-mono text-[11px] leading-relaxed text-concrete sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-xl">
            De presale-aanbetaling is niet restitueerbaar, omdat dit dient
            als aanbetaling voor het festivalterrein/accommodatie. Prijzen,
            data en line-up onder voorbehoud.
          </p>
          <p>© 2027 Het Kring Weekendfestival. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
