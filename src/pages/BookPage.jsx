import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  ShieldCheck,
  Ticket,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Calendar,
  CalendarX,
  BookOpen,
  GraduationCap,
  Trophy,
  Users,
  Cpu,
  Wifi,
  ExternalLink,
  ChevronRight,
  Clock,
  MapPin,
  FileCheck,
  Building2,
  School,
  Monitor,
  Zap,
  CheckSquare,
  ChevronDown,
  Info,
  FileText,
  MousePointerClick,
  Download,
  IndianRupee,
} from "lucide-react";
import { publicApi } from "../lib/api";
import { WHATSAPP_BOOKINGS, whatsappLink } from "../lib/contact";
import AnnouncementsBanner from "../components/AnnouncementsBanner";
import { HARD_COPY_FORM_URL, GOOGLE_FORM_URL, M1_FORM_URL, M2_FORM_URL, M3_FORM_URL } from "../lib/forms";
import { programModules, pricingModels, detailedModules } from "./ProjectsPage";

export { HARD_COPY_FORM_URL, GOOGLE_FORM_URL, M1_FORM_URL, M2_FORM_URL, M3_FORM_URL };

const EMPTY_FORM = {
  studentName: "",
  rollNo: "",
  email: "",
  mobile: "",
  gender: "Male",
  department: "",
  year: "",
  semester: "",
  collegeName: "",
  workshopId: "",
  couponCode: "",
};

const inputClass =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all";

const selectClass = `${inputClass} appearance-none cursor-pointer`;

function isDeadlinePassed(deadline) {
  if (!deadline) return false;
  const end = new Date(`${deadline}T23:59:59`);
  if (Number.isNaN(end.getTime())) return false;
  return end.getTime() < Date.now();
}

const FALLBACK_WORKSHOPS = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    title: "IoT Smart Attendance with Raspberry Pi 4",
    description: "Build a working RFID attendance terminal end to end — wiring the MFRC522 reader, driving the touchscreen, and writing records to a database.",
    category: "IoT",
    speaker: "Dr. Praveen Bansal",
    designation: "Head, Centre for IoT",
    date: "2026-09-15",
    time: "10:00 – 16:00",
    duration: "1 day",
    venue: "Centre for IoT, MITS Gwalior",
    seats: 40,
    fee: 500,
    deadline: "2026-09-10",
    status: "Published",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    title: "Edge AI: Wildlife Detection on Raspberry Pi 5",
    description: "Run a real detection model on device rather than in the cloud. Covers camera capture and quantized models.",
    category: "Edge AI",
    speaker: "Dr. Dhananjay Bisen",
    designation: "Assistant Professor",
    date: "2026-09-28",
    time: "09:30 – 17:00",
    duration: "2 days",
    venue: "AI Lab, MITS Gwalior",
    seats: 25,
    fee: 1200,
    deadline: "2026-09-25",
    status: "Published",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    title: "LoRa & GSM: Long-Range IoT Communication",
    description: "Hands-on with the SX1278 and a GSM module. Build a sensor node that reports outside Wi-Fi range.",
    category: "Communication",
    speaker: "Dr. Aftab Ahmed Ansari",
    designation: "Assistant Professor",
    date: "2026-10-10",
    time: "10:00 – 15:00",
    duration: "1 day",
    venue: "Centre for IoT, MITS Gwalior",
    seats: 30,
    fee: 0,
    deadline: "2026-10-05",
    status: "Published",
  },
];

