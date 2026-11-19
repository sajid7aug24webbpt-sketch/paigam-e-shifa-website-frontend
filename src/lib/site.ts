export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paigam-e-shifa.netlify.app";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// Server-side fetch base: inside Docker the browser-facing API URL is not
// reachable from the frontend container, so server components use the
// internal service URL when set (API_URL_INTERNAL). On the client this falls
// back to API_URL because API_URL_INTERNAL is not exposed to the browser.
export const API_URL_SERVER = process.env.API_URL_INTERNAL || API_URL;

export const SITE = {
  name: "Paigam-e-Shifa",
  nameUrdu: "پیغامِ شفاء",
  tagline: "Ruhani + Hakeem Clinic — Ilaj ka Paigam",
  hakeem: "Hakeem Hafiz Muhammad Tahir",
  credentials: "D.M.H.S • F.T.J • PhD",
  ruhani: "Ruhani Ilaj (Ayat-ul-Kursi se)",
  address: "Tajpura, House No. 37, Gali No. 16, Lahore Cantt, District Lahore",
  addressShort: "Tajpura, House No. 37, Gali No. 16, Lahore Cantt",
  hours: "10:00 AM – 9:00 PM",
  phoneDisplay: "0320 2022226",
  phoneTel: "+923202022226",
  phoneDigits: "03202022226",
  whatsappChannel: "https://whatsapp.com/channel/0029VarcYcf0gcfGSrx5Wb2f",
  whatsappChannelName: "علم و علاج (Ilm o Ilaj)",
  whatsappFollowers: "216 followers",
  youtube: "https://www.youtube.com/@jamiatulquba",
  youtubeHandle: "@JamiaTulQuba",
  youtubeName: "Jamiatulquba",
  youtubeSubs: "2.4K subscribers",
  topVideoId: "iJlnFMKn8Lg",
  topVideoTitle:
    "Jadu Se Jakra Hua Jisam Kholne Ka Dam | Dil, Dimagh aur Pait Par Bandish Ka Ilaj | Jamia Tul Quba",
  topVideoViews: "24K views",
  mapsSearch: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Paigam-e-Shifa, Tajpura, House No. 37, Gali No. 16, Lahore Cantt, District Lahore"
  )}`,
  mapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "Paigam-e-Shifa, Tajpura, House No. 37, Gali No. 16, Lahore Cantt, District Lahore"
  )}`,
  // Search-result embed for the Location page (same query as the Maps links;
  // this is a search result, not an exact pin).
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(
    "Paigam-e-Shifa, Tajpura, House No. 37, Gali No. 16, Lahore Cantt, District Lahore"
  )}&output=embed`,
};

export const SERVICES = [
  { name: "Hifazat", meaning: "Protection", desc: "Ruhani Ilaj seeking Allah's protection." },
  { name: "Shifa o Aaram", meaning: "Healing & Relief", desc: "Spiritual comfort and relief through Quranic recitation and Dua." },
  { name: "Ghar ki Hifazat", meaning: "Protection of the Home", desc: "Ruhani Ilaj for the protection of the home and family." },
  { name: "Kamyabi", meaning: "Success", desc: "Dua and spiritual guidance for success in life." },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/ruhani-ilaj", label: "Ruhani Ilaj" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/whatsapp", label: "WhatsApp" },
  { href: "/youtube", label: "YouTube" },
  { href: "/posts", label: "Posts" },
  { href: "/blog", label: "Blog" },
  { href: "/location", label: "Location" },
  { href: "/rabta", label: "Rabta" },
];

export const FAQS = [
  {
    q: "Where is Paigam-e-Shifa located?",
    a: "Paigam-e-Shifa is located at Tajpura, House No. 37, Gali No. 16, Lahore Cantt, District Lahore.",
  },
  {
    q: "What are the clinic hours?",
    a: "The clinic is open 10:00 AM – 9:00 PM. The days of the week have not been published — please call 0320 2022226 to confirm before visiting.",
  },
  {
    q: "Who is the Hakeem at Paigam-e-Shifa?",
    a: "Hakeem Hafiz Muhammad Tahir (D.M.H.S • F.T.J • PhD). He offers Ruhani Ilaj with Ayat-ul-Kursi.",
  },
  {
    q: "What is Ruhani Ilaj?",
    a: "Ruhani Ilaj is a spiritual practice based on Quranic recitation and Dua. It is a spiritual practice, not a medical treatment, and no cure is guaranteed.",
  },
  {
    q: "How can I contact the clinic?",
    a: "Call 0320 2022226, or send a WhatsApp message from the Rabta page. You can also follow the Ilm o Ilaj WhatsApp channel (216 followers) and the Jamiatulquba YouTube channel (2.4K subscribers).",
  },
  {
    q: "What services are offered?",
    a: "Four services: Hifazat (Protection), Shifa o Aaram (Healing & Relief), Ghar ki Hifazat (Protection of the Home), and Kamyabi (Success).",
  },
];

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Paigam-e-Shifa",
  description: "Ruhani + Hakeem Clinic — Ilaj ka Paigam",
  telephone: "+923202022226",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tajpura, House No. 37, Gali No. 16",
    addressLocality: "Lahore Cantt",
    addressRegion: "District Lahore",
    addressCountry: "PK",
  },
  openingHours: "10:00-21:00",
  sameAs: [SITE.youtube, SITE.whatsappChannel],
};
