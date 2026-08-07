import { useEffect, useState } from "react";
import { Menu, AlertTriangle, RefreshCw } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { refreshCollections, useSyncState } from "../../lib/useCollection";
import AdminSidebar from "./AdminSidebar";
import { Panel } from "./ui";

const PAGE_LABELS = {
  "admin-dashboard": "Dashboard",
  "admin-workshops": "Workshops",
  "admin-registrations": "Registrations",
  "admin-announcements": "Announcements",
  "admin-exports": "Exports",
  "admin-logs": "Activity Logs",
  "admin-settings": "Settings",
};

/**
 * The API answered, but it has no database or no signing secret — nobody can
 * sign in until that is fixed, so say what to fix rather than showing a login
 * form that can only fail.
 */
function SetupNotice({ message }) {
  return (
    <div className="admin-root min-h-screen flex items-center justify-center p-6"
         style={{ background: "var(--a-bg)" }}>
      <Panel className="p-8 max-w-lg">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{
            color: "#FFD166",
            background: "rgba(234,179,8,0.1)",
            border: "1px solid rgba(234,179,8,0.24)",
          }}
        >
          <AlertTriangle size={24} />
        </div>
        <h1 className="a-title text-2xl mb-3">The portal isn't configured yet</h1>
        <p className="a-muted text-sm leading-relaxed mb-4">
          {message || "The API could not reach a database."}
        </p>
        <ol className="a-muted text-sm space-y-2 list-decimal list-inside mb-5">
          <li>
            Copy <code className="text-cyan-primary">.env.example</code> to{" "}
            <code className="text-cyan-primary">.env</code>
          </li>
          <li>
            Set <code className="text-cyan-primary">DATABASE_URL</code> and{" "}
            <code className="text-cyan-primary">JWT_SECRET</code>
          </li>
          <li>
            Run <code className="text-cyan-primary">npm run db:migrate</code>, then restart
            the dev server
          </li>
        </ol>
        <p className="a-muted text-xs leading-relaxed">
          Full walkthrough, including creating the first Super Admin, is in{" "}
          <strong className="text-white/80">ADMIN_SETUP.md</strong>.
        </p>
      </Panel>
    </div>
  );
}

/**
 * How fresh the numbers on screen are.
 *
 * Firestore streamed changes, so "live" could be left unsaid. Data now
 * arrives by polling, and an admin deciding whether to approve a booking
 * deserves to know whether they are looking at a snapshot from two seconds
 * ago or two minutes ago — and to be able to force the question.
 */
function SyncIndicator() {
  const { lastSyncedAt, syncing } = useSyncState();
  const [, tick] = useState(0);

  // Re-render on a timer so "12s ago" doesn't freeze at the moment of fetch.
  useEffect(() => {
    const timer = setInterval(() => tick((n) => n + 1), 5000);
    return () => clearInterval(timer);
  }, []);

  const label = (() => {
    if (syncing) return "Syncing…";
    if (!lastSyncedAt) return "Not synced";
    const seconds = Math.round((Date.now() - lastSyncedAt.getTime()) / 1000);
    if (seconds < 10) return "Up to date";
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.round(seconds / 60)}m ago`;
  })();

  return (
    <button
      onClick={refreshCollections}
      className="a-btn a-btn-ghost a-btn-sm"
      title="Refresh now"
      aria-label={`Data ${label}. Refresh now.`}
    >
      <RefreshCw size={13} className={syncing ? "animate-spin" : undefined} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export default function AdminLayout({ children, currentPage, onNavigate }) {
  const { adminProfile, loading, authError, setupRequired } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = currentPage === "admin-login";

  // Bounce unauthenticated visitors back to the login screen. An admin account
  // is now both the credential and the grant, so there is no signed-in-but-
  // unauthorised state left to handle: no profile means no session.
  useEffect(() => {
    if (!loading && !adminProfile && !isLoginPage) {
      onNavigate("admin-login");
    }
  }, [loading, adminProfile, isLoginPage, onNavigate]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setMobileOpen(false), [currentPage]);

  if (setupRequired) return <SetupNotice message={authError} />;

  if (loading) {
    return (
      <div
        className="admin-root min-h-screen flex items-center justify-center"
        style={{ background: "var(--a-bg)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-9 h-9 rounded-full border-2 border-cyan-primary/20 border-t-cyan-primary animate-spin" />
          <p className="a-muted text-sm">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div
        className="admin-root min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "var(--a-bg)" }}
      >
        <div className="absolute inset-0 bg-grid-lines bg-[size:32px_32px] opacity-[0.045]" />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[620px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "rgba(0,207,255,0.07)", filter: "blur(150px)" }}
        />
        <div className="relative z-10 w-full">{children}</div>
      </div>
    );
  }

  if (!adminProfile) return null; // redirect above is in flight

  return (
    <div className="admin-root min-h-screen" style={{ background: "var(--a-bg)" }}>
      <div className="fixed inset-0 bg-grid-lines bg-[size:32px_32px] opacity-[0.025] pointer-events-none" />

      <AdminSidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Top bar — sticky on every width, so the refresh control and the
          current section stay reachable while a long table scrolls. */}
      <header
        className="sticky top-0 z-40 lg:ml-64 h-14 flex items-center gap-3 px-4 sm:px-6 backdrop-blur-xl"
        style={{
          background: "rgba(5,7,11,0.85)",
          borderBottom: "1px solid var(--a-line-soft)",
        }}
      >
        <button
          onClick={() => setMobileOpen(true)}
          className="a-icon-btn lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={19} />
        </button>

        <span className="a-title text-sm truncate">
          {PAGE_LABELS[currentPage] || "Admin"}
        </span>

        <div className="ml-auto flex items-center gap-1">
          <SyncIndicator />
        </div>
      </header>

      <main className="lg:ml-64 relative z-10 px-4 sm:px-6 lg:px-10 py-7 lg:py-9">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
