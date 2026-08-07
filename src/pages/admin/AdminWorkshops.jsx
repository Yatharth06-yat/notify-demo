import { useState, useMemo } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Image as ImageIcon,
  Copy,
  Send,
  Lock,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { createDoc, updateDoc, deleteDoc, uploadImage } from "../../lib/api";
import { useCollection } from "../../lib/useCollection";
import { useAuth } from "../../contexts/AuthContext";
import { logActivity } from "../../lib/activityLog";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { StatusBadge } from "../../components/admin/ui";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  speaker: "",
  designation: "",
  date: "",
  time: "",
  duration: "",
  venue: "",
  seats: "",
  fee: "",
  deadline: "",
  status: "Draft",
};

const fieldClass = "a-field";
const labelClass = "a-label";

// Serverless request bodies top out around 4.5 MB, so the upload has to stay
// under that — the API rejects anything larger anyway.
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export default function AdminWorkshops() {
  const { adminProfile, can } = useAuth();
  const [workshops, loading, error] = useCollection("workshops");
  const [registrations] = useCollection("registrations");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [bannerFile, setBannerFile] = useState(null);
  const [speakerPhotoFile, setSpeakerPhotoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [busy, setBusy] = useState(false);

  const canWrite = can("workshops:write");
  const canDelete = can("workshops:delete");

  // Seats taken per workshop — anything not rejected occupies a seat.
  const seatsTaken = useMemo(() => {
    const counts = {};
    registrations.forEach((r) => {
      if (r.status === "Rejected") return;
      counts[r.workshopId] = (counts[r.workshopId] || 0) + 1;
    });
    return counts;
  }, [registrations]);

  const sorted = useMemo(
    () => [...workshops].sort((a, b) => (b.date || "").localeCompare(a.date || "")),
    [workshops]
  );

  const handleOpenModal = (workshop = null) => {
    if (workshop) {
      setEditingWorkshop(workshop);
      setFormData({ ...EMPTY_FORM, ...Object.fromEntries(
        Object.keys(EMPTY_FORM).map((k) => [k, workshop[k] ?? EMPTY_FORM[k]])
      )});
    } else {
      setEditingWorkshop(null);
      setFormData(EMPTY_FORM);
    }
    setBannerFile(null);
    setSpeakerPhotoFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditingWorkshop(null);
  };

  const pickImage = (setter) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return setter(null);
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Image must be under 4 MB");
      e.target.value = "";
      return;
    }
    setter(file);
  };

  const validate = () => {
    if (!formData.title.trim()) return "Workshop title is required";
    if (!formData.date) return "Date is required";
    if (!formData.venue.trim()) return "Venue is required";
    const seats = Number(formData.seats);
    if (!formData.seats || !Number.isFinite(seats) || seats <= 0)
      return "Enter a valid number of seats";
    if (formData.fee !== "" && Number(formData.fee) < 0)
      return "Fee cannot be negative";
    if (formData.deadline && formData.deadline > formData.date)
      return "Registration deadline must be on or before the workshop date";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const problem = validate();
    if (problem) return toast.error(problem);

    setIsSubmitting(true);
    try {
      let bannerUrl = editingWorkshop?.banner || "";
      let speakerUrl = editingWorkshop?.speakerPhotoUrl || "";

      if (bannerFile) bannerUrl = await uploadImage(bannerFile);
      if (speakerPhotoFile) speakerUrl = await uploadImage(speakerPhotoFile);

      const workshopData = {
        ...formData,
        title: formData.title.trim(),
        seats: Number(formData.seats),
        fee: formData.fee === "" ? 0 : Number(formData.fee),
        banner: bannerUrl,
        speakerPhotoUrl: speakerUrl,
      };

      if (editingWorkshop) {
        await updateDoc("workshops", editingWorkshop.id, workshopData);
        toast.success("Workshop updated");
        logActivity(adminProfile, "Updated workshop", workshopData.title);
      } else {
        await createDoc("workshops", workshopData);
        toast.success("Workshop created");
        logActivity(adminProfile, "Created workshop", workshopData.title);
      }

      setIsModalOpen(false);
      setEditingWorkshop(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error saving workshop");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setStatus = async (workshop, status) => {
    try {
      await updateDoc("workshops", workshop.id, { status });
      toast.success(
        status === "Published"
          ? "Workshop published — it now appears on the booking page"
          : status === "Closed"
          ? "Registrations closed"
          : "Moved back to draft"
      );
      logActivity(adminProfile, `Set workshop to ${status}`, workshop.title);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const duplicate = async (workshop) => {
    try {
      const { id, createdAt, updatedAt, ...rest } = workshop;
      await createDoc("workshops", {
        ...rest,
        title: `${workshop.title} (Copy)`,
        status: "Draft",
      });
      toast.success("Workshop duplicated as a draft");
      logActivity(adminProfile, "Duplicated workshop", workshop.title);
    } catch (err) {
      console.error(err);
      toast.error("Failed to duplicate workshop");
    }
  };

  const askDelete = (workshop) => {
    const taken = seatsTaken[workshop.id] || 0;

    // A workshop with registrations against it can't be deleted at all — the
    // foreign key refuses, rather than leaving those students pointing at a
    // workshop that no longer exists. Say so before they click.
    if (taken > 0) {
      return toast.error(
        `"${workshop.title}" has ${taken} registration${taken === 1 ? "" : "s"}. ` +
          "Delete those first, or close registrations instead."
      );
    }

    setConfirm({
      title: "Delete workshop?",
      tone: "danger",
      message: `"${workshop.title}" will be permanently deleted. This cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        setBusy(true);
        try {
          await deleteDoc("workshops", workshop.id);
          toast.success("Workshop deleted");
          logActivity(adminProfile, "Deleted workshop", workshop.title);
          setConfirm(null);
        } catch (err) {
          console.error(err);
          toast.error(err.message || "Failed to delete workshop");
        } finally {
          setBusy(false);
        }
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="a-title text-2xl sm:text-[28px] leading-tight">Workshops</h1>
          <p className="a-muted text-sm mt-1.5">
            Published workshops appear on the public booking page.
          </p>
        </div>
        {canWrite && (
          <button
            onClick={() => handleOpenModal()}
            className="a-btn a-btn-primary py-2 px-4 rounded-xl flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Create Workshop
          </button>
        )}
      </div>

      <div className="a-panel overflow-hidden">
        {loading ? (
          <div className="p-12 text-center a-muted flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Loading workshops…
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-400 text-sm">
            Could not load workshops. {error.message}
          </div>
        ) : sorted.length === 0 ? (
          <div className="p-12 text-center a-muted text-sm flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-4 text-cyan-primary/50">
              <Plus size={24} />
            </div>
            <p className="text-white font-medium mb-1">No Workshops Found</p>
            <p>Get started by creating a new workshop.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[820px]">
              <thead>
                <tr className="border-b border-white/[0.05] a-muted text-xs uppercase tracking-wider font-display">
                  <th className="p-4 font-medium">Workshop</th>
                  <th className="p-4 font-medium">Speaker</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Seats</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((ws) => {
                  const taken = seatsTaken[ws.id] || 0;
                  const total = Number(ws.seats) || 0;
                  const full = total > 0 && taken >= total;
                  return (
                    <tr
                      key={ws.id}
                      className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors text-sm"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {ws.banner ? (
                            <img
                              src={ws.banner}
                              alt={ws.title}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                              <ImageIcon size={16} className="a-muted" />
                            </div>
                          )}
                          <div>
                            <p className="text-white font-medium">{ws.title}</p>
                            <p className="a-muted text-xs">{ws.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-white/80">{ws.speaker || "—"}</td>
                      <td className="p-4 text-white/80 whitespace-nowrap">
                        {ws.date || "—"}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className={full ? "text-red-400" : "text-white/80"}>
                          {taken} / {total || "∞"}
                        </span>
                        {full && (
                          <span className="block text-[10px] text-red-400 uppercase tracking-wider">
                            Full
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={ws.status} fallback="Draft" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          {canWrite && ws.status !== "Published" && (
                            <button
                              onClick={() => setStatus(ws, "Published")}
                              className="p-2 hover:bg-green-500/10 rounded-lg a-muted hover:text-green-400 transition-colors"
                              title="Publish"
                            >
                              <Send size={16} />
                            </button>
                          )}
                          {canWrite && ws.status === "Published" && (
                            <button
                              onClick={() => setStatus(ws, "Closed")}
                              className="p-2 hover:bg-yellow-500/10 rounded-lg a-muted hover:text-yellow-400 transition-colors"
                              title="Close registrations"
                            >
                              <Lock size={16} />
                            </button>
                          )}
                          {canWrite && (
                            <button
                              onClick={() => duplicate(ws)}
                              className="p-2 hover:bg-white/[0.05] rounded-lg a-muted hover:text-white transition-colors"
                              title="Duplicate"
                            >
                              <Copy size={16} />
                            </button>
                          )}
                          {canWrite && (
                            <button
                              onClick={() => handleOpenModal(ws)}
                              className="p-2 hover:bg-white/[0.05] rounded-lg a-muted hover:text-white transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              onClick={() => askDelete(ws)}
                              className="p-2 hover:bg-red-500/10 rounded-lg a-muted hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                          {!canWrite && !canDelete && (
                            <span className="text-xs a-muted">View only</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0A0E14] border border-white/[0.08] rounded-2xl w-full max-w-2xl shadow-2xl my-8"
          >
            <div className="p-6 border-b border-white/[0.05] flex items-center justify-between sticky top-0 bg-[#0A0E14] rounded-t-2xl z-10">
              <h2 className="font-display font-bold text-xl text-white">
                {editingWorkshop ? "Edit Workshop" : "Create Workshop"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="a-muted hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Title *</label>
                  <input
                    required
                    maxLength={140}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Category</label>
                  <input
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Speaker Name</label>
                  <input
                    value={formData.speaker}
                    onChange={(e) =>
                      setFormData({ ...formData, speaker: e.target.value })
                    }
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Speaker Designation</label>
                  <input
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Speaker Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={pickImage(setSpeakerPhotoFile)}
                  className="text-sm a-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-primary/10 file:text-cyan-primary hover:file:bg-cyan-primary/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Duration</label>
                  <input
                    placeholder="e.g. 3 hours"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Venue *</label>
                  <input
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Total Seats *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Fee (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Registration Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={`${fieldClass} [&>option]:bg-[#0A0E14]`}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={pickImage(setBannerFile)}
                  className="text-sm a-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-primary/10 file:text-cyan-primary hover:file:bg-cyan-primary/20 transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="a-btn a-btn-primary px-6 py-2 rounded-xl text-sm disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving…"
                    : editingWorkshop
                    ? "Save Changes"
                    : "Create Workshop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog state={confirm} busy={busy} onClose={() => setConfirm(null)} />
    </div>
  );
}
