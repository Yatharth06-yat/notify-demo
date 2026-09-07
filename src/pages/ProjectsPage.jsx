import React from 'react';
import {
  BookOpen,
  IndianRupee,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Download,
  FileText,
  Calendar,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HARD_COPY_FORM_URL, M1_FORM_URL, M2_FORM_URL, M3_FORM_URL } from '../lib/forms';

export { HARD_COPY_FORM_URL, M1_FORM_URL, M2_FORM_URL, M3_FORM_URL };

export const programModules = [
  {
    id: "M1",
    model: "School Student Hands-on Workshop",
    participants: "Students of Classes VI–XII",
    duration: "01/02 Day workshop (06 hrs/day)",
    lastDate: "20.Sep.2026",
    location: "At school premises Or MITS-Labs",
    tracks: [
      {
        title: "Code & Create with Arduino",
        description: "IoT • Sensors • Smart Devices • Robot",
      },
      {
        title: "Connect & Create with Embedded Electronics",
        description: "IoT • Wi-Fi • Smart Applications",
      },
      {
        title: "Code, Control & Innovate with Pico Python",
        description: "Python • IoT • AI • Automation",
      },
    ],
    deliverables: "Hands-on exposure and participation certificate",
  },
  {
    id: "M2",
    model: "Train-the-Teacher (ToT) Programme",
    participants: "Science, Mathematics, Computer Science, STEM & Innovation teachers",
    duration: "03 Days",
    lastDate: "Mutually Decided",
    location: "At MITS Labs Or School Premises",
    activities: "Teacher capacity building, practical activities and project development",
    deliverables: "Teacher certificate, training resources and mentoring",
  },
  {
    id: "M3",
    model: "School-Level Competitions and Hackathon",
    participants: "Classes 7th - 12th",
    duration: "02 Days",
    lastDate: "December / June",
    location: "At MITS Labs Or School Premises",
    activities: "Problem Statement Prototype Idea Pitch, team formation, problem identification, hardware development, testing, presentation and jury evaluation",
    deliverables: "Recognition, certificates and project showcase",
  },
];

export const detailedModules = [
  {
    module: "M1",
    program: "Student Workshop",
    targetClass: "Class 6th – 12th",
    title: "Hands-on Workshop on IoT Kits",
    note: "[Student can choose any one]",
    tracks: [
      {
        name: "Code & Create with Arduino",
        activities: [
          "LED Blinking",
          "Traffic Light",
          "Smart Street Light",
          "Digital Dice",
          "LDR Light Sensor",
          "Temperature Monitor",
          "Ultrasonic Distance Meter",
          "Servo Control",
          "DC Motor Control",
          "Buzzer Alarm",
          "Smart Doorbell",
          "Parking Sensor",
          "Obstacle-Avoiding Robot",
          "Mini Robotics",
        ],
        duration: "01/02 Day workshop [06hrs/day]",
        lastDate: "30.Sep.2026",
      },
      {
        name: "Connect & Create with Embedded Electronics",
        activities: [
          "IoT Weather Station",
          "Wi-Fi LED Control",
          "Smart Home",
          "Smart Plant Monitoring",
          "Soil Moisture Sensor",
          "PIR Security Alarm",
          "RFID Door Lock",
          "Bluetooth Control",
          "Remote Appliance Control",
          "Smart Dustbin",
          "Gas/Smoke Alert",
          "IoT Data Monitoring",
          "Sensor Dashboard",
          "Mini IoT Project",
        ],
        duration: "01/02 Day workshop [06hrs/day]",
        lastDate: "20.Sep.2026",
      },
      {
        name: "Code, Control & Innovate with Pico Python",
        activities: [
          "Python Basics",
          "LED Programming",
          "Sensor Reading",
          "Temperature-Based Fan",
          "Automatic Light Control",
          "Servo Control",
          "Motor Control",
          "Digital Alarm",
          "Data Logging",
          "IoT Monitoring",
          "Python Mini Games",
          "Smart Security",
          "AI-Based Sensing",
          "Robot Control",
          "Automation Project",
        ],
        duration: "01/02 Day workshop [06hrs/day]",
        lastDate: "30.Sep.2026",
      },
    ],
  },
  {
    module: "M2",
    program: "Train-the-Teacher (ToT) Programme",
    targetClass: "Science, Mathematics, Computer Science, STEM & Innovation teachers",
    title: "Teacher Capacity Building & Mentoring",
    activities: [
      "Learn hands-on coding and electronics",
      "Develop IoT and robotics projects",
      "Use Python and AI concepts",
      "Learn project-based teaching methods",
      "Develop classroom-ready STEM activities",
      "Guide students in innovation and prototype development",
      "Create and mentor school-level technology projects",
    ],
    duration: "03 Days at MITS Labs Or School Premises",
    lastDate: "Mutually Decided",
  },
  {
    module: "M3",
    program: "School-Level Competitions and Hackathon",
    targetClass: "Classes 7th – 12th (Classes 6–8, 9–10 & 11–12)",
    title: "Problem Statement • Prototype • Idea Pitch",
    description:
      "School-Level Competitions and Hackathon can be organized featuring age-appropriate challenges in STEM, Coding, Arduino, Robotics, IoT, Artificial Intelligence, and Innovation. Includes model-making, coding challenges, sensor-based projects, robot challenges, smart-device development, project exhibitions, and mini-hackathons where students identify real-world problems, develop prototypes, and present innovative technology-based solutions.",
    duration: "02 Days at MITS Labs Or School Premises",
    lastDate: "December / June",
  },
];

