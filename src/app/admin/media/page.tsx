"use client";
import { useEffect, useState } from "react";
import { adminFetch, getToken } from "@/lib/api";
import { API_URL } from "@/lib/site";
import AdminShell, { useAdminUser, canManageContent } from "@/components/admin/AdminShell";
interface MediaItem { id: number | string; url?: string; imageUrl?: string; filename?: string; name?: string; createdAt?: string; usedBy?: string[] }
export default function MediaPage() {
  const user = useAdminUser();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const load = () => adminFetch<MediaItem[] | { media: MediaItem[] }>("/admin/media").then((d) => setItems(Array.isArray(d) ? d : d.media || [])).catch(() => setItems([]));
  useEffect(() => { load(); }, []);
  const upload = async (f: File) => {
    setPreview(URL.createObjectURL(f));
    const fd = new FormData(); fd.append("image", f);
    const res = await fetch(`${API_URL}/admin/media`, { method: "POST", headers: { Authorization: `Bearer ${getToken()}` }, body: fd });
    if (!res.ok) { setMsg("Upload failed."); return; }
    setMsg("Uploaded."); setPreview(null); await load();
  };
  const remove = async (id: number | string) => { try { await adminFetch(`/admin/media/${id}`, { method: "DELETE" }); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Delete failed."); } };
  const editable = canManageContent(user?.role);
  return (
    <AdminShell title="Media Library">
      {msg ? <p className="mb-3 rounded bg-amber-50 p-2 text-sm dark:bg-stone-900">{msg}</p> : null}
      {editable ? <label className="mb-4 block rounded-2xl border border-dashed p-6 text-center dark:border-stone-600">Upload an image<input type="file" accept="image/*" className="mt-2 block w-full text-sm" onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); }} /></label> : null}
      {preview ? <div className="mb-4"><p className="text-sm font-semibold">Preview</p><img src={preview} alt="Upload preview" className="mt-2 max-h-64 rounded-xl object-contain" /></div> : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => { const url = m.url || m.imageUrl || ""; return (
          <article key={m.id} className="overflow-hidden rounded-2xl border dark:border-stone-700">
            {url ? <img src={url} alt={m.filename || m.name || "Media item"} className="h-40 w-full object-cover" /> : null}
            <div className="p-3"><p className="break-all text-sm font-semibold">{m.filename || m.name || url}</p>{m.usedBy?.length ? <p className="mt-1 text-xs text-stone-500">Used by: {m.usedBy.join(", ")}</p> : null}
            {editable ? <button onClick={() => remove(m.id)} className="mt-2 flex min-h-[44px] items-center rounded-full border border-red-700 px-4 text-sm font-semibold text-red-700">Delete</button> : null}</div>
          </article>); })}
      </div>
      {items.length === 0 ? <p className="text-sm text-stone-600 dark:text-stone-300">No media yet.</p> : null}
    </AdminShell>
  );
}
