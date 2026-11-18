"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-amber-600/30 bg-white/95 backdrop-blur dark:bg-stone-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2">
        <Link href="/" className="flex min-h-[44px] items-center gap-2">
          <span className="flex h-11 w-24 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
            <Image src="/logo.png" alt="Paigam-e-Shifa logo" width={96} height={32} className="h-8 w-auto object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold text-emerald-800 dark:text-emerald-300">Paigam-e-Shifa</span>
            <span className="block text-xs text-amber-700 dark:text-amber-400">Ruhani + Hakeem Clinic</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="flex min-h-[44px] items-center rounded px-2 py-2 text-sm font-medium text-stone-700 hover:text-emerald-800 dark:text-stone-200 dark:hover:text-emerald-300">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded border px-3 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>☰ Menu</button>
        </div>
      </div>
      {open ? (
        <nav className="border-t px-4 py-2 lg:hidden" aria-label="Mobile navigation">
          <ul className="grid grid-cols-1 gap-1">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} onClick={() => setOpen(false)} className="flex min-h-[44px] items-center rounded px-2 font-medium text-stone-700 hover:bg-emerald-50 dark:text-stone-200 dark:hover:bg-emerald-950">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
