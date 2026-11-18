"use client";
import { useEffect, useState } from "react";
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-emerald-800 text-white shadow-lg hover:bg-emerald-700">↑ Top</button>
  );
}
