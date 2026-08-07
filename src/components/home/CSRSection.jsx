import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";

const CHECKLIST = [
  "Hands-on IoT, AI, and Robotics School Workshops",
  "In-House Learning Kits Developed at CIoT MITS",
  "Capacity-Building Train-the-Teacher (ToT) Sessions",
  "Mentoring Technology Solutions to Real-Life Problems",
];

const METRICS = [
  { val: "50+", label: "Schools Reached" },
  { val: "Free", label: "Selected Programs" },
  { val: "NEP", label: "Curriculum Aligned" },
  { val: "100%", label: "Hands-on Learning" },
];

export default function CSRSection({ onNavigate }) {
  return (
    <section className="relative px-6 py-20 lg:py-28 bg-black text-white overflow-hidden">
      {/* Circuit Background */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      {/* Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(0,207,255,0.14)_0%,_transparent_70%)] blur-[130px]"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Heading, Description, Checklist, CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-[0.25em] font-mono">
              <span className="glow-dot" />
              OUTREACH & GOVERNMENT SCHOOLS
            </span>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[44px] text-white leading-[1.12] tracking-tight mb-6">
              Empowering Government Schools{" "}
              <span className="text-cyan-primary">through tech outreach.</span>
            </h2>

            <p className="text-muted text-base sm:text-lg leading-relaxed font-body mb-8">
              CIoT MITS provides technology outreach, specialized in-house IoT kits, and selected free training programmes for Government Schools to foster innovation and project-based STEM education.
            </p>

            {/* Checklist */}
            <div className="space-y-4 mb-10 w-full">
              {CHECKLIST.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00CFFF]/15 border border-cyan-primary/40 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={14} className="text-cyan-primary" />
                  </div>
                  <span className="text-sm sm:text-base text-white/90 font-medium font-body">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate && onNavigate("contact")}
              className="btn-primary text-sm font-semibold"
            >
              Collaborate for School Outreach
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>

          {/* RIGHT: 2x2 Metric Cards + Highlighted Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* 2x2 Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="glass-card spotlight-card p-6 rounded-2xl border border-white/[0.09] bg-white/[0.03] text-center"
                >
                  <span className="font-mono font-extrabold text-3xl sm:text-4xl text-cyan-primary block mb-1">
                    {m.val}
                  </span>
                  <span className="text-xs sm:text-sm text-muted font-body">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Highlighted Information Panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-primary/15 via-cyan-primary/10 to-cyan-primary/15 border border-cyan-primary/40 backdrop-blur-md relative overflow-hidden shadow-[0_10px_30px_rgba(0,207,255,0.15)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-primary/20 text-cyan-primary flex items-center justify-center font-bold flex-shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base mb-1">
                    Academic Outreach & Social Responsibility
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                    CIoT, MITS–Deemed University, Gwalior conducts technology outreach initiatives to strengthen the academic innovation ecosystem and institutional visibility.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
