import type { Metadata } from "next";
import Image from "next/image";
import { fetchPublicPost, resolveImageUrl } from "@/lib/api";
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPublicPost(params.slug);
  return { title: post ? `${post.title} | Paigam-e-Shifa` : "Post | Paigam-e-Shifa", description: post?.textEn?.slice(0, 160) || "Paigam-e-Shifa post." };
}
export default async function PostDetail({ params }: { params: { slug: string } }) {
  const post = await fetchPublicPost(params.slug);
  if (!post) return <div className="py-16 text-center"><h1 className="text-2xl font-bold">Post not found</h1><p className="mt-2 text-stone-600 dark:text-stone-300">This post may not be published yet, or the clinic API is not connected.</p></div>;
  const img = resolveImageUrl(post);
  return (
    <article className="mx-auto max-w-3xl space-y-4 py-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">{post.type === "blog" ? "Blog" : "Post"}{post.postDate ? ` • ${post.postDate}` : ""}</p>
      <h1 className="text-3xl font-extrabold leading-tight text-emerald-900 dark:text-emerald-100">{post.title}</h1>
      {img ? <Image src={img} alt={post.title} width={800} height={450} className="h-auto w-full rounded-2xl object-contain" unoptimized={img.startsWith("http")} /> : null}
      {post.textUr ? <p className="font-urdu text-xl leading-loose text-stone-700 dark:text-stone-200">{post.textUr}</p> : null}
      {post.textEn ? <div className="whitespace-pre-wrap text-stone-800 dark:text-stone-200">{post.textEn}</div> : null}
      {post.linkUrl ? <p><a className="font-semibold text-emerald-700 underline dark:text-emerald-300" href={post.linkUrl} target="_blank" rel="noreferrer">Open link →</a></p> : null}
      <p className="rounded-xl bg-amber-50 p-4 text-sm dark:bg-stone-900">Ruhani Ilaj is a spiritual practice, not a medical treatment. No cure is guaranteed.</p>
    </article>
  );
}
