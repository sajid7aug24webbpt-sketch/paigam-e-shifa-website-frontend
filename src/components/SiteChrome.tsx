"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  if (isAdmin) return <>{children}</>;
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
