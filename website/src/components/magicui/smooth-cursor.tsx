"use client"

import { useEffect, useRef } from "react"

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      const distX = mouseX - cursorX
      const distY = mouseY - cursorY

      cursorX += distX * 0.3
      cursorY += distY * 0.3

      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Smooth cursor arrow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="black" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      </div>
    </>
  )
}
