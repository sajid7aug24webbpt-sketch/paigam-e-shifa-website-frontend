import type { Metadata } from "next";
import { fetchPublicPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";
export const metadata: Metadata = { title: "Blog | Paigam-e-Shifa", description: "Long-form articles from Paigam-e-Shifa — Ruhani + Hakeem Clinic." };
export default async function BlogPage() {
  const posts = (await fetchPublicPosts({ per_page: 12 })).filter((p) => p.type === "blog");
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">Blog</h1>
      {posts.length === 0 ? <p className="rounded-xl border p-4 text-sm text-stone-600 dark:text-stone-300">No articles yet — they will appear here once the clinic API is connected.</p> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>}
    </div>
  );
}
