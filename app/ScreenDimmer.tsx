"use client"

import { AnimatePresence, AnimationProps, motion } from "framer-motion"

type ScreenDimmerType = {
  isShown: boolean
  opacity: number
  transition: AnimationProps["transition"]
}

export default function ScreenDimmer({
  isShown,
  opacity,
  transition,
}: ScreenDimmerType) {
  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className={`absolute inset-0 z-50 h-full w-full bg-black bg-opacity-${opacity} md:max-w-full`}
        />
      )}
    </AnimatePresence>
  )
}
