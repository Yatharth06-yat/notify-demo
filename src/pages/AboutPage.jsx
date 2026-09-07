import React, { useState } from "react";
import { motion } from "framer-motion";
import ExploreIoT from "./Aboutiot";
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
const teamGroupImage = "https://res.cloudinary.com/dwumernfk/image/upload/v1788771512/Screenshot_2026-09-07_at_2.28.20_PM_sjfitx.png";

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
    text: "To provide hands-on training in IoT, AI, Robotics, Embedded Systems and other emerging technologies in School premises.",
  },
  {
    icon: Lightbulb,
    text: "To promote experiential, project-based learning using in-house IoT kits developed by CIoT, MITS.",
  },
  {
    icon: GraduationCap,
    text: "To conduct capacity-building and Train-the-Teacher (ToT) programmes for school teachers.",
  },
  {
    icon: Wifi,
    text: "To support the establishment of IoT/STEM Innovation Clubs and technology-learning facilities.",
  },
  {
    icon: BrainCircuit,
    text: "To provide project mentoring and encourage technology-based solutions to real-life problems.",
  },
  {
    icon: Trophy,
    text: "To organize workshops, technology camps, innovation challenges and project exhibitions.",
  },
  {
    icon: Globe,
    text: "To provide technology outreach and selected free training programmes for Government Schools.",
  },
  {
    icon: Users,
    text: "To strengthen the academic outreach, innovation ecosystem and institutional visibility of MITS.",
  }
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
    role: "Faculty Coordinator / Asst. Prof.",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786084905/2681f153-4d9d-446e-8f19-9ca53806d352.png",
  },
  {
    name: "Dr. Priyanka Garg",
    role: "Faculty Coordinator / Asst. Prof.",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786084923/20fc50ad-939a-4088-a2b5-b84004018612.png",
  },
  {
    name: "Dr. Dhananjay Bisen",
    role: "Faculty Member / Resource Person",
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786205891/d932cab9-5fbe-4907-99b4-42819cef8880.png",
  },
];

