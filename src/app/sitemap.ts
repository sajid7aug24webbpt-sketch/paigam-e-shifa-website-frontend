import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { fetchPublicPosts } from "@/lib/api";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const staticPages = ["", "/ruhani-ilaj", "/services", "/about", "/posts", "/blog", "/whatsapp", "/youtube", "/location", "/rabta"];
  const posts = await fetchPublicPosts({ per_page: 100 });
  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({ url: `${base}/${p.type === "blog" ? "blog" : "posts"}/${p.slug}`, lastModified: p.postDate ? new Date(p.postDate) : new Date() }));
  return [...staticPages.map((p) => ({ url: `${base}${p || "/"}`, lastModified: new Date() })), ...postUrls];
}
