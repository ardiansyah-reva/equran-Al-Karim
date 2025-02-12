"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Select } from "flowbite-react"

interface JadwalItem {
  tanggal: string
  imsak: string
  subuh: string
  dzuhur: string
  ashar: string
  maghrib: string
  isya: string
}

export default function ImsakiyahTable() {
  const [provinsi, setProvinsi] = useState<string[]>([])
  const [kota, setKota] = useState<string[]>([])
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("")
  const [selectedKota, setSelectedKota] = useState<string>("")
  const [jadwal, setJadwal] = useState<JadwalItem[]>([])

  const getProvinsi = async () => {
    try {
      const response = await axios.get("https://equran.id/api/v2/imsakiyah/provinsi")
      if (Array.isArray(response.data.data)) {
        setProvinsi(response.data.data)
      } else {
        console.error("Invalid data format for provinsi")
      }
    } catch (error) {
      console.error("Error fetching provinsi:", error)
    }
  }

  const getKota = async (provinsi: string) => {
    try {
      const response = await axios.post("https://equran.id/api/v2/imsakiyah/kabkota", { provinsi })
      if (Array.isArray(response.data.data)) {
        setKota(response.data.data)
      } else {
        console.error("Invalid data format for kota")
      }
    } catch (error) {
      console.error("Error fetching kota:", error)
    }
  }

  const getJadwal = async () => {
    try {
      if (!selectedProvinsi || !selectedKota) return

      const response = await axios.post("https://equran.id/api/v2/imsakiyah", {
        provinsi: selectedProvinsi,
        kabkota: selectedKota,
      })

      if (response.data?.data?.[0]?.imsakiyah) {
        setJadwal(response.data.data[0].imsakiyah)
      } else {
        console.error("Invalid data format for jadwal")
      }
    } catch (error) {
      console.error("Error fetching jadwal:", error)
    }
  }

  useEffect(() => {
    getProvinsi()
  }, [])

  useEffect(() => {
    if (selectedProvinsi) {
      getKota(selectedProvinsi)
    }
  }, [selectedProvinsi])

  useEffect(() => {
    getJadwal()
  }, [selectedKota, selectedProvinsi]) // Tambah selectedProvinsi untuk mencegah missing dependency

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-lg font-semibold mb-2">Pilih Provinsi</h1>
          <Select value={selectedProvinsi} onChange={(e) => setSelectedProvinsi(e.target.value)}>
            <option value="">Pilih Provinsi</option>
            {provinsi.map((item, index) => (
              <option key={`${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <h1 className="text-lg font-semibold mb-2">Pilih Kota/Kabupaten</h1>
          <Select value={selectedKota} onChange={(e) => setSelectedKota(e.target.value)}>
            <option value="">Pilih Kota</option>
            {kota.map((item, index) => (
              <option key={`${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <h1 className="text-lg font-semibold mt-6 mb-2">Jadwal Imsakiyah</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 border border-gray-700">No</th>
              <th className="px-4 py-2 border border-gray-700">Tanggal</th>
              <th className="px-4 py-2 border border-gray-700">Imsak</th>
              <th className="px-4 py-2 border border-gray-700">Subuh</th>
              <th className="px-4 py-2 border border-gray-700">Dzuhur</th>
              <th className="px-4 py-2 border border-gray-700">Ashar</th>
              <th className="px-4 py-2 border border-gray-700">Maghrib</th>
              <th className="px-4 py-2 border border-gray-700">Isya</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map((item, index) => (
              <tr key={index} className="bg-gray-800 border border-gray-700">
                <td className="px-4 py-2 border border-gray-700 text-center">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-700">{item.tanggal}</td>
                <td className="px-4 py-2 border border-gray-700">{item.imsak}</td>
                <td className="px-4 py-2 border border-gray-700">{item.subuh}</td>
                <td className="px-4 py-2 border border-gray-700">{item.dzuhur}</td>
                <td className="px-4 py-2 border border-gray-700">{item.ashar}</td>
                <td className="px-4 py-2 border border-gray-700">{item.maghrib}</td>
                <td className="px-4 py-2 border border-gray-700">{item.isya}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
