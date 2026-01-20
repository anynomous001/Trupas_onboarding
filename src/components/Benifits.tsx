export default function Benefits() {
  const highlights = [
    {
      title: "Meet TruePas",
      description: "Your face becomes your ID. No more forgotten documents, no more waiting in lines.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Bank-Level Security", 
      description: "AES-256 encryption keeps your data safe. Face scans never leave your device.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Works Everywhere",
      description: "Hotels, car rentals, events, healthcare - TruePas adapts to any industry.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  const useCases = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      title: "Airport Check-in",
      description: "Seamless and secure check-ins for flights and airport services.",
      benefits: ["Faster boarding", "Reduced queues", "Enhanced security"],
      color: "blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-4 4v8m-8-4h16" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7l2-4h10l2 4M5 7l2 14h10l2-14" />
        </svg>
      ),
      title: "Cruise check-in",
      description: "Streamline passenger embarkation with automated document and face verification.",
      benefits: ["Rapid boarding process", "Enhanced security", "Reduced wait times"],
      color: "purple"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Hotel and Resorts check-in",
      description: "Eliminate front desk queues and verify guests instantly with face recognition.",
      benefits: ["30-second check-ins", "No physical ID required", "24/7 automated service"],
      color: "blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      title: "Car Rental check-in",
      description: "Fast, secure vehicle pickup with biometric verification and license validation.",
      benefits: ["Skip the counter", "Instant driver verification", "Contactless process"],
      color: "green"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      title: "Theme Park check-in",
      description: "High-speed attendee verification for theme parks and attractions.",
      benefits: ["Prevent ticket fraud", "Crowd flow management", "VIP experience"],
      color: "orange"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m3-3H9" />
        </svg>
      ),
      title: "Healthcare Check-ins",
      description: "Secure patient verification and insurance processing for medical facilities.",
      benefits: ["HIPAA compliant", "Instant insurance validation", "Patient privacy focus"],
      color: "red"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800"
      },
      green: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800"
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800"
      },
      red: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
        border: "border-red-200 dark:border-red-800"
      },
      indigo: {
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        text: "text-indigo-600 dark:text-indigo-400",
        border: "border-indigo-200 dark:border-indigo-800"
      },
      orange: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-800"
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <>
      {/* Original Benefits Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-sm dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <span className="mr-2">✨</span> Why Choose TruePas
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">The Future of Unified Identity Verification</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-gray-300">
              Experience the next generation of check-in technology. TruePas combines cutting-edge AI with 
              enterprise-grade security to deliver verification that&rsquo;s both powerful and user-friendly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center min-h-[280px]"
              >
                <div className="w-14 h-14 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-xl mb-6 dark:bg-blue-500/10">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 text-center border border-blue-100 dark:from-slate-900 dark:to-purple-900/20 dark:border-slate-800">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
              Ready to Transform Your Check-ins?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-300">
              Join forward-thinking businesses that are already using TruePas to 
              eliminate queues, reduce fraud, and delight their customers.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Use Cases Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-sm dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <span className="mr-2">🎯</span> Built for Every Industry
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Transform Check-ins Across Any Business</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-gray-300">
              From hotels to healthcare, TruePas adapts to your unique verification needs. 
              Customize workflows, integrate with existing systems, and delight your customers.
            </p>
          </div>

          {/* Industry Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {useCases.map((useCase, index) => {
              const colors = getColorClasses(useCase.color)
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center min-h-[320px] group cursor-pointer"
                >
                  {/* Icon */}
                  <div className={`w-20 h-20 ${colors.bg} ${colors.text} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {useCase.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 dark:text-gray-300">
                    {useCase.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="space-y-2 mt-auto">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Customization CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100 dark:from-slate-900 dark:to-purple-900/20 dark:border-slate-800">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
                Your Industry, Your Solution
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-300">
                Don&rsquo;t see your industry listed? TruePas is fully customizable. 
                We tailor the verification process to match your specific business requirements.
              </p>
              <div className="mt-8">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center min-h-[320px] group cursor-pointer max-w-md mx-auto">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">
                    Your Usecase, Your Check-in Style
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 dark:text-gray-300">
                    We can modify our solution to fit your exact needs.
                  </p>
                  
                  {/* Benefits */}
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Custom workflows
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Industry-specific features
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Tailored verification process
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