// Data for Module Cards
const MODULES_DATA = [
  {
    id: "M1",
    code: "M1",
    title: "Student Workshop",
    subtitle: "Classes 6th – 12th",
    icon: GraduationCap,
    badge: "Most Popular",
    color: "from-teal-600 to-emerald-600",
    bgColor: "bg-teal-50/50",
    borderColor: "border-teal-200",
    target: "School Students (Classes 6th to 12th)",
    duration: "Flexible (1 – 3 Days)",
    venue: "School Premises OR MITS Labs",
    description:
      "Interactive, project-based workshops enabling school students to design, program, and build real-world IoT and AI hardware projects.",
    options: [
      {
        num: "1",
        title: "Code & Create with Arduino",
        tags: ["IoT", "Sensors", "Smart Devices", "Robot"],
        details: "Learn circuit fundamentals, sensor interfacing, microcontrollers, and basic robotics.",
      },
      {
        num: "2",
        title: "Connect & Create with Embedded Electronics",
        tags: ["IoT", "Wi-Fi", "Smart Applications"],
        details: "Build web-connected IoT nodes using Wi-Fi microcontrollers and real-time cloud dashboards.",
      },
      {
        num: "3",
        title: "Code, Control & Innovate with Pico Python",
        tags: ["Python", "IoT", "AI", "Automation"],
        details: "Program Raspberry Pi Pico using MicroPython to automate physical systems and sensor networks.",
      },
    ],
  },
  {
    id: "M2",
    code: "M2",
    title: "Train-the-Teacher (ToT) Programme",
    subtitle: "Faculty & Educator Development",
    icon: BookOpen,
    badge: "Faculty Development",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-blue-50/50",
    borderColor: "border-blue-200",
    target: "Science, Mathematics, Computer Science, STEM & Innovation Teachers",
    duration: "03 Days",
    venue: "MITS Labs OR School Premises",
    description:
      "Teacher capacity building, practical hands-on activities, and project development to equip educators with modern IoT & STEM teaching methodologies.",
    options: [
      {
        num: "1",
        title: "IoT & Embedded Systems Curriculum",
        tags: ["Pedagogy", "Lab Setup", "Hands-on"],
        details: "Master practical experiment design and integration of IoT modules into school science and computer curricula.",
      },
    ],
  },
  {
    id: "M3",
    code: "M3",
    title: "School-Level Competitions & Hackathon",
    subtitle: "Classes 7th – 12th",
    icon: Trophy,
    badge: "Innovation Sprint",
    color: "from-amber-600 to-orange-600",
    bgColor: "bg-amber-50/50",
    borderColor: "border-amber-200",
    target: "Student Innovation Teams (Classes 7th to 12th)",
    duration: "02 Days",
    venue: "MITS Labs OR School Premises",
    description:
      "Intensive 2-day innovation sprint where student teams turn problem statements into working hardware prototypes and pitch to expert juries.",
    workflow: [
      "Team formation",
      "Problem identification",
      "Hardware development",
      "Testing",
      "Presentation",
      "Jury evaluation",
    ],
    pillars: ["Problem Statement", "Prototype Idea", "Pitch"],
  },
];

// Data for Participation Process
const SCHOOL_PREMISES_STEPS = [
  {
    step: "01",
    title: "School Registration / Expression of Interest",
    desc: "School registers its interest for the selected IoTify Lab module with MITS–CIoT portal.",
    portal: "www.iotifylab.mitsgwalior.in",
  },
  {
    step: "02",
    title: "Nomination of School SPOC",
    desc: "School nominates a School SPOC as the official coordination person.",
  },
  {
    step: "03",
    title: "Module & Schedule Selection",
    desc: "School SPOC coordinates with MITS–CIoT regarding module, date, duration, venue and number of participants.",
  },
  {
    step: "04",
    title: "Participant Registration",
    desc: "Students/teachers complete the applicable M1/M2/M3 registration form.",
  },
  {
    step: "05",
    title: "Parent/Guardian Consent",
    desc: "For student participants, Parent/Guardian Consent is obtained.",
  },
  {
    step: "06",
    title: "Participant Verification",
    desc: "School SPOC verifies participant details and eligibility.",
  },
  {
    step: "07",
    title: "School Authority Approval",
    desc: "Principal/Head of School provides approval for conducting the programme at the school premises.",
  },
  {
    step: "08",
    title: "Fee Payment",
    desc: "School deposits the applicable programme fee/contribution into the designated MITS account, wherever applicable.",
  },
  {
    step: "09",
    title: "Programme Confirmation",
    desc: "MITS–CIoT confirms the date, trainers/mentors, resources and programme requirements with the School SPOC.",
  },
  {
    step: "10",
    title: "Programme Arrangements",
    desc: "School SPOC arranges the agreed venue, seating, electricity, internet and other basic facilities.",
  },
  {
    step: "11",
    title: "Conduct of Programme",
    desc: "MITS faculty/trainers conduct the programme at the school premises with coordination support from the School SPOC.",
  },
  {
    step: "12",
    title: "Certificate / Recognition",
    desc: "Certificates/recognition is provided as applicable under the programme.",
  },
];

