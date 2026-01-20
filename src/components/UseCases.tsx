'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const useCases = [
  {
    id: 'enterprise',
    label: 'Enterprise',
    title: 'Secure Access Control',
    subtitle: 'at Enterprise Scale',
    description: 'Manage thousands of employees across multiple locations with unified face-based authentication. Real-time tracking, instant alerts, and seamless integration with your existing systems ensure security without friction.',
    features: [
      { icon: '🏢', title: 'Multi-Location Support', desc: 'Synchronize data across all offices instantly, providing consistent access control regardless of facility size or geographic distribution.' },
      { icon: '📊', title: 'Advanced Analytics', desc: 'Track attendance patterns and gain operational insights through comprehensive reporting. Make data-driven decisions to optimize staffing and resource allocation.' },
      { icon: '🔐', title: 'Enterprise Security', desc: 'Bank-grade encryption and compliance with global security standards protect your organization and employee data at every touchpoint.' }
    ],
    testimonial: {
      company: 'TechCorp Global',
      logo: '🏢',
      stat: '45K+ employees',
      statDesc: 'checked in daily',
      quote: "TruePas reduced our check-in time by 85%. The ROI was immediate - we saved over $200K in the first quarter alone.",
      person: {
        name: 'Sarah Mitchell',
        role: 'Head of Operations',
        avatar: 'SM'
      }
    }
  },
  {
    id: 'events',
    label: 'Events & Venues',
    title: 'Lightning-Fast Check-ins',
    subtitle: 'for Any Event Size',
    description: 'Handle thousands of attendees without the queues. Pre-register guests, verify tickets instantly, and create memorable first impressions with seamless entry experiences.',
    features: [
      { icon: '⚡', title: 'Speed at Scale', desc: 'Process 1,000+ guests per hour' },
      { icon: '🎫', title: 'Ticket Verification', desc: 'Prevent fraud & duplicate entries' },
      { icon: '📸', title: 'Badge Printing', desc: 'Instant personalized badges' }
    ],
    testimonial: {
      company: 'Summit Events Co.',
      logo: '🎪',
      stat: '15K attendees',
      statDesc: 'checked in under 2 hours',
      quote: "We went from 45-minute queues to instant check-ins. Attendees loved it, and our staff could focus on experience, not logistics.",
      person: {
        name: 'Marcus Chen',
        role: 'Event Director',
        avatar: 'MC'
      }
    }
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    title: 'Seamless Guest Experience',
    subtitle: 'From Check-in to Check-out',
    description: 'Offer contactless check-ins, secure room access, and personalized guest services. Reduce front desk congestion while elevating the guest experience at every touchpoint.',
    features: [
      { icon: '🏨', title: 'Contactless Check-in', desc: 'Guests skip the front desk entirely' },
      { icon: '🔑', title: 'Digital Room Keys', desc: 'Face-based room access' },
      { icon: '⭐', title: 'VIP Recognition', desc: 'Auto-identify & greet loyal guests' }
    ],
    testimonial: {
      company: 'Grand Plaza Hotels',
      logo: '🏨',
      stat: '94% satisfaction',
      statDesc: 'from contactless guests',
      quote: "Our guests love skipping the check-in desk. We've seen a 30% increase in positive reviews mentioning our modern technology.",
      person: {
        name: 'Alexandra Park',
        role: 'Guest Experience Manager',
        avatar: 'AP'
      }
    }
  }
]

export default function UseCases() {
  const [activeTab, setActiveTab] = useState('enterprise')
  const activeCase = useCases.find(uc => uc.id === activeTab) || useCases[0]

  return (
    <section className="bg-white dark:bg-black py-20 md:py-28 relative overflow-hidden">
      {/* Subtle grid lines for consistency */}
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
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Solutions</span>
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent"> for </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">Every Industry.</span>
            <br />
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Powered</span>
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent"> by </span>
            
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">One Platform.</span>

          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar">
          <div className="inline-flex bg-gray-100/80 dark:bg-[#0f0f0f] border border-gray-300/50 dark:border-gray-900/50 rounded-full p-1.5 shadow-lg gap-1">
            {useCases.map((useCase) => (
              <button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === useCase.id
                    ? 'bg-[#007AFF] text-white shadow-lg shadow-[#007AFF]/25'
                    : 'text-gray-600 dark:text-gray-500 hover:text-[#007AFF] hover:bg-[#007AFF]/10'
                }`}
              >
                {useCase.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Content */}
        <div className="relative border-none" style={{ minHeight: '600px' }}>
          {/* Bluish aura glow effect - positioned on the right side of the card */}
          <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-gradient-to-l from-[#007AFF]/50 via-[#007AFF]/10 to-transparent blur-3xl pointer-events-none z-0 "></div>
          
          {/* Left Hero Card - spans 2 columns */}
          <div className="lg:col-span-2 bg-gray-50/80 dark:bg-[#0f0f0f] border-none rounded-3xl p-8 md:p-10 text-gray-900 dark:text-white relative overflow-hidden shadow-xl z-10">
            {/* Subtle bluish gradient from top-right corner merging with card color */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#007AFF]/40 via-blue-500/5 to-transparent rounded-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Logo/Brand */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-[#007AFF]/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#007AFF]/20">
                  <svg className="w-5 h-5 text-[#007AFF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <span className="font-semibold text-sm text-[#007AFF]">TruePas</span>
              </div>

              {/* Main Content */}
              <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">{activeCase.title}</span>
                <br />
                <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">{activeCase.subtitle}</span>
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl">
                {activeCase.description}
              </p>

              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 bg-[#007AFF] hover:bg-[#0051D5] text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-[#007AFF]/25 hover:shadow-[#007AFF]/40"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Feature Preview Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-10">
                {activeCase.features.map((feature, i) => (
                  <div key={i} className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-xl p-4">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <div className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">{feature.title}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Testimonial Card */}
          {/* <div className="bg-[#0f0f0f] border border-gray-900/50 rounded-3xl p-8 shadow-xl flex flex-col">
            
            <div className="mb-6">
              <div className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/10">
                {activeCase.testimonial.logo}
              </div>
            </div>

            
            <div className="mb-6">
              <div className="text-3xl md:text-4xl font-bold text-[#007AFF] mb-1">
                {activeCase.testimonial.stat}
              </div>
              <div className="text-white font-medium">
                {activeCase.testimonial.statDesc}
              </div>
            </div>

            <blockquote className="text-gray-400 leading-relaxed mb-6 flex-grow">
              "{activeCase.testimonial.quote}"
            </blockquote>

         
            <div className="flex items-center gap-3 pt-6 border-t border-gray-900/50">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold border border-white/10">
                {activeCase.testimonial.person.avatar}
              </div>
              <div>
                <div className="font-semibold text-white">
                  {activeCase.testimonial.person.name}
                </div>
                <div className="text-white text-sm">
                  {activeCase.testimonial.person.role}
                </div>
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  )
}

