import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const logo = "https://res.cloudinary.com/dwumernfk/image/upload/v1785964187/image_2_wkozas.png";

const tickerItems = [
  "IoRT + AI Systems",
  "AIoT Compatible Kits",
  "MSCP (MITS school Connect Program)",
  "MITS Gwalior Initiative"
];

export default function CompanyAbout() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-cream-primary text-gray-900">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] opacity-25 pointer-events-none" />

      {/* Subtle Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[550px] h-[550px] bg-[radial-gradient(circle,_rgba(15,118,110,0.14)_0%,_rgba(15,118,110,0.06)_50%,_transparent_70%)] blur-[120px]"
      />

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
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-cyan-500/20 via-white/[0.04] to-transparent border border-gray-200 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 blur-3xl pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden bg-[#FFFAF5] aspect-[4/3] flex items-center justify-center border border-gray-200 p-4">
                <img
                  src={logo}
                  alt="IoTify Lab Showcase"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white border-gray-200 shadow-sm border border-gray-200 bg-cream-primary/60 backdrop-blur-md flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00e5ff]" />
                    <span className="text-xs sm:text-sm font-mono font-medium text-gray-900">Live Edge Node Active</span>
                  </div>
                  <span className="text-xs font-mono text-accent">CIoT MITS</span>
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
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[42px] text-gray-900 leading-[1.15] tracking-tight mb-6">
              Institutional outreach and hands-on technology{" "}
              <span className="text-gradient">initiative by MITS Gwalior.</span>
            </h2>

            {/* Paragraph Content Block */}
            <p className="text-muted text-base sm:text-lg leading-relaxed font-body mb-8">
              IoTify Lab is an initiative of the Centre for Internet of Things (CIoT), MITS–Deemed University, Gwalior. We promote hands-on learning in IoT, Artificial Intelligence, Robotics, and Embedded Systems through workshops, teacher development, STEM innovation clubs, and project mentoring using in-house developed kits.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border-gray-200 shadow-sm border border-white/[0.08]">
                <CheckCircle2 size={16} className="text-accent" />
                <span className="text-xs sm:text-sm text-gray-900/90 font-medium">CIoT In-House IoT Learning Kits</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border-gray-200 shadow-sm border border-white/[0.08]">
                <ShieldCheck size={16} className="text-accent" />
                <span className="text-xs sm:text-sm text-gray-900/90 font-medium">NEP 2020 Experiential Learning</span>
              </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-white/[0.08]">
              <div>
                <span className="font-mono font-bold text-2xl text-accent block">CIoT MITS</span>
                <span className="text-xs text-muted">Centre for Internet of Things</span>
              </div>
              <div>
                <span className="font-mono font-bold text-2xl text-accent block">MSCP </span>
                <span className="text-xs text-muted">MITS school Connect Program</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Scrolling Ticker Bar at the Bottom */}
      <div className="w-full border-y border-gray-200 py-3.5 overflow-hidden whitespace-nowrap mt-16 relative z-20" style={{ background: "#FAECE1" }}>
        <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#FAECE1] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#FAECE1] to-transparent z-10 pointer-events-none" />

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
            <div key={index} className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium tracking-wider text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}