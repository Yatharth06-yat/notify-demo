import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

/**
 * Shared primitives for the admin portal.
 *
 * Before this existed, every screen declared its own `fieldClass` and
 * `labelClass` string and its own status-pill colours, and they had already
 * drifted apart. Anything used on more than one screen belongs here; the
 * styling itself lives in the ADMIN PORTAL block of src/styles/index.css.
 */

const cx = (...parts) => parts.filter(Boolean).join(" ");

// ── Layout ──────────────────────────────────────────────────────────────

/** The standard page heading: title, one line of context, actions on the right. */
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="min-w-0">
        <h1 className="a-title text-2xl sm:text-[28px] leading-tight">{title}</h1>
        {subtitle && <p className="a-muted text-sm mt-1.5">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}

export function Panel({ className, children, ...rest }) {
  return (
    <div className={cx("a-panel", className)} {...rest}>
      {children}
    </div>
  );
}

/** Panel header strip. `title` may be a node when an icon is wanted. */
export function PanelHeader({ title, description, children }) {
  return (
    <div className="a-panel-head">
      <div className="min-w-0">
        <h2 className="a-title text-[15px]">{title}</h2>
        {description && <p className="a-muted text-xs mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}

// ── Buttons ─────────────────────────────────────────────────────────────

const VARIANTS = {
  primary: "a-btn-primary",
  secondary: "a-btn-secondary",
  ghost: "a-btn-ghost",
  danger: "a-btn-danger",
};

/**
 * `loading` swaps the leading icon for a spinner and disables the button, so
 * a double-click can't fire the same write twice.
 */
export const Button = forwardRef(function Button(
  { variant = "secondary", size, icon: Icon, loading, disabled, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cx("a-btn", VARIANTS[variant], size === "sm" && "a-btn-sm", className)}
      {...rest}
    >
      {loading ? (
        <Loader2 size={size === "sm" ? 13 : 15} className="animate-spin" />
      ) : (
        Icon && <Icon size={size === "sm" ? 13 : 15} />
      )}
      {children}
    </button>
  );
});

export function IconButton({ icon: Icon, label, className, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx("a-icon-btn", className)}
      {...rest}
    >
      <Icon size={16} />
    </button>
  );
}

// ── Form controls ───────────────────────────────────────────────────────

/** Label + control + optional hint, with the label bound to the control. */
export function Field({ label, hint, required, htmlFor, className, children }) {
  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="a-label" htmlFor={htmlFor}>
          {label}
          {required && <span style={{ color: "var(--a-accent)" }}> *</span>}
        </label>
      )}
      {children}
      {hint && <p className="a-muted text-xs">{hint}</p>}
    </div>
  );
}

export const Input = forwardRef(function Input({ className, ...rest }, ref) {
  return <input ref={ref} className={cx("a-field", className)} {...rest} />;
});

export const Select = forwardRef(function Select({ className, children, ...rest }, ref) {
  return (
    <select ref={ref} className={cx("a-field", className)} {...rest}>
      {children}
    </select>
  );
});

export const Textarea = forwardRef(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={cx("a-field", className)} {...rest} />;
});

// ── Status ──────────────────────────────────────────────────────────────

const TONES = {
  neutral: "a-badge-neutral",
  success: "a-badge-success",
  warning: "a-badge-warning",
  danger: "a-badge-danger",
  info: "a-badge-info",
};

export function Badge({ tone = "neutral", className, children }) {
  return <span className={cx("a-badge", TONES[tone], className)}>{children}</span>;
}

/**
 * One place that decides what colour a status is. Registration and workshop
 * states used to be coloured inline on four different screens, which is how
 * "Closed" ended up red on one page and grey on another.
 */
const STATUS_TONES = {
  Approved: "success",
  Published: "success",
  Pending: "warning",
  Draft: "neutral",
  Rejected: "danger",
  Closed: "danger",
};

export function StatusBadge({ status, fallback = "Pending" }) {
  const value = status || fallback;
  return <Badge tone={STATUS_TONES[value] || "neutral"}>{value}</Badge>;
}

// ── States ──────────────────────────────────────────────────────────────

export function EmptyState({ icon: Icon, title, description, children }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      {Icon && (
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "var(--a-inset)", color: "var(--a-text-3)" }}
        >
          <Icon size={24} />
        </div>
      )}
      <p className="text-white font-semibold text-[15px]">{title}</p>
      {description && (
        <p className="a-muted text-sm mt-1.5 max-w-sm leading-relaxed">{description}</p>
      )}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

export function LoadingRows({ rows = 5, columns = 4 }) {
  return (
    <div className="p-5 flex flex-col gap-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-3">
          {Array.from({ length: columns }).map((_, c) => (
            <div
              key={c}
              className="a-skeleton h-4"
              // Uneven widths read as content loading; equal bars read as a
              // progress bar that never moves.
              style={{ flex: c === 0 ? 2 : 1, opacity: 1 - r * 0.13 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ErrorNotice({ children }) {
  return (
    <div
      className="rounded-xl px-4 py-3 text-sm"
      style={{
        color: "#FF9C9C",
        background: "rgba(239,68,68,0.07)",
        border: "1px solid rgba(239,68,68,0.22)",
      }}
      role="alert"
    >
      {children}
    </div>
  );
}
