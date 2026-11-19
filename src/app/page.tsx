import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchPublicPosts } from "@/lib/api";
import { SITE, SERVICES, FAQS } from "@/lib/site";
import HakeemProfileCard from "@/components/HakeemProfileCard";
import PostCard from "@/components/PostCard";
import MujarabAmal from "@/components/MujarabAmal";

export const metadata: Metadata = {
  title: "Paigam-e-Shifa — Ruhani + Hakeem Clinic | Ilaj ka Paigam",
  description: "Paigam-e-Shifa — Ruhani + Hakeem Clinic, Ilaj ka Paigam. Hakeem Hafiz Muhammad Tahir, D.M.H.S • F.T.J • PhD. Tajpura, House No. 37, Gali No. 16, Lahore Cantt. Open 10:00 AM – 9:00 PM.",
};

export default async function Home() {
  const posts = await fetchPublicPosts({ per_page: 6 });
  return (
    <div className="space-y-12 py-8">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="font-urdu text-3xl text-emerald-800 dark:text-emerald-300">{SITE.nameUrdu}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-emerald-900 dark:text-emerald-100 sm:text-5xl">Paigam-e-Shifa — Ruhani + Hakeem Clinic</h1>
          <p className="mt-3 text-xl font-semibold text-amber-700 dark:text-amber-400">Ilaj ka Paigam</p>
          <p className="mt-4 text-lg text-stone-700 dark:text-stone-300">Ruhani Ilaj for nazar-e-bad, jadu and bandish — with the Quran and Dua, under the guidance of {SITE.hakeem}.</p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">Kis ke liye: nazar-e-bad, jadu, bandish — aur ruhani sukoon chaahne walon ke liye.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ruhani-ilaj" className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-6 font-semibold text-white hover:bg-emerald-700">Ruhani Ilaj dekhein</Link>
            <Link href="/rabta" className="flex min-h-[44px] items-center rounded-full border border-emerald-800 px-6 font-semibold text-emerald-800 dark:text-emerald-300">Rabta karein</Link>
          </div>
        </div>
        {/* The poster file is 702x1600 with black bands baked in above/below the
            real 702x1054 poster; a 2:3 crop removes exactly the bands, no poster
            content is cropped. Dark frame so there is no white flash on load. */}
        <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border border-amber-600/50 bg-emerald-950 shadow-lg">
          <Image src="/posters/main-poster.webp" alt="Paigam-e-Shifa main poster" width={702} height={1054} className="aspect-[702/1054] w-full object-cover" priority />
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-amber-600/40 bg-amber-50 p-5 text-center dark:bg-stone-900 sm:grid-cols-2 lg:grid-cols-4" aria-label="Trust strip">
        <div><p className="text-sm font-bold text-amber-700 dark:text-amber-400">Address</p><p className="mt-1 text-sm">{SITE.addressShort}</p></div>
        <div><p className="text-sm font-bold text-amber-700 dark:text-amber-400">Hours</p><p className="mt-1 text-sm">{SITE.hours}</p></div>
        <div><p className="text-sm font-bold text-amber-700 dark:text-amber-400">Phone</p><p className="mt-1 text-sm"><a className="underline" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></p></div>
        <div><p className="text-sm font-bold text-amber-700 dark:text-amber-400">YouTube</p><p className="mt-1 text-sm"><a className="underline" href={SITE.youtube} target="_blank" rel="noreferrer">{SITE.youtubeName} — {SITE.youtubeSubs}</a></p></div>
      </section>

      <HakeemProfileCard />

      <section className="rounded-2xl border p-6 dark:border-stone-700">
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">Pehli Dafa Aaye Hain? Start Here</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          <li className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/50"><p className="text-lg font-bold">Rabta karein</p><p className="mt-1 text-sm">Call {SITE.phoneDisplay} ya WhatsApp par message bhejein.</p></li>
          <li className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/50"><p className="text-lg font-bold">Clinic aayein</p><p className="mt-1 text-sm">{SITE.addressShort}. Hours: {SITE.hours}.</p></li>
          <li className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/50"><p className="text-lg font-bold">Ruhani Ilaj</p><p className="mt-1 text-sm">Hakeem Hafiz Muhammad Tahir se Ruhani Ilaj (Ayat-ul-Kursi se) ke baare mein maloom karein.</p></li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">Services</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article key={s.name} className="rounded-2xl border p-5 dark:border-stone-700">
              <h3 className="text-lg font-bold">{s.name}</h3>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">{s.meaning}</p>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{s.desc}</p>
            </article>
          ))}
        </div>
        <p className="mt-3"><Link href="/services" className="font-semibold text-emerald-700 underline dark:text-emerald-300">All services →</Link></p>
      </section>

      <MujarabAmal teaser />

      <section>
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">Latest Posts &amp; Articles</h2>
        {posts.length === 0 ? (
          <p className="mt-4 rounded-xl border p-4 text-sm text-stone-600 dark:text-stone-300">Posts will appear here once the clinic API is connected. Visit the <Link className="underline" href="/posts">Posts</Link> and <Link className="underline" href="/blog">Blog</Link> pages.</p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-xl border p-4 dark:border-stone-700">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm dark:bg-stone-900">Disclaimer: Ruhani Ilaj is a spiritual practice, not a medical treatment. No cure is guaranteed. If you are unwell, please also seek appropriate medical care.</p>
      </section>
    </div>
  );
}
