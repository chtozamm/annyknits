import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          primary: "#f87171",
          secondary: "#ff9a9b",
          interactive: "#fedfdf",
        },
        orange: {
          primary: "#fb923c",
        },
        mint: {
          primary: "#34d399",
        },
        sky: {
          primary: "#38bdf8",
        },
        lavender: {
          primary: "#8b5cf6",
        },
        rose: {
          primary: "#f43f5e",
        },
        indigo: {
          primary: "#3730a3",
        },
        cyan: {
          primary: "#0891b2",
        },
        green: {
          primary: "#15803d",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      fontSize: {
        xs: "13px",
        "2xs": "12px",
        "3xs": "11px",
        "4xs": "10px",
        "5xs": "9px",
      },
    },
  },
  safelist: [
    "bg-red-primary",
    "bg-orange-primary",
    "bg-mint-primary",
    "bg-sky-primary",
    "bg-lavender-primary",
    "bg-rose-primary",
    "bg-indigo-primary",
    "bg-cyan-primary",
    "bg-green-primary",
    // "accent-red-primary",
    // "accent-orange-primary",
    // "accent-mint-primary",
    // "accent-sky-primary",
    // "accent-lavender-primary",
    // "accent-rose-primary",
    // "accent-indigo-primary",
  ],
  plugins: [],
};
export default config;
