import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, Code, Mail, Github, Linkedin } from "lucide-react";

const CARD_STYLE = {
  background: "#FFFFFF",
  border: "1px solid rgba(17,24,39,0.09)",
  borderRadius: "20px",
  boxShadow: "0 2px 8px rgba(17,24,39,0.06)",
};

export default function DeveloperPage() {
  const developers = [
    {
      name: "Yatharth Gupta",
      role: "Full Stack Developer · DSA Enthusiast · AI/ML",
      dept: "Internet of Things — MITS Gwalior",
      github: "https://github.com/Yatharth06-yat",
      linkedin: "https://www.linkedin.com/in/your-profile",
      email: "guptayatharth353@gmail.com",
      image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786103104/yatharth_xbbomx.jpg",
    },
    {
      name: "Divyansh Rajput",
      role: "Full Stack Developer · DSA Enthusiast · AI/ML",
      dept: "Internet of Things — MITS Gwalior",
      github: "https://github.com",
      linkedin: "https://www.linkedin.com",
      email: "divyansh@mitsgwi.ac.in",
      image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786103641/7629444f-303c-4176-b2ab-3506ec8d4d60.png",
    },
  ];

  const guides = [
    {
      name: "Dr. Praveen Bansal",
      title: "Head of Centre for IoT & Dean",
      img: "https://res.cloudinary.com/dwumernfk/image/upload/v1785521483/PIC_u3q9ur.png",
    },
    {
      name: "Dr. Dhananjay Bisen",
      title: "Assistant Professor",
      img: "https://res.cloudinary.com/dwumernfk/image/upload/v1786205891/d932cab9-5fbe-4907-99b4-42819cef8880.png",
    },
  ];

  return (
    <div
      className="page-enter min-h-screen pt-32 pb-24 px-6"
      style={{ background: "#FFF2E5" }}
    >
      {/* Subtle dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,118,110,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl space-y-10 relative z-10">

        {/* ── Label badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="eyebrow-badge">
            <Code size={13} className="text-accent" aria-hidden="true" />
            Developed under Centre for Internet of Things, MITS–DU
          </div>
        </motion.div>

        {/* ── Developers ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {developers.map((dev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.10 }}
              className="relative flex flex-col overflow-hidden"
              style={CARD_STYLE}
            >
              {/* Top accent */}
              <div
                style={{ height: "3px", background: "linear-gradient(90deg, #0F766E, #0369A1, #0F766E)" }}
                aria-hidden="true"
              />

              <div className="flex flex-col items-center text-center p-7">
                {/* Avatar */}
                <div
                  className="w-24 h-24 rounded-full overflow-hidden mb-5 flex-shrink-0"
                  style={{ border: "2px solid rgba(15,118,110,0.30)", padding: "2px" }}
                >
                  <img
                    src={dev.image}
                    alt={`Photo of ${dev.name}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h2 className="font-bold text-xl text-gray-900 mb-1">{dev.name}</h2>
                <p className="text-accent text-xs font-semibold tracking-wide mb-1">{dev.dept}</p>
                <p className="text-gray-500 text-xs mb-6 leading-relaxed">{dev.role}</p>

                {/* Education card */}
                <div
                  className="w-full p-4 rounded-xl text-left mb-6"
                  style={{ background: "#FFFAF5", border: "1px solid rgba(17,24,39,0.08)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={14} className="text-accent" aria-hidden="true" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Education</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">
                    Madhav Institute of Technology &amp; Science, Gwalior
                  </p>
                  <p className="text-accent text-xs font-medium mt-0.5">
                    B.Tech in Internet of Things (IoT)
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Centre for Internet of Things (CIoT) · Aug 2024 – Jun 2028
                  </p>
                </div>

                {/* Social links */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { href: dev.github,            Icon: Github,   label: "GitHub"   },
                    { href: dev.linkedin,           Icon: Linkedin, label: "LinkedIn" },
                    { href: `mailto:${dev.email}`,  Icon: Mail,     label: "Email"    },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      style={{ background: "#FFFAF5", border: "1px solid rgba(17,24,39,0.10)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(15,118,110,0.30)"; e.currentTarget.style.color = "#0F766E"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(17,24,39,0.10)"; e.currentTarget.style.color = "#374151"; }}
                    >
                      <Icon size={12} className="text-accent" aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Under the guidance of ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-7 sm:p-9 text-center"
          style={CARD_STYLE}
        >
          <div className="inline-flex items-center gap-2 mb-7">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(15,118,110,0.08)", border: "1px solid rgba(15,118,110,0.20)" }}
            >
              <Users size={15} className="text-accent" aria-hidden="true" />
            </div>
            <h2 className="font-bold text-xl text-gray-900">Under the Guidance of</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {guides.map((guide, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200"
                style={{ background: "#FFFAF5", border: "1px solid rgba(17,24,39,0.08)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(15,118,110,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(17,24,39,0.08)"; }}
              >
                <div
                  className="w-20 h-20 rounded-full overflow-hidden mb-4"
                  style={{ border: "2px solid rgba(15,118,110,0.25)", padding: "2px" }}
                >
                  <img
                    src={guide.img}
                    alt={`Photo of ${guide.name}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-1">{guide.name}</h3>
                <p className="text-accent text-xs font-semibold">{guide.title}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
