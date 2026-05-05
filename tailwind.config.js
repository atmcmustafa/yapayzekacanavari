/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0eeff",
          100: "#d9d5ff",
          200: "#b3abff",
          300: "#8d81ff",
          400: "#6C63FF",
          500: "#5a50e6",
          600: "#4840b3",
          700: "#363080",
          800: "#24204d",
          900: "#12101a",
        },
        coral: {
          50: "#fff0f0",
          100: "#ffd6d6",
          200: "#ffadad",
          300: "#ff8585",
          400: "#FF6B6B",
          500: "#e65252",
          600: "#b33f3f",
        },
        turquoise: {
          50: "#e6faf8",
          100: "#b3f0ea",
          200: "#80e6dc",
          300: "#4ECDC4",
          400: "#3db5ad",
          500: "#2d9e96",
          600: "#1c877f",
        },
        sunny: {
          50: "#fffce6",
          100: "#fff5b3",
          200: "#ffee80",
          300: "#FFE66D",
          400: "#e6cc52",
          500: "#ccb33a",
          600: "#b39922",
        },
        fresh: {
          50: "#e6f9ec",
          100: "#b3edc5",
          200: "#80e19e",
          300: "#51CF66",
          400: "#3db84f",
          500: "#2da13b",
          600: "#1e8a28",
        },
        sky: {
          50: "#e6f4ff",
          100: "#b3ddff",
          200: "#80c6ff",
          300: "#4DB8FF",
          400: "#3aa3e6",
          500: "#278ecc",
          600: "#1479b3",
        },
      },
      fontFamily: {
        heading: ["Quicksand", "sans-serif"],
        body: ["Nunito", "sans-serif"],
        fun: ["Bubblegum Sans", "cursive"],
      },
      borderRadius: {
        kid: "1.25rem",
        blob: "30% 70% 70% 30% / 30% 30% 70% 70%",
      },
      boxShadow: {
        kid: "0 4px 14px 0 rgba(108, 99, 255, 0.2)",
        card: "0 8px 30px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 12px 40px rgba(108, 99, 255, 0.15)",
        glow: "0 0 20px rgba(108, 99, 255, 0.3)",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pop-in": "popIn 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
