import React from "react";
import { ShieldAlert, CheckCircle2, Award, HeartHandshake, Eye, Star, ShieldCheck } from "lucide-react";
import { companyData, legalityData } from "../data";

export default function Legality() {
  const fivePasti = legalityData.fivePasti || [
    {
      title: "Pasti Travel Berizin PPIU resmi",
      desc: "PT Al-Haramain Mulia Wisata memegang nomor izin PPIU Kemenag RI. Resmi dan legal terdaftar di Siskopatuh Kemenag.",
      badge: "Izin PPIU Valid"
    },
    {
      title: "Pasti Jadwal & Maskapainya",
      desc: "Tiket penerbangan PP Jakarta ke Arab Saudi bersertifikasi lunas cepat. Jadwal & maskapai diumumkan detail di brosur.",
      badge: "Direct Flight"
    },
    {
      title: "Pasti Terbang & Visanya",
      desc: "Menjamin visa umrah Anda terbit resmi sebelum keberangkatan dengan verifikasi data biometrik komprehensif.",
      badge: "Visa Terjamin"
    },
    {
      title: "Pasti Hotel Akomodasinya",
      desc: "Hotel yang kami gunakan sesuai dengan kontrak resmi. Jarak dekat & nyaman untuk optimalisasi ibadah.",
      badge: "Sesuai Kontrak"
    },
    {
      title: "Pasti Layanan Fiqihnya",
      desc: "Pendampingan ibadah dari tanah air hingga kepulangan dipandu oleh Muthawwif certified lulusan universitas Saudi.",
      badge: "Sesuai Sunnah"
    }
  ];

  const features = [
    {
      icon: <Award className="w-5 h-5 text-bento-gold" />,
      title: "Berdiri Sejak 2018",
      desc: "Berpengalaman tinggi memberangkatkan ribuan jemaah dengan tingkat keberhasilan safar 100% tepat waktu."
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-bento-gold" />,
      title: "Bimbingan Terbaik",
      desc: "Manasik umrah intensif teori & praktek simulasi tawaf & sa'i agar mandiri optimal saat ibadah sesungguhnya."
    },
    {
      icon: <Eye className="w-5 h-5 text-bento-gold" />,
      title: "Layanan Transparan",
      desc: "Harga jujur (all-in) tanpa nominal terselubung yang ditagihkan mendadak menjelang kepakan safar."
    },
    {
      icon: <Star className="w-5 h-5 text-bento-gold" />,
      title: "Keamanan Finansial",
      desc: "Manajemen dana aman terpusat via rekening resmi Bank Syariah Indonesia (BSI) atas nama PT Al-Haramain Mulia Wisata."
    }
  ];

  return (
    <section id="legality-section" className="py-24 bg-[#FDFBF7] relative overflow-hidden font-sans">
      {/* Decorative Golden Ambient Splashes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bento-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-bento-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-bento-green/5 text-bento-green text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-bento-green" /> Izin Kementerian Agama RI PPIU
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bento-green tracking-tight leading-tight">
            {legalityData.title1 || "Ibadah Tenang, Fasilitas Nyaman &"} <br/> <span className="text-bento-gold font-normal italic">{legalityData.title2 || "Garansi 100% Legal"}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-bento-brown leading-relaxed font-light">
            {legalityData.description || "Menunaikan umrah adalah safar mulia..."}
          </p>
        </div>

        {/* Certificate Display Area - Bento Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          
          {/* Left Block - PPIU Accreditation Card (Col Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-[2rem] border border-bento-border p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-bento-gold transition-all">
            <div>
              <h3 className="text-xl font-serif font-bold text-bento-green mb-3">Legalitas & Sertifikasi Resmi</h3>
              <p className="text-bento-darkbrown text-xs leading-relaxed mb-6">
                Izin PPIU merupakan lisensi resmi Penyelenggara Perjalanan Ibadah Umrah yang diterbitkan oleh Kementerian Agama Republik Indonesia untuk menjamin standar operasional ketat serta perlindungan finansial bagi jemaah.
              </p>

              {/* The Islamic Styled Badge */}
              <div className="bg-bento-green text-white rounded-[1.5rem] p-6 mb-6 relative overflow-hidden shadow-inner">
                <div className="absolute -right-6 -bottom-6 text-bento-green/20 font-serif font-black text-8xl">RI</div>
                
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <span className="w-6 h-4 bg-[#E21C26] border border-white/20 rounded-sm relative overflow-hidden inline-block shrink-0">
                    <span className="absolute bottom-0 left-0 right-0 top-1/2 bg-white" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-bento-gold text-xs tracking-wider uppercase">KEMENTERIAN AGAMA RI</h4>
                    <p className="text-[10px] text-white/70 uppercase">Sertifikasi Penyelenggara Resmi</p>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4 relative z-10">
                  <p className="text-[11px] text-white/65">Terdaftar Resmi Atas Nama:</p>
                  <p className="font-serif font-bold text-base mt-0.5 text-white">{companyData.legalName}</p>
                  <p className="text-bento-gold font-mono text-xs mt-2 font-bold px-2 py-1 bg-white/5 w-fit rounded-lg">{companyData.ppiuNumber}</p>
                </div>
              </div>
            </div>

            {/* List of Affiliations */}
            <div>
              <p className="text-[10px] font-bold text-bento-brown uppercase tracking-wider mb-2.5">Afiliasi & Keanggotaan Utama</p>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-1 bg-bento-cream text-bento-green font-semibold text-[10px] rounded-lg border border-bento-border">AMPHURI Member</span>
                <span className="px-2.5 py-1 bg-bento-cream text-bento-green font-semibold text-[10px] rounded-lg border border-bento-border">SISKOPATUH Aktif</span>
                <span className="px-2.5 py-1 bg-bento-cream text-bento-green font-semibold text-[10px] rounded-lg border border-bento-border">IATA Certified</span>
              </div>
            </div>
          </div>

          {/* Right Block - Official 5 Pasti Umrah (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            <div className="bg-bento-beige text-bento-green rounded-[2rem] p-6 shadow-sm border border-[#DDD5C7]">
              <div className="flex gap-4 items-start">
                <div className="bg-bento-green text-bento-gold p-3 rounded-full shrink-0">
                  <ShieldAlert className="w-5 h-5 text-bento-gold" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-bento-green">Gerakan Kemenag RI: "5 Pasti Umrah"</h4>
                  <p className="text-xs text-bento-darkbrown mt-1.5 leading-relaxed">
                    Kementerian Agama Republik Indonesia menghimbau masyarakat untuk senantiasa memastikan 5 aspek krusial sebelum melakukan pendaftaran safar. Di Al-Haramain, kami memberikan garansi kelimanya dari awal:
                  </p>
                </div>
              </div>
            </div>

            {/* 5 Pasti Grid Details inside Bento layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {fivePasti.map((item: any, idx: number) => (
                <div key={idx} className="bg-white border border-bento-border rounded-2xl p-4 flex flex-col justify-between hover:border-bento-gold transition-all shadow-sm">
                  <div>
                    <span className="inline-block bg-bento-green/10 text-bento-green text-[9px] font-bold px-2 py-0.5 rounded-full mb-2">
                      {item.badge}
                    </span>
                    <h5 className="font-serif font-bold text-bento-green text-xs leading-snug">
                      {item.title}
                    </h5>
                    <p className="text-[10px] text-bento-brown mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-bento-border/40 flex items-center justify-between text-bento-green">
                    <span className="text-[9px] font-mono font-bold text-bento-brown">Pasti {idx + 1}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-bento-green shrink-0" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Dynamic Trust Features Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-bento-border">
          {features.map((feat, index) => (
            <div key={index} className="flex gap-4 items-start p-4 hover:bg-white rounded-2xl border border-transparent hover:border-bento-border transition-all duration-300">
              <div className="p-2.5 bg-bento-green text-bento-gold rounded-full">
                {feat.icon}
              </div>
              <div>
                <h4 className="font-serif font-bold text-bento-green text-sm">{feat.title}</h4>
                <p className="text-xs text-bento-brown mt-1 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
