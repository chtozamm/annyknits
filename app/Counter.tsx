"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Counter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    setCount(Number(localStorage.getItem("count")) || 0);
    const body = document.querySelector("body");
    body?.addEventListener("keydown", handleKeypress);
    return () => {
      body?.removeEventListener("keydown", handleKeypress);
    };
  }, []);
  const handleKeypress = (e: any) => {
    if (e.key === "ArrowUp") handleAdd();
    if (e.key === "ArrowDown") handleSubtract();
  };
  useEffect(() => {
    if (count) localStorage.setItem("count", String(count));
  }, [count]);
  const handleSubtract = () => {
    setCount((prev) => (prev && prev > 0 ? prev - 1 : prev));
  };
  const handleAdd = () => {
    setCount((prev) => prev! + 1);
  };
  // Reset counter
  const handleDoubleClick = () => {
    setCount(0);
    localStorage.setItem("count", "0");
  };
  return (
    count !== null && (
      <div className="flex w-full flex-col items-center justify-evenly">
        <Button onClick={handleAdd}>
          <SVG>
            <path d="M18 15l-6-6-6 6" />
          </SVG>
        </Button>
        <p
          className="select-none text-9xl font-bold text-white drop-shadow-sm"
          onDoubleClick={handleDoubleClick}
        >
          {count}
        </p>
        <Button onClick={handleSubtract} disabled={count <= 0}>
          <SVG>
            <path d="M6 9l6 6 6-6" />
          </SVG>
        </Button>
      </div>
    )
  );
}

const Button = ({ ...props }) => (
  <div className="relative">
    <motion.button
      whileTap={{ scale: 1.25 }}
      transition={{ duration: 0.2 }}
      className="group flex aspect-square w-fit items-center justify-items-center rounded-full p-8 text-6xl
      opacity-50 active:opacity-100 disabled:opacity-0 lg:hover:opacity-100 lg:focus-visible:opacity-100"
      {...props}
    >
      {props.children}
    </motion.button>
  </div>
);

const SVG = ({ children }: { children: React.ReactNode }) => (
  <svg
    fill="none"
    shapeRendering="geometricPrecision"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    height="80"
    width="80"
    className="h-24 w-24 rounded-full text-white group-active:opacity-75 group-disabled:text-transparent lg:group-hover:opacity-75 lg:group-focus-visible:opacity-75"
  >
    {children}
  </svg>
);
