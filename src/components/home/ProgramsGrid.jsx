import { motion } from "framer-motion";
import {
  BrainCircuit, Wifi, Bot, GraduationCap, BookOpen, Trophy, ArrowUpRight, Cpu, Users, Lightbulb
} from "lucide-react";

const PROGRAMS = [
  {
    icon: Wifi,
    title: "IoT Lab Setup",
    desc: "Establishing hands-on IoT & sensor learning facilities in schools and colleges using specialized in-house CIoT kits.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Robotics Workshops",
    desc: "Interactive training sessions on edge AI models, computer vision, and ROS2 autonomous mobile robotics.",
  },
  {
    icon: Cpu,
    title: "Embedded Systems Training",
    desc: "Microcontroller firmware programming, RTOS, sensor telemetry, and hardware circuit debugging.",
  },
  {
    icon: GraduationCap,
    title: "Teacher Training (ToT)",
    desc: "Capacity-building Train-the-Teacher workshops empowering school educators to lead STEM clubs.",
  },
  {
    icon: Lightbulb,
    title: "In-House IoT Learning Kits",
    desc: "Custom hardware kits developed by CIoT MITS for experiential, project-based STEM education.",
  },
  {
    icon: Users,
    title: "STEM & Innovation Clubs",
    desc: "Supporting the establishment of school technology clubs and continuous innovation facilities.",
  },
  {
    icon: Trophy,
    title: "Student Project Mentoring",
    desc: "Guiding technology-based solutions to real-life problems, tech camps, and innovation challenges.",
  },
  {
    icon: BookOpen,
    title: "Internship & Research Support",
    desc: "Providing undergraduate & school student research mentorship under CIoT at MITS Gwalior.",
  },
];

export default function ProgramsGrid({ onNavigate }) {
  return (
    <section className="relative px-6 py-20 lg:py-28 bg-black text-white overflow-hidden">
      {/* Dot Grid */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      {/* Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(0,207,255,0.08)_0%,_rgba(0,207,255,0.04)_40%,_transparent_70%)] blur-[140px]"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        
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
            PROGRAMS & INITIATIVES
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-6">
            Educational outreach for{" "}
            <span className="text-cyan-primary font-extrabold">schools & colleges.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Exploration tracks, capacity building, and project mentoring designed by the Centre for Internet of Things (CIoT), MITS Gwalior.
          </p>
        </motion.div>

        {/* Grid of Educational Programs */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROGRAMS.map((prog) => {
            const Icon = prog.icon;
            return (
              <motion.div
                key={prog.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                onClick={() => onNavigate && onNavigate("projects")}
                className="glass-card spotlight-card shimmer-card group p-6 rounded-3xl border border-white/[0.09] bg-white/[0.03] cursor-pointer relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-cyan-primary/50 hover:shadow-[0_15px_40px_-10px_rgba(0,207,255,0.25)] flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="mb-5 inline-flex">
                    <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-primary/15 to-cyan-primary/10 border border-cyan-primary/20 text-cyan-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,207,255,0.4)]">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-primary transition-colors duration-300">
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted text-xs sm:text-sm leading-relaxed font-body">
                    {prog.desc}
                  </p>
                </div>

                {/* Arrow Link */}
                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-cyan-primary font-mono font-semibold">
                  <span>Learn More</span>
                  <ArrowUpRight size={15} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
