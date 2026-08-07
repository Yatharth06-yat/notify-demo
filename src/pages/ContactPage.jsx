import { useState } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_GENERAL, whatsappLink } from "../lib/contact";
import {
  Mail, MapPin, Phone, Send, MessageSquare,
  ChevronDown, Users, FlaskConical, GraduationCap,
} from "lucide-react";
import GlowOrb from "../components/shared/GlowOrb";
import CircuitSVG from "../components/shared/CircuitSVG";

const FAQS = [
  {
    q: "How can I join IoTily Lab as a student?",
    a: "Fill out the contact form with your area of interest and relevant skills. We accept applications from B.Tech 2nd year onwards. Strong interest in the domain matters more than prior experience.",
  },
  {
    q: "Do you take industry collaboration projects?",
    a: "Yes — we actively partner with companies for R&D projects, technology consultancy, and custom product development. Contact us with your problem statement.",
  },
  {
    q: "What equipment and resources does the lab have?",
    a: "We have 20+ NVIDIA Jetson boards, oscilloscopes, logic analyzers, 3D printers, a PCB fabrication setup, LiDAR units, robotic arms, and a high-performance GPU compute cluster.",
  },
  {
    q: "Can faculty from other institutes collaborate?",
    a: "Absolutely. We welcome inter-institutional research collaboration, co-authored publications, and joint project proposals. Reach out with your proposal.",
  },
  {
    q: "Are internships available at IoTily Lab?",
    a: "We offer summer and semester-long internships to motivated students from any institution. Send your CV, a brief interest statement, and the domain you want to work in.",
  },
];

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className="glass-card overflow-hidden"
      style={{ borderRadius: "16px" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-6 text-left"
      >
        <span className="font-display font-semibold text-white text-sm leading-relaxed">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-cyan-primary mt-0.5"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-muted text-sm leading-relaxed border-t border-white/[0.06] pt-4">
          {a}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const message =
      `*New Inquiry from IoTify Lab Website*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Subject:* ${form.subject || "General Inquiry"}\n\n` +
      `*Message:* ${form.message}`;

    window.open(whatsappLink(WHATSAPP_GENERAL, message), "_blank");

    setSent(true);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "iotily@mits.ac.in", sub: "Response within 24 hours" },
    { icon: MapPin, label: "Location", value: "MITS Campus, Gwalior", sub: "Madhya Pradesh, India" },
    { icon: Phone, label: "Phone", value: "+91 751 XXX XXXX", sub: "Mon–Sat, 9 AM – 6 PM IST" },
  ];

  const reasons = [
    { icon: GraduationCap, title: "Join the Lab", desc: "Students looking to become researchers" },
    { icon: FlaskConical, title: "Research Collaboration", desc: "Faculty & institutional partnerships" },
    { icon: Users, title: "Industry Projects", desc: "Companies with R&D challenges" },
    { icon: MessageSquare, title: "General Inquiry", desc: "Media, events, or anything else" },
  ];

  return (
    <div className="page-enter pt-28">

      {/* ── HERO ── */}
      <section className="relative px-6 py-16 lg:py-24 text-center overflow-hidden">
        <GlowOrb color="cyan" size="xl" className="-top-48 left-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 circuit-bg opacity-20" />

        <div className="mx-auto max-w-3xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow-badge inline-flex mb-7">
              <MessageSquare size={13} className="text-cyan-primary" />
              Get In Touch
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Let's Build{" "}
              <span className="text-gradient">Together</span>
            </h1>
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
              Whether you want to join, collaborate, or just learn more about what we're building — 
              we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT REASONS ── */}
      <section className="relative px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 text-center group hover:-translate-y-1 transition-transform cursor-default"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-primary/[0.08] border border-cyan-primary/20 text-cyan-primary mb-4 group-hover:shadow-glow transition-all">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div className="font-display font-semibold text-white text-sm mb-1">{r.title}</div>
                  <div className="text-muted text-xs">{r.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTACT SECTION ── */}
      <section className="relative px-6 py-10 lg:py-16">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12">

          {/* Left: info & Map */}
          <div className="flex flex-col gap-6">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 flex items-center gap-5 group"
                >
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-cyan-primary/[0.08] border border-cyan-primary/20 text-cyan-primary group-hover:shadow-glow transition-all">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-xs text-muted font-display uppercase tracking-widest">{info.label}</div>
                    <div className="font-display font-semibold text-white text-base mt-0.5">{info.value}</div>
                    <div className="text-muted text-xs mt-0.5">{info.sub}</div>
                  </div>
                </motion.div>
              );
            })}

            {/* Live Google Map Embed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="glass-card overflow-hidden rounded-2xl relative"
              style={{ height: "260px" }}
            >
              <iframe
                title="MITS Gwalior Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.055877840134!2d78.2057!3d26.2218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6d05f530519%3A0x673024ba1659dc64!2sMadhav%20Institute%20of%20Technology%20and%20Science!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ 
                  border: 0, 
                  filter: "invert(90%) hue-rotate(180deg) contrast(110%)" 
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-2xl border border-white/[0.09]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-primary/50 to-transparent" />

              <div className="relative z-10 p-8 lg:p-10">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-cyan-primary/10 border border-cyan-primary/30 flex items-center justify-center mb-6 shadow-glow">
                      <Send size={32} className="text-cyan-primary" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white mb-3">Redirecting to WhatsApp!</h3>
                    <p className="text-muted text-sm max-w-xs mb-6">
                      Your message has been formatted. If WhatsApp didn't open automatically, click below.
                    </p>
                    <button onClick={() => setSent(false)} className="btn-glass text-sm">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-2xl text-white mb-2">Send Us a Message</h2>
                    <p className="text-muted text-sm mb-8">Submit the form to connect directly via WhatsApp.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-display text-white/70 tracking-wide">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-muted/50 focus:outline-none focus:border-cyan-primary/40 focus:bg-white/[0.06] transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-display text-white/70 tracking-wide">Email</label>
                          <input
                            required
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-muted/50 focus:outline-none focus:border-cyan-primary/40 focus:bg-white/[0.06] transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-display text-white/70 tracking-wide">Subject</label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-cyan-primary/40 transition-all"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                          <option value="" className="bg-[#090B11]">Select a topic</option>
                          <option value="Join the Lab" className="bg-[#090B11]">Join the Lab</option>
                          <option value="Research Collaboration" className="bg-[#090B11]">Research Collaboration</option>
                          <option value="Industry Project" className="bg-[#090B11]">Industry Project</option>
                          <option value="Internship" className="bg-[#090B11]">Internship</option>
                          <option value="Other" className="bg-[#090B11]">Other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-display text-white/70 tracking-wide">Message</label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Tell us about your goals, background, or questions..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-muted/50 focus:outline-none focus:border-cyan-primary/40 focus:bg-white/[0.06] transition-all resize-none leading-relaxed"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary w-full py-4 text-base mt-2 flex items-center justify-center gap-2"
                      >
                        <Send size={16} />
                        Send via WhatsApp
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="relative px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-label block mb-4">FAQs</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Common <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}