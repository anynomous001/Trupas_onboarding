'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function HowItWorksNew() {
  const steps = [
    {
      number: '01',
      title: 'Automatic Face Capture',
      subtitle: 'Guest Approaches TruePas Kiosk',
      description: 'Guest steps up to your TruePas Kiosk. AI-powered cameras instantly detect and capture their face in under 1 second—no staff intervention, no physical contact required.',
      image: '/TruePas1stStep.png',
    },
    {
      number: '02',
      title: 'Identity Verified within Seconds',
      subtitle: 'Real-Time Verification',
      description: 'Our system performs four checks (face match against secure biometrics, document validation, access confirmation, and age check) in under 3 seconds.',
      image: '/TruePas2ndStep.png',
    },
    {
      number: '03',
      title: 'Seamless Entry & Complete Visibility',
      subtitle: 'Access Granted & Logged',
      description: 'Automatic access. Gates and turnstiles open, or staff are instantly notified. Track every transaction live on your dashboard with a complete audit trail.',
      image: '/TruePas3rdStep.png',
    }
  ]

  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const lastActiveStepRef = useRef(0)
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Ensure section is visible on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const contentWrapper = contentWrapperRef.current
    if (!section || !contentWrapper) return

    const handleScroll = () => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollPosition = window.scrollY
      const sectionBottom = sectionTop + sectionHeight

      // Check if we've scrolled well past the section completely (after all steps)
      if (scrollPosition > sectionBottom + 300) {
        setIsVisible(false)
        return
      }

      // Section should be visible if we're anywhere near it or before it
      const isBeforeSection = scrollPosition + viewportHeight < sectionTop
      const isInSection = scrollPosition + viewportHeight >= sectionTop && scrollPosition <= sectionBottom
      const isJustAfterSection = scrollPosition <= sectionBottom + 300
      
      if (isBeforeSection || isInSection || isJustAfterSection) {
        setIsVisible(true)
      }

      // Fallback: Calculate active step based on scroll position
      if (isInSection) {
        const relativeScroll = scrollPosition + viewportHeight / 2 - sectionTop
        const stepHeight = sectionHeight / steps.length
        let newActiveStep = Math.floor(relativeScroll / stepHeight)
        newActiveStep = Math.max(0, Math.min(newActiveStep, steps.length - 1))

        if (newActiveStep !== lastActiveStepRef.current) {
          if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current)
          }
          transitionTimeoutRef.current = setTimeout(() => {
            setActiveStep(newActiveStep)
            lastActiveStepRef.current = newActiveStep
          }, 100)
        }
      }
    }

    // Use IntersectionObserver for precise step detection
    let observers: IntersectionObserver[] = []
    
    const setupObservers = () => {
      observers = stepRefs.current
        .map((ref, index) => {
          if (!ref) return null

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                  if (transitionTimeoutRef.current) {
                    clearTimeout(transitionTimeoutRef.current)
                  }
                  
                  if (index !== lastActiveStepRef.current) {
                    transitionTimeoutRef.current = setTimeout(() => {
                      setActiveStep(index)
                      lastActiveStepRef.current = index
                    }, 100)
                  }
                }
              })
            },
            {
              threshold: [0, 0.2, 0.3, 0.4, 0.5],
              rootMargin: '-20% 0px -20% 0px'
            }
          )

          observer.observe(ref)
          return observer
        })
        .filter((obs): obs is IntersectionObserver => obs !== null)
    }

    // Setup observers after a delay to ensure refs are ready
    const timeoutId = setTimeout(() => {
      handleScroll() // Initial check
      setupObservers()
    }, 200)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      observers.forEach((observer) => observer.disconnect())
    }
  }, [steps.length])

  if (!isVisible) {
    return null
  }

  return (
    <section 
      ref={sectionRef}
      className="bg-white dark:bg-[#0a0a0a] py-20 md:py-32 relative"
      style={{ minHeight: `${steps.length * 40}vh` }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none opacity-40">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="w-px h-full bg-gradient-to-b from-gray-300/30 dark:from-gray-800/30 via-gray-200/10 dark:via-gray-800/10 to-transparent"
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gray-100/80 dark:bg-[#1a1a1a] border border-gray-300/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#007AFF]/60 dark:bg-white/60 rounded-full mr-2.5 animate-pulse"></span>
            Simple. Secure. Lightning Fast.
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent">How It </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">works</span>
            <br />
            <span className="bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent">Three </span>
            <span className="bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent">Steps</span>
            <span className="bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent"> to </span>
            <span className="bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent">Seamless</span>
            <span className="bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent"> Check-in</span>
          </h2>
          
        
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Sticky Navigation Points */}
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:self-start">
            <div className="w-full space-y-8">
          {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ease-out ${
                    activeStep === index
                      ? 'opacity-100 scale-105'
                      : 'opacity-40 scale-100'
                  }`}
                  style={{
                    willChange: 'opacity, transform',
                  }}
                >
                  {/* Active indicator line */}
                  {activeStep === index && (
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#007AFF] to-[#007AFF] rounded-full"></div>
                  )}

                  {/* Step Number Circle */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 flex-shrink-0 ${
                        activeStep === index
                          ? 'bg-gradient-to-br from-[#007AFF] to-[#007AFF] text-white shadow-lg shadow-[#007AFF]/30 scale-110'
                          : 'bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-500 border border-gray-300/50 dark:border-white/10'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Step Title */}
                    <div className="flex-1 pt-2">
                      <h3
                        className={`text-2xl md:text-3xl font-bold mb-2 transition-all duration-500 ${
                          activeStep === index
                            ? 'bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent'
                            : 'text-gray-600 dark:text-gray-500'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-base transition-all duration-500 ${
                          activeStep === index ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-600'
                        }`}
                      >
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
                    </div>
                  </div>

          {/* Right Side - Scrollable Content */}
          <div ref={contentWrapperRef} className="relative">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el
                }}
                className="min-h-[60vh] flex flex-col justify-center py-20"
                style={{
                  position: 'relative',
                  opacity: activeStep === index ? 1 : 0,
                  transform: activeStep === index ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: activeStep === index ? 'auto' : 'none',
                  visibility: activeStep === index ? 'visible' : 'hidden',
                  willChange: 'opacity, transform',
                }}
              >
                  {/* Description */}
                <div className="mb-8">
                  <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Image Container */}
                  <div className="relative group">
                    {/* Glow effect behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/20 via-transparent to-transparent opacity-30 rounded-3xl blur-3xl group-hover:opacity-50 transition-opacity"></div>
                    
                    {/* Image container with glassmorphism */}
                    <div className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-white/10 shadow-2xl">
                      {/* Decorative corner accents */}
                    <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#007AFF] rounded-tr-lg"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#007AFF] rounded-bl-lg"></div>
                      
                      {/* Image */}
                      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-[#0f0f0f] rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/5">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Status indicator */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-white/10">
                        <div className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></div>
                          <span className="text-gray-900 dark:text-white text-xs font-medium">Processing...</span>
                        </div>
                      </div>

                      {/* Time indicator */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-500 text-sm">Step {step.number}</span>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">~1 second</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
