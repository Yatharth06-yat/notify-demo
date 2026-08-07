import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

/**
 * Themed replacement for window.confirm(). Render once per screen and drive it
 * from a piece of state, e.g.
 *
 *   const [confirm, setConfirm] = useState(null)
 *   setConfirm({ title, message, onConfirm })
 *   <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
 */
export default function ConfirmDialog({ state, onClose, busy = false }) {
  useEffect(() => {
    if (!state) return;
    const onKey = (e) => e.key === "Escape" && !busy && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, onClose, busy]);

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => !busy && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0A0E14] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex gap-4">
              <div
                className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${
                  state.tone === "danger"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-cyan-primary/10 text-cyan-primary"
                }`}
              >
                <AlertTriangle size={20} />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white mb-1.5">
                  {state.title}
                </h2>
                <p className="text-sm a-muted leading-relaxed">{state.message}</p>
              </div>
            </div>

            <div className="p-4 border-t border-white/[0.05] flex justify-end gap-3 bg-black/20">
              <button
                onClick={onClose}
                disabled={busy}
                className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors disabled:opacity-50"
              >
                {state.cancelLabel || "Cancel"}
              </button>
              <button
                onClick={state.onConfirm}
                disabled={busy}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${
                  state.tone === "danger"
                    ? "bg-red-500/15 text-red-300 hover:bg-red-500/25 border border-red-500/25"
                    : "bg-cyan-primary/15 text-cyan-primary hover:bg-cyan-primary/25 border border-cyan-primary/25"
                }`}
              >
                {busy ? "Working…" : state.confirmLabel || "Confirm"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
