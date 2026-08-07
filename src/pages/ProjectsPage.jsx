import React, { useState } from 'react';
import { 
  BookOpen, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Users, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const trainingModules = [
  {
    id: "M1",
    model: "School Student Hands-on Workshop",
    participants: "Students of Classes VI–XII",
    duration: "One day (6 Hrs)",
    activities: "Introduction to IoT, sensors, Arduino/ESP32, demonstrations and mini-projects",
    deliverables: "Hands-on exposure and participation certificate"
  },
  {
    id: "M2",
    model: "Short-Term IoT Training Programme",
    participants: "School students",
    duration: "2–5 days",
    activities: "IoT, electronics, sensors, programming, dashboards and project development",
    deliverables: "Training certificate and mini-project"
  },
  {
    id: "M3",
    model: "Summer/Winter Technology Camp",
    participants: "School students",
    duration: "5–10 days",
    activities: "IoT, AI, Robotics, Embedded Systems and innovation projects",
    deliverables: "Project demonstration and completion certificate"
  },
  {
    id: "M4",
    model: "Train-the-Teacher (ToT) Programme",
    participants: "Science, Math, Computer Science, STEM & Innovation teachers",
    duration: "2–5 days",
    activities: "Teacher capacity building, practical activities and project development",
    deliverables: "Teacher certificate, training resources and mentoring"
  },
  {
    id: "M5",
    model: "School IoT/STEM Innovation Club Support",
    participants: "Participating schools",
    duration: "Annual / Continuous",
    activities: "Club establishment, activity planning and technical mentoring",
    deliverables: "Functional school innovation club and student projects"
  },
  {
    id: "M6",
    model: "School Project Mentoring Programme",
    participants: "School students and teachers",
    duration: "Need-based",
    activities: "Problem identification, design thinking, prototype development and mentoring",
    deliverables: "Working prototype and project presentation"
  },
  {
    id: "M7",
    model: "MITS Laboratory Exposure Programme",
    participants: "School students and teachers",
    duration: "Half day / One day",
    activities: "IoT laboratory visit and demonstrations",
    deliverables: "Technology exposure and participation certificate"
  },
  {
    id: "M8",
    model: "IoTify School Innovation Challenge",
    participants: "Participating schools",
    duration: "Annual",
    activities: "Project competition, prototype demonstration and expert evaluation",
    deliverables: "Recognition, certificates and project showcase"
  },
  {
    id: "M9",
    model: "Government School Technology Outreach Programme",
    participants: "Students & teachers of selected Gov. Schools",
    duration: "Half day to two days",
    activities: "Technology awareness, demonstrations and hands-on activities",
    deliverables: "Free technology exposure and outreach support"
  }
];

const financialModels = [
  {
    sno: "1",
    model: "Student-wise Hands-on Training Model",
    fee: "₹200 per student",
    mechanism: "Fee collected by the participating school/institute and deposited in the designated MITS account.",
    modules: "M1"
  },
  {
    sno: "2",
    model: "School-wise Workshop Model",
    fee: "₹8,000–₹12,000 per school",
    mechanism: "Participating school deposits the approved programme fee directly into the MITS account.",
    modules: "M2, M3"
  },
  {
    sno: "3",
    model: "Basic Train-the-Teacher Model",
    fee: "₹10,000 per school",
    mechanism: "School deposits the approved amount into the designated MITS account.",
    modules: "M2, M4"
  },
  {
    sno: "4",
    model: "Standard Train-the-Teacher Model",
    fee: "₹15,000 per school",
    mechanism: "School deposits the approved amount into the designated MITS account.",
    modules: "M2, M4"
  },
  {
    sno: "5",
    model: "Advanced Train-the-Teacher Model",
    fee: "₹25,000–₹35,000 per school",
    mechanism: "School deposits the approved amount into the designated MITS account.",
    modules: "M4"
  },
  {
    sno: "6",
    model: "Annual IoTfy Partner School Model",
    fee: "₹15,000–₹50,000 per year",
    mechanism: "Annual institutional contribution through approved MITS financial mechanism.",
    modules: "-"
  },
  {
    sno: "7",
    model: "Hybrid Model",
    fee: "Student + School + CSR support",
    mechanism: "All institutional receipts routed through the designated MITS account.",
    modules: "M1–M9"
  },
  {
    sno: "8",
    model: "Government School Social Outreach Model",
    fee: "Nil / Free of Cost",
    mechanism: "Supported through institutional outreach provisions, CSR, sponsorships, and grants.",
    modules: "M1"
  }
];

export default function TrainingAndFinancialModels({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('training');

  const handleBookClick = () => {
    if (onNavigate) {
      onNavigate('book');
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="text-gray-100 py-16 px-4 sm:px-6 lg:px-8 relative font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4 mt-24">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Framework & Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Proposed <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Training & Financial Models</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Comprehensive skill development modules and flexible financial structures designed for academic institutions and stakeholders.
          </p>

          {/* Pill Switcher */}
          <div className="flex justify-center mt-8">
            <div className="bg-[#090d16]/80 p-1.5 rounded-full border border-cyan-500/20 inline-flex shadow-[0_0_25px_rgba(6,182,212,0.07)] backdrop-blur-md">
              <button
                onClick={() => setActiveTab('training')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'training'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Training Models
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'financial'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                Financial Models
              </button>
            </div>
          </div>
        </div>

        {/* Content Box Container */}
        <div className="bg-[#090d16]/60 border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* TRAINING MODELS TAB */}
          {activeTab === 'training' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cyan-500/20 bg-[#0d1322]/80 text-cyan-400 text-xs sm:text-sm uppercase tracking-wider">
                    <th className="py-4 px-6 font-bold">Module</th>
                    <th className="py-4 px-6 font-bold">Training Model</th>
                    <th className="py-4 px-6 font-bold">Target Participants</th>
                    <th className="py-4 px-6 font-bold">Duration</th>
                    <th className="py-4 px-6 font-bold">Major Activities</th>
                    <th className="py-4 px-6 font-bold">Expected Deliverables</th>
                    <th className="py-4 px-6 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-500/10 text-sm text-gray-300">
                  {trainingModules.map((item, idx) => (
                    <tr key={idx} className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-4 px-6 font-bold text-cyan-400 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono">
                          {item.id}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-white">{item.model}</td>
                      <td className="py-4 px-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{item.participants}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-cyan-300">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.duration}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-400 leading-relaxed">{item.activities}</td>
                      <td className="py-4 px-6 text-gray-300">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item.deliverables}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={handleBookClick}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold transition-all inline-flex items-center gap-1.5 group/btn shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        >
                          <span>Book</span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* FINANCIAL MODELS TAB */}
          {activeTab === 'financial' && (
            <div>
              <div className="p-4 sm:p-6 bg-[#0d1322]/50 border-b border-cyan-500/20 text-xs sm:text-sm text-gray-400 leading-relaxed">
                <span className="text-cyan-400 font-semibold">Note:</span> The applicable model may be selected based on the nature, duration, number of participants, use of laboratory facilities, and scope of the programme.
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-cyan-500/20 bg-[#0d1322]/80 text-cyan-400 text-xs sm:text-sm uppercase tracking-wider">
                      <th className="py-4 px-6 font-bold w-16">S.No.</th>
                      <th className="py-4 px-6 font-bold">Financial Model</th>
                      <th className="py-4 px-6 font-bold">Proposed Fee / Contribution</th>
                      <th className="py-4 px-6 font-bold">Proposed Payment Mechanism</th>
                      <th className="py-4 px-6 font-bold text-center">Modules Cover</th>
                      <th className="py-4 px-6 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-500/10 text-sm text-gray-300">
                    {financialModels.map((item, idx) => (
                      <tr key={idx} className="hover:bg-cyan-950/20 transition-colors">
                        <td className="py-4 px-6 font-bold text-cyan-400 font-mono">{item.sno}.</td>
                        <td className="py-4 px-6 font-semibold text-white">{item.model}</td>
                        <td className="py-4 px-6 font-bold text-cyan-300 whitespace-nowrap">{item.fee}</td>
                        <td className="py-4 px-6 text-gray-400 leading-relaxed">{item.mechanism}</td>
                        <td className="py-4 px-6 text-center whitespace-nowrap">
                          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold font-mono">
                            {item.modules}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button
                            onClick={handleBookClick}
                            className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold transition-all inline-flex items-center gap-1.5 group/btn shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                          >
                            <span>Book</span>
                            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}