const FACULTY_MEMBERS = [

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
          background: "linear-gradient(to right, #FAECE1 0%, rgba(250,236,225,0.6) 60%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #FAECE1 0%, rgba(250,236,225,0.6) 60%, transparent 100%)",
        }}
      />

      <div className="relative w-full" style={{ perspective: "1400px" }}>
        <div style={{ transform: "rotateX(2deg) rotateY(-1.5deg)" }}>
          <div
            className={`flex items-stretch gap-5 sm:gap-6 w-max about-gallery-track ${isHovered ? "about-gallery-paused" : ""
              }`}
          >
            {galleryItems.map((item, idx) => (
              <div
                key={`${item.id ?? idx}-${idx}`}
                className="bg-white border-gray-200 shadow-sm group relative w-[260px] sm:w-[380px] md:w-[440px] h-[200px] sm:h-[270px] md:h-[310px] rounded-2xl overflow-hidden flex-shrink-0 p-0 border-gray-200 transition-all duration-500 hover:border-accent hover:-translate-y-2"
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
                  <h4 className="font-display text-gray-900 text-sm sm:text-lg md:text-xl font-bold tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-gray-600 text-[11px] sm:text-xs font-body mt-1 line-clamp-2">
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
function TeamCard({ name, role, image, index = 0, isLeader = false, imageClassName = "" }) {
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
      whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(0,0,0,0.10)", transition: { duration: 0.3 } }}
      className="bg-[#FDF6EE] rounded-2xl flex flex-col items-center text-center px-6 pt-8 pb-7 h-full"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
    >
      {/* Circular image with teal ring + white gap */}
      <div className="mb-5 rounded-full p-[3px] bg-gradient-to-br from-teal-400/60 to-teal-300/30"
        style={{ background: "none", outline: "2px solid #5bbfb5", outlineOffset: "4px" }}>
        <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
          <motion.img
            src={image}
            alt={name}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`w-full h-full object-cover object-top ${imageClassName}`}
            loading="lazy"
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="font-display font-bold text-base sm:text-lg text-gray-900 leading-snug mb-1">
        {name}
      </h3>

      {/* Role */}
      <p className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full" style={{ color: "#3aafa9" }}>
        {role}
      </p>
    </motion.div>
  );
}


// --- SECTION 1: ABOUT SECTION ---
function AboutSection({ onNavigate = () => { } }) {
  return (
    <section className="relative px-6 pt-10 pb-14 sm:pt-16 sm:pb-20 overflow-hidden bg-[#FFF2E5]">
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] pointer-events-none" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(15,118,110,0.08) 0%, rgba(15,118,110,0.02) 40%, transparent 70%)",
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

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[42px] text-gray-900 leading-[1.15] tracking-tight mb-7">
              A{" "}
              <span className="text-gradient">journey</span>{" "}
              of passion,{" "}
              <span className="text-gradient">purpose</span>
              {" "}and{" "}
              <span className="text-gradient">innovation</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-body text-justify mb-8 text-justify">
              The Centre for Internet of Things (CIoT), MITS–Deemed University, Gwalior, proposes to
              establish{" "}
              <span className="text-accent font-semibold">"IoTify Lab"</span>{" "}
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
                className="px-6 py-3 rounded-xl bg-accent text-black font-semibold flex items-center gap-2 shadow-md text-sm transition-all bg-accent"
              >
                Explore IoT
                <ArrowRight size={15} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("iotkit")}
                className="px-6 py-3 rounded-xl bg-white border-gray-200 shadow-sm text-gray-900 font-semibold border border-gray-200 hover:border-accent text-sm transition-all"
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
            <div
              className="relative group rounded-3xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(17,24,39,0.10)",
                boxShadow: "0 8px 24px rgba(17,24,39,0.08)",
                padding: "12px",
              }}
            >
              {/* Image — object-contain ensures the full screenshot is always visible */}
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{
                  background: "#F5F5F5",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={teamGroupImage}
                  alt="CIoT MITS Outreach Initiative — School Connect Programme"
                  className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{
                    objectFit: "contain",
                    maxHeight: "480px",
                    display: "block",
                  }}
                />
              </div>

              {/* Caption badge */}
              <div
                className="mt-3 px-4 py-2.5 rounded-xl flex items-center gap-2.5"
                style={{
                  background: "rgba(255,242,229,0.90)",
                  border: "1px solid rgba(17,24,39,0.08)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
                <p className="text-gray-900 text-xs sm:text-sm font-semibold tracking-wide">
                  CIoT MITS — School Connect Programme Outreach
                </p>
              </div>
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
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-tight">
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
                className="bg-white border-gray-200 shadow-sm group flex items-start gap-4 p-5 sm:p-6 rounded-2xl border-gray-200 hover:border-accent transition-all duration-300 hover:-translate-y-1 relative"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-primary/12 to-blue-accent/8 border border-gray-200 text-accent group-hover:shadow-md group-hover:scale-110 transition-all duration-400">
                  <Icon size={20} strokeWidth={1.6} />
                </div>

                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs font-semibold tracking-widest mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-body group-hover:text-gray-900/80 transition-colors duration-300">
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
    <section className="relative px-6 py-10 sm:py-16 overflow-hidden bg-[#FAECE1]">
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] pointer-events-none" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(15,118,110,0.06) 0%, rgba(15,118,110,0.02) 50%, transparent 70%)",
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
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-900 mb-6">
            Engineered for <span className="text-accent">innovation</span> and research.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-body">
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
    <section className="relative px-6 pt-6 pb-14 sm:pt-8 sm:pb-20 overflow-hidden bg-[#FFF2E5]">
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
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-900 mb-5">
            Team <span className="text-gradient">Behind The Lab</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
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
              // Ensure rounded image styles via custom props if applicable, or wrap the image container with rounded-full
              imageClassName="rounded-full object-cover aspect-square"
            />
          </div>

          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-0.5 h-12 bg-gradient-to-b from-cyan-primary to-cyan-primary/40 relative origin-top"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent animate-pulse" />
          </motion.div>

          <div className="w-full mt-4 mb-2 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <span className="section-label px-4 py-1.5 rounded-full bg-accent/10 border border-gray-200 text-accent shadow-md">
                Faculty Coordinator(s)
              </span>
            </motion.div>
            <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
              {FACULTY_COORDINATORS.map((member, idx) => (
                <TeamCard
                  key={member.name}
                  index={idx + 1}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  imageClassName="rounded-full object-cover aspect-square"
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
              <span className="section-label px-4 py-1.5 rounded-full bg-accent/10 border border-gray-200 text-accent shadow-md">
                Faculty Members / Resource Persons
              </span>
            </motion.div>
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto justify-items-center">
              {FACULTY_MEMBERS.map((member, idx) => (
                <TeamCard
                  key={member.name}
                  index={idx + 1}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  imageClassName="rounded-full object-cover aspect-square"
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
// --- SECTION 3b: NEED & POLICY ALIGNMENT ---
const POLICY_TAGS = [
  "NEP 2020",
  "STEM Education",
  "Atal Tinkering Labs (ATL)",
  "PM SHRI Schools",
  "CBSE Curriculum",
  "IoT & AI",
  "Robotics",
  "Embedded Systems",
  "Hackathons",
  "Digital Skills",
];

const SKILL_PILLS = [
  { label: "Creativity" },
  { label: "Critical Thinking" },
  { label: "Problem-Solving" },
  { label: "Collaboration" },
  { label: "Communication" },
  { label: "Innovation" },
  { label: "Digital Skills" },
];

function NeedPolicySection() {
  return (
    <section className="relative px-6 py-14 sm:py-20 overflow-hidden bg-[#FFF2E5]">
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] pointer-events-none" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(15,118,110,0.07) 0%, rgba(15,118,110,0.02) 50%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12"
        >
          <span className="eyebrow-badge mb-4 text-xs sm:text-sm tracking-[0.25em] font-mono">
            <span className="glow-dot" />
            — VISION & ALIGNMENT
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-900 mb-5">
            Need &amp; <span className="text-accent">Policy Alignment</span>
          </h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase font-mono">
            Rooted in national education policy &amp; 21st-century skill frameworks
          </p>
        </motion.div>

        {/* Policy tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {POLICY_TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-accent/10 text-accent border border-accent/20 tracking-wide"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Body card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-body">
            IoTify Lab is designed to complement the vision of{" "}
            <span className="font-semibold text-gray-900">NEP 2020</span>,{" "}
            <span className="font-semibold text-gray-900">STEM education</span>,{" "}
            <span className="font-semibold text-gray-900">Atal Tinkering Labs (ATL)</span>,{" "}
            <span className="font-semibold text-gray-900">PM SHRI Schools</span> and the contemporary{" "}
            <span className="font-semibold text-gray-900">CBSE curriculum</span> by promoting experiential,
            hands-on and project-based learning. The programme provides students and teachers with practical
            exposure to IoT, Artificial Intelligence, Robotics, Coding, Electronics, Embedded Systems and
            other emerging technologies.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-body">
            Through workshops, projects and hackathons, participants develop:
          </p>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-2.5">
            {SKILL_PILLS.map((s, i) => (
              <motion.span
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FFF2E5] text-accent border border-accent/20 tracking-wide"
              >
                {s.label}
              </motion.span>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-body">
            …while connecting classroom concepts with real-world applications and societal challenges.
            The initiative also supports schools in strengthening their{" "}
            <span className="font-semibold text-gray-900">STEM</span>,{" "}
            <span className="font-semibold text-gray-900">innovation</span> and{" "}
            <span className="font-semibold text-gray-900">technology-learning ecosystem</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// --- SECTION 4: OPERATIONAL FRAMEWORK SECTION ---
function OperationalFrameworkSection() {
  return (
    <section className="relative px-6 py-12 sm:py-20 overflow-hidden bg-[#FAECE1]">
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] pointer-events-none" />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12"
        >
          <span className="section-label mb-4">— PROCESS & WORKFLOW</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-900 mb-5">
            Proposed <span className="text-gradient">Operational Framework</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Step-by-step workflow governing school outreach, training execution, and post-training support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white border-gray-200 shadow-sm rounded-2xl overflow-hidden border-gray-200 shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-accent/10">
                  <th className="py-4 px-6 font-display font-bold text-accent text-xs sm:text-sm tracking-wider uppercase w-20 text-center">
                    Stage
                  </th>
                  <th className="py-4 px-6 font-display font-bold text-accent text-xs sm:text-sm tracking-wider uppercase">
                    Operational Activity
                  </th>
                  <th className="py-4 px-6 font-display font-bold text-accent text-xs sm:text-sm tracking-wider uppercase">
                    Major Action / Outcome
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-primary/10 font-body text-sm sm:text-base">
                {OPERATIONAL_FRAMEWORK.map((item) => (
                  <tr key={item.stage} className="hover:bg-accent/5 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-accent text-center">
                      {item.stage}
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-medium">
                      {item.activity}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
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

// --- MAIN PAGE EXPORT ---
export default function AboutPage() {
  const [currentView, setCurrentView] = useState("home");

  if (currentView === "Iot") {
    return <ExploreIoT onBack={() => setCurrentView("home")} />;
  }

  return (
    <main className="min-h-screen bg-cream-primary text-gray-900 font-body overflow-x-hidden">
      <style>{`
        .bg-grid-lines opacity-[0.4] {
          background-image: radial-gradient(rgba(15, 118, 110, 0.08) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(15, 118, 110, 0.08);
          border: 1px solid rgba(15, 118, 110, 0.25);
          color: #0f766e;
          font-weight: 600;
        }
        .glow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #0f766e;
          box-shadow: 0 0 8px #0f766e;
        }
        .section-label {
          font-family: 'Orbitron', monospace, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0f766e;
          font-weight: 600;
        }
        .text-gradient {
          background: linear-gradient(135deg, #0f766e 0%, #22e6b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bg-white border-gray-200 shadow-sm {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(15, 118, 110, 0.15);
        }
        .glow-line {
          height: 2px;
          background: linear-gradient(90deg, #0f766e, transparent);
        }
        .gradient-mesh {
          position: absolute;
          width: 600px;
          height: 600px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(15, 118, 110, 0.1) 0%, transparent 70%);
          filter: blur(80px);
        }
      `}</style>

      <AboutSection onNavigate={setCurrentView} />
      <TeamSection />
      <NeedPolicySection />
      <ClientsSection />

    </main>
  );
}