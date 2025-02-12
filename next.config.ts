import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/surat', // Ganti dengan path halaman surat
        permanent: true, // Redireksi permanen
      },
    ];
  },
};
// https://i.pinimg.com/736x/5f/77/ed/5f77ed90e4d9bb709e64c178be89f8d4.jpg
export default nextConfig;
