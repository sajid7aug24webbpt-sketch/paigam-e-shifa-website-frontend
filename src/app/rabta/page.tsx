import type { Metadata } from "next";
import RabtaForm from "@/components/RabtaForm";
import { SITE } from "@/lib/site";
export const metadata: Metadata = { title: "Rabta | Paigam-e-Shifa", description: "Contact Paigam-e-Shifa: call 0320 2022226 or send a WhatsApp message. Tajpura, Lahore Cantt." };
export default function Rabta() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">Rabta</h1>
      <div className="rounded-2xl border p-6 dark:border-stone-700">
        <p className="text-lg">Phone: <a className="font-bold text-emerald-700 underline dark:text-emerald-300" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></p>
        <p className="mt-2 text-stone-600 dark:text-stone-300">{SITE.address}</p>
        <p className="mt-1 text-stone-600 dark:text-stone-300">Hours: {SITE.hours}</p>
      </div>
      <RabtaForm />
    </div>
  );
}
