import { useEffect, useState } from "react";
import { Megaphone, X } from "lucide-react";
import { publicApi } from "../lib/api";

/**
 * Public-facing notices posted from the admin portal.
 * Renders nothing when there is nothing live to show.
 */
export default function AnnouncementsBanner() {
  const [items, setItems] = useState([]);
  const [dismissed, setDismissed] = useState([]);

  useEffect(() => {
    let cancelled = false;
    publicApi
      .announcements()
      .then((data) => { if (!cancelled) setItems(data); })
      .catch((err) => console.warn("Announcements unavailable", err));
    return () => { cancelled = true; };
  }, []);

  const visible = items.filter((a) => !dismissed.includes(a.id));
  if (visible.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 mb-7" role="region" aria-label="Announcements">
      {visible.map((a) => (
        <div
          key={a.id}
          className="flex items-start gap-3 p-4 rounded-2xl"
          style={{
            background: "rgba(15,118,110,0.06)",
            border: "1px solid rgba(15,118,110,0.22)",
          }}
        >
          <Megaphone className="w-4 h-4 text-accent mt-0.5 shrink-0" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{a.title}</p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">{a.body}</p>
          </div>
          <button
            onClick={() => setDismissed((d) => [...d, a.id])}
            className="text-gray-400 hover:text-gray-700 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
