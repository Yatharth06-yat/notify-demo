import { useState, useEffect, useMemo } from "react";
import { User, Key, Building, Users, Ticket, Trash2, Info, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { createAdmin, updateDoc, deleteDoc, upsertDoc } from "../../lib/api";
import { useAuth, ROLES } from "../../contexts/AuthContext";
import { useCollection } from "../../lib/useCollection";
import { logActivity } from "../../lib/activityLog";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { isMailerConfigured } from "../../lib/mailer";

const fieldClass = "a-field";
const labelClass = "a-label";

const TABS = [
  { id: "general", label: "My Profile", icon: User },
  { id: "lab", label: "Lab Information", icon: Building },
  { id: "coupons", label: "Coupons", icon: Ticket },
  { id: "admins", label: "Manage Admins", icon: Users },
];

export default function AdminSettings() {
  const { adminProfile, can, changePassword } = useAuth();
  const [settings] = useCollection("settings");
  const [admins, loadingAdmins] = useCollection("admins");

  const [activeTab, setActiveTab] = useState("general");
  const [confirm, setConfirm] = useState(null);
  const [busy, setBusy] = useState(false);

  const canWriteSettings = can("settings:write");
  const canManageAdmins = can("admins:manage");

  // ── Lab information ─────────────────────────────────────────
  const generalDoc = useMemo(
    () => settings.find((s) => s.id === "general"),
    [settings]
  );
  const [labInfo, setLabInfo] = useState({
    name: "IoTify Lab",
    email: "",
    phone: "",
  });
  const [savingLab, setSavingLab] = useState(false);

  useEffect(() => {
    if (generalDoc) {
      setLabInfo({
        name: generalDoc.name || "IoTify Lab",
        email: generalDoc.email || "",
        phone: generalDoc.phone || "",
      });
    }
  }, [generalDoc]);

  const saveLabInfo = async (e) => {
    e.preventDefault();
    setSavingLab(true);
    try {
      await upsertDoc("settings", "general", labInfo);
      toast.success("Lab information saved");
      logActivity(adminProfile, "Updated lab information");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to save lab information");
    } finally {
      setSavingLab(false);
    }
  };

  // ── Coupons ─────────────────────────────────────────────────
  const bookingDoc = useMemo(
    () => settings.find((s) => s.id === "booking"),
    [settings]
  );
  const coupons = bookingDoc?.coupons || {};
  const [newCoupon, setNewCoupon] = useState({ code: "", percentOff: "" });

  const saveCoupons = async (next, message) => {
    try {
      await upsertDoc("settings", "booking", { coupons: next });
      toast.success(message);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to save coupons");
      return false;
    }
  };

  const addCoupon = async (e) => {
    e.preventDefault();
    const code = newCoupon.code.trim().toUpperCase();
    const percent = Number(newCoupon.percentOff);
    if (!code) return toast.error("Enter a coupon code");
    if (!Number.isFinite(percent) || percent <= 0 || percent > 100)
      return toast.error("Discount must be between 1 and 100");

    if (await saveCoupons({ ...coupons, [code]: percent }, `Coupon ${code} saved`)) {
      logActivity(adminProfile, "Added coupon", code);
      setNewCoupon({ code: "", percentOff: "" });
    }
  };

  const removeCoupon = async (code) => {
    const next = { ...coupons };
    delete next[code];
    if (await saveCoupons(next, `Coupon ${code} removed`)) {
      logActivity(adminProfile, "Removed coupon", code);
    }
  };

  // ── Admins ──────────────────────────────────────────────────
  // The account and its authorisation are now the same record, so this form
  // creates the login outright. There is no separate console to visit first
  // and no UID to copy across.
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    role: "Volunteer",
  });
  const [savingAdmin, setSavingAdmin] = useState(false);

  const addAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.email.trim()) return toast.error("Email is required");
    if (newAdmin.password.length < 8)
      return toast.error("Password must be at least 8 characters");

    setSavingAdmin(true);
    try {
      await createAdmin({
        name: newAdmin.name.trim() || newAdmin.email.trim(),
        email: newAdmin.email.trim().toLowerCase(),
        password: newAdmin.password,
        role: newAdmin.role,
      });
      toast.success(`${newAdmin.email} can now sign in`);
      logActivity(adminProfile, "Added admin", newAdmin.email);
      setNewAdmin({ name: "", email: "", password: "", role: "Volunteer" });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to add admin");
    } finally {
      setSavingAdmin(false);
    }
  };

  const changeRole = async (admin, role) => {
    try {
      await updateDoc("admins", admin.id, { role });
      toast.success(`${admin.email} is now ${role}`);
      logActivity(adminProfile, `Changed role to ${role}`, admin.email);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to change role");
    }
  };

  const askRemoveAdmin = (admin) => {
    if (admin.id === adminProfile?.id) {
      return toast.error("You cannot remove your own admin access");
    }
    setConfirm({
      title: "Revoke admin access?",
      tone: "danger",
      message: `${admin.email}'s account will be deleted and they will lose access to the portal immediately. Anything they did stays in the activity log.`,
      confirmLabel: "Revoke",
      onConfirm: async () => {
        setBusy(true);
        try {
          await deleteDoc("admins", admin.id);
          toast.success("Admin access revoked");
          logActivity(adminProfile, "Revoked admin access", admin.email);
          setConfirm(null);
        } catch (err) {
          console.error(err);
          toast.error(err.message || "Failed to revoke access");
        } finally {
          setBusy(false);
        }
      },
    });
  };

  // ── Password ────────────────────────────────────────────────
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [changingPassword, setChangingPassword] = useState(false);

  const submitPassword = async (e) => {
    e.preventDefault();
    if (passwords.next.length < 8)
      return toast.error("New password must be at least 8 characters");
    if (passwords.next !== passwords.confirm)
      return toast.error("New passwords do not match");

    setChangingPassword(true);
    try {
      await changePassword(passwords.current, passwords.next);
      toast.success("Password updated");
      logActivity(adminProfile, "Changed own password");
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Could not change password");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="a-title text-2xl sm:text-[28px] leading-tight">Settings</h1>
        <p className="a-muted text-sm mt-1.5">
          Signed in as {adminProfile?.email} · {adminProfile?.role}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="md:col-span-1 flex md:flex-col gap-2 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-cyan-primary/20 text-cyan-primary"
                    : "bg-white/[0.02] a-muted hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="md:col-span-3">
          {/* ── My Profile ── */}
          {activeTab === "general" && (
            <div className="flex flex-col gap-6">
              <div className="a-panel p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-cyan-primary" size={20} />
                  <h2 className="a-title text-[15px]">
                    Admin Profile
                  </h2>
                </div>
                {[
                  ["Name", adminProfile?.name],
                  ["Email Address", adminProfile?.email],
                  ["Role", adminProfile?.role],
                  ["Account ID", adminProfile?.id],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className={labelClass}>{label}</span>
                    <span className="text-white font-medium break-all text-sm">
                      {value || "—"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="a-panel p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Key className="text-cyan-primary" size={20} />
                  <h2 className="a-title text-[15px]">
                    Change Password
                  </h2>
                </div>
                <form onSubmit={submitPassword} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Current Password</label>
                    <input
                      type="password"
                      required
                      autoComplete="current-password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      className={fieldClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>New Password</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        value={passwords.next}
                        onChange={(e) =>
                          setPasswords({ ...passwords, next: e.target.value })
                        }
                        className={fieldClass}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass}>Confirm New Password</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({ ...passwords, confirm: e.target.value })
                        }
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/[0.05]">
                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="a-btn a-btn-primary px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
                    >
                      {changingPassword ? "Updating…" : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="a-panel p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="text-cyan-primary" size={20} />
                  <h2 className="a-title text-[15px]">
                    Email Notifications
                  </h2>
                </div>
                <p className="text-sm a-muted leading-relaxed">
                  {isMailerConfigured("Approved") ? (
                    <>
                      EmailJS is configured. Students are emailed automatically when their
                      registration is approved or rejected.
                    </>
                  ) : (
                    <>
                      EmailJS is not configured, so status emails are skipped. Add{" "}
                      <code className="text-cyan-primary">VITE_EMAILJS_*</code> values to
                      your <code className="text-cyan-primary">.env</code> to enable them.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* ── Lab Information ── */}
          {activeTab === "lab" && (
            <div className="a-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="text-cyan-primary" size={20} />
                <h2 className="a-title text-[15px]">
                  Lab Information
                </h2>
              </div>
              <form onSubmit={saveLabInfo} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Lab Name</label>
                  <input
                    required
                    disabled={!canWriteSettings}
                    value={labInfo.name}
                    onChange={(e) => setLabInfo({ ...labInfo, name: e.target.value })}
                    className={`${fieldClass} disabled:opacity-50`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Support Email</label>
                    <input
                      type="email"
                      required
                      disabled={!canWriteSettings}
                      value={labInfo.email}
                      onChange={(e) => setLabInfo({ ...labInfo, email: e.target.value })}
                      className={`${fieldClass} disabled:opacity-50`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Contact Phone</label>
                    <input
                      required
                      disabled={!canWriteSettings}
                      value={labInfo.phone}
                      onChange={(e) => setLabInfo({ ...labInfo, phone: e.target.value })}
                      className={`${fieldClass} disabled:opacity-50`}
                    />
                  </div>
                </div>
                {canWriteSettings ? (
                  <div className="pt-4 border-t border-white/[0.05]">
                    <button
                      type="submit"
                      disabled={savingLab}
                      className="a-btn a-btn-primary px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
                    >
                      {savingLab ? "Saving…" : "Save Changes"}
                    </button>
                  </div>
                ) : (
                  <p className="text-xs a-muted">
                    Only a Super Admin can change these values.
                  </p>
                )}
              </form>
            </div>
          )}

          {/* ── Coupons ── */}
          {activeTab === "coupons" && (
            <div className="a-panel p-6">
              <div className="flex items-center gap-3 mb-2">
                <Ticket className="text-cyan-primary" size={20} />
                <h2 className="a-title text-[15px]">
                  Coupon Codes
                </h2>
              </div>
              <p className="text-sm a-muted mb-6">
                Codes here are accepted on the public booking page and applied as a
                percentage off the workshop fee.
              </p>

              {canWriteSettings && (
                <form onSubmit={addCoupon} className="flex flex-wrap items-end gap-4 mb-6">
                  <div className="flex flex-col gap-2 flex-1 min-w-[160px]">
                    <label className={labelClass}>Code</label>
                    <input
                      value={newCoupon.code}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, code: e.target.value })
                      }
                      placeholder="MITS25"
                      className={`${fieldClass} uppercase`}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-32">
                    <label className={labelClass}>% Off</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={newCoupon.percentOff}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, percentOff: e.target.value })
                      }
                      placeholder="25"
                      className={fieldClass}
                    />
                  </div>
                  <button
                    type="submit"
                    className="a-btn a-btn-primary px-6 py-2 rounded-xl text-sm font-medium"
                  >
                    Add
                  </button>
                </form>
              )}

              {Object.keys(coupons).length === 0 ? (
                <p className="text-sm a-muted py-6 text-center border border-white/[0.05] rounded-xl">
                  No coupon codes configured.
                </p>
              ) : (
                <div className="border border-white/[0.05] rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.05] a-muted text-xs uppercase tracking-wider font-display bg-white/[0.01]">
                        <th className="p-4 font-medium">Code</th>
                        <th className="p-4 font-medium">Discount</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(coupons).map(([code, percent]) => (
                        <tr key={code} className="border-b border-white/[0.02]">
                          <td className="p-4 text-white font-mono">{code}</td>
                          <td className="p-4 a-muted">{percent}% off</td>
                          <td className="p-4 text-right">
                            {canWriteSettings && (
                              <button
                                onClick={() => removeCoupon(code)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                                aria-label={`Remove ${code}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Manage Admins ── */}
          {activeTab === "admins" && (
            <div className="a-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-cyan-primary" size={20} />
                <h2 className="a-title text-[15px]">
                  Manage Admins
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {canManageAdmins && (
                  <form onSubmit={addAdmin} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className={labelClass}>Email *</label>
                        <input
                          type="email"
                          required
                          value={newAdmin.email}
                          onChange={(e) =>
                            setNewAdmin({ ...newAdmin, email: e.target.value })
                          }
                          placeholder="admin@example.com"
                          className={fieldClass}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className={labelClass}>Temporary Password *</label>
                        <input
                          type="password"
                          required
                          minLength={8}
                          autoComplete="new-password"
                          value={newAdmin.password}
                          onChange={(e) =>
                            setNewAdmin({ ...newAdmin, password: e.target.value })
                          }
                          placeholder="At least 8 characters"
                          className={fieldClass}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className={labelClass}>Display Name</label>
                        <input
                          value={newAdmin.name}
                          onChange={(e) =>
                            setNewAdmin({ ...newAdmin, name: e.target.value })
                          }
                          className={fieldClass}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className={labelClass}>Role</label>
                        <select
                          value={newAdmin.role}
                          onChange={(e) =>
                            setNewAdmin({ ...newAdmin, role: e.target.value })
                          }
                          className={`${fieldClass} [&>option]:bg-[#0A0E14]`}
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={savingAdmin}
                        className="a-btn a-btn-primary px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
                      >
                        {savingAdmin ? "Authorising…" : "Authorise Admin"}
                      </button>
                    </div>
                  </form>
                )}

                <div className="border border-white/[0.05] rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse min-w-[520px]">
                    <thead>
                      <tr className="border-b border-white/[0.05] a-muted text-xs uppercase tracking-wider font-display bg-white/[0.01]">
                        <th className="p-4 font-medium">Admin</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingAdmins ? (
                        <tr>
                          <td colSpan="3" className="p-8 text-center a-muted">
                            Loading…
                          </td>
                        </tr>
                      ) : admins.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-8 text-center a-muted">
                            No admins found.
                          </td>
                        </tr>
                      ) : (
                        admins.map((admin) => (
                          <tr key={admin.id} className="border-b border-white/[0.02]">
                            <td className="p-4">
                              <div className="text-white">{admin.name || admin.email}</div>
                              <div className="text-xs a-muted break-all">
                                {admin.email}
                              </div>
                            </td>
                            <td className="p-4">
                              {canManageAdmins && admin.id !== adminProfile?.id ? (
                                <select
                                  value={admin.role || "Volunteer"}
                                  onChange={(e) => changeRole(admin, e.target.value)}
                                  className={`${fieldClass} py-1.5 [&>option]:bg-[#0A0E14]`}
                                >
                                  {ROLES.map((r) => (
                                    <option key={r} value={r}>
                                      {r}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className="a-muted">{admin.role}</span>
                              )}
                            </td>
                            <td className="p-4 text-right">
                              {canManageAdmins && admin.id !== adminProfile?.id && (
                                <button
                                  onClick={() => askRemoveAdmin(admin)}
                                  className="text-red-400 hover:text-red-300 transition-colors text-xs font-medium"
                                >
                                  Revoke
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-cyan-primary/10 border border-cyan-primary/20 rounded-xl flex items-start gap-3">
                  <Info className="text-cyan-primary mt-0.5 shrink-0" size={16} />
                  <p className="text-sm text-cyan-primary/80 leading-relaxed">
                    Creating an admin here creates their login. Send them the temporary
                    password and ask them to change it under{" "}
                    <strong>Settings → My Profile</strong> after their first sign-in.
                    Revoking deletes the account, so access ends immediately.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog state={confirm} busy={busy} onClose={() => setConfirm(null)} />
    </div>
  );
}
