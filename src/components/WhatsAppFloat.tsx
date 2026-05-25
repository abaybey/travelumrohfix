import React, { useState, useEffect } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { companyData } from "../data";

export default function WhatsAppFloat() {
  const [showPopup, setShowPopup] = useState(false);
  const [badgeCount, setBadgeCount] = useState(1);

  useEffect(() => {
    // Show popup after 3 seconds for active conversion triggers
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenWA = () => {
    setBadgeCount(0);
    const message = encodeURIComponent(
      "Assalamualaikum Admin Al-Haramain Umrah, mohon penjelasan informasi untuk jadwal keberangkatan terdekat. Terima kasih."
    );
    window.open(`https://wa.me/${companyData.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Dynamic Pop-up Consultation Invitation */}
      {showPopup && (
        <div className="bg-white rounded-2xl border border-gray-150 shadow-2xl p-4 w-[280px] sm:w-[320px] transition-all duration-300 transform scale-100 relative animate-in slide-in-from-bottom-5">
          {/* Top header with avatar */}
          <div className="flex gap-3 mb-3 items-center">
            <div className="relative">
              <span className="w-10 h-10 rounded-full bg-bento-green text-bento-gold flex items-center justify-center text-xs font-serif font-black shadow-sm border border-bento-gold/30">
                CS
              </span>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="text-left">
              <h4 className="font-extrabold text-xs sm:text-sm text-gray-950">Layanan Jemaah</h4>
              <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-ping" />
                Online (Konsultasi Umum)
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 bg-gray-100/60 p-1 rounded-full text-xs"
              aria-label="Tutup"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-green-50/80 rounded-xl p-3 border border-green-100 text-left mb-3">
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              "Assalamualaikum wr. wb. Bapak/Ibu, butuh informasi lengkap untuk ketersediaan kuota pendaftaran, jadwal rincian manasik, atau estimasi biaya umrah gabungan? Silakan klik tombol di bawah."
            </p>
          </div>

          {/* Call to actions */}
          <button
            onClick={handleOpenWA}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white/90" />
            <span>Chat Sekarang via WA</span>
          </button>
        </div>
      )}

      {/* Floating CTA Round Trigger Button */}
      <button
        onClick={handleOpenWA}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/30 cursor-pointer transform hover:scale-105 active:scale-95 transition-all relative"
        aria-label="Hubungi WhatsApp Kami"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 font-light" />

        {/* Badge counter indicator */}
        {badgeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 border-2 border-white text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
            {badgeCount}
          </span>
        )}
      </button>
    </div>
  );
}
