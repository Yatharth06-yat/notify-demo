import { motion } from "framer-motion";
import { Sparkles, Cpu, Wifi, Activity, Zap, ShieldCheck, Brain, Phone, Bot, Camera, Radio } from "lucide-react";

const kit10 = "https://res.cloudinary.com/dwumernfk/image/upload/v1786213132/p4_oegxpn.png";
const aquaCareImg = "https://res.cloudinary.com/dwumernfk/image/upload/v1785963310/image_df6kna.png";
const kit6 = "https://res.cloudinary.com/dwumernfk/image/upload/v1786212830/p2_txkx1e.png";
const kit7 = "https://res.cloudinary.com/dwumernfk/image/upload/v1786212829/p3_goox2a.png";

// Flagship CIoT MITS Projects & Deployments with clean typography
const projectDeployments = [
  {
    id: 1,
    title: "AI Based Hexapod Gait Analysis",
    tag: "Robotics & AI",
    version: "GAIT ANALYSIS v1.0",
    telemetry: "Hexapod Motion & Gait Monitoring Active",
    image: kit10,
    metrics: [
      { label: "Legs", value: "6", icon: Activity },
      { label: "Analysis", value: "AI-Based", accent: true, icon: Brain },
      { label: "Motion", value: "Real-time", icon: Zap },
    ],
    graphValues: [45, 65, 50, 80, 60, 90, 70]
  },
  {
    id: 2,
    title: "AquaCare: Autonomous Skimmer",
    tag: "IoT Prototype",
    version: "HARDWARE v1.2",
    telemetry: "DC Dual Motors & Conveyor Active",
    image: aquaCareImg,
    metrics: [
      { label: "Architecture", value: "ESP32 Mesh", icon: Cpu },
      { label: "Telemetry", value: "Live Cloud", accent: true, icon: Zap },
      { label: "Assembly", value: "Modular Build", icon: ShieldCheck },
    ],
    graphValues: [50, 65, 80, 55, 90, 75, 60]
  },
  {
    id: 3,
    title: "AI Based DTMF Controlled Surveillance Robot",
    tag: "Robotics & AI",
    version: "SURVEILLANCE v1.0",
    telemetry: "DTMF Remote Control Active",
    image: kit6,
    metrics: [
      { label: "Control", value: "DTMF", icon: Phone },
      { label: "Platform", value: "4-Wheel", accent: true, icon: Bot },
      { label: "Application", value: "Surveillance", icon: Camera },
    ],
    graphValues: [35, 55, 45, 75, 60, 80, 65]
  },
  {
    id: 4,
    title: "Smart Agriculture Power and Water Management",
    tag: "Smart Agriculture",
    version: "IoT + LoRa + AI v1.0",
    telemetry: "Soil & Environmental Monitoring Active",
    image: kit7,
    metrics: [
      { label: "Communication", value: "LoRa", icon: Radio },
      { label: "Control", value: "ESP32", accent: true, icon: Cpu },
      { label: "Monitoring", value: "Real-time", icon: Activity },
    ],
    graphValues: [35, 55, 45, 75, 60, 85, 70]
  }
];

