import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import PostForm from "@/components/admin/PostForm";
export const metadata: Metadata = { title: "New Post | Admin", robots: { index: false, follow: false } };
export default function NewPost() { return <AdminShell title="New Post"><PostForm /></AdminShell>; }
