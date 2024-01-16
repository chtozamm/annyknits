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
          primary: "#ff6f70",
          secondary: "#ff9a9b",
          interactive: "#fedfdf",
        },
        orange: {
          primary: "#ffaa66",
        },
        mint: {
          primary: "#6ee7b7",
        },
        sky: {
          primary: "#7dd3fc",
        },
        lavender: {
          primary: "#a78bfa",
        },
        rose: {
          primary: "#fb7185",
        },
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
  ],
  plugins: [],
};
export default config;
