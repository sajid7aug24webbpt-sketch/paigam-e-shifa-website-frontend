/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
    formats: ["image/avif", "image/webp"],
  },
};
export default nextConfig;
