import { useState, useMemo } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Megaphone,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { createDoc, updateDoc, deleteDoc, uploadImage } from "../../lib/api";
import { useCollection, formatDateTime, toDate } from "../../lib/useCollection";
import { useAuth } from "../../contexts/AuthContext";
import { logActivity } from "../../lib/activityLog";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { Badge } from "../../components/admin/ui";

const EMPTY_FORM = { title: "", body: "", visibleTill: "", published: true };

const fieldClass = "a-field";
const labelClass = "a-label";

function isExpired(visibleTill) {
  if (!visibleTill) return false;
  return new Date(`${visibleTill}T23:59:59`).getTime() < Date.now();
}

export default function AdminAnnouncements() {
  const { adminProfile, can } = useAuth();
  const [announcements, loading, error] = useCollection("announcements");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [busy, setBusy] = useState(false);

  const canWrite = can("announcements:write");

  const sorted = useMemo(
    () =>
      [...announcements].sort(
        (a, b) =>
          (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0)
      ),
    [announcements]
  );

  const openModal = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        title: item.title || "",
        body: item.body || "",
        visibleTill: item.visibleTill || "",
        published: item.published !== false,
      });
    } else {
      setEditing(null);
      setFormData(EMPTY_FORM);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return toast.error("Title is required");
    if (!formData.body.trim()) return toast.error("Message is required");

    setSubmitting(true);
    try {
      let imageUrl = editing?.imageUrl || "";
      if (imageFile) imageUrl = await uploadImage(imageFile);

      const payload = {
        title: formData.title.trim(),
        body: formData.body.trim(),
        visibleTill: formData.visibleTill,
        published: formData.published,
        imageUrl,
      };

      if (editing) {
        await updateDoc("announcements", editing.id, payload);
        toast.success("Announcement updated");
        logActivity(adminProfile, "Updated announcement", payload.title);
      } else {
        await createDoc("announcements", {
          ...payload,
          author: adminProfile?.name || "",
        });
        toast.success("Announcement posted");
        logActivity(adminProfile, "Posted announcement", payload.title);
      }
      setIsModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to save announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (item) => {
    try {
      await updateDoc("announcements", item.id, {
        published: !(item.published !== false),
      });
      toast.success(item.published !== false ? "Unpublished" : "Published");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update announcement");
    }
  };

  const askDelete = (item) =>
    setConfirm({
      title: "Delete announcement?",
      tone: "danger",
      message: `"${item.title}" will be permanently deleted.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        setBusy(true);
        try {
          await deleteDoc("announcements", item.id);
          toast.success("Announcement deleted");
          logActivity(adminProfile, "Deleted announcement", item.title);
          setConfirm(null);
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete announcement");
        } finally {
          setBusy(false);
        }
      },
    });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="a-title text-2xl sm:text-[28px] leading-tight">Announcements</h1>
          <p className="a-muted text-sm mt-1.5">
            Post notices like schedule changes or venue updates.
          </p>
        </div>
        {canWrite && (
          <button
            onClick={() => openModal()}
            className="a-btn a-btn-primary py-2 px-4 rounded-xl flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            New Announcement
          </button>
        )}
      </div>

      {loading ? (
        <div className="a-panel p-12 text-center a-muted flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" /> Loading announcements…
        </div>
      ) : error ? (
        <div className="a-panel p-12 text-center text-red-400 text-sm">
          Could not load announcements. {error.message}
        </div>
      ) : sorted.length === 0 ? (
        <div className="a-panel p-12 text-center a-muted text-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-4 text-cyan-primary/50">
            <Megaphone size={24} />
          </div>
          <p className="text-white font-medium mb-1">No Announcements Yet</p>
          <p>Post a notice and it will show up here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sorted.map((item) => {
            const expired = isExpired(item.visibleTill);
            const published = item.published !== false;
            return (
              <div key={item.id} className="a-panel overflow-hidden flex flex-col">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-semibold text-white leading-snug">
                      {item.title}
                    </h3>
                    <Badge tone={expired ? "neutral" : published ? "success" : "warning"}>
                      {expired ? "Expired" : published ? "Live" : "Hidden"}
                    </Badge>
                  </div>

                  <p className="text-sm a-muted leading-relaxed whitespace-pre-wrap line-clamp-3">
                    {item.body}
                  </p>

                  <div className="mt-auto pt-3 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="text-[11px] a-muted">
                      {formatDateTime(item.createdAt)}
                      {item.visibleTill && ` · until ${item.visibleTill}`}
                    </div>
                    {canWrite && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => togglePublished(item)}
                          className="p-2 hover:bg-white/[0.05] rounded-lg a-muted hover:text-white transition-colors"
                          title={published ? "Unpublish" : "Publish"}
                        >
                          {published ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button
                          onClick={() => openModal(item)}
                          className="p-2 hover:bg-white/[0.05] rounded-lg a-muted hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => askDelete(item)}
                          className="p-2 hover:bg-red-500/10 rounded-lg a-muted hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => !submitting && setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0A0E14] border border-white/[0.08] rounded-2xl w-full max-w-lg shadow-2xl my-8"
          >
            <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-white">
                {editing ? "Edit Announcement" : "New Announcement"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="a-muted hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Title *</label>
                <input
                  required
                  maxLength={120}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Message *</label>
                <textarea
                  required
                  rows="5"
                  maxLength={2000}
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Visible Till</label>
                  <input
                    type="date"
                    value={formData.visibleTill}
                    onChange={(e) =>
                      setFormData({ ...formData, visibleTill: e.target.value })
                    }
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Visibility</label>
                  <select
                    value={formData.published ? "yes" : "no"}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.value === "yes" })
                    }
                    className={`${fieldClass} [&>option]:bg-[#0A0E14]`}
                  >
                    <option value="yes">Published</option>
                    <option value="no">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 5 * 1024 * 1024) {
                      toast.error("Image must be under 5 MB");
                      e.target.value = "";
                      return;
                    }
                    setImageFile(file || null);
                  }}
                  className="text-sm a-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-primary/10 file:text-cyan-primary hover:file:bg-cyan-primary/20 transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="a-btn a-btn-primary px-6 py-2 rounded-xl text-sm disabled:opacity-50"
                >
                  {submitting ? "Saving…" : editing ? "Save Changes" : "Post"}
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
