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
    title: "Reva University, Bangalore – IoT Workshop",
    subtitle: "3-day hands-on boot camp on IoT sensor integration, edge computing, and real-time cloud data pipelines.",
    category: "Institutional Partner",
    image: kit5,
  },
  {
    id: 2,
    title: "MITS Industrial IoT Lab Deployment",
    subtitle: "Advanced hardware lab setup with NVIDIA Jetson edge AI modules and ROS2 robotic platforms.",
    category: "Academic Excellence",
    image: kit6,
  },
  {
    id: 3,
    title: "Smart Agriculture Sensors Workshop",
    subtitle: "Empowering 200+ researchers with LoRaWAN wireless sensor networks and AI yield prediction.",
    category: "Industry Workshop",
    image: kit7,
  },
  {
    id: 4,
    title: "Embedded Edge AI Systems Masterclass",
    subtitle: "Deep dive into microcontroller firmware, MicroPython, and TensorRT model deployment on edge devices.",
    category: "Skill Bootcamp",
    image: kit8,
  },
  {
    id: 5,
    title: "Robotics & Industrial IoE Hackathon",
    subtitle: "48-hour competitive innovation sprint engineering autonomous micro-robots and telemetry dashboards.",
    category: "National Hackathon",
    image: kit9,
  },
  {
    id: 6,
    title: "Smart Campus IoT Infrastructure",
    subtitle: "Deploying sensor mesh networks and dashboard monitoring systems across a 50-acre university campus.",
    category: "Infrastructure Project",
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
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786084949/bc2b0ae0-187a-4e8c-96be-44130ca0c5bd.png",
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

// --- COMPONENT: CAROUSEL ---
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
      {/* Image Container with White Background */}
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
function AboutSection() {
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

            <p className="text-muted text-base sm:text-lg leading-relaxed font-body">
              The Centre for Internet of Things (CIoT), MITS–Deemed University, Gwalior, proposes to
              establish{" "}
              <span className="text-cyan-bright font-semibold">"IoTify Lab"</span>{" "}
              as an institutional outreach and hands-on technology learning initiative for school
              students and teachers. The initiative will promote experiential and project-based
              learning in IoT, Artificial Intelligence, Robotics, Embedded Systems and other
              emerging technologies. IoTify Lab shall conduct training programmes, workshops and
              project mentoring using the in-house IoT learning and training kits developed by CIoT.
            </p>
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
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <span className="section-label mb-4">— OUR HAPPY CLIENTS</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-6">
            Trusted by{" "}
            <span className="text-gradient">institutions</span> and partners.
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Arc Labs partnered with{" "}
            <span className="text-cyan-bright font-medium">
              Reva University, Bangalore – IoT Workshop
            </span>{" "}
            and top technical institutes to deliver immersive hands-on training and cutting-edge research acceleration across India.
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
             Team <span className="text-gradient"> Behind The Lab</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
          </p>
        </motion.div>

        {/* TREE STRUCTURE CONTAINER */}
        <div className="flex flex-col items-center relative">
          
          {/* ROOT: Head & Dean */}
          <div className="w-full max-w-sm z-10 mb-2">
            <TeamCard
              name={LEADERSHIP.name}
              role={LEADERSHIP.role}
              image={LEADERSHIP.image}
              isLeader={true}
              index={0}
            />
          </div>

          {/* Animated Connector Line down */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-0.5 h-12 bg-gradient-to-b from-cyan-primary to-cyan-primary/40 relative origin-top"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-primary animate-pulse" />
          </motion.div>

          {/* LEVEL 1: Faculty Coordinators */}
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

          {/* Animated Connector Line down */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-0.5 h-12 bg-gradient-to-b from-cyan-primary/40 to-cyan-primary/40 my-2 origin-top"
          />

          {/* LEVEL 2: Faculty Members / Resource Persons */}
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

          {/* Animated Connector Line down */}
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

// --- MAIN PAGE EXPORT ---
export default function AboutPage() {
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

      <AboutSection />
      <ClientsSection />
      <TeamSection />
      <OperationalFrameworkSection />
    </main>
  );
}