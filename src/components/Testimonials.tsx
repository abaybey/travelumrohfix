import React from "react";
import { Star, MessageSquareCode, BadgeCheck } from "lucide-react";
import { testimonialData } from "../data";

export default function Testimonials() {
  return (
    <section id="testimoni-section" className="py-24 bg-[#FDFBF7] relative overflow-hidden font-sans">
      {/* Visual background circles */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-bento-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-bento-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-bento-green/5 text-bento-green text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider font-sans">
            Review Jujur Jemaah Al-Haramain
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bento-green tracking-tight leading-tight">
            Kisah Khidmat & <span className="text-bento-gold">Safar Penuh Berkat</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-bento-brown leading-relaxed font-light">
            Berikut kesaksian murni dari para bapak, ibu, serta keluarga yang memercayakan safar suci ibadah umrah mereka kepada PT Al-Haramain Mulia Wisata.
          </p>
        </div>

        {/* Testimonials Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialData.map((test) => {
            // Get initials for profile picture replacement
            const initials = test.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (
              <div
                key={test.id}
                className="bg-white p-6 sm:p-8 rounded-[2rem] border border-bento-border shadow-sm hover:border-bento-gold transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  {/* Upper row: Star rating and Quote icon */}
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex text-bento-gold gap-0.5 text-xs">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-bento-gold text-bento-gold" />
                      ))}
                    </div>
                    <MessageSquareCode className="w-6 h-6 text-bento-gold/20" />
                  </div>

                  {/* Review Text */}
                  <p className="text-bento-darkbrown text-xs sm:text-sm leading-relaxed italic mb-6 font-sans">
                    " {test.text} "
                  </p>
                </div>

                {/* Pilgrim Meta Profile Card Info */}
                <div className="flex items-center justify-between gap-4 pt-5 border-t border-bento-border/40 mt-auto font-sans">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bento-green/5 text-bento-green flex items-center justify-center text-xs font-serif font-black border border-bento-border">
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-bento-green text-xs leading-tight flex items-center gap-1">
                        {test.name}
                        <BadgeCheck className="w-4 h-4 text-bento-green inline shrink-0" />
                      </h4>
                      <p className="text-[10px] text-bento-brown font-medium">
                        Usia {test.age} tahun • Dari {test.city}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block bg-bento-green text-bento-gold text-[9px] font-black px-2.5 py-1 rounded-full border border-bento-green/10 uppercase">
                      {test.packageTaken}
                    </span>
                    <p className="text-[9px] text-bento-brown font-mono mt-1 font-bold">
                      Safar: {test.date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Image banner between Sections */}
        <div className="mt-16 bg-bento-green rounded-[2rem] p-8 sm:p-12 relative overflow-hidden text-white shadow-md relative">
          {/* Background image visual of Madinah Green Dome */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="/images/madinah_banner_1779350908562.png"
              alt="Masjid an-Nabawi Madinah"
              className="w-full h-full object-cover object-center opacity-25"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bento-green/95 to-bento-green/80" />
          </div>

          <div className="relative z-10 max-w-2xl text-left space-y-4 font-sans">
            <span className="inline-block bg-bento-gold/20 text-bento-gold font-bold text-[10px] tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-bento-gold/30">
              Menyelesaikan Ziarah Madinah Al-Munawwarah
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              Mengharap Ridho Allah, Meraih Syafaat Rasulullah SAW
            </h3>
            <p className="text-xs text-bento-cream leading-relaxed max-w-xl">
              "Barangsiapa melakukan ibadah haji atau umrah lalu meninggal dunia, maka dia mati seperti mati syahid dan dia akan masuk surga tanpa hisab." — Hadis Riwayat Tabrani.
            </p>
            <div className="pt-2">
              <span className="text-bento-gold font-mono text-[10px] font-bold block uppercase tracking-wide">★ Biro Aman Resmi • Pelayanan Sepenuh Hati • Muthawwif Bersertifikat ★</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
