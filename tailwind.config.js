/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          primary: "#FFF2E5",
          secondary: "#FAECE1",
          tertiary: "#F5E6DB",
          card: "#FFFAF5",
        },
        primary: {
          DEFAULT: "#1F2937",
          light: "#374151",
          dark: "#111827",
        },
        accent: {
          DEFAULT: "#0F766E",
          light: "#14B8A6",
          dark: "#0D6860",
        },
        muted: "#6B7280",
        "text-primary": "#111827",
        "text-secondary": "#374151",
        "text-muted": "#6B7280",
        void: {
          DEFAULT: "#FFF2E5",
          soft: "#FFF2E5",
          panel: "#FAECE1",
          deep: "#F5E6DB",
          card: "#FFFFFF",
        },
        mist: "#6B7280",
        border: "rgba(17,24,39,0.10)",
      },
      fontFamily: {
        display: ["'Inter'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Space Grotesk'", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem,6vw,4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "section": ["clamp(1.75rem,4vw,3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        glow: "0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -1px rgba(0,0,0,0.02)",
        "glow-lg": "0 10px 30px -5px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.02)",
        card: "0 2px 8px -2px rgba(17,24,39,0.06), 0 1px 3px rgba(17,24,39,0.04)",
        "card-hover": "0 12px 28px -6px rgba(17,24,39,0.10), 0 4px 8px -2px rgba(17,24,39,0.04)",
        panel: "0 8px 24px -4px rgba(17,24,39,0.06)",
        institutional: "0 0 0 1px rgba(15,118,110,0.15), 0 4px 12px rgba(15,118,110,0.08)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(rgba(31,41,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(31,41,55,0.04) 1px, transparent 1px)",
        "dot-grid":
          "radial-gradient(circle, rgba(15,118,110,0.12) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cream-gradient": "linear-gradient(135deg, #FFF2E5 0%, #FAECE1 100%)",
      },
      borderRadius: {
        card: "16px",
        "card-lg": "20px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite 2s",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin-reverse 28s linear infinite",
        drift: "drift 14s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "fade-in": "fade-in 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
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
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
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
      spacing: {
        section: "96px",
        "section-sm": "64px",
      },
    },
  },
  plugins: [],
};
