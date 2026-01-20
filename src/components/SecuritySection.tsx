'use client'

export default function SecuritySection() {
  const securityFeatures = [
    {
      title: 'Data Security',
      icon: (
        <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 100 100" strokeWidth="0.5">
          {/* Geometric cube/box icon - Layered security blocks */}
          <rect x="25" y="35" width="20" height="20" />
          <rect x="55" y="35" width="20" height="20" />
          <rect x="25" y="65" width="20" height="20" />
          <rect x="55" y="65" width="20" height="20" />
          <rect x="40" y="20" width="20" height="20" />
          <rect x="40" y="50" width="20" height="20" />
          <line x1="40" y1="35" x2="25" y2="42" />
          <line x1="60" y1="35" x2="75" y2="42" />
          <line x1="40" y1="65" x2="25" y2="72" />
          <line x1="60" y1="65" x2="75" y2="72" />
          <line x1="50" y1="40" x2="50" y2="50" />
          <line x1="50" y1="70" x2="50" y2="80" />
        </svg>
      ),
      description: 'Your data stays protected with bank-grade encryption, regular audits, and compliance with GDPR and SOC 2.'
    },
    {
      title: 'Account Protection',
      icon: (
        <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 100 100" strokeWidth="0.5">
          {/* Shield with verification checkmark icon */}
          <path d="M 50 20 L 30 30 L 30 50 Q 30 60 35 70 Q 40 80 50 85 Q 60 80 65 70 Q 70 60 70 50 L 70 30 Z" />
          <path d="M 45 50 L 50 55 L 60 40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      description: 'Real-time anomaly detection with automated threat response and role-based access controls.'
    },
    {
      title: 'Multi-Factor Authentication',
      icon: (
        <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 100 100" strokeWidth="0.5">
          {/* Circular authentication flow icon */}
          <circle cx="50" cy="50" r="15" />
          <circle cx="50" cy="50" r="25" />
          <circle cx="50" cy="50" r="35" />
          <line x1="50" y1="15" x2="50" y2="25" />
          <line x1="50" y1="75" x2="50" y2="85" />
          <line x1="15" y1="50" x2="25" y2="50" />
          <line x1="75" y1="50" x2="85" y2="50" />
          <path d="M 50 35 L 55 40 L 65 30" strokeWidth="1" />
        </svg>
      ),
      description: 'Every account requires secondary verification, eliminating 99.9% of unauthorized access attempts.'
    },
    {
      title: '24/7 Support',
      icon: (
        <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 100 100" strokeWidth="0.5">
          {/* Support personnel icon */}
          <circle cx="50" cy="40" r="12" />
          <path d="M 30 70 Q 30 60 40 60 L 60 60 Q 70 60 70 70 L 70 85" />
          <circle cx="35" cy="35" r="2" fill="currentColor" />
          <circle cx="65" cy="35" r="2" fill="currentColor" />
          <path d="M 40 50 Q 50 55 60 50" />
        </svg>
      ),
      description: 'Direct access to security specialists and technical support with guaranteed 15-minute response times.'
    }
  ]

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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header - Robinhood Style */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">TruePas </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">Protection</span>
            <br />
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">Guaranteed.</span>
          </h2>
        </div>

        {/* Security Grid - 2x2 Layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-x-24 md:gap-y-20 max-w-5xl mx-auto mb-20">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="text-center"
            >
              {/* Line-art Icon */}
              <div className="text-[#007AFF] mb-6">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="font-tagline text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-light max-w-sm mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance Badges */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-16 mb-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* GDPR Compliance */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4 border border-green-500/20">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-heading text-gray-900 dark:text-white font-semibold mb-1">GDPR Compliant</h4>
              <p className="font-tagline text-gray-600 dark:text-gray-500 text-sm">Reg. No: EU-GDPR-2024-7845</p>
            </div>

            {/* SOC 2 Certification */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4 border border-green-500/20">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-heading text-gray-900 dark:text-white font-semibold mb-1">SOC 2 Type II</h4>
              <p className="font-tagline text-gray-600 dark:text-gray-500 text-sm">Cert. No: SOC2-TP-2024-1923</p>
            </div>

            {/* ISO Certification */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4 border border-green-500/20">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-heading text-gray-900 dark:text-white font-semibold mb-1">ISO 27001:2022</h4>
              <p className="font-tagline text-gray-600 dark:text-gray-500 text-sm">Cert. No: ISO-27001-TP-5678</p>
            </div>
          </div>
        </div>

        {/* Learn More Button - At Bottom */}
        <div className="text-center mt-12">
          <button className="font-tagline px-8 py-3.5 border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-600 dark:hover:text-green-400 transition-all font-normal text-sm tracking-wide">
            Learn more about our commitments
          </button>
        </div>
      </div>
    </section>
  )
}

