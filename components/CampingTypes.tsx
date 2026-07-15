import { Tent, EarOff, Heart, Infinity as InfinityIcon } from "lucide-react";

const campings = [
  {
    icon: Tent,
    name: "Regular Camping",
    code: "CMP-REG",
    text: "De perfecte middenweg tussen rust en gezelligheid. Een drankje, een spelletje of nog even napraten over de festivaldag? Dat kan hier. Wil je slapen dan lukt dat ook prima. Ideaal voor bezoekers die van de gezelligheid willen meegenieten, maar niet per se van plan zijn om helemaal naar de gedver te gaan.",
  },
  {
    icon: EarOff,
    name: "Silent Camping",
    code: "CMP-SIL",
    text: "De ideale camping voor bezoekers die na een lange festivaldag hun nachtrust serieus nemen. Hier geldt: geen harde muziek, geen afters en geen onverwachte ketagangers om 4 uur snachts. Perfect voor de mensen die op tijd hun bed induiken, de volgende ochtend fris willen opstaan en geen zin hebben in pratende of feestende campingburen.",
  },
  {
    icon: Heart,
    name: "Couples Camping",
    code: "CMP-DUO",
    text: "Een exclusieve campingzone voor de tortelduifjes van het festival. Iets meer rust, iets meer privacy en wat meer ruimte voor quality time samen. De perfecte plek om even te ontspannen aan de festivaldrukte en samen van het weekend te genieten.",
  },
  {
    icon: InfinityIcon,
    name: "24 Hours Camping",
    code: "CMP-24H",
    text: "Voor de echte diehards die vinden dat slapen tijdverspilling is. Hier kan een afterparty plaatsvinden voordat iedereen uiteindelijk richting bed gaat. Soms ontstaan er wat vage gesprekken en is het niet ongewoon om om 4 uur snachts nog iemand met een schepje in zijn hand voorbij te zien lopen. Alles wordt uit het weekend gehaald en met 3 a 4 uur slaap nemen de meesten genoegen.",
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
          Camping ticket is geldig voor 1 persoon.<br/> <i>Laat je tent thuis ;)</i>
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
