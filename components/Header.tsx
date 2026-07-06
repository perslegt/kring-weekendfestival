"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#presale", label: "Presale" },
  { href: "#camping", label: "Camping" },
  { href: "#vibe", label: "Het Weekend" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bone/10 bg-void/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="relative block h-8 w-36 sm:h-9 sm:w-40">
          <Image
            src="/het-kring-header-logo.png"
            alt="Het Kring"
            fill
            priority
            sizes="160px"
            className="object-contain object-left"
          />
        </a>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-bone/80 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-magenta"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#presale"
            className="border border-magenta px-4 py-2 text-magenta transition-colors hover:bg-magenta hover:text-void"
          >
            Presale
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-bone md:hidden"
          aria-expanded={open}
          aria-label="Menu openen of sluiten"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-bone/10 bg-void px-5 py-4 font-mono text-sm uppercase tracking-[0.15em] md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-bone/85 hover:text-magenta"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#presale"
            onClick={() => setOpen(false)}
            className="mt-2 border border-magenta px-4 py-2 text-center text-magenta"
          >
            Meld je aan
          </a>
        </nav>
      )}
    </header>
  );
}
