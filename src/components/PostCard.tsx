import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/api";
import { postImageUrl } from "@/lib/api";

export default function PostCard({ post }: { post: Post }) {
  const base = post.type === "blog" ? "/blog" : "/posts";
  const img = postImageUrl(post);
  // Tall site posters shown inside a 16:9 card are contained on a dark
  // background (never cropped); real 16:9 thumbnails fill the frame.
  const isPoster = img.startsWith("/posters/");
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <Link href={`${base}/${post.slug}`}>
        <Image src={img} alt={post.title} width={800} height={450} className={isPoster ? "aspect-video w-full bg-emerald-950 object-contain" : "aspect-video w-full object-cover"} unoptimized={img.startsWith("http")} />
      </Link>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">{post.type === "blog" ? "Blog" : "Post"}{post.categoryName ? ` • ${post.categoryName}` : ""}{post.postDate ? ` • ${post.postDate}` : ""}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug"><Link className="hover:text-emerald-700 dark:hover:text-emerald-300" href={`${base}/${post.slug}`}>{post.title}</Link></h3>
        {post.textEn ? <p className="mt-2 line-clamp-3 text-sm text-stone-600 dark:text-stone-300">{post.textEn.replace(/^#+\s*/gm, "")}</p> : null}
        {post.linkUrl ? <p className="mt-3"><a className="font-semibold text-emerald-700 underline dark:text-emerald-300" href={post.linkUrl} target="_blank" rel="noreferrer">Open link →</a></p> : null}
      </div>
    </article>
  );
}
