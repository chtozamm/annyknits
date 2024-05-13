"use client";

import {
  selectCounters,
  selectCurrentCounter,
} from "@/lib/redux/features/counters/countersSlice";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Background() {
  const currentCounter = useAppSelector(selectCurrentCounter);
  const counters = useAppSelector(selectCounters);
  return (
    <div
      className={`absolute left-0 top-0 min-h-screen w-screen ${`bg-${counters[currentCounter!]?.theme}-primary`}`}
    />
  );
}
