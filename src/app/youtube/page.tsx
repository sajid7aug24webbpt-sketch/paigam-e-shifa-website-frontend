import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
export const metadata: Metadata = { title: "YouTube | Paigam-e-Shifa", description: "Jamiatulquba YouTube channel (@JamiaTulQuba, 2.4K subscribers) — Paigam-e-Shifa." };
export default function YouTubePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">YouTube</h1>
      <p className="text-lg text-stone-700 dark:text-stone-300">{SITE.youtubeName} — {SITE.youtubeHandle} — {SITE.youtubeSubs}</p>
      <a href={SITE.youtube} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center rounded-full bg-emerald-800 px-8 font-semibold text-white hover:bg-emerald-700">Visit channel →</a>
      <article className="overflow-hidden rounded-2xl border dark:border-stone-700">
        <a href={`https://www.youtube.com/watch?v=${SITE.topVideoId}`} target="_blank" rel="noreferrer">
          {/* mqdefault is the true 16:9 thumbnail; hqdefault is 4:3 letterboxed. */}
          <Image src={`https://i.ytimg.com/vi/${SITE.topVideoId}/mqdefault.jpg`} alt={SITE.topVideoTitle} width={800} height={450} className="aspect-video w-full object-cover" unoptimized />
        </a>
        <div className="p-4">
          <h2 className="text-lg font-bold"><a className="hover:text-emerald-700 dark:hover:text-emerald-300" href={`https://www.youtube.com/watch?v=${SITE.topVideoId}`} target="_blank" rel="noreferrer">{SITE.topVideoTitle}</a></h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{SITE.topVideoViews} • {SITE.youtubeName}</p>
        </div>
      </article>
    </div>
  );
}
