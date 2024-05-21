"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  deleteCounter,
  resetGoal,
  resetLabel,
  resetValue,
  selectCounters,
  selectSplitCounter,
  setSplitCounter,
  updateGoal,
  updateIcon,
  updateLabel,
  updateTheme,
  updateValue,
} from "@/lib/redux/features/counters/countersSlice";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "./animations";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckmarkIcon,
  CircleIcon,
  XIcon,
} from "./icons";
import { colors, icons } from "./data";
import {
  selectIsSplit,
  selectSplitEnabled,
  setIsSplit,
  setSplitEnabled,
} from "@/lib/redux/features/split/splitSlice";

type SettingsProps = {
  currentCounter: number;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

export default function Settings({
  currentCounter,
  isOpen,
  setIsOpen,
}: SettingsProps) {
  const dispatch = useAppDispatch();
  const counters = useAppSelector(selectCounters);
  const [showDialog, setShowDialog] = useState(false);
  const labelInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);
  const targetInputRef = useRef<HTMLInputElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const dimmerRef = useRef<HTMLDivElement>(null);
  const splitCounter = useAppSelector(selectSplitCounter);
  const isSplit = useAppSelector(selectIsSplit);
  const splitEnabled = useAppSelector(selectSplitEnabled);

  useEffect(() => {
    // Close settings when click outside of its container
    const handleClickOutside = (e: MouseEvent) => {
      const settingsContainer = settingsRef.current;
      const dimmerContainer = dimmerRef.current;
      if (
        settingsContainer &&
        dimmerContainer &&
        isOpen &&
        !settingsContainer.contains(e.target as Node) &&
        dimmerContainer.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (!isOpen) setShowDialog(false);

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (showDialog && isOpen) {
      settingsRef.current?.classList.remove("overflow-y-auto");
      settingsRef.current?.classList.add("overflow-y-hidden");
    } else {
      settingsRef.current?.classList.remove("overflow-y-hidden");
      settingsRef.current?.classList.add("overflow-y-auto");
    }
  }, [showDialog, isOpen]);

  if (!currentCounter && currentCounter !== 0) return;
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={pageTransition}
              ref={dimmerRef}
              className={`absolute inset-0 z-50 h-full w-full bg-black bg-opacity-45 md:max-w-full`}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={pageTransition}
              ref={settingsRef}
              className={`absolute z-50 flex h-full w-full flex-col items-center overflow-y-auto bg-black bg-opacity-95 p-8 text-white sm:pb-8 md:right-0 md:max-w-md short:px-10`}
            >
              <div className="mx-auto flex w-full max-w-md flex-col gap-8">
                <div className="relative flex w-full items-center justify-center">
                  <p className="relative select-none text-center text-xs font-semibold uppercase">
                    Customization
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute -left-2 p-2 opacity-50 transition-all duration-500 ease-out hover:opacity-100 md:hidden"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute -left-2 hidden p-2 opacity-50 transition-all duration-500 ease-out hover:opacity-100 md:block"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
                <section className="relative">
                  <label
                    htmlFor="label"
                    className="block select-none pb-2 text-3xs font-semibold uppercase"
                  >
                    Label
                  </label>
                  <input
                    ref={labelInputRef}
                    type="text"
                    name="label"
                    id="label"
                    placeholder="Name of the counter"
                    value={counters[currentCounter]?.name}
                    onChange={(e) => {
                      dispatch(
                        updateLabel({
                          id: currentCounter,
                          value: e.target.value,
                        }),
                      );
                    }}
                    className="w-full rounded-md bg-white bg-opacity-10 px-2.5 py-1 outline-none transition-all duration-500 ease-out placeholder:text-sm placeholder:text-white placeholder:text-opacity-50 focus-within:bg-opacity-20 hover:bg-opacity-20"
                  />
                  {counters[currentCounter]?.name && (
                    <button
                      onClick={() => {
                        dispatch(resetLabel(currentCounter));
                        labelInputRef.current?.focus();
                      }}
                      className="absolute bottom-0 right-0 p-2 opacity-50 transition-opacity duration-500 ease-out hover:opacity-100"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  )}
                </section>
                <section className="relative">
                  <label
                    htmlFor="value"
                    className="block select-none pb-2 text-3xs font-semibold uppercase"
                  >
                    Value
                  </label>
                  <input
                    ref={valueInputRef}
                    type="text"
                    name="value"
                    id="value"
                    placeholder="0"
                    value={
                      counters[currentCounter]?.value === 0
                        ? ""
                        : counters[currentCounter]?.value
                    }
                    onChange={(e) => {
                      if (
                        !e.target.value.match(/^\d+$/) &&
                        e.target.value !== ""
                      )
                        return;
                      dispatch(
                        updateValue({
                          id: currentCounter,
                          value: +e.target.value > 0 ? +e.target.value : 0,
                        }),
                      );
                    }}
                    className="w-full rounded-md bg-white bg-opacity-10 px-2.5 py-1 outline-none transition-all duration-500 ease-out placeholder:text-white focus-within:bg-opacity-20 hover:bg-opacity-20 focus-visible:placeholder:text-opacity-50"
                  />
                  {counters[currentCounter]?.value > 0 && (
                    <button
                      onClick={() => {
                        dispatch(resetValue(currentCounter));
                        if (valueInputRef.current) {
                          valueInputRef.current.value = "";
                          valueInputRef.current.focus();
                        }
                      }}
                      className="absolute bottom-0 right-0 p-2 opacity-50 transition-opacity duration-500 ease-out hover:opacity-100"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  )}
                </section>
                <section className="relative">
                  <label
                    htmlFor="target"
                    className="flex select-none items-center gap-1.5 pb-2 text-3xs font-semibold uppercase"
                  >
                    Target
                    <span className="font-normal opacity-50">(Optional)</span>
                  </label>
                  <input
                    ref={targetInputRef}
                    type="text"
                    name="target"
                    id="target"
                    placeholder="Goal to reach"
                    value={
                      counters[currentCounter].goal !== null &&
                      counters[currentCounter].goal! > 0
                        ? counters[currentCounter].goal!
                        : ""
                    }
                    onChange={(e) => {
                      if (
                        !e.target.value.match(/^\d+$/) &&
                        e.target.value !== ""
                      )
                        return;
                      dispatch(
                        updateGoal({
                          id: currentCounter,
                          value: +e.target.value > 0 ? +e.target.value : null,
                        }),
                      );
                    }}
                    className="w-full rounded-md bg-white bg-opacity-10 px-2.5 py-1 outline-none transition-all duration-500 ease-out placeholder:text-sm placeholder:text-white placeholder:text-opacity-50 focus-within:bg-opacity-20 hover:bg-opacity-20"
                  />
                  {!!counters[currentCounter]?.goal &&
                    counters[currentCounter]?.goal! > 0 && (
                      <button
                        onClick={() => {
                          dispatch(resetGoal(currentCounter));
                          if (targetInputRef.current) {
                            targetInputRef.current.value = "";
                            targetInputRef.current.focus();
                          }
                        }}
                        className="absolute bottom-0 right-0 p-2 opacity-50 transition-opacity duration-500 ease-out hover:opacity-100"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    )}
                </section>
                <section className="flex flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                    <label className="select-none text-3xs font-semibold uppercase">
                      Theme color
                    </label>
                    {/* <button
                      onClick={() => {
                        let color = counters[currentCounter].theme;
                        while (color === counters[currentCounter].theme) {
                          color =
                            colors[Math.floor(Math.random() * colors.length)];
                        }
                        dispatch(
                          updateTheme({
                            id: currentCounter,
                            value: color,
                          }),
                        );
                      }}
                      className="text-3xs font-normal uppercase opacity-50 transition-opacity duration-500 ease-out hover:opacity-25"
                    >
                      <ShuffleIcon className="h-4 w-4" /> 
                    Select Random
                    </button> */}
                  </div>
                  <ul className="flex select-none flex-wrap gap-2">
                    <li className="relative flex items-center justify-center">
                      <button
                        onClick={() => {
                          let color = counters[currentCounter].theme;
                          while (color === counters[currentCounter].theme) {
                            color =
                              colors[Math.floor(Math.random() * colors.length)];
                          }
                          dispatch(
                            updateTheme({
                              id: currentCounter,
                              value: color,
                            }),
                          );
                        }}
                        className="h-6 w-6 rounded-full bg-transparent text-center text-sm opacity-25 transition-opacity duration-500 ease-out hover:opacity-50"
                      >
                        ?
                      </button>
                    </li>
                    {colors.map((color) => (
                      <li
                        key={color}
                        className="relative flex items-center justify-center"
                      >
                        <motion.div
                          animate={
                            counters[currentCounter]?.theme === color
                              ? "selected"
                              : "normal"
                          }
                          variants={{
                            selected: {
                              opacity: 1,
                            },
                            normal: {
                              opacity: 0,
                            },
                          }}
                          className="absolute h-8 w-8 rounded-full bg-white bg-opacity-10"
                        />
                        <button
                          onClick={() => {
                            dispatch(
                              updateTheme({
                                id: currentCounter,
                                value: color,
                              }),
                            );
                          }}
                          className={`relative z-10 h-6 w-6 rounded-full transition-opacity duration-500 ease-out bg-${color}-primary hover:opacity-100 ${counters[currentCounter]?.theme === color ? "opacity-100" : "opacity-50"}`}
                        ></button>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="flex flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                    <label className="select-none text-3xs font-semibold uppercase">
                      Icon
                    </label>
                    {/*  <button
                      onClick={() => {
                        let icon = counters[currentCounter].icon;
                        while (icon === counters[currentCounter].icon) {
                          icon =
                            icons[Math.floor(Math.random() * icons.length)];
                        }
                        dispatch(
                          updateIcon({
                            id: currentCounter,
                            value: icon,
                          }),
                        );
                      }}
                      className="text-3xs font-normal uppercase opacity-50 transition-opacity duration-500 ease-out hover:opacity-25"
                    >
                      {/* <ShuffleIcon className="h-4 w-4" />
                      Select Random
                    </button> */}
                  </div>
                  <ul className="flex select-none flex-wrap gap-2">
                    <li className="relative flex items-center justify-center">
                      <button
                        onClick={() => {
                          let icon = counters[currentCounter].icon;
                          while (icon === counters[currentCounter].icon) {
                            icon =
                              icons[Math.floor(Math.random() * icons.length)];
                          }
                          dispatch(
                            updateIcon({
                              id: currentCounter,
                              value: icon,
                            }),
                          );
                        }}
                        className="h-8 w-8 rounded-full bg-transparent text-center text-sm opacity-25 transition-opacity duration-500 ease-out hover:opacity-50"
                      >
                        ?
                      </button>
                    </li>
                    {icons.map((icon) => (
                      <li
                        key={icon}
                        className="relative flex items-center justify-center"
                      >
                        <motion.div
                          animate={
                            counters[currentCounter]?.icon === icon
                              ? "selected"
                              : "normal"
                          }
                          variants={{
                            selected: {
                              opacity: 1,
                            },
                            normal: {
                              opacity: 0,
                            },
                          }}
                          className="absolute h-10 w-10 rounded-full bg-white bg-opacity-5"
                        />
                        <button
                          onClick={() => {
                            dispatch(
                              updateIcon({
                                id: currentCounter,
                                value: icon,
                              }),
                            );
                          }}
                          className={`relative z-10 rounded-full text-2xl transition-opacity duration-500 ease-out hover:opacity-100 ${counters[currentCounter]?.icon === icon ? "opacity-100" : "opacity-50"}`}
                        >
                          {icon}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="flex select-none flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                    <label
                      onClick={() => {
                        dispatch(setSplitEnabled(!splitEnabled));
                        if (!splitEnabled) {
                          dispatch(setSplitCounter(null));
                          dispatch(setIsSplit(null));
                        }
                      }}
                      className="group inline-flex items-center gap-1.5 text-3xs font-normal uppercase transition-opacity duration-500 ease-out hover:opacity-50"
                    >
                      {splitEnabled ? (
                        <CheckmarkIcon className="h-4 w-4 text-green-700" />
                      ) : (
                        <CircleIcon className="h-4 w-4" />
                      )}
                      Enable Split mode
                      <span className="text-3xs font-normal uppercase opacity-50">
                        (Experimental)
                      </span>
                    </label>
                  </div>
                </section>
                <button
                  onClick={() => {
                    setShowDialog(true);
                    settingsRef.current!.scrollTo({ top: 0 });
                  }}
                  disabled={counters.length < 2}
                  className="mx-auto w-fit p-2 text-2xs uppercase text-red-700 transition-colors duration-500 ease-out hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Delete counter
                </button>
              </div>
              <section className="relative flex flex-col gap-4 text-white">
                <AnimatePresence>
                  {showDialog && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.3,
                      }}
                      className="fixed right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-8 bg-black px-4 text-center md:max-w-md"
                    >
                      <label className="select-none">
                        Are you sure you want to delete the counter?
                      </label>
                      <div className="flex gap-8">
                        <button
                          onClick={() => {
                            if (
                              isSplit &&
                              counters.length === 2
                              // || currentCounter === splitCounter
                            ) {
                              dispatch(setIsSplit(false));
                              dispatch(setSplitCounter(null));
                            } else if (
                              isSplit &&
                              splitCounter &&
                              splitCounter >= currentCounter
                            )
                              dispatch(setSplitCounter(splitCounter - 1));
                            dispatch(deleteCounter(currentCounter));
                            setShowDialog(false);
                            setIsOpen(false);
                          }}
                          className="select-none text-xs font-semibold uppercase text-red-700 transition-opacity duration-500 ease-out hover:opacity-75"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setShowDialog(false)}
                          className="select-none text-xs uppercase transition-opacity duration-500 ease-out hover:opacity-75"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
