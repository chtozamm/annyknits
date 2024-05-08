"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

const colors = ["red", "orange", "mint", "sky", "lavender", "rose"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("rose");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme") as string;
    if (theme) setTheme(theme);
    setLoading(false);
  }, []);

  function changeColor(color: string) {
    setTheme(color);
    localStorage.setItem("theme", color);
  }
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // const themePicker = document.getElementById(
    //   "theme-picker",
    // ) as HTMLUListElement;
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && e.clientY > 100) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <html
      lang="en"
      className={`bg-${loading ? "white" : theme}-primary h-screen w-screen touch-none select-none overflow-hidden`}
    >
      <head>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-512x512.png" />
          <meta name="theme-color" content="#ffffff" />
        </head>
      </head>
      <body className={inter.className}>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.button
              className={`group absolute right-6 top-6 text-white ${isOpen ? "opacity-100" : "opacity-50"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <BrushIcon />
            </motion.button>
            <motion.ul
              // id="theme-picker"
              animate={isOpen ? "open" : "closed"}
              variants={{ open: { y: 0 }, closed: { y: -80 } }}
              initial={{ y: -80 }}
              transition={{ duration: 1, type: "spring", stiffness: 150 }}
              className="absolute top-0 flex w-full justify-center gap-3 p-8"
            >
              {colors.map((color) => (
                <motion.button
                  whileTap={{ scale: 1.25 }}
                  key={color}
                  onClick={() => changeColor(color)}
                  className={`h-6 w-6 rounded-full border-2 border-white border-opacity-75 bg-${color}-primary`}
                />
              ))}
            </motion.ul>
            {children}
          </motion.div>
        )}
      </body>
    </html>
  );
}

const BrushIcon = () => (
  <svg
    fill="none"
    shapeRendering="geometricPrecision"
    stroke="currentColor"
    height="24"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="24"
    className="h-8 w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
    />
  </svg>
);
