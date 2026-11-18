"use client";
import { useEffect, useState } from "react";
import { adminFetch, type TagItem } from "@/lib/api";
import AdminShell, { useAdminUser, canManageContent } from "@/components/admin/AdminShell";
export default function TagsPage() {
  const user = useAdminUser();
  const [tags, setTags] = useState<TagItem[]>([]);
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");
  const [msg, setMsg] = useState("");
  const load = () => adminFetch<TagItem[]>("/admin/tags").then((d) => setTags(Array.isArray(d) ? d : [])).catch(() => setTags([]));
  useEffect(() => { load(); }, []);
  const rename = async (e: React.FormEvent) => { e.preventDefault(); try { await adminFetch("/admin/tags/rename", { method: "POST", body: JSON.stringify({ oldName, newName }) }); setOldName(""); setNewName(""); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const remove = async (name: string) => { try { await adminFetch(`/admin/tags/${encodeURIComponent(name)}`, { method: "DELETE" }); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const editable = canManageContent(user?.role);
  return (
    <AdminShell title="Tags">
      {msg ? <p className="mb-3 rounded bg-amber-50 p-2 text-sm dark:bg-stone-900">{msg}</p> : null}
      {editable ? <form onSubmit={rename} className="mb-4 flex flex-wrap gap-2"><input value={oldName} onChange={(e) => setOldName(e.target.value)} placeholder="Old tag name" required className="min-h-[44px] flex-1 rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /><input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New tag name" required className="min-h-[44px] flex-1 rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /><button className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-5 font-semibold text-white">Rename tag</button></form> : null}
      <ul className="space-y-2">{tags.map((t) => (
        <li key={t.name} className="flex items-center gap-2 rounded-xl border p-3 dark:border-stone-700"><span className="flex-1 font-semibold">{t.name}</span>{t.count !== undefined ? <span className="text-sm text-stone-500">{t.count} post(s)</span> : null}{editable ? <button onClick={() => remove(t.name)} className="flex min-h-[44px] items-center rounded-full border border-red-700 px-4 text-sm font-semibold text-red-700">Delete</button> : null}</li>))}
      </ul>
      {tags.length === 0 ? <p className="text-sm text-stone-600 dark:text-stone-300">No tags yet.</p> : null}
    </AdminShell>
  );
}
