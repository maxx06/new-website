"use client"

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'slideUp' | 'slideInLeft' | 'slideInRight'
  delay?: number
}

export function ScrollReveal({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getAnimationClasses = () => {
    const baseClass = 'transition-all duration-700 ease-out'

    if (isVisible) {
      return `${baseClass} opacity-100 translate-x-0 translate-y-0`
    }

    const hiddenClass = {
      slideUp: 'opacity-0 translate-y-12',
      slideInLeft: 'opacity-0 -translate-x-12',
      slideInRight: 'opacity-0 translate-x-12'
    }[animation]

    return `${baseClass} ${hiddenClass}`
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  )
}