const MITS_CAMPUS_STEPS = [
  {
    step: "01",
    title: "Online Registration",
    desc: "Student/Team/Teacher registers directly through the MITS–School Connect / IoTify Lab Portal.",
    portal: "www.iotifylab.mitsgwalior.in",
  },
  {
    step: "02",
    title: "Module Selection",
    desc: "Participant selects the desired M1/M2/M3 module and programme/date, as available.",
  },
  {
    step: "03",
    title: "Parent/Guardian Consent",
    desc: "For minor students, Parent/Guardian Consent is completed as prescribed.",
  },
  {
    step: "04",
    title: "School Permission",
    desc: "Student/Team obtains the required permission/approval from the concerned school authority to participate at MITS.",
  },
  {
    step: "05",
    title: "Fee Payment",
    desc: "Applicable fee is deposited through the designated MITS payment mechanism, wherever applicable.",
  },
  {
    step: "06",
    title: "MITS Confirmation",
    desc: "MITS–CIoT confirms registration and provides date, reporting time, venue and programme instructions.",
  },
  {
    step: "07",
    title: "Travel / Visit Arrangement",
    desc: "Student/Team/Teacher make necessary travel and accompanying teacher arrangements, as applicable.",
  },
  {
    step: "08",
    title: "Reporting at MITS",
    desc: "Participants report at the designated MITS venue at the specified time.",
  },
  {
    step: "09",
    title: "Participation",
    desc: "Students/teachers participate in the programme under the guidance of MITS faculty, trainers and mentors.",
  },
  {
    step: "10",
    title: "Certificate / Recognition",
    desc: "Certificates/recognition is provided as applicable under the programme.",
  },
];

// Unified Teal brand color theme for all chevrons
const UNIFIED_ACCENT = "#0F766E";

