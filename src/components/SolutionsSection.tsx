'use client'

export default function SolutionsSection() {
  return (
    <section className="bg-white dark:bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Decorative grid */}
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
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">How </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">TruePas </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">Transforms</span>
            <br />
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Your </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">Operations</span>
          </h2>
          <p className="font-tagline text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Three key areas where face-based verification delivers immediate, measurable impact
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 - Security */}
          <div className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-900/50 hover:border-[#007AFF]/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-[#007AFF]/10 hover:shadow-xl relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-[#007AFF]/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 border border-[#007AFF]/20">
                <svg className="w-7 h-7 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              {/* Title with dot */}
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]"></span>
                <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Eliminate Identity Fraud</span>
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Stop buddy punching, fake IDs, and shared credentials. Our 99.8% accuracy rate catches what manual checks miss.
              </p>

              {/* Mini Stats */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Liveness detection blocks spoofing</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Real-time fraud alerts</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Audit trail for compliance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Efficiency */}
          <div className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-900/50 hover:border-[#007AFF]/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-[#007AFF]/10 hover:shadow-xl relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-[#007AFF]/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 border border-[#007AFF]/20">
                <svg className="w-7 h-7 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              {/* Title with dot */}
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]"></span>
                <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Save Time & Labor Costs</span>
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Reduce manual check-ins from minutes to seconds. Free your staff to focus on guest experience, not paperwork.
              </p>

              {/* Time saved visualization */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-600 dark:text-gray-400">Before TruePas</span>
                    <span className="text-gray-700 dark:text-gray-500">4-6 min/check-in</span>
                  </div>
                  <div className="h-2 bg-gray-200/50 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-400 dark:bg-gray-600 w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-800 dark:text-gray-300">With TruePas</span>
                    <span className="text-[#007AFF] font-semibold">&lt;3 seconds</span>
                  </div>
                  <div className="h-2 bg-gray-200/50 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#007AFF] w-[15%]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#007AFF] mb-1">85% faster</div>
                  <div className="text-xs text-gray-600 dark:text-gray-500">Average time reduction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - ROI */}
          <div className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-900/50 hover:border-[#007AFF]/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-[#007AFF]/10 hover:shadow-xl relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-[#007AFF]/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 border border-[#007AFF]/20">
                <svg className="w-7 h-7 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>

              {/* Title with dot */}
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]"></span>
                <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">See Immediate ROI</span>
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Most customers break even within 90 days. Reduce labor costs, eliminate fraud losses, and improve throughput.
              </p>

              {/* ROI Graph Visualization */}
              <div className="bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-white/10 mb-6">
                <div className="flex items-end justify-between h-24 gap-2">
                  {[30, 50, 70, 90, 100].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gradient-to-t from-[#007AFF] to-[#007AFF]/40 rounded-t" style={{ height: `${height}%` }}></div>
                      <span className="text-[10px] text-gray-500">M{i + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-white/10 text-center">
                  <div className="text-lg font-bold text-[#007AFF] mb-1">$180K saved</div>
                  <div className="text-xs text-gray-600 dark:text-gray-500">Average first-year savings per location</div>
                </div>
              </div>

              {/* CTA link */}
              <a href="#roi" className="inline-flex items-center gap-2 text-sm text-[#007AFF] hover:text-[#0051D5] transition-colors group">
                <span>See detailed ROI calculator</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

