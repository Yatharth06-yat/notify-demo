import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "What is IoTify Lab?",
    a: "IoTify Lab is an institutional outreach and hands-on technology learning initiative established by the Centre for Internet of Things (CIoT), MITS–Deemed University, Gwalior for school students and teachers.",
  },
  {
    q: "Who can participate in IoTify Lab programmes?",
    a: "School students, teachers, undergraduate researchers, and educational institutions seeking experiential learning in IoT, AI, Robotics, and Embedded Systems.",
  },
  {
    q: "Do schools need prior programming or hardware experience?",
    a: "No prior experience is required. Training programmes and workshops start from foundational principles using user-friendly, in-house developed CIoT learning kits.",
  },
  {
    q: "Are Train-the-Teacher (ToT) programmes available?",
    a: "Yes, CIoT conducts capacity-building and Train-the-Teacher (ToT) programmes to empower school teachers to guide STEM and innovation clubs.",
  },
  {
    q: "What technologies are covered in IoTify Lab workshops?",
    a: "Workshops cover IoT sensor nodes, MicroPython firmware, Edge AI, Computer Vision, ROS2 Robotics, Embedded Systems, and cloud telemetry dashboards.",
  },
  {
    q: "Can educational institutions request workshops or lab facilities?",
    a: "Yes, schools and colleges can request workshops, technology camps, innovation challenges, and collaborative STEM facilities by contacting CIoT MITS Gwalior.",
  },
  {
    q: "Are IoT learning kits provided during the training?",
    a: "Yes, IoTify Lab conducts training programmes, workshops, and project mentoring using specialized in-house IoT learning and training kits developed by CIoT.",
  },
  {
    q: "How can Government Schools collaborate with IoTify Lab?",
    a: "IoTify Lab provides technology outreach and selected free training programmes for Government Schools under institutional outreach initiatives of MITS Gwalior.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative px-6 py-20 lg:py-28 bg-black text-white overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      {/* Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 w-[550px] h-[550px] bg-[radial-gradient(circle,_rgba(0,207,255,0.1)_0%,_transparent_70%)] blur-[130px]"
      />

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-badge mb-4 text-xs sm:text-sm tracking-[0.25em] font-mono">
            <span className="glow-dot" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-6">
            Clear answers for schools,{" "}
            <span className="text-cyan-primary">teachers & institutions.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Everything you need to know about IoTify Lab initiatives, in-house kits, workshops, and school outreach programs.
          </p>
        </motion.div>

        {/* Responsive Accordion Grid (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden bg-white/[0.03] ${
                  isOpen
                    ? "border-cyan-primary/50 shadow-[0_10px_30px_rgba(0,207,255,0.15)]"
                    : "border-white/[0.09] hover:border-white/20"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle size={18} className={`mt-0.5 flex-shrink-0 transition-colors ${isOpen ? "text-cyan-primary" : "text-muted"}`} />
                    <span className="font-display font-semibold text-base sm:text-lg text-white leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-cyan-primary" : ""
                    }`}
                  />
                </button>

                {/* Animated Body Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-muted leading-relaxed font-body border-t border-white/[0.06] mt-1 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
