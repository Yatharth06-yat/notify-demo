import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const logo = "https://res.cloudinary.com/w1uqr8sy/image/upload/v1785951313/logo_mtsjp4.png";

const FOOTER_LINKS = {
  Navigation: [
    { label: "Home",           page: "home"        },
    { label: "About Us",       page: "about"       },
    { label: "Gallery",        page: "gallery"     },
    { label: "Book a Workshop",page: "book"        },
  ],
  Ecosystem: [
    { label: "IoT Kits",    page: "iotkit"   },
    { label: "Modules",     page: "projects" },
    { label: "About IoT",   page: "Iot"      },
  ],
  Portal: [
    { label: "Developer",   page: "developer"    },
    { label: "Admin Login", page: "admin-login"  },
    { label: "Contact Us",  page: "contact"      },
  ],
};

const SOCIAL_LINKS = [
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Twitter,  href: "#", label: "Twitter"  },
  { Icon: Github,   href: "#", label: "GitHub"   },
  { Icon: Mail,     href: "mailto:iotily@mits.ac.in", label: "Email" },
];

export default function Footer({ onNavigate }) {
  const handleNav = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-10 overflow-hidden"
      style={{
        background: "#F5E6DB",
        borderTop: "1px solid rgba(17,24,39,0.10)",
      }}
      role="contentinfo"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #0F766E, #0369A1, #0F766E)" }}
        aria-hidden="true"
      />

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,118,110,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 pt-14 pb-8 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-3 mb-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-label="Go to homepage"
            >
              <img
                src={logo}
                alt="IoTify Lab logo"
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base tracking-wide text-gray-900 group-hover:text-accent transition-colors">
                  IoTify Lab
                </span>
                <span className="text-[10px] text-gray-500 font-medium mt-0.5">
                  MITS School Connect Programme
                </span>
              </div>
            </button>

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-5">
              A premier innovation, outreach and hands-on technology learning initiative powered by
              the Centre for Internet of Things (CIoT), MITS–Deemed University, Gwalior.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 mb-5">
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <MapPin size={12} className="text-accent flex-shrink-0" />
                <span>MITS Campus, Gwalior, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <Mail size={12} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:iotily@mits.ac.in"
                  className="hover:text-accent transition-colors"
                >
                  iotily@mits.ac.in
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(17,24,39,0.10)",
                    color: "#6B7280",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#0F766E"; e.currentTarget.style.borderColor = "rgba(15,118,110,0.30)"; e.currentTarget.style.background = "rgba(15,118,110,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.borderColor = "rgba(17,24,39,0.10)"; e.currentTarget.style.background = "rgba(255,255,255,0.6)"; }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links], colIdx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (colIdx + 1) * 0.08 }}
            >
              <h4 className="font-bold text-[11px] uppercase tracking-[0.12em] text-gray-900 mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, page }) => (
                  <li key={label}>
                    <button
                      onClick={() => handleNav(page)}
                      className="text-gray-600 text-sm hover:text-accent transition-colors duration-200 text-left font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Institutional stripe */}
        <div
          className="mb-6 p-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.50)",
            border: "1px solid rgba(17,24,39,0.08)",
          }}
        >
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-gray-500 font-medium">
            <span>Madhav Institute of Technology &amp; Science</span>
            <span>·</span>
            <span>MITS–Deemed University, Gwalior</span>
            <span>·</span>
            <span>Centre for Internet of Things (CIoT)</span>
            <span>·</span>
            <span>MITS School Connect Programme</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 text-xs text-gray-500 font-medium"
          style={{ borderTop: "1px solid rgba(17,24,39,0.09)" }}
        >
          <span>© {new Date().getFullYear()} IoTify Lab, MITS. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              All systems operational
            </span>
            <a href="#" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
