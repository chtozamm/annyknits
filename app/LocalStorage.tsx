// Loads states from local storage and dispatches it to data store
"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectCounters,
  selectCurrentCounter,
  selectSplitCounter,
  setCounterState,
  setCurrentCounter,
  setSplitCounter,
} from "@/lib/redux/features/counters/countersSlice";
import {
  selectIsSplit,
  selectSplitEnabled,
  setIsSplit,
  setSplitEnabled,
} from "@/lib/redux/features/split/splitSlice";
import { presets } from "./data";

export default function LocalStorage() {
  const dispatch = useAppDispatch();
  const counters = useAppSelector(selectCounters);
  const currentCounter = useAppSelector(selectCurrentCounter);
  const splitCounter = useAppSelector(selectSplitCounter);
  const splitEnabled = useAppSelector(selectSplitEnabled);
  const isSplit = useAppSelector(selectIsSplit);

  const defaultCounter = {
    value: 0,
    goal: null,
    ...presets[Math.floor(Math.random() * presets.length)],
  };

  // Load values from local storage
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
      dispatch(
        setSplitCounter(Number(localStorage.getItem("split_counter")) || 0),
      );
      dispatch(setIsSplit(localStorage.getItem("is_split") === "true"));
      dispatch(
        setSplitEnabled(localStorage.getItem("split_support") === "true"),
      );
    }
  }, []);

  // Local storage setters
  useEffect(() => {
    counters.length > 0 &&
      localStorage.setItem("counters", JSON.stringify(counters));
    if (currentCounter !== null) {
      localStorage.setItem("current_counter", currentCounter.toString());
    }
    if (splitCounter !== null) {
      localStorage.setItem("split_counter", splitCounter.toString());
    }
    if (isSplit !== null) {
      localStorage.setItem("is_split", isSplit.toString());
    }
    if (splitEnabled !== null)
      localStorage.setItem("split_support", splitEnabled.toString());
    if (currentCounter && splitCounter && splitCounter === currentCounter) {
      if (currentCounter === counters.length - 1) {
        dispatch(setSplitCounter(currentCounter - 1));
      } else {
        dispatch(setSplitCounter(currentCounter + 1));
      }
    }
  }, [counters, currentCounter, splitCounter, isSplit, splitEnabled]);

  // useEffect(() => {
  // --- Theme
  // const theme = localStorage.getItem("theme");
  // theme && dispatch(setThemeState(theme));
  // --- Counters
  // const counters = localStorage.getItem("counters");
  // counters && dispatch(setCounterState(JSON.parse(counters)));
  // const currentCounter = localStorage.getItem("current_counter");
  // currentCounter && dispatch(setCurrentCounter(+currentCounter));
  // --- Settings
  // const volume = localStorage.getItem("volume");
  // volume && dispatch(setVolumeState(+volume));
  // const sfx = localStorage.getItem("sfx");
  // sfx && dispatch(setSfxState(sfx === "true" ? true : false));
  // }, []);
  return <></>;
}
