import type { Metadata } from "next";
import HakeemProfileCard from "@/components/HakeemProfileCard";
import MujarabAmal from "@/components/MujarabAmal";
import { SERVICES, SITE } from "@/lib/site";
export const metadata: Metadata = { title: "Ruhani Ilaj | Paigam-e-Shifa", description: "Ruhani Ilaj (Ayat-ul-Kursi se) by Hakeem Hafiz Muhammad Tahir at Paigam-e-Shifa, Tajpura, Lahore Cantt. A spiritual practice, not a medical treatment." };
export default function RuhaniIlaj() {
  return (
    <div className="space-y-10 py-8">
      <div><h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">Ruhani Ilaj</h1>
      <p className="mt-2 text-lg text-stone-700 dark:text-stone-300">Ruhani Ilaj with Ayat-ul-Kursi, by {SITE.hakeem} ({SITE.credentials}).</p>
      <p className="font-urdu mt-2 text-xl text-emerald-800 dark:text-emerald-300">روحانی علاج آیت الکرسی سے</p></div>
      <HakeemProfileCard />
      <section><h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">Services</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (<article key={s.name} className="rounded-2xl border p-5 dark:border-stone-700"><h3 className="text-lg font-bold">{s.name}</h3><p className="text-sm font-semibold text-amber-700 dark:text-amber-400">{s.meaning}</p><p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{s.desc}</p></article>))}
        </div></section>
      <MujarabAmal />
    </div>
  );
}
