import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "../../hooks/useCounter";

const STATS_DATA = [
  { target: 50, suffix: "+", label: "Schools Reached" },
  { target: 120, suffix: "+", label: "Workshops Conducted" },
  { target: 15000, suffix: "+", label: "Students Trained" },
  { target: 500, suffix: "+", label: "Teachers Certified" },
  { target: 10, suffix: "+", label: "IoT Kits Developed" },
  { target: 80, suffix: "+", label: "Projects Guided" },
];

function SingleStatItem({ target, suffix, label, inView, index }) {
  const count = useCounter(target, 2200, inView);
  const formattedCount = count.toLocaleString("en-US");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="flex flex-col items-center text-center p-3 sm:p-4"
    >
      <div className="font-mono font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-2">
        {formattedCount}
        <span className="text-cyan-primary">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm text-muted font-body tracking-wide">
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-black border-y border-white/[0.08] overflow-hidden">
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,207,255,0.08)_0%,_transparent_70%)] blur-[100px]"
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {STATS_DATA.map((stat, i) => (
            <SingleStatItem
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              inView={isInView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
