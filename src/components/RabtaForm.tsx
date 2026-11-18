"use client";
import { useState } from "react";
import { SITE } from "@/lib/site";

export default function RabtaForm() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const copy = async () => {
    try { await navigator.clipboard.writeText(SITE.phoneDigits); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ }
  };
  const send = () => {
    const text = `Assalam-o-Alaikum, main ${name || "Paigam-e-Shifa website"} se rabta kar raha/rahi hoon. ${message}`;
    window.open(`https://wa.me/923202022226?text=${encodeURIComponent(text)}`, "_blank");
  };
  return (
    <div className="rounded-2xl border p-6 dark:border-stone-700">
      <div className="flex flex-wrap items-center gap-3">
        <a href={`tel:${SITE.phoneTel}`} className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-6 font-semibold text-white">Call {SITE.phoneDisplay}</a>
        <button onClick={copy} className="flex min-h-[44px] items-center rounded-full border border-emerald-800 px-6 font-semibold text-emerald-800 dark:text-emerald-300">{copied ? "Copied ✓" : "Copy number"}</button>
      </div>
      <h2 className="mt-6 text-xl font-bold">Send a WhatsApp message</h2>
      <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">Nothing is saved on this website — the form opens WhatsApp with your message.</p>
      <label className="mt-4 block text-sm font-semibold">Your name<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" placeholder="Your name" /></label>
      <label className="mt-3 block text-sm font-semibold">Message<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 block w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" placeholder="Your message" /></label>
      <button onClick={send} className="mt-4 flex min-h-[44px] items-center rounded-full bg-emerald-800 px-6 font-semibold text-white">Send via WhatsApp →</button>
    </div>
  );
}