export const pricingModels = [
  {
    sno: "1",
    model: "Student Workshop (At School Premises)",
    fee: "₹350/- per student",
    mechanism: "Fee collected by the participating school/institute and deposited in the designated MITS account.",
    batchSize: "50 Students per Workshop for One day",
    modules: "M1",
  },
  {
    sno: "2",
    model: "Student Workshop (At MITS Labs)",
    fee: "₹250/- per student",
    mechanism: "Individual have to deposited the Fee in the MITS-Account",
    batchSize: "30 Students per Workshop for One day",
    modules: "M1",
  },
  {
    sno: "3",
    model: "Train-the-Teacher (ToT) Programme (At School Premises)",
    fee: "₹15,000/- per Training program",
    mechanism: "Fee collected by the participating school/institute and deposited in the designated MITS account.",
    batchSize: "Min. 05- Max.15 Faculty Per program For 2-3 days Workshop",
    modules: "M2",
  },
  {
    sno: "4",
    model: "Train-the-Teacher (ToT) Programme (At MITS Labs)",
    fee: "₹1,000/- per Teacher/Training",
    mechanism: "Fee Deposited by the Participating Teacher in MITS-Account",
    batchSize: "Min. 05- Max.15 Faculty Per program For 2-3 days Workshop",
    modules: "M2",
  },
  {
    sno: "5",
    model: "School-Level Competitions and Hackathon (At School Premises)",
    fee: "₹500/- Registration per Student",
    mechanism: "Fee collected by the participating school/institute and deposited in the designated MITS account.",
    batchSize: "Classes 7th-12th",
    modules: "M3",
  },
  {
    sno: "6",
    model: "School-Level Competitions and Hackathon (At MITS Labs)",
    fee: "₹400/- Registration per Student",
    mechanism: "Individual have to deposited the Fee in the MITS-Account",
    batchSize: "Classes 7th-12th",
    modules: "M3",
  },
];

