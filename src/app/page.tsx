import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SolutionsSection from '@/components/SolutionsSection'
import UseCases from '@/components/UseCases'
import HowItWorksNew from '@/components/HowItWorksNew'
import SecuritySection from '@/components/SecuritySection'
import FAQSection from '@/components/FAQSection'
import FinalCTANew from '@/components/FinalCTANew'
import ScrollReveal from '@/components/ScrollReveal'
import {HowItWorks} from '@/components/HowItWork'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        
        <ScrollReveal delay={100}>
          <ProblemSection />
        </ScrollReveal>
        
        
        <ScrollReveal delay={100}>
          <UseCases />
        </ScrollReveal>
        
        <HowItWorks />
        
        <ScrollReveal delay={100}>
          <SecuritySection />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <FAQSection />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <FinalCTANew />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  )
}