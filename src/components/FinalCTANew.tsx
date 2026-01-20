'use client'

import { ShimmerButton } from "@/components/ui/shimmer-button"

export default function FinalCTANew() {
  return (
    <section className="bg-white dark:bg-black py-20 md:py-32 relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none opacity-40">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="w-px h-full bg-gradient-to-b from-gray-300/30 dark:from-gray-800/30 via-gray-200/10 dark:via-gray-800/10 to-transparent"
          ></div>
        ))}
      </div>

      {/* Large radial glow - hidden in light mode */}
      <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#007AFF]/5 rounded-full blur-[150px]"></div>
      
      {/* Gradient aura in the middle - hidden in light mode */}
      <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-bl from-[#007AFF]/30 via-[#007AFF]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Main CTA Headline */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Ready</span>
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent"> to </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">Eliminate</span>
            <br />
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Check-In </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">Bottlenecks?</span>
          </h2>
          <p className="font-tagline text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            See how TruePas works for venues like yours. Personalized demo. No commitment required.
          </p>
        </div>

        {/* ROI Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
            {/* Card 1: Accuracy Rate */}
            <div className="relative group">
             <div className="relative h-[80%] bg-gradient-to-br from-[#007AFF]/10 via-[#007AFF]/5 to-[#007AFF]/10 border-2 border-gray-200/50 dark:border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm overflow-hidden hover:border-[#007AFF]/50 hover:shadow-lg hover:shadow-[#007AFF]/20 transition-all duration-300 flex items-center justify-center">
                
                {/* Content */}
                <div className="relative z-10 text-center">
                <div className="text-3xl md:text-3xl font-bold mb-3 bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent">
                  99.8%
                </div>
                <p className="text-sm md:text-sm text-gray-700 dark:text-white/80 leading-relaxed">
                  accuracy rate in face matching, eliminating identity fraud and unauthorized access
                </p>
              </div>
            </div>
          </div>

            {/* Card 2: Time Saved */}
            <div className="relative group">
             <div className="relative h-[80%]  bg-gradient-to-br from-[#007AFF]/10 via-[#007AFF]/5 to-[#007AFF]/10 border-2 border-gray-200/50 dark:border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm overflow-hidden hover:border-[#007AFF]/50 hover:shadow-lg hover:shadow-[#007AFF]/20 transition-all duration-300 flex items-center justify-center">
                
                {/* Content */}
                <div className="relative z-10 text-center">
                <div className="text-3xl  md:text-3xl font-bold mb-3 bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent">
                  180+ hrs/year
                </div>
                <p className="text-sm md:text-sm text-gray-700 dark:text-white/80 leading-relaxed">
                  average time saved on manual check-ins and administrative tasks per location
                </p>
              </div>
            </div>
          </div>

            {/* Card 3: Check-in Time */}
            <div className="relative group">
             <div className="relative h-[80%] bg-gradient-to-br from-[#007AFF]/10 via-[#007AFF]/5 to-[#007AFF]/10 border-2 border-gray-200/50 dark:border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm overflow-hidden hover:border-[#007AFF]/50 hover:shadow-lg hover:shadow-[#007AFF]/20 transition-all duration-300 flex items-center justify-center">
                
                {/* Content */}
                <div className="relative z-10 text-center">
                <div className="text-3xl md:text-3xl font-bold mb-3 bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent">
                  &lt; 3 seconds
                </div>
                <p className="text-sm md:text-sm text-gray-700 dark:text-white/80 leading-relaxed">
                  average check-in time, reducing queues and improving guest experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center justify-center mb-12">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap pr-4 text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Get Started
            </span>
            <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </ShimmerButton>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>Proof of concept available</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>Deploy in weeks</span>
          </div>
        </div>
      </div>
    </section>
  )
}

