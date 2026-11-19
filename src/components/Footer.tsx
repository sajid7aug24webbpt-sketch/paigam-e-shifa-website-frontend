import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-amber-600/30 bg-emerald-900 text-emerald-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-xl font-bold">Paigam-e-Shifa</p>
          <p className="font-urdu mt-1 text-lg">{SITE.nameUrdu}</p>
          <p className="mt-2 text-sm text-emerald-100/90">{SITE.tagline}</p>
          <p className="mt-2 text-sm">{SITE.hakeem} — <span className="whitespace-nowrap">{SITE.credentials}</span></p>
        </div>
        <div>
          <p className="font-bold text-amber-400">Quick Links</p>
          <ul className="mt-2 space-y-1 text-sm">
            {NAV.map((n) => (<li key={n.href}><Link className="underline-offset-2 hover:underline" href={n.href}>{n.label}</Link></li>))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-amber-400">Contact</p>
          <p className="mt-2 text-sm">{SITE.address}</p>
          <p className="mt-1 text-sm">Hours: {SITE.hours}</p>
          <p className="mt-1 text-sm">Phone: <a className="underline" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></p>
          <p className="mt-1 text-sm"><a className="underline" href={SITE.youtube} target="_blank" rel="noreferrer">YouTube — {SITE.youtubeName} ({SITE.youtubeSubs})</a></p>
          <p className="mt-1 text-sm"><a className="underline" href={SITE.whatsappChannel} target="_blank" rel="noreferrer">WhatsApp — {SITE.whatsappChannelName}</a></p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-emerald-100/80">
        © {new Date().getFullYear()} Paigam-e-Shifa — Ruhani + Hakeem Clinic. All rights reserved.
      </div>
    </footer>
  );
}
