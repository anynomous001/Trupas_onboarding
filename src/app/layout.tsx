import './globals.css'
import { Oxygen, Open_Sans } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'

const oxygen = Oxygen({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-oxygen',
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-open-sans',
})

export const metadata = {
  title: 'TruePas - Your Face Is Your Passport',
  description: 'Verify your identity with just a face scan. No physical documents needed.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oxygen.variable} ${openSans.variable} antialiased min-h-screen bg-white text-slate-900 dark:bg-black dark:text-slate-100 transition-colors duration-200`} suppressHydrationWarning> 
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}