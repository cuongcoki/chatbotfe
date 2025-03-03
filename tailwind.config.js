/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 8s linear infinite",
        neon: "neonBlink 1s infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        neonBlink: {
          "0%": { textShadow: "0 0 10px red, 0 0 20px blue" },
          "100%": { textShadow: "0 0 20px blue, 0 0 30px red" },
        },
      },
    },
  },
  plugins: [
    
  ],
}