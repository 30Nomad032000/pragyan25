"use client"

import LandingPostersSection from "@/components/ui/landing-posters-section";
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';
import { useEffect, useState } from "react";
import FaultyTerminalBackground from "../components/ui/faulty-terminal-background";
import FuzzyText from "../components/ui/fuzzy-text";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted to prevent hydration mismatch
    setIsMounted(true)

    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Add a small delay before showing content for smooth transition
      setTimeout(() => {
        setShowContent(true)
      }, 100)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Show loading state consistently on both server and client
  if (isLoading || !isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-cyan-900 flex items-center justify-center relative overflow-hidden">
        {/* Cyberpunk grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_98%,rgba(6,182,212,0.1)_100%),linear-gradient(transparent_98%,rgba(6,182,212,0.1)_100%)] bg-[length:50px_50px]"></div>
        </div>
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        {/* Scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>

        <div className="flex flex-col items-center space-y-6 relative z-10">
          <div className="relative">
            <Quantum
              size="45"
              speed="1.75"
              color="#FFFFFF"
            />
            {/* Neon glow effect */}

          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`relative min-h-screen overflow-hidden bg-black flex flex-col items-center justify-center transition-all duration-1000 ease-out ${showContent ? 'opacity-100' : 'opacity-0'
        }`} suppressHydrationWarning>

        <div className="absolute inset-0 z-0" suppressHydrationWarning>
          <FaultyTerminalBackground
            className="w-full h-full"
          />
        </div>

        <div className="relative w-full flex items-center justify-center px-4 sm:px-12" suppressHydrationWarning>
          <FuzzyText
            fontSize="clamp(2rem, 8vw, 6rem)"
            fontWeight={900}
            color="#ffffff"
            enableHover={true}
            baseIntensity={0.18}
            hoverIntensity={0.5}
          >
            Coming Soon
          </FuzzyText>
        </div>

        {/* Navigation Links */}


      </div>

      {/* Event Posters Section */}
      <LandingPostersSection
        title="Our Events"
        subtitle="Explore the exciting lineup of events at Pragyan 2025"
        opacity={0.7}
        enableAnimations={true}
        enableHoverEffects={true}
      />
    </>
  );
}
