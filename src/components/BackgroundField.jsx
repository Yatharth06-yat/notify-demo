/**
 * BackgroundField — matches the reference image:
 * Pure black base + dot grid + one teal radial glow (right-center)
 * No canvas, no particles, no animated blobs, no noise.
 */
export default function BackgroundField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

      {/* 1. Pure black base */}
      <div className="absolute inset-0 bg-black" />

      {/* 2. Dot grid — matches the image's subtle dot pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,207,255,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      {/* 3. Teal radial glow — bottom-right quadrant, exactly like the image */}
      <div
        className="absolute"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,180,220,0.18) 0%, rgba(0,120,180,0.08) 40%, transparent 70%)",
          right: "-80px",
          bottom: "-80px",
          filter: "blur(40px)",
        }}
      />

      {/* 4. Smaller secondary glow top-left — very faint */}
      <div
        className="absolute"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,150,200,0.07) 0%, transparent 70%)",
          left: "-100px",
          top: "10%",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
