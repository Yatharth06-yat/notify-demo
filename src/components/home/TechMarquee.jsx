import { motion } from "framer-motion";
import {
  Cpu, Wifi, Bot, Eye, BrainCircuit, Factory,
  Layers, Radio, Zap, Database, Server, GitBranch,
} from "lucide-react";

const TECHS_1 = [
  { icon: BrainCircuit, label: "TensorFlow" },
  { icon: Eye, label: "OpenCV" },
  { icon: Cpu, label: "NVIDIA Jetson" },
  { icon: Bot, label: "ROS2" },
  { icon: Wifi, label: "MQTT" },
  { icon: Factory, label: "Industry 4.0" },
  { icon: Layers, label: "PyTorch" },
  { icon: Radio, label: "LoRaWAN" },
  { icon: Zap, label: "ESP32" },
  { icon: Database, label: "InfluxDB" },
  { icon: Server, label: "Edge AI" },
  { icon: GitBranch, label: "ROS Noetic" },
];

const TECHS_2 = [
  { icon: Eye, label: "YOLO v8" },
  { icon: Cpu, label: "Raspberry Pi" },
  { icon: BrainCircuit, label: "ONNX Runtime" },
  { icon: Wifi, label: "Zigbee" },
  { icon: Bot, label: "Arduino" },
  { icon: Factory, label: "OPC-UA" },
  { icon: Layers, label: "TensorRT" },
  { icon: Radio, label: "Modbus" },
  { icon: Database, label: "TimescaleDB" },
  { icon: Server, label: "Kubernetes" },
  { icon: Zap, label: "STM32" },
  { icon: GitBranch, label: "SLAM" },
];

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-container overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 35s linear infinite`,
        }}
      >
        {doubled.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-sm text-muted font-display whitespace-nowrap hover:border-cyan-primary/30 hover:text-cyan-bright transition-colors duration-300 cursor-default"
            >
              <Icon size={15} className="text-cyan-primary flex-shrink-0" strokeWidth={1.8} />
              {tech.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient fades on sides */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #05070B, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #05070B, transparent)" }} />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-4"
      >
        {/* Label */}
        <div className="text-center mb-8">
          <span className="section-label">Technologies We Master</span>
        </div>

        <MarqueeRow items={TECHS_1} />
        <MarqueeRow items={TECHS_2} reverse />
      </motion.div>
    </section>
  );
}