export default function TrainingAndFinancialModels({ onNavigate }) {
  const handleBookClick = () => {
    if (onNavigate) {
      onNavigate('book');
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative"
      style={{ background: "#FFF2E5" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,118,110,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 mt-20" style={{ background: "rgba(15,118,110,0.08)", border: "1px solid rgba(15,118,110,0.22)", color: "#0F766E" }}>
            <Sparkles className="w-3.5 h-3.5" />
            Modules &amp; Hardcopy Forms
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            IoTify Lab <span className="text-accent">Program Modules</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Detailed breakdown of M1, M2 &amp; M3 training tracks, hands-on activities, schedules, and hard-copy registration forms.
          </p>
        </div>

        {/* ── Instructions Banner ── */}
        <div className="mb-8 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 bg-white border border-[#0F766E]/20 shadow-md">
          <FileText className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <span className="font-bold text-[#0F766E]">Hard Copy Form Instruction: </span>
            Download the hardcopy registration form for your module (M1, M2, or M3), fill it manually with parent/school consent, scan the completed form, and upload it when registering online.
          </div>
        </div>

        {/* ── Detailed Modules Table ── */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <span>Modules Overview (M1, M2, M3)</span>
          </h3>

          <div
            className="rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" role="table" aria-label="Program modules details">
                <thead>
                  <tr style={{ borderBottom: "2px solid rgba(15,118,110,0.2)", background: "#FFFAF5" }}>
                    <th className="py-4 px-4 sm:px-5 text-xs font-extrabold tracking-wider uppercase text-[#0F766E] w-16 text-center">Module</th>
                    <th className="py-4 px-4 sm:px-5 text-xs font-extrabold tracking-wider uppercase text-[#0F766E] min-w-[140px]">Program</th>
                    <th className="py-4 px-4 sm:px-5 text-xs font-extrabold tracking-wider uppercase text-[#0F766E] min-w-[180px]">Modules / Offerings</th>
                    <th className="py-4 px-4 sm:px-5 text-xs font-extrabold tracking-wider uppercase text-[#0F766E] min-w-[280px]">Hands-on Activities / Key Offerings</th>
                    <th className="py-4 px-4 sm:px-5 text-xs font-extrabold tracking-wider uppercase text-[#0F766E] min-w-[140px]">Proposed Duration</th>
                    <th className="py-4 px-4 sm:px-5 text-xs font-extrabold tracking-wider uppercase text-[#0F766E] min-w-[110px]">Last Date to Apply</th>
                    <th className="py-4 px-4 sm:px-5 text-xs font-extrabold tracking-wider uppercase text-[#0F766E] min-w-[140px] text-center">Details / Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">

                  {/* ── M1 ROW GROUP ── */}
                  {detailedModules[0].tracks.map((track, tIdx) => (
                    <tr
                      key={`m1-track-${tIdx}`}
                      className="hover:bg-[#FFFAF5] transition-colors"
                    >
                      {/* Show Module & Program only on first row of M1 */}
                      {tIdx === 0 && (
                        <>
                          <td
                            rowSpan={3}
                            className="py-5 px-4 font-extrabold text-base text-center align-top border-r border-gray-200 bg-[#FFFAF5]/60"
                          >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F766E] text-white font-mono font-bold text-sm shadow-md">
                              M1
                            </span>
                          </td>
                          <td
                            rowSpan={3}
                            className="py-5 px-5 font-bold text-gray-900 align-top border-r border-gray-200 bg-[#FFFAF5]/40"
                          >
                            <div className="text-sm font-bold text-[#0F766E]">{detailedModules[0].program}</div>
                            <div className="text-xs text-gray-500 font-medium mt-1">{detailedModules[0].targetClass}</div>
                            <div className="text-[11px] text-gray-400 mt-2 font-mono">{detailedModules[0].note}</div>
                          </td>
                        </>
                      )}

                      {/* Track Offerings */}
                      <td className="py-4 px-5 font-semibold text-gray-900 align-top border-r border-gray-200/80">
                        <div className="flex items-start gap-1.5">
                          <Zap className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                          <span>{track.name}</span>
                        </div>
                      </td>

                      {/* Hands-on Activities */}
                      <td className="py-4 px-5 text-gray-700 align-top border-r border-gray-200/80">
                        <div className="flex flex-wrap gap-1.5">
                          {track.activities.map((act, aIdx) => (
                            <span
                              key={aIdx}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-[#0F766E] border border-emerald-100"
                            >
                              • {act}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-5 font-medium text-[#0F766E] align-top border-r border-gray-200/80 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{track.duration}</span>
                        </div>
                      </td>

                      {/* Last Date */}
                      <td className="py-4 px-5 font-semibold text-gray-800 align-top border-r border-gray-200/80 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{track.lastDate}</span>
                        </div>
                      </td>

                      {/* Action / Details */}
                      <td className="py-4 px-5 align-top text-center">
                        <div className="flex flex-col gap-2 items-center min-w-[120px]">
                          <a
                            href={M1_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D6860] shadow-sm transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>M1 Form</span>
                          </a>
                          <button
                            onClick={handleBookClick}
                            className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                          >
                            <span>Book Now</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* ── M2 ROW ── */}
                  <tr className="hover:bg-[#FFFAF5] transition-colors">
                    <td className="py-5 px-4 font-extrabold text-base text-center align-top border-r border-gray-200 bg-[#FFFAF5]/60">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F766E] text-white font-mono font-bold text-sm shadow-md">
                        M2
                      </span>
                    </td>
                    <td className="py-5 px-5 font-bold text-gray-900 align-top border-r border-gray-200 bg-[#FFFAF5]/40">
                      <div className="text-sm font-bold text-[#0F766E]">{detailedModules[1].program}</div>
                      <div className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">{detailedModules[1].targetClass}</div>
                    </td>
                    <td className="py-4 px-5 font-semibold text-gray-900 align-top border-r border-gray-200/80">
                      {detailedModules[1].title}
                    </td>
                    <td className="py-4 px-5 text-gray-700 align-top border-r border-gray-200/80">
                      <ul className="space-y-1">
                        {detailedModules[1].activities.map((act, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1.5 text-xs text-gray-700">
                            <span className="text-[#0F766E] font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-5 font-medium text-[#0F766E] align-top border-r border-gray-200/80">
                      <div className="flex items-start gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{detailedModules[1].duration}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-semibold text-gray-800 align-top border-r border-gray-200/80 whitespace-nowrap">
                      {detailedModules[1].lastDate}
                    </td>
                    <td className="py-4 px-5 align-top text-center">
                      <div className="flex flex-col gap-2 items-center min-w-[120px]">
                        <a
                          href={M2_FORM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D6860] shadow-sm transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>M2 Form</span>
                        </a>
                        <button
                          onClick={handleBookClick}
                          className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                        >
                          <span>Book Now</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* ── M3 ROW ── */}
                  <tr className="hover:bg-[#FFFAF5] transition-colors">
                    <td className="py-5 px-4 font-extrabold text-base text-center align-top border-r border-gray-200 bg-[#FFFAF5]/60">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F766E] text-white font-mono font-bold text-sm shadow-md">
                        M3
                      </span>
                    </td>
                    <td className="py-5 px-5 font-bold text-gray-900 align-top border-r border-gray-200 bg-[#FFFAF5]/40">
                      <div className="text-sm font-bold text-[#0F766E]">{detailedModules[2].program}</div>
                      <div className="text-xs text-gray-500 font-medium mt-1">{detailedModules[2].targetClass}</div>
                    </td>
                    <td className="py-4 px-5 font-semibold text-gray-900 align-top border-r border-gray-200/80">
                      {detailedModules[2].title}
                    </td>
                    <td className="py-4 px-5 text-gray-700 align-top border-r border-gray-200/80 leading-relaxed text-xs">
                      {detailedModules[2].description}
                    </td>
                    <td className="py-4 px-5 font-medium text-[#0F766E] align-top border-r border-gray-200/80">
                      <div className="flex items-start gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{detailedModules[2].duration}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-semibold text-gray-800 align-top border-r border-gray-200/80 whitespace-nowrap">
                      {detailedModules[2].lastDate}
                    </td>
                    <td className="py-4 px-5 align-top text-center">
                      <div className="flex flex-col gap-2 items-center min-w-[120px]">
                        <a
                          href={M3_FORM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D6860] shadow-sm transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>M3 Form</span>
                        </a>
                        <button
                          onClick={handleBookClick}
                          className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                        >
                          <span>Book Now</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── 2. Financial Models Table ── */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-accent" />
            <span>Financial Models &amp; Fee Structure</span>
          </h3>
          <div
            className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-xl"
          >
            <div className="px-5 py-3.5 text-xs text-gray-600 leading-relaxed bg-[#FFFAF5] border-b border-gray-200">
              <span className="font-bold text-accent">Note:</span>{" "}
              The applicable financial model may be selected based on the nature, duration, number of participants, use of laboratory facilities, and scope of the programme.
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" role="table" aria-label="Financial models">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(17,24,39,0.08)", background: "#FFFAF5" }}>
                    {["S.No.", "Financial Model", "Proposed Fee", "Payment Mechanism", "Modules", ""].map((h) => (
                      <th
                        key={h}
                        className="py-3.5 px-5 text-[11px] font-bold tracking-[0.08em] uppercase text-[#0F766E]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingModels.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FFFAF5] transition-colors duration-150 border-b border-gray-100"
                    >
                      <td className="py-4 px-5 font-bold font-mono text-sm text-[#0F766E]">
                        {item.sno}.
                      </td>
                      <td className="py-4 px-5 font-semibold text-sm text-gray-900">{item.model}</td>
                      <td className="py-4 px-5 font-bold text-sm text-[#0F766E] whitespace-nowrap">
                        {item.fee}
                      </td>
                      <td className="py-4 px-5 text-sm text-gray-600 leading-relaxed max-w-[240px]">
                        {item.mechanism}
                      </td>
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20"
                        >
                          {item.modules}
                        </span>
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <button
                          onClick={handleBookClick}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D6860] shadow-sm transition-all"
                        >
                          <span>Book</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}