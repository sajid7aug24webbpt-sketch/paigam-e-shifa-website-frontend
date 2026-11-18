import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { SITE, SITE_URL, jsonLd } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const urdu = Noto_Nastaliq_Urdu({ subsets: ["arabic"], variable: "--font-urdu", display: "swap", weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Paigam-e-Shifa — Ruhani + Hakeem Clinic | Ilaj ka Paigam", template: "%s | Paigam-e-Shifa" },
  description: "Paigam-e-Shifa — Ruhani + Hakeem Clinic, Ilaj ka Paigam. Hakeem Hafiz Muhammad Tahir, D.M.H.S • F.T.J • PhD. Tajpura, Lahore Cantt. Open 10:00 AM – 9:00 PM.",
  openGraph: { type: "website", siteName: "Paigam-e-Shifa", images: [{ url: "/posters/main-poster.webp", width: 702, height: 1054, alt: "Paigam-e-Shifa main poster" }] },
  twitter: { card: "summary_large_image", images: ["/posters/main-poster.webp"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${urdu.variable}`} suppressHydrationWarning>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head>
      <body className="min-h-screen w-full overflow-x-hidden font-sans antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
