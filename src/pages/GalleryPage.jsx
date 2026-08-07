import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ZoomIn, ChevronLeft, ChevronRight, Play, Pause, 
  Globe, Grid, Search, Zap, Cpu, Maximize2, Sparkles, Activity 
} from "lucide-react";

const ALL_IMAGES = [
  // Kit & Edge AI Series
  { 
    id: 1, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k5-1_cbbbqb.png", 
    title: "Smart Attendance Kit - View 1", 
    category: "IoT", 
    desc: "Raspberry Pi 4 Smart Attendance System Setup", 
    sticker: "NEW", 
    specs: "Raspberry Pi 4 • Biometric" 
  },
  { 
    id: 2, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k5-2_pf95ud.png", 
    title: "Smart Attendance Kit - View 2", 
    category: "IoT", 
    desc: "RFID and Camera module configuration", 
    specs: "Raspberry Pi 4 • RFID" 
  },
  { 
    id: 3, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096718/k5-3_vzglzk.png", 
    title: "Smart Attendance Kit - View 3", 
    category: "IoT", 
    desc: "Complete hardware assembly deployment", 
    sticker: "POPULAR", 
    specs: "Python • OpenCV" 
  },
  { 
    id: 4, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096716/k4-1_oajpqk.png", 
    title: "Raspberry Pi 4 Smart Kit - 1", 
    category: "Edge AI", 
    desc: "Core hardware layout and connection interface", 
    specs: "BCM2711 • 4GB RAM" 
  },
  { 
    id: 5, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096717/k4-2_bhqde3.png", 
    title: "Raspberry Pi 4 Smart Kit - 2", 
    category: "Edge AI", 
    desc: "Sensor expansion board and wiring structure", 
    specs: "GPIO • Sensors" 
  },
  { 
    id: 6, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096718/k4-3_kqfqiw.png", 
    title: "Raspberry Pi 4 Smart Kit - 3", 
    category: "Edge AI", 
    desc: "Final enclosure setup and testing phase", 
    sticker: "FEATURED", 
    specs: "Linux • Node-RED" 
  },
  { 
    id: 7, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096721/k6-1_j0ub0f.png", 
    title: "IoT Innovator Kit (K6) - 1", 
    category: "IoT", 
    desc: "Core microcontroller node with wireless connectivity", 
    specs: "ESP32 • Wi-Fi • BLE" 
  },
  { 
    id: 8, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k6-2_atvdpa.png", 
    title: "IoT Innovator Kit (K6) - 2", 
    category: "IoT", 
    desc: "Actuator and sensor module integration", 
    specs: "I2C • SPI Bus" 
  },
  { 
    id: 9, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096720/k6-3_xzw4e7.png", 
    title: "IoT Innovator Kit (K6) - 3", 
    category: "IoT", 
    desc: "Cloud telemetry and dashboard communication link", 
    sticker: "HOT!", 
    specs: "MQTT • AWS IoT" 
  },
  { 
    id: 10, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096721/k7-1_ye7zix.png", 
    title: "IoT Innovator Pro Kit (K7) - 1", 
    category: "Industry 4.0", 
    desc: "Advanced industrial gateway node deployment", 
    sticker: "WOW!", 
    specs: "Industrial Grade • LoRa" 
  },
  { 
    id: 11, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096722/k7-2_s4ziqa.png", 
    title: "IoT Innovator Pro Kit (K7) - 2", 
    category: "Industry 4.0", 
    desc: "Multi-protocol industrial sensor mesh configuration", 
    specs: "Modbus • RS485" 
  },
  { 
    id: 12, 
    src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096722/k7-3_npt0xt.png", 
    title: "IoT Innovator Pro Kit (K7) - 3", 
    category: "Industry 4.0", 
    desc: "Robust power supply and edge processing unit", 
    sticker: "LIVE DEMO", 
    specs: "Edge Analytics • Solar" 
  },
  // Additional Lab & Vision Deployments
  { id: 13, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096716/k4-1_oajpqk.png", title: "Defect Detection Setup", category: "Computer Vision", desc: "YOLO v8 inference running on Jetson Nano", sticker: "LIVE DEMO", specs: "60 FPS • Jetson Orin Nano" },
  { id: 14, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k5-1_cbbbqb.png", title: "Smart Energy Dashboard", category: "IoT", desc: "Real-time energy monitoring across campus", specs: "MQTT • InfluxDB • Grafana" },
  { id: 15, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096721/k6-1_j0ub0f.png", title: "Warehouse Robot", category: "Robotics", desc: "AWR-1 navigating autonomously with LiDAR SLAM", sticker: "WOW!", specs: "ROS 2 • LiDAR 360" },
  { id: 16, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096721/k7-1_ye7zix.png", title: "Predictive Maintenance Rig", category: "Industry 4.0", desc: "Vibration sensor array on industrial motor", sticker: "FEATURED", specs: "10kHz Sampling • Vibration AI" },
  { id: 17, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096718/k5-3_vzglzk.png", title: "Lab Workstation", category: "Lab", desc: "Development station with Jetson boards", specs: "Dual RTX 4090 • CUDA 12" },
  { id: 18, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096718/k4-3_kqfqiw.png", title: "PCB Lab", category: "Lab", desc: "Custom embedded board assembly", specs: "SMD Soldering • KiCAD 8" },
  { id: 19, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096720/k6-3_xzw4e7.png", title: "Precision Agri Node", category: "IoT", desc: "Soil sensor nodes for agricultural deployment", sticker: "POPULAR", specs: "LoRaWAN • Solar Powered" },
  { id: 20, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096722/k7-2_s4ziqa.png", title: "Surgical Vision System", category: "Computer Vision", desc: "Medical instrument detection prototype", sticker: "HOT!", specs: "99.2% Acc • TensorRT" },
  { id: 21, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096722/k7-3_npt0xt.png", title: "6-DOF Robot Arm", category: "Robotics", desc: "Robot arm assembly with MoveIt2", specs: "Inverse Kinematics • MoveIt2" },
  { id: 22, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k5-2_pf95ud.png", title: "Traffic Analytics", category: "Edge AI", desc: "Multi-camera deployment on Jetson AGX", sticker: "HOT!", specs: "4x 4K Streams • DeepStream" },
  { id: 23, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096717/k4-2_bhqde3.png", title: "Power Grid Analytics", category: "AI", desc: "Anomaly detection visualization dashboard", sticker: "WOW!", specs: "LSTM Model • Real-time AI" },
  { id: 24, src: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k6-2_atvdpa.png", title: "CNC Digital Twin", category: "Industry 4.0", desc: "Real-time CNC machine digital twin interface", specs: "OPC-UA • Unity 3D Engine" },
];

const CATEGORIES = ["All", "Computer Vision", "IoT", "Robotics", "Industry 4.0", "Edge AI", "AI", "Lab"];

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState("globe"); // 'globe' (3D animation) or 'bento'
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filter & Search Logic
  const filteredImages = useMemo(() => {
    return ALL_IMAGES.filter((img) => {
      const matchesCategory = activeFilter === "All" || img.category === activeFilter;
      const matchesSearch = 
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        img.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Triple datasets for 360 seamless scrolling marquee in Globe View
  const row1 = useMemo(() => [...filteredImages, ...filteredImages, ...filteredImages], [filteredImages]);
  const row2 = useMemo(() => [...filteredImages.slice().reverse(), ...filteredImages.slice().reverse(), ...filteredImages.slice().reverse()], [filteredImages]);
  const row3 = useMemo(() => [...filteredImages, ...filteredImages, ...filteredImages], [filteredImages]);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = () => setLightboxIdx((i) => (i - 1 + filteredImages.length) % filteredImages.length);
  const nextImg = () => setLightboxIdx((i) => (i + 1) % filteredImages.length);

  // Lock body scroll and handle keyboard navigation when Lightbox is open
  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevImg();
        if (e.key === "ArrowRight") nextImg();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [lightboxIdx, filteredImages.length]);

  return (
    <div className="min-h-screen bg-[#07090e] text-white overflow-x-hidden pt-24 pb-20 selection:bg-cyan-500 selection:text-black relative">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-purple-600/10 blur-[150px] pointer-events-none rounded-full" />

      {/* ── HEADER SECTION ── */}
      <section className="relative px-6 pt-4 pb-4 text-center z-10 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-xl mb-3 shadow-[0_0_20px_rgba(0,207,255,0.2)]">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            Interactive Lab Visual Showcase
          </span>
          <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tight mb-2">
            Inside the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500">Nexus Lab</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light">
            Explore live deployments, hardware setups, and research prototypes in real-time.
          </p>
        </motion.div>

        {/* Live Telemetry Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-6 py-2.5 px-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl max-w-md mx-auto text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Activity size={13} className="text-emerald-400 animate-pulse" />
            <span>STATUS: <strong className="text-white">ONLINE</strong></span>
          </div>
          <div className="w-px h-3.5 bg-white/10 hidden sm:block" />
          <div>ACTIVE DEPLOYMENTS: <strong className="text-cyan-400">{filteredImages.length}</strong></div>
        </motion.div>
      </section>

      {/* ── CONTROL PANEL & BAR ── */}
      <section className="sticky top-20 z-30 px-6 py-4 backdrop-blur-2xl bg-[#07090e]/85 border-y border-white/10 shadow-xl">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* View Switcher & Search */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            
            {/* View Mode Toggle */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
              <button
                onClick={() => setViewMode("globe")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "globe"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,207,255,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe size={13} />
                <span>3D Globe View</span>
              </button>
              <button
                onClick={() => setViewMode("bento")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "bento"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,207,255,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid size={13} />
                <span>Bento Grid</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative flex-grow max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  activeFilter === cat
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,207,255,0.3)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pause / Play Button for Globe */}
          {viewMode === "globe" && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-950/50 transition-all text-xs font-semibold shadow-[0_0_10px_rgba(0,207,255,0.15)]"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause" : "Rotate"}</span>
            </button>
          )}
        </div>
      </section>

      {/* ── MAIN DISPLAY AREA ── */}
      {viewMode === "globe" ? (
        /* ── MODE 1: 3D CYBER EARTH GLOBE WALL (MARQUEE) ── */
        <section className="relative py-8 overflow-hidden flex items-center justify-center min-h-[640px]">
          {/* Vignette Gradients */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(7,9,14,0.95)_80%)]" />
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#07090e] via-[#07090e]/80 to-transparent pointer-events-none z-20" />

          {/* 3D Barrel Transformation Canvas */}
          <div 
            className="w-full max-w-[1800px] px-2 transition-all duration-700"
            style={{
              perspective: "750px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <div 
              className="flex flex-col gap-3.5 transform-gpu transition-all duration-500"
              style={{
                transform: "rotateX(6deg) rotateY(0deg) scale(0.92) translateZ(-40px)",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Row 1 */}
              <div className="flex overflow-hidden relative w-full">
                <motion.div
                  className="flex gap-3.5 min-w-full flex-nowrap"
                  animate={{ x: isPlaying ? ["0%", "-33.33%"] : "0%" }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 24 }}
                >
                  {row1.map((img, i) => (
                    <VideoCard key={`r1-${i}`} img={img} onClick={() => openLightbox(i % filteredImages.length)} />
                  ))}
                </motion.div>
              </div>

              {/* Row 2 */}
              <div className="flex overflow-hidden relative w-full">
                <motion.div
                  className="flex gap-3.5 min-w-full flex-nowrap"
                  animate={{ x: isPlaying ? ["-33.33%", "0%"] : "0%" }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
                >
                  {row2.map((img, i) => (
                    <VideoCard key={`r2-${i}`} img={img} onClick={() => openLightbox(i % filteredImages.length)} />
                  ))}
                </motion.div>
              </div>

              {/* Row 3 */}
              <div className="flex overflow-hidden relative w-full">
                <motion.div
                  className="flex gap-3.5 min-w-full flex-nowrap"
                  animate={{ x: isPlaying ? ["0%", "-33.33%"] : "0%" }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
                >
                  {row3.map((img, i) => (
                    <VideoCard key={`r3-${i}`} img={img} onClick={() => openLightbox(i % filteredImages.length)} />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ── MODE 2: MODERN BENTO GRID ── */
        <section className="relative px-6 py-8 mx-auto max-w-7xl z-10">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
              <p className="text-slate-400 text-sm">No items matching your filter/search criteria.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence>
                {filteredImages.map((img, idx) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(idx)}
                    className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-xl cursor-pointer hover:border-cyan-400/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,207,255,0.25)] hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                      
                      {img.sticker && (
                        <div className="absolute top-3 left-3 bg-cyan-500 text-black text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <Zap size={11} className="fill-black" />
                          {img.sticker}
                        </div>
                      )}

                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-black/70 border border-cyan-400 text-cyan-300 backdrop-blur-md">
                          <Maximize2 size={13} />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                          {img.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{img.specs?.split('•')[0]}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors line-clamp-1">{img.title}</h3>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2 font-light">{img.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      )}

      {/* ── CINEMATIC LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {lightboxIdx !== null && filteredImages[lightboxIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl p-4 sm:p-6 overscroll-none select-none"
            onClick={closeLightbox}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors z-30"
            >
              <X size={20} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors z-30"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors z-30"
            >
              <ChevronRight size={22} />
            </button>

            {/* Preview Box Container */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-4 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_60px_rgba(0,207,255,0.25)] bg-[#07090e]">
                <img
                  src={filteredImages[lightboxIdx].src}
                  alt={filteredImages[lightboxIdx].title}
                  className="max-w-full max-h-[52vh] object-contain rounded-3xl"
                />
              </div>

              {/* HUD Details Bar */}
              <div className="text-center max-w-xl bg-slate-900/90 border border-white/10 p-4 rounded-3xl backdrop-blur-2xl shadow-2xl w-full">
                <div className="flex items-center justify-between gap-2 mb-2 border-b border-white/10 pb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono font-semibold">
                    {filteredImages[lightboxIdx].category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                    <Cpu size={12} />
                    <span>{filteredImages[lightboxIdx].specs || "Lab Hardware Setup"}</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-lg sm:text-xl">{filteredImages[lightboxIdx].title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 font-light">{filteredImages[lightboxIdx].desc}</p>
                <div className="text-[11px] text-slate-500 font-mono mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-emerald-400">SYSTEM: ONLINE</span>
                  <span className="text-cyan-400">{lightboxIdx + 1} / {filteredImages.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── VIDEO CARD TILE COMPONENT (FOR 3D GLOBE VIEW) ──
function VideoCard({ img, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 w-48 sm:w-56 h-32 sm:h-36 rounded-2xl overflow-hidden cursor-pointer group border border-white/20 bg-slate-900/90 backdrop-blur-md shadow-2xl hover:border-cyan-400 transition-all duration-300 hover:scale-110 hover:z-30"
    >
      <img
        src={img.src}
        alt={img.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/90 via-transparent to-[#07090e]/20 opacity-90 group-hover:opacity-60 transition-opacity" />

      {/* STICKER OVERLAY */}
      {img.sticker && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            animate={{ scale: [0.95, 1.1, 0.95], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="px-2.5 py-0.5 bg-cyan-400 text-black font-black text-xs sm:text-sm tracking-wider uppercase rounded-full border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-1"
          >
            <Zap size={13} className="fill-black" />
            {img.sticker}
          </motion.div>
        </div>
      )}

      <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400/60 rounded-2xl transition-all duration-300 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-end p-2.5 z-10">
        <span className="self-start text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-[#07090e]/80 border border-cyan-500/30 px-2 py-0.5 rounded-full mb-1 backdrop-blur-sm">
          {img.category}
        </span>
        <h4 className="font-bold text-white text-xs line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {img.title}
        </h4>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black/60 border border-cyan-400 text-cyan-300 backdrop-blur-md">
          <ZoomIn size={12} />
        </div>
      </div>
    </div>
  );
}