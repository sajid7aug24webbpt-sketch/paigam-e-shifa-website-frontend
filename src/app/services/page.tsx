import type { Metadata } from "next";
import { SERVICES } from "@/lib/site";
export const metadata: Metadata = { title: "Services | Paigam-e-Shifa", description: "Services at Paigam-e-Shifa: Hifazat (Protection), Shifa o Aaram (Healing & Relief), Ghar ki Hifazat (Protection of the Home), Kamyabi (Success)." };
export default function Services() {
  return (
    <div className="space-y-8 py-8">
      <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">Services</h1>
      <p className="text-stone-700 dark:text-stone-300">Ruhani Ilaj is a spiritual practice, not a medical treatment. No cure is guaranteed.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((s) => (<article key={s.name} className="rounded-2xl border p-6 dark:border-stone-700"><h2 className="text-xl font-bold">{s.name}</h2><p className="mt-1 font-semibold text-amber-700 dark:text-amber-400">{s.meaning}</p><p className="mt-2 text-stone-600 dark:text-stone-300">{s.desc}</p></article>))}
      </div>
    </div>
  );
}
