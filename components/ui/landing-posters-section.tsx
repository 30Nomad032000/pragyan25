"use client"

import React from 'react'
import Image from 'next/image'
import LetterGlitch from '../LetterGlitch'
import { useRouter } from 'next/navigation'

interface LandingPostersSectionProps {
    className?: string
    opacity?: number
    enableAnimations?: boolean
    enableHoverEffects?: boolean
    title?: string
    subtitle?: string
}

export function LandingPostersSection({
    className = "",
    opacity = 0.6,
    enableAnimations = true,
    enableHoverEffects = true,
    title = "Event Posters",
    subtitle = "Discover all our exciting events"
}: LandingPostersSectionProps) {
    const posters = Array.from({ length: 10 }, (_, i) => i + 1)
    const eventNames = ['Code-Loom', 'Beat-Verse', 'Click-Clash', 'Virtux', 'Bug-Ex', 'Play-Grid', 'Idea-Synth', 'Trail-Hack', 'Clip-Forge', 'Trialis']
    const router = useRouter()
    return (
        <section className={`relative py-24 px-6 bg-black overflow-hidden ${className}`}>
            {/* Background effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent"></div>
                {/* Grid pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
              linear-gradient(90deg, transparent 98%, rgba(6,182,212,0.1) 100%),
              linear-gradient(transparent 98%, rgba(6,182,212,0.1) 100%)
            `,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-xl md:text-2xl text-cyan-300 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Posters Grid - Optimized for landing page visibility */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 max-w-7xl mx-auto">
                    {posters.map((posterNumber, index) => (
                        <div
                            key={posterNumber}
                            className={`group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 aspect-square w-full max-w-[280px] md:max-w-[320px] lg:max-w-[380px] cursor-pointer ${enableHoverEffects ? 'hover:shadow-cyan-500/50 hover:shadow-2xl hover:scale-105' : ''
                                }`}
                            style={{
                                animationDelay: enableAnimations ? `${index * 0.1}s` : '0s',
                                filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.2))'
                            }}
                            onClick={() => {
                                router.push(`/register/${eventNames[posterNumber - 1].toLowerCase()}`)
                            }}
                        >
                            {/* Glow border effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Poster number badge */}
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 transform -translate-y-2 group-hover:translate-y-0">
                                {eventNames[posterNumber - 1]}
                            </div>

                            {/* Hover overlay with event info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                                <div className="text-white">
                                    <h3 className="text-lg font-bold mb-1">{eventNames[posterNumber - 1]}</h3>
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

                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 16vw"
                                priority={posterNumber <= 4}
                            />

                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 transition-colors duration-300" />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-20">
                    <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                        View All Events
                    </button>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                <LetterGlitch
                    glitchSpeed={50}
                    centerVignette={true}
                    outerVignette={false}
                    smooth={true} glitchColors={['#2b4539', '#61dca3', '#61b3dc']} characters={'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'} />
            </div>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        </section>
    )
}

export default LandingPostersSection
