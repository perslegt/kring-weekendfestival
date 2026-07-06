const manifest = [
  "GEEN GLADDE LINE-UP.",
  "GEEN HALVE MAATREGELEN.",
  "GEWOON HARDE KICKS.",
  "MET JE EIGEN CREW.",
  "DRIE DAGEN LANG.",
];

const marqueeItems = [
  "HARDCORE",
  "UPTEMPO",
  "UNDERGROUND",
  "NON-STOP",
  "TERRAIN TAKEOVER",
];

export default function WeekendVibe() {
  const looped = [...marqueeItems, ...marqueeItems];

  return (
    <section id="vibe" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-5">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet">
          Het weekend
        </span>
        <h2 className="section-heading glow-violet mt-2 text-4xl text-bone sm:text-5xl">
          Dit is geen festival.
          <br />
          Dit is een weekend met je crew.
        </h2>

        <div className="mt-10 flex flex-col gap-3">
          {manifest.map((line) => (
            <p
              key={line}
              className="font-display text-2xl tracking-wide text-bone/85 sm:text-3xl"
            >
              {line}
            </p>
          ))}
        </div>

        <p className="mt-8 max-w-2xl font-body text-bone/70">
          Denk industrieel terrein, ruwe sound systems en podia die geen
          poeha nodig hebben. Overdag chillen met je crew op de camping,
          &apos;s avonds keihard onder de lasers. Geen glitter, geen
          poespas — gewoon een weekend zoals het hoort.
        </p>
      </div>

      <div
        className="mt-14 border-y border-bone/10 bg-ink py-4"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {looped.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-3xl tracking-widest text-bone/15 sm:text-4xl"
            >
              {item} <span className="text-magenta/30">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
