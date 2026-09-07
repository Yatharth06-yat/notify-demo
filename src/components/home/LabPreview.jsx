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
    <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-cream-primary text-gray-900 min-h-screen flex items-center font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] pointer-events-none" />

      {/* Advanced Multi-layered Glow Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(15,118,110,0.06) 0%, rgba(3,105,161,0.03) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-10 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[80px]"
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
          <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-wider font-sans font-semibold inline-flex items-center gap-2 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            CIoT MITS - FLAGSHIP PROJECTS & DEPLOYMENTS
          </span>

          <p className="text-sm sm:text-base text-gray-600 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
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
            <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-wider font-sans font-semibold inline-flex items-center gap-2 text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
              Iotify Lab Projects
            </span>

            {/* Heading */}
            <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-gray-900 leading-[1.2] tracking-tight mb-6">
              Engineered for real-world{" "}
              <span className="text-accent">campus & industrial impact.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-sans mb-8 text-justify">
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
                    className="group hover:border-accent hover:shadow-md transition-all duration-300 flex items-center px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-sans font-semibold text-gray-700 cursor-default"
                  >
                    <IconComponent size={14} className="text-accent mr-1.5 group-hover:scale-110 transition-transform" />
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
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-cream-primary to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-cream-primary to-transparent z-20 pointer-events-none" />

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
                    className="relative w-[380px] sm:w-[420px] shrink-0 rounded-3xl p-6 shadow-sm hover:shadow-md overflow-hidden cursor-pointer group border border-gray-200 bg-white"
                  >
                    <div className="relative z-10 flex flex-col gap-4">

                      {/* Top Node Bar with Live Pulse */}
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="relative flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping absolute" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          </div>
                          <span className="text-xs font-sans font-bold tracking-wide text-gray-900 truncate max-w-[200px]">
                            {item.title.split(":")[0]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                          <Wifi size={11} className="text-accent animate-pulse" />
                          <span className="text-[10px] font-sans font-bold text-accent tracking-wider">{item.version}</span>
                        </div>
                      </div>

                      {/* Central Image Container */}
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-gray-200 group/img shadow-sm">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                        {/* Floating Caption inside Image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm">
                          <span className="text-xs font-sans text-gray-900 font-bold truncate max-w-[240px]">{item.title}</span>
                          <span className="text-[10px] font-sans font-semibold text-accent">{item.tag}</span>
                        </div>
                      </div>

                      {/* Live Real-time Telemetry Stream Bar */}
                      <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-accent/10 text-accent">
                            <Activity size={16} />
                          </div>
                          <div className="text-left">
                            <span className="text-[9px] text-gray-500 block font-sans font-bold tracking-wide">TELEMETRY STREAM</span>
                            <span className="text-xs font-sans font-bold text-gray-800 truncate max-w-[180px] block">{item.telemetry}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.graphValues.map((h, i) => {
                            const lo = h > 30 ? h - 30 : 20;
                            return (
                              <motion.div
                                key={i}
                                animate={{ height: [h + "%", lo + "%", h + "%"] }}
                                transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 bg-gradient-to-t from-accent to-accent-light rounded-full"
                                style={{ height: h + "%", minHeight: "8px" }}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom Status Metrics Grid */}
                      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                        {item.metrics.map((m) => {
                          const MetricIcon = m.icon;
                          return (
                            <div key={m.label} className="bg-white hover:bg-gray-50 transition-colors p-2.5 rounded-xl border border-gray-100 flex flex-col items-center">
                              <MetricIcon size={13} className={m.accent ? "text-accent mb-1" : "text-gray-400 mb-1"} />
                              <span className="text-[9px] text-gray-500 block font-sans font-medium">{m.label}</span>
                              <span className={`text-xs font-sans font-bold mt-0.5 ${m.accent ? "text-accent" : "text-gray-800"}`}>
                                {m.value}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                    </div>
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