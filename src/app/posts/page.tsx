import type { Metadata } from "next";
import { fetchPublicPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";
export const metadata: Metadata = { title: "Posts | Paigam-e-Shifa", description: "Posts from Paigam-e-Shifa — Ruhani + Hakeem Clinic, Tajpura, Lahore Cantt." };
export default async function PostsPage({ searchParams }: { searchParams: { search?: string } }) {
  const posts = (await fetchPublicPosts({ per_page: 12, ...(searchParams.search ? { search: searchParams.search } : {}) })).filter((p) => p.type !== "blog");
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-4xl">Posts</h1>
      <form method="get" className="flex gap-2"><input name="search" defaultValue={searchParams.search || ""} placeholder="Search posts…" className="min-h-[44px] flex-1 rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" /><button className="min-h-[44px] rounded-lg bg-emerald-800 px-5 font-semibold text-white">Search</button></form>
      {posts.length === 0 ? <p className="rounded-xl border p-4 text-sm text-stone-600 dark:text-stone-300">No posts yet — they will appear here once the clinic API is connected.</p> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>}
    </div>
  );
}
