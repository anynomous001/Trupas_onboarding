'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'
import { useOnboardingStore } from '@/stores/onboardingStore'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Auth state from store
  const accessToken = useOnboardingStore((state) => state.accessToken)
  const reset = useOnboardingStore((state) => state.reset)
  const isLoggedIn = !!accessToken

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Show navbar when scrolled more than 50px
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    reset()
    router.push(ROUTES.HOME)
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`bg-white/70 backdrop-blur border-b border-gray-200 fixed top-0 left-0 right-0 z-50 dark:bg-slate-950/70 dark:border-slate-800 transition-all duration-300 ${isScrolled
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/TruePaslogo.png"
              alt="TruePas Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <div className="relative w-[115px] h-[36px]">
              <Image
                src="/TruePasLogoWord.png"
                alt="TruePas"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">
              How It Works
            </Link>
            <Link href="/security" className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">
              Security
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">
              FAQ
            </Link>
            {/* Theme toggle */}
            {mounted && (
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme((resolvedTheme === 'dark' ? 'light' : 'dark'))}
                className="rounded-full p-2 border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                {resolvedTheme === 'dark' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-10.45-10.5 1 1 0 0 0-1.17-1.35A10 10 0 1 0 22 14.22a1 1 0 0 0-.36-1.22z" /></svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 10.45l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 4V1h-1v3h1zm0 19v-3h-1v3h1zm8-8h3v-1h-3v1zM1 12H4v-1H1v1zm2.34 6.66l1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8zM17.66 5.34l1.41-1.41-1.79-1.8-1.42 1.42 1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>
                )}
              </button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  href={ROUTES.REVIEW}
                  className="text-gray-700 hover:text-blue-600 font-bold transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Application Status
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-600 px-6 py-2 rounded-full font-bold transition-all"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                href={'demo'}
                className="group inline-flex items-center justify-center gap-2 bg-[#007AFF] hover:bg-[#0051D5] text-white px-8 py-4 rounded-full font-semibold transition-all text-base shadow-lg shadow-[#007AFF]/25 hover:shadow-[#007AFF]/40 min-w-[180px]"
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
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4 border-t border-gray-200 pt-4 dark:border-slate-800">
            <Link href="/#features" className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link href="/#how-it-works" className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="/security" className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>
              Security
            </Link>
            <Link href="/faq" className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href={ROUTES.REVIEW}
                  className="block py-2 text-blue-600 font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Application Status
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 font-bold"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href={'demo'}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}