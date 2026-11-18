"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, type Post, type Category } from "@/lib/api";

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || "");
  const [type, setType] = useState(post?.type || "post");
  const [textEn, setTextEn] = useState(post?.textEn || "");
  const [textUr, setTextUr] = useState(post?.textUr || "");
  const [categoryId, setCategoryId] = useState<string>(post?.categoryId ? String(post.categoryId) : "");
  const [tags, setTags] = useState((post?.tags || []).join(", "));
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || "");
  const [linkUrl, setLinkUrl] = useState(post?.linkUrl || "");
  const [status, setStatus] = useState(post?.status || "draft");
  const [publishAt, setPublishAt] = useState(post?.publishAt ? post.publishAt.slice(0, 16) : "");
  const [cats, setCats] = useState<Category[]>([]);
  const [msg, setMsg] = useState("");
  useEffect(() => { adminFetch<Category[]>("/admin/categories").then(setCats).catch(() => setCats([])); }, []);
  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setMsg("");
    const body = { title, type, textEn, textUr, categoryId: categoryId ? Number(categoryId) : null, tags: tags.split(",").map((t) => t.trim()).filter(Boolean), imageUrl: imageUrl || null, linkUrl: linkUrl || null, status, publishAt: publishAt || null };
    try {
      if (post) await adminFetch(`/admin/posts/${post.id}`, { method: "PUT", body: JSON.stringify(body) });
      else await adminFetch("/admin/posts", { method: "POST", body: JSON.stringify(body) });
      router.push("/admin/posts");
    } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Save failed."); }
  };
  const input = "min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900";
  return (
    <form onSubmit={save} className="max-w-3xl space-y-4">
      {msg ? <p className="rounded bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950">{msg}</p> : null}
      <label className="block text-sm font-semibold">Title<input required value={title} onChange={(e) => setTitle(e.target.value)} className={input} /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">Type<select value={type} onChange={(e) => setType(e.target.value)} className={input}><option value="post">Post</option><option value="blog">Blog (long article)</option></select></label>
        <label className="block text-sm font-semibold">Status<select value={status} onChange={(e) => setStatus(e.target.value)} className={input}><option value="draft">Draft</option><option value="published">Published</option><option value="scheduled">Scheduled</option></select></label>
        <label className="block text-sm font-semibold">Category<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={input}><option value="">— None —</option>{cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label className="block text-sm font-semibold">Publish at (schedule)<input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} className={input} /></label>
      </div>
      <label className="block text-sm font-semibold">Text (English){type === "blog" ? " — Markdown supported" : ""}<textarea rows={10} value={textEn} onChange={(e) => setTextEn(e.target.value)} className="w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /></label>
      <label className="block text-sm font-semibold">Text (Urdu)<textarea rows={3} value={textUr} onChange={(e) => setTextUr(e.target.value)} className="w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" dir="rtl" /></label>
      <label className="block text-sm font-semibold">Tags (comma separated)<input value={tags} onChange={(e) => setTags(e.target.value)} className={input} /></label>
      <label className="block text-sm font-semibold">Image URL<input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={input} placeholder="https://… or /uploads/…" /></label>
      <label className="block text-sm font-semibold">Link URL (optional)<input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className={input} /></label>
      {post?.slug ? <p className="text-sm">Preview: <a className="text-emerald-700 underline dark:text-emerald-300" href={`/${post.type === "blog" ? "blog" : "posts"}/${post.slug}`} target="_blank" rel="noreferrer">Open public post →</a></p> : null}
      <button className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-6 font-semibold text-white">Save post</button>
    </form>
  );
}
