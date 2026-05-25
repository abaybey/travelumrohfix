import { useState, useEffect } from "react";
import { Phone, Award, ShieldCheck, Menu, X, MessageCircle, Clock } from "lucide-react";
import { companyData } from "../data";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Header height offset
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

  const menuItems = [
    { label: "Beranda", target: "hero-section" },
    { label: "Izin & Legalitas", target: "legality-section" },
    { label: "Paket Umrah", target: "packages-section" },
    { label: "Kalkulator Biaya", target: "calc-section" },
    { label: "Persyaratan", target: "req-section" },
    { label: "Testimoni", target: "testimoni-section" },
    { label: "FAQ", target: "faq-section" },
  ];

  // Helper to open WhatsApp with custom generic message
  const openWAGeneric = () => {
    const message = encodeURIComponent(
      "Assalamualaikum Al-Haramain Umrah, saya ingin bertanya mengenai ketersediaan kuota paket keberangkatan terdekat. Mohon bantuannya."
    );
    window.open(`https://wa.me/${companyData.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Bar for Trust / License */}
      <div className="bg-bento-green text-white text-[11px] sm:text-xs py-2 px-4 border-b border-bento-green/20 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 font-sans">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-bento-gold text-bento-green rounded-full p-0.5 font-bold">
              <Award className="w-3 h-3" />
            </span>
            <span className="font-semibold tracking-wide">{companyData.legalName}</span>
            <span className="hidden md:inline-block text-white/30">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-white/80">
              <ShieldCheck className="w-3.5 h-3.5 text-bento-gold" />
              <span>{companyData.ppiuNumber}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:flex items-center gap-1.5 text-white/80">
              <Clock className="w-3.5 h-3.5 text-bento-gold" />
              <span>{companyData.officeHours}</span>
            </span>
            <a
              href={`tel:${companyData.phone}`}
              className="hover:text-bento-gold transition-colors flex items-center gap-1 font-medium font-mono"
            >
              <Phone className="w-3 h-3 text-bento-gold" />
              <span>{companyData.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-bento-cream/95 backdrop-blur-md py-3 shadow-md border-b border-bento-border"
            : "bg-bento-cream/90 backdrop-blur-sm py-4 border-b border-bento-border text-bento-green"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo Brand / Trademark */}
          <div
            onClick={() => scrollToSection("hero-section")}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 bg-bento-green text-bento-gold rounded-full flex items-center justify-center font-serif font-extrabold text-2xl group-hover:rotate-12 transition-transform shadow-sm">
              H
            </div>
            <div>
              <span className="font-serif font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight block leading-none text-bento-green">
                AL-HARAMAIN
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest font-bold uppercase block text-bento-brown">
                Umrah & Haji Premium
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.target)}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-bento-darkbrown hover:text-bento-green hover:bg-bento-beige/40 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={openWAGeneric}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] active:bg-[#075e54] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-4.5 h-4.5 text-white/90 animate-pulse-slow" />
              <span>Konsultasi WA</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1.5 rounded-xl text-bento-green hover:bg-bento-beige/30 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-bento-green" />
            ) : (
              <Menu className="w-6 h-6 text-bento-green" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-[280px] sm:w-[320px] h-full bg-bento-green shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* Drawer Top */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-bento-gold text-bento-green rounded-full flex items-center justify-center font-serif font-black text-sm">
                  H
                </div>
                <div>
                  <span className="text-white text-base font-extrabold tracking-tight block font-serif">
                    AL-HARAMAIN
                  </span>
                  <span className="text-bento-gold text-[9px] tracking-wider block font-semibold">
                    UMRAH & HAJI PREMIUM
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-bento-gold hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-2 font-sans">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.target)}
                  className="w-full text-left py-2.5 px-4 rounded-lg text-bento-cream hover:bg-white/10 hover:text-white transition-all text-sm font-semibold"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Bottom Info */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-4 font-sans">
            <div className="text-xs text-[#FDFBF7]/85">
              <p className="font-semibold text-white mb-1">PT Al-Haramain Mulia Wisata</p>
              <p className="leading-relaxed opacity-80">{companyData.ppiuNumber}</p>
            </div>
            <button
              onClick={openWAGeneric}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] active:bg-[#075e54] text-white font-bold py-3 rounded-xl shadow-lg transition-colors clickable"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hubungi Kontak WA</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
