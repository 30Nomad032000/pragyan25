"use client"

import React from 'react'
import Image from 'next/image'

interface EventPostersBackgroundProps {
    className?: string
    opacity?: number
    animationSpeed?: number
}

export function EventPostersBackground({
    className = "",
    opacity = 0.3,
    animationSpeed = 20
}: EventPostersBackgroundProps) {
    const posters = Array.from({ length: 10 }, (_, i) => i + 1)

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Animated background grid */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            linear-gradient(90deg, transparent 98%, rgba(6,182,212,0.1) 100%),
            linear-gradient(transparent 98%, rgba(6,182,212,0.1) 100%)
          `,
                    backgroundSize: '50px 50px',
                    opacity: 0.2
                }}
            />

            {/* Event posters grid */}
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-2 gap-4 p-8 place-items-center">
                {posters.map((posterNumber) => (
                    <div
                        key={posterNumber}
                        className="relative group overflow-hidden rounded-lg shadow-2xl aspect-square w-full max-w-[200px]"
                        style={{
                            animationDelay: `${posterNumber * 0.2}s`,
                            animationDuration: `${animationSpeed}s`
                        }}
                    >
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                        {/* Poster number indicator */}
                        <div className="absolute top-2 left-2 bg-cyan-500 text-black text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            Event {posterNumber}
                        </div>

                        {/* Poster image */}
                        <Image
                            src={`/${posterNumber}.png`}
                            alt={`Event ${posterNumber} Poster`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ opacity }}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                            priority={posterNumber <= 4} // Prioritize first 4 images
                        />

                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
            </div>

            {/* Floating particles overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Gradient overlays for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        </div>
    )
}

export default EventPostersBackground
