import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Mail, MapPin } from "lucide-react";
const logo = "https://res.cloudinary.com/w1uqr8sy/image/upload/v1785951313/logo_mtsjp4.png";

const FOOTER_LINKS = {
  Navigation: ["Home", "About us", "Gallery", "Book a Workshop"],
  Ecosystem: ["IoTKIT", "Modules", "AboutIoT"],
  Portal: ["developer", "Admin Login", "Contact Us"],
};

export default function Footer({ onNavigate }) {
  const handleNav = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map exact footer link text to component route keys. These must match the
  // keys in App.jsx's PAGES map — an unknown key falls through to the homepage
  // with no error, so a typo here reads as a dead link.
  const pageMap = {
    "Home": "home",
    "About us": "about",
    "IoTKIT": "iotkit",
    "Modules": "projects",
    "AboutIoT": "Iot",
    "Gallery": "gallery",
    "Book a Workshop": "book",
    "developer": "developer",
    "Admin Login": "admin-login",
    "Contact Us": "contact",
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.06] overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-primary/30 to-transparent" />

      <div className="relative">
        {/* Background circuit */}
        <div className="absolute inset-0 circuit-bg opacity-20" />

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 mb-14">

            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <button onClick={() => handleNav("home")} className="flex items-center gap-3 mb-6 group">
                <img
                  src={logo}
                  alt="IoTily Lab"
                  className="h-12 w-auto object-contain"
                  style={{
                    mixBlendMode: "screen",
                    filter: "drop-shadow(0 0 8px rgba(0,207,255,0.45))",
                  }}
                />
                <span className="font-display font-bold text-white text-lg tracking-wider group-hover:text-cyan-primary transition-colors">
                  IoTify Lab
                </span>
              </button>

              <p className="text-muted text-sm leading-relaxed max-w-xs mb-6">
                A premier innovation lab at MITS dedicated to AI, IoT, Embedded Systems, 
                Robotics, Computer Vision, and Industry 4.0 research.
              </p>

              {/* Contact info */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <MapPin size={13} className="text-cyan-primary flex-shrink-0" />
                  MITS Campus, Gwalior, M.P., India
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <Mail size={13} className="text-cyan-primary flex-shrink-0" />
                  iotily@mits.ac.in
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3">
                {[
                  { Icon: Linkedin, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Github, href: "#" },
                  { Icon: Mail, href: "#" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-muted hover:text-cyan-primary hover:border-cyan-primary/40 transition-all duration-300 hover:shadow-glow"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([title, links], colIdx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (colIdx + 1) * 0.1 }}
              >
                <h4 className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-white/80 mb-5">
                  {title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => pageMap[link] && handleNav(pageMap[link])}
                        className="text-muted text-sm hover:text-cyan-primary transition-colors duration-200 text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06] text-xs text-muted">
            <span>© {new Date().getFullYear()} IoTify Lab, MITS. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                All systems operational
              </span>
              <a href="#" className="hover:text-cyan-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}