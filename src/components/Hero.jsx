import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, GraduationCap, Award, Users } from "lucide-react";

const jetson = "https://res.cloudinary.com/dwumernfk/image/upload/v1785952346/jetson_gwza9h.png";

const WORDS = ["IoT", "AI", "Robotics", "Embedded Systems", "Innovation"];

function TypewriterText() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[idx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx]);

  return (
    <span className="text-accent">
      {displayed}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.10 } },
  },
  item: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  },
};

const TRUST_BADGES = [
  { icon: GraduationCap, text: "MITS Deemed University" },
  { icon: Award, text: "NEP 2020 Aligned" },
  { icon: Users, text: "50+ Schools Reached" },
];

export default function Hero({ onNavigate }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [7, -7]);
  const rotateY = useTransform(mouseX, [-200, 200], [-7, 7]);
  const translateX = useTransform(mouseX, [-200, 200], [-10, 10]);
  const translateY = useTransform(mouseY, [-200, 200], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{ backgroundColor: "#F5EFE6" }}
      aria-label="Hero — MITS School Connect Programme"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,118,110,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(15,118,110,0.05) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl w-full px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-[54%_46%] gap-12 lg:gap-16 items-center relative z-10">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Eyebrow label */}
          <motion.div variants={stagger.item} className="mb-5">
            <span className="eyebrow-badge">
              <span className="glow-dot" aria-hidden="true" />
              MITS School Connect Programme
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={stagger.item}
            className="font-bold text-[2.4rem] sm:text-[2.8rem] lg:text-[3.2rem] leading-[1.07] tracking-[-0.025em] text-gray-900 mb-5"
          >
            IoTify Lab
            <br />
            <span className="text-gray-600 font-semibold text-[1.6rem] sm:text-[1.9rem] lg:text-[2.1rem] block mt-1">
              From Knowledge to Innovation
            </span>
          </motion.h1>

          {/* Typewriter sub-line */}
          <motion.p
            variants={stagger.item}
            className="text-lg sm:text-xl font-medium text-gray-700 mb-3"
          >
            Hands-on learning in{" "}<TypewriterText />
          </motion.p>

          {/* Description */}
          <motion.p
            variants={stagger.item}
            className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-[520px] mb-10"
          >
            An innovation, outreach and hands-on technology learning initiative powered by the{" "}
            <span className="font-semibold text-gray-800">Centre for Internet of Things (CIoT)</span>,
            MITS–Deemed University, Gwalior. Connecting school students with emerging technologies
            through experiential learning and real-world projects.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={stagger.item}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("projects")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                background: "#0F766E",
                border: "1px solid #0D6860",
                boxShadow: "0 2px 10px rgba(15,118,110,0.25)",
              }}
            >
              Explore Programs
              <ArrowRight size={15} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("book")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-800 text-sm font-semibold transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(17,24,39,0.14)",
                backdropFilter: "blur(4px)",
              }}
            >
              Register Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("about")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                background: "transparent",
                border: "1px solid rgba(15,118,110,0.30)",
                color: "#0F766E",
              }}
            >
              About IoTify Lab
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={stagger.item}
            className="flex flex-wrap gap-3"
          >
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-600"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(17,24,39,0.09)",
                }}
              >
                <Icon size={12} className="text-accent" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — interactive product visual ── */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            mouseX.set(0);
            mouseY.set(0);
          }}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative flex items-center justify-center"
        >
          {/* Soft glow behind board */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 55% 55%, rgba(15,118,110,0.10) 0%, rgba(3,105,161,0.04) 45%, transparent 70%)",
              filter: "blur(30px)",
            }}
            aria-hidden="true"
          />

          {/* Floating accent dots */}
          {[
            { size: "7px", top: "8%", left: "10%", delay: "0s" },
            { size: "5px", bottom: "15%", right: "8%", delay: "1.8s" },
            { size: "4px", top: "55%", right: "5%", delay: "3.2s" },
            { size: "8px", bottom: "30%", left: "5%", delay: "0.8s" },
          ].map((dot, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-accent/35 animate-float"
              style={{
                width: dot.size,
                height: dot.size,
                top: dot.top,
                bottom: dot.bottom,
                left: dot.left,
                right: dot.right,
                animationDelay: dot.delay,
                boxShadow: "0 0 8px rgba(15,118,110,0.20)",
              }}
              aria-hidden="true"
            />
          ))}

          {/* Interactive product image */}
          <motion.div
            className="relative w-full max-w-[460px]"
            animate={
              isHovered
                ? { y: 0, scale: 1.08 }
                : { y: [0, -14, 0], scale: 1 }
            }
            transition={
              isHovered
                ? { duration: 0.3, ease: "easeOut" }
                : { y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.3 } }
            }
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <motion.img
              src={jetson}
              alt="NVIDIA Jetson — AI and IoT embedded platform used in IoTify Lab"
              className="w-full h-auto object-contain drop-shadow-xl"
              draggable="false"
              style={{
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />

            {/* Shadow beneath board */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-8 rounded-full"
              style={{ background: "rgba(15,118,110,0.12)", filter: "blur(16px)" }}
              animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.7 : 0.4 }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute top-4 right-0 sm:-right-4"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(17,24,39,0.10)",
              borderRadius: "14px",
              boxShadow: "0 4px 16px rgba(17,24,39,0.08)",
              backdropFilter: "blur(8px)",
              padding: "10px 14px",
              maxWidth: "180px",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">CIoT Initiative</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-tight">
              Hands-on IoT kits developed at MITS, Gwalior
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-gray-400">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={15} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}