"use client"

import LandingPostersSection from "@/components/ui/landing-posters-section";
import FaultyTerminalBackground from "../components/ui/faulty-terminal-background";
import MobileOptimizedBackground from "../components/ui/mobile-optimized-background";
import PowerGlitchImage from "../components/ui/powerglitch-image";
import PowerGlitchButton from "../components/ui/powerglitch-button";
import { useEffect, useState } from "react";
import Balatro from "@/components/Balatro";

export default function Home() {




  return (
    <>
      <div className={`relative min-h-screen overflow-hidden bg-black flex flex-col items-center justify-center transition-all duration-1000 ease-out'
        }`} suppressHydrationWarning>

        {/* Conditional background - simplified for mobile */}
        <div className="absolute inset-0 z-0 hidden lg:block" suppressHydrationWarning>

          <FaultyTerminalBackground
            className="w-full h-full"
          />

        </div>

        <div className="absolute inset-0 z-0 block lg:hidden" suppressHydrationWarning>
          <Balatro
            isRotate={false}
            mouseInteraction={true}
            pixelFilter={700}
          />
        </div>

        <div className="relative w-full flex flex-col items-center justify-center px-4 sm:px-12 space-y-8" suppressHydrationWarning>

          <div className="flex justify-center items-center w-full">

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

          </div>

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
