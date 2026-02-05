'use client';

import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/animations/FadeIn';
import { FileText, Scan, Link2, Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    number: 1,
    icon: FileText,
    title: 'Automatic Face Capture',
    description: 'Download the app and provide basic information such as your address and upload your government ID.',
    details: 'Guest steps up to your TruePas Kiosk. AI-powered cameras instantly detect and capture their face in under 1 second—no staff intervention, no physical contact required.',
    gradient: 'from-blue-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&fit=crop&q=80',
  },
  {
    number: 2,
    icon: Scan,
    title: 'Identity Verified within Seconds',
    description: 'Our AI captures your biometric data securely with liveness detection to ensure you\'re a real person.',
    details: 'Our system performs four checks (face match against secure biometrics, document validation, access confirmation, and age check) in under 3 seconds.Our system performs four checks (face match against secure biometrics, document validation, access confirmation, and age check) in under 3 seconds.',
    gradient: 'from-purple-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&q=80',
  },
  {
    number: 3,
    icon: Link2,
    title: 'Seamless Entry & Complete Visibility',
    description: 'Connect your theme park passes, cruise reservations, car rentals, or hotel bookings to your account.',
    details: 'Automatic access. Gates and turnstiles open, or staff are instantly notified. Track every transaction live on your dashboard with a complete audit trail.',
    gradient: 'from-emerald-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const activeStepRef = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Intersection Observer for section entry/exit
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionActive(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    sectionObserver.observe(section);

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  // Separate effect for step observers - runs after refs are populated
  useEffect(() => {
    const stepObservers: IntersectionObserver[] = [];

    // Wait for refs to be populated using requestAnimationFrame
    const rafId = requestAnimationFrame(() => {
      // Set up observers for each step element
      stepRefs.current.forEach((stepElement, index) => {
        if (!stepElement) return;

        const stepObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // When step is at least 40% visible, make it active
              if (entry.intersectionRatio >= 0.4) {
                if (activeStepRef.current !== index) {
                  setActiveStep(index);
                }
              }
            });
          },
          {
            threshold: [0, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            rootMargin: '0px'
          }
        );

        stepObserver.observe(stepElement);
        stepObservers.push(stepObserver);
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      stepObservers.forEach(observer => observer.disconnect());
    };
  }, []); // Run once after mount

  const scrollToStep = (index: number) => {
    const contentContainer = contentContainerRef.current;
    if (!contentContainer) return;

    const stepElement = stepRefs.current[index];
    if (stepElement) {
      const containerRect = contentContainer.getBoundingClientRect();
      const stepRect = stepElement.getBoundingClientRect();
      const scrollOffset = stepRect.top - containerRect.top + window.scrollY - window.innerHeight * 0.3;

      window.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });
      setActiveStep(index);
    }
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-white dark:bg-black text-gray-900 dark:text-white "
    >


      <Container className="relative z-10  mt-52">
        {/* Interactive Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12">
          {/* Left Sidebar - Header + Steps List - Sticky */}
          <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 lg:h-fit lg:max-h-[calc(100vh-2rem)] space-y-4 w-full pr-2">
            {/* Header - Sticky */}
            <FadeIn className="mb-12">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-t from-[#007AFF] to-[#007AFF] bg-clip-text text-transparent">How It </span>
                <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">works</span>
              </h2>
              <p className="font-tagline text-gray-600 dark:text-gray-400 text-lg md:text-xl">
                TruePas can help you check-in anywhere in seconds
              </p>
            </FadeIn>

            {/* Steps List */}
            <div className="space-y-4 w-full">
              {steps.map((step, index) => (
                <motion.button
                  key={step.number}
                  onClick={() => scrollToStep(index)}
                  initial={false}
                  animate={{
                    borderColor: activeStep === index ? 'rgba(0, 122, 255, 1)' : 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: activeStep === index ? 'rgba(0, 122, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`relative w-full text-left p-6 rounded-xl border-2 overflow-hidden ${activeStep === index
                    ? 'shadow-lg shadow-[#007AFF]/30 ring-2 ring-[#007AFF]/30 border-[#007AFF]/50'
                    : 'border-gray-200/50 dark:border-white/20 hover:border-gray-300/50 dark:hover:border-white/20 hover:bg-gray-50/50 dark:hover:bg-white/10'
                    }`}
                >
                  {/* Gradient effect when active */}
                  {activeStep === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/10 to-[#007AFF]/10 rounded-xl"></div>
                  )}

                  <div className="relative flex items-center gap-4 z-10">
                    {/* Check/Number Indicator */}
                    <motion.div
                      animate={{
                        backgroundColor: activeStep === index
                          ? 'rgba(0, 122, 255, 1)'
                          : activeStep > index
                            ? 'rgba(0, 122, 255, 1)'
                            : 'rgba(255, 255, 255, 0.1)',
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border transition-all relative ${activeStep === index
                        ? 'border-[#007AFF] text-white ring-2 ring-[#007AFF]/30'
                        : activeStep > index
                          ? 'border-[#007AFF] text-white'
                          : 'border-gray-300/50 dark:border-white/20 text-gray-600 dark:text-white/60'
                        }`}
                    >

                      <span className="text-sm font-bold">{step.number}</span>

                    </motion.div>

                    {/* Step Title */}
                    <div className="flex-1">
                      {activeStep === index ? (
                        <h3 className="font-semibold mb-1 bg-gradient-to-t from-gray-800 dark:from-gray-200 via-gray-900 dark:via-white to-gray-900 dark:to-white bg-clip-text text-transparent">
                          {step.title}
                        </h3>
                      ) : (
                        <motion.h3
                          animate={{
                            color: 'rgba(107, 114, 128, 0.8)',
                          }}
                          transition={{ duration: 0.3 }}
                          className="font-semibold mb-1 dark:text-white/70"
                        >
                          {step.title}
                        </motion.h3>
                      )}
                      <AnimatePresence>
                        {activeStep === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-gray-600 dark:text-white/60 line-clamp-2 overflow-hidden"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side - Content & Image */}
          <div
            ref={contentContainerRef}
            className="space-y-[30vh]"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeStep === index ? 1 : 0.3,
                  scale: activeStep === index ? 1 : 0.95,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="min-h-screen flex items-center"
              >
                <div className={`relative bg-white/80 dark:bg-white/5 border-2 rounded-2xl p-8 lg:p-12 backdrop-blur-sm w-full overflow-hidden ${activeStep === index
                  ? 'border-[#007AFF]/50 shadow-lg shadow-[#007AFF]/20'
                  : 'border-gray-200/50 dark:border-white/10'
                  }`}>
                  {/* Gradient effect when active */}
                  {activeStep === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/10 to-[#007AFF]/10 rounded-2xl"></div>
                  )}
                  <div className="relative z-10">
                    {/* Icon & Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0.5,
                        y: activeStep === index ? 0 : 20
                      }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="flex items-center gap-4 mb-6"
                    >
                      <div className="relative">
                        <div
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${activeStep === index
                            ? 'from-[#007AFF] to-[#007AFF]'
                            : step.gradient
                            }`}
                        >
                          <step.icon className="relative z-10 h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-1">
                          Step {step.number}
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0.5,
                        y: activeStep === index ? 0 : 20
                      }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-gray-700 dark:text-white/80 text-lg mb-6 leading-relaxed"
                    >
                      {step.description}
                    </motion.p>

                    {/* Details */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0.5,
                        y: activeStep === index ? 0 : 20
                      }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-gray-600 dark:text-white/60 mb-8 leading-relaxed"
                    >
                      {step.details}
                    </motion.p>

                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0.5,
                        scale: activeStep === index ? 1 : 0.95
                      }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300/50 dark:border-white/10 aspect-video"
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.8} className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-sm px-6 py-3 text-gray-700 dark:text-white/80">
            <Zap className="h-5 w-5" />
            <span className="font-medium">Complete setup in under 5 minutes</span>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

