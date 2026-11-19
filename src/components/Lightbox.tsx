"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface LightboxItem { src: string; alt: string; title: string; desc?: string; cropBands?: boolean }

export function useLightbox() {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setItem(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const open = (it: LightboxItem) => { setZoom(1); setItem(it); };
  const close = () => setItem(null);
  const view = item ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" onClick={close}>
      <div className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-4 text-center dark:bg-stone-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button className="rounded border px-3 py-2" onClick={() => setZoom((z) => Math.max(1, z - 0.5))}>− Zoom out</button>
            <button className="rounded border px-3 py-2" onClick={() => setZoom((z) => Math.min(3, z + 0.5))}>+ Zoom in ({zoom.toFixed(1)}x)</button>
          </div>
          <button className="rounded border px-3 py-2" onClick={close} aria-label="Close">✕ Close</button>
        </div>
        <div className="overflow-auto">
          <Image src={item.src} alt={item.alt} width={702} height={1054} style={{ width: `${230 * zoom}px`, maxWidth: "none" }} className={item.cropBands ? "mx-auto aspect-[702/1054] object-cover" : "mx-auto h-auto object-contain"} unoptimized={item.src.endsWith(".png")} />
        </div>
        <h3 className="mt-3 text-lg font-bold text-emerald-800 dark:text-emerald-300">{item.title}</h3>
        {item.desc ? <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{item.desc}</p> : null}
      </div>
    </div>
  ) : null;
  return { open, view };
}
