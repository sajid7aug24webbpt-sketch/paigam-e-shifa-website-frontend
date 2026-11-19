import type { Metadata } from "next";
import { SITE } from "@/lib/site";
export const metadata: Metadata = { title: "Location | Paigam-e-Shifa", description: "Paigam-e-Shifa location: Tajpura, House No. 37, Gali No. 16, Lahore Cantt, District Lahore. Open 10:00 AM – 9:00 PM." };
export default function Location() {
  return (
    <div className="space-y-8 py-8">
      <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">Location</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border p-6 dark:border-stone-700">
          <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">Address</h2>
          <p className="mt-2">{SITE.address}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={SITE.mapsSearch} target="_blank" rel="noreferrer" className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-5 font-semibold text-white">View on Google Maps</a>
            <a href={SITE.mapsDirections} target="_blank" rel="noreferrer" className="flex min-h-[44px] items-center rounded-full border border-emerald-800 px-5 font-semibold text-emerald-800 dark:text-emerald-300">Get Directions</a>
          </div>
        </article>
        <article className="rounded-2xl border p-6 dark:border-stone-700">
          <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">Hours &amp; Contact</h2>
          <p className="mt-2">Hours: {SITE.hours}</p>
          <p className="mt-2">Phone: <a className="text-emerald-700 underline dark:text-emerald-300" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">Please call to confirm before visiting.</p>
        </article>
      </div>
      <div className="overflow-hidden rounded-2xl border dark:border-stone-700">
        <iframe title="Map — Paigam-e-Shifa, Tajpura, Lahore Cantt (Google Maps search result, not an exact pin)" src={SITE.mapsEmbed} className="h-[400px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
      <p className="text-sm text-stone-600 dark:text-stone-300">The map shows the Google Maps search result for the clinic address — not an exact pin.</p>
    </div>
  );
}
