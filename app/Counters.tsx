"use client"

import Counter from "./Counter"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectCounters,
  selectCurrentCounter,
  selectSplitCounter,
  setCounterState,
  setCurrentCounter,
  setSplitCounter,
} from "@/lib/redux/features/counters/countersSlice"
import { useEffect } from "react"
import {
  selectIsSplit,
  selectSplitEnabled,
  setIsSplit,
  setSplitEnabled,
} from "@/lib/redux/features/split/splitSlice"
import { presets } from "./data"

export default function Counters() {
  const dispatch = useAppDispatch()
  const counters = useAppSelector(selectCounters)
  const currentCounter = useAppSelector(selectCurrentCounter)
  const splitCounter = useAppSelector(selectSplitCounter)
  const splitEnabled = useAppSelector(selectSplitEnabled)
  const isSplit = useAppSelector(selectIsSplit)

  const defaultCounter = {
    value: 0,
    goal: null,
    ...presets[Math.floor(Math.random() * presets.length)],
  }

  if (!currentCounter && currentCounter !== 0) return
  return (
    <>
      <div className="flex h-full w-full flex-col md:flex-row">
        <Counter currentCounter={currentCounter} />
        {splitEnabled && splitCounter !== null && isSplit && (
          <Counter currentCounter={splitCounter} split />
        )}
      </div>
    </>
  )
}
