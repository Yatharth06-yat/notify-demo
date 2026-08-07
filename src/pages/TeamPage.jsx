import { motion } from "framer-motion";
import { Linkedin, Mail, Github, ExternalLink, GraduationCap, Users } from "lucide-react";
import GlowOrb from "../components/shared/GlowOrb";

const FACULTY = [
  {
    name: "Dr. Priya Sharma",
    role: "Lab Director",
    dept: "Computer Science & Engineering",
    specialization: "AI, Deep Learning, Edge Intelligence",
    initials: "PS",
    color: "from-cyan-primary to-blue-accent",
    bio: "PhD from IIT Bombay. 12+ years in AI research. Author of 40+ publications in IEEE and Springer.",
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Co-Director, IoT Research",
    dept: "Electronics & Communication",
    specialization: "IoT, Embedded Systems, RTOS",
    initials: "RK",
    color: "from-blue-accent to-cyan-primary",
    bio: "Expert in low-power embedded architectures. Pioneered LoRaWAN deployments across Madhya Pradesh.",
  },
  {
    name: "Prof. Anita Verma",
    role: "Head, Robotics Division",
    dept: "Mechanical Engineering",
    specialization: "Robotics, Control Systems, SLAM",
    initials: "AV",
    color: "from-cyan-bright to-cyan-primary",
    bio: "Former researcher at CMC Research. Specializes in autonomous mobile robots and motion planning.",
  },
  {
    name: "Dr. Sanjay Patel",
    role: "Lead, Computer Vision",
    dept: "Computer Science & Engineering",
    specialization: "Computer Vision, Medical AI, Transformers",
    initials: "SP",
    color: "from-blue-accent to-cyan-bright",
    bio: "Post-doc from NUS Singapore. Published in CVPR, ECCV. Expert in medical image analysis.",
  },
  {
    name: "Prof. Meena Singh",
    role: "Industry 4.0 Lead",
    dept: "Industrial & Production Engineering",
    specialization: "Digital Twins, Smart Manufacturing",
    initials: "MS",
    color: "from-cyan-primary to-blue-accent",
    bio: "15 years in manufacturing automation. Bridges academia-industry with 5 active industry partners.",
  },
  {
    name: "Dr. Amit Joshi",
    role: "Research Scientist",
    dept: "Electronics Engineering",
    specialization: "FPGA, DSP, PCB Design",
    initials: "AJ",
    color: "from-blue-accent to-cyan-primary",
    bio: "Embedded hardware expert. Designed custom PCBs for 20+ IoT deployments across India.",
  },
];

const RESEARCHERS = [
  { name: "Rahul Tiwari", year: "PhD Scholar", domain: "Federated Learning", initials: "RT" },
  { name: "Sneha Gupta", year: "M.Tech", domain: "Computer Vision", initials: "SG" },
  { name: "Aditya Mishra", year: "B.Tech IV", domain: "Robotics & ROS2", initials: "AM" },
  { name: "Kavya Reddy", year: "B.Tech IV", domain: "Edge AI / Jetson", initials: "KR" },
  { name: "Rohan Dubey", year: "M.Tech", domain: "IoT Security", initials: "RD" },
  { name: "Priya Nair", year: "PhD Scholar", domain: "Industry 4.0", initials: "PN" },
  { name: "Arjun Saxena", year: "B.Tech III", domain: "SLAM & Navigation", initials: "AS" },
  { name: "Divya Choudhary", year: "M.Tech", domain: "NLP & LLMs", initials: "DC" },
  { name: "Vikram Rao", year: "B.Tech IV", domain: "PCB & Firmware", initials: "VR" },
  { name: "Nisha Agarwal", year: "PhD Scholar", domain: "Medical Vision AI", initials: "NA" },
  { name: "Siddharth Pande", year: "B.Tech III", domain: "Smart Energy", initials: "SP" },
  { name: "Ankita Jha", year: "B.Tech IV", domain: "Autonomous Robots", initials: "AJ" },
];

