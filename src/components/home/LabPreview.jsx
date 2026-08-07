import { motion } from "framer-motion";
import { Sparkles, Cpu, Wifi, Activity, Zap, ShieldCheck } from "lucide-react";

const aquaCareImg = "https://res.cloudinary.com/dwumernfk/image/upload/v1785963310/image_df6kna.png";

export default function LabPreview() {
  return (
    <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-black text-white">
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

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text & Pill Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Green label */}
            <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-[0.25em]">
              <span className="glow-dot" />
              INTERACTIVE LAB PREVIEW
            </span>

            {/* Heading */}
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[44px] text-white leading-[1.12] tracking-tight mb-6">
              Interactive 3D lab experiences for{" "}
              <span className="text-gradient">modern STEM classrooms.</span>
            </h2>

            {/* Paragraph */}
            <p className="text-muted text-base sm:text-lg leading-relaxed font-body mb-8">
              Experience the future of hands-on technical education. Our hybrid labs combine physical modular hardware kits developed at CIoT MITS with interactive sensor dashboards, allowing students to design, program, and test AI and IoT projects in school.
            </p>

            {/* Three Pill Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "AI + IoT Labs", icon: Sparkles },
                { label: "Robotics Kits", icon: Cpu },
                { label: "Teacher Training", icon: ShieldCheck },
              ].map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div
                    key={idx}
                    className="tag-badge group hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all duration-300"
                  >
                    <IconComponent size={14} className="text-cyan-primary mr-1.5 group-hover:scale-110 transition-transform" />
                    {badge.label}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: AquaCare Prototype Showcase Deck */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Soft Glow Underneath */}
            <div
              className="absolute -bottom-6 w-[85%] h-16 rounded-full pointer-events-none"
              style={{ background: "rgba(0,229,255,0.25)", filter: "blur(60px)" }}
            />

            {/* Main Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.01 }}
              className="relative w-full max-w-[520px] rounded-3xl glass-card p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer group border border-cyan-500/30"
              style={{ background: "linear-gradient(145deg, rgba(13,17,23,0.95), rgba(5,7,11,0.98))" }}
            >
              {/* Circuit Grid Background */}
              <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-5">
                
                {/* Top Node Bar with Live Pulse */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]" />
                    </div>
                    <span className="text-xs font-mono tracking-wider text-white/90">AquaCare // CIoT MITS Prototype</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30">
                    <Wifi size={11} className="text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-semibold text-cyan-300 tracking-wider">HARDWARE v1</span>
                  </div>
                </div>

                {/* Central Image Container: AquaCare Project */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cyan-500/30 group/img shadow-[0_0_25px_rgba(0,229,255,0.15)]">
                  <img
                    src={aquaCareImg}
                    alt="AquaCare Water Cleaning Robot Prototype"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle dark gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Floating Caption inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                    <span className="text-xs font-mono text-cyan-300 font-medium">AquaCare: Surface Cleaning Skimmer</span>
                    <span className="text-[10px] font-mono text-white/70">IoT Kit</span>
                  </div>
                </div>

                {/* Live Real-time Telemetry Stream Bar */}
                <div className="bg-black/40 p-3.5 rounded-2xl border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Activity size={18} />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-muted block font-mono">PROTOTYPE TELEMETRY</span>
                      <span className="text-xs font-mono font-bold text-white">DC Motors & Conveyor Active</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[40, 70, 45, 90, 65, 85, 50].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${h}%`, `${Math.max(20, h - 30)}%`, `${h}%`] }}
                        transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-full"
                        style={{ height: `${h}%`, minHeight: '10px' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Status Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                  {[
                    { label: "Motors", value: "DC Dual", icon: Cpu },
                    { label: "Control", value: "Wireless", accent: true, icon: Zap },
                    { label: "Design", value: "Modular", icon: ShieldCheck },
                  ].map((m) => {
                    const MetricIcon = m.icon;
                    return (
                      <div key={m.label} className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors p-3 rounded-2xl border border-white/[0.08] flex flex-col items-center">
                        <MetricIcon size={13} className={m.accent ? "text-cyan-primary mb-1" : "text-white/60 mb-1"} />
                        <span className="text-[10px] text-muted block font-mono">{m.label}</span>
                        <span className={`text-xs font-mono font-bold mt-0.5 ${m.accent ? "text-cyan-primary drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" : "text-white"}`}>
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
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}