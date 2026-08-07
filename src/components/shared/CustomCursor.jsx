import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x + "px";
        ringRef.current.style.top = ringPosRef.current.y + "px";
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: "left, top" }}
      >
        <div className="w-2 h-2 rounded-full bg-cyan-primary" />
      </div>
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: "left, top" }}
      >
        <div
          className="w-9 h-9 rounded-full border border-cyan-primary/40 transition-all duration-200"
          style={{ mixBlendMode: "difference" }}
        />
      </div>
    </>
  );
}
