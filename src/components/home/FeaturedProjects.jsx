import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import kit1 from "../../assets/images/kit1.jpeg";
import kit2 from "../../assets/images/kit2.jpeg";
import kit3 from "../../assets/images/kit3.jpeg";
import kit4 from "../../assets/images/kit4.jpeg";

const PROJECTS = [
  {
    img: kit1,
    category: "Computer Vision",
    title: "Real-Time Defect Detection System",
    desc: "YOLO-based visual inspection deployed on Jetson Nano achieving 98.7% accuracy at 30FPS for industrial quality control.",
    tags: ["YOLO", "Jetson", "OpenCV"],
    year: "2024",
    status: "Live",
  },
  {
    img: kit2,
    category: "IoT & Edge",
    title: "Smart Campus Energy Monitor",
    desc: "Distributed IoT network with 240+ sensor nodes tracking energy consumption across MITS campus in real-time.",
    tags: ["ESP32", "MQTT", "Dashboard"],
    year: "2024",
    status: "Live",
  },
  {
    img: kit3,
    category: "Robotics",
    title: "Autonomous Warehouse Robot",
    desc: "ROS2-based AMR with SLAM navigation, obstacle avoidance, and cloud-managed task scheduling for logistics.",
    tags: ["ROS2", "SLAM", "Python"],
    year: "2023",
    status: "Research",
  },
  {
    img: kit4,
    category: "Industry 4.0",
    title: "Predictive Maintenance Platform",
    desc: "Vibration + thermal analysis using LSTM models to predict equipment failure 72 hours in advance.",
    tags: ["LSTM", "IIoT", "Grafana"],
    year: "2024",
    status: "Deployed",
  },
];

const STATUS_COLORS = {
  Live: "text-emerald-400 border-emerald-400/30 bg-emerald-400/[0.07]",
  Research: "text-cyan-primary border-cyan-primary/30 bg-cyan-primary/[0.07]",
  Deployed: "text-blue-accent border-blue-accent/30 bg-blue-accent/[0.07]",
};

export default function FeaturedProjects({ onNavigate }) {
  return (
    <section className="relative px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label block mb-3">Featured Work</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Projects That{" "}
              <span className="text-gradient">Matter</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => onNavigate("projects")}
            className="btn-glass text-sm whitespace-nowrap self-start sm:self-auto"
          >
            All Projects
            <ArrowUpRight size={14} />
          </motion.button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card group overflow-hidden cursor-pointer"
              style={{ borderRadius: "24px" }}
            >
              {/* Image */}
              <div className="relative h-52 sm:h-60 overflow-hidden rounded-t-3xl">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B11] via-transparent to-transparent" />
                {/* Status */}
                <span className={`absolute top-4 left-4 text-[10px] font-display tracking-widest uppercase px-3 py-1 rounded-full border ${STATUS_COLORS[proj.status]}`}>
                  {proj.status}
                </span>
                {/* Category */}
                <span className="absolute top-4 right-4 text-[10px] font-display tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 bg-black/40 text-white/70">
                  {proj.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-bright transition-colors duration-300 leading-snug">
                    {proj.title}
                  </h3>
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-muted group-hover:border-cyan-primary/50 group-hover:text-cyan-primary transition-all duration-300">
                    <ExternalLink size={13} />
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-5">{proj.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag-badge">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
