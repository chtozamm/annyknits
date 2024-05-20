"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  decreaseCounter,
  increaseCounter,
  resetCounter,
  selectCounters,
  selectSplitCounter,
  selectSplitSupport,
  setSplitCounter,
} from "@/lib/redux/features/counters/countersSlice";
import { setPageState } from "@/lib/redux/features/page/pageSlice";
import { pageTransition } from "./animations";
import CounterPicker from "./CounterPicker";
import { ChevronDownIcon, ChevronUpIcon, SettingsIcon } from "./icons";
import { useWindowResize } from "./hooks";
import Background from "./Background";
import Settings from "./Settings";
import {
  selectIsSplit,
  setIsSplit,
} from "@/lib/redux/features/split/splitSlice";

type CounterProps = { currentCounter: number; split?: boolean };

export default function Counter({ currentCounter, split }: CounterProps) {
  const dispatch = useAppDispatch();
  const counters = useAppSelector(selectCounters);
  const resetAnimationControls = useAnimationControls();
  const valueAnimationControls = useAnimationControls();
  const completeAnimationControls = useAnimationControls();
  const windowSize = useWindowResize();
  const [showSettings, setShowSettings] = useState(false);
  const isSplit = useAppSelector(selectIsSplit);
  const splitCounter = useAppSelector(selectSplitCounter);
  const settingsRef = useRef<HTMLDivElement>(null);
  const splitEnabled = useAppSelector(selectSplitSupport);

  // // Keypress handler
  // useEffect(() => {
  //   const handleKeypress = (e: KeyboardEvent) => {
  //     if (currentPage === "counter") {
  //       if (e.key === "ArrowUp") handleIncrease();
  //       if (e.key === "ArrowDown") handleDecrease();
  //       if (e.key === "ArrowRight") dispatch(setPageState("settings"));
  //     } else {
  //       if (e.key === "Escape") dispatch(setPageState("counter"));
  //     }
  //     // if (e.key === "ArrowRight") dispatch(setPageState("settings"));
  //     // if (e.key === "ArrowLeft") dispatch(setPageState("counter"));
  //   };
  //   window.addEventListener("keydown", handleKeypress);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeypress);
  //   };
  // }, [currentCounter, counters, currentPage]);

  // useEffect(() => {
  //   // Close settings when click outside of its container
  //   const handleClickOutside = (e: MouseEvent) => {
  //     // const settingsContainer = document.getElementById("settings");
  //     const settingsContainer = document.getElementById("settings");
  //     const openSettingsButton = document.getElementById("open-settings");
  //     if (
  //       settingsContainer &&
  //       openSettingsButton &&
  //       showSettings &&
  //       !settingsContainer.contains(e.target as Node) &&
  //       !openSettingsButton.contains(e.target as Node)
  //     ) {
  //       setShowSettings(false);
  //     }
  //   };
  //   window.addEventListener("click", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, [showSettings]);

  // Counter value controllers
  const handleIncrease = () => {
    if (currentCounter === null) return;
    if (
      counters[currentCounter].goal !== null
        ? counters[currentCounter].value >= counters[currentCounter].goal!
        : false
    )
      return;
    if (
      !!counters[currentCounter].goal &&
      counters[currentCounter].goal === counters[currentCounter]?.value + 1
    ) {
      completeAnimationControls.start({ opacity: [1, 0], scale: 25 });
      completeAnimationControls.set({ scale: 1 });
    }
    dispatch(increaseCounter(currentCounter));
  };
  const handleDecrease = () => {
    if (currentCounter === null || counters[currentCounter].value === 0) return;
    dispatch(decreaseCounter(currentCounter));
  };
  // Resets counter value to 0
  const handleDoubleClick = () => {
    if (currentCounter === null) return;
    if (counters[currentCounter]?.value === 0) return;
    resetAnimationControls.start({ opacity: [0, 0.1, 0] });
    dispatch(resetCounter(currentCounter));
  };

  if (counters.length < 1 || currentCounter === null) return;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`${split && "z-50"} relative flex h-full w-full flex-col items-center justify-center`}
    >
      <Background currentCounter={currentCounter} split={split} />
      {/* Flick on reset counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={resetAnimationControls}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full bg-white"
      />
      {/* Main counter container */}
      <motion.div
        animate={!showSettings ? "shown" : "hidden"}
        variants={{
          shown: windowSize.innerWidth < 768 ? { x: 0, opacity: 1 } : {},
          hidden: windowSize.innerWidth < 768 ? { x: "-100%", opacity: 0 } : {},
        }}
        transition={pageTransition}
        className="flex h-full w-full flex-col items-center justify-evenly"
      >
        {splitEnabled &&
          (split ? (
            isSplit && (
              <button
                disabled={counters.length < 2}
                onClick={() => {
                  // if (splitCounter === null) {
                  //   dispatch(setSplitCounter(0));
                  // }
                  dispatch(setIsSplit(false));
                  dispatch(setSplitCounter(null));
                  localStorage.setItem("is_split", "false");
                }}
                className="absolute right-16 top-8 z-10 text-2xs uppercase text-white opacity-50 transition-opacity duration-500 ease-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:opacity-25"
              >
                Close
              </button>
            )
          ) : (
            <button
              disabled={counters.length < 2 || isSplit}
              onClick={() => {
                if (splitCounter === null) {
                  if (currentCounter === 0) {
                    dispatch(setSplitCounter(1));
                    localStorage.setItem("split_counter", "1");
                  } else {
                    dispatch(setSplitCounter(0));
                    localStorage.setItem("split_counter", "0");
                  }
                  // if (currentCounter === counters.length - 1) dispatch(setSplitCounter(counters.length - 2));
                  // dispatch(setSplitCounter(0));
                }
                // if (isSplit) localStorage.setItem("is_split", "false");
                // else
                localStorage.setItem("is_split", "true");
                dispatch(setIsSplit(!isSplit));
              }}
              className={`${isSplit ? "font-medium opacity-100" : "opacity-50 hover:opacity-100  disabled:opacity-25 disabled:hover:opacity-25"} absolute right-16 top-8 z-10 text-2xs uppercase text-white transition-opacity duration-500 ease-out disabled:cursor-not-allowed`}
            >
              Split
            </button>
          ))}
        <button
          id="open-settings"
          disabled={showSettings}
          onClick={() => {
            setShowSettings(true);
            // dispatch(setPageState("settings"));
          }}
          className="absolute right-2 top-5 z-10 rounded-md p-2 text-white opacity-50 transition-all duration-500 ease-out hover:opacity-100 md:disabled:opacity-0"
        >
          <SettingsIcon className="h-6 w-6 text-white" />
        </button>
        <AnimatePresence>
          <CounterPicker id={currentCounter} split={split} />
        </AnimatePresence>
        <section className="flex flex-col items-center justify-center short:flex-row">
          {/* Animate complete / target reached */}
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={completeAnimationControls}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute h-4 w-4 rounded-full bg-white bg-opacity-50"
          />
          <motion.button
            whileTap={{ scale: 1.25 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 order-1 flex aspect-square w-fit items-center justify-items-center rounded-full
      text-6xl opacity-50 transition-opacity duration-500 ease-out hover:opacity-100 active:opacity-100 disabled:opacity-0 disabled:hover:opacity-0 md:focus-visible:opacity-100 short:order-3"
            disabled={
              !!counters[currentCounter]?.goal &&
              counters[currentCounter].value >= counters[currentCounter]?.goal!
            }
            onClick={handleIncrease}
          >
            <ChevronUpIcon
              className="h-24 w-24 rounded-full text-white"
              strokeWidth={2.5}
            />
          </motion.button>
          <motion.p
            animate={valueAnimationControls}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="order-2 select-none font-mono text-8xl font-black text-white drop-shadow-sm"
            onDoubleClick={handleDoubleClick}
          >
            {counters[currentCounter].value || 0}
          </motion.p>
          <motion.button
            whileTap={{ scale: 1.25 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 order-3 flex aspect-square w-fit items-center justify-items-center rounded-full
      text-6xl opacity-50 transition-opacity duration-500 ease-out hover:opacity-100 active:opacity-100 disabled:opacity-0 hover:disabled:opacity-0 md:focus-visible:opacity-100 short:order-1"
            onClick={handleDecrease}
            disabled={counters[currentCounter].value <= 0}
          >
            <ChevronDownIcon
              className="h-24 w-24 rounded-full text-white"
              strokeWidth={2.5}
            />
          </motion.button>
        </section>
        {!!counters[currentCounter]?.goal && (
          <section
            // TODO: on click open settings and focus target input field
            onClick={() => {
              //   dispatch(setPageState("settings"));
              //   (
              //     document.getElementById("target") as HTMLInputElement
              //   )?.focus();
              setShowSettings(true);
              setTimeout(() => {
                (
                  document.getElementById("target") as HTMLInputElement
                )?.focus();
              }, 300);
              // targetInputRef.current?.focus();
            }}
            className="absolute bottom-4 cursor-pointer select-none text-2xs uppercase text-white opacity-50 transition-opacity duration-500 ease-out hover:opacity-100"
          >
            {`Goal: ${counters[currentCounter]?.goal}`}
          </section>
        )}
      </motion.div>
      <Settings
        currentCounter={currentCounter}
        isOpen={showSettings}
        setIsOpen={setShowSettings}
      />
    </motion.div>
  );
}
