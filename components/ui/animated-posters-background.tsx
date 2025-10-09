"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Particles from '../Particles'

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


            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
            <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Event posters grid - 2 rows, 5 columns */}

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                <Particles
                    particleColors={['#06b6d4', '#8b5cf6', '#22d3ee', '#a855f7']}
                    particleCount={1000}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

            {/* Corner glow effects */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-cyan-300/10 to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
        </div>
    )
}

export default AnimatedPostersBackground
