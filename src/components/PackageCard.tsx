import React, { useState } from "react";
import { Clock, Calendar, Users2, ShieldCheck, Heart, PlaneTakeoff, HelpCircle, Building2, Building, Plane } from "lucide-react";
import { UmrahPackage } from "../types";
import { companyData } from "../data";

export default function PackageCard({ pkg }: { pkg: UmrahPackage; key?: any }) {
  // Sharing model state: "quad", "triple", or "double"
  const [sharingType, setSharingType] = useState<"quad" | "triple" | "double">("quad");

  const getSharingPrice = () => {
    switch (sharingType) {
      case "triple":
        return pkg.priceTriple;
      case "double":
        return pkg.priceDouble;
      case "quad":
      default:
        return pkg.priceQuad;
    }
  };

  const getSharingText = () => {
    switch (sharingType) {
      case "triple":
        return "Kamar Bertiga (Triple)";
      case "double":
        return "Kamar Berdua (Double)";
      case "quad":
      default:
        return "Kamar Berempat (Quad)";
    }
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

  const originalPriceQuad = pkg.priceQuad + 3500000; // Mock original price for countdown/discounts look
  const getSharingOriginalPrice = () => {
    switch (sharingType) {
      case "triple":
        return pkg.priceTriple + 4000000;
      case "double":
        return pkg.priceDouble + 4500000;
      case "quad":
      default:
        return originalPriceQuad;
    }
  };

  const handleBookingClick = () => {
    const calculatedPrice = getSharingPrice();
    const message = encodeURIComponent(
      `Assalamualaikum Al-Haramain Umrah,\n\nSaya tertarik mendaftar untuk:\n📦 *${pkg.name}*\n📅 Jadwal Terbang: *${pkg.departureDate}*\n👥 Kamar Pilihan: *${getSharingText()}*\n💰 Harga Estimasi: *${formatIDR(calculatedPrice)} / pax*\n\nApakah masih ada slot yang tersedia? Mohon informasikan cara pembayarannya.`
    );
    window.open(`https://wa.me/${companyData.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  // Quota percentage calculator
  const percentFill = ((pkg.quotaTotal - pkg.seatsRemaining) / pkg.quotaTotal) * 100;

  return (
    <div
      id={pkg.id}
      className={`bg-white rounded-[2rem] overflow-hidden border transition-all duration-300 relative flex flex-col justify-between ${
        pkg.isPopular
          ? "border-bento-gold shadow-md ring-4 ring-bento-gold/15 scale-[1.01]"
          : "border-bento-border hover:border-bento-gold hover:shadow-md"
      }`}
    >
      {/* Visual Badge Header */}
      {pkg.isPopular && (
        <div className="bg-bento-gold text-bento-green text-xs font-black uppercase tracking-wider text-center py-2 font-sans">
          ★ PILIHAN UTAMA JAMAAH - BEST SELLER
        </div>
      )}

      <div className="p-6">
        {/* Card Title & Badge */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <span
              className={`inline-block text-[10px] uppercase font-bold px-2.5 py-1 rounded-full mb-2 border ${
                pkg.badge === "VIP Gold"
                  ? "bg-bento-gold/15 text-bento-green border-bento-gold/45"
                  : pkg.badge === "Excellent"
                  ? "bg-bento-green/10 text-bento-green border-bento-green/30"
                  : pkg.badge === "Ramadan Special"
                  ? "bg-purple-100 text-purple-950 border-purple-300"
                  : "bg-bento-cream text-bento-brown border-bento-border"
              }`}
            >
              • {pkg.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-bento-green leading-tight">
              {pkg.name}
            </h3>
            <p className="text-xs text-bento-brown mt-1">
              {pkg.subtitle}
            </p>
          </div>
        </div>

        {/* Dynamic Pricing Box */}
        <div className="bg-bento-green/5 rounded-2xl p-4 sm:p-5 mb-5 border border-bento-green/10 relative">
          <p className="text-[10px] text-bento-brown uppercase font-bold tracking-wider">Harga Kamar ({getSharingText()})</p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-bento-green">
              {formatIDR(getSharingPrice())}
            </span>
            <span className="text-xs text-bento-brown font-medium">/ pax</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-[#8B7355] line-through font-mono">
              {formatIDR(getSharingOriginalPrice())}
            </span>
            <span className="text-[9px] font-bold bg-[#E9E1D4] text-bento-darkbrown px-1.5 py-0.5 rounded">
              Hemat {formatIDR(getSharingOriginalPrice() - getSharingPrice())}
            </span>
          </div>

          {/* Room Type Selector Slider Buttons */}
          <div className="mt-4 pt-4 border-t border-bento-green/10">
            <p className="text-[9px] text-bento-brown font-bold mb-2 uppercase tracking-wide">Pilih Opsi Tipe Kamar Sekamar:</p>
            <div className="grid grid-cols-3 gap-1 bg-[#FDFBF7] p-1 rounded-xl border border-bento-border">
              <button
                onClick={() => setSharingType("quad")}
                className={`py-1.5 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  sharingType === "quad"
                    ? "bg-bento-green text-bento-gold shadow-sm"
                    : "text-bento-brown hover:text-bento-green"
                }`}
              >
                Quad (👤x4)
              </button>
              <button
                onClick={() => setSharingType("triple")}
                className={`py-1.5 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  sharingType === "triple"
                    ? "bg-bento-green text-bento-gold shadow-sm"
                    : "text-bento-brown hover:text-bento-green"
                }`}
              >
                Triple (👤x3)
              </button>
              <button
                onClick={() => setSharingType("double")}
                className={`py-1.5 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  sharingType === "double"
                    ? "bg-bento-green text-bento-gold shadow-sm"
                    : "text-bento-brown hover:text-bento-green"
                }`}
              >
                Double (👤x2)
              </button>
            </div>
          </div>
        </div>

        {/* Quota Indicator */}
        <div className="mb-5">
          <div className="flex justify-between items-center text-xs text-bento-green mb-1 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse inline-block" />
              Sisa Kuota Kursi
            </span>
            <span className="font-bold text-bento-brown text-xs">
              {pkg.seatsRemaining} dari {pkg.quotaTotal} Seat Tersisa
            </span>
          </div>
          <div className="w-full bg-[#FDFBF7] border border-bento-border h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                pkg.seatsRemaining <= 5 ? "bg-red-500" : "bg-bento-green"
              }`}
              style={{ width: `${percentFill}%` }}
            />
          </div>
        </div>

        {/* Flight & Hotel */}
        <div className="space-y-3.5 border-t border-bento-border/50 pt-4 mb-5 font-sans">
          {/* Flight */}
          <div className="flex items-start gap-3">
            <div className="bg-bento-green/5 text-bento-green p-2.5 rounded-xl shrink-0 border border-bento-green/10">
              <Plane className="w-5 h-5 text-bento-green" />
            </div>
            <div>
              <p className="text-[9px] text-[#8B7355] uppercase font-bold tracking-wider">Maskapai Penerbangan</p>
              <p className="text-xs font-bold text-bento-green">{pkg.airline}</p>
              <p className="text-[11px] text-bento-brown">Penerbangan PP Langsung (Direct Flight)</p>
            </div>
          </div>

          {/* Mecca Hotel */}
          <div className="flex items-start gap-3">
            <div className="bg-bento-green/5 text-bento-green p-2.5 rounded-xl shrink-0 border border-bento-green/10">
              <Building2 className="w-5 h-5 text-bento-green" />
            </div>
            <div>
              <p className="text-[9px] text-[#8B7355] uppercase font-bold tracking-wider">Akomodasi Makkah</p>
              <p className="text-xs font-bold text-bento-green mb-0.5">{pkg.meccaHotel}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-bento-gold tracking-tight text-xs flex">
                  {Array.from({ length: pkg.meccaHotelStars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
                <span className="text-[10px] text-[#8B7355] font-medium">({pkg.meccaHotelDistance})</span>
              </div>
            </div>
          </div>

          {/* Madinah Hotel */}
          <div className="flex items-start gap-3">
            <div className="bg-bento-green/5 text-bento-green p-2.5 rounded-xl shrink-0 border border-bento-green/10">
              <Building className="w-5 h-5 text-bento-green" />
            </div>
            <div>
              <p className="text-[9px] text-[#8B7355] uppercase font-bold tracking-wider">Akomodasi Madinah</p>
              <p className="text-xs font-bold text-bento-green mb-0.5">{pkg.madinahHotel}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-bento-gold tracking-tight text-xs flex">
                  {Array.from({ length: pkg.madinahHotelStars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
                <span className="text-[10px] text-[#8B7355] font-medium">({pkg.madinahHotelDistance})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bullet Inclusions */}
        <div className="bg-bento-cream py-3 px-4 rounded-xl mb-4 border border-bento-border/60">
          <p className="text-[9px] text-[#8B7355] font-bold mb-1.5 uppercase tracking-wider">Paket Sudah Termasuk (All-In):</p>
          <ul className="space-y-1">
            {pkg.highlights.map((high, index) => (
              <li key={index} className="flex gap-1.5 items-start text-[11px] text-bento-darkbrown">
                <span className="text-bento-green font-bold">✓</span>
                <span className="leading-tight">{high}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Booking CTA */}
      <div className="p-5 bg-[#FDFBF7] border-t border-bento-border rounded-b-[2rem]">
        <button
          onClick={handleBookingClick}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] active:scale-95 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-xs sm:text-sm"
        >
          <span>Amankan Kursi via WhatsApp</span>
        </button>
        <div className="text-center mt-2">
          <span className="text-[9px] text-[#8B7355] font-semibold tracking-wide flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-bento-green inline" />
            DP Ringan Rp 5 Jt & Garansi Amanah
          </span>
        </div>
      </div>
    </div>
  );
}
