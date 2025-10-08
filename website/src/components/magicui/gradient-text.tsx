"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GradientTextProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function GradientText({ children, delay = 0, className }: GradientTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.span>
  )
}
