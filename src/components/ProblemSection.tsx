"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { Clock, AlertTriangle, Box } from "lucide-react"

const problems = [
  {
    id: 1,
    color: "blue",
    icon: Clock,
    title: "Slow Manual Check-ins",
    description: "Traditional ID verification wastes precious time",
    detail: "Long queues frustrate visitors and overwhelm staff during peak hours",
  },
  {
    id: 2,
    color: "red",
    icon: AlertTriangle,
    title: "Identity Fraud Risks",
    description: "Shared IDs and fake documents cost millions",
    detail: "Manual verification can't catch sophisticated fraud attempts",
  },
  {
    id: 3,
    color: "yellow",
    icon: Box,
    title: "Disconnected Systems",
    description: "Fragmented systems increase costs",
    detail: "Reduce visibility across your organization",
  },
]

const mockupContent = [
  {
    id: 1,
    color: "blue",
    metrics: {
      primary: { value: "4:32", label: "Avg Wait Time" },
      secondary: { value: "12", label: "In Queue" },
    },
    lastUpdate: "Last check-in: 3 seconds ago",
  },
  {
    id: 2,
    color: "red",
    metrics: {
      primary: { value: "23", label: "Security Flags" },
      secondary: { value: "69%", label: "Detection Rate" },
    },
    lastUpdate: "Last alert: 3 seconds ago",
  },
  {
    id: 3,
    color: "yellow",
    metrics: {
      primary: { value: "5", label: "Connected Systems" },
      secondary: { value: "52%", label: "Sync Success" },
    },
    lastUpdate: "Last sync: 3 seconds ago",
  },
]

