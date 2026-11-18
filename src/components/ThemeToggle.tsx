"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("ps_theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ps_theme", next ? "dark" : "light");
  };
  return (
    <button onClick={toggle} aria-label="Toggle light/dark theme" className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-amber-600/40 px-3 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
      {dark ? "☀ Light" : "☾ Dark"}
    </button>
  );
}
