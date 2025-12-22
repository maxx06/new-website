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
    // The SVG arrow's tip is at ~ (3, 3) in its 24x24 viewBox.
    // Use that as the cursor "hotspot" so it matches the OS cursor position.
    const hotspotOffsetX = 3
    const hotspotOffsetY = 3

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      const distX = mouseX - cursorX
      const distY = mouseY - cursorY

      cursorX += distX * 0.3
      cursorY += distY * 0.3

      // Use transform for smoother, subpixel-accurate positioning.
      cursor.style.transform = `translate3d(${cursorX - hotspotOffsetX}px, ${cursorY - hotspotOffsetY}px, 0)`

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
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block will-change-transform"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="black" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      </div>
    </>
  )
}
