"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";
import AdminShell from "@/components/admin/AdminShell";
export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  useEffect(() => { adminFetch<Record<string, string>>("/admin/settings").then(setSettings).catch(() => setSettings({})); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); try { await adminFetch("/admin/settings", { method: "PUT", body: JSON.stringify(settings) }); setMsg("Settings saved."); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Save failed."); } };
  const set = (k: string, v: string) => setSettings((s) => ({ ...s, [k]: v }));
  return (
    <AdminShell title="Settings">
      {msg ? <p className="mb-3 rounded bg-amber-50 p-2 text-sm dark:bg-stone-900">{msg}</p> : null}
      <form onSubmit={save} className="max-w-xl space-y-4">
        <label className="block text-sm font-semibold">Site name<input value={settings.siteName || "Paigam-e-Shifa"} onChange={(e) => set("siteName", e.target.value)} className="mt-1 min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /></label>
        <label className="block text-sm font-semibold">Tagline<input value={settings.tagline || "Ruhani + Hakeem Clinic — Ilaj ka Paigam"} onChange={(e) => set("tagline", e.target.value)} className="mt-1 min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /></label>
        <label className="block text-sm font-semibold">Phone (display)<input value={settings.phone || "0320 2022226"} onChange={(e) => set("phone", e.target.value)} className="mt-1 min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /></label>
        <label className="block text-sm font-semibold">Address<input value={settings.address || "Tajpura, House No. 37, Gali No. 16, Lahore Cantt, District Lahore"} onChange={(e) => set("address", e.target.value)} className="mt-1 min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /></label>
        <label className="block text-sm font-semibold">Hours<input value={settings.hours || "10:00 AM – 9:00 PM"} onChange={(e) => set("hours", e.target.value)} className="mt-1 min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /></label>
        <button className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-6 font-semibold text-white">Save settings</button>
      </form>
    </AdminShell>
  );
}
