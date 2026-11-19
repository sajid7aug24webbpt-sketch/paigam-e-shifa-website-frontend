import { API_URL, API_URL_SERVER } from "./site";

export interface Post {
  id: number | string;
  slug: string;
  title: string;
  type: "post" | "blog" | string;
  textEn?: string;
  textUr?: string;
  category?: string | null;
  categoryId?: number | null;
  categoryName?: string | null;
  tags?: string[];
  imageUrl?: string | null;
  linkUrl?: string | null;
  postDate?: string | null;
  publishAt?: string | null;
  status?: string;
}

export interface Category { id: number; name: string }
export interface TagItem { name: string; count?: number }
export interface User { id: number | string; username: string; role: string; mustChangePassword?: boolean; avatarUrl?: string | null; active?: boolean }

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) } });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try { const j = await res.json(); if (j?.error) msg = j.error; } catch { /* ignore */ }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ps_token");
}
export function authHeaders(): Record<string, string> {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
export async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...authHeaders(), ...(init?.headers || {}) },
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") { localStorage.removeItem("ps_token"); localStorage.removeItem("ps_user"); window.location.href = "/admin"; }
    throw new Error("Session expired. Please sign in again.");
  }
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try { const j = await res.json(); if (j?.error) msg = j.error; } catch { /* ignore */ }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

/** Public posts fetch that never throws — returns [] when the backend is down (build-safe).
 * Runs on the server, so it uses the internal API base when set. */
export async function fetchPublicPosts(params: Record<string, string | number> = {}): Promise<Post[]> {
  try {
    const qs = new URLSearchParams({ status: "published", per_page: "12", ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
    const res = await fetch(`${API_URL_SERVER}/posts?${qs.toString()}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.posts) ? data.posts : [];
  } catch { return []; }
}

export async function fetchPublicPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL_SERVER}/posts/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as Post;
  } catch { return null; }
}

export function resolveImageUrl(p?: Post | null): string | null {
  if (!p?.imageUrl) return null;
  let url = p.imageUrl;
  // YouTube serves 4:3 letterboxed thumbnails (sd/hqdefault) for 16:9 videos;
  // rewrite to the true 16:9 mqdefault so cards never show black bars or clip titles.
  const yt = url.match(/^(https:\/\/i\.ytimg\.com\/vi\/[^/]+\/)(?:sddefault|hqdefault|default)\.jpg$/);
  if (yt) url = `${yt[1]}mqdefault.jpg`;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return `${API_URL.replace(/\/api$/, "")}${url}`;
  return url;
}

/** Fallback poster for posts seeded without an image (the live DB has none for
 *  these slugs — the seed images never copied on PythonAnywhere). Only the
 *  site's own real posters are used; nothing is invented. */
const FALLBACK_POSTER = "/posters/main-poster.webp";
const POSTER_BY_SLUG: Record<string, string> = {
  "spiritual-remedy-children-evil-eye": "/posters/mujarab-amal-nazar.webp",
};
export function fallbackImageForPost(p?: Post | null): string {
  if (!p) return FALLBACK_POSTER;
  return POSTER_BY_SLUG[p.slug] || FALLBACK_POSTER;
}
/** Image to show for a post: its own image when it has one, else a real site poster. */
export function postImageUrl(p?: Post | null): string {
  return resolveImageUrl(p) || fallbackImageForPost(p);
}
