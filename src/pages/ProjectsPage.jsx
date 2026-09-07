import React, { useState } from 'react';
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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HARD_COPY_FORM_URL } from '../lib/forms';

export { HARD_COPY_FORM_URL };

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
    fee: "₹10,000/- per Training Program",
    mechanism: "Fee collected by the participating school/institute and deposited in the designated MITS account.",
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
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 mt-24" style={{ background: "rgba(15,118,110,0.08)", border: "1px solid rgba(15,118,110,0.22)", color: "#0F766E" }}>
            <Sparkles className="w-3.5 h-3.5" />
            Framework & Offerings
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Training &amp;{" "}
            <span className="text-accent">Financial Models</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Comprehensive skill development modules and flexible financial structures designed for academic institutions and stakeholders.
          </p>
        </div>

        {/* ── 1. Training Models Table ── */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <span>Training Models</span>
          </h3>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(17,24,39,0.10)",
              boxShadow: "0 8px 24px rgba(17,24,39,0.06)",
            }}
          >
            <div className="px-5 py-3.5 text-xs text-gray-700 leading-relaxed bg-[#FFFAF5] border-b border-gray-200/80 flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-accent">Instruction: </span>
                <span className="hidden sm:inline">Download the common registration form, take a printout, fill it manually, scan the completed form, and upload the scanned copy while completing the Google Registration Form.</span>
                <span className="sm:hidden inline">Download, print and fill the form. Scan the completed form and upload it in the Google Registration Form.</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" role="table" aria-label="Training modules">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(17,24,39,0.08)", background: "#FFFAF5" }}>
                    {["Module", "Training Model", "Target Participants", "Duration", "Major Activities", "Expected Deliverables", "Hard Copy Form Download", ""].map((h) => (
                      <th
                        key={h}
                        className="py-3.5 px-5 text-[11px] font-bold tracking-[0.08em] uppercase"
                        style={{ color: "#0F766E" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programModules.map((item, idx) => (
                    <tr
                      key={idx}
                      className="transition-colors duration-150"
                      style={{ borderBottom: "1px solid rgba(17,24,39,0.06)" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#FFFAF5"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span
                          className="inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold font-mono"
                          style={{ background: "rgba(15,118,110,0.08)", color: "#0F766E", border: "1px solid rgba(15,118,110,0.20)" }}
                        >
                          {item.id}
                        </span>
                      </td>
                      <td className="py-4 px-5 font-semibold text-sm text-gray-900">{item.model}</td>
                      <td className="py-4 px-5 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                          <span>{item.participants}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#0F766E" }}>
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{item.duration}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm text-gray-600 leading-relaxed max-w-[220px]">
                        {item.activities}
                      </td>
                      <td className="py-4 px-5 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{item.deliverables}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <a
                          href={HARD_COPY_FORM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          style={{ background: "rgba(15,118,110,0.08)", color: "#0F766E", border: "1px solid rgba(15,118,110,0.22)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(15,118,110,0.15)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(15,118,110,0.08)"; }}
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download Form
                        </a>
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <button
                          onClick={handleBookClick}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          style={{ background: "rgba(15,118,110,0.08)", color: "#0F766E", border: "1px solid rgba(15,118,110,0.22)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(15,118,110,0.15)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(15,118,110,0.08)"; }}
                        >
                          Book
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

        {/* ── 2. Financial Models Table ── */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-accent" />
            <span>Financial Models</span>
          </h3>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(17,24,39,0.10)",
              boxShadow: "0 8px 24px rgba(17,24,39,0.06)",
            }}
          >
            <div className="px-5 py-3.5 text-xs text-gray-600 leading-relaxed" style={{ background: "#FFFAF5", borderBottom: "1px solid rgba(17,24,39,0.08)" }}>
              <span className="font-semibold text-accent">Note:</span>{" "}
              The applicable model may be selected based on the nature, duration, number of participants, use of laboratory facilities, and scope of the programme.
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" role="table" aria-label="Financial models">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(17,24,39,0.08)", background: "#FFFAF5" }}>
                    {["S.No.", "Financial Model", "Proposed Fee", "Payment Mechanism", "Modules", ""].map((h) => (
                      <th
                        key={h}
                        className="py-3.5 px-5 text-[11px] font-bold tracking-[0.08em] uppercase"
                        style={{ color: "#0F766E" }}
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
                      className="transition-colors duration-150"
                      style={{ borderBottom: "1px solid rgba(17,24,39,0.06)" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#FFFAF5"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td className="py-4 px-5 font-bold font-mono text-sm" style={{ color: "#0F766E" }}>
                        {item.sno}.
                      </td>
                      <td className="py-4 px-5 font-semibold text-sm text-gray-900">{item.model}</td>
                      <td className="py-4 px-5 font-bold text-sm whitespace-nowrap" style={{ color: "#0F766E" }}>
                        {item.fee}
                      </td>
                      <td className="py-4 px-5 text-sm text-gray-600 leading-relaxed max-w-[240px]">
                        {item.mechanism}
                      </td>
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold font-mono"
                          style={{ background: "rgba(15,118,110,0.08)", color: "#0F766E", border: "1px solid rgba(15,118,110,0.20)" }}
                        >
                          {item.modules}
                        </span>
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <button
                          onClick={handleBookClick}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          style={{ background: "rgba(15,118,110,0.08)", color: "#0F766E", border: "1px solid rgba(15,118,110,0.22)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(15,118,110,0.15)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(15,118,110,0.08)"; }}
                        >
                          Book
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