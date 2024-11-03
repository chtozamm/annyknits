"use client"

import {
  selectCounters,
  selectCurrentCounter,
} from "@/lib/redux/features/counters/countersSlice"
import { useAppSelector } from "@/lib/redux/hooks"
import { motion } from "framer-motion"

type BackgroundProps = { currentCounter: number; split?: boolean }

export default function Background({ currentCounter, split }: BackgroundProps) {
  // const currentCounter = useAppSelector(selectCurrentCounter);
  const counters = useAppSelector(selectCounters)
  if (!currentCounter && currentCounter !== 0) return
  return (
    <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 1, ease: "easeOut" }}
      // transition-colors duration-1000 ease-out
      className={`absolute inset-0 flex h-full w-full items-center justify-center ${`bg-${counters[currentCounter]?.theme}-primary`}`}
    ></div>
  )
}
