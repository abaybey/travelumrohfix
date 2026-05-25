import React from "react";
import { CheckCircle, FileText, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { stepsToRegister, requirementsDocuments } from "../data";

export default function Requirements() {
  return (
    <section id="req-section" className="py-24 bg-[#FDFBF7] relative overflow-hidden font-sans">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-bento-gold/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-bento-green/5 text-bento-green text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-bento-green" /> Panduan Dokumen & Calon Jemaah
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bento-green tracking-tight leading-tight">
            Persyaratan Administrasi & <br/> <span className="text-bento-gold italic font-normal">Alur Mudah Pendaftaran</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-bento-brown leading-relaxed font-light">
            Berikut petunjuk melakukan registrasi umrah mandiri serta rincian perlengkapan administratif wajib. Segenap tim operasional kami siap memandu proses paspor & penerbitan visa Anda.
          </p>
        </div>

        {/* Part 1: Staggered Registration Steps in Bento Block slots */}
        <div className="mb-20">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-bento-green mb-8 text-center">
            5 Langkah Mudah Daftar Keberangkatan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {stepsToRegister.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2rem] p-6 border border-bento-border shadow-sm relative group hover:border-bento-gold transition-all"
              >
                {/* Connecting arrow indicator for desktop rows */}
                {idx < 4 && (
                  <div className="hidden md:block absolute top-[44px] -right-3.5 transform translate-x-1/2 z-10 text-bento-gold animate-pulse-slow">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                {/* Big steps serial number */}
                <div className="text-3xl font-serif font-extrabold text-bento-green/15 mb-4 group-hover:text-bento-green/45 transition-colors">
                  {step.step}
                </div>

                <h4 className="font-serif font-bold text-bento-green text-sm leading-snug mb-2">
                  {step.title}
                </h4>

                <p className="text-[11px] text-[#8B7355] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Bento Requirements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-6">
          
          {/* Left Block - List of exact documents requested (Col Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 sm:p-8 border border-bento-border shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-bento-green mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-bento-gold" /> Dokumen Wajib Pelengkap
              </h3>
              <p className="text-xs text-[#8B7355] mb-6 leading-relaxed">
                Kumpulkan draf berkas berikut minimal 30 hari sebelum hari-H keberangkatan guna verifikasi validasi visa elektronik di Siskopatuh Kemenag RI.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {requirementsDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-bento-green/5 border border-transparent rounded-[1.2rem] hover:bg-white hover:border-bento-border hover:shadow-sm transition-all"
                  >
                    <div className="flex gap-2 items-start">
                      <span className="text-bento-gold shrink-0 text-sm">✦</span>
                      <div>
                        <h4 className="font-serif font-bold text-bento-green text-xs leading-snug">
                          {doc.title}
                        </h4>
                        <p className="text-[10px] text-bento-brown mt-1 font-sans leading-relaxed">
                          {doc.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block - Vaccine, Insurance & Kit previews (Col Span 5) */}
          <div className="lg:col-span-5 bg-bento-green text-white rounded-[2rem] p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between border border-bento-green">
            <div className="absolute top-0 right-0 w-48 h-48 bg-bento-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="inline-flex bg-bento-gold/20 text-bento-gold font-bold text-[10px] tracking-wide px-3.5 py-1.5 rounded-full mb-4 uppercase border border-bento-gold/30">
                <Sparkles className="w-3 h-3 text-bento-gold inline" /> Penting Dipahami
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight mb-3">
                Sudah Termasuk Perlengkapan Safar Lengkap (All-In Fee)
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Kami melengkapi barang bawaan Anda dengan perlengkapan idaman terbaik untuk mengabdi penuh khusyuk di Al-Haramain:
              </p>

              {/* Checklists */}
              <div className="space-y-3 font-sans">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-bento-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-[#FDFBF7]/90">Koper premium koper beroda 24 inch (Bahan fiber ringan & anti-pecah)</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-bento-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-[#FDFBF7]/90">Kain Batik seragam khusus eksklusif PT Al-Haramain Mulia Wisata</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-bento-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-[#FDFBF7]/90">Kain Ihram + Ikat Sabuk (Pria) / Mukena Atasan & Bawahan (Wanita)</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-bento-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-[#FDFBF7]/90">Daftar buku panduan doa saku & tas paspor gantung anti air</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 mt-6 flex items-center justify-between gap-4 font-sans">
              <div className="text-xs">
                <span className="font-bold text-bento-gold block">Suntik Vaksin Meningitis</span>
                <span className="leading-normal text-white/70 text-[11px]">Rekomendasi dianjurkan di fasilitas kesehatan KKP / Klinik Kimia Farma</span>
              </div>
              <ShieldCheck className="w-8 h-8 text-bento-gold shrink-0 opacity-40 animate-pulse-slow" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
