import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "About us", page: "about" },
  { label: "IoTKIT", page: "iotkit" },
  { label: "Modules", page: "projects" },
  { label: "AboutIoT", page: "Iot" },
  { label: "Gallery", page: "gallery" },
  { label: "Book a Workshop", page: "book" },
  { label: "developer", page: "developer" },
  { label: "Admin Login", page: "admin-login" },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page) => {
    onNavigate(page);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-2xl border-b border-cyan-500/20 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      {/* Multi-color ambient background glow line / gradient bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-blue-600 opacity-75" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between relative">
        {/* Logo Section with Multi-color & Bold Brand Name and Subtitle */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2.5 group relative text-left"
        >
          <img
            src="https://res.cloudinary.com/w1uqr8sy/image/upload/v1785951313/logo_mtsjp4.png"
            alt="IoTify Lab"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            style={{
              mixBlendMode: "screen",
              filter: "drop-shadow(0 0 10px rgba(0,207,255,0.45))",
            }}
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              IoTify Lab
            </span>

          </div>
        </button>

        {/* Clean Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.label}
                onClick={() => handleNav(link.page)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 overflow-hidden ${
                  isActive
                    ? "text-cyan-300 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <>
                    <motion.span
                      layoutId="nav-bg"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 border border-cyan-500/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full shadow-[0_0_10px_#00cfff]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  </>
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNav("contact")}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 text-slate-950 font-semibold text-sm shadow-[0_0_25px_rgba(0,207,255,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-slate-950 transition-transform group-hover:rotate-12" />
            <span>Get In Touch</span>
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-white border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 via-slate-900/90 to-indigo-950/80 backdrop-blur-md hover:border-cyan-400 transition-colors"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={18} className="text-cyan-400" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden mx-4 mt-3 rounded-2xl bg-gradient-to-b from-slate-950/95 via-slate-950/95 to-indigo-950/90 backdrop-blur-2xl border border-cyan-500/30 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.9)] flex flex-col gap-1.5"
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = currentPage === link.page;
              return (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleNav(link.page)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-cyan-300 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent border-l-4 border-cyan-400 font-semibold shadow-[0_0_20px_rgba(0,207,255,0.2)]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform ${
                      isActive ? "text-cyan-400 translate-x-1" : "opacity-40"
                    }`}
                  />
                </motion.button>
              );
            })}

            <div className="pt-3 mt-1 border-t border-slate-800/80">
              <button
                onClick={() => handleNav("contact")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,207,255,0.35)]"
              >
                <span>Get In Touch</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}