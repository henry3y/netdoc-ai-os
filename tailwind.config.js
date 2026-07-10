/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1016",
        surface: "#121A22",
        surface2: "#1A2530",
        line: "#25323F",
        muted: "#8A99A8",
        paper: "#E7EDF3",
        brand: {
          DEFAULT: "#7C5CFF",
          dim: "#5B3FD9",
          soft: "#2A2145",
        },
        good: "#22C55E",
        warn: "#F5A623",
        fair: "#F59E0B",
        bad: "#EF4444",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,92,255,0.25), 0 8px 24px -8px rgba(124,92,255,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        pulse_travel: {
          "0%": { offsetDistance: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { offsetDistance: "100%", opacity: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        blink: "blink 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
