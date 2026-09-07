import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, GraduationCap } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "IoT Kits", page: "iotkit" },
  { label: "Modules", page: "projects" },
  { label: "Gallery", page: "gallery" },
  { label: "Registration ", page: "book" },
  { label: "Developer", page: "developer" },
  { label: "Admin", page: "admin-login" },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page) => {
    onNavigate(page);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFF2E5]/95 backdrop-blur-md border-b border-[rgba(17,24,39,0.09)] shadow-[0_2px_16px_rgba(17,24,39,0.08)] py-4"
          : "bg-transparent py-5 sm:py-6"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Top institutional accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #0F766E, #0369A1, #0F766E)" }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 flex items-center justify-between">

        {/* ── Brand ── */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 group focus-visible:outline-none"
          aria-label="IoTify Lab — go to homepage"
        >
          <img
            src="https://res.cloudinary.com/w1uqr8sy/image/upload/v1785951313/logo_mtsjp4.png"
            alt="IoTify Lab logo"
            className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none text-left">
            <span className="font-bold text-base sm:text-lg tracking-wide text-gray-900 group-hover:text-[#0F766E] transition-colors duration-200">
              IoTify Lab
            </span>
            <span className="text-xs text-gray-500 tracking-wide font-medium hidden sm:block mt-0.5">
              CIoT · MITS Deemed University
            </span>
          </div>
        </button>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Site sections">
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.label}
                onClick={() => handleNav(link.page)}
                className={`relative px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-1 ${
                  isActive
                    ? "text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#0F766E]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <>
                    <motion.span
                      layoutId="nav-bg"
                      className="absolute inset-0 rounded-xl bg-[#0F766E] shadow-md border border-[#0D6860]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-4 right-4 h-[2.5px] rounded-full bg-teal-200"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  </>
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNav("book")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2"
            style={{
              background: "#0F766E",
              border: "1px solid #0D6860",
              boxShadow: "0 2px 8px rgba(15,118,110,0.22)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0D6860"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(15,118,110,0.30)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#0F766E"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,118,110,0.22)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <GraduationCap size={17} />
            <span>Register Now</span>
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          style={{
            background: "rgba(255,255,255,0.85)",
            borderColor: "rgba(17,24,39,0.12)",
            backdropFilter: "blur(4px)",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={20} className="text-[#0F766E]" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={20} className="text-gray-700" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden mx-4 mt-3 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,242,229,0.97)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(17,24,39,0.10)",
              boxShadow: "0 8px 24px rgba(17,24,39,0.08)",
            }}
          >
            {/* Brand header in drawer */}
            <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(17,24,39,0.07)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
              <span className="text-[11px] font-semibold text-gray-500 tracking-wider uppercase">
                MITS School Connect Programme
              </span>
            </div>

            <div className="p-3 flex flex-col gap-1.5">
              {NAV_LINKS.map((link, i) => {
                const isActive = currentPage === link.page;
                return (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035 }}
                    onClick={() => handleNav(link.page)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 focus-visible:outline-none ${
                      isActive
                        ? "text-white bg-[#0F766E] shadow-md border-l-4 border-[#0D6860]"
                        : "text-gray-700 hover:text-white hover:bg-[#0F766E]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${isActive ? "text-white translate-x-0.5" : "text-gray-400"}`}
                    />
                  </motion.button>
                );
              })}
            </div>

            <div className="px-4 pb-4 pt-1">
              <button
                onClick={() => handleNav("book")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                style={{ background: "#0F766E", border: "1px solid #0D6860" }}
              >
                <GraduationCap size={18} />
                <span>Register Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
