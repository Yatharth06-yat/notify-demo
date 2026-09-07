/**
 * BackgroundField — fixed full-screen background for public pages.
 *
 * Layers (back to front):
 * 1. Warm cream base (#FFF2E5)
 * 2. Subtle dot grid — low-opacity, provides depth without distraction
 * 3. Warm teal radial glow — bottom-right quadrant
 * 4. Secondary warm glow — top-left, very faint
 *
 * No canvas, no particles, no animated blobs — keeps performance clean.
 */
export default function BackgroundField() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Warm cream primary background */}
      <div className="absolute inset-0" style={{ background: "#FFF2E5" }} />

      {/* 2. Subtle dot grid — matches institutional reference */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,118,110,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.55,
        }}
      />

      {/* 3. Warm accent glow — bottom-right */}
      <div
        className="absolute"
        style={{
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(15,118,110,0.07) 0%, rgba(3,105,161,0.03) 45%, transparent 70%)",
          right: "-120px",
          bottom: "-120px",
          filter: "blur(60px)",
        }}
      />

      {/* 4. Secondary warm glow — top-left, very faint */}
      <div
        className="absolute"
        style={{
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(224,136,56,0.05) 0%, transparent 70%)",
          left: "-100px",
          top: "8%",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}
