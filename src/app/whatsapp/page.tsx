import type { Metadata } from "next";
import { SITE } from "@/lib/site";
export const metadata: Metadata = { title: "WhatsApp Channel | Paigam-e-Shifa", description: "Follow the Ilm o Ilaj WhatsApp channel (216 followers) for Paigam-e-Shifa clinic updates." };
export default function WhatsAppPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-8 text-center">
      <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">WhatsApp Channel</h1>
      <p className="font-urdu text-3xl text-emerald-800 dark:text-emerald-300">علم و علاج</p>
      <p className="text-lg text-stone-700 dark:text-stone-300">Ilm o Ilaj — {SITE.whatsappFollowers}. Follow the channel for clinic updates.</p>
      <a href={SITE.whatsappChannel} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center rounded-full bg-emerald-800 px-8 font-semibold text-white hover:bg-emerald-700">Follow on WhatsApp →</a>
    </div>
  );
}
