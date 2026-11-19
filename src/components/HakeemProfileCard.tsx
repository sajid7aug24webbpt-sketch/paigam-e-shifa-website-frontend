"use client";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { useLightbox } from "./Lightbox";

/** Shared Hakeem profile card: [main poster | text | Teen Sau Shifa poster].
 *  Frames 230px wide, rectangular, thin gold border, rounded 14px, centred.
 *  Main poster file is 702x1600 with black bands baked in above/below the real
 *  702x1054 poster, so its frame uses a 2:3 crop that removes exactly the
 *  bands (no poster content is cropped). Teen Sau Shifa is 1055x1491 with no
 *  bands, so its frame uses its own natural aspect. Frames have a dark
 *  background so there is no empty-white flash while images decode.
 *  No Call/WhatsApp buttons. */
export default function HakeemProfileCard() {
  const { open, view } = useLightbox();
  const frame = "w-[230px] shrink-0 overflow-hidden rounded-[14px] border border-amber-600/60 bg-emerald-950 shadow";
  return (
    <section className="rounded-2xl border border-amber-600/40 bg-emerald-50/60 p-4 dark:bg-emerald-950/40 sm:p-6" aria-label="Hakeem profile">
      <div className="flex flex-col items-center justify-center gap-6 min-[560px]:flex-row min-[560px]:items-center">
        <button type="button" onClick={() => open({ src: "/posters/main-poster.webp", alt: "Paigam-e-Shifa main poster", title: "Paigam-e-Shifa — Main Poster", desc: "Ruhani + Hakeem Clinic — Ilaj ka Paigam. Hakeem Hafiz Muhammad Tahir.", cropBands: true })} className={frame} aria-label="View main poster larger">
          <Image src="/posters/main-poster.webp" alt="Paigam-e-Shifa main poster" width={702} height={1054} className="aspect-[702/1054] w-full object-cover" />
          <span className="block bg-emerald-800 py-2 text-center text-xs font-semibold text-white">Bara dekhein</span>
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="font-urdu text-2xl text-emerald-800 dark:text-emerald-300">{SITE.nameUrdu}</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-900 dark:text-emerald-100">{SITE.hakeem}</h2>
          <p className="mt-1 font-semibold text-amber-700 dark:text-amber-400">{SITE.credentials}</p>
          <p className="mt-2 text-stone-700 dark:text-stone-300">{SITE.ruhani}</p>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">Ruhani + Hakeem Clinic — Ilaj ka Paigam</p>
          <p className="mt-2 text-sm font-semibold">Phone: <a className="text-emerald-700 underline dark:text-emerald-300" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></p>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{SITE.address}</p>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">Hours: {SITE.hours}</p>
        </div>
        <button type="button" onClick={() => open({ src: "/posters/teen-sau-shifa.webp", alt: "Teen Sau Ruhani aur Jismani Bimariyon se Shifa poster", title: "Teen Sau Ruhani aur Jismani Bimariyon se Shifa", desc: "Surah Al-Kausar 100 bar, Surah Al-Fatiha 41 bar, Surah Al-Quraish 100 bar, pani par dam." })} className={frame} aria-label="View Teen Sau Shifa poster larger">
          <Image src="/posters/teen-sau-shifa.webp" alt="Teen Sau Ruhani aur Jismani Bimariyon se Shifa poster" width={1055} height={1491} className="aspect-[1055/1491] w-full object-cover" />
          <span className="block bg-emerald-800 py-2 text-center text-xs font-semibold text-white">Bara dekhein</span>
        </button>
      </div>
      {view}
    </section>
  );
}
