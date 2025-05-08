/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a", // blue-800
        accent: "#0e7490",  // cyan-600
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        pulseSlow: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      extend: {
        animation: {
          fadeIn: "fadeIn 0.6s ease-out",
          pulseSlow: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        },
      },
      
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
