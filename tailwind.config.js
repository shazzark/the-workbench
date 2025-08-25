/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <-- Added this line
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // Clean, modern primary font
        serif: ["Playfair Display", "Georgia", "serif"], // Elegant serif for headings
        mono: ["Fira Code", "monospace"], // Clean code font for technical elements
      },
      colors: {
        // Professional color palette optimized for dashboards
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Primary blue - main brand color
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        secondary: {
          50: "#faf6f0",
          100: "#f5ebdc",
          200: "#edd8bb",
          300: "#e3bf97",
          400: "#d9a572",
          500: "#cc8b56", // Warm secondary color
          600: "#b27346",
          700: "#8f5c3a",
          800: "#734930",
          900: "#5c3c28",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b", // Neutral gray
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        success: {
          50: "#f0fdf4",
          500: "#22c55e",
          900: "#14532d",
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b",
          900: "#78350f",
        },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          900: "#7f1d1d",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
