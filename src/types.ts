export interface UmrahPackage {
  id: string;
  name: string;
  subtitle: string;
  badge: "Hemat" | "Excellent" | "VIP Gold" | "Ramadan Special";
  durationDays: number;
  priceQuad: number; // 4 people sharing
  priceTriple: number; // 3 people sharing
  priceDouble: number; // 2 people sharing
  departureMonth: string;
  departureDate: string;
  airline: string;
  airlineLogo: string;
  meccaHotel: string;
  meccaHotelStars: number;
  meccaHotelDistance: string; // e.g. "50m ke Masjidil Haram"
  madinahHotel: string;
  madinahHotelStars: number;
  madinahHotelDistance: string; // e.g. "100m ke Masjid Nabawi"
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  isPopular?: boolean;
  quotaTotal: number;
  seatsRemaining: number;
}

export interface CompanyInfo {
  brandName: string;
  legalName: string; // e.g. "PT Al-Haramain Mulia Wisata"
  ppiuNumber: string; // Izin PPIU (Penyelenggara Perjalanan Ibadah Umrah)
  address: string;
  officeHours: string;
  phone: string;
  whatsappNumber: string; // WhatsApp formatted (+62...)
  whatsappDisplay: string; // WhatsApp formatted for display
  email: string;
  googleMapsUrl?: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "umum" | "pembayaran" | "dokumen" | "fasilitas";
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  city: string;
  text: string;
  packageTaken: string;
  rating: number;
  date: string;
}
