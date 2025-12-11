/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.britannica.com" },
      { protocol: "https", hostname: "cdn.discordapp.com" },
    ],
  },
  output: "standalone",
};

export default nextConfig;
