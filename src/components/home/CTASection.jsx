import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight, GraduationCap } from "lucide-react";

export default function CTASection({ onNavigate }) {
  return (
    <section className="relative px-6 py-24 lg:py-36 bg-[#FFF2E5] text-gray-900 overflow-hidden text-center border-t border-gray-200">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] pointer-events-none" />

      {/* Soft Radial Glow Behind Heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(15,118,110,0.05)_0%,_rgba(15,118,110,0.02)_40%,_transparent_70%)] blur-[100px]"
      />

      <div className="mx-auto max-w-4xl relative z-10">
        
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow-badge mb-6 text-xs sm:text-sm tracking-[0.25em] font-mono inline-flex text-accent"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mr-2" />
          MITS OUTREACH INITIATIVE
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[52px] text-gray-900 leading-[1.1] tracking-tight mb-6"
        >
          Interested in IoTify Lab Workshops?{" "}
          <span className="text-accent block sm:inline">Connect with CIoT MITS.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-body mb-12"
        >
          Contact the Centre for Internet of Things (CIoT), MITS–Deemed University, Gwalior to schedule workshops, Train-the-Teacher sessions, or STEM club collaborations.
        </motion.p>

        {/* Contact Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Email Button */}
          <a
            href="mailto:ciot@mitsgwl.ac.in"
            className="px-8 py-4 rounded-xl bg-accent text-white font-semibold text-sm sm:text-base shadow-md hover:bg-accent-light transition-all flex items-center gap-3"
          >
            <Mail size={18} />
            <span>Email CIoT MITS</span>
          </a>

          {/* Contact Page Link */}
          <button
            onClick={() => onNavigate && onNavigate("book")}
            className="px-8 py-4 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold text-sm sm:text-base shadow-sm hover:shadow-md hover:border-accent transition-all flex items-center gap-3"
          >
            <GraduationCap size={18} className="text-accent" />
            <span>Book a workshops</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
