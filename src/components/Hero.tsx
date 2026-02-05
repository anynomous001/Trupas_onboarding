import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Animated smoke/fog layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Smoke layer 1 - slow drift */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/3 blur-3xl animate-smoke-drift-slow"></div>
        </div>

        {/* Smoke layer 2 - medium speed */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-0 w-[80%] h-[80%] bg-gradient-to-tl from-white/4 via-transparent to-white/2 blur-3xl animate-smoke-drift-medium"></div>
        </div>

        {/* Smoke layer 3 - fast drift */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute bottom-0 left-10 w-[90%] h-[70%] bg-gradient-to-tr from-white/3 via-white/1 to-transparent blur-3xl animate-smoke-drift-fast"></div>
        </div>

        {/* Smoke layer 4 - floating up */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute bottom-0 left-1/4 w-[60%] h-full bg-gradient-to-t from-white/4 via-white/2 to-transparent blur-3xl animate-smoke-rise"></div>
        </div>
      </div>

      {/* Spotlight dome effect at top - seamlessly blended */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[600px] pointer-events-none">
        {/* Outer atmospheric glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200/15 dark:from-gray-700/15 via-gray-100/8 dark:via-gray-800/8 to-transparent rounded-b-[100%] blur-3xl"></div>
        {/* Middle layer - softer blend */}
        <div className="absolute inset-x-[8%] top-0 h-[450px] bg-gradient-to-b from-gray-300/12 dark:from-gray-600/12 via-gray-200/6 dark:via-gray-700/6 to-transparent rounded-b-[100%] blur-2xl"></div>
        {/* Inner dome - no border, pure gradient */}
        <div className="absolute inset-x-[12%] top-0 h-[400px] bg-gradient-to-b from-gray-300/10 dark:from-gray-600/10 via-gray-200/5 dark:via-gray-700/5 to-transparent rounded-b-[100%] blur-xl"></div>
        {/* Center highlight - brightest spot */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[300px] bg-gradient-to-b from-gray-400/15 dark:from-gray-500/15 via-gray-300/8 dark:via-gray-600/8 to-transparent rounded-b-[100%] blur-2xl"></div>
        {/* Subtle center glow with brand color hint */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[200px] bg-gradient-to-b from-[#007AFF]/8 via-gray-900/3 dark:via-white/3 to-transparent rounded-b-[100%] blur-3xl"></div>
      </div>

      {/* Vertical grid lines */}
      <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-px h-full bg-gradient-to-b from-gray-300/40 dark:from-gray-700/40 via-gray-200/20 dark:via-gray-800/20 to-transparent"
          ></div>
        ))}
      </div>

      {/* Floating animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side particles - animated */}
        <div className="absolute top-[20%] left-[8%] w-1.5 h-1.5 bg-[#007AFF]/40 rounded-full animate-float-slow"></div>
        <div className="absolute top-[35%] left-[5%] w-1 h-1 bg-white/60 rounded-full animate-float-medium"></div>
        <div className="absolute top-[50%] left-[12%] w-1 h-1 bg-[#007AFF]/30 rounded-full animate-float-fast"></div>
        <div className="absolute top-[65%] left-[7%] w-1.5 h-1.5 bg-white/50 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[80%] left-[15%] w-1 h-1 bg-[#007AFF]/40 rounded-full animate-float-medium" style={{ animationDelay: '1s' }}></div>

        {/* Right side particles - animated */}
        <div className="absolute top-[25%] right-[10%] w-1 h-1 bg-white/50 rounded-full animate-float-fast" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] right-[6%] w-1.5 h-1.5 bg-[#007AFF]/40 rounded-full animate-float-slow" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[55%] right-[14%] w-1 h-1 bg-white/60 rounded-full animate-float-medium" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute top-[70%] right-[8%] w-1 h-1 bg-[#007AFF]/30 rounded-full animate-float-fast"></div>

        {/* Center scattered particles - animated */}
        <div className="absolute top-[30%] left-[25%] w-1 h-1 bg-white/40 rounded-full animate-float-medium" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[45%] right-[30%] w-1 h-1 bg-[#007AFF]/50 rounded-full animate-float-slow" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-[60%] left-[35%] w-1 h-1 bg-white/35 rounded-full animate-float-fast" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-[75%] right-[25%] w-1.5 h-1.5 bg-[#007AFF]/45 rounded-full animate-float-medium" style={{ animationDelay: '2.2s' }}></div>

        {/* Additional pulsing elements */}
        <div className="absolute top-[15%] left-[40%] w-2 h-2 bg-[#007AFF]/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-[85%] right-[40%] w-2 h-2 bg-white/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main content - Centered single column layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">

        {/* Pill badge */}
        {/* <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-[#0077b6]/30 text-white px-5 py-2 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-[#0077b6] rounded-full mr-2.5 animate-pulse"></span>
          Face Recognition Experts
        </div> */}

        {/* Main headline with mixed styling and gradient */}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.15]">
          <span className="block mb-2 whitespace-nowrap">
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">3-Second</span>
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent"> Check-Ins. </span>
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Zero Fraud.</span>
          </span>
          <span className="block whitespace-nowrap">
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">One Platform.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-tagline text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
          Automated face verification that eliminates queues, stops fraud, and processes guests in under 3 seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="demo"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
          >
            Get Started
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold transition-all text-base min-w-[180px]"
          >
            Contact Us
          </Link> */}
        </div>

      </div>
    </section>
  )
}
