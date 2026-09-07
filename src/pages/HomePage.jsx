import Hero from "../components/Hero";
import CompanyAbout from "../components/home/CompanyAbout";
import LabPreview from "../components/home/LabPreview";
import ProgramsGrid from "../components/home/ProgramsGrid";
import StatsCounter from "../components/home/StatsCounter";
import HardwareSection from "../components/home/HardwareSection";
import CSRSection from "../components/home/CSRSection";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";

export default function HomePage({ onNavigate }) {
  return (
    <div className="page-enter bg-cream-primary">
      {/* 1. Hero Section */}
      <Hero onNavigate={onNavigate} />

      <HardwareSection onNavigate={onNavigate} />

      {/* 3. Interactive Lab Preview */}
      

      {/* 4. Programs Section */}
      <ProgramsGrid onNavigate={onNavigate} />

      {/* 5. Statistics Counters Strip */}
      

      {/* 6. Hardware Showcase */}
      <LabPreview />

      {/* Tech Partners & Ecosystem Marquee */}
      {/* 7. CSR Partners */}
      <CSRSection onNavigate={onNavigate} />

      {/* 8. Testimonials Auto-Playing Carousel */}
      <Testimonials />
      <StatsCounter />
      {/* 10. Call to Action */}
      <CTASection onNavigate={onNavigate} />
    </div>
  );
}
