import React, { useState } from "react";
import {
  Activity,
  Cpu,
  Zap,
  BarChart3,
  ShieldCheck,
  Radio,
  Sparkles,
  ChevronDown,
  Eye,
  Settings,
  MessageSquare,
  ArrowRight,
  Server,
  Workflow
} from "lucide-react";
import { WHATSAPP_BOOKINGS, whatsappLink } from "../lib/contact";

export default function IndustrialIoTLandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="w-full text-slate-100 font-sans relative selection:bg-cyan-500 selection:text-black">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-24">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Enterprise System Division
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Industrial IoT, AI & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Smart Automation Solutions
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Transforming manufacturing processes and factory workflows with real-time hardware telemetry, edge AI processing, industrial diagnostics, and enterprise integration.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all">
                <span>Schedule Consultation</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button className="px-6 py-3.5 rounded-xl border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-all">
                Explore Solutions
              </button>
            </div>

            {/* Protocol Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> MODBUS TCP/RTU</span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> OPC-UA</span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> MQTT / LORAWAN</span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> AWS IOT CORE</span>
            </div>
          </div>

          {/* Right Column: Live Edge Telemetry Interactive Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-cyan-500/25 p-6 backdrop-blur-2xl">
              {/* Header Status */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Live Edge Telemetry</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 px-2.5 py-1 rounded-md border border-slate-800">
                  GATEWAY ID: IoT-GW-841
                </span>
              </div>

              {/* Metric Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="border border-slate-800 rounded-2xl p-4">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase">Motor Drive Speed</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white">1443</span>
                    <span className="text-xs text-cyan-400 font-mono">RPM</span>
                  </div>
                </div>

                <div className="border border-slate-800 rounded-2xl p-4">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase">Axial Vibration</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white">1.47</span>
                    <span className="text-xs text-cyan-400 font-mono">mm/s</span>
                  </div>
                </div>

                <div className="border border-slate-800 rounded-2xl p-4">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase">Core Temperature</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white">56.6</span>
                    <span className="text-xs text-cyan-400 font-mono">°C</span>
                  </div>
                </div>

                <div className="border border-slate-800 rounded-2xl p-4">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase">Energy Demand</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white">12.63</span>
                    <span className="text-xs text-cyan-400 font-mono">kW</span>
                  </div>
                </div>
              </div>

              {/* Vibration Sparkline Simulation */}
              <div className="border border-slate-800 rounded-2xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Vibration Trend Pipeline</span>
                  <span className="text-[10px] font-mono text-cyan-400">1200ms INTERVAL</span>
                </div>
                <div className="h-12 flex items-end gap-1.5 pt-2">
                  {[35, 42, 38, 55, 62, 45, 30, 48, 70, 52, 40, 65, 58, 48, 60, 42, 50].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-sm opacity-80 hover:opacity-100 transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Edge AI Diagnostic Alert */}
              <div className="border border-cyan-500/30 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="p-2 rounded-xl text-cyan-400 border border-cyan-500/30">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Edge Diagnostics Detector</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Model anomaly index: <span className="text-cyan-400 font-bold">1.2% (Nominal)</span>. No predictive maintenance flags triggered for local parameters.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="border-y border-slate-800/80 py-8 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                50+
              </span>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">IoT Deployments</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                100+
              </span>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Systems Designed</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                20+
              </span>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Enterprise Partners</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                99.98%
              </span>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Data Transmission SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ENGINEERED FOR FACTORY SCALES ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full border border-cyan-500/30">
            ENTERPRISE TRUST
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Engineered for Factory Scales
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Why industrial clients, factory engineers, and automation consultants partner with IoTily Lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Workflow,
              title: "End-to-End Deployment",
              desc: "From physical sensor installations and PLC mapping to dashboard terminals."
            },
            {
              icon: Cpu,
              title: "Embedded Firmware Expertise",
              desc: "Deterministic microcontrollers, real-time operating systems (RTOS), and safety fail-safes."
            },
            {
              icon: Zap,
              title: "AI + IoT Integration",
              desc: "Running predictive diagnostic algorithms directly on secure cloud logic clusters."
            },
            {
              icon: BarChart3,
              title: "Industrial Dashboards",
              desc: "Clean SCADA-inspired control room panels built with React for performance and responsiveness."
            },
            {
              icon: Eye,
              title: "Edge AI Architectures",
              desc: "Running deep learning and computer vision on NVIDIA Jetson modules at the site."
            },
            {
              icon: Radio,
              title: "Telemetry Pipelines",
              desc: "Highly stable MQTT broker queues capable of handling thousands of sensor packets."
            },
            {
              icon: Settings,
              title: "Hardware Integration",
              desc: "Direct hardware-software loop validation preventing physical interface errors."
            },
            {
              icon: Activity,
              title: "Real-Time Monitoring",
              desc: "High-resolution telemetry graphs with sub-second transmission delay."
            },
            {
              icon: Server,
              title: "Custom PCB Development",
              desc: "Designing dedicated multi-sensor boards tailored for specific industrial enclosures."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="group border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TARGET SECTORS ===== */}
      <section className="py-20 border-y border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full border border-cyan-500/30">
                TARGET SECTORS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Industries We Transform
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-3 md:mt-0">
              Delivering tailored telemetry architectures and edge processing modules for specialized environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Manufacturing",
                tag: "PLANT TELEMETRY",
                desc: "Machine uptime monitoring, vibration diagnostics, and PLC integration."
              },
              {
                title: "Smart Agriculture",
                tag: "FIELD INTELLIGENCE",
                desc: "Automated micro-irrigation, soil moisture matrices, and weather telemetry."
              },
              {
                title: "Warehousing",
                tag: "ASSET FLOW",
                desc: "RFID inventory pipelines, environmental logs, and routing."
              },
              {
                title: "Cold Storage",
                tag: "COLD-CHAIN SLA",
                desc: "Multi-tier temperature monitoring, sensor logs, and anomaly triggers."
              },
              {
                title: "Smart Cities",
                tag: "URBAN GRID",
                desc: "Acoustic noise matrices, ambient telemetry, and lighting grid controls."
              },
              {
                title: "Water Management",
                tag: "UTILITY CONTROL",
                desc: "Flow telemetry, water level analytics, and valve actuator utility."
              }
            ].map((sector, i) => (
              <div
                key={i}
                className="border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {sector.title}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 px-2.5 py-1 rounded-md border border-cyan-500/30">
                    {sector.tag}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CORE ENGINEERING CAPABILITIES ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full border border-cyan-500/30">
            SOLUTIONS SUITE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Core Engineering Capabilities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Production-ready Industrial IoT packages fully compatible with existing legacy factory systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="border border-cyan-500/20 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-400/50 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">MACHINE TELEMETRY</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real-Time Machine Monitoring</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Connect legacy and modern CNCs, Injection Molding, and Extruder machinery. Map operational variables directly into digital twins to count pieces, measure performance logs, and map machine states.
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-6 text-[10px] font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded border border-slate-800">Modbus TCP</span>
                <span className="px-2.5 py-1 rounded border border-slate-800">ESP32 Gateway</span>
                <span className="px-2.5 py-1 rounded border border-slate-800">Node-RED Core</span>
              </div>
              <div className="border border-slate-800 rounded-xl p-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-400">OEE LIVE</span>
                  <span className="text-cyan-400 font-bold font-mono">PLC SYNC</span>
                </div>
                <div className="w-full border border-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[84%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-cyan-500/20 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-400/50 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">FAILURE PREDICTION</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Predictive Maintenance Systems</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Vibration sensors (piezoelectric and MEMS accelerometer nodes) combined with thermal tracking logs. Identify bearing degradation, imbalance patterns, and shaft misalignment weeks before catastrophic failure.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6 text-[10px] font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded border border-slate-800">Fourier Transform (FFT)</span>
                <span className="px-2.5 py-1 rounded border border-slate-800">STM32 Edge Node</span>
                <span className="px-2.5 py-1 rounded border border-slate-800">AI Diagnostics</span>
              </div>
              <div className="border border-slate-800 rounded-xl p-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-400">FFT DRIFT</span>
                  <span className="text-cyan-400 font-bold font-mono">RUL MODEL</span>
                </div>
                <div className="w-full border border-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full w-[92%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-cyan-500/20 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-400/50 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">ENERGY BALANCE</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Energy Monitoring</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Sub-metering networks utilizing split-core CT sensors. Monitor voltage spikes, reactive power, power factors, and phase imbalances. Directly analyze carbon offsets and factory power usage patterns.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6 text-[10px] font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded border border-slate-800">Modbus RTU</span>
                <span className="px-2.5 py-1 rounded border border-slate-800">Power Analyzers</span>
                <span className="px-2.5 py-1 rounded border border-slate-800">Energy Dashboard</span>
              </div>
              <div className="border border-slate-800 rounded-xl p-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-400">LIVE DASHBOARD</span>
                  <span className="text-cyan-400 font-bold font-mono">PF 0.94</span>
                </div>
                <div className="w-full border border-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-600 h-full w-[96%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE AI-BASED SURVEILLANCE & TELEMETRY PREVIEW ===== */}
      <section className="py-20 border-y border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full border border-cyan-500/30">
                INDUSTRIAL IOT SOLUTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                AI-Based Surveillance for Factories & MSMEs
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                IoTily Lab delivers <strong className="text-slate-200">AI-based surveillance</strong> for factories and infrastructure. Analyze safety video streams in real time. Automatically detect missing PPE (helmets, vests, glasses), boundary intrusions in dangerous robot bays, and fire indicators at the local gateway level.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg">AI Surveillance</span>
                <span className="text-xs font-mono border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg">PPE Detection</span>
                <span className="text-xs font-mono border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg">Industrial Safety AI</span>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:scale-105 transition-all">
                  Talk to an Engineer
                </button>
              </div>
            </div>

            {/* Right Column: Simulated Live Surveillance Telemetry Dashboard */}
            <div className="lg:col-span-7">
              <div className="border border-cyan-500/30 rounded-3xl p-6 backdrop-blur-2xl">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold text-white">AI-Based Surveillance</span>
                    <span className="text-[10px] text-slate-400 font-mono">Real-time dashboard • Tick #4</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                    LIVE STREAMING
                  </span>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Tech Stack:</span>
                  <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">NVIDIA Jetson Core</span>
                  <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">YOLOv8 Edge Models</span>
                  <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">RTSP Streams</span>
                </div>

                {/* Realtime Metrics Grid */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  <div className="border border-slate-800 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Inference FPS</span>
                    <div className="text-xl font-black text-white font-mono mt-0.5">26 <span className="text-[10px] text-cyan-400 font-normal">fps</span></div>
                  </div>
                  <div className="border border-slate-800 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">PPE Compliance</span>
                    <div className="text-xl font-black text-cyan-400 font-mono mt-0.5">95.1%</div>
                  </div>
                  <div className="border border-slate-800 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Active Alerts</span>
                    <div className="text-xl font-black text-white font-mono mt-0.5">0</div>
                  </div>
                  <div className="border border-slate-800 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Jetson GPU Load</span>
                    <div className="text-xl font-black text-cyan-400 font-mono mt-0.5">82%</div>
                  </div>
                </div>

                {/* Camera Inference & Safety Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="border border-slate-800 p-3.5 rounded-2xl">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-bold text-white">Camera Inference Grid</span>
                      <span className="text-[10px] text-cyan-400 font-mono">LIVE</span>
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between text-slate-300 p-2 rounded border border-slate-800">
                        <span>Gate 01</span>
                        <span className="text-cyan-400">CLEAR</span>
                      </div>
                      <div className="flex justify-between text-slate-300 p-2 rounded border border-slate-800">
                        <span>Line A</span>
                        <span className="text-cyan-400">CLEAR</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-800 p-3.5 rounded-2xl">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-bold text-white">Safety Compliance</span>
                      <span className="text-[10px] text-cyan-400 font-mono">STATUS</span>
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between text-slate-300 p-2 rounded border border-slate-800">
                        <span>Helmet / Vest</span>
                        <span className="text-cyan-400">PASSED</span>
                      </div>
                      <div className="flex justify-between text-slate-300 p-2 rounded border border-slate-800">
                        <span>Restricted Zone</span>
                        <span className="text-amber-400">WATCH</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Event Terminal Output */}
                <div className="border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-900 pb-1 mb-1">
                    <span>SYSTEM EVENT STREAM</span>
                    <span className="text-cyan-400">ONLINE</span>
                  </div>
                  <div><span className="text-cyan-400">[00:11:41]</span> Cloud sync delta queued</div>
                  <div><span className="text-cyan-400">[00:11:42]</span> Edge inference cycle completed</div>
                  <div><span className="text-cyan-400">[00:11:42]</span> Stream initialized for AI-Based Surveillance</div>
                  <div><span className="text-cyan-400">[00:11:43]</span> Gateway IIoT-GW-841 acquired lock</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== DEPLOYMENT PIPELINE ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full border border-cyan-500/30">
            WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Structured Deployment Pipeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            From initial requirements definition to auditing site setups, we follow an engineering-first roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: "01", title: "Requirement Analysis", desc: "Document variables, communication protocols, and installation constraints." },
            { step: "02", title: "Site Survey", desc: "Audit RF signal coverage, network structures, and electrical cabinet layouts." },
            { step: "03", title: "Hardware Design", desc: "Select components, design custom PCBs, and draft enclosures." },
            { step: "04", title: "Embedded Dev", desc: "Compile firmware loop controls and configure protocol translation buffers." },
            { step: "05", title: "Dashboard Dev", desc: "Build responsive control panels and configure alarm criteria." },
            { step: "06", title: "AI Integration", desc: "Train diagnostic models and configure inference criteria at the edge." },
            { step: "07", title: "Deployment", desc: "Install sensor channels, gateways, and establish cloud loops." },
            { step: "08", title: "Support Audit", desc: "Perform periodic checks, calibration tests, and firmware updates." }
          ].map((item, index) => (
            <div
              key={index}
              className="border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 transition-all group"
            >
              <span className="text-xs font-mono font-bold text-cyan-400 border border-slate-800 px-2.5 py-1 rounded-md mb-3 inline-block">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FREQUENTLY ASKED QUESTIONS ===== */}
      <section className="py-20 border-t border-slate-800/80 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Can AI-based surveillance be retrofitted onto our existing machines?",
                a: "Yes. IoTily Lab retrofits legacy and modern equipment using external sensors and protocol bridges (Modbus TCP/RTU, RS485, OPC-UA), so you don't need to replace working machinery."
              },
              {
                q: "Do you deploy on-site across India?",
                a: "Yes. IoTily Lab handles end-to-end deployment on-site — sensor installation, gateway setup, and dashboards — for factories, MSMEs, and infrastructure across India."
              },
              {
                q: "Can this run on-premise or in the cloud?",
                a: "Both. Dashboards and pipelines can run air-gapped inside your plant network or sync securely with cloud platforms such as AWS IoT Core, with role-based access and alerts."
              },
              {
                q: "Do you design custom sensor hardware if needed?",
                a: "Yes. We perform custom PCB design, sensor selection, and IP-rated enclosures where standard hardware doesn't fit the required environmental conditions."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 text-left text-white font-semibold text-sm hover:text-cyan-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-cyan-400 transition-transform duration-200 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA BANNER ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="rounded-3xl border border-cyan-500/30 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Build the Future?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Contact our solutions engineering division to schedule a detailed site audit, map telemetry requirements, and discuss custom automation systems.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm hover:scale-105 transition-all">
                Request Proposal
              </button>
              <a
                href="tel:+917815809412"
                className="px-6 py-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-white font-bold text-sm transition-all"
              >
                +91 78158 09412
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLOATING ACTION WIDGETS ===== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        {/* Ask IoTily AI Button */}
        <button 
          type="button" 
          className="px-4 py-2.5 rounded-full border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md hover:border-cyan-400"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Ask IoTily AI</span>
        </button>

        {/* Floating WhatsApp Button */}
        <a 
          href={whatsappLink(WHATSAPP_BOOKINGS)} 
          target="_blank" 
          rel="noreferrer" 
          aria-label="WhatsApp"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center hover:scale-110 transition-all"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>
      </div>

    </div>
  );
}