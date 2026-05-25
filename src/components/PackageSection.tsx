import React, { useState, useMemo } from "react";
import { Search, Calendar, ChevronRight, Info } from "lucide-react";
import { umrahPackages, companyData } from "../data";
import PackageCard from "./PackageCard";

export default function PackageSection() {
  const [activeFilter, setActiveFilter] = useState<"semua" | "hemat" | "premium" | "ramadan">("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { key: "semua", label: "Semua Paket" },
    { key: "hemat", label: "Hemat Ekonomis" },
    { key: "premium", label: "Bintang 5 VIP" },
    { key: "ramadan", label: "Spesial Ramadan" }
  ];

  // Filter logic using Memo for performance
  const filteredPackages = useMemo(() => {
    return umrahPackages.filter((pkg) => {
      // 1. Text filter search
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.meccaHotel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.airline.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Tab filter category
      if (activeFilter === "semua") return true;
      if (activeFilter === "hemat") return pkg.badge === "Hemat";
      if (activeFilter === "premium") return pkg.badge === "Excellent" || pkg.badge === "VIP Gold";
      if (activeFilter === "ramadan") return pkg.badge === "Ramadan Special";

      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="packages-section" className="py-24 bg-bento-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 font-sans">
          <div className="inline-flex items-center gap-2 bg-bento-green/5 text-bento-green text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-bento-green" /> Kuota Terbatas Keberangkatan 2026/2027
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bento-green tracking-tight leading-tight">
            Pilihan Paket Umrah Terbaik & <br/> <span className="text-bento-gold italic font-normal">Sesuai Syar'i & Sunnah</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-bento-brown leading-relaxed font-light">
            Pilih paket safar spiritual ideal Anda dengan jaminan akomodasi hotel dekat pelataran pelataran kiblat, rute maskapai direct flight kelas utama, serta layanan katering prasmanan menu Nusantara.
          </p>
        </div>

        {/* Filters and Inputs Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-bento-border mb-10 shadow-sm">
          {/* Tabs Filter Selector */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-bento-cream border border-bento-border/70 rounded-xl w-full md:w-auto">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex-1 md:flex-none text-center cursor-pointer ${
                  activeFilter === filter.key
                    ? "bg-bento-green text-bento-gold shadow-sm"
                    : "text-bento-brown hover:text-bento-green"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Text Input Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-bento-brown absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari hotel, bintang, maskapai..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FDFBF7] text-bento-green placeholder-[#8B7355]/60 border border-bento-border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-bento-gold focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-xs font-bold text-bento-brown hover:text-bento-green"
              >
                Hapus
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-bento-border rounded-3xl bg-white">
            <p className="text-lg font-bold text-bento-green mb-2">Paket tidak ditemukan</p>
            <p className="text-sm text-bento-brown max-w-sm mx-auto mb-6">
              Tidak ada paket umrah yang cocok dengan kriteria "{searchQuery}". Coba bersihkan pencarian atau ganti filter Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("semua");
              }}
              className="inline-flex items-center gap-1.5 bg-bento-green text-bento-gold font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-bento-green/80 transition-colors cursor-pointer"
            >
              Ulangi Pencarian
            </button>
          </div>
        )}

        {/* Small Notice / Custom Group Bento Bar */}
        <div className="mt-12 bg-bento-beige/50 border border-bento-border rounded-3xl p-6 text-center max-w-3xl mx-auto font-sans">
          <p className="text-xs sm:text-sm text-bento-green leading-relaxed font-medium">
            <Info className="w-4 h-4 text-bento-green inline-block mr-1.5 -mt-0.5" /> <strong className="text-bento-green">Butuh Penyesuaian Swasta (Custom Group)?</strong> Kami melayani keberangkatan umrah swasta berkelompok (Keluarga, Korporasi, Instansi) dengan harga negosiasi khusus, hotel custom terdekat Masjid Nabawi, dan muthawwif privat.{" "}
            <a
              href="https://wa.me/6281234567890?text=Assalamualaikum%20Al-Haramain%20Umrah%2C%20saya%20tertarik%20untuk%20bertanya%20mengenai%20Layanan%20Private%20Group%20Umrah."
              target="_blank"
              rel="noopener noreferrer"
              className="text-bento-green font-extrabold hover:underline block sm:inline mt-2 sm:mt-0 ml-1"
            >
              Konsultasikan Custom Group Anda →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
