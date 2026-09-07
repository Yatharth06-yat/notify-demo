import { useState } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_GENERAL, whatsappLink } from "../lib/contact";
import {
  Mail, MapPin, Phone, Send, MessageSquare,
  ChevronDown, Users, FlaskConical, GraduationCap,
} from "lucide-react";

const FAQS = [
  {
    q: "How can I register a school for IoTify Lab workshops?",
    a: "Contact the Centre for Internet of Things (CIoT) at MITS Gwalior via this form or email. The school SPOC (Single Point of Contact) initiates the process, selects a module, and completes registration.",
  },
  {
    q: "What are the available training modules for schools?",
    a: "IoTify Lab offers M1 (Student Workshops), M2 (Short-Term IoT Training), M3 (Summer/Winter Tech Camps), M4 (Train-the-Teacher), M5 (Innovation Club Support), and more — all designed for Classes VI–XII.",
  },
  {
    q: "Is there any free programme for Government Schools?",
    a: "Yes. Selected Government Schools can avail the Technology Outreach Programme (M9) free of cost, supported through institutional provisions, CSR, and grants.",
  },
  {
    q: "Can faculty from other institutes collaborate with CIoT?",
    a: "Absolutely. We welcome inter-institutional research collaboration, co-authored publications, and joint project proposals. Reach out with your proposal.",
  },
  {
    q: "What is the Train-the-Teacher (ToT) Programme?",
    a: "M4 is a 2–5 day capacity-building programme for Science, Maths, CS and STEM teachers. Participants receive training certificates, resources, and post-training mentoring from CIoT faculty.",
  },
];

