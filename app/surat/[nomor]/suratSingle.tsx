"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface Audio {
  [key: string]: string;
}

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio?: Audio;
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

export default function SuratPage() {
  const params = useParams();
  const nomor = Number(params.nomor);
  const [surats, setSurats] = useState<Surat30Juz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNaN(nomor)) {
      notFound();
      return;
    }

    const fetchSurat = async () => {
      try {
        const response = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
        if (!response.ok) throw new Error("Surat tidak ditemukan");

        const result = await response.json();
        let suratData = result.data;

        // Tambahkan Bismillah di awal kecuali Al-Fatihah (1) dan At-Taubah (9)
        if (nomor !== 1 && nomor !== 9) {
          suratData.ayat.unshift({
            nomorAyat: 0,
            teksArab: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            teksLatin: "Bismillahirrahmanirrahim",
            teksIndonesia: "Dengan menyebut nama Allah yang Maha Pengasih dan Maha Penyayang",
          });
        }

        setSurats(suratData);
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchSurat();
  }, [nomor]);

  if (loading) {
    return <p className="text-center text-2xl">Memuat...</p>;
  }

  if (!surats) {
    return notFound();
  }

  const convertToArabicNumber = (number: number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number
      .toString()
      .split("")
      .map((digit) => arabicNumbers[+digit] || digit)
      .join("");
  };

  return (
    <div>
      <div className="shadow-md pt-7 bg-gray-900">
        <Link href="/surat">
          <p className="text-4xl text-center mb-1 text-white">Surat: {surats.namaLatin}</p>
        </Link>
        <p className="text-2xl text-center pb-1 text-white">Ayat: 1-{surats.jumlahAyat}</p>
        <p className="text-2xl text-center pb-4 text-white">{surats.tempatTurun}</p>
      </div>
      {surats.ayat.map((surat, index) => (
        <div key={index} className="pt-5 px-12 py-12">
          <div className="font-serif shadow-md text-2xl">
            <div className="ukuranAyat flex justify-end gap-10 text-right">
              <p className="ltr:mr-0 rtl:ml-0">{surat.nomorAyat !== 0 ? convertToArabicNumber(surat.nomorAyat) : ""}</p>
              <p dir="rtl" className="font-arabic text-2xl leading-loose">{surat.teksArab}</p>
            </div>
            <div>
              <i className="text-base text-gray-500">{surat.teksLatin}</i>
              <p className="text-sm mt-1 font-serif">{surat.teksIndonesia}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
