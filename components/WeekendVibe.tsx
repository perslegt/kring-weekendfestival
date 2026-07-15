const lineup = [
  {
    day: "Donderdag",
    date: "29 april",
    label: "De aftrap",
    slots: [
      { time: "18:00", act: "Poorten open" },
      { time: "20:00", act: "Kring Allstars" },
      { time: "22:30", act: "Opening Rave" },
      { time: "00:30", act: "After Hours" },
    ],
  },
  {
    day: "Vrijdag",
    date: "30 april",
    label: "Hardcore night",
    slots: [
      { time: "16:00", act: "Camping Sessions" },
      { time: "19:00", act: "Hardcore Classics" },
      { time: "22:00", act: "Mainstage Takeover" },
      { time: "01:00", act: "Uptempo Closing" },
    ],
  },
  {
    day: "Zaterdag",
    date: "1 mei",
    label: "All day chaos",
    slots: [
      { time: "14:00", act: "Daybreak Beats" },
      { time: "18:00", act: "Kring Soundsystem" },
      { time: "22:00", act: "Saturday Headliner" },
      { time: "01:30", act: "No Sleep Finale" },
    ],
  },
  {
    day: "Zondag",
    date: "2 mei",
    label: "De grande finale",
    slots: [
      { time: "13:00", act: "Brakke Brunch" },
      { time: "15:00", act: "Sunday Funday" },
      { time: "18:00", act: "Closing Ceremony" },
      { time: "20:00", act: "One Last Track" },
    ],
  },
];

const marqueeItems = [
  "UPTEMPO",
  "HARDSTYLE",
  "HARDCORE",
  "HARDTECHNO",
  "DRUM AND BASS",
  "RAWSTYLE",
  "CLASSICS",
];

export default function WeekendVibe() {
  const looped = [...marqueeItems, ...marqueeItems];

  return (
    <section id="vibe" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-magenta">
              Vier dagen. Eén crew.
            </span>
            <h2 className="section-heading glow-violet mt-2 text-5xl text-bone sm:text-6xl">
              Line-up 2027
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-bone/55 sm:text-right">
            Van de eerste plaat op donderdag tot de laatste track op zondag.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {lineup.map((day, dayIndex) => (
              <article
                key={day.day}
                className="group relative overflow-hidden border border-bone/20 bg-ink/85 shadow-[8px_9px_0_rgba(6,45,71,0.55)]"
              >
              <div
                className={`h-2 ${dayIndex % 2 === 0 ? "bg-magenta" : "bg-acid"}`}
                aria-hidden="true"
              />
              <header className="border-b border-bone/15 p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/50">
                  {day.date} · {day.label}
                </span>
                <h3 className="mt-2 font-display text-3xl uppercase tracking-wide text-bone">
                  {day.day}
                </h3>
              </header>

              <ol
                className="pointer-events-none select-none divide-y divide-bone/10 px-5 blur-[7px]"
                aria-hidden="true"
              >
                {day.slots.map((slot, slotIndex) => (
                  <li key={`${slot.time}-${slot.act}`} className="flex gap-4 py-4">
                    <time className="shrink-0 font-mono text-[11px] font-bold text-acid">
                      {slot.time}
                    </time>
                    <span
                      className={`font-display uppercase tracking-wide text-bone ${
                        slotIndex === 2 ? "text-xl" : "text-base"
                      }`}
                    >
                      {slot.act}
                    </span>
                  </li>
                ))}
              </ol>
              </article>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-void/15"
            aria-label="Line-up wordt later bekendgemaakt"
          >
            <div className="-rotate-3 border-4 border-bone bg-magenta px-7 py-5 text-center shadow-[10px_12px_0_rgba(6,45,71,0.8)] sm:px-12 sm:py-7">
              <span className="block font-display text-4xl uppercase tracking-wide text-bone sm:text-6xl">
                To be announced
              </span>
              <span className="mt-2 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-bone/80 sm:text-xs">
                Line-up volgt binnenkort
              </span>
            </div>
          </div>
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
          Tijden en programma onder voorbehoud
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
