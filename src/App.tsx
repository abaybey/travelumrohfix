import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Legality from "./components/Legality";
import PackageSection from "./components/PackageSection";
import CostEstimator from "./components/CostEstimator";
import Requirements from "./components/Requirements";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import AdminPage from "./components/AdminPage";

function MainSite() {
  return (
    <div className="min-h-screen bg-bento-cream flex flex-col justify-between antialiased">
      {/* 1. Header Navigation Dual-Bar */}
      <Header />

      {/* 2. Hero Segment with generated High-Res Mecca Image */}
      <main className="flex-grow">
        <Hero />

        {/* 3. Legality Izin PPIU & 5 Kemenag Pasti Certification Trust Bar */}
        <Legality />

        {/* 4. Filterable Package Grid Display with Dynamic Sharing Rates */}
        <PackageSection />

        {/* 5. Custom DIY Private Cost-Estimator & Plan Form Slider */}
        <CostEstimator />

        {/* 6. Requirements Document Checklist & Registration Steps map */}
        <Requirements />

        {/* 7. Pilgrim Stories Quote Grid with Madinah Green Dome Banner */}
        <Testimonials />

        {/* 8. FAQs Categorized pure-react expanding Accordions */}
        <FAQ />
      </main>

      {/* 9. Compendious Footer block with physical directions blueprint */}
      <Footer />

      {/* 10. Intelligent floating conversion WhatsApp chat trigger */}
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (path.startsWith("/admin")) {
    return <AdminPage />;
  }

  return <MainSite />;
}
