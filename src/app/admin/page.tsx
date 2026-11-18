import type { Metadata } from "next";
import AdminHome from "@/components/admin/AdminHome";
export const metadata: Metadata = { title: "Admin | Paigam-e-Shifa", robots: { index: false, follow: false } };
export default function AdminPage() { return <AdminHome />; }
