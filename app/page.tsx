"use client"

import LandingPostersSection from "@/components/ui/landing-posters-section";
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';
import { useEffect, useState } from "react";
import FaultyTerminalBackground from "../components/ui/faulty-terminal-background";
import PowerGlitchImage from "../components/ui/powerglitch-image";
import PowerGlitchButton from "../components/ui/powerglitch-button";

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
              size="120"
              speed="1.75"
              color="#59168b"
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

        <div className="relative w-full flex flex-col items-center justify-center px-4 sm:px-12 space-y-8" suppressHydrationWarning>

          <PowerGlitchImage
            src="/title.svg"
            alt="Title"
            width={600}
            height={400}
            className="w-full h-full object-contain"
            glitchOptions={{
              playMode: 'always',
              timing: {
                duration: 1500,
                iterations: Infinity
              },
              glitchTimeSpan: {
                start: 0.3,
                end: 0.6
              },
              shake: {
                velocity: 20,
                amplitudeX: 0.3,
                amplitudeY: 0.2
              },
              slice: {
                count: 8,
                velocity: 20,
                minHeight: 0.02,
                maxHeight: 0.2,
                hueRotate: true
              }
            }}
          />

          {/* Cyberpunk See More Button */}
          <div className="relative z-10">
            <PowerGlitchButton
              onClick={() => {
                const element = document.getElementById('events-section')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="
                relative group overflow-hidden
                px-8 py-4 rounded-lg
                bg-gradient-to-r from-purple-600/20 to-cyan-600/20
                border border-cyan-400/30
                backdrop-blur-sm
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-2xl
                hover:shadow-cyan-400/50
              "
              glitchOptions={{
                playMode: 'hover',
                timing: {
                  duration: 600,
                  iterations: 1
                },
                glitchTimeSpan: {
                  start: 0.1,
                  end: 0.3
                },
                shake: {
                  velocity: 30,
                  amplitudeX: 0.4,
                  amplitudeY: 0.3
                },
                slice: {
                  count: 10,
                  velocity: 30,
                  minHeight: 0.02,
                  maxHeight: 0.25,
                  hueRotate: true
                }
              }}
            >
              {/* Button content */}
              <div className="relative flex items-center space-x-3 text-cyan-400 font-mono text-lg font-bold tracking-wider">
                <span className="relative">
                  <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-200">SEE MORE</span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-purple-400">
                    EXPLORE
                  </span>
                </span>
              </div>
            </PowerGlitchButton>
          </div>

        </div>

        {/* Navigation Links */}


      </div>

      {/* Event Posters Section */}
      <div id="events-section">
        <LandingPostersSection
          title="Our Events"
          subtitle="Explore the exciting lineup of events at Pragyan 2025"
          opacity={0.7}
          enableAnimations={true}
          enableHoverEffects={true}
        />
      </div>
    </>
  );
}
