"use client";
import { useEffect, useState } from "react";
import { adminFetch, type User } from "@/lib/api";
import AdminShell, { useAdminUser, isSuperAdmin } from "@/components/admin/AdminShell";
const ROLES = ["super_admin", "admin", "content_editor", "viewer"];
export default function UsersPage() {
  const me = useAdminUser();
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("content_editor");
  const [msg, setMsg] = useState("");
  const load = () => adminFetch<User[] | { users: User[] }>("/admin/users").then((d) => setUsers(Array.isArray(d) ? d : d.users || [])).catch(() => setUsers([]));
  useEffect(() => { load(); }, []);
  if (me && !isSuperAdmin(me.role)) return <AdminShell title="Users"><p className="text-red-700">Only a Super Admin can manage users.</p></AdminShell>;
  const create = async (e: React.FormEvent) => { e.preventDefault(); try { await adminFetch("/admin/users", { method: "POST", body: JSON.stringify({ username, password, role }) }); setUsername(""); setPassword(""); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const changeRole = async (id: string | number, r: string) => { try { await adminFetch(`/admin/users/${id}`, { method: "PUT", body: JSON.stringify({ role: r }) }); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const toggleActive = async (u: User) => { try { await adminFetch(`/admin/users/${u.id}`, { method: "PUT", body: JSON.stringify({ active: u.active === false ? true : false }) }); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const resetPw = async (id: string | number) => { try { const d = await adminFetch<{ temporaryPassword?: string; tempPassword?: string }>(`/admin/users/${id}/reset-password`, { method: "POST" }); setMsg(`Temporary password: ${d.temporaryPassword || d.tempPassword || "(check server response)"} — share it securely; the user must change it on first login.`); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed."); } };
  const remove = async (id: string | number) => { try { await adminFetch(`/admin/users/${id}`, { method: "DELETE" }); await load(); } catch (err: unknown) { setMsg(err instanceof Error ? err.message : "Failed — the last Super Admin cannot be deleted."); } };
  return (
    <AdminShell title="Users">
      {msg ? <p className="mb-3 break-words rounded bg-amber-50 p-2 text-sm dark:bg-stone-900">{msg}</p> : null}
      <form onSubmit={create} className="mb-4 grid gap-2 sm:grid-cols-4">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="min-h-[44px] rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Temporary password" required minLength={8} className="min-h-[44px] rounded-lg border p-3 dark:border-stone-600 dark:bg-stone-900" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="min-h-[44px] rounded-lg border p-2 dark:bg-stone-900">{ROLES.map((r) => <option key={r} value={r}>{r}</option>)}</select>
        <button className="flex min-h-[44px] items-center justify-center rounded-full bg-emerald-800 font-semibold text-white">Create staff</button>
      </form>
      <ul className="space-y-3">{users.map((u) => (
        <li key={u.id} className="rounded-2xl border p-4 dark:border-stone-700">
          <p className="font-bold">{u.username} <span className="text-sm font-normal text-stone-500">({u.role}){u.active === false ? " — deactivated" : ""}</span></p>
          <div className="mt-2 flex flex-wrap gap-2">
            <select value={u.role} onChange={(e) => changeRole(u.id, e.target.value)} className="min-h-[44px] rounded-lg border p-2 dark:bg-stone-900">{ROLES.map((r) => <option key={r} value={r}>{r}</option>)}</select>
            <button onClick={() => toggleActive(u)} className="flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold">{u.active === false ? "Activate" : "Deactivate"}</button>
            <button onClick={() => resetPw(u.id)} className="flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold">Reset password</button>
            <button onClick={() => remove(u.id)} className="flex min-h-[44px] items-center rounded-full border border-red-700 px-4 text-sm font-semibold text-red-700">Delete</button>
          </div>
        </li>))}</ul>
    </AdminShell>
  );
}
