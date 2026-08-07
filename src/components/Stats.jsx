import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "../hooks/useCounter";
import { Cpu, FlaskConical, Users, Award } from "lucide-react";

const STATS = [
  { icon: FlaskConical, num: 50, suffix: "+", label: "Active Projects", sub: "Across 8 domains" },
  { icon: Users, num: 120, suffix: "+", label: "Researchers", sub: "Faculty & students" },
  { icon: Award, num: 18, suffix: "+", label: "Publications", sub: "Peer-reviewed papers" },
  { icon: Cpu, num: 8, suffix: "", label: "Research Domains", sub: "AI to Industry 4.0" },
];

function StatItem({ stat, inView }) {
  const count = useCounter(stat.num, 2200, inView);
  const Icon = stat.icon;

  return (
    <div className="flex flex-col items-center text-center gap-4 group">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-cyan-primary/20 bg-cyan-primary/[0.06] text-cyan-primary transition-all duration-500 group-hover:border-cyan-primary/50 group-hover:bg-cyan-primary/[0.12] group-hover:shadow-glow">
        <Icon size={22} strokeWidth={1.6} />
      </div>
      <div>
        <div className="font-mono font-bold text-4xl xl:text-5xl text-white tracking-tight leading-none">
          {count}{stat.suffix}
        </div>
        <div className="font-body font-semibold text-sm text-white/90 mt-2">{stat.label}</div>
        <div className="font-body text-xs text-muted mt-1">{stat.sub}</div>
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative px-6 py-6 z-10" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl"
      >
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-2xl border border-white/[0.08]" />
          <div className="absolute inset-0 circuit-bg opacity-40" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-primary/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-accent/30 to-transparent" />

          <div className="relative z-10 px-8 py-12 sm:px-16 sm:py-14 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <StatItem stat={stat} inView={inView} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
