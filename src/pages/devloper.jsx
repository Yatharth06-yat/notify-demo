import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Code,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

/* ==========================================================================
   DEVELOPER PAGE COMPONENT
   Matching the dark, high-tech glassmorphism theme of IoTify Lab
   ========================================================================== */
export default function DeveloperPage() {
  const developers = [
    {
      name: "Yatharth Gupta",
      role: "Full Stack & IoT Developer",
      dept: "Internet of Things",
      cgpa: "9.2/10",
      enrolment: "0901AD2310xx",
      github: "https://github.com/Yatharth06-yat",
      linkedin: "https://www.linkedin.com/in/your-profile",
      email: "guptayatharth353@gmail.com",
      image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786103104/yatharth_xbbomx.jpg",
    },
    {
      name: "Divyansh Rajput",
      role: "Embedded Systems & AI Engineer",
      dept: "Internet of Things",
      cgpa: "9.4/10",
      enrolment: "0901AD2310xx",
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
      description: "Power Quality, Grid Connected Systems, Multilevel Inverters, IoT",
      img: "https://res.cloudinary.com/dwumernfk/image/upload/v1785521483/PIC_u3q9ur.png",
    },
    {
      name: "Dr. Dhananjay Bisen",
      title: "Assistant Professor",
      description: "Computer Programming, Data Science, Machine Learning, Deep Learning",
      img: "https://res.cloudinary.com/dwumernfk/image/upload/v1786084949/bc2b0ae0-187a-4e8c-96be-44130ca0c5bd.png",
    },
  ];

  return (
    <div className="page-enter min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,207,255,0.08) 0%, rgba(0,100,180,0.03) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="mx-auto max-w-5xl space-y-12 relative z-10">
        
        {/* CLUB BANNER TAG */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-primary/30 bg-cyan-primary/[0.06] text-cyan-bright font-display text-xs tracking-wider uppercase">
            <Code size={14} className="text-cyan-primary" />
            Developed Under Centre for Internet of Things, MITS-DU
          </div>
        </motion.div>

        {/* DEVELOPERS HERO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {developers.map((dev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] border border-white/[0.08] relative overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-primary via-blue-accent to-cyan-primary" />
              
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full overflow-hidden p-1 border-2 border-cyan-primary/40 bg-cyan-primary/10 shadow-[0_0_20px_rgba(0,207,255,0.2)]">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                <h1 className="font-display font-extrabold text-2xl text-white mb-1">
                  {dev.name}
                </h1>
                <p className="text-cyan-bright font-display text-xs font-medium mb-1">
                  {dev.dept}
                </p>
                <p className="text-muted text-xs mb-6">
                  {dev.role}
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-primary/40 text-xs text-white font-display transition-colors"
                  >
                    <Github size={13} className="text-cyan-primary" />
                    GitHub
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-primary/40 text-xs text-white font-display transition-colors"
                  >
                    <Linkedin size={13} className="text-cyan-primary" />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${dev.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-primary/40 text-xs text-white font-display transition-colors"
                  >
                    <Mail size={13} className="text-cyan-primary" />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* EDUCATION SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 rounded-3xl border border-white/[0.08]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-primary/10 border border-cyan-primary/20 flex items-center justify-center text-cyan-primary">
              <GraduationCap size={20} />
            </div>
            <h2 className="font-display font-bold text-xl text-white">
              Education
            </h2>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-base">
              Madhav Institute of Technology & Science, Gwalior
            </h3>
            <p className="text-cyan-bright font-display text-sm font-medium">
              B.Tech in Internet of Things (IoT)
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted font-mono pt-2">
              <span>📅 Aug 2024 - Jun 2028</span>
              
            </div>
            <div className="text-xs text-muted font-body pt-1">
              Department: Centre for Internet of Things (CIoT), MITS Gwalior
            </div>
          </div>
        </motion.div>

        {/* UNDER THE GUIDANCE OF SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-8 sm:p-10 rounded-3xl border border-white/[0.08] text-center"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-cyan-primary/10 border border-cyan-primary/20 flex items-center justify-center text-cyan-primary">
              <Users size={16} />
            </div>
            <h2 className="font-display font-bold text-xl text-white">
              Under the Guidance of
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {guides.map((guide, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center text-center group hover:border-cyan-primary/40 transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-cyan-primary/30 p-0.5 bg-cyan-primary/10">
                  <img
                    src={guide.img}
                    alt={guide.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-1 group-hover:text-cyan-bright transition-colors">
                  {guide.name}
                </h3>
                <p className="text-cyan-primary font-display text-xs font-medium mb-1">
                  {guide.title}
                </p>
                <p className="text-muted text-xs leading-relaxed">
                  {guide.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}