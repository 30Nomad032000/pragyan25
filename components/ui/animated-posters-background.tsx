"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

interface AnimatedPostersBackgroundProps {
    className?: string
    opacity?: number
    enableAnimations?: boolean
    enableHoverEffects?: boolean
}

export function AnimatedPostersBackground({
    className = "",
    opacity = 0.4,
    enableAnimations = true,
    enableHoverEffects = true
}: AnimatedPostersBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const posters = Array.from({ length: 10 }, (_, i) => i + 1)

    useEffect(() => {
        if (!enableAnimations || !containerRef.current) return

        const container = containerRef.current
        const posterElements = container.querySelectorAll('.poster-item')

        // Create floating animation for each poster
        posterElements.forEach((poster, index) => {
            const element = poster as HTMLElement

            // Random floating animation
            const animate = () => {
                const randomX = (Math.random() - 0.5) * 20
                const randomY = (Math.random() - 0.5) * 20
                const randomRotate = (Math.random() - 0.5) * 10

                element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`

                setTimeout(() => {
                    element.style.transform = 'translate(0, 0) rotate(0deg)'
                }, 2000)
            }

            // Start animation with delay
            setTimeout(() => {
                animate()
                setInterval(animate, 5000 + Math.random() * 3000)
            }, index * 200)
        })
    }, [enableAnimations])

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`} ref={containerRef}>
            {/* Cyberpunk grid background */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `
            linear-gradient(90deg, transparent 98%, rgba(6,182,212,0.15) 100%),
            linear-gradient(transparent 98%, rgba(6,182,212,0.15) 100%)
          `,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

            {/* Event posters grid - 2 rows, 5 columns */}
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-2 gap-6 p-8 place-items-center">
                {posters.map((posterNumber, index) => (
                    <div
                        key={posterNumber}
                        className={`poster-item relative group overflow-hidden rounded-xl shadow-2xl transition-all duration-500 aspect-square w-full max-w-[200px] ${enableHoverEffects ? 'hover:shadow-cyan-500/50 hover:shadow-2xl' : ''
                            }`}
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.3))'
                        }}
                    >
                        {/* Glow border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Poster number badge */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 transform -translate-y-2 group-hover:translate-y-0">
                            Event {posterNumber}
                        </div>

                        {/* Hover overlay with event info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                            <div className="text-white">
                                <h3 className="text-lg font-bold mb-1">Event {posterNumber}</h3>
                                <p className="text-sm text-cyan-300">Click to learn more</p>
                            </div>
                        </div>

                        {/* Poster image */}
                        <Image
                            src={`/${posterNumber}.png`}
                            alt={`Event ${posterNumber} Poster`}
                            fill
                            className={`object-cover transition-all duration-700 ${enableHoverEffects ? 'group-hover:scale-110 group-hover:brightness-110' : ''
                                }`}
                            style={{ opacity }}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                            priority={posterNumber <= 4}
                        />

                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-400/50 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            boxShadow: '0 0 10px rgba(6,182,212,0.8)'
                        }}
                    />
                ))}
            </div>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

            {/* Corner glow effects */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-400/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-400/10 to-transparent rounded-full blur-3xl" />
        </div>
    )
}

export default AnimatedPostersBackground
