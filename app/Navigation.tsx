"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectTheme,
  setThemeState,
} from "@/lib/redux/features/theme/themeSlice";
import {
  selectSfx,
  selectShowLabel,
  selectVolume,
  setSfxState,
  setShowLabelState,
  setVolumeState,
} from "@/lib/redux/features/settings/settingsSlice";
import {
  addCounter,
  deleteCounter,
  selectCounters,
  selectCurrentCounter,
  setCurrentCounter,
} from "@/lib/redux/features/counters/countersSlice";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useAppSelector(selectTheme);
  const counters = useAppSelector(selectCounters);
  const currentCounter = useAppSelector(selectCurrentCounter);
  const volumeRef = useRef<HTMLInputElement>(null);

  const showLabel = useAppSelector(selectShowLabel);
  const sfx = useAppSelector(selectSfx);
  const volume = useAppSelector(selectVolume);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const storedVolume = localStorage.getItem("volume");
  //   storedVolume && dispatch(setVolumeState(+storedVolume));
  //   const storedSfx = localStorage.getItem("sfx");
  //   storedSfx && dispatch(setSfxState(storedSfx === "true" ? true : false));
  // }, []);

  useEffect(() => {
    showLabel !== null &&
      localStorage.setItem("show_label", showLabel.toString());
    volume && localStorage.setItem("volume", volume.toString());
    sfx !== null && localStorage.setItem("sfx", sfx.toString());
  }, [showLabel, volume, sfx]);
  return (
    <aside className="absolute left-0 top-0 h-full w-20 border-r border-gray-200">
      <button
        className={`group absolute left-6 top-6 text-white ${isOpen ? "opacity-100" : "opacity-50"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <nav
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} absolute left-0 top-20 z-20 flex w-fit flex-col gap-8 bg-black p-8 text-white transition-transform duration-500 ease-in-out`}
      >
        <section className="flex flex-col gap-1.5">
          <p className="mb-2 font-semibold">My counters</p>
          <ul>
            {counters.map((counter, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <button onClick={() => dispatch(setCurrentCounter(idx))}>
                  {counter.name}
                </button>
                <button
                // onClick={() => {
                //   if (counters.length === 1) {
                //     dispatch(
                //       addCounter({
                //         name: "New counter",
                //         value: 0,
                //         theme: "red",
                //       }),
                //     );
                //     dispatch(setThemeState("red"));
                //   }
                //   dispatch(deleteCounter(idx));
                // }}
                >
                  x
                </button>
              </li>
            ))}
            {/* <li>Main</li>
            <li>Secondary</li> */}
          </ul>
          <button
            // onClick={() => {
            //   dispatch(
            //     addCounter({
            //       name: "New counter",
            //       value: 0,
            //       theme: "red",
            //     }),
            //   );
            //   dispatch(setCurrentCounter(currentCounter! + 1));
            // }}
            className={`flex h-fit w-full items-center justify-center gap-1.5 rounded-md border text-4xs sm:text-3xs bg-${theme}-primary border-none p-2 px-3 py-1.5 font-semibold uppercase leading-3 tracking-wide text-white transition-colors sm:px-4 sm:py-2`}
          >
            + Add new counter
          </button>
        </section>

        <section className="flex flex-col gap-1.5">
          <p className="mb-2 font-semibold">Settings</p>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="show-label"
              id="show-label"
              checked={showLabel !== null && showLabel}
              onChange={() => {
                dispatch(setShowLabelState(!showLabel));
              }}
              className={`accent-${theme}-primary`}
            />
            <label htmlFor="show-label" className="select-none pl-1.5">
              Show label
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="sfx"
              id="sfx"
              checked={sfx !== null && sfx}
              onChange={() => {
                dispatch(setSfxState(!sfx));
              }}
              className={`accent-${theme}-primary`}
            />
            <label htmlFor="sfx" className="select-none pl-1.5">
              Sound effects
            </label>
          </div>
          <div className="flex justify-between">
            <label htmlFor="volume">Volume</label>
            <span>{volumeRef.current?.value}</span>
          </div>
          <input
            type="range"
            name="volume"
            id="volume"
            value={volume || 100}
            onChange={(e) => dispatch(setVolumeState(+e.target.value))}
            ref={volumeRef}
            className={`accent-${theme}-primary`}
          />
        </section>
      </nav>
    </aside>
  );
}
