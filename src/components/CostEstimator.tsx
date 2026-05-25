import React, { useState, useMemo } from "react";
import { Calculator, Sparkles, Send, ShieldCheck, Users2, Building2 } from "lucide-react";
import { companyData, upgradesData, estimatorConfig } from "../data";

export default function CostEstimator() {
  // Simulator State variables
  const [pilgrimsCount, setPilgrimsCount] = useState<number>(2);
  const [roomClass, setRoomClass] = useState<"quad" | "triple" | "double" | "single">("double");
  const [hotelTier, setHotelTier] = useState<"bintang3" | "bintang4" | "bintang5">("bintang5");
  const [addOnHaramainTrain, setAddOnHaramainTrain] = useState<boolean>(true);
  const [addOnVipGear, setAddOnVipGear] = useState<boolean>(false);
  const [addOnPremiumCatering, setAddOnPremiumCatering] = useState<boolean>(true);

  // Get dynamic upgrade configurations
  const trainUpgrade = useMemo(() => upgradesData.find((u: any) => u.id === "train") || { name: "Kereta Cepat Haramain (Makkah-Madinah)", desc: "Durasi cuma 2 jam (menghindari letih bus darat 6 jam)", price: 1500000 }, []);
  const gearUpgrade = useMemo(() => upgradesData.find((u: any) => u.id === "gear") || { name: "Upgrade Perlengkapan Premium Koper Fiber", desc: "Desain fiber koper kokoh premium & kain batik mewah", price: 1200000 }, []);
  const cateringUpgrade = useMemo(() => upgradesData.find((u: any) => u.id === "catering") || { name: "Catering Full-Board Premium", desc: "Menu makanan internasional prasmanan khusus di hotel", price: 800000 }, []);

  // Price matrix calculation
  const roomMultipliers = estimatorConfig.roomMultipliers;
  const hotelBaseCosts = estimatorConfig.hotelBaseCosts;

  const calculatedPerPerson = useMemo(() => {
    let price = hotelBaseCosts[hotelTier];
    price += roomMultipliers[roomClass];

    // Add-on cost additions
    if (addOnHaramainTrain) price += trainUpgrade.price;
    if (addOnVipGear) price += gearUpgrade.price;
    if (addOnPremiumCatering) price += cateringUpgrade.price;

    return price;
  }, [roomClass, hotelTier, addOnHaramainTrain, addOnVipGear, addOnPremiumCatering, trainUpgrade.price, gearUpgrade.price, cateringUpgrade.price]);

  const calculatedTotal = useMemo(() => {
    return calculatedPerPerson * pilgrimsCount;
  }, [calculatedPerPerson, pilgrimsCount]);

  // Format upgrade price display nicely
  const formatUpgradePrice = (price: number) => {
    if (price >= 1000000) {
      return `+Rp ${(price / 1000000).toFixed(1).replace('.0', '')} Jt`;
    }
    return `+Rp ${(price / 1000).toFixed(0)} Ribu`;
  };

  // Format currency to IDR
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleShareCalculation = () => {
    const roomText = {
      quad: "Quad (Sekamar Berempat)",
      triple: "Triple (Sekamar Bertiga)",
      double: "Double (Sekamar Berdua)",
      single: "Single (Kamar Sendiri)"
    }[roomClass];

    const hotelText = {
      bintang3: "Hotel Bintang 3 Ekonomis (Jarak ~350m)",
      bintang4: "Hotel Bintang 4 Nyaman (Jarak ~150m)",
      bintang5: "Hotel Bintang 5 Premium (Dekat Pelataran/0m)"
    }[hotelTier];

    const upgrades = [];
    if (addOnHaramainTrain) upgrades.push(trainUpgrade.name);
    if (addOnVipGear) upgrades.push(gearUpgrade.name);
    if (addOnPremiumCatering) upgrades.push(cateringUpgrade.name);

    const message = encodeURIComponent(
      `Assalamualaikum Al-Haramain Umrah,\n\nSaya telah membuat *Simulasi Rencana Umrah Swasta* melalui situs Anda. Berikut detail rencana saya:\n\n` +
      `👥 Jumlah Rombongan: *${pilgrimsCount} Orang*\n\n` +
      `🏨 Klasifikasi Hotel: \n• _${hotelText}_\n\n` +
      `🛌 Jenis Kamar: \n• _${roomText}_\n\n` +
      `✨ Layanan Tambahan (Upgrades):\n${upgrades.map((u) => `• _${u}_`).join("\n") || "• _Tidak ada_"}\n\n` +
      `📌 *ESTIMASI BIAYA:* \n` +
      `• Harga per pax: *${formatIDR(calculatedPerPerson)} / Orang*\n` +
      `• *TOTAL ESTIMASI (${pilgrimsCount} Pax): ${formatIDR(calculatedTotal)}*\n\n` +
      `Mohon dibantu buatkan itinerary lengkap dan pengajuan tanggal keberangkatan yang sesuai. Terima kasih.`
    );

    window.open(`https://wa.me/${companyData.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="calc-section" className="py-24 bg-bento-green text-white relative font-sans">
      {/* Visual background overlay patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(253,251,247,0.03),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Area: Title Content */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-2 bg-bento-gold/15 text-bento-gold font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full border border-bento-gold/25">
              <Calculator className="w-3.5 h-3.5" /> Simulasi Biaya Swasta Mandiri
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Rencanakan Umrah Swasta <br/> <span className="text-bento-gold font-normal italic">Sesuai Kebutuhan Anda</span>
            </h2>
            <p className="text-[#FDFBF7]/80 text-sm sm:text-base leading-relaxed font-light">
              Bandingkan komponen akomodasi, jenis kamar, dan berbagai layanan eksklusif tambahan secara mandiri. Sistem kalkulator kami menghitung secara transparan untuk memberikan estimasi anggaran safar Anda.
            </p>

            <div className="pt-6 space-y-4 border-t border-white/10">
              <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-bento-gold font-bold text-lg mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-bento-gold text-sm">Transparan Tanpa Biaya Tersembunyi</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Estimasi hitungan mencakup pengurusan visa umrah, asuransi kesehatan Arab Saudi, muthawwif pembimbing, bus AC eksekutif, serta handling perlengkapan.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-bento-gold font-bold text-lg mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-bento-gold text-sm">Insentif Rombongan (Group Discount)</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Untuk pendaftaran di atas 10 orang sekaligus, dapatkan benefit diskon negosiasi langsung oleh tim admin di WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Area: Interactive Calculator Card */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] text-bento-green p-6 sm:p-8 shadow-xl relative overflow-hidden border border-bento-border">
            
            {/* Visual Card Header */}
            <div className="mb-6 pb-4 border-b border-bento-border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-serif font-bold text-bento-green">Kalkulator Safar Swasta</h3>
                <p className="text-xs text-[#8B7355]">Sesuaikan kriteria komponen perjalanan Anda di bawah ini</p>
              </div>
              <Calculator className="w-5 h-5 text-bento-green/45" />
            </div>

            <div className="space-y-5">
              
              {/* Option 1: Pilgrim Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs sm:text-sm font-bold text-bento-green flex items-center gap-1.5">
                    <Users2 className="w-4 h-4 text-bento-green/80" />
                    Jumlah Anggota Rombongan:
                  </label>
                  <span className="bg-bento-green text-bento-gold text-xs font-bold px-3 py-1 rounded-full font-mono">
                    {pilgrimsCount} Pax (Orang)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={pilgrimsCount}
                  onChange={(e) => setPilgrimsCount(parseInt(e.target.value))}
                  className="w-full accent-bento-green h-1.5 bg-bento-cream border border-bento-border rounded-lg cursor-pointer transition-all"
                />
                <div className="flex justify-between text-[10px] text-bento-brown font-bold px-1 mt-1 font-mono">
                  <span>1 Orang</span>
                  <span>5 Orang</span>
                  <span>10 Orang</span>
                </div>
              </div>

              {/* Option 2: Hotels Tier Selector */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-bento-green flex items-center gap-1.5 mb-2.5">
                  <Building2 className="w-4 h-4 text-bento-green/80 shrink-0" />
                  Kelas Hotel & Jarak Akomodasi Makkah:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setHotelTier("bintang3")}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      hotelTier === "bintang3"
                        ? "border-bento-green bg-bento-green/5 text-bento-green font-bold shadow-sm"
                        : "border-bento-border hover:border-bento-gold bg-[#FDFBF7] text-bento-brown"
                    }`}
                  >
                    <span className="block text-xs font-bold">★★★</span>
                    <span className="text-[10px] sm:text-xs block mt-1 font-bold">Bintang 3 Ekonomis</span>
                    <span className="text-[9px] text-[#8B7355] block">Jarak ±350m ke Masjid</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHotelTier("bintang4")}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      hotelTier === "bintang4"
                        ? "border-bento-green bg-bento-green/5 text-bento-green font-bold shadow-sm"
                        : "border-bento-border hover:border-bento-gold bg-[#FDFBF7] text-bento-brown"
                    }`}
                  >
                    <span className="block text-xs font-bold">★★★★</span>
                    <span className="text-[10px] sm:text-xs block mt-1 font-bold">Bintang 4 Nyaman</span>
                    <span className="text-[9px] text-[#8B7355] block">Jarak ±150m ke Masjid</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHotelTier("bintang5")}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      hotelTier === "bintang5"
                        ? "border-bento-green bg-bento-green/5 text-bento-green font-bold shadow-sm"
                        : "border-bento-border hover:border-bento-gold bg-[#FDFBF7] text-bento-brown"
                    }`}
                  >
                    <span className="block text-xs font-bold text-bento-gold">★★★★★</span>
                    <span className="text-[10px] sm:text-xs block mt-1 font-bold">Bintang 5 VIP</span>
                    <span className="text-[9px] text-[#8B7355] block">Pelataran Masjid 0m</span>
                  </button>
                </div>
              </div>

              {/* Option 3: Room Occupancy Sharing Class */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-bento-green flex items-center gap-1.5 mb-2">
                  <Users2 className="w-4 h-4 text-bento-green/80" /> Pilihan Tipe Kamar (Sekamar):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: "quad", label: "Quad (Berempat)", cost: roomMultipliers.quad === 0 ? "Baseline" : `+Rp ${roomMultipliers.quad / 1000000} Jt` },
                    { key: "triple", label: "Triple (Bertiga)", cost: roomMultipliers.triple === 0 ? "Baseline" : `+Rp ${roomMultipliers.triple / 1000000} Jt` },
                    { key: "double", label: "Double (Berdua)", cost: roomMultipliers.double === 0 ? "Baseline" : `+Rp ${roomMultipliers.double / 1000000} Jt` },
                    { key: "single", label: "Single (Sendiri)", cost: roomMultipliers.single === 0 ? "Baseline" : `+Rp ${roomMultipliers.single / 1000000} Jt` }
                  ].map((room) => (
                    <button
                      type="button"
                      key={room.key}
                      onClick={() => setRoomClass(room.key as any)}
                      className={`py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                        roomClass === room.key
                          ? "border-bento-green bg-bento-green/5 text-bento-green font-bold shadow-sm"
                          : "border-bento-border hover:border-bento-gold bg-[#FDFBF7] text-[#8B7355]"
                      }`}
                    >
                      <span className="block text-xs font-bold">{room.label}</span>
                      <span className="text-[9px] text-bento-brown block mt-0.5">({room.cost})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 4: Upgrades & Add-ons Checklist */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-bento-green flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-4 h-4 text-bento-gold" />
                  Upgrade Layanan Tambahan (Optional):
                </label>
                <div className="space-y-2">
                  {/* Haramain Train */}
                  <label className="flex items-center justify-between p-3 bg-bento-cream hover:bg-white border border-bento-border hover:border-bento-gold rounded-xl cursor-pointer transition-all select-none">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOnHaramainTrain}
                        onChange={(e) => setAddOnHaramainTrain(e.target.checked)}
                        className="w-4 h-4 rounded text-bento-green accent-bento-green"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-bento-green block">{trainUpgrade.name}</span>
                        <span className="text-[10px] text-bento-brown block leading-tight">{trainUpgrade.desc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-bento-green shrink-0 ml-3">{formatUpgradePrice(trainUpgrade.price)} <span className="text-[9px] font-normal text-bento-brown">/pax</span></span>
                  </label>

                  {/* VIP Gear */}
                  <label className="flex items-center justify-between p-3 bg-bento-cream hover:bg-white border border-bento-border hover:border-bento-gold rounded-xl cursor-pointer transition-all select-none">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOnVipGear}
                        onChange={(e) => setAddOnVipGear(e.target.checked)}
                        className="w-4 h-4 rounded text-bento-green accent-bento-green"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-bento-green block">{gearUpgrade.name}</span>
                        <span className="text-[10px] text-bento-brown block leading-tight">{gearUpgrade.desc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-bento-green shrink-0 ml-3">{formatUpgradePrice(gearUpgrade.price)} <span className="text-[9px] font-normal text-bento-brown">/pax</span></span>
                  </label>

                  {/* Premium Catering */}
                  <label className="flex items-center justify-between p-3 bg-bento-cream hover:bg-white border border-bento-border hover:border-bento-gold rounded-xl cursor-pointer transition-all select-none">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOnPremiumCatering}
                        onChange={(e) => setAddOnPremiumCatering(e.target.checked)}
                        className="w-4 h-4 rounded text-bento-green accent-bento-green"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-bento-green block">{cateringUpgrade.name}</span>
                        <span className="text-[10px] text-bento-brown block leading-tight">{cateringUpgrade.desc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-bento-green shrink-0 ml-3">{formatUpgradePrice(cateringUpgrade.price)} <span className="text-[9px] font-normal text-bento-brown">/pax</span></span>
                  </label>
                </div>
              </div>

            </div>

            {/* Calculations Outcome Block */}
            <div className="mt-6 pt-5 border-t border-bento-border bg-bento-green/5 rounded-2xl p-4 sm:p-5 border border-bento-green/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[10px] text-[#8B7355] uppercase font-bold tracking-wider">Total Estimasi Rencana ({pilgrimsCount} Pax)</p>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-bento-green mt-0.5">{formatIDR(calculatedTotal)}</p>
                <p className="text-[10px] text-[#8B7355] mt-0.5">({formatIDR(calculatedPerPerson)} / Orang pax)</p>
              </div>

              <button
                onClick={handleShareCalculation}
                className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] active:scale-95 text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all shrink-0 text-xs sm:text-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Rencana ke WA</span>
              </button>
            </div>

            {/* Quick trust stamp in card margins */}
            <p className="text-[9px] text-center text-bento-brown font-semibold mt-3 tracking-wide uppercase flex items-center justify-center gap-1 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-bento-green inline" />
              Perhitungan Realistis Khusus Tanpa Biaya Tersembunyi
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
