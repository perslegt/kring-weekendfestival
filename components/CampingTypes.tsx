import { Tent, EarOff, Heart, Infinity as InfinityIcon } from "lucide-react";

const campings = [
  {
    icon: Tent,
    name: "Regular Camping",
    code: "CMP-REG",
    text: "Voor de crew die het simpel houdt: dicht bij de podia, dicht bij elkaar, en verder gewoon goed geregeld.",
  },
  {
    icon: EarOff,
    name: "Silent Camping",
    code: "CMP-SIL",
    text: "Rust na het feest. Voor wie head clear wil blijven, toch het hele weekend erbij is en wil bijkomen zonder bassen in je tent.",
  },
  {
    icon: Heart,
    name: "Couples Camping",
    code: "CMP-DUO",
    text: "Net wat meer privacy voor jou en je +1. Samen op het terrein, samen op het feest.",
  },
  {
    icon: InfinityIcon,
    name: "24 Hours Camping",
    code: "CMP-24H",
    text: "Non-stop, dicht bij de actie. Voor wie nooit stopt en het liefst zo min mogelijk loopt tussen tent en dansvloer.",
  },
];

export default function CampingTypes() {
  return (
    <section id="camping" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
          Overnachten
        </span>
        <h2 className="section-heading mt-2 text-4xl text-bone sm:text-5xl">
          Kies je camping
        </h2>
        <p className="mt-4 max-w-2xl font-body text-bone/70">
          Vier opties, één terrein. Kies wat bij je crew past — of split de
          groep en zie elkaar toch de hele dag op de dansvloer.
        </p>

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {campings.map((camp, i) => (
            <div
              key={camp.name}
              className={`ticket-stub flex flex-col gap-4 p-6 ${
                i % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1"
              }`}
            >
              <div className="flex items-center justify-between">
                <camp.icon className="h-7 w-7 text-magenta" aria-hidden="true" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-concrete">
                  {camp.code}
                </span>
              </div>
              <h3 className="font-display text-2xl tracking-wide text-bone">
                {camp.name}
              </h3>
              <p className="font-body text-sm text-bone/65">{camp.text}</p>
              <div className="mt-2 border-t border-dashed border-bone/20 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-concrete">
                Het Kring Weekendfestival · Zomer 2027
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
