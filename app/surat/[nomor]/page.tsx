import Link from "next/link";
import { notFound } from "next/navigation";
interface SuratPropsParams {
  params: {
    nomor: number;
  };
}
interface Audio {
[key: string]: string
}
interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Audio; 
}
interface Surat30Juz {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  ayat: Ayat[];
  audioFull: Audio;
}

export default async function Page({ params }: SuratPropsParams) {
  const { nomor } = params;
  const BaseUrl = `https://equran.id/api/v2/surat/${nomor}`;

  const convertToArabicNumber = (number: number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number
      .toString()
      .split("")
      .map((digit) => arabicNumbers[+digit] || digit)
      .join("");
  };

  const response = await fetch(BaseUrl);
  const result = await response.json();
  const surats: Surat30Juz = result.data;
  // console.log(surats);

  try {
    return (
      <div>
        <div className=" shadow-md pt-7 bg-gradient-to-tr from-gray-200 via-gray-400 to-transparent">
        <Link href="/surat"  > 
          <p className="text-4xl text-center  mb-1  ">
            Surat: {surats.namaLatin}
          </p>
          </Link>
          <p className="text-2xl text-center pb-1  ">
            Ayat: 1-{surats.jumlahAyat}
          </p>
          <p className="text-2xl text-center pb-4 "> {surats.tempatTurun}</p>
        </div>
        {surats.ayat.map((surat, index) => (
          <div key={index} className="pt-5 px-12 py-12 ">
            <div className="font-serif shadow-md text-2xl">
              <div className="ukuranAyat flex justify-end gap-10 text-right">
                <p className="ltr:mr-0 rtl:ml-0">
                  {" "}
                  {convertToArabicNumber(surat.nomorAyat)}
                </p>
                <p dir="rtl" className="font-arabic text-2xl leading-loose">
                  {surat.teksArab}
                </p>
              </div>
              <div>
                <i className="text-base text-green-500">
                  {surat.teksLatin}
                </i>
                <p className="text-sm font-serif">
                  {surat.teksIndonesia}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    notFound(); // Automatically show 404 page if data is not found
  }
}
