import { AnimationProps } from "framer-motion"
export const pageTransition: AnimationProps["transition"] = {
  // type: "spring",
  // damping: 22,
  // stiffness: 125,

  // type: "tween",
  // ease: "easeOut",
  // duration: 0.3,

  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
}
