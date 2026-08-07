import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Megaphone,
  Download,
  Settings,
  ScrollText,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCollection } from "../../lib/useCollection";
// Served from Cloudinary like every other logo on the site. The local
// logo1.png was a 1.35 MB PNG that Vite inlined into the main bundle for this
// one sidebar, so every public visitor downloaded it to render a page they
// never open.
const logo = "https://res.cloudinary.com/w1uqr8sy/image/upload/v1785951313/logo_mtsjp4.png";

/**
 * Grouped rather than one flat list of seven. "Registrations" and "Workshops"
 * are the daily work; exports, logs and settings are occasional. Splitting
 * them means the eye lands on the right half of the list straight away.
 */
const NAV_GROUPS = [
  {
    items: [
      { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard, permission: null },
    ],
  },
  {
    label: "Manage",
    items: [
      { id: "admin-workshops", label: "Workshops", icon: Calendar, permission: "workshops:read" },
      {
        id: "admin-registrations",
        label: "Bookings (Registrations)",
        icon: Users,
        permission: "registrations:read",
        // The one number worth carrying in the navigation: work waiting to be done.
        badge: "pending",
      },
      {
        id: "admin-announcements",
        label: "Announcements",
        icon: Megaphone,
        permission: "announcements:read",
      },
    ],
  },
  {
    label: "Records",
    items: [
      { id: "admin-exports", label: "Exports", icon: Download, permission: "exports:read" },
      { id: "admin-logs", label: "Activity Logs", icon: ScrollText, permission: "settings:read" },
      { id: "admin-settings", label: "Settings", icon: Settings, permission: "settings:read" },
    ],
  },
];

const ROLE_TONE = {
  "Super Admin": "a-badge-info",
  Faculty: "a-badge-success",
  Coordinator: "a-badge-warning",
  Volunteer: "a-badge-neutral",
};

function initials(name = "") {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

function SidebarBody({ currentPage, onNavigate, onCloseMobile }) {
  const { logout, adminProfile, can } = useAuth();
  const [registrations] = useCollection("registrations");

  const pending = registrations.filter((r) => (r.status || "Pending") === "Pending").length;
  const counts = { pending };

  const handleLogout = async () => {
    await logout();
    onNavigate("admin-login");
  };

  return (
    <>
      {/* Brand */}
      <div
        className="h-16 flex items-center justify-between px-5 shrink-0"
        style={{ borderBottom: "1px solid var(--a-line-soft)" }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <img src={logo} alt="" className="w-7 h-7 object-contain shrink-0" />
          <div className="min-w-0">
            <p className="a-title text-[13px] leading-none">IoTify Lab</p>
            <p className="a-label mt-1 leading-none">Admin</p>
          </div>
        </div>
        {onCloseMobile && (
          <button onClick={onCloseMobile} className="a-icon-btn lg:hidden" aria-label="Close navigation">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto flex flex-col gap-6">
        {NAV_GROUPS.map((group, groupIndex) => {
          const items = group.items.filter((i) => !i.permission || can(i.permission));
          if (items.length === 0) return null;

          return (
            <div key={group.label || groupIndex} className="flex flex-col gap-1">
              {group.label && <p className="a-label px-3 mb-1.5">{group.label}</p>}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                const count = item.badge ? counts[item.badge] : 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    data-active={isActive}
                    aria-current={isActive ? "page" : undefined}
                    className="a-nav-item w-full text-left"
                  >
                    <Icon size={17} className="shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {count > 0 && (
                      <span className="a-badge a-badge-warning a-num">{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Signed-in identity + sign out */}
      <div className="p-4 shrink-0" style={{ borderTop: "1px solid var(--a-line-soft)" }}>
        {adminProfile && (
          <div className="flex items-center gap-3 px-1 pb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
              style={{
                background: "var(--a-accent-soft)",
                border: "1px solid var(--a-accent-line)",
                color: "var(--a-accent)",
              }}
            >
              {initials(adminProfile.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-[13px] font-medium truncate">{adminProfile.name}</p>
              <span className={`a-badge ${ROLE_TONE[adminProfile.role] || "a-badge-neutral"} mt-1`}>
                {adminProfile.role}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <button onClick={() => onNavigate("home")} className="a-nav-item w-full text-left">
            <ExternalLink size={17} className="shrink-0" />
            View website
          </button>
          <button
            onClick={handleLogout}
            className="a-nav-item w-full text-left"
            style={{ color: "#FF8A8A" }}
          >
            <LogOut size={17} className="shrink-0" />
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}

export default function AdminSidebar({ currentPage, onNavigate, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Desktop: permanently docked */}
      <aside
        className="hidden lg:flex w-64 h-screen flex-col fixed left-0 top-0 z-50"
        style={{
          background: "var(--a-bg-raised)",
          borderRight: "1px solid var(--a-line-soft)",
        }}
      >
        <SidebarBody currentPage={currentPage} onNavigate={onNavigate} />
      </aside>

      {/* Mobile: slide-over drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed left-0 top-0 z-[70] w-72 h-screen flex flex-col"
              style={{
                background: "var(--a-bg-raised)",
                borderRight: "1px solid var(--a-line)",
              }}
            >
              <SidebarBody
                currentPage={currentPage}
                onNavigate={onNavigate}
                onCloseMobile={onCloseMobile}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
