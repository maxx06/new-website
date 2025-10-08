"use client"

import { useEffect, useState } from "react"

interface MeteorsProps {
  number?: number
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([])

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: Math.floor(Math.random() * 100) + "%",
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * 2 + "s",
      animationDuration: Math.floor(Math.random() * 6 + 4) + "s",
    }))
    setMeteorStyles(styles)
  }, [number])

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className="pointer-events-none absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-white/30 shadow-[0_0_0_1px_#ffffff05]"
          style={style}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[100px] -translate-y-1/2 bg-gradient-to-r from-white/30 to-transparent" />
        </span>
      ))}
    </>
  )
}
