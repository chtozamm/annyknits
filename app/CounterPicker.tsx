"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addCounter,
  selectCounters,
  selectCurrentCounter,
  selectSplitCounter,
  setCurrentCounter,
  setSplitCounter,
} from "@/lib/redux/features/counters/countersSlice";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "./icons";
// import { defaultCounter } from "./data";
import ScreenDimmer from "./ScreenDimmer";
import { colors, icons, presets } from "./data";
import { selectIsSplit } from "@/lib/redux/features/split/splitSlice";

type CounterPickerProps = { id: number; split?: boolean };

export default function CounterPicker({ id, split }: CounterPickerProps) {
  const dispatch = useAppDispatch();
  const counters = useAppSelector(selectCounters);
  const currentCounter = useAppSelector(selectCurrentCounter);
  const splitCounter = useAppSelector(selectSplitCounter);
  const [isOpen, setIsOpen] = useState(false);
  const counterPickerRef = useRef<HTMLElement>(null);
  const isSplit = useAppSelector(selectIsSplit);

  const defaultCounter = {
    value: 0,
    goal: null,
    ...presets[Math.floor(Math.random() * presets.length)],
    // icon: presets[Math.floor(Math.random() * presets.length)].icon[Math.floor(Math.random() * presets.length)]
    // name: "New counter",
    // theme: colors[Math.floor(Math.random() * colors.length)],
    // icon: icons[Math.floor(Math.random() * icons.length)],
  };

  useEffect(() => {
    // Close counter picker when click outside of it
    const handleClickOutside = (e: MouseEvent) => {
      const counterPicker = counterPickerRef.current;
      if (
        counterPicker &&
        isOpen &&
        !counterPicker.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (id === null) return;
  return (
    <>
      {/* Screen dimmer */}
      <ScreenDimmer
        isShown={isOpen}
        opacity={45}
        transition={{ duration: 0.3 }}
      />
      <section
        ref={counterPickerRef}
        className={`${isOpen && "rounded-lg bg-black bg-opacity-20"} absolute left-4 top-4 z-50 flex select-none flex-col items-start justify-start gap-2 p-2 text-left font-normal text-white`}
      >
        {/* Current counter */}
        <h1
          onClick={() => setIsOpen(!isOpen)}
          className={`${isOpen && counters.length > 1 && splitCounter === null && "border-b border-white border-opacity-20 pb-2"} ${splitCounter !== null && isOpen && counters.length > 2 && "border-b border-white border-opacity-20 pb-2"} flex w-full items-center gap-1.5 font-semibold tracking-wide transition-opacity duration-500 ease-out hover:cursor-pointer hover:opacity-75`}
        >
          {counters[id].icon && (
            <span className="relative inline-flex aspect-square w-8 items-center justify-center rounded-full bg-black bg-opacity-20">
              <span className="absolute text-lg">{counters[id].icon}</span>
            </span>
          )}
          {counters[id].name}
          {isOpen ? (
            <ChevronUpIcon
              className="pointer-events-none inline h-3 w-3"
              strokeWidth={1.5}
            />
          ) : (
            <ChevronDownIcon
              className="pointer-events-none inline h-3 w-3"
              strokeWidth={1.5}
            />
          )}
        </h1>
        {/* List counters */}
        <ul
          className={`max-h-64 w-full overflow-y-auto ${isOpen && "border-b border-white border-opacity-20"}`}
        >
          {counters.map((counter, idx) => {
            if (idx === id) return null;
            // if (split && idx === currentCounter) return null;
            // if (splitCounter !== null && idx === splitCounter) return null;
            return (
              <button
                disabled={
                  isSplit && !split
                    ? splitCounter !== null && idx === splitCounter
                    : idx === currentCounter
                }
                key={idx}
                className={`${isOpen ? "block" : "hidden"} w-full px-1 py-1 text-left text-sm transition-opacity duration-500 ease-out last:mb-2 hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50`}
                onClick={() => {
                  split
                    ? dispatch(setSplitCounter(idx))
                    : dispatch(setCurrentCounter(idx));
                  setIsOpen(false);
                }}
              >{`${counter.icon || ""} ${counter.name}: ${counter.value}`}</button>
            );
          })}
        </ul>
        {/* Add new */}
        <button
          disabled={counters.length >= 10}
          onClick={() => {
            dispatch(addCounter(defaultCounter));
            split
              ? dispatch(setSplitCounter(counters.length))
              : dispatch(setCurrentCounter(counters.length));
            setIsOpen(false);
          }}
          className={`${isOpen ? "block" : "hidden"} relative flex w-full min-w-32 items-center justify-center gap-1 rounded-sm bg-white bg-opacity-5 py-1 text-2xs uppercase transition-opacity duration-500 ease-out hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50`}
        >
          <PlusIcon className="h-4 w-4" />
          Add new
        </button>
      </section>
    </>
  );
}
