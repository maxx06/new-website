"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface ScrollCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  className?: string
}

export function ScrollCarousel({ images, className = "" }: ScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height
      
      // Check if element is in viewport
      const inView = rect.top < windowHeight && rect.bottom > 0
      setIsInView(inView)
      
      // Calculate scroll progress (0 to 1) with faster scroll sensitivity
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + elementHeight * 0.3)
      ))
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate horizontal scroll position
  const totalImages = images.length
  const imageWidth = 380 + 2 // Image width + margin
  const maxScroll = (totalImages - 3) * imageWidth // Total scrollable distance
  const currentScroll = scrollProgress * maxScroll

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div 
        className="flex items-center min-h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentScroll}px)`
        }}
      >
        {images.map((image, index) => {
          const imagePosition = index * imageWidth
          const isInView = imagePosition >= currentScroll - imageWidth && imagePosition <= currentScroll + (3 * imageWidth)
          
          return (
            <div
              key={index}
              className="flex-shrink-0 transition-opacity duration-500 ease-out"
              style={{
                width: '380px',
                height: '240px',
                marginRight: '2px',
                opacity: isInView ? 1 : 0.3
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Enhanced progress indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-3 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
          {Array.from({ length: totalImages }).map((_, index) => {
            const imagePosition = index * imageWidth
            const isInView = imagePosition >= currentScroll - imageWidth && imagePosition <= currentScroll + (3 * imageWidth)
            return (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  isInView
                    ? 'bg-primary scale-125 shadow-lg shadow-primary/50'
                    : 'bg-muted-foreground/40'
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* Scroll hint */}
      {scrollProgress < 0.1 && (
        <div className="absolute top-4 right-4 animate-bounce">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border/50">
            <span>Scroll to explore</span>
            <div className="w-4 h-4 border-r-2 border-b-2 border-primary transform rotate-45" />
          </div>
        </div>
      )}
    </div>
  )
}