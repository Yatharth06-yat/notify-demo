import { useState, useMemo } from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import toast from "react-hot-toast";
import Papa from "papaparse";
import { useCollection, formatDateTime } from "../../lib/useCollection";
import { useAuth } from "../../contexts/AuthContext";
import { logActivity } from "../../lib/activityLog";

const controlClass = "a-field";

const COLUMNS = [
  ["Registration ID", (r) => r.id],
  ["Name", (r) => r.name || ""],
  ["Enrollment Number", (r) => r.enrollment || ""],
  ["Email", (r) => r.email || ""],
  ["Phone", (r) => r.phone || ""],
  ["Gender", (r) => r.gender || ""],
  ["Department", (r) => r.department || ""],
  ["Year", (r) => r.year || ""],
  ["Semester", (r) => r.semester || ""],
  ["College", (r) => r.collegeName || ""],
  ["Workshop", (r) => r.workshopTitle || r.workshopId || ""],
  ["Amount", (r) => r.amount ?? ""],
  ["Coupon", (r) => r.couponCode || ""],
  ["Status", (r) => r.status || "Pending"],
  ["Registered At", (r) => formatDateTime(r.createdAt)],
  ["Reviewed By", (r) => r.reviewedBy || ""],
];

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const escapeHtml = (v) =>
  String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export default function AdminExports() {
  const { adminProfile } = useAuth();
  const [registrations, loadingRegs] = useCollection("registrations");
  const [workshops, loadingWs] = useCollection("workshops");

  const [selectedWorkshop, setSelectedWorkshop] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const loading = loadingRegs || loadingWs;

  const departments = useMemo(
    () => [...new Set(registrations.map((r) => r.department).filter(Boolean))].sort(),
    [registrations]
  );
  const years = useMemo(
    () => [...new Set(registrations.map((r) => r.year).filter(Boolean))].sort(),
    [registrations]
  );

  const filtered = useMemo(
    () =>
      registrations.filter((r) => {
        if (selectedWorkshop !== "all" && r.workshopId !== selectedWorkshop) return false;
        if (selectedStatus !== "all" && (r.status || "Pending") !== selectedStatus)
          return false;
        if (selectedDepartment !== "all" && r.department !== selectedDepartment)
          return false;
        if (selectedYear !== "all" && r.year !== selectedYear) return false;
        return true;
      }),
    [registrations, selectedWorkshop, selectedStatus, selectedDepartment, selectedYear]
  );

  const rows = useMemo(
    () =>
      filtered.map((r) =>
        Object.fromEntries(COLUMNS.map(([header, get]) => [header, get(r)]))
      ),
    [filtered]
  );

  const stamp = () => new Date().toISOString().split("T")[0];

  const exportCsv = () => {
    if (rows.length === 0) return toast.error("No records match these filters");
    download(
      new Blob([Papa.unparse(rows)], { type: "text/csv;charset=utf-8;" }),
      `iotify_registrations_${stamp()}.csv`
    );
    toast.success(`Exported ${rows.length} records to CSV`);
    logActivity(adminProfile, `Exported ${rows.length} registrations (CSV)`);
  };

  const exportExcel = () => {
    if (rows.length === 0) return toast.error("No records match these filters");
    // Excel opens an HTML table saved as .xls natively — no extra dependency,
    // and unlike CSV it preserves long enrollment numbers as text.
    const headers = COLUMNS.map(([h]) => `<th>${escapeHtml(h)}</th>`).join("");
    const body = rows
      .map(
        (row) =>
          `<tr>${COLUMNS.map(
            ([h]) => `<td style="mso-number-format:'\\@'">${escapeHtml(row[h] ?? "")}</td>`
          ).join("")}</tr>`
      )
      .join("");
    const html = `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8" /></head><body><table border="1"><thead><tr>${headers}</tr></thead><tbody>${body}</tbody></table></body></html>`;

    download(
      new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" }),
      `iotify_registrations_${stamp()}.xls`
    );
    toast.success(`Exported ${rows.length} records to Excel`);
    logActivity(adminProfile, `Exported ${rows.length} registrations (Excel)`);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="a-title text-2xl sm:text-[28px] leading-tight">Data Export</h1>
        <p className="a-muted text-sm mt-1.5">
          Download registration data for reporting or attendance sheets.
        </p>
      </div>

      <div className="a-panel overflow-hidden">
        <div className="p-8 border-b border-white/[0.05] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-primary/10 flex items-center justify-center text-cyan-primary shrink-0">
            <FileSpreadsheet size={24} />
          </div>
          <div>
            <h2 className="a-title text-[15px]">
              Export Registrations
            </h2>
            <p className="a-muted text-sm mt-1.5">
              Choose what to include, then download as CSV or Excel.
            </p>
          </div>
        </div>

        <div className="p-8 flex flex-col gap-6">
          {loading ? (
            <div className="a-muted text-sm">Loading options…</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs a-muted uppercase tracking-wider font-display">
                    Workshop
                  </label>
                  <select
                    value={selectedWorkshop}
                    onChange={(e) => setSelectedWorkshop(e.target.value)}
                    className={controlClass}
                  >
                    <option value="all">All Workshops</option>
                    {workshops.map((ws) => (
                      <option key={ws.id} value={ws.id}>
                        {ws.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs a-muted uppercase tracking-wider font-display">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={controlClass}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Approved">Approved Only</option>
                    <option value="Pending">Pending Only</option>
                    <option value="Rejected">Rejected Only</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs a-muted uppercase tracking-wider font-display">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className={controlClass}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs a-muted uppercase tracking-wider font-display">
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className={controlClass}
                  >
                    <option value="all">All Years</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-sm">
                <span className="a-muted">Matching records: </span>
                <span className="text-white font-display font-bold text-lg">
                  {filtered.length}
                </span>
                <span className="a-muted"> of {registrations.length}</span>
              </div>

              <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={exportCsv}
                  disabled={filtered.length === 0}
                  className="a-btn a-btn-primary px-8 py-3 rounded-xl flex items-center justify-center gap-2 font-medium disabled:opacity-40"
                >
                  <Download size={18} />
                  Download CSV
                </button>
                <button
                  onClick={exportExcel}
                  disabled={filtered.length === 0}
                  className="px-8 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.06] transition-colors disabled:opacity-40"
                >
                  <FileText size={18} />
                  Download Excel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
