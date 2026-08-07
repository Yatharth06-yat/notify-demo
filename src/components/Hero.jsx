import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import NeuralNetSVG from "./shared/NeuralNetSVG";

const jetson = "https://res.cloudinary.com/dwumernfk/image/upload/v1785952346/jetson_gwza9h.png";

const WORDS = ["Embedded Systems", "IoT Kits", "AIoT", "Computer Vision", "Edge Intelligence"];

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
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx]);

  return (
    <span className="text-gradient">
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

export default function Hero({ onNavigate }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Mouse coordinates for gentle interactive tilt & pan effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Subtle rotation and pan values based on cursor position
  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);
  const translateX = useTransform(mouseX, [-200, 200], [-12, 12]);
  const translateY = useTransform(mouseY, [-200, 200], [-12, 12]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const stagger = {
    container: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
    item: {
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    },
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden">

      <div className="mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-[52%_48%] gap-16 items-center relative z-10">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Heading */}
          <motion.h1
            variants={stagger.item}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] leading-[1.06] tracking-tight text-white mb-4"
          >
            <br className="hidden lg:block" />
            Future of{" "}
            <TypewriterText />
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={stagger.item}
            className="text-muted text-base sm:text-lg leading-relaxed max-w-[520px] mb-10"
          >
            IoTify Lab
            An Innovation, Outreach and Hands-on Technology Learning Initiative of MITS–Deemed to be University, Gwalior Powered by the Centre for Internet of Things (CIoT)
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-4 mb-14">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("research")}
              className="btn-primary text-sm"
            >
              Explore Research
              <ArrowRight size={15} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("iotkit")}
              className="btn-glass text-sm"
            >
              View Kit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("about")}
              className="btn-outline-cyan text-sm"
            >
              About the Lab
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-8">
            {[
              { val: "50+", label: "Live Projects" },
              { val: "120+", label: "Researchers" },
              { val: "18+", label: "Publications" },
              { val: "8", label: "Domain Areas" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-start">
                <span className="font-mono font-bold text-2xl text-white">{s.val}</span>
                <span className="text-xs text-muted font-body tracking-wide mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            mouseX.set(0);
            mouseY.set(0);
          }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative flex items-center justify-center cursor-pointer"
        >
          {/* Teal radial glow behind board */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 55% 55%, rgba(0,180,220,0.22) 0%, rgba(0,100,180,0.1) 45%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Floating particles */}
          {[
            { size: "w-2 h-2", pos: "top-[8%] left-[10%]", delay: "0s" },
            { size: "w-1.5 h-1.5", pos: "bottom-[15%] right-[8%]", delay: "1.8s" },
            { size: "w-1 h-1", pos: "top-[55%] right-[5%]", delay: "3.2s" },
            { size: "w-2.5 h-2.5", pos: "bottom-[30%] left-[5%]", delay: "0.8s" },
          ].map((dot, i) => (
            <span
              key={i}
              className={`absolute ${dot.size} ${dot.pos} rounded-full bg-cyan-primary animate-float`}
              style={{
                boxShadow: "0 0 10px rgba(0,207,255,0.8)",
                animationDelay: dot.delay,
              }}
            />
          ))}

          {/* Interactive Jetson image with cursor-follow tilt and scale */}
          <motion.div
            className="relative w-full max-w-[480px]"
            animate={
              isHovered
                ? { y: 0, scale: 1.12 }
                : { y: [0, -16, 0], scale: 1 }
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
              alt="NVIDIA Jetson embedded AI platform"
              className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,207,255,0.3)]"
              draggable="false"
              style={{
                mixBlendMode: "screen",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
            {/* Glow beneath */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[55%] h-10 bg-cyan-primary/25 blur-3xl rounded-full"
              animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.8 : 0.5 }}
            />
          </motion.div>


          {/* Neural net overlay (subtle, bottom) */}
          <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20 pointer-events-none">
            <NeuralNetSVG className="w-full h-full" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] font-display tracking-[0.3em] uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-cyan-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}