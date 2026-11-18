"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminFetch, getToken, type User } from "@/lib/api";
import { API_URL } from "@/lib/site";

export function useAdminUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    try { const raw = localStorage.getItem("ps_user"); if (raw) setUser(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);
  return user;
}
export function canManageContent(role?: string) { return role === "super_admin" || role === "admin" || role === "content_editor"; }
export function canManageUsers(role?: string) { return role === "super_admin" || role === "admin"; }
export function isSuperAdmin(role?: string) { return role === "super_admin"; }

export default function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAdminUser();
  const [menu, setMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => { if (!getToken()) router.replace("/admin"); }, [router]);

  const logout = async () => {
    try { await adminFetch("/auth/logout", { method: "POST" }); } catch { /* ignore */ }
    localStorage.removeItem("ps_token"); localStorage.removeItem("ps_user"); router.replace("/admin");
  };
  const changePassword = async () => {
    try { await adminFetch("/auth/change-password", { method: "POST", body: JSON.stringify({ currentPassword: curPw, newPassword: newPw }) }); setMsg("Password changed."); setCurPw(""); setNewPw(""); }
    catch (e: unknown) { setMsg(e instanceof Error ? e.message : "Failed to change password."); }
  };
  const changeUsername = async () => {
    try { await adminFetch("/admin/change-username", { method: "POST", body: JSON.stringify({ newUsername, currentPassword: curPw }) }); setMsg("Username changed — please sign in again."); }
    catch (e: unknown) { setMsg(e instanceof Error ? e.message : "Failed to change username."); }
  };
  const uploadAvatar = async (f: File) => {
    const fd = new FormData(); fd.append("image", f);
    const res = await fetch(`${API_URL}/admin/avatar`, { method: "POST", headers: { Authorization: `Bearer ${getToken()}` }, body: fd });
    if (!res.ok) { setMsg("Avatar upload failed."); return; }
    const j = await res.json();
    const u = { ...user, avatarUrl: j.avatarUrl ?? j.url } as User;
    localStorage.setItem("ps_user", JSON.stringify(u)); setMsg("Avatar updated.");
  };
  const removeAvatar = async () => {
    try {
      await adminFetch("/admin/avatar", { method: "DELETE" });
      const u = { ...user, avatarUrl: null } as User;
      localStorage.setItem("ps_user", JSON.stringify(u)); setMsg("Avatar removed.");
    } catch (e: unknown) { setMsg(e instanceof Error ? e.message : "Failed to remove avatar."); }
  };

  const linkCls = (href: string) => `flex min-h-[44px] items-center rounded px-3 py-2 text-sm font-medium ${pathname === href ? "bg-emerald-800 text-white" : "text-stone-700 hover:bg-emerald-50 dark:text-stone-200 dark:hover:bg-emerald-950"}`;
  const role = user?.role;
  const nav = (
    <div className="space-y-4 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">Overview</p>
      <Link href="/admin" className={linkCls("/admin")}>Dashboard</Link>
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">Content</p>
      <Link href="/admin/posts" className={linkCls("/admin/posts")}>Posts &amp; Blogs</Link>
      <Link href="/admin/categories" className={linkCls("/admin/categories")}>Categories</Link>
      <Link href="/admin/tags" className={linkCls("/admin/tags")}>Tags</Link>
      <Link href="/admin/media" className={linkCls("/admin/media")}>Media Library</Link>
      <Link href="/admin/trash" className={linkCls("/admin/trash")}>Trash</Link>
      {canManageUsers(role) ? (<><p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">Admin</p>
      {isSuperAdmin(role) ? <Link href="/admin/users" className={linkCls("/admin/users")}>Users</Link> : null}
      <Link href="/admin/settings" className={linkCls("/admin/settings")}>Settings</Link></>) : null}
      <Link href="/" className="flex min-h-[44px] items-center rounded px-3 py-2 text-sm font-medium text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-900">← View website</Link>
    </div>
  );
  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 shrink-0 border-r dark:border-stone-800 lg:block">{nav}</aside>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 border-b p-3 dark:border-stone-800">
          <button className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded border lg:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle admin menu">☰</button>
          <h1 className="flex-1 text-lg font-bold">{title}</h1>
          <form onSubmit={(e) => { e.preventDefault(); router.push(`/admin/posts?search=${encodeURIComponent(search)}`); }} className="hidden sm:block">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts…" aria-label="Search posts" className="min-h-[44px] w-48 rounded-lg border px-3 dark:border-stone-600 dark:bg-stone-900" />
          </form>
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex min-h-[44px] items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold">
            {user?.avatarUrl ? <img src={user.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" /> : <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-white">{(user?.username || "?")[0]?.toUpperCase()}</span>}
            <span>{user ? `${user.username} (${user.role.replace("_", " ")})` : "Staff"}</span>
          </button>
        </div>
        {menu ? <div className="border-b lg:hidden" onClick={() => setMenu(false)}>{nav}</div> : null}
        {profileOpen ? (
          <div className="mx-4 mt-4 rounded-2xl border p-4 dark:border-stone-700">
            <h2 className="font-bold">Profile</h2>
            <p className="mt-1 text-sm">Username: <strong>{user?.username}</strong> • Role: <strong>{user?.role}</strong></p>
            {msg ? <p className="mt-2 rounded bg-amber-50 p-2 text-sm dark:bg-stone-900">{msg}</p> : null}
            <label className="mt-3 block text-sm font-semibold">Avatar <input type="file" accept="image/*" className="mt-1 block w-full text-sm" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadAvatar(f); }} /></label>
            {user?.avatarUrl ? <button onClick={removeAvatar} className="mt-2 flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold text-red-700">Remove avatar</button> : null}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <input type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} placeholder="Current password" className="min-h-[44px] rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New password (min 8 chars)" className="min-h-[44px] rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
            </div>
            <button onClick={changePassword} className="mt-2 flex min-h-[44px] items-center rounded-full bg-emerald-800 px-5 font-semibold text-white">Change password</button>
            <div className="mt-3 flex gap-2">
              <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="New username" className="min-h-[44px] flex-1 rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
              <button onClick={changeUsername} className="flex min-h-[44px] items-center rounded-full border border-emerald-800 px-5 font-semibold text-emerald-800 dark:text-emerald-300">Change username</button>
            </div>
            <button onClick={logout} className="mt-4 flex min-h-[44px] items-center rounded-full border border-red-700 px-5 font-semibold text-red-700">Log out</button>
          </div>
        ) : null}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
