import { MapPin, Phone, Mail, Clock, ShieldCheck, ExternalLink } from "lucide-react";
import { companyData, footerData } from "../data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
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

  const handleOpenMaps = () => {
    const url = companyData.googleMapsUrl || "https://maps.google.com/?q=Karet+Semanggi+Jakarta+Selatan+Jalan+Sudirman";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 font-sans border-t border-neutral-800">
      {/* Upper Footer: Main Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Firm Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-bento-gold text-bento-green rounded-full flex items-center justify-center font-serif font-black text-lg shadow-sm">
                {footerData.brandTitle ? footerData.brandTitle[0] : "H"}
              </div>
              <div>
                <span className="font-serif font-extrabold text-lg text-white tracking-tight block">{footerData.brandTitle || "AL-HARAMAIN"}</span>
                <span className="text-bento-gold text-[9px] uppercase font-bold tracking-widest block font-sans">{footerData.brandSubtitle || "Umrah & Haji Premium"}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {footerData.description}
            </p>

            <div className="pt-3 flex flex-col gap-2 border-t border-neutral-900">
              <div className="flex gap-2 items-center text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-extrabold text-neutral-200">Terdaftar Kemenag RI PPIU</span>
              </div>
              <span className="text-[11px] font-mono font-bold bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-bento-gold w-fit">
                {companyData.ppiuNumber}
              </span>
            </div>
          </div>

          {/* Column 2: Physical HQ Directions & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Kantor Pusat</h3>
            <div className="space-y-3.5">
              <div className="flex gap-3 text-xs leading-relaxed">
                <MapPin className="w-4 h-4 text-bento-gold shrink-0 mt-0.5" />
                <span>{companyData.address}</span>
              </div>
              <div className="flex gap-3 text-xs items-center">
                <Clock className="w-4 h-4 text-bento-gold shrink-0" />
                <span>{companyData.officeHours}</span>
              </div>
              <div className="flex gap-3 text-xs items-center font-mono">
                <Phone className="w-4 h-4 text-bento-gold shrink-0" />
                <span>{companyData.phone} / {companyData.whatsappDisplay}</span>
              </div>
              <div className="flex gap-3 text-xs items-center font-mono">
                <Mail className="w-4 h-4 text-bento-gold shrink-0" />
                <span>{companyData.email}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation Shortlinks (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2.5 text-xs">
              {(footerData.quickLinks || []).map((link: any, idx: number) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="hover:text-amber-500 cursor-pointer text-left transition-colors font-medium text-neutral-400"
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Static Mock Maps Widget Location (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Lokasi Kantor</h3>
            {/* Minimal Map Preview Graphic Card click-to-open maps coords */}
            <div
              onClick={handleOpenMaps}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-2.5 shadow-lg relative cursor-pointer hover:border-amber-500 transition-all text-left"
            >
              {/* Minimal geometric isometric layout represent maps */}
              <div className="bg-neutral-950 h-24 rounded-lg relative overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#15803d_8%,transparent_8%),radial-gradient(circle_at_70%_60%,#b45309_12%,transparent_12%)]">
                {/* Horizontal lines and streets layout mock */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(90deg,transparent_49%,#ffffff_49%,#ffffff_51%,transparent_51%),linear-gradient(transparent_49%,#ffffff_49%,#ffffff_51%,transparent_51%)] bg-[size:20px_20px]" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="flex h-4 w-4 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border border-white flex items-center justify-center font-bold text-[7px] text-white">HQ</span>
                  </span>
                </div>
                <div className="absolute bottom-1 right-2 text-[8px] text-neutral-500 font-bold uppercase tracking-wider">Sudirman, Jkt</div>
              </div>
              <div className="pt-2 flex justify-between items-center text-[10px] text-neutral-400">
                <span>Klik Petunjuk Arah</span>
                <ExternalLink className="w-3 h-3 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer: Accreditation Logos and Copyright Details */}
      <div className="bg-neutral-950 py-8 border-t border-neutral-900 text-center px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-medium">
          <p>© {currentYear} {companyData.legalName}. {footerData.copyrightText}</p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            {(footerData.bottomLinks || []).map((link: any, idx: number, arr: any[]) => (
              <span key={idx} className="flex items-center gap-3">
                <a href={link.url} className="hover:text-amber-500 transition-colors">
                  {link.label}
                </a>
                {idx < arr.length - 1 && <span className="pointer-events-none">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
