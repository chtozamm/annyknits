"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Counter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    setCount(Number(localStorage.getItem("count")) || 1);
  }, []);
  useEffect(() => {
    if (count) localStorage.setItem("count", String(count));
  }, [count]);
  const handleSubtract = () => {
    setCount((prev) => prev! - 1);
  };
  const handleAdd = () => {
    setCount((prev) => prev! + 1);
  };
  // Reset counter
  const handleDoubleClick = () => {
    setCount(1);
    localStorage.setItem("count", "1");
  };
  return (
    count && (
      <div className="flex flex-col items-center justify-evenly">
        <Button onClick={handleAdd}>
          <SVG>
            <path d="M18 15l-6-6-6 6" />
          </SVG>
        </Button>
        <p
          className="select-none text-9xl font-semibold text-white"
          onDoubleClick={handleDoubleClick}
        >
          {count}
        </p>
        <Button onClick={handleSubtract} disabled={count <= 1}>
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
      whileTap={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 0.2 }}
      className="group flex aspect-square w-fit items-center justify-items-center rounded-full p-8 text-6xl font-light
      active:bg-[#ff8d8e] disabled:opacity-0 lg:hover:bg-[#ff8d8e] lg:focus-visible:bg-[#ff8d8e]"
      {...props}
    >
      {props.children}
    </motion.button>
  </div>
);

const SVG = ({ children }: { children: React.ReactNode }) => (
  <svg
    fill="none"
    height="80"
    shapeRendering="geometricPrecision"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    width="80"
    className="h-24 w-24 rounded-full text-[#ff9a9b] group-active:text-[#fedfdf] group-disabled:text-transparent lg:group-hover:text-[#fedfdf] lg:group-focus-visible:text-[#fedfdf]"
  >
    {children}
  </svg>
);
