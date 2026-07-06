/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#062D47",
        ink: "#0B4161",
        panel: "#F6D48A",
        magenta: {
          DEFAULT: "#E72F68",
          dim: "#A91E4B",
        },
        violet: {
          DEFAULT: "#0B4161",
          dim: "#062D47",
        },
        acid: "#FFB51F",
        bone: "#FFF1D2",
        concrete: "#6D5A43",
        sunset: "#F7941D",
        sky: "#0A6080",
        grass: "#6F8E19",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        body: ["var(--font-archivo)", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 22%, 24%, 55%": { opacity: "0.55" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        flicker: "flicker 4.5s infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