export default function ProblemSection() {
  const [activeTab, setActiveTab] = useState(1)
  const [progress, setProgress] = useState(0)
  const AUTO_PLAY_DURATION = 8000
  const PROGRESS_INTERVAL = 50
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + (PROGRESS_INTERVAL / AUTO_PLAY_DURATION) * 100
      })
    }, PROGRESS_INTERVAL)

    return () => clearInterval(progressTimer)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const advanceTimer = setTimeout(() => {
        setActiveTab((current) => (current === problems.length ? 1 : current + 1))
        setProgress(0)
      }, 300)
      return () => clearTimeout(advanceTimer)
    }
  }, [progress])

  const handleCardClick = (id: number) => {
    setActiveTab(id)
    setProgress(0)

    const iconElement = iconRefs.current[id - 1]
    if (iconElement) {
      const tl = gsap.timeline()
      tl.to(iconElement, {
        scale: 1.2,
        rotate: 10,
        duration: 0.15,
        ease: "power2.out",
      })
        .to(iconElement, {
          rotate: -10,
          duration: 0.15,
          ease: "power2.inOut",
        })
        .to(iconElement, {
          scale: 1,
          rotate: 0,
          duration: 0.2,
          ease: "back.out(1.7)",
        })
    }
  }

  const getStackOffset = (cardId: number) => {
    const totalCards = mockupContent.length
    // Calculate distance from active card (wrapping around)
    let distance = cardId - activeTab
    if (distance < 0) distance += totalCards

    // Active card (distance 0) is at front, others stack behind
    const offsetX = distance * 40
    const offsetY = distance * 30
    const zIndex = totalCards - distance

    return { offsetX, offsetY, zIndex }
  }

  return (
    <section className="relative bg-white dark:bg-black py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/20 dark:from-slate-900/20 via-white dark:via-black to-white dark:to-black"></div>

      <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none opacity-30">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-px h-full bg-gradient-to-b from-slate-300/40 dark:from-slate-800/40 via-slate-200/10 dark:via-slate-800/10 to-transparent"
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4 px-4 py-1.5 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 rounded-full backdrop-blur-sm">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              The Hidden Costs
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">
              Manual Check-Ins
            </span>
            <br />
            <span className="bg-gradient-to-t from-gray-800 via-[#007AFF] to-[#00C7FF] bg-clip-text text-transparent">
              Are{" "}
            </span>
            <span className="bg-gradient-to-t from-white via-gray-900 to-gray-900 dark:from-gray-500 via-gray-200 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Costing You
            </span>
          </h2>
          <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Every manual check-in compounds inefficiencies that drain time, money, and security
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="space-y-4">
              {problems.map((problem, index) => {
                const IconComponent = problem.icon
                return (
                  <button
                    key={problem.id}
                    onClick={() => handleCardClick(problem.id)}
                    className={`group w-full text-left p-6 rounded-2xl transition-all duration-500 border relative overflow-hidden ${
                      activeTab === problem.id
                        ? "bg-gradient-to-br from-slate-50/90 dark:from-slate-900/90 to-slate-100/50 dark:to-slate-900/50 border-slate-300/80 dark:border-slate-700/80 shadow-2xl shadow-blue-500/10"
                        : "bg-slate-50/30 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 hover:border-slate-300/60 dark:hover:border-slate-700/60 hover:shadow-lg hover:shadow-black/20"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="flex items-start gap-4 relative">
                      <div
                        ref={(el) => {
                          iconRefs.current[index] = el
                        }}
                        className={`p-3 rounded-xl transition-all duration-500 border ${
                          activeTab === problem.id
                            ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40 shadow-lg shadow-blue-500/20"
                            : "bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-500 border-slate-300/50 dark:border-slate-700/50 group-hover:bg-slate-300/80 dark:group-hover:bg-slate-800/80 group-hover:text-slate-700 dark:group-hover:text-slate-400 group-hover:border-slate-400/50 dark:group-hover:border-slate-600/50"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-lg mb-2 transition-colors duration-500 ${
                            activeTab === problem.id
                              ? "text-slate-900 dark:text-white"
                              : "text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300"
                          }`}
                        >
                          {problem.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed transition-colors duration-500 ${
                            activeTab === problem.id
                              ? "text-slate-600 dark:text-slate-400"
                              : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-400"
                          }`}
                        >
                          {problem.description}
                        </p>
                      </div>
                    </div>

                    {activeTab === problem.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200/50 dark:bg-slate-800/50">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all duration-100 ease-linear shadow-lg shadow-blue-500/50"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center min-h-[500px] perspective-1000">
            <div className="grid [grid-template-areas:'stack'] place-items-center w-full max-w-[420px]">
              {mockupContent.map((content) => {
                const isActive = activeTab === content.id
                const problem = problems.find((p) => p.id === content.id)!
                const IconComponent = problem.icon
                const { offsetX, offsetY, zIndex } = getStackOffset(content.id)

                return (
                  <div
                    key={content.id}
                    className={cn(
                      "[grid-area:stack] transition-all duration-700 ease-out select-none",
                      "relative h-[420px] w-[340px]",
                      !isActive && "grayscale-[80%]",
                    )}
                    style={{
                      transform: `translateX(${offsetX}px) translateY(${offsetY}px) skewY(-6deg)`,
                      zIndex,
                    }}
                  >
                      <div
                        onClick={() => handleCardClick(content.id)}
                        className={cn(
                          "relative h-full w-full cursor-pointer border-2 backdrop-blur-sm transition-all duration-700 overflow-hidden",
                          "bg-white/80 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
                          "rounded-[2rem]",
                          "after:absolute after:-right-2 after:top-[-5%] after:h-[110%] after:w-[22rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] after:pointer-events-none after:rounded-[2rem]",
                          isActive
                            ? "border-[#007AFF]/50 shadow-2xl shadow-[#007AFF]/20 hover:-translate-y-4 grayscale-0"
                            : "border-gray-200/50 dark:border-white/10 hover:-translate-y-2 hover:border-[#007AFF]/30 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gray-400/40 dark:before:bg-black/40 before:transition-opacity before:duration-700 hover:before:opacity-0",
                        )}
                      >
                      {/* Blue gradient overlay for color scheme */}
                      <div className={cn(
                        "absolute inset-0 rounded-[2rem] bg-gradient-to-br pointer-events-none transition-opacity duration-700",
                        isActive ? "from-[#007AFF]/20 via-[#007AFF]/10 to-[#007AFF]/20 opacity-100" : "from-[#007AFF]/10 via-[#007AFF]/5 to-[#007AFF]/10 opacity-50"
                      )}></div>
                      <div className="relative h-full flex flex-col justify-between p-6 z-10">
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "relative inline-flex rounded-full p-2.5 transition-all duration-500",
                              isActive ? "bg-blue-500/20 ring-2 ring-blue-500/40" : "bg-gray-200/80 dark:bg-slate-800/80",
                            )}
                          >
                            <IconComponent
                              className={cn(
                                "w-4 h-4 transition-colors duration-500",
                                isActive ? "text-blue-400" : "text-gray-600 dark:text-slate-500",
                              )}
                            />
                          </span>
                          <p
                            className={cn(
                              "text-lg font-semibold transition-colors duration-500",
                              isActive ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-slate-500",
                            )}
                          >
                            {problem.title}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div
                              className={cn(
                                "text-4xl font-bold mb-1 transition-colors duration-500",
                                isActive ? "text-red-400" : "text-gray-900 dark:text-slate-600",
                              )}
                            >
                              {content.metrics.primary.value}
                            </div>
                            <div className="text-gray-600 dark:text-slate-400 text-sm">{content.metrics.primary.label}</div>
                          </div>
                          <div>
                            <div
                              className={cn(
                                "text-4xl font-bold mb-1 transition-colors duration-500",
                                isActive ? "text-red-400" : "text-gray-900 dark:text-slate-600",
                              )}
                            >
                              {content.metrics.secondary.value}
                            </div>
                            <div className="text-gray-600 dark:text-slate-400 text-sm">{content.metrics.secondary.label}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-gray-600 dark:text-slate-500 text-sm">{content.lastUpdate}</span>
                          {isActive && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>}
                        </div>
                      </div>

                      {isActive && (
                        <>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/5 rounded-full blur-3xl pointer-events-none"></div>
                          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#007AFF]/10 via-blue-500/5 to-transparent rounded-[2rem] pointer-events-none opacity-50"></div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
