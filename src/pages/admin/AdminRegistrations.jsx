import { useState, useMemo, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  X,
  Loader2,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateDoc, deleteDoc } from "../../lib/api";
import { useCollection, formatDateTime, toDate } from "../../lib/useCollection";
import { useAuth } from "../../contexts/AuthContext";
import { logActivity } from "../../lib/activityLog";
import { sendStatusEmail, isMailerConfigured } from "../../lib/mailer";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { StatusBadge } from "../../components/admin/ui";
import Pagination from "../../components/admin/Pagination";

const STATUSES = ["Pending", "Approved", "Rejected"];

const EMPTY_FILTERS = {
  workshop: "all",
  status: "all",
  department: "all",
  year: "all",
  from: "",
  to: "",
};

const controlClass = "a-field";

// Status colours come from the shared StatusBadge so a "Rejected" row looks
// the same here, on the dashboard and on the workshops screen.
const StatusPill = StatusBadge;

export default function AdminRegistrations() {
  const { adminProfile, can } = useAuth();
  const [registrations, loading, error] = useCollection("registrations");
  const [workshops] = useCollection("workshops");
  const [settings] = useCollection("settings");

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [confirm, setConfirm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const canWrite = can("registrations:write");
  const canDelete = can("registrations:delete");

  const labInfo = useMemo(
    () => settings.find((s) => s.id === "general") || {},
    [settings]
  );

  // Distinct values for the filter dropdowns, derived from live data.
  const departments = useMemo(
    () =>
      [...new Set(registrations.map((r) => r.department).filter(Boolean))].sort(),
    [registrations]
  );
  const years = useMemo(
    () => [...new Set(registrations.map((r) => r.year).filter(Boolean))].sort(),
    [registrations]
  );

  const sorted = useMemo(
    () =>
      [...registrations].sort((a, b) => {
        const da = toDate(a.createdAt)?.getTime() || 0;
        const dbb = toDate(b.createdAt)?.getTime() || 0;
        return dbb - da;
      }),
    [registrations]
  );

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    const fromTime = filters.from ? new Date(`${filters.from}T00:00:00`).getTime() : null;
    const toTime = filters.to ? new Date(`${filters.to}T23:59:59`).getTime() : null;

    return sorted.filter((reg) => {
      if (s) {
        const haystack = [reg.name, reg.email, reg.enrollment, reg.phone]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(s)) return false;
      }
      if (filters.workshop !== "all" && reg.workshopId !== filters.workshop) return false;
      if (filters.status !== "all" && (reg.status || "Pending") !== filters.status)
        return false;
      if (filters.department !== "all" && reg.department !== filters.department)
        return false;
      if (filters.year !== "all" && reg.year !== filters.year) return false;

      if (fromTime || toTime) {
        const t = toDate(reg.createdAt)?.getTime();
        if (!t) return false;
        if (fromTime && t < fromTime) return false;
        if (toTime && t > toTime) return false;
      }
      return true;
    });
  }, [sorted, search, filters]);

  // Reset to page 1 whenever the result set changes shape.
  useEffect(() => setPage(1), [search, filters, pageSize]);

  // Clamp so deleting the last row on the final page doesn't leave a blank table.
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(
    () => filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filtered, safePage, pageSize]
  );

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => v !== EMPTY_FILTERS[k]
  ).length;

  const counts = useMemo(
    () => ({
      total: registrations.length,
      Pending: registrations.filter((r) => (r.status || "Pending") === "Pending").length,
      Approved: registrations.filter((r) => r.status === "Approved").length,
      Rejected: registrations.filter((r) => r.status === "Rejected").length,
    }),
    [registrations]
  );

  const updateStatus = async (reg, status) => {
    if (!canWrite) return toast.error("You don't have permission to do that");
    setUpdatingId(reg.id);
    try {
      // Who reviewed it and when are stamped by the API from the session, not
      // sent from here.
      await updateDoc("registrations", reg.id, { status });
      toast.success(`Registration ${status.toLowerCase()}`);
      logActivity(adminProfile, `${status} registration`, `${reg.name} — ${reg.workshopTitle || ""}`);

      if (selectedReg?.id === reg.id) setSelectedReg({ ...selectedReg, status });

      // Email is best-effort; a failure never undoes the status change.
      if (isMailerConfigured(status)) {
        const result = await sendStatusEmail(reg, status, labInfo);
        if (result.sent) toast.success(`Notified ${reg.email}`);
        else toast.error("Status saved, but the notification email failed to send");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const askDelete = (reg) => {
    setConfirm({
      title: "Delete registration?",
      tone: "danger",
      message: `${reg.name}'s registration for "${reg.workshopTitle || "this workshop"}" will be permanently deleted. This cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        setBusy(true);
        try {
          await deleteDoc("registrations", reg.id);
          toast.success("Registration deleted");
          logActivity(adminProfile, "Deleted registration", reg.name);
          if (selectedReg?.id === reg.id) setSelectedReg(null);
          setConfirm(null);
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete registration");
        } finally {
          setBusy(false);
        }
      },
    });
  };

  const bulkApprovePending = () => {
    const targets = filtered.filter((r) => (r.status || "Pending") === "Pending");
    if (targets.length === 0) return toast.error("No pending registrations in view");
    setConfirm({
      title: `Approve ${targets.length} registration${targets.length === 1 ? "" : "s"}?`,
      message:
        "Every pending registration matching your current filters will be approved. Notification emails will be sent if EmailJS is configured.",
      confirmLabel: "Approve all",
      onConfirm: async () => {
        setBusy(true);
        let ok = 0;
        for (const reg of targets) {
          try {
            await updateDoc("registrations", reg.id, { status: "Approved" });
            ok++;
            if (isMailerConfigured("Approved")) await sendStatusEmail(reg, "Approved", labInfo);
          } catch (err) {
            console.error(err);
          }
        }
        logActivity(adminProfile, `Bulk approved ${ok} registrations`);
        toast.success(`Approved ${ok} of ${targets.length}`);
        setBusy(false);
        setConfirm(null);
      },
    });
  };

  return (
    <div className="flex flex-col gap-8 relative">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="a-title text-2xl sm:text-[28px] leading-tight flex items-center gap-2.5">
            <span>Book Section Registrations</span>
            <span className="a-badge a-badge-info text-xs px-2.5 py-0.5">Live Bookings</span>
          </h1>
          <p className="a-muted text-sm mt-1.5">
            Submitted workshop bookings & seat requests ({counts.total} total · {counts.Pending} pending · {counts.Approved} approved ·{" "}
            {counts.Rejected} rejected)
          </p>
        </div>
        {canWrite && counts.Pending > 0 && (
          <button
            onClick={bulkApprovePending}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors"
          >
            Approve all in view
          </button>
        )}
      </div>

      <div className="a-panel flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/[0.05] flex flex-col gap-4">
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 a-muted"
                size={16}
              />
              <input
                type="text"
                placeholder="Search name, email, enrollment or phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-primary/50 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 border transition-all ${
                showFilters || activeFilterCount
                  ? "bg-cyan-primary/10 border-cyan-primary/30 text-cyan-primary"
                  : "bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.06]"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-cyan-primary/20 text-[10px]">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="px-3 py-2 text-sm a-muted hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              <select
                value={filters.workshop}
                onChange={(e) => setFilters({ ...filters, workshop: e.target.value })}
                className={controlClass}
              >
                <option value="all">All workshops</option>
                {workshops.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.title}
                  </option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className={controlClass}
              >
                <option value="all">All statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                className={controlClass}
              >
                <option value="all">All departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className={controlClass}
              >
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <label className="text-xs a-muted whitespace-nowrap">From</label>
                <input
                  type="date"
                  value={filters.from}
                  onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                  className={`${controlClass} flex-1`}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs a-muted whitespace-nowrap">To</label>
                <input
                  type="date"
                  value={filters.to}
                  onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                  className={`${controlClass} flex-1`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center a-muted flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Loading registrations…
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-400 text-sm">
              Could not load registrations. {error.message}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center a-muted text-sm flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-white font-medium mb-1">No Registrations Found</p>
              <p>
                {registrations.length === 0
                  ? "Registrations from the booking page will appear here."
                  : "No records match your search or filters."}
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[880px]">
              <thead>
                <tr className="border-b border-white/[0.05] a-muted text-xs uppercase tracking-wider font-display">
                  <th className="p-4 font-medium whitespace-nowrap">Student</th>
                  <th className="p-4 font-medium whitespace-nowrap">Enrollment</th>
                  <th className="p-4 font-medium whitespace-nowrap">Dept / Year</th>
                  <th className="p-4 font-medium whitespace-nowrap">Workshop</th>
                  <th className="p-4 font-medium whitespace-nowrap">Registered</th>
                  <th className="p-4 font-medium whitespace-nowrap">Status</th>
                  <th className="p-4 font-medium text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors text-sm"
                  >
                    <td className="p-4">
                      <div className="font-medium text-white">{reg.name}</div>
                      <div className="text-xs a-muted">{reg.email}</div>
                    </td>
                    <td className="p-4 text-white/80">{reg.enrollment}</td>
                    <td className="p-4">
                      <div className="text-white/80">{reg.department}</div>
                      <div className="text-xs a-muted">{reg.year}</div>
                    </td>
                    <td className="p-4 text-white/80 max-w-[200px] truncate">
                      {reg.workshopTitle || reg.workshopId}
                    </td>
                    <td className="p-4 a-muted text-xs whitespace-nowrap">
                      {formatDateTime(reg.createdAt)}
                    </td>
                    <td className="p-4">
                      <StatusPill status={reg.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="p-2 hover:bg-white/[0.05] rounded-lg a-muted hover:text-white transition-colors"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        {canWrite && (
                          <>
                            <button
                              onClick={() => updateStatus(reg, "Approved")}
                              disabled={updatingId === reg.id || reg.status === "Approved"}
                              className="p-2 hover:bg-green-500/10 rounded-lg a-muted hover:text-green-400 transition-colors disabled:opacity-30"
                              title="Approve"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button
                              onClick={() => updateStatus(reg, "Rejected")}
                              disabled={updatingId === reg.id || reg.status === "Rejected"}
                              className="p-2 hover:bg-red-500/10 rounded-lg a-muted hover:text-red-400 transition-colors disabled:opacity-30"
                              title="Reject"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => askDelete(reg)}
                            className="p-2 hover:bg-red-500/10 rounded-lg a-muted hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {filtered.length > 0 && (
          <Pagination
            page={safePage}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>

      {/* Details modal */}
      {selectedReg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedReg(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0A0E14] border border-white/[0.08] rounded-2xl w-full max-w-xl shadow-2xl my-8"
          >
            <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-white">
                Registration Details
              </h2>
              <button
                onClick={() => setSelectedReg(null)}
                className="a-muted hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Name", selectedReg.name],
                  ["Enrollment", selectedReg.enrollment],
                  ["Email", selectedReg.email],
                  ["Phone", selectedReg.phone],
                  ["Department", selectedReg.department],
                  ["Year", selectedReg.year],
                  ["Semester", selectedReg.semester],
                  ["Gender", selectedReg.gender],
                  ["College", selectedReg.collegeName],
                  ["Registered", formatDateTime(selectedReg.createdAt)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-xs a-muted uppercase font-display mb-1">
                      {label}
                    </div>
                    <div className="text-white text-sm break-words">{value || "—"}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                <div className="text-xs a-muted uppercase font-display mb-1">
                  Selected Workshop
                </div>
                <div className="text-white font-medium">
                  {selectedReg.workshopTitle || selectedReg.workshopId}
                </div>
                {(selectedReg.amount > 0 || selectedReg.couponCode) && (
                  <div className="text-xs a-muted mt-2">
                    Amount: ₹{Number(selectedReg.amount || 0).toLocaleString("en-IN")}
                    {selectedReg.couponCode && ` · Coupon: ${selectedReg.couponCode}`}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs a-muted uppercase font-display">
                  Current Status
                </div>
                <StatusPill status={selectedReg.status} />
              </div>

              {selectedReg.reviewedBy && (
                <div className="flex items-center justify-between text-xs">
                  <span className="a-muted uppercase font-display">Reviewed by</span>
                  <span className="text-white/80">{selectedReg.reviewedBy}</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/[0.05] flex flex-wrap justify-between gap-3 bg-black/20 rounded-b-2xl">
              <a
                href={`mailto:${selectedReg.email}`}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors flex items-center gap-2"
              >
                <Mail size={15} />
                Email student
              </a>
              {canWrite && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(selectedReg, "Rejected")}
                    disabled={updatingId === selectedReg.id}
                    className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(selectedReg, "Approved")}
                    disabled={updatingId === selectedReg.id}
                    className="px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog state={confirm} busy={busy} onClose={() => setConfirm(null)} />
    </div>
  );
}
