import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  BrainCircuit,
  Bot,
  Wifi,
  Lightbulb,
  Users,
  BookOpen,
  GraduationCap,
  Trophy,
  Globe,
  ArrowRight,
  Cloud,
  Shield,
  Zap,
  Server,
  Database,
  Terminal,
  Layers,
  Download,
  ExternalLink,
  Activity,
  Radio,
  HardDrive,
  Eye,
  CheckCircle,
  Home,
  Sprout,
  HeartPulse,
  Building2,
  Factory,
  ArrowLeft
} from "lucide-react";

// Defined as a string constant to prevent ES module import errors
const teamGroupImage = "https://res.cloudinary.com/dwumernfk/image/upload/v1785964187/image_2_wkozas.png";

// Placeholder images for Client Kits
const kit5 = "https://res.cloudinary.com/dwumernfk/image/upload/v1785959726/kit3-1_zfdued.png";
const kit6 = "https://res.cloudinary.com/dwumernfk/image/upload/v1785958063/kit2-2_jhisgx.png";
const kit7 = "https://res.cloudinary.com/dwumernfk/image/upload/v1785960452/kit1_ucw8t5.jpg";
const kit8 = "https://res.cloudinary.com/dwumernfk/image/upload/v1785959728/kit3-2_gak5l5.png";
const kit9 = "https://res.cloudinary.com/dwumernfk/image/upload/v1785958080/kit2-1_hue1gg.png";
const kit10 = "https://res.cloudinary.com/dwumernfk/image/upload/v1785960464/kit14_wah76h.jpg";

// --- DATA CONFIGURATIONS ---
const OBJECTIVES = [
  {
    icon: Cpu,
    text: "Hands-on training in IoT, AI, Robotics & Embedded Systems in school premises.",
  },
  {
    icon: Lightbulb,
    text: "Promote experiential, project-based learning using in-house IoT kits developed by CIoT, MITS.",
  },
  {
    icon: GraduationCap,
    text: "Capacity-building and Train-the-Teacher (ToT) programmes for school teachers.",
  },
  {
    icon: Wifi,
    text: "Support establishment of IoT/STEM Innovation Clubs and technology-learning facilities.",
  },
  {
    icon: BrainCircuit,
    text: "Project mentoring and encouraging technology-based solutions to real-life problems.",
  },
  {
    icon: Trophy,
    text: "Organize workshops, technology camps, innovation challenges and project exhibitions.",
  },
  {
    icon: Globe,
    text: "Technology outreach and selected free training programmes for Government Schools.",
  },
  {
    icon: Users,
    text: "Strengthen academic outreach, innovation ecosystem and institutional visibility of MITS.",
  },
];

const CLIENT_SLIDES = [
  {
    id: 1,
    title: "IoT Communication Kit – Transmitter",
    subtitle:
      "A communication-focused IoT kit featuring ESP32, Arduino UNO, GSM, GPS, LoRa, ZigBee, Bluetooth, RFID, and RF-433 modules.",
    category: "IoT Communication",
    image: kit5,
  },
  {
    id: 2,
    title: "IoT Starter Kit – Foundation",
    subtitle:
      "A hands-on foundation kit featuring Arduino UNO and Nano with digital and analog sensors, relay, buzzer, LEDs, and basic control components.",
    category: "IoT Starter Kit",
    image: kit6,
  },
  {
    id: 3,
    title: "IoT Application Kit",
    subtitle:
      "An application-focused IoT kit featuring ESP32, Raspberry Pi Pico, ESP8266, OLED display, gas sensors, PM sensor, barometric sensor, relay, and LEDs.",
    category: "IoT Applications",
    image: kit7,
  },
  {
    id: 4,
    title: "IoT Communication Kit – Receiver",
    subtitle:
      "A receiver-focused communication kit featuring ESP32, Arduino UNO, GSM, GPS, LoRa, ZigBee, Bluetooth, RFID, NRF24L01, and RF-433 modules.",
    category: "IoT Communication",
    image: kit8,
  },
  {
    id: 5,
    title: "IoT Starter Kit – Foundation",
    subtitle:
      "A sensor learning kit with Arduino UNO and Nano, ultrasonic, flame, rain, PIR, IR, DHT11, LDR, gas, soil moisture, and other sensors.",
    category: "IoT Starter Kit",
    image: kit9,
  },
  {
    id: 6,
    title: "IoT Smart Attendance System",
    subtitle:
      "A Raspberry Pi 5-based smart attendance system featuring a 7-inch touchscreen, RFID, PIR, ultrasonic, DHT22, relay, and LED indicators.",
    category: "Smart Campus",
    image: kit10,
  },
];