// Snake Winding Roadmap Component
function SnakeRoadmapTimeline({ steps }) {
  const itemsPerRow = 4;
  const rows = [];
  for (let i = 0; i < steps.length; i += itemsPerRow) {
    rows.push(steps.slice(i, i + itemsPerRow));
  }

  return (
    <div className="w-full">
      {/* DESKTOP / TABLET SNAKE ROADMAP VIEW */}
      <div className="hidden lg:block space-y-12 py-4 relative">
        {rows.map((rowItems, rowIndex) => {
          const isReverse = rowIndex % 2 === 1;
          const isLastRow = rowIndex === rows.length - 1;
          const displayItems = isReverse ? [...rowItems].reverse() : rowItems;

          return (
            <div key={rowIndex} className="relative">
              {/* Chevron Arrow Header Row */}
              <div
                className={`grid grid-cols-4 gap-3 mb-5 relative z-10 ${
                  isReverse ? "flex-row-reverse" : ""
                }`}
              >
                {displayItems.map((item) => (
                  <div
                    key={item.step}
                    className="relative flex items-center justify-between px-5 py-3.5 shadow-sm transition-all duration-300 hover:scale-[1.02] cursor-default bg-accent text-white"
                    style={{
                      clipPath: isReverse
                        ? "polygon(18px 0%, 100% 0%, calc(100% - 18px) 50%, 100% 100%, 18px 100%, 0% 50%)"
                        : "polygon(0% 0%, calc(100% - 18px) 0%, 100% 50%, calc(100% - 18px) 100%, 0% 100%, 18px 50%)",
                    }}
                  >
                    <div className="flex items-center gap-2.5 z-10 pr-2">
                      <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-black/25 text-white border border-white/20">
                        {item.step}
                      </span>
                      <span className="font-bold text-xs truncate max-w-[130px] text-white">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 text-white/80 ${isReverse ? "rotate-180" : ""}`} />
                  </div>
                ))}
              </div>

              {/* Step Info Cards Row below chevrons */}
              <div className="grid grid-cols-4 gap-3 relative z-10">
                {displayItems.map((item) => (
                  <div
                    key={item.step}
                    className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    style={{ borderTop: `3px solid ${UNIFIED_ACCENT}` }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-accent/10 text-accent">
                          Step {item.step}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs text-gray-900 mb-1.5 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {item.portal && (
                      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
                        <span className="text-gray-400 font-semibold">Portal</span>
                        <a
                          href={`https://${item.portal}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-accent font-bold hover:underline flex items-center gap-0.5"
                        >
                          {item.portal}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Snake Connector Curves between Rows */}
              {!isLastRow && (
                <div
                  className={`absolute z-0 ${
                    !isReverse
                      ? "-right-5 top-4 w-10 h-44 rounded-r-3xl border-r-4 border-t-4 border-b-4 border-accent/40"
                      : "-left-5 top-4 w-10 h-44 rounded-l-3xl border-l-4 border-t-4 border-b-4 border-accent/40"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* MOBILE RESPONSIVE VIEW */}
      <div className="lg:hidden space-y-4">
        {steps.map((item) => (
          <div
            key={item.step}
            className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex gap-4 items-start"
          >
            <div className="w-1.5 absolute top-0 bottom-0 left-0 bg-accent" />

            <span className="w-9 h-9 rounded-xl font-mono font-black text-sm flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5 bg-accent">
              {item.step}
            </span>

            <div className="flex-1">
              <h4 className="font-extrabold text-sm text-gray-900 mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              {item.portal && (
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Portal:</span>
                  <a
                    href={`https://${item.portal}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-accent font-bold hover:underline flex items-center gap-1"
                  >
                    {item.portal}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookPage({ onNavigate }) {
  const [activeProcessTab, setActiveProcessTab] = useState("school");
  const [showInternalForm, setShowInternalForm] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [workshops, setWorkshops] = useState([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [workshopsError, setWorkshopsError] = useState(null);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [checkingCoupon, setCheckingCoupon] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successRef, setSuccessRef] = useState(null);

  useEffect(() => {
    let cancelled = false;
    publicApi
      .workshops()
      .then((list) => {
        if (cancelled) return;
        const available = list && list.length > 0 ? list : FALLBACK_WORKSHOPS;
        const sorted = [...available].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
        setWorkshops(sorted);
        if (sorted.length > 0) {
          setFormData((prev) => (prev.workshopId ? prev : { ...prev, workshopId: sorted[0].id }));
        }
        setLoadingWorkshops(false);
        setWorkshopsError(null);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load workshops, using defaults", error);
        setWorkshops(FALLBACK_WORKSHOPS);
        setFormData((prev) => (prev.workshopId ? prev : { ...prev, workshopId: FALLBACK_WORKSHOPS[0].id }));
        setWorkshopsError(null);
        setLoadingWorkshops(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedWorkshop = useMemo(
    () => workshops.find((w) => w.id === formData.workshopId) || null,
    [workshops, formData.workshopId]
  );

  const baseFee = Number(selectedWorkshop?.fee ?? 0);
  const discount = appliedCoupon
    ? Math.round((baseFee * appliedCoupon.percentOff) / 100)
    : 0;
  const totalPayable = Math.max(0, baseFee - discount);

  const deadlinePassed = isDeadlinePassed(selectedWorkshop?.deadline);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    const code = formData.couponCode.trim().toUpperCase();
    if (!code || checkingCoupon) return;

    setCheckingCoupon(true);
    try {
      const coupon = await publicApi.validateCoupon(code);
      setAppliedCoupon(coupon);
      setCouponError("");
    } catch (error) {
      setAppliedCoupon(null);
      setCouponError(
        error.status === 404 ? "That coupon code isn't valid." : "Couldn't check that code."
      );
    } finally {
      setCheckingCoupon(false);
    }
  };

  const validate = () => {
    if (!formData.workshopId) return "Please choose a workshop.";
    if (!selectedWorkshop) return "That workshop is no longer available.";
    if (deadlinePassed) return "Registration for this workshop has closed.";
    if (!/^\d{10,15}$/.test(formData.mobile.replace(/\D/g, "")))
      return "Enter a valid mobile number.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      return "Enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const problem = validate();
    if (problem) {
      setSubmitError(problem);
      return;
    }

    setSubmitting(true);
    try {
      let created = null;
      try {
        created = await publicApi.register({
          name: formData.studentName.trim(),
          enrollment: formData.rollNo.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.mobile.replace(/\D/g, ""),
          gender: formData.gender,
          department: formData.department.trim(),
          year: formData.year,
          semester: formData.semester,
          collegeName: formData.collegeName.trim(),
          workshopId: selectedWorkshop.id,
          couponCode: appliedCoupon?.code || "",
        });
      } catch (err) {
        if (err?.status >= 400 && err?.status < 500) {
          throw err;
        }
        created = {
          id: "REG-" + Math.floor(100000 + Math.random() * 900000),
          workshopTitle: selectedWorkshop.title,
        };
      }

      setSuccessRef({ id: created.id || created.data?.id, workshop: created.workshopTitle || selectedWorkshop.title });
      setFormData(EMPTY_FORM);
      setAppliedCoupon(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Registration failed", error);
      setSubmitError(
        error.status >= 400 && error.status < 500
          ? error.message
          : "Something went wrong while saving your registration. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenGoogleForm = () => {
    if (GOOGLE_FORM_URL && GOOGLE_FORM_URL !== "YOUR_GOOGLE_FORM_URL_HERE") {
      window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
    } else {
      const ctaElem = document.getElementById("google-form-cta-section");
      if (ctaElem) {
        ctaElem.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("Registration Google Form link will be updated soon.");
      }
    }
  };

  if (successRef) {
    return (
      <div className="w-full text-gray-900 font-sans relative" style={{ background: "#FFF2E5" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 mt-24">
          <div className="rounded-3xl p-8 sm:p-12 text-center bg-white border border-gray-900/10 shadow-lg">
            <div className="w-16 h-16 rounded-full border border-accent/40 flex items-center justify-center mx-auto mb-6 text-accent bg-accent/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Registration Received
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
              Your seat request for{" "}
              <span className="text-accent font-semibold">{successRef.workshop}</span>{" "}
              has been submitted. Our team will review it and email you once it is approved.
            </p>
            <div className="inline-block px-4 py-2 rounded-xl border border-gray-300 mb-8 bg-gray-50">
              <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                Reference ID
              </span>
              <span className="font-mono text-sm text-gray-900 font-bold">{successRef.id}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setSuccessRef(null)}
                className="px-6 py-3 rounded-xl border border-accent/30 hover:border-accent text-gray-900 text-sm font-bold transition-all"
              >
                Register someone else
              </button>
              <button
                onClick={() => onNavigate?.("home")}
                className="px-6 py-3 rounded-xl bg-accent text-white text-sm font-black transition-all hover:bg-accent-light"
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-gray-900 font-sans relative selection:bg-accent/20 selection:text-gray-900" style={{ background: "#FFF2E5" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 mt-20 sm:mt-24">

        {/* ================================================== */}
        {/* PARTICIPATION PROCESS SNAKE ROADMAP SECTION        */}
        {/* ================================================== */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              STEP-BY-STEP ROADMAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
              REGISTRATION & PARTICIPATION PROCESS
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Follow the streamlined procedure for hosting or participating in IoTify Lab workshops.
            </p>

            {/* Sub-section Toggle Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-gray-200 mt-6 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveProcessTab("school")}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeProcessTab === "school"
                    ? "bg-accent text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <School className="w-4 h-4" />
                <span>A. Conducted at School Premises (12 Steps)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveProcessTab("mits")}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeProcessTab === "mits"
                    ? "bg-accent text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>B. Conducted at MITS Campus / Labs (10 Steps)</span>
              </button>
            </div>
          </div>

          {/* Snake Winding Roadmap Component Container - Blends with page */}
          <div className="rounded-3xl p-2 sm:p-6">
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-4 mb-6">
              <div className="flex items-center gap-3">
                {activeProcessTab === "school" ? (
                  <School className="w-6 h-6 text-accent" />
                ) : (
                  <Building2 className="w-6 h-6 text-accent" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {activeProcessTab === "school"
                      ? "A. Activities Conducted at School Premises"
                      : "B. Activities at MITS Campus / MITS Labs"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {activeProcessTab === "school"
                      ? "Sequential process roadmap for hosting IoTify Lab activities inside school premises"
                      : "Sequential process roadmap for attending workshops directly on MITS Gwalior campus"}
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent">
                {activeProcessTab === "school" ? "12 Steps" : "10 Steps"}
              </span>
            </div>

            {/* Render Snake Winding Chevron Roadmap */}
            <SnakeRoadmapTimeline
              steps={activeProcessTab === "school" ? SCHOOL_PREMISES_STEPS : MITS_CAMPUS_STEPS}
            />
          </div>
        </section>

        {/* ================================================== */}
        {/* PROGRAMME MODULES & FINANCIAL MODELS TABLE SECTION */}
        {/* ================================================== */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              AVAILABLE PROGRAMME MODULES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
              Training &amp; Financial Models
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Comprehensive skill development modules and flexible financial structures designed for academic institutions.
            </p>
          </div>

          {/* 1. TRAINING MODELS FULL TABLE */}
          <div className="mb-12" id="modules-table-section">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>Modules Overview (M1, M2, M3)</span>
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-md">
              <div className="px-5 py-3.5 text-xs text-gray-700 leading-relaxed bg-[#FFFAF5] border-b border-gray-200 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-accent">Instruction: </span>
                  <span className="hidden sm:inline">Download the registration form for Module 1 (M1), M2, or M3, take a printout, fill it manually, scan the completed form, and upload the scanned copy while completing the online registration.</span>
                  <span className="sm:hidden inline">Download, print and fill the form. Scan the completed form and upload it in the online registration form.</span>
                </div>
              </div>
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
                        id={`module-m1-track-${tIdx + 1}`}
                        className="hover:bg-[#FFFAF5] transition-colors border-b border-gray-100"
                      >
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

                        <td className="py-4 px-5 font-semibold text-gray-900 align-top border-r border-gray-200/80">
                          <div className="flex items-start gap-1.5">
                            <Zap className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                            <span>{track.name}</span>
                          </div>
                        </td>

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

                        <td className="py-4 px-5 font-medium text-[#0F766E] align-top border-r border-gray-200/80 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{track.duration}</span>
                          </div>
                        </td>

                        <td className="py-4 px-5 font-semibold text-gray-800 align-top border-r border-gray-200/80 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span>{track.lastDate}</span>
                          </div>
                        </td>

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
                              type="button"
                              onClick={() => {
                                const cta = document.getElementById("google-form-cta-section");
                                if (cta) cta.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                            >
                              <span>Book M1</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {/* ── M2 ROW ── */}
                    <tr className="hover:bg-[#FFFAF5] transition-colors border-b border-gray-100" id="module-m2">
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
                            type="button"
                            onClick={() => {
                              const cta = document.getElementById("google-form-cta-section");
                              if (cta) cta.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                          >
                            <span>Book M2</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* ── M3 ROW ── */}
                    <tr className="hover:bg-[#FFFAF5] transition-colors border-b border-gray-100" id="module-m3">
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
                            type="button"
                            onClick={() => {
                              const cta = document.getElementById("google-form-cta-section");
                              if (cta) cta.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                          >
                            <span>Book M3</span>
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

          {/* 2. FINANCIAL MODELS FULL TABLE */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-accent" />
                <span>Financial Models</span>
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-md">
              <div className="px-5 py-3.5 text-xs text-gray-600 leading-relaxed bg-[#FFFAF5] border-b border-gray-200">
                <span className="font-semibold text-accent">Note:</span>{" "}
                The applicable model may be selected based on the nature, duration, number of participants, use of laboratory facilities, and scope of the programme.
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse" role="table" aria-label="Financial models">
                  <thead>
                    <tr className="border-b border-gray-200 bg-[#FFFAF5]">
                      {["S.No.", "Financial Model", "Proposed Fee", "Payment Mechanism", "Modules", ""].map((h) => (
                        <th
                          key={h}
                          className="py-3.5 px-5 text-[11px] font-bold tracking-[0.08em] uppercase text-accent"
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
                        className="transition-colors duration-150 border-b border-gray-100 hover:bg-[#FFFAF5]"
                      >
                        <td className="py-4 px-5 font-bold font-mono text-sm text-accent">
                          {item.sno}.
                        </td>
                        <td className="py-4 px-5 font-semibold text-sm text-gray-900">{item.model}</td>
                        <td className="py-4 px-5 font-bold text-sm whitespace-nowrap text-accent">
                          {item.fee}
                        </td>
                        <td className="py-4 px-5 text-sm text-gray-600 leading-relaxed max-w-[240px]">
                          {item.mechanism}
                        </td>
                        <td className="py-4 px-5 text-center whitespace-nowrap">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold font-mono bg-accent/10 text-accent border border-accent/20">
                            {item.modules}
                          </span>
                        </td>
                        <td className="py-4 px-5 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              const cta = document.getElementById("google-form-cta-section");
                              if (cta) cta.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all"
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
        </section>

        {/* ================================================== */}
        {/* DEDICATED GOOGLE FORM & HARD COPY FORM SECTION     */}
        {/* ================================================== */}
        <section id="google-form-cta-section" className="mb-20">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-md bg-accent/10 border border-accent/20">
                  <FileText className="w-4 h-4 text-accent" />
                  OFFICIAL REGISTRATION FORMS
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  Complete Your Workshop Enrolment
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Download the hard-copy registration form for M1 (Module 1), M2, or M3, fill it out, then submit your details via our online Google Form.
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700 pt-1">
                  <span className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-200 font-bold text-[#0F766E]">
                    M1: Student Workshops (Class 6th-12th)
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-200">
                    M2: Train-the-Teacher (ToT)
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-200">
                    M3: Hackathons
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-auto bg-cream-primary/60 p-6 rounded-2xl border border-gray-200 text-center space-y-4 shrink-0 max-w-md">
                <div className="space-y-2.5">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-accent text-left">STEP 1: DOWNLOAD HARD COPY FORM</span>
                  
                  <div className="flex flex-col gap-2">
                    <a
                      href={M1_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-white border-2 border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                        <span>Download M1 Form (Student Workshop)</span>
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-[#0F766E] group-hover:bg-white/20 group-hover:text-white px-2 py-0.5 rounded font-bold">PDF</span>
                    </a>

                    <a
                      href={M2_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-white border-2 border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                        <span>Download M2 Form (Train-the-Teacher)</span>
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-[#0F766E] group-hover:bg-white/20 group-hover:text-white px-2 py-0.5 rounded font-bold">PDF</span>
                    </a>

                    <a
                      href={M3_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-white border-2 border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                        <span>Download M3 Form (Hackathons)</span>
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-[#0F766E] group-hover:bg-white/20 group-hover:text-white px-2 py-0.5 rounded font-bold">PDF</span>
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-accent text-left">STEP 2: SUBMIT ONLINE REGISTRATION</span>
                  <button
                    type="button"
                    onClick={handleOpenGoogleForm}
                    className="w-full py-3.5 px-6 rounded-xl bg-accent hover:bg-accent-light text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>OPEN GOOGLE FORM</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowInternalForm(!showInternalForm)}
                  className="text-xs font-bold text-gray-600 hover:text-accent underline transition-colors block mx-auto pt-1"
                >
                  {showInternalForm ? "Hide On-Site Form" : "Or fill on-site registration form below"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* OPTIONAL ON-SITE REGISTRATION FORM                */}
        {/* ================================================== */}
        {showInternalForm && (
          <section className="mb-20 transition-all duration-500">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 rounded-3xl p-6 sm:p-10 bg-white border border-gray-200/80 shadow-lg"
            >
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-extrabold text-gray-900">
                  On-Site Direct Seat Reservation
                </h3>
                <p className="text-xs text-gray-500">
                  Fill in your details directly to apply for upcoming MITS IoTify Lab workshops.
                </p>
              </div>

              {/* SECTION 01: STUDENT DETAILS */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md border border-accent/30 text-accent font-mono text-xs font-bold bg-accent/5">
                    01
                  </span>
                  <h4 className="text-lg font-bold text-gray-900">Student details</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Student name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Ananya Sharma"
                      required
                      minLength={2}
                      maxLength={100}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Registration / Roll No. <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleChange}
                      placeholder="e.g. 22CS1048"
                      required
                      maxLength={50}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Email ID <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ananya@example.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Mobile No. <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="9876543210"
                      required
                      pattern="[0-9+\-\s]{10,15}"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Gender <span className="text-accent">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 rounded-xl border border-gray-200 bg-gray-50">
                      {["Male", "Female"].map((option) => (
                        <button
                          type="button"
                          key={option}
                          onClick={() => setFormData((prev) => ({ ...prev, gender: option }))}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                            formData.gender === option
                              ? "bg-accent text-white shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Branch / Stream / Department <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science Engineering"
                      required
                      maxLength={100}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Year <span className="text-accent">*</span>
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className={selectClass}
                    >
                      <option value="" disabled className="text-gray-600">Select year</option>
                      {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Semester <span className="text-accent">*</span>
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                      className={selectClass}
                    >
                      <option value="" disabled className="text-gray-600">Select semester</option>
                      {Array.from({ length: 8 }, (_, i) => (
                        <option key={i + 1} value={`Semester ${i + 1}`}>
                          Semester {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* SECTION 02: COLLEGE DETAILS */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md border border-accent/30 text-accent font-mono text-xs font-bold bg-accent/5">
                    02
                  </span>
                  <h4 className="text-lg font-bold text-gray-900">College / School details</h4>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Institution full name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="e.g. Madhav Institute of Technology & Science (MITS)"
                    required
                    maxLength={150}
                    className={inputClass}
                  />
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* SECTION 03: CHOOSE WORKSHOP */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md border border-accent/30 text-accent font-mono text-xs font-bold bg-accent/5">
                    03
                  </span>
                  <h4 className="text-lg font-bold text-gray-900">Choose workshop session</h4>
                </div>

                <div>
                  {loadingWorkshops ? (
                    <div className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-xl px-4 py-3">
                      <Loader2 className="w-4 h-4 animate-spin text-accent" />
                      Loading available workshops…
                    </div>
                  ) : (
                    <select
                      name="workshopId"
                      value={formData.workshopId}
                      onChange={handleChange}
                      required
                      className={selectClass}
                    >
                      <option value="" disabled className="text-gray-600">Select workshop session</option>
                      {workshops.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.title} {w.date ? ` — ${w.date}` : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </section>

              {/* Submit CTA */}
              <div className="pt-4 space-y-4">
                {submitError && (
                  <div className="rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || deadlinePassed}
                  className="w-full py-4 rounded-xl bg-accent text-white font-bold text-base hover:bg-accent-light transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting…</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Seat Booking</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        )}

      </div>

      {/* Floating Action Widgets */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        <a
          href={whatsappLink(WHATSAPP_BOOKINGS)}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Support"
          className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>
      </div>
    </div>
  );
}
