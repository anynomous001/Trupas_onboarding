'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a delay before revealing
            setTimeout(() => {
              entry.target.classList.add('reveal-visible')
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`reveal reveal-${direction} ${className}`}
    >
      {children}
    </div>
  )
}

