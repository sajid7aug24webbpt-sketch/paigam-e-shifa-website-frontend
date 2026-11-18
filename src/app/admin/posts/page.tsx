"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { adminFetch, type Post, type Category } from "@/lib/api";
import AdminShell, { useAdminUser, canManageContent } from "@/components/admin/AdminShell";
function PostsInner() {
  const params = useSearchParams();
  const user = useAdminUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [search, setSearch] = useState(params.get("search") || "");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState("");
  const load = async () => {
    const qs = new URLSearchParams({ page: String(page), per_page: "20", ...(search ? { search } : {}), ...(status ? { status } : {}), ...(type ? { type } : {}), ...(category ? { category } : {}) });
    const d = await adminFetch<{ posts: Post[]; total: number }>("/admin/posts?" + qs.toString());
    setPosts(d.posts || []); setTotal(d.total ?? d.posts?.length ?? 0);
  };
  useEffect(() => { load().catch(() => setPosts([])); adminFetch<Category[]>("/admin/categories").then(setCats).catch(() => setCats([])); }, [page, status, type, category]);
  const act = async (id: string | number, action: string, body?: Record<string, string>) => {
    try { await adminFetch(`/admin/posts/${id}/${action}`, { method: "POST", body: body ? JSON.stringify(body) : undefined }); setMsg("Done."); await load(); }
    catch (e: unknown) { setMsg(e instanceof Error ? e.message : "Action failed."); }
  };
  const editable = canManageContent(user?.role);
  return (
    <AdminShell title="Posts & Blogs">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="min-h-[44px] flex-1 rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="min-h-[44px] rounded-lg border p-2 dark:bg-stone-900"><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option><option value="scheduled">Scheduled</option></select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="min-h-[44px] rounded-lg border p-2 dark:bg-stone-900"><option value="">All types</option><option value="post">Post</option><option value="blog">Blog</option></select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="min-h-[44px] rounded-lg border p-2 dark:bg-stone-900"><option value="">All categories</option>{cats.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}</select>
        <button onClick={() => { setPage(1); load(); }} className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-5 font-semibold text-white">Filter</button>
        {editable ? <Link href="/admin/posts/new" className="flex min-h-[44px] items-center rounded-full bg-amber-600 px-5 font-semibold text-white">+ New post</Link> : null}
      </div>
      {msg ? <p className="mb-3 rounded bg-amber-50 p-2 text-sm dark:bg-stone-900">{msg}</p> : null}
      <p className="mb-2 text-sm text-stone-600 dark:text-stone-300">{total} post(s)</p>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="rounded-2xl border p-4 dark:border-stone-700">
            <p className="font-bold">{p.title}</p>
            <p className="text-xs text-stone-500">{p.type} • {p.status}{p.categoryName ? ` • ${p.categoryName}` : ""}{p.publishAt ? ` • publishes ${p.publishAt}` : ""}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <a href={`/${p.type === "blog" ? "blog" : "posts"}/${p.slug}`} target="_blank" rel="noreferrer" className="flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold">Preview</a>
              {editable ? <><Link href={`/admin/posts/${p.id}/edit`} className="flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold">Edit</Link>
              {p.status !== "published" ? <button onClick={() => act(p.id, "status", { status: "published" })} className="flex min-h-[44px] items-center rounded-full border border-emerald-800 px-4 text-sm font-semibold text-emerald-800 dark:text-emerald-300">Publish</button> : null}
              {p.status !== "draft" ? <button onClick={() => act(p.id, "status", { status: "draft" })} className="flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold">Unpublish</button> : null}
              <button onClick={() => act(p.id, "trash")} className="flex min-h-[44px] items-center rounded-full border border-red-700 px-4 text-sm font-semibold text-red-700">Trash</button></> : null}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="flex min-h-[44px] items-center rounded border px-4 disabled:opacity-50">← Previous</button>
        <button disabled={posts.length < 20} onClick={() => setPage(page + 1)} className="flex min-h-[44px] items-center rounded border px-4 disabled:opacity-50">Next →</button>
      </div>
    </AdminShell>
  );
}
export default function AdminPostsPage() { return <Suspense><PostsInner /></Suspense>; }
