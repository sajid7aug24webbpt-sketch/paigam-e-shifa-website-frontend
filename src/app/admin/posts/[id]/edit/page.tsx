"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminFetch, type Post } from "@/lib/api";
import AdminShell from "@/components/admin/AdminShell";
import PostForm from "@/components/admin/PostForm";
export default function EditPost() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [err, setErr] = useState("");
  useEffect(() => { adminFetch<Post>(`/admin/posts/${params.id}`).then(setPost).catch((e: unknown) => setErr(e instanceof Error ? e.message : "Could not load post.")); }, [params.id]);
  return <AdminShell title="Edit Post">{err ? <p className="text-red-700">{err}</p> : null}{post ? <PostForm post={post} /> : <p>Loading…</p>}</AdminShell>;
}
