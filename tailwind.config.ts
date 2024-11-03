import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 600px)" },
      },
      colors: {
        pink: {
          primary: "#F266AB",
        },
        orange: {
          primary: "#DC6B19",
        },
        mint: {
          primary: "#0d9488",
        },
        sky: {
          primary: "#5AB2FF",
        },
        lavender: {
          primary: "#8b5cf6",
        },
        rose: {
          primary: "#DD4A48",
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
        olive: {
          primary: "#627254",
        },
        grape: {
          primary: "#5F5D9C",
        },
        beige: { primary: "#B68973" },
        winterNight: { primary: "#0B2447" },
        cherry: { primary: "#7B113A" },
        teal: { primary: "#89BEB3" },
        plum: { primary: "#625261" },
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
    "bg-pink-primary",
    "bg-orange-primary",
    "bg-mint-primary",
    "bg-sky-primary",
    "bg-lavender-primary",
    "bg-rose-primary",
    "bg-indigo-primary",
    "bg-cyan-primary",
    "bg-green-primary",
    "bg-olive-primary",
    "bg-grape-primary",
    "bg-winterNight-primary",
    "bg-beige-primary",
    "bg-cherry-primary",
    "bg-teal-primary",
    "bg-plum-primary",

    // "accent-pink-primary",
    // "accent-orange-primary",
    // "accent-mint-primary",
    // "accent-sky-primary",
    // "accent-lavender-primary",
    // "accent-rose-primary",
    // "accent-indigo-primary",
  ],
  plugins: [],
}
export default config
