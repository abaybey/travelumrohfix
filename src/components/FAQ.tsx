import React, { useState, useMemo } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { faqData } from "../data";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<"semua" | "umum" | "pembayaran" | "dokumen" | "fasilitas">("semua");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1"); // Initialize the first FAQ row open by default for visual cues

  const categories = [
    { key: "semua", label: "Tampilkan Semua" },
    { key: "umum", label: "Umum & Legalitas" },
    { key: "pembayaran", label: "Sistem Pembayaran" },
    { key: "dokumen", label: "Persyaratan Berkas" },
    { key: "fasilitas", label: "Fasilitas & Perlengkapan" }
  ];

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "semua") return faqData;
    return faqData.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  const toggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  return (
    <section id="faq-section" className="py-24 bg-bento-cream relative font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-bento-green/5 text-bento-green text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-bento-green" /> Tanya Jawab Jemaah
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bento-green tracking-tight leading-tight">
            Menjawab Pertanyaan <span className="text-bento-gold">Calon Jemaah</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-bento-brown leading-relaxed font-light">
            Berikut jawaban praktis terhadap berbagai hal yang paling sering ditanyakan oleh calon jemaah mengenai perjalanan ibadah umrah bersama PT Al-Haramain Mulia Wisata.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-10 p-1.5 bg-white border border-bento-border rounded-xl max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key as any);
                setOpenFaqId(null);
              }}
              className={`px-3 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-bento-green text-bento-gold shadow-sm"
                  : "text-bento-brown hover:text-bento-green"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Expansion List */}
        <div className="space-y-3.5 max-w-3xl mx-auto">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-bento-gold shadow-sm"
                    : "border-bento-border hover:border-bento-gold"
                }`}
              >
                {/* Accordion Row Header Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-bento-green text-xs sm:text-sm md:text-base leading-snug flex gap-3.5 items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-bento-green/5 text-bento-green text-xs font-semibold shrink-0 mt-0.5 font-sans">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <span className="ml-4 text-bento-green bg-bento-green/5 p-1 rounded-full shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {/* Accordion Answers Body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[500px] border-t border-bento-border/40" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-bento-darkbrown text-xs sm:text-sm leading-relaxed bg-[#FDFBF7] font-sans font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Support Callback Info */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-bento-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto font-sans">
          <div className="flex gap-4 items-start text-left">
            <div className="p-3 bg-bento-green/5 text-bento-green rounded-2xl shrink-0">
              <HelpCircle className="w-6 h-6 text-bento-green" />
            </div>
            <div>
              <h4 className="font-bold text-bento-green text-xs sm:text-sm">Pertanyaan Anda belum terjawab?</h4>
              <p className="text-[11px] text-bento-brown leading-normal mt-0.5">Silakan tanyakan langsung melalui chat asisten customer service kami yang online siap membantu Anda.</p>
            </div>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Assalamualaikum%20Al-Haramain%20Umrah%2C%20ada%20pertanyaan%20mengenai%20syarat%20bepergian%20dan%20pemberangkatan%20yang%20ingin%20saya%20tanyakan."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md shrink-0 cursor-pointer"
          >
            Obrolan Chat via WA →
          </a>
        </div>
      </div>
    </section>
  );
}