const INPUT_STYLE = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.80)",
  border: "1px solid rgba(17,24,39,0.13)",
  color: "#111827",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
};

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06 }}
      style={{
        borderRadius: "14px",
        background: "#FFFFFF",
        border: "1px solid rgba(17,24,39,0.09)",
        boxShadow: "0 1px 4px rgba(17,24,39,0.04)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[14px]"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-sm leading-relaxed">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-accent mt-0.5"
          aria-hidden="true"
        >
          <ChevronDown size={17} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed" style={{ borderTop: "1px solid rgba(17,24,39,0.07)", paddingTop: "14px" }}>
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
    const msg =
      `*New Inquiry — IoTify Lab Website*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Subject:* ${form.subject || "General Inquiry"}\n\n` +
      `*Message:* ${form.message}`;
    window.open(whatsappLink(WHATSAPP_GENERAL, msg), "_blank");
    setSent(true);
  };

  const contactInfo = [
    { icon: Mail,    label: "Email",    value: "iotily@mits.ac.in",    sub: "Response within 24 hours" },
    { icon: MapPin,  label: "Location", value: "MITS Campus, Gwalior", sub: "Madhya Pradesh, India" },
    { icon: Phone,   label: "Phone",    value: "+91 751 XXX XXXX",     sub: "Mon–Sat, 9 AM – 6 PM IST" },
  ];

  const reasons = [
    { icon: GraduationCap, title: "School Registration",    desc: "Enrol your school in IoTify programmes" },
    { icon: FlaskConical,  title: "Research Collaboration", desc: "Faculty & institutional partnerships" },
    { icon: Users,         title: "Industry Projects",      desc: "Companies with R&D challenges" },
    { icon: MessageSquare, title: "General Inquiry",        desc: "Media, events, or anything else" },
  ];

  return (
    <div className="page-enter" style={{ background: "#FFF2E5" }}>

      {/* ── HERO ── */}
      <section className="relative px-6 py-16 lg:py-20 text-center overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,rgba(15,118,110,0.10) 1px,transparent 1px)", backgroundSize: "28px 28px", opacity: 0.5 }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-2xl relative z-10 pt-20">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="eyebrow-badge inline-flex mb-6">
              <MessageSquare size={12} className="text-accent" aria-hidden="true" />
              Get In Touch
            </span>
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-[1.06] tracking-tight mb-5">
              Connect with{" "}
              <span className="text-accent">CIoT MITS</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Whether you want to register your school, collaborate on research, or explore
              IoTify Lab programmes — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT REASONS ── */}
      <section className="relative px-6 pb-14">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl text-center group transition-all duration-250 hover:-translate-y-1"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(17,24,39,0.09)", boxShadow: "0 1px 4px rgba(17,24,39,0.04)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(15,118,110,0.28)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(17,24,39,0.09)"; }}
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 transition-all" style={{ background: "rgba(15,118,110,0.08)", border: "1px solid rgba(15,118,110,0.18)", color: "#0F766E" }}>
                    <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{r.title}</div>
                  <div className="text-gray-500 text-xs leading-snug">{r.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTACT SECTION ── */}
      <section className="relative px-6 py-10 lg:py-14">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10">

          {/* Left: contact info + map */}
          <div className="flex flex-col gap-4">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-250"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(17,24,39,0.09)", boxShadow: "0 1px 4px rgba(17,24,39,0.04)" }}
                >
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl" style={{ background: "rgba(15,118,110,0.08)", border: "1px solid rgba(15,118,110,0.18)", color: "#0F766E" }}>
                    <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{info.label}</div>
                    <div className="font-semibold text-gray-900 text-sm mt-0.5">{info.value}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{info.sub}</div>
                  </div>
                </motion.div>
              );
            })}

            {/* Map embed */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32 }}
              className="rounded-2xl overflow-hidden"
              style={{ height: "240px", border: "1px solid rgba(17,24,39,0.09)", boxShadow: "0 1px 4px rgba(17,24,39,0.04)" }}
            >
              <iframe
                title="MITS Gwalior Campus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.055877840134!2d78.2057!3d26.2218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6d05f530519%3A0x673024ba1659dc64!2sMadhav%20Institute%20of%20Technology%20and%20Science!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid rgba(17,24,39,0.09)", boxShadow: "0 4px 16px rgba(17,24,39,0.06)" }}
            >
              {/* Top accent */}
              <div style={{ height: "3px", background: "linear-gradient(90deg, #0F766E, #0369A1, #0F766E)" }} aria-hidden="true" />

              <div className="p-7 lg:p-9">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                      style={{ background: "rgba(15,118,110,0.08)", border: "1px solid rgba(15,118,110,0.25)" }}
                    >
                      <Send size={28} className="text-accent" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-2xl text-gray-900 mb-2">Opening WhatsApp</h3>
                    <p className="text-gray-600 text-sm max-w-xs mb-6 leading-relaxed">
                      Your message has been formatted and WhatsApp is opening. If it didn't, click below.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="btn-glass text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-bold text-xl text-gray-900 mb-1">Send Us a Message</h2>
                    <p className="text-gray-500 text-sm mb-7">We'll respond via WhatsApp — fast and direct.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="contact-name" className="text-xs font-semibold text-gray-700 tracking-wide">Full Name *</label>
                          <input
                            id="contact-name"
                            required
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            style={INPUT_STYLE}
                            onFocus={(e) => { e.target.style.borderColor = "#0F766E"; e.target.style.boxShadow = "0 0 0 3px rgba(15,118,110,0.10)"; }}
                            onBlur={(e) => { e.target.style.borderColor = "rgba(17,24,39,0.13)"; e.target.style.boxShadow = "none"; }}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="contact-email" className="text-xs font-semibold text-gray-700 tracking-wide">Email *</label>
                          <input
                            id="contact-email"
                            required
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            style={INPUT_STYLE}
                            onFocus={(e) => { e.target.style.borderColor = "#0F766E"; e.target.style.boxShadow = "0 0 0 3px rgba(15,118,110,0.10)"; }}
                            onBlur={(e) => { e.target.style.borderColor = "rgba(17,24,39,0.13)"; e.target.style.boxShadow = "none"; }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-subject" className="text-xs font-semibold text-gray-700 tracking-wide">Subject</label>
                        <select
                          id="contact-subject"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          style={{ ...INPUT_STYLE, cursor: "pointer" }}
                          onFocus={(e) => { e.target.style.borderColor = "#0F766E"; e.target.style.boxShadow = "0 0 0 3px rgba(15,118,110,0.10)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(17,24,39,0.13)"; e.target.style.boxShadow = "none"; }}
                        >
                          <option value="">Select a topic</option>
                          <option value="School Workshop Registration">School Workshop Registration</option>
                          <option value="Train-the-Teacher Programme">Train-the-Teacher Programme</option>
                          <option value="Research Collaboration">Research Collaboration</option>
                          <option value="Industry Project">Industry Project</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-message" className="text-xs font-semibold text-gray-700 tracking-wide">Message *</label>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          placeholder="Describe your school, query, or proposal..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          style={{ ...INPUT_STYLE, resize: "vertical", minHeight: "110px", lineHeight: "1.6" }}
                          onFocus={(e) => { e.target.style.borderColor = "#0F766E"; e.target.style.boxShadow = "0 0 0 3px rgba(15,118,110,0.10)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(17,24,39,0.13)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        style={{ background: "#0F766E", border: "1px solid #0D6860", boxShadow: "0 2px 8px rgba(15,118,110,0.22)" }}
                      >
                        <Send size={15} aria-hidden="true" />
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
      <section className="relative px-6 py-14 lg:py-20" style={{ background: "#FAECE1", borderTop: "1px solid rgba(17,24,39,0.08)" }}>
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="section-label block mb-3">FAQs</span>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900">
              Common <span className="text-accent">Questions</span>
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
