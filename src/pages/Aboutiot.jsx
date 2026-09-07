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
    <div className="min-h-screen relative font-sans" style={{ background: "#FFF2E5", color: "#111827" }}>
      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(circle,rgba(15,118,110,0.09) 1px,transparent 1px)", backgroundSize: "28px 28px", opacity: 0.5 }}
        aria-hidden="true"
      />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-12 pt-28">

        {/* --- 1. HERO SECTION --- */}
        <section className="text-center space-y-8 pt-8">
          

          <h1 className="text-4xl sm:text-4xl font-extrabold tracking-tight mt-24">
            <span className="text-gray-900">Explore</span>{" "}
            <span className="text-accent">Internet</span>{" "}
            <span className="text-gray-900">of Things</span>
          </h1>

          <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto font-medium">
            Discover how smart devices sense, connect, communicate and automate the world around us.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#roadmap" className="px-7 py-3.5 rounded-xl text-white font-bold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" style={{background:"#0F766E",border:"1px solid #0D6860",boxShadow:"0 2px 8px rgba(15,118,110,0.22)"}}>
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#guide" className="px-7 py-3.5 rounded-xl bg-white border border-accent/25 text-accent font-semibold transition-all hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Download IoT Guide
            </a>
          </div>

          {/* IoT Network Flow */}
          <div className="pt-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-200 max-w-4xl mx-auto" style={{boxShadow:"0 2px 8px rgba(17,24,39,0.05)"}}>
              <div className="text-xs font-semibold text-accent mb-4 tracking-wider uppercase">IoT Data Pipeline Flow</div>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold">
                {["Sensor", "ESP32", "Internet", "Cloud", "Action"].map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="px-4 py-2.5 rounded-xl bg-accent/8 border border-accent/20 text-accent transition-all hover:bg-accent/15">
                      {step}
                    </div>
                    {idx < arr.length - 1 && (
                      <span className="text-gray-400 font-bold" aria-hidden="true">→</span>
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
              <span className="text-gray-900">What is</span>{" "}
              <span className="text-accent">Internet</span>{" "}
              <span className="text-gray-900">of Things?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base font-medium">
              <span className="text-accent font-bold">Internet of Things (IoT)</span> connects physical devices with sensors, software and networks so they can collect, exchange and act on data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Sense", desc: "Collect environmental and physical data via specialized hardware sensors.", icon: Eye, color: "text-accent" },
              { title: "Connect", desc: "Send acquired telemetry securely over Wi-Fi, BLE, or cellular networks.", icon: Wifi, color: "text-gray-700" },
              { title: "Process", desc: "Analyze raw data streams on edge microcontrollers or cloud platforms.", icon: Cpu, color: "text-gray-700" },
              { title: "Act", desc: "Perform physical actions through actuators, motors, and automated relays.", icon: Zap, color: "text-accent" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-200 transition-all group hover:-translate-y-1 hover:border-accent/40" style={{boxShadow:"0 2px 8px rgba(17,24,39,0.05)"}}>
                <div className={`w-12 h-12 rounded-xl bg-accent/8 border border-accent/20 flex items-center justify-center mb-4 ${item.color} transition-transform group-hover:scale-110`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 3. IoT COMPONENTS --- */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-gray-900">Core</span>{" "}
              <span className="text-accent">IoT</span>{" "}
              <span className="text-gray-900">Components</span>
            </h2>
            <p className="text-gray-600 text-sm font-medium">Essential building blocks of any connected hardware system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: "Sensors", desc: "Temperature, humidity, motion, distance, light, gas.", icon: Eye },
              { title: "Actuators", desc: "Motor, relay, pump, solenoid valve, LED, buzzer.", icon: Zap },
              { title: "Controllers", desc: "Arduino, ESP32, ESP8266, Raspberry Pi Pico.", icon: Cpu },
              { title: "Connectivity", desc: "Wi-Fi, Bluetooth, LoRa, Zigbee, MQTT, HTTP.", icon: Wifi },
              { title: "Cloud", desc: "Storage, real-time analytics, databases and dashboards.", icon: Cloud }
            ].map((comp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between transition-all hover:border-accent/40" style={{boxShadow:"0 1px 4px rgba(17,24,39,0.04)"}}>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/20 flex items-center justify-center text-accent mb-3">
                    <comp.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{comp.title}</h3>
                </div>
                <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. HOW IoT WORKS --- */}
        <section className="p-8 rounded-3xl bg-white border border-gray-200 transition-all space-y-8" style={{boxShadow:"0 2px 8px rgba(17,24,39,0.05)"}}>
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">
              <span className="text-gray-900">How</span>{" "}
              <span className="text-accent">IoT</span>{" "}
              <span className="text-gray-900">Works</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">End-to-end telemetry lifecycle from physical world to automated action.</p>
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
              <div key={idx} className="p-4 rounded-2xl bg-[#FFFAF5] border border-gray-200 text-center transition-all hover:border-accent/35">
                <div className="text-[10px] font-semibold text-accent mb-1">{flow.step}</div>
                <div className="font-bold text-gray-900 text-sm mb-1">{flow.label}</div>
                <div className="text-[10px] text-gray-500">{flow.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. POPULAR IoT BOARDS --- */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-gray-900">Popular</span>{" "}
              <span className="text-accent">IoT</span>{" "}
              <span className="text-gray-900">Boards</span>
            </h2>
            <p className="text-gray-600 text-sm font-medium">Microcontrollers and microcomputers powering modern connected prototypes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Arduino UNO", tag: "Beginners", desc: "Classic microcontroller board ideal for learning basic electronics, sensors and actuators." },
              { name: "ESP32", tag: "Connected IoT", desc: "Dual-core chip with built-in Wi-Fi and Bluetooth, perfect for wireless IoT applications." },
              { name: "Raspberry Pi", tag: "Advanced IoT", desc: "Full Linux mini-computer capable of running heavy servers, databases and Python scripts." },
              { name: "Jetson Nano", tag: "Edge AI", desc: "AI powerhouse board designed to run computer vision and neural networks right at the edge." }
            ].map((board, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-200 transition-all group hover:border-accent/40 flex flex-col justify-between" style={{boxShadow:"0 1px 4px rgba(17,24,39,0.04)"}}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Cpu className="w-6 h-6 text-accent" />
                    <span className="px-2.5 py-1 rounded-full bg-accent/8 text-accent text-[10px] font-semibold border border-accent/20">{board.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{board.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{board.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 6. APPLICATIONS --- */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-gray-900">Key IoT</span>{" "}
              <span className="text-accent">Smart</span>{" "}
              <span className="text-gray-900">Applications</span>
            </h2>
            <p className="text-gray-600 text-sm font-medium">Transforming industries through smart automation and telemetry.</p>
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
              <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-200 text-center transition-all group hover:border-accent/40" style={{boxShadow:"0 1px 4px rgba(17,24,39,0.04)"}}>
                <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-3 transition-all group-hover:scale-110">
                  <app.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-xs">{app.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* --- 7. IoT + AI --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-3xl bg-white border border-gray-200 transition-all" style={{boxShadow:"0 2px 8px rgba(17,24,39,0.05)"}}>
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-semibold">
              ARTIFICIAL INTELLIGENCE AT THE EDGE
            </span>
            <h2 className="text-3xl font-extrabold">
              <span className="text-gray-900">IoT</span>{" "}
              <span className="text-accent">+</span>{" "}
              <span className="text-gray-900">AI Integration</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              When Internet of Things combines with Artificial Intelligence (AIoT), devices stop merely reporting data and start reasoning, predicting failures, and making autonomous decisions in real time.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-accent">
              <span className="px-3 py-1.5 rounded-xl bg-accent/8 border border-accent/20">IoT collects data</span>
              <span className="self-center text-gray-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-accent/8 border border-accent/20">Edge/Cloud processes it</span>
              <span className="self-center text-gray-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-accent/8 border border-accent/20">AI understands it</span>
              <span className="self-center text-gray-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-accent/8 border border-accent/20">Device takes action</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FFFAF5] border border-gray-200 text-center space-y-3">
            <div className="inline-block p-3 rounded-2xl bg-accent/8 border border-accent/20 text-accent">
              <Cpu className="w-8 h-8" />
            </div>
            <div className="text-xs font-mono text-gray-900 font-bold">Neural Network Inference Active</div>
            <div className="text-[11px] text-gray-600 font-mono font-medium">Real-time object detection & telemetry classification</div>
          </div>
        </section>

        {/* --- 8. MINI PROJECT --- */}
        <section className="p-8 rounded-3xl bg-white border border-gray-200 space-y-6" style={{boxShadow:"0 2px 8px rgba(17,24,39,0.05)"}}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Featured Beginner Project</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                <span className="text-gray-900">Smart</span>{" "}
                <span className="text-accent">Irrigation</span>{" "}
                <span className="text-gray-900">System</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-accent/8 border border-accent/20 text-accent">
              <CheckCircle className="w-4 h-4" />
              <span>Fully Automated</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-semibold">
            <div className="p-3 rounded-xl bg-accent/8 border border-accent/20 text-accent">Soil Sensor</div>
            <div className="p-3 rounded-xl bg-[#FFFAF5] border border-gray-200 text-gray-800">ESP32 Controller</div>
            <div className="p-3 rounded-xl bg-[#FFFAF5] border border-gray-200 text-gray-800">Relay Module</div>
            <div className="p-3 rounded-xl bg-[#FFFAF5] border border-gray-200 text-gray-800">Water Pump</div>
          </div>

          <p className="text-gray-600 text-sm font-medium">
            “Automatically waters plants when soil moisture becomes low, sending real-time telemetry updates to your smartphone dashboard.”
          </p>
        </section>

        {/* --- 9. IoT LEARNING ROADMAP --- */}
        <section id="roadmap" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-gray-900">IoT Learning</span>{" "}
              <span className="text-accent">Master</span>{" "}
              <span className="text-gray-900">Roadmap</span>
            </h2>
            <p className="text-gray-600 text-sm font-medium">Step-by-step path from zero to building full-stack IoT solutions.</p>
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
              <div key={idx} className="p-3 rounded-xl bg-white border border-gray-200 transition-all text-center hover:border-accent/40" style={{boxShadow:"0 1px 4px rgba(17,24,39,0.04)"}}>
                <div className="text-[10px] font-semibold text-accent mb-1">0{idx + 1}</div>
                <div className="font-bold text-gray-900 text-xs">{step}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 10. DOWNLOAD IoT GUIDE --- */}
        <section id="guide" className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-200 relative overflow-hidden" style={{boxShadow:"0 2px 8px rgba(17,24,39,0.05)"}}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-semibold">
                LEARNING RESOURCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                <span className="text-gray-900">Complete</span>{" "}
                <span className="text-accent">IoT</span>{" "}
                <span className="text-gray-900">Guide</span>
              </h2>
              <p className="text-gray-600 text-sm max-w-2xl leading-relaxed font-medium">
                Includes: IoT Basics, Sensors & Actuators, ESP32, Raspberry Pi, Protocols, Cloud, Edge Computing, AI + IoT, and Hands-on Projects.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="/pdf/IoT-Complete-Guide.pdf"
                download="IoT-Complete-Guide.pdf"
                className="px-6 py-3.5 rounded-xl text-white font-bold text-center transition-all flex items-center justify-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{background:"#0F766E",border:"1px solid #0D6860",boxShadow:"0 2px 8px rgba(15,118,110,0.22)"}}
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
              <a
                href="/pdf/IoT-Complete-Guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white border border-accent/25 text-accent font-bold text-center transition-all flex items-center justify-center gap-2 text-sm hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Read Online</span>
              </a>
            </div>
          </div>
        </section>

        {/* --- 11. FINAL CTA --- */}
        <section className="text-center space-y-6 py-12 px-6 rounded-3xl bg-white border border-gray-200" style={{boxShadow:"0 2px 8px rgba(17,24,39,0.05)"}}>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Build. Connect. <span className="text-accent">Innovate.</span>
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Start your hands-on IoT journey with CIoT, MITS Gwalior.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#roadmap"
              className="px-7 py-3.5 rounded-xl text-white font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{background:"#0F766E",border:"1px solid #0D6860",boxShadow:"0 2px 8px rgba(15,118,110,0.20)"}}
            >
              Explore Roadmap
            </a>
            <a
              href="#guide"
              className="px-7 py-3.5 rounded-xl bg-white border border-accent/25 text-accent font-bold transition-all hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Download Guide
            </a>
          </div>
        </section>

      </main>

      {/* PAGE FOOTER */}
      <footer className="border-t border-gray-200 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-[10px] font-bold">IoT</span>
            <span>Centre for Internet of Things — MITS Gwalior</span>
          </div>
          <div>© {new Date().getFullYear()} CIoT, MITS. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}