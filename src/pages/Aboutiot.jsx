import React from "react";
import {
  Cpu,
  Wifi,
  Cloud,
  Shield,
  Zap,
  Server,
  Database,
  Terminal,
  Layers,
  BookOpen,
  Download,
  ExternalLink,
  ArrowRight,
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
  Globe
} from "lucide-react";

export default function ExploreIoT() {
  return (
    <div className="bg-transparent text-[#00bfff] min-h-screen relative font-sans selection:bg-[#00bfff] selection:text-[#050816]">
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-12">

        {/* --- 1. HERO SECTION --- */}
        <section className="text-center space-y-8 pt-8">
          

          <h1 className="text-4xl sm:text-4xl font-extrabold tracking-tight mt-24">
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