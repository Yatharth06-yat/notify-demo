import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096718/k4-3_kqfqiw.png",
    category: "Smart Attendance",
    title: "IoT Smart Attendance System",
    desc: "A Raspberry Pi 4 based IoT Smart Attendance System that enables automated attendance management using RFID authentication, motion detection, and real-time data processing.",
    specs: ["Raspberry Pi 4", "RFID Reader", "Touchscreen Display"],
  },
  {
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1785959728/kit3-2_gak5l5.png",
    category: "Communication",
    title: "IoT Communication Kit – Transmitter",
    desc: "A comprehensive wireless communication development kit designed for learning and prototyping IoT communication systems.",
    specs: ["Arduino UNO", "ESP32", "LoRa SX1278", "GSM"],
  },
  {
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096718/k5-3_vzglzk.png",
    category: "Edge AI",
    title: "IoT Wildlife Animal Detection Kit",
    desc: "An advanced AI-powered IoT development kit designed for real-time wildlife animal detection and monitoring using Raspberry Pi 5.",
    specs: ["Raspberry Pi 5", "Camera Module", "GPS Module"],
  },
  {
    image: "https://res.cloudinary.com/dwumernfk/image/upload/v1786096720/k6-3_xzw4e7.png",
    category: "Innovation",
    title: "IoT Innovator Kit",
    desc: "A comprehensive IoT learning and prototyping kit featuring Raspberry Pi Pico and ESP32 with a wide range of sensors and displays.",
    specs: ["Raspberry Pi Pico", "ESP32", "OLED Display"],
  },
];

const TICKER_ITEMS = [
  "IoRT + AI Systems",
  "AIoT Compatible Kits",
  "MSCP (MITS Student Connect Program)",
  "MITS Gwalior Initiative",
];

export default function HardwareSection({ onNavigate }) {
  return (
    <section className="relative px-6 pt-20 lg:pt-28 bg-[#FFF2E5] text-gray-900 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] pointer-events-none" />

      {/* Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(15,118,110,0.06)_0%,_rgba(15,118,110,0.02)_50%,_transparent_70%)] blur-[100px]"
      />

      <div className="mx-auto max-w-7xl relative z-10 mb-20">
        
        {/* Header with Top-Right Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-left"
          >
            <span className="eyebrow-badge mb-4 text-xs sm:text-sm tracking-[0.25em] font-mono text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 inline-block" />
              IN-HOUSE LEARNING KITS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight text-gray-900">
              Designed at CIoT.{" "}
              <span className="text-accent">Built for hands-on learning.</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => onNavigate && onNavigate("iotkit")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-gray-200 hover:border-accent text-gray-800 hover:text-accent font-body font-semibold text-sm transition-all duration-300 shadow-sm self-start md:self-auto"
          >
            Explore Kits & Modules
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* 4 In-House Hardware Kit Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {PRODUCTS.map((prod) => (
            <motion.div
              key={prod.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-md bg-white shadow-sm"
            >
              <div>
                {/* Product Image with Hover Zoom */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-accent border border-gray-200 shadow-sm">
                      {prod.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2 group-hover:text-accent transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {prod.desc}
                  </p>
                </div>
              </div>

              {/* Specs Pills */}
              <div className="px-6 pb-6 pt-0 border-t border-gray-100 mt-auto">
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {prod.specs.map((spec) => (
                    <span key={spec} className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 border border-gray-200">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scrolling Marquee Ticker at the Bottom */}
      <div className="relative w-full overflow-hidden border-t border-b border-gray-200 bg-[#FAECE1] py-4">
        <style>{`
          @keyframes hardwareTicker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .hardware-ticker-track {
            animation: hardwareTicker 28s linear infinite;
            will-change: transform;
          }
        `}</style>
        <div className="flex w-max hardware-ticker-track whitespace-nowrap items-center text-xs sm:text-sm font-mono text-accent">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center mx-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
              <span className="tracking-widest uppercase font-bold text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}