// --- HIERARCHICAL TEAM DATA ---
const LEADERSHIP = {
  name: "Dr. Praveen Bansal",
  role: "HEAD OF CENTRE FOR IOT & DEAN",
  image: "https://res.cloudinary.com/dwumernfk/image/upload/v1785521483/PIC_u3q9ur.png",
};

const FACULTY_COORDINATORS = [
  {
    name: "Dr. Bhavna Rathore",
    role: "Faculty Coordinator / Assistant Professor",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786084905/2681f153-4d9d-446e-8f19-9ca53806d352.png",
  },
  {
    name: "Dr. Priyanka Garg",
    role: "Faculty Coordinator / Assistant Professor",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786084923/20fc50ad-939a-4088-a2b5-b84004018612.png",
  },
];

const FACULTY_MEMBERS = [
  {
    name: "Dr. Dhananjay Bisen",
    role: "Faculty Member / Resource Person",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786205891/d932cab9-5fbe-4907-99b4-42819cef8880.png",
  },
  {
    name: "Dr. Namita Arya",
    role: "Faculty Member / Resource Person",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786177507/6eb598eb-0a9c-4f37-a522-e29d2bf6803e.png",
  },
  {
    name: "Dr. Abhishek Sharma",
    role: "Faculty Member / Resource Person",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786177524/df816717-ac2c-4e22-9f2f-1c8ee7669622.png",
  },
  {
    name: "Prof. Anuj Lodhi",
    role: "Faculty Member / Resource Person",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786177536/d78a7fdb-2ac8-42bb-8e4f-ba261a5ecc51.png",
  },
];

const OPERATIONAL_FRAMEWORK = [
  {
    stage: 1,
    activity: "School Expression of Interest/Request",
    outcome: "School submits EOI/request.",
  },
  {
    stage: 2,
    activity: "Identification of Training Model and Programme Requirements",
    outcome: "Training model and requirements are finalized.",
  },
  {
    stage: 3,
    activity: "Approval of Programme, Schedule and Fee Structure",
    outcome: "Programme, schedule and fee structure are approved.",
  },
  {
    stage: 4,
    activity: "Deposit of Approved Programme Fee in the Designated MITS Account, Wherever Applicable",
    outcome: "Approved fee is deposited through the prescribed MITS mechanism.",
  },
  {
    stage: 5,
    activity: "Conduct of Training Using In-house IoT Learning and Training Kits Developed by CIoT",
    outcome: "Training is conducted using CIoT-developed IoT kits.",
  },
  {
    stage: 6,
    activity: "Hands-on Activities and Project Development",
    outcome: "Practical activities/ mini-projects are completed.",
  },
  {
    stage: 7,
    activity: "Assessment, Feedback and Programme Documentation",
    outcome: "Learning outcomes, feedback and programme records are documented.",
  },
  {
    stage: 8,
    activity: "Issuance of Certificates through the Approved MITS Mechanism",
    outcome: "Certificates are issued to eligible participants.",
  },
  {
    stage: 9,
    activity: "Post-Training Mentoring and School Innovation Support",
    outcome: "Follow-up mentoring and innovation support are provided.",
  },
];

