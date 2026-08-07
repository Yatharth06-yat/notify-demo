import { motion } from "framer-motion";
import {
  BrainCircuit, Cpu, Eye, Factory, Bot, Wifi,
  ArrowUpRight,
} from "lucide-react";

const DOMAINS = [
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    desc: "Deep learning pipelines, NLP models, generative AI, and inference optimization for real-world deployment.",
    tags: ["Deep Learning", "LLMs", "TensorFlow"],
    color: "from-cyan-primary/10 to-blue-accent/5",
    border: "border-cyan-primary/20",
  },
  {
    icon: Wifi,
    title: "IoT & Embedded Systems",
    desc: "End-to-end IoT architectures from sensor nodes to cloud dashboards with RTOS, MQTT, and edge processing.",
    tags: ["MQTT", "ESP32", "RTOS"],
    color: "from-blue-accent/10 to-cyan-primary/5",
    border: "border-blue-accent/20",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Real-time object detection, image segmentation, and visual inspection systems using YOLO and OpenCV.",
    tags: ["YOLO", "OpenCV", "Segmentation"],
    color: "from-cyan-primary/10 to-cyan-bright/5",
    border: "border-cyan-bright/20",
  },
  {
    icon: Bot,
    title: "Robotics & Automation",
    desc: "Autonomous mobile robots, robotic arms, path planning, and ROS-based control systems.",
    tags: ["ROS2", "SLAM", "Path Planning"],
    color: "from-blue-accent/10 to-blue-accent/5",
    border: "border-blue-accent/20",
  },
  {
    icon: Cpu,
    title: "Edge Intelligence",
    desc: "Model compression, TensorRT optimization, and deploying AI at the edge with NVIDIA Jetson & Raspberry Pi.",
    tags: ["TensorRT", "Jetson", "ONNX"],
    color: "from-cyan-primary/8 to-transparent",
    border: "border-cyan-primary/15",
  },
  {
    icon: Factory,
    title: "Industry 4.0",
    desc: "Smart manufacturing, predictive maintenance, digital twins, and industrial automation solutions.",
    tags: ["Digital Twin", "OPC-UA", "SCADA"],
    color: "from-blue-accent/8 to-transparent",
    border: "border-blue-accent/15",
  },
];

export default function Solutions({ onNavigate }) {
  return (
    <section id="solutions" className="relative px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
        >
          <span className="section-label mb-4">Research Domains</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-6">
            Where We Push the{" "}
            <span className="text-gradient">Boundaries</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Six interconnected research domains where our team designs, builds, and deploys 
            technology that bridges academia and industry.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DOMAINS.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`glass-card spotlight-card shimmer-card p-8 cursor-default group ${domain.border}`}
              >
                {/* BG gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 inline-flex">
                    <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-primary/12 to-blue-accent/8 border border-cyan-primary/20 text-cyan-primary transition-all duration-500 group-hover:shadow-glow group-hover:scale-110">
                      <Icon size={24} strokeWidth={1.6} />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-cyan-bright transition-colors duration-300">
                    {domain.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed mb-5">
                    {domain.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {domain.tags.map((tag) => (
                      <span key={tag} className="tag-badge">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow link */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute -top-px -right-px w-20 h-20 rounded-tr-3xl bg-gradient-to-bl from-cyan-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => onNavigate("research")}
            className="btn-outline-cyan"
          >
            Explore All Research Areas
            <ArrowUpRight size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