function FacultyCard({ member, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-card group p-8 flex flex-col items-center text-center cursor-default"
    >
      {/* Avatar */}
      <div className="relative mb-6">
        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-mono font-bold text-2xl shadow-glow transition-transform duration-400 group-hover:scale-105`}>
          {member.initials}
        </div>
        {/* Status dot */}
        <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#090B11]" />
      </div>

      <h3 className="font-display font-bold text-white text-xl mb-1 group-hover:text-cyan-bright transition-colors">{member.name}</h3>
      <p className="text-cyan-primary text-xs font-display tracking-widest uppercase mb-1">{member.role}</p>
      <p className="text-muted text-xs mb-3">{member.dept}</p>

      <div className="flex flex-wrap justify-center gap-1.5 mb-5">
        {member.specialization.split(", ").map((s) => (
          <span key={s} className="tag-badge text-[10px]">{s}</span>
        ))}
      </div>

      <p className="text-muted text-xs leading-relaxed mb-6 flex-1">{member.bio}</p>

      {/* Social links */}
      <div className="flex items-center gap-3">
        {[Mail, Linkedin, Github].map((Icon, j) => (
          <a key={j} href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-muted hover:text-cyan-primary hover:border-cyan-primary/40 transition-all duration-200">
            <Icon size={13} />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function ResearcherCard({ member, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card group p-5 flex items-center gap-4 cursor-default"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-primary/20 to-blue-accent/20 border border-cyan-primary/20 flex items-center justify-center text-white font-mono font-semibold text-sm flex-shrink-0 group-hover:border-cyan-primary/50 transition-colors">
        {member.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-white text-sm truncate">{member.name}</div>
        <div className="text-muted text-xs mt-0.5">{member.domain}</div>
        <div className="text-cyan-primary text-[10px] font-display mt-0.5">{member.year}</div>
      </div>
    </motion.div>
  );
}

export default function TeamPage({ onNavigate }) {
  return (
    <div className="page-enter pt-28">

      {/* ── HERO ── */}
      <section className="relative px-6 py-16 lg:py-24 text-center overflow-hidden">
        <GlowOrb color="blue" size="xl" className="-top-48 left-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 circuit-bg opacity-20" />

        <div className="mx-auto max-w-3xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow-badge inline-flex mb-7">
              <Users size={13} className="text-cyan-primary" />
              Our Team
            </span>
            <h1 className="font-mono font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              The Minds Behind the{" "}
              <span className="text-gradient">Innovation</span>
            </h1>
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
              120+ researchers, engineers, and scientists united by one goal: 
              building intelligent systems that actually work in the real world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TEAM STATS ── */}
      <section className="relative px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "6", label: "Faculty Mentors" },
              { num: "12", label: "PhD Scholars" },
              { num: "40+", label: "M.Tech Researchers" },
              { num: "60+", label: "B.Tech Members" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="font-mono font-bold text-3xl text-white mb-1">{s.num}</div>
                <div className="text-xs text-muted font-display">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACULTY ── */}
      <section className="relative px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-label block mb-4">Faculty & Mentors</span>
            <h2 className="font-mono font-extrabold text-3xl sm:text-5xl text-white">
              Expert <span className="text-gradient">Leadership</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACULTY.map((member, i) => (
              <FacultyCard key={member.name} member={member} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCHERS ── */}
      <section className="relative px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="section-label block mb-3">Student Researchers</span>
              <h2 className="font-mono font-extrabold text-3xl sm:text-4xl text-white">
                The <span className="text-gradient">Builders</span>
              </h2>
            </div>
            <span className="text-muted text-sm hidden sm:block">Showing 12 of 100+</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {RESEARCHERS.map((member, i) => (
              <ResearcherCard key={member.name} member={member} i={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="glass-card inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-muted text-sm">
              <GraduationCap size={16} className="text-cyan-primary" />
              + 100 more active researchers across all domains
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="relative px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-mono font-extrabold text-3xl sm:text-5xl text-white mb-6">
              Want to Join the{" "}
              <span className="text-gradient">Team?</span>
            </h2>
            <p className="text-muted text-base sm:text-lg mb-10 max-w-lg mx-auto">
              We're always looking for passionate students and researchers who want 
              to build things that matter. No experience required — just curiosity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => onNavigate("contact")} className="btn-primary">
                Apply Now
                <ExternalLink size={15} />
              </button>
              <button onClick={() => onNavigate("research")} className="btn-glass">
                View Research Areas
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
