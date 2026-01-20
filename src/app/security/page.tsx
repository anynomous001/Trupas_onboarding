import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Security() {
  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "We protect your data in transit and at rest using modern cryptography.",
      details: ["AES-256 at rest", "TLS 1.3 in transit", "Forward‑secure key rotation"]
    },
    {
      title: "Face Data Stays Local", 
      description: "Your biometric face data never leaves your device. We use advanced on-device processing to keep your identity secure.",
      details: ["On-device processing only", "No cloud storage of biometrics", "Complete privacy control"]
    },
    {
      title: "Instant Remote Lock",
      description: "Lost your phone? Lock your TruePas account instantly from any device to prevent unauthorized access.",
      details: ["Remote account lockdown", "Instant deactivation", "Multi-device protection"]
    }
  ]

  const complianceItems = [
    {
      title: "SOC 2 Type II Certified",
      description: "Independently audited security controls"
    },
    {
      title: "GDPR Compliant",
      description: "Full compliance with European privacy regulations"
    },
    {
      title: "CCPA Compliant", 
      description: "California Consumer Privacy Act adherence"
    },
    {
      title: "HIPAA Ready",
      description: "Healthcare-grade security standards"
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-950">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20 md:py-32 dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Enterprise-Grade Security
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8">
                Security You Can<br />
                <span className="text-blue-600">Trust</span>
              </h1>
              <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Your identity deserves the highest protection. We use modern, standards-based encryption and privacy-first design to keep you safe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/request-demo" 
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Request a Demo
                </Link>
                <Link 
                  href="#security-details" 
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section id="security-details" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                How We Protect You
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every layer of TruePas is designed with security and privacy as the foundation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all text-center dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center min-h-[320px]">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed dark:text-gray-300">
                    {feature.description}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Our Privacy Promise
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">You Control Your Data</h3>
                      <p className="text-gray-600">Delete your account and all data is permanently removed within 24 hours.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Transparent Operations</h3>
                      <p className="text-gray-600">Clear privacy policy with no hidden clauses or confusing legal language.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Minimal Data Collection</h3>
                      <p className="text-gray-600">We only collect what&rsquo;s absolutely necessary for the service to work.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Never Do</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Store biometric data in the cloud</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Share data with advertisers</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Track your location without permission</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Certified & Compliant
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We meet the highest industry standards for security and privacy protection.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {complianceItems.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center justify-center min-h-[180px]">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 dark:bg-green-900/30 dark:text-green-400">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-blue-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Modernize Your Check-ins?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience enterprise-grade security with TruePas. Request a demo to see how we protect your data.
            </p>
            <Link 
              href="/request-demo" 
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-3 shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Request a Demo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
