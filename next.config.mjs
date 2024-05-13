/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "yastatic.net",
      },
      { hostname: "avatars.mds.yandex.net" },
      { hostname: "ik.imagekit.io" },
      { hostname: "xlfiiggnufwisqytiaxf.supabase.co" },
    ],
  },
};

export default nextConfig;
