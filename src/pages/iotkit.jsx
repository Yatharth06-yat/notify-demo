import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ===== COMPLETE KITS DATA (PRICES REMOVED) =====
const KITS = [
  {
    title: "IoT Smart Attendance System using Raspberry Pi 4",

    desc: "A Raspberry Pi 4 based IoT Smart Attendance System that enables automated attendance management using RFID authentication, motion detection, environmental sensing, and real-time data processing. The kit demonstrates secure access control, smart attendance logging, and IoT-based monitoring for educational institutions and workplaces.",

    tags: [
      "Raspberry Pi 4",
      "Smart Attendance",
      "RFID",
      "IoT",
      "Access Control",
      "Automation",
      "Touchscreen",
      "Embedded Systems"
    ],

    thumbnails: [
      "https://res.cloudinary.com/dwumernfk/image/upload/v1786096716/k4-1_oajpqk.png",
      "https://res.cloudinary.com/dwumernfk/image/upload/v1786096717/k4-2_bhqde3.png",
      "https://res.cloudinary.com/dwumernfk/image/upload/v1786096718/k4-3_kqfqiw.png"
    ],

    specs: {
      controllers: [
        "Raspberry Pi 4"
      ],

      sensors: [
        "RFID Reader (MFRC522)",
        "Ultrasonic Sensor",
        "PIR Motion Sensor",
        "DHT22 Temperature & Humidity Sensor"
      ],

      display: [
        "7-inch Touchscreen Display"
      ],

      actuators: [
        "Relay Module",
        "Red Status LED",
        "Blue Status LED",
        "Buzzer"
      ],

      connectivity: [
        "Wi-Fi",
        "Bluetooth",
        "Ethernet",
        "USB"
      ]
    },

    included: [
      {
        code: "RP4",
        title: "Raspberry Pi 4 Controller"
      },
      {
        code: "RFID",
        title: "MFRC522 RFID Reader Module"
      },
      {
        code: "LCD",
        title: "7-inch Touchscreen Display"
      }
    ],

    useCases: [
      {
        id: "01",
        title: "Student & Employee Attendance Management"
      },
      {
        id: "02",
        title: "RFID-Based Smart Access Control System"
      }
    ]
  },
  {
    id: "communication-kit-transmitter",

    tier: "TIER 02",

    badge: "ADVANCED",

    category: "Communication",

    badgeColor: "#3b82f6",

    title: "IoT Communication Kit – Transmitter",

    desc: "A comprehensive wireless communication development kit designed for learning and prototyping IoT communication systems. It integrates multiple RF technologies including LoRa, ZigBee, GSM, GPS, Bluetooth, NRF24L01, and RFID with Arduino UNO and ESP32, enabling students to build long-range, short-range, and internet-connected IoT applications.",

    tags: [
      "Arduino UNO",
      "ESP32",
      "LoRa SX1278",
      "GSM",
      "GPS",
      "ZigBee",
      "Bluetooth",
      "RFID",
      "NRF24L01"
    ],

    thumbnails: [



      "https://res.cloudinary.com/dwumernfk/image/upload/v1785959726/kit3-1_zfdued.png",



      "https://res.cloudinary.com/dwumernfk/image/upload/v1785959728/kit3-2_gak5l5.png",



      "https://res.cloudinary.com/dwumernfk/image/upload/v1785959727/kit3-3_u005qg.png"



    ],

    specs: {

      controllers: [
        "Arduino UNO",
        "ESP32 Development Board"
      ],

      sensors: [
        "DHT22 Temperature & Humidity Sensor",
        "MQ Air Quality Sensor",
        "RFID RC522 Reader",
        "Push Button Interface"
      ],

      display: [
        "Status LEDs",
        "On-board Indicator LEDs"
      ],

      actuators: [
        "RF-433 Transmitter Module",
        "LoRa SX1278 Module",
        "ZigBee Module",
        "Bluetooth Module"
      ],

      connectivity: [
        "GSM Module",
        "GPS Module",
        "NRF24L01 Wireless Module",
        "RF-433 Communication",
        "LoRa Communication",
        "Bluetooth",
        "ZigBee",
        "UART / SPI / I2C",
        "USB"
      ]

    },

    included: [

      {
        code: "HW",
        title: "Communication Trainer Board",
        desc: "Pre-assembled wireless communication development platform."
      },

      {
        code: "CD",
        title: "Sample Programs",
        desc: "Example codes for GSM, GPS, LoRa, ZigBee, RFID, Bluetooth, and ESP32."
      },

      {
        code: "SP",
        title: "Technical Support",
        desc: "Documentation, tutorials, and technical assistance."
      }

    ],

    useCases: [

      {
        id: "01",
        title: "Wireless Communication Experiments",
        desc: "Learn RF433, LoRa, ZigBee, Bluetooth, and NRF24L01 based communication."
      },

      {
        id: "02",
        title: "IoT Network Development",
        desc: "Build long-range and short-range IoT communication systems using multiple wireless protocols."
      },

      {
        id: "03",
        title: "GPS & GSM Tracking",
        desc: "Develop vehicle tracking, asset monitoring, and location-based IoT applications."
      },

      {
        id: "04",
        title: "Embedded Communication Projects",
        desc: "Prototype smart agriculture, industrial monitoring, and remote sensing applications."
      }

    ]
  },
  {
    title: "IoT Wildlife Animal Detection Kit using Raspberry Pi 5",

    desc: "An advanced AI-powered IoT development kit designed for real-time wildlife animal detection and monitoring using Raspberry Pi 5. The kit integrates computer vision, environmental sensors, GPS tracking, and wireless connectivity to identify animals, monitor surroundings, and support forest surveillance, smart conservation, and human-wildlife conflict prevention.",

    tags: [
      "Raspberry Pi 5",
      "Computer Vision",
      "Wildlife Detection",
      "Artificial Intelligence",
      "IoT",
      "Edge AI",
      "Forest Monitoring",
      "Animal Recognition"
    ],

    thumbnails: [
      "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k5-1_cbbbqb.png",
      "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k5-2_pf95ud.png",
      "https://res.cloudinary.com/dwumernfk/image/upload/v1786096718/k5-3_vzglzk.png"
    ],

    specs: {
      controllers: [
        "Raspberry Pi 5"
      ],

      sensors: [
        "Camera Module",
        "Ultrasonic Sensor",
        "PIR Motion Sensor",
        "DHT22 Temperature & Humidity Sensor",
        "LDR Light Sensor",
        "GPS Module"
      ],

      display: [
        "7-inch Touchscreen Display"
      ],

      actuators: [
        "Relay Module",
        "Blue Status LED",
        "Buzzer"
      ],

      connectivity: [
        "Wi-Fi",
        "Bluetooth",
        "GPS",
        "Ethernet",
        "USB"
      ]
    },

    included: [
      {
        code: "RP5",
        title: "Raspberry Pi 5 Controller"
      },
      {
        code: "CAM",
        title: "AI Camera & Sensor Module"
      },
      {
        code: "LCD",
        title: "7-inch Touchscreen Display"
      }
    ],

    useCases: [
      {
        id: "01",
        title: "Wildlife Animal Detection & Monitoring"
      },
      {
        id: "02",
        title: "Forest Surveillance and Human-Wildlife Conflict Prevention"
      }
    ]
  },
  {
    id: "innovator-kit",

tier: "TIER 03",

badge: "INTERMEDIATE",

category: "Innovation",

badgeColor: "#06b6d4",

isBestSeller: true,

title: "IoT Innovator Kit",

desc: "A comprehensive IoT learning and prototyping kit featuring Raspberry Pi Pico and ESP32 with a wide range of sensors, displays, relays, and communication interfaces. Designed for hands-on embedded systems, IoT application development, and rapid prototyping.",

tags: [
  "Raspberry Pi Pico",
  "ESP32",
  "IoT",
  "Embedded Systems",
  "Sensor Interfacing",
  "Automation"
],

thumbnails: [
  "https://res.cloudinary.com/dwumernfk/image/upload/v1786096721/k6-1_j0ub0f.png",
  "https://res.cloudinary.com/dwumernfk/image/upload/v1786096719/k6-2_atvdpa.png",
  "https://res.cloudinary.com/dwumernfk/image/upload/v1786096720/k6-3_xzw4e7.png"
],

specs: {

  controllers: [
    "Raspberry Pi Pico",
    "ESP32 Development Board"
  ],

  sensors: [
    "HC-SR04 Ultrasonic Sensor",
    "Flame Sensor",
    "PIR Motion Sensor",
    "Soil Moisture Sensor",
    "Water Level Sensor",
    "MAX30102 Pulse Oximeter & Heart Rate Sensor",
    "LDR Light Sensor",
    "DHT11 Temperature & Humidity Sensor",
    "Sound Sensor",
    "MQ-2 Gas Sensor"
  ],

  display: [
    "0.96-inch OLED Display",
    "RGB Status LEDs"
  ],

  actuators: [
    "Dual Relay Module",
    "Active Buzzer"
  ],

  connectivity: [
    "USB Programming",
    "Wi-Fi (ESP32)",
    "Bluetooth (ESP32)",
    "GPIO Headers",
    "I2C",
    "SPI",
    "UART",
    "Breadboard Prototyping Area"
  ]

},

included: [

  {
    code: "HW",
    title: "IoT Innovator Trainer Board",
    desc: "Integrated Raspberry Pi Pico and ESP32 development platform."
  },

  {
    code: "CD",
    title: "Sample Programs",
    desc: "Ready-to-use examples for sensors, displays, relays, and IoT applications."
  },

  {
    code: "SP",
    title: "Technical Support",
    desc: "Documentation, tutorials, and technical assistance."
  }

],

useCases: [

  {
    id: "01",
    title: "Embedded Systems Training",
    desc: "Learn Raspberry Pi Pico and ESP32 programming with practical hardware experiments."
  },

  {
    id: "02",
    title: "IoT Sensor Integration",
    desc: "Develop smart monitoring systems using environmental, motion, gas, and water sensors."
  },

  {
    id: "03",
    title: "Automation Projects",
    desc: "Build relay-controlled automation, alarm systems, and smart control applications."
  },

  {
    id: "04",
    title: "Rapid Prototyping",
    desc: "Prototype IoT products quickly using the integrated breadboard and onboard peripherals."
  }

]
  },
  {
    id: "pro",

tier: "TIER 04",

badge: "ADVANCED",

category: "Advanced",

badgeColor: "#8b5cf6",

title: "IoT Innovator Pro Kit",

desc: "An advanced multi-controller IoT development kit featuring Raspberry Pi Pico, STM32, and Raspberry Pi development platform support with a rich collection of sensors, actuators, and communication interfaces. Designed for advanced embedded systems, robotics, industrial IoT, and rapid product prototyping.",

tags: [
  "Raspberry Pi Pico",
  "STM32",
  "Raspberry Pi",
  "Embedded Systems",
  "Industrial IoT",
  "Automation"
],

thumbnails: [
  "https://res.cloudinary.com/dwumernfk/image/upload/v1786096721/k7-1_ye7zix.png",
  "https://res.cloudinary.com/dwumernfk/image/upload/v1786096722/k7-2_s4ziqa.png",
  "https://res.cloudinary.com/dwumernfk/image/upload/v1786096722/k7-3_npt0xt.png"
],

specs: {

  controllers: [
    "Raspberry Pi Pico",
    "STM32 Development Board",
    "Raspberry Pi Interface"
  ],

  sensors: [
    "HC-SR04 Ultrasonic Sensor",
    "Flame Sensor",
    "PIR Motion Sensor",
    "IR Sensor",
    "DHT11 Temperature & Humidity Sensor",
    "MQ-2 Gas Sensor",
    "DS18B20 Temperature Sensor",
    "Soil Moisture Sensor",
    "Rain Sensor"
  ],

  display: [
    "0.96-inch OLED Display",
    "Multi-color Status LEDs"
  ],

  actuators: [
    "Relay Module",
    "Servo Motor",
    "DC Fan",
    "Active Buzzer"
  ],

  connectivity: [
    "USB Programming",
    "GPIO Headers",
    "UART",
    "SPI",
    "I2C",
    "Breadboard Prototyping Area"
  ]

},

included: [

  {
    code: "HW",
    title: "IoT Innovator Pro Trainer",
    desc: "Integrated Raspberry Pi Pico, STM32, and Raspberry Pi compatible development platform."
  },

  {
    code: "CD",
    title: "Complete Source Codes",
    desc: "Ready-to-use examples for sensors, actuators, and embedded applications."
  },

  {
    code: "SP",
    title: "Technical Support",
    desc: "Documentation, tutorials, and engineering assistance."
  }

],

useCases: [

  {
    id: "01",
    title: "Advanced Embedded Systems",
    desc: "Develop applications using Raspberry Pi Pico, STM32, and Raspberry Pi platforms."
  },

  {
    id: "02",
    title: "Industrial IoT Projects",
    desc: "Build smart monitoring, automation, and industrial sensing applications."
  },

  {
    id: "03",
    title: "Robotics & Automation",
    desc: "Control relays, servo motors, fans, and multiple sensors for robotic systems."
  },

  {
    id: "04",
    title: "Rapid Product Prototyping",
    desc: "Prototype embedded and IoT solutions quickly using the integrated hardware modules."
  }

]
  }
];

