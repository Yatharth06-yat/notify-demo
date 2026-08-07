import { useMemo, useState } from "react";
import { ScrollText, Search, Loader2 } from "lucide-react";
import { useCollection, formatDateTime, toDate } from "../../lib/useCollection";
import Pagination from "../../components/admin/Pagination";

export default function AdminActivityLogs() {
  const [logs, loading, error] = useCollection("activityLogs");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return [...logs]
      .sort(
        (a, b) =>
          (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0)
      )
      .filter((log) => {
        if (!s) return true;
        return [log.actorName, log.action, log.target]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(s);
      });
  }, [logs, search]);

  // Clamp so a shrinking result set never lands on a blank page.
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="a-title text-2xl sm:text-[28px] leading-tight">Activity Logs</h1>
        <p className="a-muted text-sm mt-1.5">
          Every action taken in the admin portal, newest first.
        </p>
      </div>

      <div className="a-panel flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-white/[0.05]">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 a-muted"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by admin, action or target…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center a-muted flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Loading logs…
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-400 text-sm">
              Could not load activity logs. {error.message}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center a-muted text-sm flex flex-col items-center justify-center min-h-[280px]">
              <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-4 text-cyan-primary/50">
                <ScrollText size={24} />
              </div>
              <p className="text-white font-medium mb-1">No Activity Yet</p>
              <p>Admin actions will be recorded here.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.05] a-muted text-xs uppercase tracking-wider font-display">
                  <th className="p-4 font-medium">Admin</th>
                  <th className="p-4 font-medium">Action</th>
                  <th className="p-4 font-medium">Target</th>
                  <th className="p-4 font-medium whitespace-nowrap">When</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors text-sm"
                  >
                    <td className="p-4 text-white font-medium">{log.actorName}</td>
                    <td className="p-4 text-white/80">{log.action}</td>
                    <td className="p-4 a-muted">{log.target || "—"}</td>
                    <td className="p-4 a-muted text-xs whitespace-nowrap">
                      {formatDateTime(log.createdAt)}
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
    </div>
  );
}
