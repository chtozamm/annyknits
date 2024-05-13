"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addCounter,
  decreaseCounter,
  increaseCounter,
  resetCounter,
  selectCounters,
  selectCurrentCounter,
  setCounterState,
  setCurrentCounter,
  updateCounter,
} from "@/lib/redux/features/counters/countersSlice";
import { setThemeState } from "@/lib/redux/features/theme/themeSlice";
// import { selectShowLabel } from "@/lib/redux/features/settings/settingsSlice";

export default function Counter() {
  const dispatch = useAppDispatch();
  // const showLabel = useAppSelector(selectShowLabel);
  const counters = useAppSelector(selectCounters);
  const currentCounter = useAppSelector(selectCurrentCounter);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (counters.length < 1) {
      dispatch(
        setCounterState(
          JSON.parse(String(localStorage.getItem("counters"))) || [
            {
              name: "New counter",
              value: 0,
              theme: "indigo",
              icon: "🧶",
            },
          ],
        ),
      );
      dispatch(
        setCurrentCounter(Number(localStorage.getItem("current_counter")) || 0),
      );
    }

    const handleKeypress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") handleIncrease();
      if (e.key === "ArrowDown") handleDecrease();
    };

    window.addEventListener("keydown", handleKeypress);

    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, []);

  useEffect(() => {
    counters.length > 0 &&
      localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  useEffect(() => {
    if (currentCounter !== null) {
      localStorage.setItem("current_counter", currentCounter.toString());
      counters[currentCounter]?.theme &&
        dispatch(setThemeState(counters[currentCounter]?.theme));
    }
  }, [currentCounter]);

  const handleIncrease = () => {
    dispatch(increaseCounter(currentCounter!));
  };
  const handleDecrease = () => {
    dispatch(decreaseCounter(currentCounter!));
  };
  // Reset counter
  const handleDoubleClick = () => {
    dispatch(resetCounter(currentCounter!));
  };

  useEffect(() => {
    // Close counter picker when click outside of it
    const handleClickOutside = (e: MouseEvent) => {
      const counterPicker = document.getElementById(
        "counter-picker",
      ) as HTMLElement;
      if (isOpen && !counterPicker.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    counters &&
    currentCounter !== null && (
      <div className="flex w-full flex-col items-center justify-evenly">
        {isOpen && (
          <div className="absolute left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-50"></div>
        )}
        <section
          id="counter-picker"
          className={`${isOpen && "rounded-lg bg-black bg-opacity-20"} absolute left-4 top-4 z-10 flex select-none flex-col items-start justify-start gap-2 p-2 text-left font-medium text-white`}
        >
          {counters
            .filter((_, idx) => idx === currentCounter)
            .map((counter, idx) => (
              <h1
                key={idx}
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen && counters.length > 1 && "border-b border-white border-opacity-20 pb-2"} flex w-full items-center gap-1.5 font-semibold sm:text-xl`}
              >
                {counter.icon && (
                  <span className="relative inline-flex aspect-square w-8 items-center justify-center rounded-full bg-black bg-opacity-20">
                    <span className="absolute text-lg sm:text-xl">
                      {counter.icon}
                    </span>
                  </span>
                )}
                {counter.name}
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </h1>
            ))}
          {counters.map((counter, idx) => {
            if (idx === currentCounter) return null;
            return (
              <button
                key={idx}
                className={`${isOpen ? "block" : "hidden"} w-full px-1 py-1 text-left text-sm sm:text-base`}
                onClick={() => {
                  dispatch(setCurrentCounter(idx));
                  setIsOpen(false);
                }}
              >{`${counter.icon || ""} ${counter.name}: ${counter.value}`}</button>
            );
          })}

          <button
            onClick={() => {
              dispatch(
                addCounter({
                  name: "New counter",
                  value: 0,
                  theme: "indigo",
                  icon: "🧶",
                }),
              );
              dispatch(setCurrentCounter(counters.length));
              setIsOpen(false);
            }}
            className={`${isOpen ? "block" : "hidden"} w-full border-t border-white border-opacity-20 pt-2 text-sm sm:text-base`}
          >
            + Add new
          </button>
        </section>
        <Button onClick={handleIncrease}>
          <SVG>
            <path d="M18 15l-6-6-6 6" />
          </SVG>
        </Button>
        <p
          className="select-none font-mono text-9xl font-bold text-white drop-shadow-sm"
          onDoubleClick={handleDoubleClick}
        >
          {counters[currentCounter]?.value || 0}
        </p>
        <Button
          onClick={handleDecrease}
          disabled={counters[currentCounter]?.value <= 0}
        >
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
      opacity-50 active:opacity-100 disabled:opacity-0 hover:disabled:opacity-0 lg:hover:opacity-100 lg:focus-visible:opacity-100"
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
