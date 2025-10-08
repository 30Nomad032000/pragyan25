"use client"
import FAQ from "../components/faq";
import FeaturedEvents from "../components/featured";
import FaultyTerminalBackground from "../components/ui/faulty-terminal-background";
import React from "react";
import FuzzyText from "../components/ui/fuzzy-text";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">

      <div className="absolute inset-0 z-0">
        <FaultyTerminalBackground
          className="w-full h-full"
        />
      </div>



      <div className="relative w-full flex items-center justify-center px-4 sm:px-12">
        <FuzzyText
          fontSize="clamp(3rem, 12vw, 8rem)"
          fontWeight={900}
          color="#ffffff"
          enableHover={true}
          baseIntensity={0.18}
          hoverIntensity={0.5}
        >
          Coming Soon
        </FuzzyText>
      </div>



    </div>
  );
}
