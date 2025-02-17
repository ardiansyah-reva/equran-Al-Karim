import Link from "next/link";
import Header from "../components/Header";

interface Surat30Juz {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
}

const BaseUrl = "https://equran.id/api/v2/surat";

// Fungsi untuk mengubah nomor ke angka Arab
const convertToArabicNumber = (number: number) => {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return number
    .toString()
    .split("")
    .map((digit) => arabicNumbers[+digit] || digit)
    .join("");
};

const Surat = async () => {
  const response = await fetch(BaseUrl);
  const result = await response.json();
  const surats: Surat30Juz[] = result.data;
  // console.log(surats);

  return (
    <div>
      <Header/>
    <div className="bg-white ">
      <h1 className="font-bold font-serif text-4xl text-center py-12 ">LIST SURAH</h1>
      <div className="text-center grid sm:grid-cols-1 md:grid-cols-3 justify-items-center lg:grid-cols-4">
        {surats.map((surat) => (
          <Link key={surat.nomor} href={`/surat/${surat.nomor}`}>
            <div className="w-72 mt-5 bg-gray-200 shadow p-2 mb-1 rounded-lg">
              <div className="grid grid-cols-3 text-black">
                <div className="pt-2">
                  {/* Menggunakan angka Arab */}
                  <p className="hexagon pt-3 text-black bg-white">
                    {convertToArabicNumber(surat.nomor)}
                  </p>
                </div>
                <div className="pt-2">
                  <p>{surat.namaLatin}</p>
                  <p>{surat.nama}</p>
                </div>
                <div>
                  <p className="py-2">1-{surat.jumlahAyat}</p>
                  <p className="font-serif">{surat.tempatTurun}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Surat;
