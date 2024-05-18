"use client";

import Counter from "./Counter";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectCounters,
  selectCurrentCounter,
  selectSplitCounter,
  setCounterState,
  setCurrentCounter,
  setSplitCounter,
} from "@/lib/redux/features/counters/countersSlice";
import { useEffect, useState } from "react";
import {
  selectIsSplit,
  setIsSplit,
} from "@/lib/redux/features/split/splitSlice";
import { presets } from "./data";

export default function Counters() {
  const dispatch = useAppDispatch();
  const counters = useAppSelector(selectCounters);
  const currentCounter = useAppSelector(selectCurrentCounter);
  const splitCounter = useAppSelector(selectSplitCounter);

  const defaultCounter = {
    value: 0,
    goal: null,
    ...presets[Math.floor(Math.random() * presets.length)],
    // name: "New counter",
    // theme: colors[Math.floor(Math.random() * colors.length)],
    // icon: icons[Math.floor(Math.random() * icons.length)],
  };

  // const [isSplit, setIsSplit] = useState(false);
  const isSplit = useAppSelector(selectIsSplit);

  // Initialize counters
  useEffect(() => {
    if (counters.length < 1) {
      dispatch(
        setCounterState(
          JSON.parse(String(localStorage.getItem("counters"))) || [
            defaultCounter,
          ],
        ),
      );
      dispatch(
        setCurrentCounter(Number(localStorage.getItem("current_counter")) || 0),
      );
      // dispatch(
      //   setSplitCounter(Number(localStorage.getItem("split_counter")) || 0),
      // );
      // dispatch(
      //   setIsSplit(localStorage.getItem("is_split") === "true" ? true : false),
      // );
      // dispatch(
      //   setSplitCounter(Number(localStorage.getItem("second_counter")) || 0),
      // );
    }
  }, []);

  // Local storage setters
  useEffect(() => {
    counters.length > 0 &&
      localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);
  useEffect(() => {
    if (currentCounter !== null) {
      localStorage.setItem("current_counter", currentCounter.toString());
    }
    // if (splitCounter !== null) {
    //   localStorage.setItem("split_counter", splitCounter.toString());
    // }
    // [currentCounter, splitCounter]
  }, [currentCounter]);

  if (currentCounter === null) return;
  return (
    <>
      {/* <button
        disabled={counters.length < 2}
        onClick={() => {
          if (splitCounter === null) {
            dispatch(setSplitCounter(0));
          }
          // setIsSplit(!isSplit);
          dispatch(setIsSplit(true));
        }}
        className="absolute right-16 top-8 z-10 text-2xs uppercase text-white opacity-50 transition-opacity duration-500 ease-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:opacity-25"
      >
        Split
      </button> */}
      <div className="flex h-full w-full flex-col md:flex-row">
        <Counter currentCounter={currentCounter} />
        {splitCounter !== null && isSplit && (
          <Counter currentCounter={splitCounter} split />
        )}
      </div>
    </>
  );
}
