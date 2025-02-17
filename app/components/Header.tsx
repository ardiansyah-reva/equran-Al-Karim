"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-900 px-6 py-4 font-medium flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link href="/surat" className="text-3xl mb-4 md:text-4xl text-white">
          al-Karim
        </Link>
      </div>

      <nav className="flex gap-7 mt-1 md:mt-4 md:mb-5 text-2xl">
        <Link href="/surat" className="text-white">Surat</Link>
        <Link href="/imsakiyah" className="text-white">Imsakiyah</Link>
      </nav>

      <input
        className="text-black mt-4 md:mt-0 p-2 rounded w-full md:w-40"
        type="text"
        placeholder="Cari surat..."
      />
    </div>
  );
}

export default Header;
