// Data initializer
"use client";

import {
  setCounterState,
  setCurrentCounter,
} from "@/lib/redux/features/counters/countersSlice";
import {
  setSfxState,
  setShowLabelState,
  setVolumeState,
} from "@/lib/redux/features/settings/settingsSlice";
import { setThemeState } from "@/lib/redux/features/theme/themeSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useEffect } from "react";

export default function LocalStorage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Theme
    // const theme = localStorage.getItem("theme");
    // theme && dispatch(setThemeState(theme));

    // Counters
    // const counters = localStorage.getItem("counters");
    // counters && dispatch(setCounterState(JSON.parse(counters)));
    // const currentCounter = localStorage.getItem("current_counter");
    // currentCounter && dispatch(setCurrentCounter(+currentCounter));

    // Settings
    const showLabel = localStorage.getItem("show_label");
    showLabel &&
      dispatch(setShowLabelState(showLabel === "true" ? true : false));
    const volume = localStorage.getItem("volume");
    volume && dispatch(setVolumeState(+volume));
    const sfx = localStorage.getItem("sfx");
    sfx && dispatch(setSfxState(sfx === "true" ? true : false));
  }, []);
  return <></>;
}
