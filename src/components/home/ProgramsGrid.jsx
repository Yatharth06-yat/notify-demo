import React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit, Wifi, Bot, GraduationCap, BookOpen, Trophy, ArrowUpRight, Cpu, Users, Lightbulb, Clock, UserCheck, CheckCircle2
} from "lucide-react";

const PROGRAMS = [
  {
    module: "M1",
    icon: Wifi,
    title: "School Student Hands-on Workshop",
    desc: "Introduction to IoT, sensors, Arduino/ESP32, demonstrations and mini-projects.",
    participants: "Students of Classes VI–XII",
    duration: "One day (6 Hrs)",
    deliverables: "Hands-on exposure and participation certificate",
  },
  {
    module: "M2",
    icon: Cpu,
    title: "Short-Term IoT Training Programme",
    desc: "IoT, electronics, sensors, programming, dashboards and project development.",
    participants: "School students",
    duration: "2–5 days",
    deliverables: "Training certificate and mini-project",
  },
  {
    module: "M3",
    icon: Bot,
    title: "Summer/Winter Technology Camp",
    desc: "IoT, AI, Robotics, Embedded Systems and innovation projects.",
    participants: "School students",
    duration: "5–10 days",
    deliverables: "Project demonstration and completion certificate",
  },
  {
    module: "M4",
    icon: GraduationCap,
    title: "Train-the-Teacher (ToT) Programme",
    desc: "Teacher capacity building, practical activities and project development.",
    participants: "Science, Math, Computer Science, STEM & Innovation teachers",
    duration: "2–5 days",
    deliverables: "Teacher certificate, training resources and mentoring",
  },
  {
    module: "M5",
    icon: Users,
    title: "School IoT/STEM Innovation Club Support",
    desc: "Club establishment, activity planning and technical mentoring.",
    participants: "Participating schools",
    duration: "Annual / Continuous",
    deliverables: "Functional school innovation club and student projects",
  },
  {
    module: "M6",
    icon: Lightbulb,
    title: "School Project Mentoring Programme",
    desc: "Problem identification, design thinking, prototype development and mentoring.",
    participants: "School students and teachers",
    duration: "Need-based",
    deliverables: "Working prototype and project presentation",
  }
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
            Educational outreach modules for{" "}
            <span className="text-cyan-primary font-extrabold">schools & colleges.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Comprehensive training models, capacity building, and project mentoring designed by the Centre for Internet of Things (CIoT), MITS Gwalior.
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROGRAMS.map((prog) => {
            const Icon = prog.icon;
            return (
              <motion.div
                key={prog.module}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                onClick={() => onNavigate && onNavigate("projects")}
                className="glass-card spotlight-card shimmer-card group p-6 rounded-3xl border border-white/[0.09] bg-white/[0.03] cursor-pointer relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-cyan-primary/50 hover:shadow-[0_15px_40px_-10px_rgba(0,207,255,0.25)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Module Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-primary/15 to-cyan-primary/10 border border-cyan-primary/20 text-cyan-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,207,255,0.4)]">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-primary/10 text-cyan-primary border border-cyan-primary/30">
                      {prog.module}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-primary transition-colors duration-300">
                    {prog.title}
                  </h3>

                  {/* Major Activities Description */}
                  <p className="text-muted text-xs sm:text-sm leading-relaxed font-body mb-5">
                    <strong className="text-white/90 font-semibold">Activities: </strong>
                    {prog.desc}
                  </p>

                  {/* Metadata Specs with Clean Body Font */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs font-body text-white/80">
                    <div className="flex items-start gap-2.5">
                      <UserCheck size={14} className="text-cyan-primary shrink-0 mt-0.5" />
                      <span><strong className="text-white font-semibold">Target:</strong> {prog.participants}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={14} className="text-cyan-primary shrink-0" />
                      <span><strong className="text-white font-semibold">Duration:</strong> {prog.duration}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-cyan-primary shrink-0 mt-0.5" />
                      <span><strong className="text-white font-semibold">Deliverables:</strong> {prog.deliverables}</span>
                    </div>
                  </div>
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