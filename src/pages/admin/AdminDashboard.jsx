import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Armchair,
  CalendarClock,
  ArrowRight,
  Inbox,
  CalendarX,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useCollection, toDate, formatDateTime } from "../../lib/useCollection";
import { useAuth } from "../../contexts/AuthContext";
import {
  Button,
  EmptyState,
  ErrorNotice,
  PageHeader,
  Panel,
  PanelHeader,
  StatusBadge,
} from "../../components/admin/ui";

const COLORS = ["#00CFFF", "#4F7DFF", "#7DF9FF", "#FFBB28", "#FF8042", "#A78BFA"];

const tooltipStyle = {
  backgroundColor: "#0A0E14",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  fontSize: 12,
};

const axis = {
  stroke: "rgba(255,255,255,0.35)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

function StatCard({ label, value, icon: Icon, color, index, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="a-panel p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon size={15} className={color} />
        <span className="a-label truncate">{label}</span>
      </div>
      {loading ? (
        <div className="a-skeleton h-7 w-12" />
      ) : (
        <div className="a-title a-num text-[28px] leading-none">{value}</div>
      )}
    </motion.div>
  );
}

/** Seats taken as a bar — a number next to a number needs mental arithmetic. */
function SeatMeter({ taken, total }) {
  const ratio = total > 0 ? Math.min(1, taken / total) : 0;
  const full = total > 0 && taken >= total;

  return (
    <div className="w-28">
      <div className="flex items-center justify-between mb-1.5">
        <span className="a-num text-[11px]" style={{ color: full ? "#FF8A8A" : "var(--a-text-2)" }}>
          {taken}/{total || "∞"}
        </span>
        {full && <span className="text-[10px] font-semibold" style={{ color: "#FF8A8A" }}>FULL</span>}
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--a-inset)" }}>
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${ratio * 100}%`,
            background: full ? "#EF4444" : ratio > 0.8 ? "#FFBB28" : "var(--a-accent)",
          }}
        />
      </div>
    </div>
  );
}

export default function AdminDashboard({ onNavigate }) {
  const { adminProfile } = useAuth();
  const [workshops, loadingWorkshops] = useCollection("workshops");
  const [registrations, loadingRegs, error] = useCollection("registrations");

  const loading = loadingWorkshops || loadingRegs;

  const stats = useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayStr = new Date().toISOString().split("T")[0];

    const upcoming = workshops.filter((w) => (w.date || "") >= todayStr);

    // Anything not rejected occupies a seat.
    const takenByWorkshop = {};
    registrations.forEach((r) => {
      if (r.status === "Rejected") return;
      takenByWorkshop[r.workshopId] = (takenByWorkshop[r.workshopId] || 0) + 1;
    });

    const availableSeats = upcoming.reduce((sum, w) => {
      const total = Number(w.seats) || 0;
      return sum + Math.max(0, total - (takenByWorkshop[w.id] || 0));
    }, 0);

    return {
      workshops: workshops.length,
      upcoming: upcoming.length,
      totalRegs: registrations.length,
      pending: registrations.filter((r) => (r.status || "Pending") === "Pending").length,
      todayRegs: registrations.filter((r) => {
        const d = toDate(r.createdAt);
        return d && d >= startOfToday;
      }).length,
      availableSeats,
      upcomingList: [...upcoming]
        .sort((a, b) => (a.date || "").localeCompare(b.date || ""))
        .slice(0, 5)
        .map((w) => ({ ...w, taken: takenByWorkshop[w.id] || 0 })),
    };
  }, [workshops, registrations]);

  const charts = useMemo(() => {
    // Registration trend — last 7 days.
    const trendMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      trendMap[d.toLocaleDateString("en-US", { month: "short", day: "numeric" })] = 0;
    }

    const deptMap = {};
    const wsMap = {};
    const yearMap = {};

    registrations.forEach((r) => {
      const d = toDate(r.createdAt);
      if (d) {
        const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (trendMap[key] !== undefined) trendMap[key]++;
      }
      if (r.department) deptMap[r.department] = (deptMap[r.department] || 0) + 1;
      if (r.year) yearMap[r.year] = (yearMap[r.year] || 0) + 1;
      const ws = r.workshopTitle || r.workshopId || "Unknown";
      wsMap[ws] = (wsMap[ws] || 0) + 1;
    });

    const toSortedArray = (map, valueKey = "count") =>
      Object.entries(map)
        .map(([name, v]) => ({ name, [valueKey]: v }))
        .sort((a, b) => b[valueKey] - a[valueKey]);

    return {
      trend: Object.entries(trendMap).map(([name, count]) => ({ name, count })),
      departments: toSortedArray(deptMap).slice(0, 5),
      workshops: toSortedArray(wsMap, "value").slice(0, 6),
      years: toSortedArray(yearMap).sort((a, b) => a.name.localeCompare(b.name)),
    };
  }, [registrations]);

  const recentRegs = useMemo(
    () =>
      [...registrations]
        .sort(
          (a, b) =>
            (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0)
        )
        .slice(0, 6),
    [registrations]
  );

  const statCards = [
    { label: "Workshops", value: stats.workshops, icon: Calendar, color: "text-blue-400" },
    { label: "Upcoming", value: stats.upcoming, icon: CalendarClock, color: "text-cyan-bright" },
    { label: "Registrations", value: stats.totalRegs, icon: Users, color: "text-purple-400" },
    { label: "Today", value: stats.todayRegs, icon: Clock, color: "text-cyan-400" },
    { label: "Pending", value: stats.pending, icon: CheckCircle, color: "text-yellow-400" },
    { label: "Seats Left", value: stats.availableSeats, icon: Armchair, color: "text-green-400" },
  ];

  const hasData = registrations.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`Good ${greeting()}, ${adminProfile?.name?.split(" ")[0] || "admin"}`}
        subtitle="Everything happening across the lab's workshops, at a glance."
      />

      {error && <ErrorNotice>Could not load data. {error.message}</ErrorNotice>}

      {/* The one thing worth interrupting for: bookings waiting on a decision.
          A count buried in a six-tile grid is a number; this is a task. */}
      {!loading && stats.pending > 0 && (
        <Panel
          className="p-4 flex items-center gap-4 w-full"
          style={{ borderColor: "rgba(234,179,8,0.24)", background: "rgba(234,179,8,0.05)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(234,179,8,0.12)", color: "#FFD166" }}
          >
            <Inbox size={19} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-semibold">
              {stats.pending} registration{stats.pending === 1 ? "" : "s"} waiting for review
            </p>
            <p className="a-muted text-xs mt-0.5">
              Students are emailed as soon as you approve or reject.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate?.("admin-registrations")}
            icon={ArrowRight}
          >
            Review
          </Button>
        </Panel>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {statCards.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} loading={loading} />
        ))}
      </div>

      {/* Charts */}
      {!loading && hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Panel>
            <PanelHeader title="Registrations" description="Last 7 days" />
            <div className="h-60 p-4 pr-5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.trend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis dataKey="name" {...axis} />
                  <YAxis {...axis} allowDecimals={false} width={28} />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#00CFFF" }} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#00CFFF"
                    strokeWidth={2.5}
                    dot={{ fill: "#00CFFF", strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Workshop popularity" description="Share of all bookings" />
            <div className="h-60 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.workshops}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={45}
                    outerRadius={78}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {charts.workshops.map((entry, i) => (
                      <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Top departments" />
            <div className="h-60 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.departments} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    horizontal={false}
                  />
                  <XAxis type="number" {...axis} allowDecimals={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    {...axis}
                    stroke="rgba(255,255,255,0.7)"
                    width={100}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={tooltipStyle}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
                    {charts.departments.map((entry, i) => (
                      <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Year of study" />
            <div className="h-60 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.years}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis dataKey="name" {...axis} />
                  <YAxis {...axis} allowDecimals={false} width={28} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={tooltipStyle}
                  />
                  <Bar dataKey="count" fill="#4F7DFF" radius={[4, 4, 0, 0]} maxBarSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Upcoming workshops */}
        <Panel className="overflow-hidden">
          <PanelHeader title="Upcoming workshops">
            <Button variant="ghost" size="sm" onClick={() => onNavigate?.("admin-workshops")}>
              Manage <ArrowRight size={13} />
            </Button>
          </PanelHeader>

          {loading ? (
            <div className="p-5 flex flex-col gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="a-skeleton h-9" style={{ opacity: 1 - i * 0.2 }} />
              ))}
            </div>
          ) : stats.upcomingList.length === 0 ? (
            <EmptyState
              icon={CalendarX}
              title="Nothing scheduled"
              description="Workshops dated today or later will show up here with their seat count."
            />
          ) : (
            <div>
              {stats.upcomingList.map((w) => (
                <div
                  key={w.id}
                  className="px-5 py-3.5 flex items-center justify-between gap-4"
                  style={{ borderTop: "1px solid var(--a-line-soft)" }}
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{w.title}</p>
                    <p className="a-muted text-xs mt-0.5 truncate">
                      {w.date}
                      {w.time && ` · ${w.time}`}
                      {w.venue && ` · ${w.venue}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <SeatMeter taken={w.taken} total={Number(w.seats) || 0} />
                    <StatusBadge status={w.status} fallback="Draft" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>

        {/* Recent registrations */}
        <Panel className="overflow-hidden">
          <PanelHeader title="Latest registrations">
            <Button variant="ghost" size="sm" onClick={() => onNavigate?.("admin-registrations")}>
              View all <ArrowRight size={13} />
            </Button>
          </PanelHeader>

          {loading ? (
            <div className="p-5 flex flex-col gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="a-skeleton h-9" style={{ opacity: 1 - i * 0.2 }} />
              ))}
            </div>
          ) : recentRegs.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No registrations yet"
              description="They appear here the moment a student books a published workshop."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="a-table min-w-[460px]">
                <tbody>
                  {recentRegs.map((reg) => (
                    <tr key={reg.id}>
                      <td>
                        <div className="text-white font-medium">{reg.name}</div>
                        <div className="a-muted text-xs">{reg.email}</div>
                      </td>
                      <td className="a-muted">{reg.workshopTitle || "—"}</td>
                      <td className="a-muted text-xs whitespace-nowrap">
                        {formatDateTime(reg.createdAt)}
                      </td>
                      <td>
                        <StatusBadge status={reg.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
