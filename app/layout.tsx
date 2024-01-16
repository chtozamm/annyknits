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
  return (
    <html lang="en" className={`bg-${theme}-primary select-none`}>
      <head>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png" />
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
              className="group absolute right-6 top-6 text-white opacity-50 active:opacity-100 md:hover:opacity-100 lg:focus-visible:opacity-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              <SettingsIcon />
            </motion.button>
            <motion.ul
              animate={isOpen ? "open" : "closed"}
              variants={{ open: { y: 0 }, closed: { y: -80 } }}
              initial={{ y: -80 }}
              transition={{ duration: 1, type: "spring", stiffness: 150 }}
              className="absolute top-8 flex w-fit justify-center gap-3"
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

const SettingsIcon = () => (
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
    className="h-6 w-6"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
