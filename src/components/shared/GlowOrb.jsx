export default function GlowOrb({ color = "cyan", size = "lg", className = "", delay = "0s" }) {
  const sizes = {
    sm: "w-48 h-48",
    md: "w-72 h-72",
    lg: "w-[500px] h-[500px]",
    xl: "w-[700px] h-[700px]",
  };

  const colors = {
    cyan: "rgba(0,207,255,0.07)",
    blue: "rgba(79,125,255,0.06)",
    teal: "rgba(125,249,255,0.05)",
  };

  return (
    <div
      className={`absolute rounded-full pointer-events-none ${sizes[size]} ${className}`}
      style={{
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: "blur(40px)",
        animation: `drift 18s ease-in-out infinite`,
        animationDelay: delay,
      }}
    />
  );
}
