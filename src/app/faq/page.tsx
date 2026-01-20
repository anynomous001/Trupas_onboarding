'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Is TruePas really free?",
      answer: "Yes, absolutely! TruePas is 100% free to download and use. No subscriptions, no hidden fees, no premium tiers. We believe identity verification should be accessible to everyone.",
      category: "pricing"
    },
    {
      question: "What happens if I lose my phone?",
      answer: "No worries! You can instantly lock your TruePas account from any device using our web portal. Your documents are securely backed up and encrypted. Once you get a new phone, simply download the app and log back in. You'll need to re-scan your face for security, but all your documents will be restored.",
      category: "security"
    },
    {
      question: "Where can I use TruePas?",
      answer: "TruePas is designed for businesses looking to streamline check-in processes including hotels, clinics, workplaces, and event venues. We provide API-first integrations that connect seamlessly with your existing systems.",
      category: "usage"
    },
    {
      question: "What types of documents can I store?",
      answer: "You can store driver's licenses, passports, state IDs, insurance cards, membership cards, vaccination records, and more. We support all major US document types and are expanding internationally.",
      category: "documents"
    },
    {
      question: "How accurate is face recognition?",
      answer: "Our face recognition technology delivers 99%+ accuracy and works in various lighting conditions, at angles, and with glasses or masks. It uses advanced AI with passive and active liveness detection to prevent spoofing. The system is designed to be both highly secure and user-friendly.",
      category: "technology"
    },
    {
      question: "Is my biometric data safe?",
      answer: "Absolutely. Your face scan data never leaves your device - it's processed locally using on-device AI. We only store an encrypted mathematical template, not your actual face image. Even if our servers were compromised, your biometric data would remain secure on your phone.",
      category: "security"
    },
    {
      question: "What if the face scan doesn't work?",
      answer: "If face recognition fails (poor lighting, technical issues), you can always fall back to showing your physical documents or use our backup PIN verification. We also provide 24/7 customer support to help resolve any technical issues.",
      category: "technology"
    },
    {
      question: "Do I need internet to verify my identity?",
      answer: "For most verifications, yes, you'll need an internet connection to confirm your identity with our secure servers. However, we're working on offline verification for certain use cases. Your documents are cached locally for quick access.",
      category: "technology"
    },
    {
      question: "How long does setup take?",
      answer: "Setup is incredibly fast! Download the app (30 seconds), create your account (1 minute), scan your face (30 seconds), and add your first document (1 minute). Total time: under 3 minutes to be fully set up.",
      category: "setup"
    },
    {
      question: "Can family members use the same account?",
      answer: "No, each person needs their own TruePas account for security reasons. However, parents can help set up accounts for children under 18. Each account is tied to one person's biometric data for maximum security.",
      category: "usage"
    },
    {
      question: "What about privacy? Do you sell my data?",
      answer: "Never. We have a strict no-data-selling policy. Your personal information is never shared with advertisers, marketers, or third parties. We're GDPR and CCPA compliant, and you can delete your account and all data at any time.",
      category: "privacy"
    },
    {
      question: "Is TruePas available internationally?",
      answer: "TruePas technology supports global document verification standards including government-certified documents and NIST-evaluated facial recognition. Our system is designed to handle international compliance requirements including GDPR and SOC2.",
      category: "usage"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'security', name: 'Security' },
    { id: 'usage', name: 'Usage' },
    { id: 'technology', name: 'Technology' },
    { id: 'privacy', name: 'Privacy' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Got Questions? We Have Answers
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8">
              Frequently Asked<br />
              <span className="text-blue-600">Questions</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Everything you need to know about TruePas, from security to setup to usage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/request-demo" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Request a Demo
              </Link>
              <Link 
                href="#faq-content" 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                Browse Questions
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section id="faq-content" className="py-20 md:py-32 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            {/* Category Filter */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-xl font-bold text-gray-900 pr-4">{faq.question}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        openIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        <span className="text-lg font-bold">{openIndex === index ? '−' : '+'}</span>
                      </div>
                    </button>
                    
                    {openIndex === index && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-lg text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our support team is here to help. Get answers within 24 hours.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600">support@truepas.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600">Available 9 AM - 6 PM EST</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Center</h3>
                <p className="text-gray-600">Detailed guides & tutorials</p>
              </div>
            </div>
            
            <Link 
              href="/request-demo" 
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-block shadow-lg"
            >
              Ready to Get Started?
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
