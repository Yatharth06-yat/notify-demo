import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const logo = "https://res.cloudinary.com/dwumernfk/image/upload/v1785964187/image_2_wkozas.png";

const tickerItems = [
  "25,000+ Students",
  "CSR-Ready Labs",
  "IoRT + AI Systems",
  "AIoT Compatible Kits",
  "Teacher Certification",
  "MITS Student connect Programs ",
  "Hands-on IoT Workshops",
  "MITS Gwalior Initiative"
];

export default function CompanyAbout() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-black text-white">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 circuit-bg opacity-25 pointer-events-none" />

      {/* Subtle Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[550px] h-[550px] bg-[radial-gradient(circle,_rgba(0,207,255,0.14)_0%,_rgba(0,207,255,0.06)_50%,_transparent_70%)] blur-[120px]"
      />

      {/* Scrolling Ticker Bar at the Top */}
      <div className="w-full bg-[#03070b]/90 border-y border-white/[0.08] py-3.5 overflow-hidden whitespace-nowrap mb-16 relative z-20">
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="inline-flex gap-8 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-wider text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Image / Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-cyan-500/20 via-white/[0.04] to-transparent border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-500/5 blur-3xl pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden bg-[#07090E] aspect-[4/3] flex items-center justify-center border border-white/[0.06] p-4">
                {/* Fixed import syntax and changed object-cover to object-contain for full image visibility */}
                <img
                  src={logo} 
                  alt="IoTify Lab Showcase"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00e5ff]" />
                    <span className="text-xs sm:text-sm font-mono font-medium text-white">Live Edge Node Active</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">CIoT MITS</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Eyebrow + Large Heading & Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Label */}
            <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-[0.25em] font-mono">
              <span className="glow-dot" />
              ABOUT IOTIFY LAB
            </span>

            {/* Large Heading */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[42px] text-white leading-[1.15] tracking-tight mb-6">
              Institutional outreach and hands-on technology{" "}
              <span className="text-gradient">initiative by MITS Gwalior.</span>
            </h2>

            {/* Paragraph Content Block */}
            <p className="text-muted text-base sm:text-lg leading-relaxed font-body mb-8">
              IoTify Lab is an initiative of the Centre for Internet of Things (CIoT), MITS–Deemed University, Gwalior. We promote hands-on learning in IoT, Artificial Intelligence, Robotics, and Embedded Systems through workshops, teacher development, STEM innovation clubs, and project mentoring using in-house developed kits.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-white/[0.08]">
                <CheckCircle2 size={16} className="text-cyan-primary" />
                <span className="text-xs sm:text-sm text-white/90 font-medium">CIoT In-House IoT Learning Kits</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-white/[0.08]">
                <ShieldCheck size={16} className="text-cyan-primary" />
                <span className="text-xs sm:text-sm text-white/90 font-medium">NEP 2020 Experiential Learning</span>
              </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-white/[0.08]">
              <div>
                <span className="font-mono font-bold text-2xl text-cyan-primary block">CIoT MITS</span>
                <span className="text-xs text-muted">Centre for Internet of Things</span>
              </div>
              <div>
                <span className="font-mono font-bold text-2xl text-cyan-primary block">STEM Clubs</span>
                <span className="text-xs text-muted">School Innovation Outreach</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}