function Carousel({ items }) {
  const [isHovered, setIsHovered] = useState(false);
  const galleryItems = [...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden py-4 sm:py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes aboutGalleryMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .about-gallery-track {
          animation: aboutGalleryMarquee 36s linear infinite;
          will-change: transform;
        }
        .about-gallery-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #000000 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #000000 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
        }}
      />

      <div className="relative w-full" style={{ perspective: "1400px" }}>
        <div style={{ transform: "rotateX(2deg) rotateY(-1.5deg)" }}>
          <div
            className={`flex items-stretch gap-5 sm:gap-6 w-max about-gallery-track ${
              isHovered ? "about-gallery-paused" : ""
            }`}
          >
            {galleryItems.map((item, idx) => (
              <div
                key={`${item.id ?? idx}-${idx}`}
                className="glass-card shimmer-card group relative w-[260px] sm:w-[380px] md:w-[440px] h-[200px] sm:h-[270px] md:h-[310px] rounded-2xl overflow-hidden flex-shrink-0 p-0 border-cyan-primary/20 transition-all duration-500 hover:border-cyan-primary/50 hover:-translate-y-2"
                style={{
                  boxShadow: "0 10px 40px -15px rgba(0,0,0,0.8)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title || "Gallery"}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent p-5 sm:p-6 flex flex-col justify-end">
                  <span className="section-label mb-1 text-[10px] sm:text-xs">
                    {item.category || "Workshop Spotlight"}
                  </span>
                  <h4 className="font-display text-white text-sm sm:text-lg md:text-xl font-bold tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-muted text-[11px] sm:text-xs font-body mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <div className="absolute -top-px -right-px w-14 h-14 rounded-tr-2xl bg-gradient-to-bl from-cyan-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT: TEAM CARD WITH ANIMATION AND WHITE IMAGE BACKGROUND ---
function TeamCard({ name, role, image, index = 0, isLeader = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      className={`glass-card spotlight-card shimmer-card group p-0 overflow-hidden flex flex-col h-full ${
        isLeader ? "border-cyan-primary/50 shadow-glow" : ""
      }`}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-4">
        <motion.img
          src={image}
          alt={name}
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full object-contain object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-px -right-px w-16 h-16 rounded-tr-3xl bg-gradient-to-bl from-cyan-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-10 text-center items-center">
        <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 group-hover:text-cyan-bright transition-colors duration-300 leading-snug">
          {name}
        </h3>
        <span className="section-label text-center">{role}</span>
      </div>
    </motion.div>
  );
}

// --- SECTION 1: ABOUT SECTION ---
function AboutSection({ onNavigate = () => {} }) {
  return (
    <section className="relative px-6 pt-10 pb-14 sm:pt-16 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 circuit-bg pointer-events-none" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,180,220,0.18) 0%, rgba(0,120,180,0.08) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div className="mx-auto max-w-6xl relative z-10 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left lg:col-span-7 mt-12 lg:mt-0"
          >
            <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-[0.25em]">
              <span className="glow-dot" />
              About IoTify Lab
            </span>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[42px] text-white leading-[1.15] tracking-tight mb-7">
              A{" "}
              <span className="text-gradient">journey</span>{" "}
              of passion,{" "}
              <span className="text-gradient">purpose</span>
              {" "}and{" "}
              <span className="text-gradient">innovation</span>
            </h1>

            <p className="text-muted text-base sm:text-lg leading-relaxed font-body text-justify mb-8 text-justify">
              The Centre for Internet of Things (CIoT), MITS–Deemed University, Gwalior, proposes to
              establish{" "}
              <span className="text-cyan-bright font-semibold">"IoTify Lab"</span>{" "}
              as an institutional outreach and hands-on technology learning initiative for school
              students and teachers. The initiative will promote experiential and project-based
              learning in IoT, Artificial Intelligence, Robotics, Embedded Systems and other
              emerging technologies. IoTify Lab shall conduct training programmes, workshops and
              project mentoring using the in-house IoT learning and training kits developed by CIoT.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-14">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("Iot")}
                className="px-6 py-3 rounded-xl bg-cyan-primary text-black font-semibold flex items-center gap-2 shadow-glow text-sm transition-all bg-[#00bfff]"
              >
                Explore IoT
                <ArrowRight size={15} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("iotkit")}
                className="px-6 py-3 rounded-xl glass-card text-white font-semibold border border-cyan-primary/30 hover:border-cyan-primary text-sm transition-all"
              >
                View Kit
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-card spotlight-card p-3 rounded-3xl overflow-hidden border-cyan-primary/30 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-primary/10 via-transparent to-transparent pointer-events-none" />
              <img
                src={teamGroupImage}
                alt="CIoT MITS Outreach Initiative"
                className="w-full h-[340px] sm:h-[400px] object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-cyan-primary/30 shadow-lg flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-primary animate-pulse" />
                <p className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                  CIoT MITS Outreach Initiative
                </p>
              </div>

              <div className="absolute -top-px -right-px w-16 h-16 rounded-tr-3xl bg-gradient-to-bl from-cyan-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-left mb-10"
        >
          <span className="section-label mb-3 block">Objectives of IoTify Lab</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            What We{" "}
            <span className="text-gradient">Aim to Achieve</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {OBJECTIVES.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="glass-card spotlight-card group flex items-start gap-4 p-5 sm:p-6 rounded-2xl border-cyan-primary/20 hover:border-cyan-primary/50 transition-all duration-300 hover:-translate-y-1 relative"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-primary/12 to-blue-accent/8 border border-cyan-primary/20 text-cyan-primary group-hover:shadow-glow group-hover:scale-110 transition-all duration-400">
                  <Icon size={20} strokeWidth={1.6} />
                </div>

                <div className="flex flex-col">
                  <span className="text-cyan-primary font-mono text-xs font-semibold tracking-widest mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-muted text-sm sm:text-base leading-relaxed font-body group-hover:text-white/80 transition-colors duration-300">
                    {obj.text}
                  </p>
                </div>

                <div className="absolute -top-px -right-px w-12 h-12 rounded-tr-2xl bg-gradient-to-bl from-cyan-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glow-line w-32 mt-14 sm:mt-20"
        />
      </div>
    </section>
  );
}

// --- SECTION 2: CLIENTS SECTION ---
function ClientsSection() {
  return (
    <section className="relative px-6 py-10 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-40 pointer-events-none" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(79,125,255,0.14) 0%, rgba(0,120,180,0.06) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-badge mb-4 text-xs sm:text-sm tracking-[0.25em] font-mono">
            <span className="glow-dot" />
            — LAB INFRASTRUCTURE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-6">
            Engineered for <span className="text-cyan-primary">innovation</span> and research.
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed font-body">
            CIoT MITS provides state-of-the-art tooling and hardware ecosystems designed to empower students and researchers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Carousel items={CLIENT_SLIDES} />
        </motion.div>
      </div>
    </section>
  );
}

// --- SECTION 3: TEAM HIERARCHY TREE SECTION WITH ANIMATIONS ---
function TeamSection() {
  return (
    <section className="relative px-6 pt-6 pb-14 sm:pt-8 sm:pb-20 overflow-hidden">
      <div className="gradient-mesh pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-label mb-4">— OUR TEAM HIERARCHY</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-5">
            Team <span className="text-gradient">Behind The Lab</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Structured organizational hierarchy from institutional leadership down to faculty coordinators and support teams.
          </p>
        </motion.div>

        <div className="flex flex-col items-center relative">
          <div className="w-full max-w-sm z-10 mb-2">
            <TeamCard
              name={LEADERSHIP.name}
              role={LEADERSHIP.role}
              image={LEADERSHIP.image}
              isLeader={true}
              index={0}
            />
          </div>

          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-0.5 h-12 bg-gradient-to-b from-cyan-primary to-cyan-primary/40 relative origin-top"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-primary animate-pulse" />
          </motion.div>

          <div className="w-full mt-4 mb-2 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <span className="section-label px-4 py-1.5 rounded-full bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-bright shadow-glow">
                Faculty Coordinator(s)
              </span>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {FACULTY_COORDINATORS.map((member, idx) => (
                <TeamCard
                  key={member.name}
                  index={idx + 1}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-0.5 h-12 bg-gradient-to-b from-cyan-primary/40 to-cyan-primary/40 my-2 origin-top"
          />

          <div className="w-full mt-4 mb-2 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="section-label px-4 py-1.5 rounded-full bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-bright shadow-glow">
                Faculty Members / Resource Persons
              </span>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {FACULTY_MEMBERS.map((member, idx) => (
                <TeamCard
                  key={member.name}
                  index={idx + 1}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-0.5 h-12 bg-gradient-to-b from-cyan-primary/40 to-cyan-primary/20 my-2 origin-top"
          />
        </div>
      </div>
    </section>
  );
}

// --- SECTION 4: OPERATIONAL FRAMEWORK SECTION ---
function OperationalFrameworkSection() {
  return (
    <section className="relative px-6 py-12 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12"
        >
          <span className="section-label mb-4">— PROCESS & WORKFLOW</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-5">
            Proposed <span className="text-gradient">Operational Framework</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Step-by-step workflow governing school outreach, training execution, and post-training support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden border-cyan-primary/20 shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-cyan-primary/20 bg-cyan-primary/10">
                  <th className="py-4 px-6 font-display font-bold text-cyan-primary text-xs sm:text-sm tracking-wider uppercase w-20 text-center">
                    Stage
                  </th>
                  <th className="py-4 px-6 font-display font-bold text-cyan-primary text-xs sm:text-sm tracking-wider uppercase">
                    Operational Activity
                  </th>
                  <th className="py-4 px-6 font-display font-bold text-cyan-primary text-xs sm:text-sm tracking-wider uppercase">
                    Major Action / Outcome
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-primary/10 font-body text-sm sm:text-base">
                {OPERATIONAL_FRAMEWORK.map((item) => (
                  <tr key={item.stage} className="hover:bg-cyan-primary/5 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-cyan-bright text-center">
                      {item.stage}
                    </td>
                    <td className="py-4 px-6 text-white font-medium">
                      {item.activity}
                    </td>
                    <td className="py-4 px-6 text-muted">
                      {item.outcome}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- EXPLORE IOT COMPONENT ---
function ExploreIoT({ onBack }) {
  return (
    <div className="bg-black text-[#00bfff] min-h-screen relative font-sans selection:bg-[#00bfff] selection:text-[#050816]">
      {/* Back Button Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-12">
        {/* --- 1. HERO SECTION --- */}
        <section className="text-center space-y-8 pt-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6">
            <span className="text-white">Explore</span>{" "}
            <span className="text-[#00bfff]">Internet</span>{" "}
            <span className="text-blue-400">of Things</span>
          </h1>

          <p className="text-[#00bfff]/90 text-base sm:text-xl max-w-2xl mx-auto font-medium">
            Discover how smart devices sense, connect, communicate and automate the world around us.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#roadmap" className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00bfff] to-[#4f46e5] text-[#050816] font-bold shadow-[0_0_30px_rgba(0,191,255,0.4)] hover:scale-105 transition-all flex items-center space-x-2">
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#guide" className="px-7 py-3.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 text-[#00bfff] font-semibold transition-all backdrop-blur-xl shadow-[0_0_15px_rgba(0,191,255,0.2)]">
              Download IoT Guide
            </a>
          </div>

          {/* Animated IoT Network Flow */}
          <div className="pt-6">
            <div className="p-6 rounded-2xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all duration-300 backdrop-blur-2xl max-w-4xl mx-auto shadow-2xl">
              <div className="text-xs font-mono text-[#00bfff] mb-4 tracking-wider font-bold">LIVE DATA PIPELINE FLOW</div>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono">
                {["Sensor", "ESP32", "Internet", "Cloud", "Action"].map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="px-4 py-2.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/20 transition-all text-[#00bfff] font-semibold shadow-[0_0_15px_rgba(0,191,255,0.25)]">
                      {step}
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="text-blue-400 font-bold animate-pulse">→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. WHAT IS IoT? --- */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-white">What is</span>{" "}
              <span className="text-[#00bfff]">Internet</span>{" "}
              <span className="text-blue-400">of Things?</span>
            </h2>
            <p className="text-[#00bfff]/90 max-w-2xl mx-auto text-sm sm:text-base font-medium">
              <span className="text-[#00bfff] font-bold">Internet of Things (IoT)</span> connects physical devices with sensors, software and networks so they can collect, exchange and act on data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Sense", desc: "Collect environmental and physical data via specialized hardware sensors.", icon: Eye, color: "text-[#00bfff]" },
              { title: "Connect", desc: "Send acquired telemetry securely over Wi-Fi, BLE, or cellular networks.", icon: Wifi, color: "text-blue-400" },
              { title: "Process", desc: "Analyze raw data streams on edge microcontrollers or cloud platforms.", icon: Cpu, color: "text-purple-400" },
              { title: "Act", desc: "Perform physical actions through actuators, motors, and automated relays.", icon: Zap, color: "text-[#00bfff]" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1 shadow-xl">
                <div className={`w-12 h-12 rounded-xl bg-transparent border border-[#00bfff]/20 group-hover:border-[#00bfff] flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-[#00bfff]/90 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 3. IoT COMPONENTS --- */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-white">Core</span>{" "}
              <span className="text-[#00bfff]">IoT</span>{" "}
              <span className="text-blue-400">Components</span>
            </h2>
            <p className="text-[#00bfff]/90 text-sm font-medium">Essential building blocks of any connected hardware system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: "Sensors", desc: "Temperature, humidity, motion, distance, light, gas.", icon: Eye },
              { title: "Actuators", desc: "Motor, relay, pump, solenoid valve, LED, buzzer.", icon: Zap },
              { title: "Controllers", desc: "Arduino, ESP32, ESP8266, Raspberry Pi Pico.", icon: Cpu },
              { title: "Connectivity", desc: "Wi-Fi, Bluetooth, LoRa, Zigbee, MQTT, HTTP.", icon: Wifi },
              { title: "Cloud", desc: "Storage, real-time analytics, databases and dashboards.", icon: Cloud }
            ].map((comp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 backdrop-blur-xl flex flex-col justify-between transition-all shadow-lg">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-transparent border border-[#00bfff]/20 flex items-center justify-center text-[#00bfff] mb-3">
                    <comp.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{comp.title}</h3>
                </div>
                <p className="text-[11px] text-[#00bfff]/90 mt-2 leading-relaxed font-medium">{comp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. HOW IoT WORKS --- */}
        <section className="p-8 rounded-3xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all duration-300 backdrop-blur-2xl space-y-8 shadow-2xl">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">
              <span className="text-white">How</span>{" "}
              <span className="text-[#00bfff]">IoT</span>{" "}
              <span className="text-blue-400">Works</span>
            </h2>
            <p className="text-[#00bfff]/90 text-xs sm:text-sm font-medium">End-to-end telemetry lifecycle from physical world to automated action.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: "01", label: "Sensor", desc: "Detects physical change" },
              { step: "02", label: "Controller", desc: "Reads & digitizes signal" },
              { step: "03", label: "Network", desc: "Transmits via Wi-Fi/BLE" },
              { step: "04", label: "Cloud / Edge", desc: "Processes data streams" },
              { step: "05", label: "Decision", desc: "AI / threshold logic" },
              { step: "06", label: "Action", desc: "Triggers actuator/relay" }
            ].map((flow, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-transparent border border-[#00bfff]/20 text-center relative group hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all">
                <div className="text-[10px] font-mono text-[#00bfff] font-bold mb-1">{flow.step}</div>
                <div className="font-bold text-white text-sm mb-1">{flow.label}</div>
                <div className="text-[10px] text-[#00bfff]/90 font-medium">{flow.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. POPULAR IoT BOARDS --- */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-white">Popular</span>{" "}
              <span className="text-[#00bfff]">IoT</span>{" "}
              <span className="text-blue-400">Boards</span>
            </h2>
            <p className="text-[#00bfff]/90 text-sm font-medium">Microcontrollers and microcomputers powering modern connected prototypes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Arduino UNO", tag: "Beginners", desc: "Classic microcontroller board ideal for learning basic electronics, sensors and actuators." },
              { name: "ESP32", tag: "Connected IoT", desc: "Dual-core chip with built-in Wi-Fi and Bluetooth, perfect for wireless IoT applications." },
              { name: "Raspberry Pi", tag: "Advanced IoT", desc: "Full Linux mini-computer capable of running heavy servers, databases and Python scripts." },
              { name: "Jetson Nano", tag: "Edge AI", desc: "AI powerhouse board designed to run computer vision and neural networks right at the edge." }
            ].map((board, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 backdrop-blur-xl transition-all group shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Cpu className="w-6 h-6 text-[#00bfff]" />
                    <span className="px-2.5 py-1 rounded-full bg-transparent text-[#00bfff] text-[10px] font-mono font-bold border border-[#00bfff]/20 group-hover:border-[#00bfff]/50">{board.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{board.name}</h3>
                  <p className="text-xs text-[#00bfff]/90 leading-relaxed font-medium">{board.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 6. APPLICATIONS --- */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-white">Key IoT</span>{" "}
              <span className="text-[#00bfff]">Smart</span>{" "}
              <span className="text-blue-400">Applications</span>
            </h2>
            <p className="text-[#00bfff]/90 text-sm font-medium">Transforming industries through smart automation and telemetry.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Smart Home", icon: Home },
              { name: "Smart Agriculture", icon: Sprout },
              { name: "Healthcare", icon: HeartPulse },
              { name: "Smart City", icon: Building2 },
              { name: "Industrial IoT", icon: Factory },
              { name: "Environment", icon: Globe }
            ].map((app, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 backdrop-blur-xl text-center transition-all group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-transparent border border-[#00bfff]/20 group-hover:border-[#00bfff]/50 flex items-center justify-center text-[#00bfff] mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <app.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-xs">{app.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* --- 7. IoT + AI --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-3xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all duration-300 backdrop-blur-2xl shadow-2xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 rounded-full bg-transparent border border-purple-400/50 text-purple-400 text-xs font-mono font-bold">
              ARTIFICIAL INTELLIGENCE AT THE EDGE
            </span>
            <h2 className="text-3xl font-extrabold">
              <span className="text-white">IoT</span>{" "}
              <span className="text-[#00bfff]">+</span>{" "}
              <span className="text-blue-400">AI Integration</span>
            </h2>
            <p className="text-[#00bfff]/90 text-sm leading-relaxed font-medium">
              When Internet of Things combines with Artificial Intelligence (AIoT), devices stop merely reporting data and start reasoning, predicting failures, and making autonomous decisions in real time.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-[#00bfff] font-semibold">
              <span className="px-3 py-1.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50">IoT collects data</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50">Edge/Cloud processes it</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50">AI understands it</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50">Device takes action</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] transition-all text-center space-y-3 shadow-inner">
            <div className="inline-block p-3 rounded-2xl bg-transparent border border-purple-400/50 text-purple-400">
              <Cpu className="w-8 h-8 animate-pulse" />
            </div>
            <div className="text-xs font-mono text-white font-bold">Neural Network Inference Active</div>
            <div className="text-[11px] text-[#00bfff]/90 font-mono font-medium">Real-time object detection & telemetry classification</div>
          </div>
        </section>

        {/* --- 8. MINI PROJECT --- */}
        <section className="p-8 rounded-3xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all duration-300 backdrop-blur-2xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#00bfff] font-bold">FEATURED BEGINNER PROJECT</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                <span className="text-white">Smart</span>{" "}
                <span className="text-[#00bfff]">Irrigation</span>{" "}
                <span className="text-blue-400">System</span>
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50 text-[#00bfff]">
              <CheckCircle className="w-4 h-4" />
              <span>Fully Automated</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono font-bold">
            <div className="p-3 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50 text-[#00bfff]">Soil Sensor</div>
            <div className="p-3 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50 text-white">ESP32 Controller</div>
            <div className="p-3 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50 text-blue-400">Relay Module</div>
            <div className="p-3 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50 text-purple-400">Water Pump</div>
          </div>

          <p className="text-[#00bfff]/90 text-sm font-medium">
            “Automatically waters plants when soil moisture becomes low, sending real-time telemetry updates to your smartphone dashboard.”
          </p>
        </section>

        {/* --- 9. IoT LEARNING ROADMAP --- */}
        <section id="roadmap" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-white">IoT Learning</span>{" "}
              <span className="text-[#00bfff]">Master</span>{" "}
              <span className="text-blue-400">Roadmap</span>
            </h2>
            <p className="text-[#00bfff]/90 text-sm font-medium">Step-by-step path from zero to building full-stack IoT solutions.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {[
              "Electronics",
              "C / C++",
              "Arduino",
              "Sensors",
              "ESP32",
              "Networking",
              "Cloud",
              "AI + IoT",
              "Projects"
            ].map((step, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all text-center text-xs font-mono text-[#00bfff] font-bold shadow-md">
                <div className="text-[10px] text-[#00bfff] mb-1">0{idx + 1}</div>
                <div className="font-bold text-white">{step}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 10. DOWNLOAD IoT GUIDE --- */}
        <section id="guide" className="p-8 sm:p-12 rounded-3xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all duration-300 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff]/50 text-[#00bfff] text-xs font-mono font-bold">
                PREMIUM LEARNING RESOURCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                <span className="text-white">Complete</span>{" "}
                <span className="text-[#00bfff]">IoT</span>{" "}
                <span className="text-blue-400">Guide</span>
              </h2>
              <p className="text-[#00bfff]/90 text-sm max-w-2xl leading-relaxed font-medium">
                Includes: IoT Basics, Sensors & Actuators, ESP32, Raspberry Pi, Protocols, Cloud, Edge Computing, AI + IoT, and Hands-on Projects.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="/pdf/IoT-Complete-Guide.pdf"
                download="IoT-Complete-Guide.pdf"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00bfff] to-[#4f46e5] text-[#050816] font-bold text-center shadow-[0_0_25px_rgba(0,191,255,0.4)] hover:scale-105 transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
              <a
                href="/pdf/IoT-Complete-Guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 text-[#00bfff] font-bold text-center transition-all flex items-center justify-center space-x-2 text-sm shadow-[0_0_15px_rgba(0,191,255,0.2)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Read Online</span>
              </a>
            </div>
          </div>
        </section>

        {/* --- 11. FINAL CTA --- */}
        <section className="text-center space-y-6 py-12 px-6 rounded-3xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 transition-all duration-300 backdrop-blur-2xl shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-white">Build. Connect.</span>{" "}
            <span className="text-[#00bfff]">Smart</span>{" "}
            <span className="bg-gradient-to-r from-[#00bfff] to-[#4f46e5] bg-clip-text text-transparent">Innovate.</span>
          </h2>
          <p className="text-[#00bfff]/90 text-base max-w-xl mx-auto font-medium">
            Start your journey into the connected world.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a href="#roadmap" className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00bfff] to-[#4f46e5] text-[#050816] font-bold shadow-[0_0_30px_rgba(0,191,255,0.4)] hover:scale-105 transition-all">
              Explore IoT
            </a>
            <a href="#guide" className="px-7 py-3.5 rounded-xl bg-transparent border border-[#00bfff]/20 hover:border-[#00bfff] hover:bg-[#00bfff]/10 text-[#00bfff] font-bold transition-all shadow-[0_0_15px_rgba(0,191,255,0.2)]">
              Download Guide
            </a>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-[#00bfff]/40 bg-transparent py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#00bfff]/90 font-mono font-semibold">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-[#00bfff] flex items-center justify-center text-[#050816] font-bold">IoT</div>
            <span>Explore IoT Dashboard • Futuristic Tech Theme</span>
          </div>
          <div>© {new Date().getFullYear()} All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// --- MAIN PAGE EXPORT ---
export default function AboutPage() {
  const [currentView, setCurrentView] = useState("home");

  if (currentView === "Iot") {
    return <ExploreIoT onBack={() => setCurrentView("home")} />;
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-primary selection:text-black font-body overflow-x-hidden">
      <style>{`
        .circuit-bg {
          background-image: radial-gradient(rgba(0, 207, 255, 0.08) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(0, 207, 255, 0.08);
          border: 1px solid rgba(0, 207, 255, 0.25);
          color: #00CFFF;
          font-weight: 600;
        }
        .glow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #00CFFF;
          box-shadow: 0 0 8px #00CFFF;
        }
        .section-label {
          font-family: 'Orbitron', monospace, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #00CFFF;
          font-weight: 600;
        }
        .text-gradient {
          background: linear-gradient(135deg, #00CFFF 0%, #22e6b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-card {
          background: rgba(10, 10, 10, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 207, 255, 0.15);
        }
        .glow-line {
          height: 2px;
          background: linear-gradient(90deg, #00CFFF, transparent);
        }
        .gradient-mesh {
          position: absolute;
          width: 600px;
          height: 600px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(0, 207, 255, 0.1) 0%, transparent 70%);
          filter: blur(80px);
        }
      `}</style>

      <AboutSection onNavigate={setCurrentView} />
      <ClientsSection />
      <TeamSection />
      <OperationalFrameworkSection />
    </main>
  );
}