export default function ProjectsPage() {
  return (
    <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-black text-white min-h-screen flex items-center font-sans">
      {/* Background Circuit Grid & Vignette */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.85)_90%)] pointer-events-none" />

      {/* Advanced Multi-layered Glow Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(79,70,229,0.08) 50%, transparent 70%)",
          filter: "blur(140px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-10 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]"
      />

      <div className="mx-auto max-w-7xl relative z-10 w-full">

        {/* TOP SECTION HEADER TAG */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-wider font-sans font-semibold inline-flex items-center gap-2">
            <span className="glow-dot" />
            CIoT MITS - FLAGSHIP PROJECTS & DEPLOYMENTS
          </span>
         
          <p className="text-sm sm:text-base text-slate-300 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
            Showcasing production-grade campus IoT infrastructure, automated hardware systems, and live telemetry field research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text & Pill Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            {/* Green label */}
            <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-wider font-sans font-semibold inline-flex items-center gap-2">
              <span className="glow-dot" />
              Iotify Lab Projects
            </span>

            {/* Heading */}
            <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-white leading-[1.2] tracking-tight mb-6">
              Engineered for real-world{" "}
              <span className="text-gradient">campus & industrial impact.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans mb-8 text-justify">
              From wide-area smart campus sensor mesh networks to autonomous water skimmers and Edge AI labs, our projects bridge advanced hardware prototyping with real-time cloud analytics and operational telemetry.
            </p>

            {/* Three Pill Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Campus IoT Grid", icon: Wifi },
                { label: "Autonomous Hardware", icon: Cpu },
                { label: "Live Telemetry", icon: Activity },
              ].map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div
                    key={idx}
                    className="tag-badge group hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all duration-300 flex items-center px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-sans font-medium"
                  >
                    <IconComponent size={14} className="text-cyan-400 mr-1.5 group-hover:scale-110 transition-transform" />
                    {badge.label}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: Continuous Right-to-Left Multi-Card Sliding Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative overflow-hidden w-full py-4"
          >
            {/* Soft Glow Underneath */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-16 rounded-full pointer-events-none"
              style={{ background: "rgba(0,229,255,0.2)", filter: "blur(60px)" }}
            />

            {/* Left & Right Gradient Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            {/* Scrolling Marquee Container (Right to Left) */}
            <div className="flex overflow-hidden w-full">
              <motion.div
                className="flex gap-6 shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
              >
                {/* Render cards twice for smooth infinite loop */}
                {[...projectDeployments, ...projectDeployments].map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="relative w-[380px] sm:w-[420px] shrink-0 rounded-3xl glass-card p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer group border border-cyan-500/30"
                    style={{ background: "linear-gradient(145deg, rgba(13,17,23,0.95), rgba(5,7,11,0.98))" }}
                  >
                    {/* Circuit Grid Background */}
                    <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-4">

                      {/* Top Node Bar with Live Pulse */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-3">
                          <div className="relative flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]" />
                          </div>
                          <span className="text-xs font-sans font-medium tracking-wide text-white/95 truncate max-w-[200px]">
                            {item.title.split(":")[0]} // MITS
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30">
                          <Wifi size={11} className="text-cyan-400 animate-pulse" />
                          <span className="text-[10px] font-sans font-semibold text-cyan-300 tracking-wider">{item.version}</span>
                        </div>
                      </div>

                      {/* Central Image Container */}
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cyan-500/30 group/img shadow-[0_0_25px_rgba(0,229,255,0.15)]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Floating Caption inside Image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                          <span className="text-xs font-sans text-cyan-300 font-medium truncate max-w-[240px]">{item.title}</span>
                          <span className="text-[10px] font-sans text-white/70">{item.tag}</span>
                        </div>
                      </div>

                      {/* Live Real-time Telemetry Stream Bar */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                            <Activity size={16} />
                          </div>
                          <div className="text-left">
                            <span className="text-[9px] text-slate-400 block font-sans tracking-wide">TELEMETRY STREAM</span>
                            <span className="text-xs font-sans font-semibold text-white truncate max-w-[180px] block">{item.telemetry}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.graphValues.map((h, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [`${h}%`, `${Math.max(20, h - 30)}%`, `${h}%`] }}
                              transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                              className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-full"
                              style={{ height: `${h}%`, minHeight: '8px' }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Bottom Status Metrics Grid */}
                      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                        {item.metrics.map((m) => {
                          const MetricIcon = m.icon;
                          return (
                            <div key={m.label} className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors p-2.5 rounded-xl border border-white/[0.08] flex flex-col items-center">
                              <MetricIcon size={13} className={m.accent ? "text-cyan-400 mb-1" : "text-white/60 mb-1"} />
                              <span className="text-[9px] text-slate-400 block font-sans">{m.label}</span>
                              <span className={`text-xs font-sans font-semibold mt-0.5 ${m.accent ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" : "text-white"}`}>
                                {m.value}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                    </div>

                    {/* Glowing Corner Accents */}
                    <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full pointer-events-none"
                      style={{ background: "rgba(0,229,255,0.18)", filter: "blur(50px)" }} />
                    <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full pointer-events-none"
                      style={{ background: "rgba(99,102,241,0.12)", filter: "blur(50px)" }} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}