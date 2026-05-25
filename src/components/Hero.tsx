import { MessageCircle, ArrowDown, ChevronRight, Sparkles, MapPin, Star, Award } from "lucide-react";
import { companyData, heroData } from "../data";

export default function Hero() {
  const scrollToPackages = () => {
    const element = document.getElementById("packages-section");
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleOpenConsultation = () => {
    const message = encodeURIComponent(
      heroData.waMessage || "Assalamualaikum Admin Al-Haramain Umrah, saya berkunjung ke website Anda dan ingin bertanya mengenai jadwal pendaftaran paket Umrah terdekat. Mohon bimbingannya."
    );
    window.open(`https://wa.me/${companyData.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="hero-section" className="relative pt-36 pb-12 px-4 sm:px-6 max-w-7xl mx-auto bg-bento-cream font-sans">
      {/* Bento Layout Container - Stacks on mobile, forms a beautiful 12-column grid on Large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[minmax(180px,_auto)]">
        
        {/* BLOCK 1: Main Large Hero / Featured Package (Col Span 7 / Row Span 4) */}
        <div className="lg:col-span-8 lg:row-span-3 bg-bento-green rounded-[2rem] p-6 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[440px] shadow-sm border border-bento-green/20">
          {/* Subtle Golden Ambient Circle decoration */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-bento-gold opacity-10 rounded-full blur-xl pointer-events-none"></div>
          
          {/* High-Resolution Mecca Background behind content with elegant overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroData.meccaImage || "/images/mecca_hero_banner_1779350890761.png"}
              alt="Masjid al-Haram Mecca"
              className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bento-green via-bento-green/85 to-bento-green/60" />
          </div>

          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-bento-gold/25 text-bento-gold border border-bento-gold/30 px-4 py-1.5 rounded-full text-xs font-bold w-fit tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              {heroData.badgeText || "Sertifikat PPIU Resmi Kemenag"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black mb-4 leading-tight">
              {heroData.title1 || "Menyahut Panggilan Utama"} <br/>
              <span className="text-bento-gold text-transparent bg-clip-text bg-gradient-to-r from-bento-gold to-yellow-100">
                {heroData.title2 || "Menuju Baitullah Premium"}
              </span>
            </h1>
            <p className="text-[#FDFBF7]/90 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              {heroData.description || "Rasakan kekhidmatan ibadah penuh berkah..."}
            </p>
          </div>

          <div className="relative z-10 pt-6 border-t border-[#FDFBF7]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#FDFBF7]/60 uppercase tracking-widest font-semibold">{heroData.priceLabel || "Mulai Dari Hanya"}</p>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-bento-gold">{heroData.priceValue || "Rp 28.5 Jt"} <span className="text-xs font-sans text-white/50 font-normal">{heroData.priceSub || "/ porsi pax"}</span></p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={scrollToPackages}
                className="bg-bento-gold hover:bg-yellow-500 active:scale-95 text-bento-green px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>{heroData.btnPackagesText || "Lihat Pilihan Paket"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={handleOpenConsultation}
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 px-5 py-3 rounded-2xl font-medium text-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <MessageCircle className="w-4.5 h-4.5 text-bento-gold" />
                <span>{heroData.btnConsultText || "Konsultasi WA"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* BLOCK 2: Highlight Card (Col Span 5 / Row Span 2) */}
        <div className="lg:col-span-4 lg:row-span-2 bg-white border border-bento-border rounded-[2rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-serif font-bold text-bento-green">{heroData.trustTitle || 'Garansi "5 Pasti" Umrah'}</h3>
              <span className="text-xs font-bold text-bento-gold bg-bento-green/10 px-2.5 py-1 rounded-lg">{heroData.trustBadge || "KEMENAG RI"}</span>
            </div>
            <p className="text-xs text-bento-brown mb-4">
              {heroData.trustSub || "Komitmen penuh untuk menjamin perjalanan yang aman, tertib, dan bernilai ibadah maksimal:"}
            </p>
            <ul className="space-y-2.5 flex-1">
              {(heroData.trustItems || []).map((item: string, idx: number) => (
                <li key={idx} className="flex items-center text-xs text-bento-darkbrown">
                  <span className="w-1.5 h-1.5 bg-bento-gold rounded-full mr-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 pt-4 border-t border-bento-border/50 flex justify-between items-center">
            <span className="text-xs tracking-wide text-bento-brown italic font-medium">{heroData.trustFooter || "Layanan Bintang 5"}</span>
            <div className="flex items-center gap-0.5 text-bento-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-bento-gold text-bento-gold" />
              ))}
            </div>
          </div>
        </div>

        {/* BLOCK 3: Statistics Spotlight (Col Span 4 / Row Span 1) */}
        <div className="lg:col-span-4 lg:row-span-1 bg-white border border-bento-border rounded-[2rem] p-6 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300">
          {/* Top Row: Stats Value & Stars */}
          <div className="flex items-center justify-between border-b border-bento-border/60 pb-3">
            <span className="text-3xl sm:text-4xl font-serif font-black text-bento-green tracking-tight leading-none select-none">
              {heroData.statsValue || "350++"}
            </span>
            <div className="text-right flex flex-col items-end">
              <div className="flex items-center gap-0.5 text-bento-gold mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-bento-gold text-bento-gold shrink-0" />
                ))}
              </div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-bento-green/80 leading-none">
                {heroData.statsLabel || "Jamaah Terlayani"}
              </span>
            </div>
          </div>

          {/* Bottom Row: Content Text */}
          <div className="flex flex-col justify-center">
            <h4 className="text-sm sm:text-base font-serif font-bold text-bento-green leading-snug">
              Telah Melayani Ratusan Jamaah
            </h4>
            <p className="text-[11px] text-bento-brown mt-1 leading-normal">
              Perjalanan ibadah aman, nyaman, dan terpercaya sesuai Sunnah Rasulullah SAW.
            </p>
          </div>
        </div>

        {/* BLOCK 4: Headquarters Info (Col Span 3 / Row Span 1) */}
        <div className="lg:col-span-3 lg:row-span-1 bg-white border border-bento-border rounded-[2rem] p-5 flex flex-col justify-center shadow-sm">
          <div className="flex items-center mb-1.5 text-bento-green">
            <MapPin className="w-4.5 h-4.5 text-bento-gold mr-1.5 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wide">Head Office</span>
          </div>
          <p className="text-xs text-bento-darkbrown leading-relaxed mb-0.5">
            {companyData.address}
          </p>
          <p className="text-[10px] text-bento-brown/80 font-mono tracking-tight font-medium">
            Hotline: {companyData.phone}
          </p>
        </div>

        {/* BLOCK 5: Verified Quality Quote Grid (Col Span 5 / Row Span 1) */}
        <div className="lg:col-span-5 lg:row-span-1 bg-bento-beige rounded-[2rem] p-5 flex items-center gap-4 shadow-sm border border-[#DDD5C7]">
          <div className="w-12 h-12 bg-white rounded-full border-2 border-bento-gold flex-shrink-0 flex items-center justify-center font-serif font-black text-bento-green text-lg">
            HJ
          </div>
          <div>
            <p className="text-xs italic font-serif text-bento-green leading-snug mb-1">
              {heroData.testimonialQuote || '"Pelayanan luar biasa rapi, dari manasik pra-keberangkatan hingga pulang ke tanah air dibimbing sangat sabar oleh muthawwif ahli."'}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-bento-brown">
              {heroData.testimonialAuthor || "— Ibu Hj. Siti Fatimah (Jamaah 2024)"}
            </p>
          </div>
        </div>

        {/* BLOCK 6: Trust License Sub-Bar (Col Span 4 / Row Span 1) */}
        <div className="lg:col-span-4 lg:row-span-1 bg-bento-green/5 border border-bento-border rounded-[2rem] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 bg-bento-green text-bento-gold rounded-full flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-bento-gold" />
          </div>
          <div>
            <p className="text-xs font-bold text-bento-green leading-tight mb-0.5">{heroData.trustLicenseTitle || "Izin Kemenag Valid"}</p>
            <p className="text-[11px] text-bento-brown font-mono leading-tight">
              {companyData.ppiuNumber}
            </p>
            <p className="text-[10px] text-green-700 font-semibold mt-1 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              {heroData.trustLicenseStatus || "Aktif & Terverifikasi Nasional"}
            </p>
          </div>
        </div>

      </div>

      {/* Down Scroll Arrow Button */}
      <div className="mt-8 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase font-bold tracking-widest text-bento-brown">Pilih Paket Umroh Ideal Anda</span>
        <button
          onClick={scrollToPackages}
          className="p-2.5 bg-white border border-bento-border rounded-full text-bento-green hover:bg-bento-beige transition-all shadow-sm animate-bounce"
          aria-label="Scroll ke Paket"
        >
          <ArrowDown className="w-4 h-4 text-bento-green" />
        </button>
      </div>
    </section>
  );
}
