export default function CircuitSVG({ className = "" }) {
  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Horizontal lines */}
      <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(0,207,255,0.15)" strokeWidth="1" />
      <line x1="200" y1="80" x2="200" y2="180" stroke="rgba(0,207,255,0.15)" strokeWidth="1" />
      <line x1="200" y1="180" x2="450" y2="180" stroke="rgba(0,207,255,0.15)" strokeWidth="1" />
      <line x1="450" y1="180" x2="450" y2="80" stroke="rgba(0,207,255,0.15)" strokeWidth="1" />
      <line x1="450" y1="80" x2="800" y2="80" stroke="rgba(0,207,255,0.15)" strokeWidth="1" />

      <line x1="100" y1="280" x2="340" y2="280" stroke="rgba(79,125,255,0.12)" strokeWidth="1" />
      <line x1="340" y1="280" x2="340" y2="360" stroke="rgba(79,125,255,0.12)" strokeWidth="1" />
      <line x1="340" y1="360" x2="680" y2="360" stroke="rgba(79,125,255,0.12)" strokeWidth="1" />
      <line x1="680" y1="360" x2="680" y2="280" stroke="rgba(79,125,255,0.12)" strokeWidth="1" />
      <line x1="680" y1="280" x2="800" y2="280" stroke="rgba(79,125,255,0.12)" strokeWidth="1" />

      <line x1="0" y1="420" x2="560" y2="420" stroke="rgba(0,207,255,0.08)" strokeWidth="1" />
      <line x1="560" y1="420" x2="560" y2="460" stroke="rgba(0,207,255,0.08)" strokeWidth="1" />
      <line x1="560" y1="460" x2="800" y2="460" stroke="rgba(0,207,255,0.08)" strokeWidth="1" />

      {/* Vertical connectors */}
      <line x1="120" y1="0" x2="120" y2="80" stroke="rgba(0,207,255,0.1)" strokeWidth="1" />
      <line x1="120" y1="280" x2="120" y2="500" stroke="rgba(0,207,255,0.1)" strokeWidth="1" />
      <line x1="600" y1="80" x2="600" y2="360" stroke="rgba(79,125,255,0.1)" strokeWidth="1" />
      <line x1="600" y1="420" x2="600" y2="500" stroke="rgba(79,125,255,0.1)" strokeWidth="1" />

      {/* IC blocks */}
      <rect x="180" y="140" width="80" height="80" rx="4" stroke="rgba(0,207,255,0.2)" strokeWidth="1" fill="rgba(0,207,255,0.03)" />
      <rect x="420" y="40" width="60" height="40" rx="4" stroke="rgba(79,125,255,0.25)" strokeWidth="1" fill="rgba(79,125,255,0.04)" />
      <rect x="300" y="300" width="100" height="60" rx="4" stroke="rgba(0,207,255,0.18)" strokeWidth="1" fill="rgba(0,207,255,0.02)" />

      {/* Dots (nodes) */}
      {[
        [200, 80], [450, 80], [450, 180], [200, 180],
        [340, 280], [680, 280], [340, 360], [680, 360],
        [120, 80], [600, 80], [560, 420],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="rgba(0,207,255,0.5)">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur={`${2 + (i % 3)}s`}
            repeatCount="indefinite"
            begin={`${i * 0.3}s`}
          />
        </circle>
      ))}

      {/* Animated signal pulse */}
      <circle cx="0" cy="80" r="3" fill="#00CFFF" opacity="0.8">
        <animateMotion dur="4s" repeatCount="indefinite" path="M0,0 L200,0 L200,100 L450,100 L450,0 L800,0" />
      </circle>
      <circle cx="0" cy="280" r="2.5" fill="#4F7DFF" opacity="0.7">
        <animateMotion dur="5s" repeatCount="indefinite" begin="1s" path="M100,0 L340,0 L340,80 L680,80 L680,0 L800,0" />
      </circle>
    </svg>
  );
}