// ===== SUB-COMPONENT: INTERACTIVE ASSEMBLY MODAL (COMPACT) =====
export function KitModal({ selectedKit, closeModal }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState("specifications");

  const [zoomStyle, setZoomStyle] = useState({ scale: 1, originX: "50%", originY: "50%" });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const viewportRef = useRef(null);

  useEffect(() => {
    if (selectedKit) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedKit]);

  const resetZoom = () => {
    setZoomStyle({ scale: 1, originX: "50%", originY: "50%" });
    setCursorPos((prev) => ({ ...prev, visible: false }));
  };

  const handleThumbSelect = (idx) => {
    setActiveThumb(idx);
    resetZoom();
  };

  const handleMouseMove = (e) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setCursorPos({ x, y, visible: true });
    setZoomStyle({
      scale: 2.2,
      originX: `${xPercent}%`,
      originY: `${yPercent}%`
    });
  };

  const handleMouseLeave = () => {
    resetZoom();
  };

  if (!selectedKit) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] border border-sky-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto mt-16 bg-slate-950"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full border border-white/10 text-slate-400 hover:text-white transition-all bg-slate-950/80"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-2 flex md:flex-col gap-2 order-2 md:order-1">
              {selectedKit.thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  className={`relative rounded-lg overflow-hidden border transition-all ${activeThumb === idx ? "border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.3)]" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  onClick={() => handleThumbSelect(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-14 object-cover" />
                </button>
              ))}
            </div>

            <div
              className="md:col-span-10 relative overflow-hidden cursor-crosshair rounded-xl border border-white/10 h-56 sm:h-72 order-1 md:order-2 flex items-center justify-center bg-white"
              ref={viewportRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="w-full h-full transition-transform duration-100 ease-out flex items-center justify-center"
                style={{
                  transform: `scale(${zoomStyle.scale})`,
                  transformOrigin: `${zoomStyle.originX} ${zoomStyle.originY}`
                }}
              >
                <img src={selectedKit.thumbnails[activeThumb]} alt="Kit Assembly Main" className="max-w-full max-h-full object-contain p-2" />
              </div>

              {cursorPos.visible && (
                <div
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-sky-400 bg-sky-500/20 flex items-center justify-center text-sky-500 shadow-md"
                  style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y}px`
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-sky-400 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                {selectedKit.tier}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-3 mt-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{selectedKit.title}</h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["School Students", "Foundational Training", "Arduino Labs", "Classic Edition"].map((tag, i) => (
                <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md border border-white/10 text-slate-300 bg-white/5">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 border-b border-white/10 pb-2">
              {["specifications", "included", "usecases", "compare"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${activeTab === tab
                      ? "bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "specifications" && "Specifications"}
                  {tab === "included" && "What's Included"}
                  {tab === "usecases" && "Use Cases"}
                  {tab === "compare" && "Compare All"}
                </button>
              ))}
            </div>

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(selectedKit.specs).map(([key, list], idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-white/10 bg-slate-900/30">
                    <h3 className="text-xs font-bold text-sky-400 capitalize mb-2 tracking-wider">{key}</h3>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {list.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-sky-400 font-bold">›</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "included" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedKit.included?.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl border border-white/10 bg-slate-900/30 flex items-start gap-3">
                    <div className="px-2.5 py-1 rounded-md border border-sky-500/30 text-sky-400 font-mono font-bold text-[11px]">
                      {item.code}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "usecases" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedKit.useCases?.map((uc, i) => (
                  <div key={i} className="p-3 rounded-xl border border-white/10 bg-slate-900/30">
                    <span className="text-[9px] font-bold text-sky-400 tracking-wider">USE CASE {uc.id}</span>
                    <h4 className="text-xs font-bold text-white mt-0.5 mb-1">{uc.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{uc.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "compare" && (
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="text-slate-400 uppercase tracking-wider border-b border-white/10 bg-slate-950/40">
                    <tr>
                      <th className="p-2.5">Feature</th>
                      <th className="p-2.5">LEGACY</th>
                      <th className="p-2.5">ESSENTIAL</th>
                      <th className="p-2.5">LITE</th>
                      <th className="p-2.5">EXPERIENCE</th>
                      <th className="p-2.5">PRO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {COMPARISON_DATA.map((section, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <tr className="text-sky-400 font-bold uppercase text-[9px] tracking-widest border-b border-white/10 bg-slate-950/20">
                          <td colSpan="6" className="p-2 px-3">{section.category}</td>
                        </tr>
                        {section.items.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/5">
                            <td className="p-2.5 font-medium text-white">{row.name}</td>
                            <td className="p-2.5">{row.legacy ? <span className="text-slate-300 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                            <td className="p-2.5">{row.essential ? <span className="text-sky-400 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                            <td className="p-2.5">{row.lite ? <span className="text-sky-400 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                            <td className="p-2.5">{row.experience ? <span className="text-sky-400 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                            <td className="p-2.5">{row.pro ? <span className="text-sky-400 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ===== MAIN APP COMPONENT =====
export default function App() {
  const [selectedKit, setSelectedKit] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All Kits");

  const openModal = (kit) => setSelectedKit(kit);
  const closeModal = () => setSelectedKit(null);

  const filteredKits = KITS.filter((kit) => {
    if (activeFilter === "All Kits") return true;
    return kit.category === activeFilter;
  });

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-sky-500 selection:text-slate-950 relative overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center relative z-10 mt-24">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          IoT & Robotics Development Kits <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-500">
            for Innovation
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
          Classic legacy boards to advanced multi-controller stations. Designed in Hyderabad for Indian classrooms and labs.
        </p>

        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-full border border-white/10">
          {["All Kits"].map((filter) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${activeFilter === filter
                  ? "bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredKits.map((kit) => (
            <div
              key={kit.id}
              onClick={() => openModal(kit)}
              className="group relative rounded-2xl border border-white/10 hover:border-sky-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-slate-900/40 shadow-xl"
            >
              <div className="relative w-full h-40 bg-slate-950/60 overflow-hidden border-b border-white/10 flex items-center justify-center">
                <img
                  src={kit.thumbnails[2]}
                  alt={kit.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 px-2.5 py-1 rounded-full bg-slate-950/80 border border-sky-500/30 backdrop-blur-md">
                    {kit.tier}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-base font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                    {kit.title}
                  </h2>
                  <p className="text-slate-400 text-xs mb-3 leading-relaxed line-clamp-2">
                    {kit.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {kit.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded text-slate-300 border border-white/10 bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                    <button
                      className="py-1.5 px-2 rounded-xl border border-white/10 text-slate-200 text-xs font-semibold transition-all hover:border-sky-500/30 hover:bg-white/5"
                      onClick={(e) => { e.stopPropagation(); openModal(kit); }}
                    >
                      Specs
                    </button>
                    <button
                      className="py-1.5 px-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all"
                      onClick={(e) => { e.stopPropagation(); openModal(kit); }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <KitModal selectedKit={selectedKit} closeModal={closeModal} />
    </div>
  );
}

