# Het Kring Weekendfestival 2027

Officiële website voor Het Kring Weekendfestival — *Coming Summer 2027*.
Gebouwd met Next.js 14 (App Router), TypeScript en Tailwind CSS in een
stoere, undergroundflyer-stijl: donkere achtergrond, neon accenten en
ticket/stamp-elementen.

## Structuur

```
app/
  layout.tsx      -> root layout, fonts (Anton / Space Mono / Archivo), metadata
  page.tsx        -> voegt alle secties samen
  globals.css     -> grain-textuur, neon glow, stamp/ticket utility classes
components/
  Header.tsx      -> sticky nav met mobiel menu
  Hero.tsx        -> sectie 1: hero met titel, slogan en CTA
  Presale.tsx     -> sectie 2: presale-uitleg, aanmeldformulier, QR-placeholder, disclaimer
  CampingTypes.tsx -> sectie 3: 4 camping-kaarten (Regular / Silent / Couples / 24 Hours)
  WeekendVibe.tsx -> sectie 4: sfeer/manifest van het weekend
  FAQ.tsx         -> sectie 5: uitklapbare veelgestelde vragen
  Footer.tsx      -> sectie 6: footer met links en kleine print
  QRPlaceholder.tsx -> herbruikbaar QR-code placeholder blokje
```

## Lokaal draaien

Vereist: [Node.js](https://nodejs.org) 18.17 of hoger.

```bash
npm install
npm run dev
```

Open vervolgens [http://localhost:3000](http://localhost:3000).

## Build testen

```bash
npm run build
npm run start
```

## Hosten op Vercel

1. Zet dit project in een Git-repository (GitHub, GitLab of Bitbucket).
2. Ga naar [vercel.com/new](https://vercel.com/new) en importeer de repository.
3. Vercel herkent Next.js automatisch — geen extra configuratie nodig.
4. Klik op **Deploy**.

Je kunt ook direct vanaf de command line deployen met de
[Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel
```

## Aanpassen

- **Teksten**: alle copy staat direct in de componenten in `components/`.
- **Kleuren/fonts**: pas `tailwind.config.js` (kleuren `magenta`, `violet`,
  `acid`, `bone`, `concrete`, `void`) en `app/layout.tsx` (fonts) aan.
- **QR-code**: vervang `components/QRPlaceholder.tsx` door een `<img>` of
  `next/image` zodra je een echte QR-code hebt gegenereerd.
- **Aanmeldformulier**: `components/Presale.tsx` bevat nu een front-end-only
  formulier. Koppel de `handleSubmit`-functie aan je eigen API-route of
  e-mail-/CRM-tool (bijv. Mailchimp, Resend, een Vercel API route) om
  aanmeldingen daadwerkelijk te verwerken.
