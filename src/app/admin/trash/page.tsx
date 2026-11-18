"use client";
import { useEffect, useState } from "react";
import { adminFetch, type Post } from "@/lib/api";
import AdminShell, { useAdminUser, canManageContent } from "@/components/admin/AdminShell";
export default function TrashPage() {
  const user = useAdminUser();
  const [items, setItems] = useState<Post[]>([]);
  const [msg, setMsg] = useState("");
  const load = () => adminFetch<Post[] | { posts: Post[] }>("/admin/trash").then((d) => setItems(Array.isArray(d) ? d : d.posts || [])).catch(() => setItems([]));
  useEffect(() => { load(); }, []);
  const restore = async (id: string | number) => { try { await adminFetch(`/admin/posts/${id}/restore`, { method: "POST" }); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Restore failed."); } };
  const del = async (id: string | number) => { if (!confirm("Permanently delete this post? This cannot be undone.")) return; try { await adminFetch(`/admin/posts/${id}`, { method: "DELETE" }); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Delete failed."); } };
  const editable = canManageContent(user?.role);
  return (
    <AdminShell title="Trash">
      {msg ? <p className="mb-3 rounded bg-amber-50 p-2 text-sm dark:bg-stone-900">{msg}</p> : null}
      {items.length === 0 ? <p className="text-sm text-stone-600 dark:text-stone-300">Trash is empty.</p> : (
        <ul className="space-y-3">{items.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-2 rounded-2xl border p-4 dark:border-stone-700">
            <span className="flex-1 font-bold">{p.title}</span>
            {editable ? <><button onClick={() => restore(p.id)} className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-4 text-sm font-semibold text-white">Restore</button><button onClick={() => del(p.id)} className="flex min-h-[44px] items-center rounded-full border border-red-700 px-4 text-sm font-semibold text-red-700">Delete permanently</button></> : null}
          </li>))}</ul>
      )}
    </AdminShell>
  );
}
