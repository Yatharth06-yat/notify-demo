import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import CircuitSVG from "../shared/CircuitSVG";

export default function HomeCTA({ onNavigate }) {
  return (
    <section className="relative px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] overflow-hidden text-center px-8 py-20 sm:px-16 sm:py-24"
        >
          {/* BG layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-primary/[0.07] via-blue-accent/[0.05] to-transparent" />
          <div className="absolute inset-0 border border-cyan-primary/[0.12] rounded-[2.5rem]" />
          <div className="absolute inset-0 circuit-bg opacity-30" />
          <div className="absolute inset-0 opacity-15">
            <CircuitSVG className="w-full h-full" />
          </div>

          {/* Top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-primary/60 to-transparent" />

          {/* Content */}
          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="eyebrow-badge mb-8 inline-flex"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary animate-pulse-slow" />
              Join The Innovation
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-mono font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            >
              Ready to Build the{" "}
              <span className="text-gradient">Future?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
            >
              Whether you're a student, researcher, or industry partner —
              IoTify Lab An Innovation, Outreach and Hands-on Technology Learning Initiative of MITS–Deemed to be University, Gwalior Powered by the Centre for Internet of Things (CIoT)
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={() => onNavigate("contact")}
                className="btn-primary px-8 py-4 text-base"
              >
                <Mail size={18} />
                Get In Touch
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="btn-glass px-8 py-4 text-base"
              >
                Learn About Us
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
