import { UmrahPackage, CompanyInfo, FAQItem, Testimonial } from "./types";
import defaultData from "./data-editable.json";

// Live data store
const isBrowser = typeof window !== 'undefined';

const getLiveData = () => {
  if (!isBrowser) return defaultData;
  try {
    const raw = window.localStorage.getItem('alharamain_editable_content');
    if (raw) {
      const parsed = JSON.parse(raw);
      let changed = false;
      
      // Self-healing: convert old /src/assets/images paths to /images in localStorage
      if (parsed.hero && parsed.hero.meccaImage && parsed.hero.meccaImage.startsWith('/src/assets/images/')) {
        parsed.hero.meccaImage = parsed.hero.meccaImage.replace('/src/assets/images/', '/images/');
        changed = true;
      }
      
      if (changed) {
        window.localStorage.setItem('alharamain_editable_content', JSON.stringify(parsed));
      }
      
      return parsed;
    }
  } catch (e) {
    console.error("Error reading localStorage", e);
  }
  return defaultData;
};

const liveData = getLiveData();

export const companyData: CompanyInfo = liveData.companyData || defaultData.companyData;
export const umrahPackages: UmrahPackage[] = liveData.umrahPackages || defaultData.umrahPackages;
export const faqData: FAQItem[] = liveData.faqData || defaultData.faqData;
export const testimonialData: Testimonial[] = liveData.testimonialData || defaultData.testimonialData;
export const stepsToRegister = liveData.stepsToRegister || defaultData.stepsToRegister;
export const requirementsDocuments = liveData.requirementsDocuments || defaultData.requirementsDocuments;
export const heroData = liveData.hero || defaultData.hero;
export const footerData = liveData.footer || defaultData.footer;

export const legalityData = liveData.legality || {
  title1: "Ibadah Tenang, Fasilitas Nyaman &",
  title2: "Garansi 100% Legal",
  description: "Menunaikan umrah adalah safar mulia menyahut panggilan suci Allah SWT. Kami pastikan keberangkatan Anda terjamin aman secara hukum Negara dengan tingkat kepatuhan regulasi tertinggi.",
  fivePasti: [
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
  ]
};

// Also helper function to save content (both to localStorage and local file API)
export const saveLiveData = async (newData: any) => {
  if (isBrowser) {
    window.localStorage.setItem('alharamain_editable_content', JSON.stringify(newData));
  }
  try {
    const response = await fetch('/api/save-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    return response.ok;
  } catch (err) {
    console.error("Failed to save to server API", err);
    return false;
  }
};
