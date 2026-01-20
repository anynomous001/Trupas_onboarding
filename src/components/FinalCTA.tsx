import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          Ready to Modernize Your Check-ins?
        </h2>
        
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Request a demo or get integration details. Our team is ready to help you eliminate lines and reduce fraud.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            href="/request-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Request a Demo
          </Link>
          
          <Link 
            href="/security"
            className="border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Learn About Security
          </Link>
        </div>
      </div>
    </section>
  )
}
