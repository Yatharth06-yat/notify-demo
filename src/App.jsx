import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundField from "./components/BackgroundField";

// Optimized Cloudinary loader video
const loaderVideo = "https://res.cloudinary.com/w1uqr8sy/video/upload/q_auto,f_auto/v1785951309/loader1_san3kv.mp4";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import iotkit from "./pages/iotkit.jsx";
import ProjectsPage from "./pages/ProjectsPage";
import BookPage from "./pages/BookPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import iot from "./pages/Aboutiot";
import developer from "./pages/devloper";
import { Book } from "lucide-react";

import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { WHATSAPP_GENERAL, whatsappLink } from "./lib/contact";

// The admin portal is loaded on demand. Imported normally it lands in the main
// bundle, so every visitor to the homepage downloads the charting and CSV
// libraries used by screens only staff can reach.
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminWorkshops = lazy(() => import("./pages/admin/AdminWorkshops"));
const AdminRegistrations = lazy(() => import("./pages/admin/AdminRegistrations"));
const AdminAnnouncements = lazy(() => import("./pages/admin/AdminAnnouncements"));
const AdminExports = lazy(() => import("./pages/admin/AdminExports"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminActivityLogs = lazy(() => import("./pages/admin/AdminActivityLogs"));

const PAGE_TITLES = {
  home: "IoTily Lab — AI, IoT & Embedded Systems Innovation Lab",
  about: "About — IoTily Lab",
  research: "Research — IoTily Lab",
  projects: "Projects — IoTily Lab",
  team: "Team — IoTily Lab",
  gallery: "Gallery — IoTily Lab",
  contact: "Contact — IoTily Lab",
  iotkit: "IoT Kit — IoTily Lab",
  Iot: "IoT — IoTily Lab",
  book: "Book a Workshop — IoTily Lab",
  developer: "Developer — IoTily Lab",
  "admin-login": "Admin Login — IoTily Lab",
  "admin-dashboard": "Dashboard — IoTily Admin",
  "admin-workshops": "Workshops — IoTily Admin",
  "admin-registrations": "Registrations — IoTily Admin",
  "admin-announcements": "Announcements — IoTily Admin",
  "admin-exports": "Exports — IoTily Admin",
  "admin-settings": "Settings — IoTily Admin",
  "admin-logs": "Activity Logs — IoTily Admin",
};

const PAGES = {
  home: HomePage,
  about: AboutPage,
  iotkit: iotkit,
  projects: ProjectsPage,
  book: BookPage,
  Iot: iot,
  gallery: GalleryPage,
  contact: ContactPage,
  developer: developer,
  "admin-login": AdminLogin,
  "admin-dashboard": AdminDashboard,
  "admin-workshops": AdminWorkshops,
  "admin-registrations": AdminRegistrations,
  "admin-announcements": AdminAnnouncements,
  "admin-exports": AdminExports,
  "admin-settings": AdminSettings,
  "admin-logs": AdminActivityLogs,
};

// ── URL routing ────────────────────────────────────────────────
const PATH_TO_PAGE = {
  "/": "home",
  "/about": "about",
  "/iot-kit": "iotkit",
  "/modules": "projects",
  "/about-iot": "Iot",
  "/gallery": "gallery",
  "/book": "book",
  "/contact": "contact",
  "/developer": "developer",
  "/admin": "admin-login",
  "/admin/dashboard": "admin-dashboard",
  "/admin/workshops": "admin-workshops",
  "/admin/registrations": "admin-registrations",
  "/admin/announcements": "admin-announcements",
  "/admin/exports": "admin-exports",
  "/admin/settings": "admin-settings",
  "/admin/logs": "admin-logs",
};

const PAGE_TO_PATH = Object.fromEntries(
  Object.entries(PATH_TO_PAGE).map(([path, page]) => [page, path])
);

function pageFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return PATH_TO_PAGE[path] || PATH_TO_PAGE[path.toLowerCase()] || "home";
}

// Original Video Loader Component with MITS Button
function Loader({ onComplete, onNavigateHome }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  // Loading progress simulation
  useEffect(() => {
    let timer;
    const duration = 6000; // 6.0 seconds loading duration
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const updateProgress = () => {
      currentStep++;
      const ratio = currentStep / totalSteps;
      let calculatedProgress;
      if (ratio < 0.4) {
        calculatedProgress = Math.round(ratio * 1.3 * 100);
      } else if (ratio < 0.85) {
        calculatedProgress = Math.round(52 + (ratio - 0.4) * 0.7 * 100);
      } else {
        calculatedProgress = Math.round(83.5 + (ratio - 0.85) * 1.1 * 100);
      }

      if (calculatedProgress >= 100) {
        setProgress(100);
        clearInterval(timer);

        // Exit screen fade
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
        }, 1000);
      } else {
        setProgress(calculatedProgress);
      }
    };

    timer = setInterval(updateProgress, intervalTime);
    return () => clearInterval(timer);
  }, [onComplete]);

  // Autoplay handler
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay check: ", err);
      });
    }
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Loader background video */}
          <video
            ref={videoRef}
            src={loaderVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-light/10 rounded-full blur-[100px] pointer-events-none z-[2]" />

          {/* Loader Elements Overlay Container */}
          <div className="relative z-20 flex flex-col items-center justify-between w-full h-full max-w-2xl px-8 py-14 md:py-20 text-center">

            {/* Top: Brand Logo & Interactive MITS Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center gap-5 mt-4"
            >

              {/* Enhanced Interactive MITS - DU School C Program Button */}
              <motion.button
                onClick={onNavigateHome}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-[#E6D5C3] shadow-sm hover:shadow-md hover:border-accent-light transition-all duration-300 cursor-pointer overflow-hidden"
                style={{ backgroundColor: "#F5EFE6" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent-light/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="relative z-10 font-display font-black text-lg md:text-xl text-gray-900 tracking-wide">
                  MITS School Connect Program
                </span>

                <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>

              <div>
                <h1 className="font-display font-bold text-lg tracking-[0.1em] text-white">
                  IoTify Lab
                </h1>
                <div className="h-[1.5px] w-8 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-1" />
              </div>
            </motion.div>

            <div className="flex-1" />

            {/* Bottom: Modern progress bar & status text */}
            <div className="w-full space-y-4 mb-6">
              <div className="flex items-baseline justify-between font-body text-xs tracking-wider text-white/70">
                <span className="text-accent font-semibold uppercase tracking-[0.18em] text-[10px]">
                  Initializing Platform...
                </span>
                <span className="font-mono text-sm font-semibold text-white tracking-wider">
                  {progress}%
                </span>
              </div>

              <div className="h-[4px] w-full bg-white/20 rounded-full overflow-hidden relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent via-accent-light to-blue-500"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>

              <p className="text-[10px] tracking-[0.2em] text-white/50 font-body uppercase font-medium">
                MITS Gwalior
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Shown while the admin bundle is fetched. Deliberately plain — it is on screen
 * for a fraction of a second on a warm cache, and a spinner that flashes is
 * more distracting than a still frame.
 */
function AdminChunkLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07090E]">
      <div className="flex items-center gap-3 text-slate-400 text-sm font-mono">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        Loading portal…
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(pageFromLocation);
  const [isLoading, setIsLoading] = useState(
    () => !pageFromLocation().startsWith("admin-")
  );

  const navigate = useCallback((page) => {
    const target = PAGES[page] ? page : "home";
    setCurrentPage(target);
    const path = PAGE_TO_PATH[target] || "/";
    if (window.location.pathname !== path) {
      window.history.pushState({ page: target }, "", path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentPage(pageFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage] || "IoTily Lab";
  }, [currentPage]);

  const PageComponent = PAGES[currentPage] || PAGES.home;
  const isAdminRoute = currentPage.startsWith("admin-");

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-cream-primary text-gray-900 font-body antialiased selection:bg-accent/20 selection:text-gray-900">
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#2f73a4ff',
            color: '#111827',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }
        }} />

        {isLoading && (
          <Loader
            onComplete={() => setIsLoading(false)}
            onNavigateHome={() => {
              setIsLoading(false);
              navigate("home");
            }}
          />
        )}

        {isAdminRoute ? (
          <Suspense fallback={<AdminChunkLoading />}>
            <AdminLayout currentPage={currentPage} onNavigate={navigate}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PageComponent onNavigate={navigate} />
                </motion.div>
              </AnimatePresence>
            </AdminLayout>
          </Suspense>
        ) : (
          <>
            <BackgroundField />

            {!isLoading && <Navbar currentPage={currentPage} onNavigate={navigate} />}

            <main className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PageComponent onNavigate={navigate} />
                </motion.div>
              </AnimatePresence>
            </main>

            {!isLoading && (
              <div className="relative z-10">
                <Footer onNavigate={navigate} />
              </div>
            )}

            {!isLoading && (
              <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-3 pointer-events-auto">
                <a
                  href={whatsappLink(WHATSAPP_GENERAL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300"
                  aria-label="Contact on WhatsApp"
                >
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </AuthProvider>
  );
}