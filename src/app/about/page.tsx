import type { Metadata } from "next";
import { SITE } from "@/lib/site";
export const metadata: Metadata = { title: "About Us | Paigam-e-Shifa", description: "About Paigam-e-Shifa — Ruhani + Hakeem Clinic in Tajpura, Lahore Cantt. Hakeem Hafiz Muhammad Tahir, D.M.H.S • F.T.J • PhD." };
export default function About() {
  return (
    <div className="max-w-3xl space-y-6 py-8">
      <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">About Us</h1>
      <p className="font-urdu text-2xl text-emerald-800 dark:text-emerald-300">{SITE.nameUrdu}</p>
      <p className="text-lg text-stone-700 dark:text-stone-300">Paigam-e-Shifa is a Ruhani + Hakeem Clinic — Ilaj ka Paigam — located at {SITE.address}.</p>
      <p className="text-stone-700 dark:text-stone-300">The clinic is led by {SITE.hakeem} ({SITE.credentials}), who offers Ruhani Ilaj with Ayat-ul-Kursi. The clinic is open {SITE.hours}.</p>
      <p className="text-stone-700 dark:text-stone-300">Services offered are Hifazat (Protection), Shifa o Aaram (Healing &amp; Relief), Ghar ki Hifazat (Protection of the Home), and Kamyabi (Success).</p>
      <p className="rounded-xl bg-amber-50 p-4 text-sm dark:bg-stone-900">Ruhani Ilaj is a spiritual practice, not a medical treatment. No cure is guaranteed. If you are unwell, please also seek appropriate medical care.</p>
      <p className="text-stone-700 dark:text-stone-300">Contact: <a className="text-emerald-700 underline dark:text-emerald-300" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></p>
    </div>
  );
}
