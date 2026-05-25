import React, { useState } from "react";
import { 
  Lock, User, Plus, Trash2, Edit, Save, LogOut, Globe, Building, Layout, 
  Award, FileText, CheckCircle2, MessageSquare, HelpCircle, Download, ArrowLeft, Star, Link
} from "lucide-react";
import { 
  companyData, heroData, legalityData, umrahPackages, faqData, 
  testimonialData, stepsToRegister, requirementsDocuments, footerData, saveLiveData 
} from "../data";

export default function AdminPage() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("alharamain_admin_logged_in") === "true";
    }
    return false;
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState("company");

  // Editable States
  const [company, setCompany] = useState(companyData);
  const [hero, setHero] = useState(heroData);
  const [legality, setLegality] = useState(legalityData);
  const [packages, setPackages] = useState(umrahPackages);
  const [faqs, setFaqs] = useState(faqData);
  const [testimonials, setTestimonials] = useState(testimonialData);
  const [steps, setSteps] = useState(stepsToRegister);
  const [requirements, setRequirements] = useState(requirementsDocuments);
  const [footer, setFooter] = useState(footerData);

  // Status State
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  // Sub-editors States (for Modal/Editor)
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [packageForm, setPackageForm] = useState<any>(null);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "t1m3") {
      setIsLoggedIn(true);
      window.localStorage.setItem("alharamain_admin_logged_in", "true");
      setLoginError("");
    } else {
      setLoginError("Username atau password salah!");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.localStorage.removeItem("alharamain_admin_logged_in");
  };

  // Handle Save All
  const handleSaveAll = async () => {
    setSaveStatus("saving");
    const payload = {
      companyData: company,
      hero,
      legality,
      umrahPackages: packages,
      faqData: faqs,
      testimonialData: testimonials,
      stepsToRegister: steps,
      requirementsDocuments: requirements,
      footer
    };

    const success = await saveLiveData(payload);
    if (success) {
      setSaveStatus("success");
      setSaveMessage("Perubahan berhasil disimpan permanen ke disk dan localStorage!");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    } else {
      setSaveStatus("error");
      setSaveMessage("Gagal menyimpan perubahan ke server disk. Disimpan di lokal browser saja.");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 4000);
    }
  };

  // Download Config JSON
  const handleDownloadJSON = () => {
    const payload = {
      companyData: company,
      hero,
      legality,
      umrahPackages: packages,
      faqData: faqs,
      testimonialData: testimonials,
      stepsToRegister: steps,
      requirementsDocuments: requirements,
      footer
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "data-editable.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Package Edit/Add Helpers
  const openPackageEditor = (pkg: any) => {
    setEditingPackageId(pkg.id);
    setPackageForm({ ...pkg });
  };

  const openNewPackageEditor = () => {
    setEditingPackageId("new");
    setPackageForm({
      id: "pkg-" + Date.now(),
      name: "Paket Umrah Baru",
      subtitle: "Deskripsi paket umrah yang menarik...",
      badge: "Hemat",
      durationDays: 9,
      priceQuad: 28000000,
      priceTriple: 30000000,
      priceDouble: 32000000,
      departureMonth: "September 2026",
      departureDate: "10 September 2026",
      airline: "Batik Air (Direct Jeddah)",
      airlineLogo: "✈️",
      meccaHotel: "Hotel Bintang 5 Makkah",
      meccaHotelStars: 5,
      meccaHotelDistance: "100 meter",
      madinahHotel: "Hotel Bintang 4 Madinah",
      madinahHotelStars: 4,
      madinahHotelDistance: "150 meter",
      highlights: ["Penerbangan Langsung", "Manasik Terstruktur"],
      inclusions: ["Tiket PP", "Visa Umrah", "Hotel Makkah/Madinah", "Catering 3x"],
      exclusions: ["Paspor", "Pengeluaran Pribadi"],
      quotaTotal: 40,
      seatsRemaining: 40
    });
  };

  const savePackageForm = () => {
    if (!packageForm) return;
    if (editingPackageId === "new") {
      setPackages([...packages, packageForm]);
    } else {
      setPackages(packages.map(p => p.id === editingPackageId ? packageForm : p));
    }
    setEditingPackageId(null);
    setPackageForm(null);
  };

  const deletePackage = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  // Render Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bento-cream flex items-center justify-center px-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2rem] border border-bento-border p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-bento-gold opacity-10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-bento-green opacity-5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-bento-green text-bento-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-8 h-8 text-bento-gold" />
            </div>
            <h1 className="text-2xl font-serif font-black text-bento-green">Al-Haramain Admin</h1>
            <p className="text-xs text-bento-brown mt-1">Masukkan kata sandi pengelola untuk mengedit seluruh halaman</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-bold text-bento-green uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-bento-brown/65">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="block w-full pl-10 pr-3 py-3 border border-bento-border rounded-2xl text-sm focus:outline-none focus:border-bento-gold bg-bento-cream/20 text-bento-green font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-bento-green uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-bento-brown/65">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 border border-bento-border rounded-2xl text-sm focus:outline-none focus:border-bento-gold bg-bento-cream/20 text-bento-green font-medium"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">{loginError}</p>
            )}

            <button 
              type="submit"
              className="w-full bg-bento-green hover:bg-emerald-900 active:scale-95 text-bento-gold py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Masuk Aplikasi</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bento-cream font-sans pb-24">
      {/* Dynamic Header Dual-Bar */}
      <header className="bg-bento-green text-white py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-40 border-b border-bento-green/20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
            <Layout className="w-5 h-5 text-bento-gold" />
          </div>
          <div>
            <h1 className="font-serif font-black text-lg tracking-tight text-white flex items-center gap-2">
              Al-Haramain <span className="text-xs font-sans font-bold bg-bento-gold text-bento-green px-2 py-0.5 rounded-md">ADMIN EDITOR</span>
            </h1>
            <p className="text-[10px] text-white/60">Edit seluruh elemen dan isi website travel secara visual</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lihat Web</span>
          </button>
          <button 
            onClick={handleDownloadJSON}
            className="px-4 py-2 bg-bento-gold/20 hover:bg-bento-gold/30 text-bento-gold border border-bento-gold/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor JSON</span>
          </button>
          <button 
            onClick={handleSaveAll}
            disabled={saveStatus === "saving"}
            className="px-5 py-2.5 bg-bento-gold hover:bg-yellow-500 text-bento-green rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saveStatus === "saving" ? "Menyimpan..." : "SIMPAN PERUBAHAN"}</span>
          </button>
          <button 
            onClick={handleLogout}
            className="p-2.5 bg-red-950/20 text-red-400 hover:bg-red-900/35 border border-red-500/20 rounded-xl transition-all cursor-pointer"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Navigation Sidebar */}
        <div className="space-y-2 lg:col-span-1">
          <p className="text-[10px] font-bold text-bento-brown uppercase tracking-widest pl-3 mb-2">Bagian Website</p>
          {[
            { id: "company", label: "Profil PT & Kontak", icon: <Building className="w-4 h-4" /> },
            { id: "hero", label: "Hero Banner & Stat", icon: <Layout className="w-4 h-4" /> },
            { id: "legality", label: "Legalitas & 5 Pasti", icon: <Award className="w-4 h-4" /> },
            { id: "packages", label: "Paket Pilihan Umroh", icon: <Globe className="w-4 h-4" /> },
            { id: "steps", label: "Alur Pendaftaran", icon: <CheckCircle2 className="w-4 h-4" /> },
            { id: "docs", label: "Persyaratan Dokumen", icon: <FileText className="w-4 h-4" /> },
            { id: "testimonials", label: "Testimoni Jamaah", icon: <MessageSquare className="w-4 h-4" /> },
            { id: "faqs", label: "Pertanyaan (FAQ)", icon: <HelpCircle className="w-4 h-4" /> },
            { id: "footer", label: "Footer & Navigasi", icon: <Link className="w-4 h-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-3 border cursor-pointer ${
                activeTab === item.id 
                  ? "bg-bento-green text-bento-gold border-bento-green shadow-sm" 
                  : "bg-white text-bento-green border-bento-border hover:bg-bento-beige"
              }`}
            >
              <span className={activeTab === item.id ? "text-bento-gold" : "text-bento-gold"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}

          {/* Prompt status alert */}
          {saveStatus !== "idle" && (
            <div className={`mt-6 p-4 rounded-[1.5rem] border text-xs leading-relaxed ${
              saveStatus === "success" 
                ? "bg-green-50 text-green-800 border-green-200" 
                : saveStatus === "error" 
                  ? "bg-red-50 text-red-800 border-red-200" 
                  : "bg-blue-50 text-blue-800 border-blue-200"
            }`}>
              <p className="font-bold flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full inline-block ${
                  saveStatus === "success" ? "bg-green-500" : saveStatus === "error" ? "bg-red-500" : "bg-blue-500 animate-ping"
                }`}></span>
                {saveStatus === "saving" ? "Menyimpan Berkas" : saveStatus === "success" ? "Tersimpan!" : "Gagal!"}
              </p>
              <p className="mt-1 font-light opacity-90">{saveMessage}</p>
            </div>
          )}
        </div>

        {/* Right Content Editor Card */}
        <div className="lg:col-span-3 bg-white border border-bento-border rounded-[2rem] p-6 sm:p-8 shadow-sm">
          
          {/* TAB 1: Company / PT Info */}
          {activeTab === "company" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4">
                <h2 className="text-xl font-serif font-bold text-bento-green">Profil PT & Kontak Travel</h2>
                <p className="text-xs text-bento-brown font-light mt-0.5">Edit detail entitas legal, alamat kantor, no telepon/WA dan media sosial</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Nama Singkat / Brand</label>
                  <input 
                    type="text" 
                    value={company.brandName}
                    onChange={(e) => setCompany({ ...company, brandName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Nama Legal Perusahaan (PT)</label>
                  <input 
                    type="text" 
                    value={company.legalName}
                    onChange={(e) => setCompany({ ...company, legalName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Nomor Izin PPIU Kemenag</label>
                  <input 
                    type="text" 
                    value={company.ppiuNumber}
                    onChange={(e) => setCompany({ ...company, ppiuNumber: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Alamat Lengkap Kantor Pusat</label>
                  <textarea 
                    rows={3}
                    value={company.address}
                    onChange={(e) => setCompany({ ...company, address: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Jam Operasional Kantor</label>
                  <input 
                    type="text" 
                    value={company.officeHours}
                    onChange={(e) => setCompany({ ...company, officeHours: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Telepon Kantor (Hotline)</label>
                  <input 
                    type="text" 
                    value={company.phone}
                    onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Nomor WA API (Format: 62812...)</label>
                  <input 
                    type="text" 
                    value={company.whatsappNumber}
                    onChange={(e) => setCompany({ ...company, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">WhatsApp Tampilan (contoh: +62 812...)</label>
                  <input 
                    type="text" 
                    value={company.whatsappDisplay}
                    onChange={(e) => setCompany({ ...company, whatsappDisplay: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Email Kantor</label>
                  <input 
                    type="email" 
                    value={company.email}
                    onChange={(e) => setCompany({ ...company, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Google Maps Link (Lokasi Kantor)</label>
                  <input 
                    type="text" 
                    value={company.googleMapsUrl || ""}
                    onChange={(e) => setCompany({ ...company, googleMapsUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    placeholder="https://maps.google.com/?q=..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Instagram Username</label>
                  <input 
                    type="text" 
                    value={company.socials.instagram}
                    onChange={(e) => setCompany({ ...company, socials: { ...company.socials, instagram: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hero Section */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4">
                <h2 className="text-xl font-serif font-bold text-bento-green">Hero Section & Highlight Banner</h2>
                <p className="text-xs text-bento-brown font-light mt-0.5">Edit teks utama halaman awal, lencana legalitas, harga acuan awal, dan stat banner.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Lencana Atas (Top Badge)</label>
                  <input 
                    type="text" 
                    value={hero.badgeText}
                    onChange={(e) => setHero({ ...hero, badgeText: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Judul Baris 1</label>
                    <input 
                      type="text" 
                      value={hero.title1}
                      onChange={(e) => setHero({ ...hero, title1: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Judul Baris 2 (Gradasi Emas)</label>
                    <input 
                      type="text" 
                      value={hero.title2}
                      onChange={(e) => setHero({ ...hero, title2: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Deskripsi / Paragraf Hero</label>
                  <textarea 
                    rows={3}
                    value={hero.description}
                    onChange={(e) => setHero({ ...hero, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Label Harga Mulai</label>
                    <input 
                      type="text" 
                      value={hero.priceLabel}
                      onChange={(e) => setHero({ ...hero, priceLabel: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Nominal Harga Mulai</label>
                    <input 
                      type="text" 
                      value={hero.priceValue}
                      onChange={(e) => setHero({ ...hero, priceValue: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Sub-teks Porsi Pax</label>
                    <input 
                      type="text" 
                      value={hero.priceSub}
                      onChange={(e) => setHero({ ...hero, priceSub: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Teks Tombol Paket</label>
                    <input 
                      type="text" 
                      value={hero.btnPackagesText}
                      onChange={(e) => setHero({ ...hero, btnPackagesText: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Teks Tombol Konsultasi</label>
                    <input 
                      type="text" 
                      value={hero.btnConsultText}
                      onChange={(e) => setHero({ ...hero, btnConsultText: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Pesan WA Default</label>
                  <textarea 
                    rows={2}
                    value={hero.waMessage}
                    onChange={(e) => setHero({ ...hero, waMessage: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-bento-border pt-4">
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Angka Statistik Spotlight</label>
                    <input 
                      type="text" 
                      value={hero.statsValue}
                      onChange={(e) => setHero({ ...hero, statsValue: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Label Statistik</label>
                    <input 
                      type="text" 
                      value={hero.statsLabel}
                      onChange={(e) => setHero({ ...hero, statsLabel: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                </div>

                <div className="border-t border-bento-border pt-4">
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Kutipan Review Singkat Hero</label>
                  <textarea 
                    rows={2}
                    value={hero.testimonialQuote}
                    onChange={(e) => setHero({ ...hero, testimonialQuote: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown italic"
                  />
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mt-2 mb-1">Penulis Kutipan</label>
                  <input 
                    type="text" 
                    value={hero.testimonialAuthor}
                    onChange={(e) => setHero({ ...hero, testimonialAuthor: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Legality */}
          {activeTab === "legality" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4">
                <h2 className="text-xl font-serif font-bold text-bento-green">Legalitas & 5 Pasti Umrah</h2>
                <p className="text-xs text-bento-brown font-light mt-0.5">Edit judul dan penjelasan rincian 5 komitmen pasti umrah Kemenag RI.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Judul Utama Seksi Legalitas</label>
                  <input 
                    type="text" 
                    value={legality.title1}
                    onChange={(e) => setLegality({ ...legality, title1: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Judul Utama Baris Emas</label>
                  <input 
                    type="text" 
                    value={legality.title2}
                    onChange={(e) => setLegality({ ...legality, title2: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Penjelasan Sub-Judul</label>
                  <textarea 
                    rows={3}
                    value={legality.description}
                    onChange={(e) => setLegality({ ...legality, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>

                <div className="border-t border-bento-border pt-4">
                  <p className="text-xs font-bold text-bento-green uppercase tracking-wider mb-3">Edit Daftar 5 Komitmen Pasti Kemenag</p>
                  <div className="space-y-4">
                    {(legality.fivePasti || []).map((item: any, idx: number) => (
                      <div key={idx} className="bg-bento-cream/20 p-4 border border-bento-border rounded-2xl space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-bento-green px-2 py-0.5 bg-bento-gold/25 text-bento-green rounded-md">Pasti {idx + 1}</span>
                          <input 
                            type="text" 
                            value={item.badge}
                            onChange={(e) => {
                              const newPasti = [...legality.fivePasti];
                              newPasti[idx].badge = e.target.value;
                              setLegality({ ...legality, fivePasti: newPasti });
                            }}
                            placeholder="Lencana"
                            className="px-2 py-1 text-[10px] border border-bento-border rounded-md font-mono"
                          />
                        </div>
                        <input 
                          type="text" 
                          value={item.title}
                          onChange={(e) => {
                            const newPasti = [...legality.fivePasti];
                            newPasti[idx].title = e.target.value;
                            setLegality({ ...legality, fivePasti: newPasti });
                          }}
                          placeholder="Judul Pasti"
                          className="w-full px-3 py-1.5 text-xs font-serif font-bold border border-bento-border rounded-lg text-bento-green"
                        />
                        <textarea 
                          rows={2}
                          value={item.desc}
                          onChange={(e) => {
                            const newPasti = [...legality.fivePasti];
                            newPasti[idx].desc = e.target.value;
                            setLegality({ ...legality, fivePasti: newPasti });
                          }}
                          placeholder="Deskripsi..."
                          className="w-full px-3 py-1.5 text-xs border border-bento-border rounded-lg text-bento-brown"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Packages */}
          {activeTab === "packages" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-serif font-bold text-bento-green">Paket Pilihan Umroh</h2>
                  <p className="text-xs text-bento-brown font-light mt-0.5">Tambah, ubah detail akomodasi/harga, dan hapus paket keberangkatan umroh.</p>
                </div>
                <button 
                  onClick={openNewPackageEditor}
                  className="px-4 py-2 bg-bento-green hover:bg-emerald-950 text-bento-gold text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-bento-gold" />
                  <span>Tambah Paket</span>
                </button>
              </div>

              {/* Package list grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white border border-bento-border rounded-2xl p-5 hover:border-bento-gold transition-all shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-bento-green/10 text-bento-green rounded-lg">{pkg.badge}</span>
                        <span className="text-xs font-semibold text-bento-brown font-mono">{pkg.durationDays} Hari</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-bento-green mb-1">{pkg.name}</h3>
                      <p className="text-xs text-bento-brown line-clamp-2 leading-relaxed mb-4">{pkg.subtitle}</p>
                      
                      <div className="space-y-1 text-xs border-t border-bento-border/50 pt-3">
                        <div className="flex justify-between">
                          <span className="text-bento-brown">Harga Quad:</span>
                          <span className="font-bold text-bento-green">Rp {(pkg.priceQuad/1000000).toFixed(1)} Jt</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-bento-brown">Hotel Makkah:</span>
                          <span className="font-medium text-bento-darkbrown">{pkg.meccaHotel} (★{pkg.meccaHotelStars})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-bento-brown">Maskapai:</span>
                          <span className="font-medium text-bento-darkbrown">{pkg.airline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-bento-brown">Jadwal:</span>
                          <span className="font-medium text-bento-darkbrown font-mono">{pkg.departureDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-5 border-t border-bento-border/50 pt-3">
                      <button
                        onClick={() => openPackageEditor(pkg)}
                        className="flex-1 py-2 bg-bento-cream text-bento-green border border-bento-border hover:bg-bento-gold/20 hover:border-bento-gold/40 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5 text-bento-green" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deletePackage(pkg.id)}
                        className="p-2 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xl transition-all cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Package Editor Section (Active only when editing/adding) */}
              {editingPackageId && packageForm && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-[2.5rem] border border-bento-border max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
                    <div className="flex justify-between items-center border-b border-bento-border pb-4">
                      <h3 className="text-lg font-serif font-black text-bento-green">
                        {editingPackageId === "new" ? "Tambah Paket Umrah Baru" : "Edit Paket Umrah"}
                      </h3>
                      <button 
                        onClick={() => { setEditingPackageId(null); setPackageForm(null); }}
                        className="text-bento-brown hover:text-bento-green text-sm font-bold bg-bento-cream/50 px-3 py-1.5 rounded-xl border border-bento-border/50"
                      >
                        Batal
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                      <div>
                        <label className="block text-[10px] font-bold text-bento-green uppercase mb-1">Nama Paket</label>
                        <input 
                          type="text" 
                          value={packageForm.name}
                          onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-bento-green uppercase mb-1">Subtitle / Slogan</label>
                        <input 
                          type="text" 
                          value={packageForm.subtitle}
                          onChange={(e) => setPackageForm({ ...packageForm, subtitle: e.target.value })}
                          className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-bento-green uppercase mb-1">Badge (contoh: Hemat, Excellent, VIP)</label>
                        <input 
                          type="text" 
                          value={packageForm.badge}
                          onChange={(e) => setPackageForm({ ...packageForm, badge: e.target.value })}
                          className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-bento-green uppercase mb-1">Durasi Paket (Hari)</label>
                        <input 
                          type="number" 
                          value={packageForm.durationDays}
                          onChange={(e) => setPackageForm({ ...packageForm, durationDays: parseInt(e.target.value) || 9 })}
                          className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                        />
                      </div>

                      <div className="border-t border-bento-border/50 pt-3 md:col-span-2">
                        <p className="text-xs font-bold text-bento-green mb-2">Biaya Kamar / Porsi Pax (Rp)</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Quad Sharing (4 Orang)</label>
                            <input 
                              type="number" 
                              value={packageForm.priceQuad}
                              onChange={(e) => setPackageForm({ ...packageForm, priceQuad: parseInt(e.target.value) || 0 })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs font-mono text-bento-darkbrown"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Triple Sharing (3 Orang)</label>
                            <input 
                              type="number" 
                              value={packageForm.priceTriple}
                              onChange={(e) => setPackageForm({ ...packageForm, priceTriple: parseInt(e.target.value) || 0 })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs font-mono text-bento-darkbrown"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Double Sharing (2 Orang)</label>
                            <input 
                              type="number" 
                              value={packageForm.priceDouble}
                              onChange={(e) => setPackageForm({ ...packageForm, priceDouble: parseInt(e.target.value) || 0 })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs font-mono text-bento-darkbrown"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-bento-border/50 pt-3 md:col-span-2">
                        <p className="text-xs font-bold text-bento-green mb-2">Akomodasi Hotel & Maskapai</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Nama Hotel Makkah</label>
                            <input 
                              type="text" 
                              value={packageForm.meccaHotel}
                              onChange={(e) => setPackageForm({ ...packageForm, meccaHotel: e.target.value })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Bintang Makkah (1-5)</label>
                            <input 
                              type="number" 
                              value={packageForm.meccaHotelStars}
                              onChange={(e) => setPackageForm({ ...packageForm, meccaHotelStars: parseInt(e.target.value) || 5 })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Jarak Hotel Makkah</label>
                            <input 
                              type="text" 
                              value={packageForm.meccaHotelDistance}
                              onChange={(e) => setPackageForm({ ...packageForm, meccaHotelDistance: e.target.value })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Nama Hotel Madinah</label>
                            <input 
                              type="text" 
                              value={packageForm.madinahHotel}
                              onChange={(e) => setPackageForm({ ...packageForm, madinahHotel: e.target.value })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Bintang Madinah (1-5)</label>
                            <input 
                              type="number" 
                              value={packageForm.madinahHotelStars}
                              onChange={(e) => setPackageForm({ ...packageForm, madinahHotelStars: parseInt(e.target.value) || 5 })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Jarak Hotel Madinah</label>
                            <input 
                              type="text" 
                              value={packageForm.madinahHotelDistance}
                              onChange={(e) => setPackageForm({ ...packageForm, madinahHotelDistance: e.target.value })}
                              className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-bento-border/50 pt-3 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Maskapai Penerbangan</label>
                          <input 
                            type="text" 
                            value={packageForm.airline}
                            onChange={(e) => setPackageForm({ ...packageForm, airline: e.target.value })}
                            className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Emoji / Logo Maskapai</label>
                          <input 
                            type="text" 
                            value={packageForm.airlineLogo}
                            onChange={(e) => setPackageForm({ ...packageForm, airlineLogo: e.target.value })}
                            className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Bulan Keberangkatan</label>
                          <input 
                            type="text" 
                            value={packageForm.departureMonth}
                            onChange={(e) => setPackageForm({ ...packageForm, departureMonth: e.target.value })}
                            className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Tanggal Keberangkatan Pas</label>
                          <input 
                            type="text" 
                            value={packageForm.departureDate}
                            onChange={(e) => setPackageForm({ ...packageForm, departureDate: e.target.value })}
                            className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown"
                          />
                        </div>
                      </div>

                      <div className="border-t border-bento-border/50 pt-3 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Total Kouta Seat</label>
                          <input 
                            type="number" 
                            value={packageForm.quotaTotal}
                            onChange={(e) => setPackageForm({ ...packageForm, quotaTotal: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-bento-brown uppercase mb-1">Sisa Seat Tersedia</label>
                          <input 
                            type="number" 
                            value={packageForm.seatsRemaining}
                            onChange={(e) => setPackageForm({ ...packageForm, seatsRemaining: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-darkbrown font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={savePackageForm}
                      className="w-full bg-bento-green text-bento-gold py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4 text-bento-gold" />
                      <span>Simpan Perubahan Paket</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Steps */}
          {activeTab === "steps" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4">
                <h2 className="text-xl font-serif font-bold text-bento-green">Alur Pendaftaran Jamaah</h2>
                <p className="text-xs text-bento-brown font-light mt-0.5">Ubah 5 tahap langkah pendaftaran dan safar ibadah yang tertera di website.</p>
              </div>

              <div className="space-y-5">
                {steps.map((stepItem, idx) => (
                  <div key={idx} className="bg-bento-cream/20 p-5 border border-bento-border rounded-2xl flex items-start gap-4">
                    <span className="font-serif font-black text-2xl text-bento-gold bg-bento-green text-bento-gold w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      {stepItem.step}
                    </span>
                    <div className="flex-1 space-y-2">
                      <input 
                        type="text" 
                        value={stepItem.title}
                        onChange={(e) => {
                          const newSteps = [...steps];
                          newSteps[idx].title = e.target.value;
                          setSteps(newSteps);
                        }}
                        className="w-full px-3 py-1.5 text-sm font-serif font-bold border border-bento-border rounded-lg text-bento-green"
                        placeholder="Judul Langkah"
                      />
                      <textarea 
                        rows={2}
                        value={stepItem.desc}
                        onChange={(e) => {
                          const newSteps = [...steps];
                          newSteps[idx].desc = e.target.value;
                          setSteps(newSteps);
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-bento-border rounded-lg text-bento-brown"
                        placeholder="Deskripsi detail..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Requirements Documents */}
          {activeTab === "docs" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4">
                <h2 className="text-xl font-serif font-bold text-bento-green">Persyaratan Dokumen Administrasi</h2>
                <p className="text-xs text-bento-brown font-light mt-0.5">Edit daftar 4 dokumen utama wajib dikumpulkan jamaah saat mendaftar.</p>
              </div>

              <div className="space-y-5">
                {requirements.map((doc, idx) => (
                  <div key={idx} className="bg-bento-cream/20 p-5 border border-bento-border rounded-2xl space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-bento-gold rounded-full"></span>
                      <input 
                        type="text" 
                        value={doc.title}
                        onChange={(e) => {
                          const newDocs = [...requirements];
                          newDocs[idx].title = e.target.value;
                          setRequirements(newDocs);
                        }}
                        className="w-full px-3 py-1.5 text-sm font-serif font-bold border border-bento-border rounded-lg text-bento-green"
                        placeholder="Nama Dokumen"
                      />
                    </div>
                    <textarea 
                      rows={2}
                      value={doc.detail}
                      onChange={(e) => {
                        const newDocs = [...requirements];
                        newDocs[idx].detail = e.target.value;
                        setRequirements(newDocs);
                      }}
                      className="w-full px-3 py-1.5 text-xs border border-bento-border rounded-lg text-bento-brown"
                      placeholder="Detail syarat dan penjelasan..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: Testimonials */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-serif font-bold text-bento-green">Testimoni & Pengalaman Jamaah</h2>
                  <p className="text-xs text-bento-brown font-light mt-0.5">Ubah, tambah, atau hapus kisah pengalaman nyata para jamaah umroh terdahulu.</p>
                </div>
                <button 
                  onClick={() => {
                    const newTest: any = {
                      id: "test-" + Date.now(),
                      name: "H. Nama Jamaah",
                      age: 45,
                      city: "Jakarta",
                      text: "Kesan pelayanan ibadah umrah yang luar biasa...",
                      packageTaken: "Paket Excellent Bintang 5",
                      rating: 5,
                      date: "Mei 2026"
                    };
                    setTestimonials([...testimonials, newTest]);
                  }}
                  className="px-4 py-2 bg-bento-green hover:bg-emerald-950 text-bento-gold text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-bento-gold" />
                  <span>Tambah Testimoni</span>
                </button>
              </div>

              <div className="space-y-5">
                {testimonials.map((test, idx) => (
                  <div key={test.id} className="bg-white border border-bento-border rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="grid grid-cols-2 sm:flex items-center gap-3">
                        <input 
                          type="text" 
                          value={test.name}
                          onChange={(e) => {
                            setTestimonials(testimonials.map(t => t.id === test.id ? { ...t, name: e.target.value } : t));
                          }}
                          className="px-3 py-1 border border-bento-border rounded-lg text-xs font-serif font-bold text-bento-green"
                          placeholder="Nama Jamaah"
                        />
                        <input 
                          type="number" 
                          value={test.age}
                          onChange={(e) => {
                            setTestimonials(testimonials.map(t => t.id === test.id ? { ...t, age: parseInt(e.target.value) || 40 } : t));
                          }}
                          className="px-2 py-1 border border-bento-border rounded-lg text-xs font-mono w-14 text-bento-brown"
                          placeholder="Umur"
                        />
                        <input 
                          type="text" 
                          value={test.city}
                          onChange={(e) => {
                            setTestimonials(testimonials.map(t => t.id === test.id ? { ...t, city: e.target.value } : t));
                          }}
                          className="px-2 py-1 border border-bento-border rounded-lg text-xs text-bento-brown"
                          placeholder="Kota Asal"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <select 
                          value={test.rating}
                          onChange={(e) => {
                            setTestimonials(testimonials.map(t => t.id === test.id ? { ...t, rating: parseInt(e.target.value) || 5 } : t));
                          }}
                          className="text-xs border border-bento-border px-2 py-1 rounded-lg font-bold text-bento-gold bg-bento-green/5"
                        >
                          <option value="5">★ 5 Bintang</option>
                          <option value="4">★ 4 Bintang</option>
                          <option value="3">★ 3 Bintang</option>
                        </select>
                        <button
                          onClick={() => {
                            if (confirm("Hapus testimoni ini?")) {
                              setTestimonials(testimonials.filter(t => t.id !== test.id));
                            }
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        value={test.packageTaken}
                        onChange={(e) => {
                          setTestimonials(testimonials.map(t => t.id === test.id ? { ...t, packageTaken: e.target.value } : t));
                        }}
                        className="px-3 py-1 border border-bento-border rounded-lg text-xs font-light text-bento-brown w-full"
                        placeholder="Paket yang diambil"
                      />
                      <input 
                        type="text" 
                        value={test.date}
                        onChange={(e) => {
                          setTestimonials(testimonials.map(t => t.id === test.id ? { ...t, date: e.target.value } : t));
                        }}
                        className="px-3 py-1 border border-bento-border rounded-lg text-xs text-bento-brown font-mono w-full"
                        placeholder="Tanggal/Bulan Safar"
                      />
                    </div>

                    <textarea 
                      rows={3}
                      value={test.text}
                      onChange={(e) => {
                        setTestimonials(testimonials.map(t => t.id === test.id ? { ...t, text: e.target.value } : t));
                      }}
                      className="w-full px-3 py-2 border border-bento-border rounded-lg text-xs text-bento-darkbrown leading-relaxed font-light"
                      placeholder="Isi ulasan / kesaksian jamaah..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: FAQs */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-serif font-bold text-bento-green">Pertanyaan Umum (FAQs)</h2>
                  <p className="text-xs text-bento-brown font-light mt-0.5">Tambah atau edit daftar tanya-jawab praktis seputar pendaftaran & fiqih.</p>
                </div>
                <button 
                  onClick={() => {
                    const newFaq: any = {
                      id: "faq-" + Date.now(),
                      question: "Pertanyaan baru?",
                      answer: "Jawaban detail pertanyaan...",
                      category: "umum"
                    };
                    setFaqs([...faqs, newFaq]);
                  }}
                  className="px-4 py-2 bg-bento-green hover:bg-emerald-950 text-bento-gold text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-bento-gold" />
                  <span>Tambah FAQ</span>
                </button>
              </div>

              <div className="space-y-5">
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="bg-white border border-bento-border rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <select
                        value={faq.category}
                        onChange={(e) => {
                          setFaqs(faqs.map(f => f.id === faq.id ? { ...f, category: e.target.value as any } : f));
                        }}
                        className="text-xs border border-bento-border px-3 py-1.5 rounded-xl font-bold text-bento-green bg-bento-cream/20 w-fit"
                      >
                        <option value="umum">Umum</option>
                        <option value="pembayaran">Pembayaran</option>
                        <option value="dokumen">Dokumen</option>
                        <option value="fasilitas">Fasilitas</option>
                      </select>
                      <button
                        onClick={() => {
                          if (confirm("Hapus FAQ ini?")) {
                            setFaqs(faqs.filter(f => f.id !== faq.id));
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input 
                      type="text" 
                      value={faq.question}
                      onChange={(e) => {
                        setFaqs(faqs.map(f => f.id === faq.id ? { ...f, question: e.target.value } : f));
                      }}
                      className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs font-serif font-bold text-bento-green"
                      placeholder="Masukkan pertanyaan..."
                    />

                    <textarea 
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => {
                        setFaqs(faqs.map(f => f.id === faq.id ? { ...f, answer: e.target.value } : f));
                      }}
                      className="w-full px-3 py-2 border border-bento-border rounded-xl text-xs text-bento-brown leading-relaxed font-light"
                      placeholder="Masukkan jawaban lengkap..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: Footer & Navigasi */}
          {activeTab === "footer" && (
            <div className="space-y-6">
              <div className="border-b border-bento-border pb-4 mb-4">
                <h2 className="text-xl font-serif font-bold text-bento-green">Footer & Navigasi</h2>
                <p className="text-xs text-bento-brown font-light mt-0.5">Edit judul brand, deskripsi singkat, tautan navigasi cepat, dan tautan legalitas di bagian bawah website.</p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Judul Utama Brand Footer</label>
                    <input 
                      type="text" 
                      value={footer.brandTitle || ""}
                      onChange={(e) => setFooter({ ...footer, brandTitle: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Subtitle Brand Footer</label>
                    <input 
                      type="text" 
                      value={footer.brandSubtitle || ""}
                      onChange={(e) => setFooter({ ...footer, brandSubtitle: e.target.value })}
                      className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Deskripsi Singkat Footer</label>
                  <textarea 
                    rows={3}
                    value={footer.description || ""}
                    onChange={(e) => setFooter({ ...footer, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-bento-green uppercase tracking-wide mb-1.5">Teks Hak Cipta (Copyright)</label>
                  <input 
                    type="text" 
                    value={footer.copyrightText || ""}
                    onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
                    className="w-full px-4 py-2.5 border border-bento-border rounded-xl text-sm focus:outline-none focus:border-bento-gold text-bento-darkbrown"
                  />
                </div>

                {/* Edit Quick Links */}
                <div className="border-t border-bento-border pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-bold text-bento-green uppercase tracking-wider">Navigasi Cepat (Quick Links)</p>
                    <button 
                      onClick={() => {
                        const newLinks = [...(footer.quickLinks || []), { label: "Tautan Baru", target: "hero-section" }];
                        setFooter({ ...footer, quickLinks: newLinks });
                      }}
                      className="px-3 py-1 bg-bento-cream text-bento-green border border-bento-border hover:bg-bento-gold/20 hover:bg-bento-gold/40 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-bento-green" />
                      <span>Tambah Tautan</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(footer.quickLinks || []).map((link: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-bento-cream/10 p-3 border border-bento-border rounded-xl">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] text-bento-brown mb-1">Nama Tautan</label>
                            <input 
                              type="text" 
                              value={link.label}
                              onChange={(e) => {
                                const newLinks = [...footer.quickLinks];
                                newLinks[idx].label = e.target.value;
                                setFooter({ ...footer, quickLinks: newLinks });
                              }}
                              className="w-full px-3 py-1.5 text-xs border border-bento-border rounded-lg text-bento-green"
                              placeholder="Label"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] text-bento-brown mb-1">Section ID Target (e.g. hero-section)</label>
                            <input 
                              type="text" 
                              value={link.target}
                              onChange={(e) => {
                                const newLinks = [...footer.quickLinks];
                                newLinks[idx].target = e.target.value;
                                setFooter({ ...footer, quickLinks: newLinks });
                              }}
                              className="w-full px-3 py-1.5 text-xs border border-bento-border rounded-lg text-bento-brown font-mono"
                              placeholder="Target ID"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newLinks = footer.quickLinks.filter((_: any, i: number) => i !== idx);
                            setFooter({ ...footer, quickLinks: newLinks });
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg mt-4 self-center"
                          title="Hapus Tautan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edit Bottom Legal Links */}
                <div className="border-t border-bento-border pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-bold text-bento-green uppercase tracking-wider">Tautan Legal Bawah (Bottom Links)</p>
                    <button 
                      onClick={() => {
                        const newLinks = [...(footer.bottomLinks || []), { label: "Halaman Baru", url: "#" }];
                        setFooter({ ...footer, bottomLinks: newLinks });
                      }}
                      className="px-3 py-1 bg-bento-cream text-bento-green border border-bento-border hover:bg-bento-gold/20 hover:border-bento-gold/40 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-bento-green" />
                      <span>Tambah Halaman</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(footer.bottomLinks || []).map((link: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-bento-cream/10 p-3 border border-bento-border rounded-xl">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] text-bento-brown mb-1">Nama Halaman</label>
                            <input 
                              type="text" 
                              value={link.label}
                              onChange={(e) => {
                                const newLinks = [...footer.bottomLinks];
                                newLinks[idx].label = e.target.value;
                                setFooter({ ...footer, bottomLinks: newLinks });
                              }}
                              className="w-full px-3 py-1.5 text-xs border border-bento-border rounded-lg text-bento-green"
                              placeholder="Label"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] text-bento-brown mb-1">URL Halaman</label>
                            <input 
                              type="text" 
                              value={link.url}
                              onChange={(e) => {
                                const newLinks = [...footer.bottomLinks];
                                newLinks[idx].url = e.target.value;
                                setFooter({ ...footer, bottomLinks: newLinks });
                              }}
                              className="w-full px-3 py-1.5 text-xs border border-bento-border rounded-lg text-bento-brown"
                              placeholder="URL"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newLinks = footer.bottomLinks.filter((_: any, i: number) => i !== idx);
                            setFooter({ ...footer, bottomLinks: newLinks });
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg mt-4 self-center"
                          title="Hapus Halaman"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
