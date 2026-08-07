import Hero from "../components/Hero";
import CompanyAbout from "../components/home/CompanyAbout";
import LabPreview from "../components/home/LabPreview";
import ProgramsGrid from "../components/home/ProgramsGrid";
import StatsCounter from "../components/home/StatsCounter";
import HardwareSection from "../components/home/HardwareSection";
import TechMarquee from "../components/home/TechMarquee";
import CSRSection from "../components/home/CSRSection";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTASection from "../components/home/CTASection";

export default function HomePage({ onNavigate }) {
  return (
    <div className="page-enter bg-[#0B0B0F]">
      {/* 1. Hero Section */}
      <Hero onNavigate={onNavigate} />

      {/* 2. About Company */}
      <CompanyAbout />

      {/* 3. Interactive Lab Preview */}
      <LabPreview />

      {/* 4. Programs Section */}
      <ProgramsGrid onNavigate={onNavigate} />

      {/* 5. Statistics Counters Strip */}
      <StatsCounter />

      {/* 6. Hardware Showcase */}
      <HardwareSection onNavigate={onNavigate} />

      {/* Tech Partners & Ecosystem Marquee */}
      <TechMarquee />

      {/* 7. CSR Partners */}
      <CSRSection onNavigate={onNavigate} />

      {/* 8. Testimonials Auto-Playing Carousel */}
      <Testimonials />

      {/* 9. FAQ Accordion */}
      <FAQ />

      {/* 10. Call to Action */}
      <CTASection onNavigate={onNavigate} />
    </div>
  );
}
