"use client";
import Image from "next/image";
import Link from "next/link";
import { useLightbox } from "./Lightbox";

const POSTERS = [
  { src: "/posters/mujarab-amal-nazar.webp", alt: "Mujarab Amal — nazar-e-bad poster", title: "Mujarab Amal — Nazar-e-Bad", desc: "A traditional Islamic spiritual practice for protection from the evil eye. Ruhani Ilaj is a spiritual practice, not a medical treatment." },
  { src: "/posters/mujarab-amal-jadu.webp", alt: "Mujarab Amal — jadu poster", title: "Mujarab Amal — Jadu", desc: "A traditional Islamic spiritual practice for protection. Ruhani Ilaj is a spiritual practice, not a medical treatment." },
];

export default function MujarabAmal({ teaser = false }: { teaser?: boolean }) {
  const { open, view } = useLightbox();
  return (
    <section>
      <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">Mujarab Amal</h2>
      <p className="mt-2 rounded-xl bg-amber-50 p-4 text-sm dark:bg-stone-900">Disclaimer: Ruhani Ilaj is a spiritual practice, not a medical treatment. No cure is guaranteed. If you are unwell, please also seek appropriate medical care.</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {POSTERS.map((p) => (
          <button key={p.src} type="button" onClick={() => open(p)} className="overflow-hidden rounded-2xl border border-amber-600/50 bg-emerald-950 text-left shadow dark:bg-stone-900" aria-label={`View ${p.title} larger`}>
            <Image src={p.src} alt={p.alt} width={1055} height={1491} className="h-auto w-full object-contain" />
            <span className="block bg-emerald-800 py-2 text-center text-sm font-semibold text-white">Bara dekhein</span>
          </button>
        ))}
      </div>
      {teaser ? <p className="mt-3"><Link href="/ruhani-ilaj" className="font-semibold text-emerald-700 underline dark:text-emerald-300">Mujarab Amal section →</Link></p> : null}
      {view}
    </section>
  );
}
