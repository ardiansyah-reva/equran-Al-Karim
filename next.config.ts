import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/surat", // Ganti dengan path halaman surat
        permanent: true, // Redireksi permanen
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true, // Mengabaikan error ESLint saat build agar tidak gagal deploy
  },
};

export default nextConfig;
