"use client"

import LandingPostersSection from "@/components/ui/landing-posters-section";
import FaultyTerminalBackground from "../components/ui/faulty-terminal-background";
import MobileOptimizedBackground from "../components/ui/mobile-optimized-background";
import PowerGlitchImage from "../components/ui/powerglitch-image";
import PowerGlitchButton from "../components/ui/powerglitch-button";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Detect mobile and low-end devices
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(isMobileDevice);

    // Detect low-end devices based on hardware concurrency and memory
    const isLowEnd = navigator.hardwareConcurrency <= 4 ||
      (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;
    setIsLowEndDevice(isLowEnd);
  }, []);

  return (
    <>
      <div className={`relative min-h-screen overflow-hidden bg-black flex flex-col items-center justify-center transition-all duration-1000 ease-out'
        }`} suppressHydrationWarning>

        {/* Conditional background - simplified for mobile */}
        <div className="absolute inset-0 z-0" suppressHydrationWarning>
          {!isMobile && !isLowEndDevice ? (
            <FaultyTerminalBackground
              className="w-full h-full"
            />
          ) : (
            <MobileOptimizedBackground
              className="w-full h-full"
            />
          )}
        </div>

        <div className="relative w-full flex flex-col items-center justify-center px-4 sm:px-12 space-y-8" suppressHydrationWarning>

          <div className="flex justify-center items-center w-full">
            {!isMobile && !isLowEndDevice ? (
              <PowerGlitchImage
                src="/title.svg"
                alt="Title"
                width={300}
                height={200}
                className="w-auto h-auto max-w-[51%] max-h-[51%] object-contain"
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
            ) : (
              // Fallback static image for mobile/low-end devices
              <img
                src="/title.svg"
                alt="Title"
                className="w-auto h-auto max-w-[51%] max-h-[51%] object-contain"
              />
            )}
          </div>

          {/* Cyberpunk See More Button */}
          <div className="relative z-10">
            {!isMobile && !isLowEndDevice ? (
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
            ) : (
              // Fallback simple button for mobile/low-end devices
              <button
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
              >
                <div className="relative flex items-center space-x-3 text-cyan-400 font-mono text-lg font-bold tracking-wider">
                  <span className="relative">
                    <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-200">SEE MORE</span>
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-purple-400">
                      EXPLORE
                    </span>
                  </span>
                </div>
              </button>
            )}
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
          enableAnimations={!isMobile && !isLowEndDevice}
          enableHoverEffects={!isMobile && !isLowEndDevice}
        />
      </div>
    </>
  );
}
