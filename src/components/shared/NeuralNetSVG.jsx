export default function NeuralNetSVG({ className = "" }) {
  const layers = [
    [{ x: 80, y: 100 }, { x: 80, y: 200 }, { x: 80, y: 300 }, { x: 80, y: 400 }],
    [{ x: 220, y: 130 }, { x: 220, y: 220 }, { x: 220, y: 310 }, { x: 220, y: 390 }],
    [{ x: 360, y: 110 }, { x: 360, y: 200 }, { x: 360, y: 290 }, { x: 360, y: 390 }],
    [{ x: 500, y: 150 }, { x: 500, y: 250 }, { x: 500, y: 350 }],
    [{ x: 620, y: 200 }, { x: 620, y: 300 }],
  ];

  const connections = [];
  for (let l = 0; l < layers.length - 1; l++) {
    layers[l].forEach((from) => {
      layers[l + 1].forEach((to) => {
        connections.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      });
    });
  }

  return (
    <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Connections */}
      {connections.map((c, i) => (
        <line
          key={i}
          x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="rgba(0,207,255,0.07)"
          strokeWidth="0.8"
        />
      ))}

      {/* Active connections (animated) */}
      {connections.filter((_, i) => i % 5 === 0).map((c, i) => (
        <line
          key={`active-${i}`}
          x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="rgba(0,207,255,0.3)"
          strokeWidth="1"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0" to="-16"
            dur={`${1 + i * 0.2}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* Nodes */}
      {layers.flat().map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="10" fill="rgba(0,207,255,0.05)" stroke="rgba(0,207,255,0.3)" strokeWidth="1" />
          <circle cx={node.x} cy={node.y} r="4" fill="rgba(0,207,255,0.8)">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${2 + (i % 4) * 0.5}s`}
              repeatCount="indefinite"
              begin={`${i * 0.15}s`}
            />
          </circle>
        </g>
      ))}

      {/* Labels */}
      <text x="80" y="460" textAnchor="middle" fontSize="9" fill="rgba(0,207,255,0.4)" fontFamily="monospace">INPUT</text>
      <text x="620" y="460" textAnchor="middle" fontSize="9" fill="rgba(0,207,255,0.4)" fontFamily="monospace">OUTPUT</text>
    </svg>
  );
}
