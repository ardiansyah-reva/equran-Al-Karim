import Link from "next/link";

function Header() {
  return (
    <div className="bg-gray-400 px-6 py-4 font-medium flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link href="/surat" className="text-3xl md:text-4xl">al-Karim</Link>
        {/* <button className="md:hidden text-2xl">☰</button> Placeholder untuk menu toggle */}
      </div>
      
      <nav className="hidden md:flex gap-6 mt-4 md:mt-0 text-xl">
        <Link href="/surat" className="hover:text-white">Surat</Link>
        <Link href="/imsakiyah" className="hover:text-white">Imsakiyah</Link>
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
