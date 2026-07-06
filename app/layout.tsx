import type { Metadata } from "next";
import { Anton, Space_Mono, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Het Kring Weekendfestival 2027 — Coming Summer 2027",
  description:
    "Het Kring Weekendfestival 2027. Meld je aan voor de presale en verzeker je plek voor een weekend hardcore, uptempo en je crew. Coming Summer 2027.",
  metadataBase: new URL("https://www.kringweekendfestival.nl"),
  openGraph: {
    title: "Het Kring Weekendfestival 2027",
    description: "Coming Summer 2027. Meld je aan voor de presale.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body
        className={`${anton.variable} ${spaceMono.variable} ${archivo.variable} font-body bg-void text-bone antialiased`}
      >
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
