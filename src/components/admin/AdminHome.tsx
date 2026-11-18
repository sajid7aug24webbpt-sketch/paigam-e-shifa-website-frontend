"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch, apiFetch, getToken, type User } from "@/lib/api";
import AdminShell from "./AdminShell";

export default function AdminHome() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forcePw, setForcePw] = useState("");
  const [dash, setDash] = useState<Record<string, unknown> | null>(null);
  const [activity, setActivity] = useState<Array<{ id?: number; actor?: string; action?: string; target?: string; createdAt?: string; detail?: string }>>([]);

  useEffect(() => {
    try { const raw = localStorage.getItem("ps_user"); if (raw) setUser(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    if (!user) return;
    adminFetch<Record<string, unknown>>("/admin/dashboard").then(setDash).catch(() => setDash(null));
    adminFetch<{ activity?: typeof activity } | typeof activity>("/admin/activity").then((d) => setActivity(Array.isArray(d) ? d : d.activity || [])).catch(() => setActivity([]));
  }, [user]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    try {
      const res = await apiFetch<{ token: string; user: User }>("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
      localStorage.setItem("ps_token", res.token);
      localStorage.setItem("ps_user", JSON.stringify(res.user));
      setUser(res.user);
    } catch { setError("Invalid username or password."); }
  };
  const forceChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminFetch("/auth/force-change-password", { method: "POST", body: JSON.stringify({ newPassword: forcePw }) });
      const u = { ...user, mustChangePassword: false } as User;
      localStorage.setItem("ps_user", JSON.stringify(u)); setUser(u);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Could not change password."); }
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-16">
        <h1 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Staff Sign In</h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">Paigam-e-Shifa admin — staff only. There is no password reset here; ask a Super Admin for help.</p>
        {error ? <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950">{error}</p> : null}
        <form onSubmit={login} className="mt-4 space-y-3">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
          <button className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-emerald-800 font-semibold text-white">Sign in</button>
        </form>
      </div>
    );
  }
  if (user.mustChangePassword) {
    return (
      <div className="mx-auto max-w-md py-16">
        <h1 className="text-2xl font-bold">Change your password</h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">You must set a new password before continuing.</p>
        {error ? <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        <form onSubmit={forceChange} className="mt-4 space-y-3">
          <input type="password" value={forcePw} onChange={(e) => setForcePw(e.target.value)} placeholder="New password (min 8 characters)" required minLength={8} className="min-h-[44px] w-full rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
          <button className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-emerald-800 font-semibold text-white">Set new password</button>
        </form>
      </div>
    );
  }
  const counts = (dash?.counts || dash || {}) as Record<string, number>;
  return (
    <AdminShell title="Dashboard">
      <h2 className="text-2xl font-bold">Welcome, {user.username}!</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {(["posts", "published", "drafts", "scheduled", "categories", "media", "users", "trash"] as const).map((k) => (
          <div key={k} className="rounded-2xl border p-4 dark:border-stone-700"><p className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">{k}</p><p className="mt-1 text-3xl font-extrabold">{counts[k] ?? counts[`${k}Count`] ?? "—"}</p></div>
        ))}
      </div>
      <h3 className="mt-8 text-lg font-bold">Recent activity</h3>
      {activity.length === 0 ? <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">No recent activity recorded.</p> : (
        <ul className="mt-2 space-y-2">{activity.slice(0, 10).map((a, i) => (<li key={a.id ?? i} className="rounded-xl border p-3 text-sm dark:border-stone-700">{a.actor ? `${a.actor} — ` : ""}{a.action}{a.target || a.detail ? ` — ${a.target || a.detail}` : ""}{a.createdAt ? <span className="text-stone-500"> ({a.createdAt})</span> : null}</li>))}</ul>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/posts/new" className="flex min-h-[44px] items-center rounded-full bg-emerald-800 px-5 font-semibold text-white">+ New post</Link>
        <Link href="/admin/posts" className="flex min-h-[44px] items-center rounded-full border border-emerald-800 px-5 font-semibold text-emerald-800 dark:text-emerald-300">Posts &amp; Blogs</Link>
      </div>
    </AdminShell>
  );
}
