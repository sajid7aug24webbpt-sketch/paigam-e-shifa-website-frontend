import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        emerald: { 700: "#047857", 800: "#065f46", 900: "#064e3b" },
        gold: { 400: "#c9a227", 500: "#b45309", 600: "#92400e" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        urdu: ["var(--font-urdu)", "'Noto Nastaliq Urdu'", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
