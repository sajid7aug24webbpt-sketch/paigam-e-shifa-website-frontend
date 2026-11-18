"use client";
import { useEffect, useState } from "react";
import { adminFetch, type Category } from "@/lib/api";
import AdminShell, { useAdminUser, canManageContent } from "@/components/admin/AdminShell";
export default function CategoriesPage() {
  const user = useAdminUser();
  const [cats, setCats] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [msg, setMsg] = useState("");
  const load = () => adminFetch<Category[]>("/admin/categories").then(setCats).catch(() => setCats([]));
  useEffect(() => { load(); }, []);
  const create = async (e: React.FormEvent) => { e.preventDefault(); try { await adminFetch("/admin/categories", { method: "POST", body: JSON.stringify({ name }) }); setName(""); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const saveEdit = async () => { if (!editId) return; try { await adminFetch(`/admin/categories/${editId}`, { method: "PUT", body: JSON.stringify({ name: editName }) }); setEditId(null); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const remove = async (id: number) => { try { await adminFetch(`/admin/categories/${id}`, { method: "DELETE" }); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const editable = canManageContent(user?.role);
  return (
    <AdminShell title="Categories">
      {msg ? <p className="mb-3 rounded bg-amber-50 p-2 text-sm dark:bg-stone-900">{msg}</p> : null}
      {editable ? <form onSubmit={create} className="mb-4 flex gap-2"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" required className="min-h-[44px] flex-1 rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /><button className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-5 font-semibold text-white">Add</button></form> : null}
      <ul className="space-y-2">{cats.map((c) => (
        <li key={c.id} className="flex flex-wrap items-center gap-2 rounded-xl border p-3 dark:border-stone-700">
          {editId === c.id ? <><input value={editName} onChange={(e) => setEditName(e.target.value)} className="min-h-[44px] flex-1 rounded-lg border p-2 dark:bg-stone-900" /><button onClick={saveEdit} className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-4 text-sm font-semibold text-white">Save</button></> : <span className="flex-1 font-semibold">{c.name}</span>}
          {editable && editId !== c.id ? <><button onClick={() => { setEditId(c.id); setEditName(c.name); }} className="flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold">Rename</button><button onClick={() => remove(c.id)} className="flex min-h-[44px] items-center rounded-full border border-red-700 px-4 text-sm font-semibold text-red-700">Delete</button></> : null}
        </li>))}
      </ul>
    </AdminShell>
  );
}
