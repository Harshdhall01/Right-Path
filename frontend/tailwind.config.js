/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080b14",
        surface: "#0f1322",
        surface2: "#161c2e",
        gBlue: "#4285f4",
        gBlue2: "#8ab4f8",
        gPurple: "#a78bfa",
        gCyan: "#00d4ff",
        gMint: "#34d399",
        textPrimary: "#e8eaed",
        textSecondary: "#8a96a8",
        textMuted: "#4a5568",
      },
      fontFamily: {
        sans: ["Google Sans", "sans-serif"],
        display: ["Google Sans Display", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gemini-gradient": "linear-gradient(135deg, #4285f4 0%, #8ab4f8 25%, #a78bfa 50%, #c084fc 75%, #34d399 100%)",
      },
      animation: {
        shimmer: "shimmer 6s ease infinite",
        float: "float 3s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse2: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};