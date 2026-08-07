/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#000000",
          secondary: "#050505",
          tertiary: "#0a0a0a",
        },
        cyan: {
          primary: "#00CFFF",
          bright: "#7DF9FF",
          signal: "#00B8FF",
        },
        blue: {
          accent: "#4F7DFF",
        },
        muted: "#AAB4C5",
        void: {
          DEFAULT: "#000000",
          soft: "#050505",
          panel: "#0a0a0a",
          deep: "#000000",
          card: "#0d0d0d",
        },
        mist: "#AAB4C5",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],   // Hero & section headings
        body: ["'Inter'", "sans-serif"],               // Body text & buttons
        mono: ["'Orbitron'", "sans-serif"],            // Numbers & stats
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(0,207,255,0.55)",
        "glow-lg": "0 0 90px -10px rgba(0,207,255,0.45)",
        "glow-blue": "0 0 60px -10px rgba(79,125,255,0.45)",
        panel: "0 20px 60px -30px rgba(0,0,0,0.9)",
        "card-hover": "0 30px 80px -20px rgba(0,207,255,0.25)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(rgba(0,207,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,207,255,0.04) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite 2s",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin-reverse 28s linear infinite",
        drift: "drift 14s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(14px,-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,207,255,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(0,207,255,0.7)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
