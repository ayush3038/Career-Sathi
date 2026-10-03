/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F1E3A", 700: "#16294d", 900: "#0A1526" },
        saffron: { DEFAULT: "#F97316", 600: "#EA580C" },
        sand: "#F7F5F0",
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
