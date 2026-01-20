'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "How accurate is TruePas face recognition?",
    answer: "TruePas achieves 99.8% accuracy in real-world conditions. Our system uses advanced AI models that perform reliably across different lighting, angles, and even with glasses or masks."
  },
  {
    question: "What happens if someone tries to use a photo or video of another person?",
    answer: "Our passive and active liveness detection technology prevents spoofing attempts using photos, videos, masks, or deepfakes. The system analyzes micro-movements and textures that can't be faked."
  },
  {
    question: "How long does implementation take?",
    answer: "Most customers go live within 2-4 weeks. This includes integration with your existing systems, staff training, and a phased rollout to ensure smooth adoption."
  },
  {
    question: "Does TruePas work offline?",
    answer: "Yes! TruePas can operate in offline mode with local verification. Data syncs automatically when connectivity is restored, ensuring uninterrupted service."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. Biometric data is processed on-device and never stored in raw form. All transmitted data uses AES-256 encryption. We're SOC 2 and GDPR compliant."
  },
  {
    question: "Can users opt out of face-based verification?",
    answer: "Yes. While face-based verification is the fastest option, we offer fallback methods like QR codes or manual verification to accommodate user preferences and edge cases."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-white dark:bg-black py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Common </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">Questions</span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[450px_1fr] gap-8 lg:gap-12 items-start">
          {/* Left side - CTA Card */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-gray-50/80 dark:bg-[#1a1a1a] border border-gray-200/50 dark:border-gray-800 hover:border-[#007AFF]/30 rounded-3xl p-8 transition-all duration-300">
              {/* Icon */}
              <div className="w-14 h-14 bg-[#007AFF]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#007AFF]/20">
                <svg className="w-7 h-7 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>

              {/* Heading */}
              <h3 className="font-heading font-normal text-gray-900 dark:text-white text-2xl mb-3">
                Prefer to talk?
              </h3>

              {/* Description */}
              <p className="font-tagline text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
                Schedule a 20-minute discovery call. No obligation.
              </p>

              {/* Button */}
              <button className="font-heading w-full px-8 py-3.5 bg-[#007AFF] text-white rounded-full hover:bg-[#0051D5] transition-all font-normal text-base flex items-center justify-center gap-2 shadow-lg shadow-[#007AFF]/25">
                Schedule Call
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right side - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-50/80 dark:bg-[#1a1a1a] border rounded-2xl transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'border-[#007AFF]/30' : 'border-gray-200/50 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-heading font-normal text-gray-900 dark:text-white text-base">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                      openIndex === index ? 'rotate-180 text-[#007AFF]' : 'text-gray-600 dark:text-gray-400'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`font-tagline px-6 pb-5 text-gray-600 dark:text-gray-400 text-base leading-relaxed border-t pt-4 ${
                    openIndex === index ? 'border-[#007AFF]/20' : 'border-gray-200 dark:border-gray-800'
                  }`}>
                    {faq.answer}
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

