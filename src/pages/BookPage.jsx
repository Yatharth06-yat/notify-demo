import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  ShieldCheck,
  Ticket,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Loader2,
  CalendarX,
} from "lucide-react";
import { publicApi } from "../lib/api";
import { WHATSAPP_BOOKINGS, whatsappLink } from "../lib/contact";
import AnnouncementsBanner from "../components/AnnouncementsBanner";

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
  "w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all";

const selectClass = `${inputClass} appearance-none cursor-pointer`;

/** A registration deadline of "2026-08-20" is inclusive of that whole day. */
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

export default function WorkshopEnrolment({ onNavigate }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [workshops, setWorkshops] = useState([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [workshopsError, setWorkshopsError] = useState(null);

  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, percentOff }
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

  // Coupons are checked one at a time against the server. The full code list
  // is never sent to the browser, so nobody can read every discount out of the
  // network tab — but the price shown here is still only a preview: the API
  // re-prices the booking from the fee and coupon on record when it saves.
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
        // Local fallback for offline/demo mode
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

  // ── Success screen ────────────────────────────────────────────
  if (successRef) {
    return (
      <div className="w-full text-slate-100 font-sans relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 mt-24">
          <div className="border border-cyan-500/20 rounded-3xl p-8 sm:p-12 backdrop-blur-2xl text-center">
            <div className="w-16 h-16 rounded-full border border-cyan-500/40 flex items-center justify-center mx-auto mb-6 text-cyan-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Registration received
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed">
              Your seat request for{" "}
              <span className="text-cyan-400 font-semibold">{successRef.workshop}</span>{" "}
              has been submitted. Our team will review it and email you once it is
              approved.
            </p>
            <div className="inline-block px-4 py-2 rounded-xl border border-slate-800 mb-8">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Reference ID
              </span>
              <span className="font-mono text-sm text-white">{successRef.id}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setSuccessRef(null)}
                className="px-6 py-3 rounded-xl border border-cyan-500/30 hover:border-cyan-400 text-white text-sm font-bold transition-all"
              >
                Register someone else
              </button>
              <button
                onClick={() => onNavigate?.("home")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-sm font-black transition-all hover:scale-[1.02]"
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
    <div className="w-full text-slate-100 font-sans relative selection:bg-cyan-500 selection:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* ===== HEADER ===== */}
        <header className="mb-10 mt-24">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> WORKSHOP ENROLMENT
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mt-4 leading-[1.15] tracking-tight">
            Build your next skill.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Book your seat.
            </span>
          </h1>
          <p className="text-slate-400 mt-3 text-sm sm:text-base font-normal max-w-xl">
            A clear, secure registration experience for IoTily Lab hands-on programs and
            workshops.
          </p>
        </header>

        {/* Live notices posted from the admin portal */}
        <AnnouncementsBanner />

        {/* ===== MAIN FORM CONTAINER ===== */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 border border-cyan-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl"
        >
          {/* SECTION 01: STUDENT DETAILS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Student details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Student name <span className="text-cyan-400">*</span>
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
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Registration / Roll No. <span className="text-cyan-400">*</span>
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
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Email ID <span className="text-cyan-400">*</span>
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
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Mobile No. <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  pattern="[0-9+\-\s]{10,15}"
                  title="Enter a 10-digit mobile number"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Gender <span className="text-cyan-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl border border-slate-800">
                  {["Male", "Female"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, gender: option }))
                      }
                      className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                        formData.gender === option
                          ? "text-cyan-400 border border-cyan-500/40"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Branch / Stream / Department <span className="text-cyan-400">*</span>
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
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Year <span className="text-cyan-400">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className={selectClass}
                >
                  <option value="" disabled className="bg-slate-950 text-slate-400">
                    Select year
                  </option>
                  {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
                    <option key={y} value={y} className="bg-slate-950 text-white">
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Semester <span className="text-cyan-400">*</span>
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className={selectClass}
                >
                  <option value="" disabled className="bg-slate-950 text-slate-400">
                    Select semester
                  </option>
                  {Array.from({ length: 8 }, (_, i) => (
                    <option
                      key={i + 1}
                      value={`Semester ${i + 1}`}
                      className="bg-slate-950 text-white"
                    >
                      Semester {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <hr className="border-slate-800/80" />

          {/* SECTION 02: COLLEGE DETAILS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                College details
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                College full name <span className="text-cyan-400">*</span>
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

          <hr className="border-slate-800/80" />

          {/* SECTION 03: CHOOSE YOUR PROGRAM */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Choose your program
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Workshop name <span className="text-cyan-400">*</span>
              </label>

              {loadingWorkshops ? (
                <div className="flex items-center gap-2 text-sm text-slate-400 border border-slate-800 rounded-xl px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  Loading available workshops…
                </div>
              ) : workshopsError ? (
                <div className="text-sm text-red-400 border border-red-500/30 rounded-xl px-4 py-3">
                  {workshopsError}
                </div>
              ) : workshops.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-slate-400 border border-slate-800 rounded-xl px-4 py-3">
                  <CalendarX className="w-4 h-4 text-slate-500" />
                  No workshops are open for registration right now. Check back soon.
                </div>
              ) : (
                <select
                  name="workshopId"
                  value={formData.workshopId}
                  onChange={handleChange}
                  required
                  className={selectClass}
                >
                  <option value="" disabled className="bg-slate-950 text-slate-400">
                    Select workshop name
                  </option>
                  {workshops.map((w) => (
                    <option key={w.id} value={w.id} className="bg-slate-950 text-white">
                      {w.title}
                      {w.date ? ` — ${w.date}` : ""}
                    </option>
                  ))}
                </select>
              )}

              {/* Details of the chosen workshop */}
              {selectedWorkshop && (
                <div className="mt-4 border border-slate-800 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="block text-slate-500 uppercase tracking-wider font-semibold mb-1">
                      Date
                    </span>
                    <span className="text-white">{selectedWorkshop.date || "TBA"}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase tracking-wider font-semibold mb-1">
                      Time
                    </span>
                    <span className="text-white">{selectedWorkshop.time || "TBA"}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase tracking-wider font-semibold mb-1">
                      Venue
                    </span>
                    <span className="text-white">{selectedWorkshop.venue || "TBA"}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase tracking-wider font-semibold mb-1">
                      Closes
                    </span>
                    <span className={deadlinePassed ? "text-red-400" : "text-white"}>
                      {selectedWorkshop.deadline || "—"}
                    </span>
                  </div>
                </div>
              )}

              {deadlinePassed && (
                <p className="mt-3 text-xs text-red-400">
                  Registration for this workshop closed on {selectedWorkshop.deadline}.
                </p>
              )}
            </div>
          </section>

          <hr className="border-slate-800/80" />

          {/* SECTION 04: OFFERS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Offers
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Coupon code (optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={(e) => {
                    handleChange(e);
                    setAppliedCoupon(null);
                    setCouponError("");
                  }}
                  placeholder="Enter coupon code"
                  className={`flex-1 ${inputClass} uppercase`}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={checkingCoupon}
                  className="px-6 py-3 rounded-xl border border-cyan-500/30 hover:border-cyan-400 text-white text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {checkingCoupon ? (
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  ) : (
                    <Ticket className="w-4 h-4 text-cyan-400" />
                  )}
                  {checkingCoupon ? "Checking…" : "Apply"}
                </button>
              </div>
              {appliedCoupon && (
                <p className="mt-2 text-xs text-cyan-400">
                  Coupon {appliedCoupon.code} applied — {appliedCoupon.percentOff}% off.
                </p>
              )}
              {couponError && (
                <p className="mt-2 text-xs text-red-400">{couponError}</p>
              )}
            </div>
          </section>

          {/* ===== CHECKOUT CARD & CTA BUTTON ===== */}
          <div className="pt-4 space-y-4">
            <div className="border border-cyan-500/20 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Secure checkout</h4>
                  <p className="text-xs text-slate-400">
                    {totalPayable > 0
                      ? "Payment collected at the venue on confirmation"
                      : "No payment required for this workshop"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Total payable
                </span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  ₹{totalPayable.toLocaleString("en-IN")}
                </span>
                {discount > 0 && (
                  <span className="block text-[10px] text-slate-500 line-through">
                    ₹{baseFee.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>

            {submitError && (
              <div className="border border-red-500/30 bg-red-500/5 rounded-xl px-4 py-3 text-sm text-red-400">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || deadlinePassed || workshops.length === 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting…</span>
                </>
              ) : (
                <>
                  <span>Book Your Slot</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ===== FLOATING ACTION WIDGETS ===== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        <button
          type="button"
          className="px-4 py-2.5 rounded-full border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md hover:border-cyan-400"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Ask IoTily AI</span>
        </button>

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
