import { space } from "postcss/lib/list";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router (если есть)
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  container: {
    center: true,
    padding: "1rem",
    screens: {
      "2xl": "1400px",
      "xl": "1200px",
      "lg": "1000px",
      "md": "800px",
      "sm": "600px",
    },
  },
  extend: {
    fontFamily: {
      spaceGrotesk: ["var(--font-space-grotesk)", "sans-serif"],
    },
    keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
  },
},


  plugins: [],
};
