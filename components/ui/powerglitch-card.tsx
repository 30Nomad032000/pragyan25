"use client"

import { useEffect, useRef } from 'react'
import { PowerGlitch } from 'powerglitch'

interface PowerGlitchCardProps {
    children: React.ReactNode
    className?: string
    glitchOptions?: {
        playMode?: 'always' | 'hover' | 'click'
        createContainers?: boolean
        hideOverflow?: boolean
        timing?: {
            duration?: number
            iterations?: number
            easing?: string,
        }
        glitchTimeSpan?: {
            start?: number
            end?: number
        }
        shake?: {
            velocity?: number
            amplitudeX?: number
            amplitudeY?: number
        }
        slice?: {
            count?: number
            velocity?: number
            minHeight?: number
            maxHeight?: number
            hueRotate?: boolean
            cssFilters?: string
        }
    }
}

export default function PowerGlitchCard({
    children,
    className = "",
    glitchOptions = {}
}: PowerGlitchCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            // Default glitch options for card hover effect
            const defaultOptions = {
                playMode: 'click' as const,
                createContainers: true,
                hideOverflow: true,
                timing: {
                    duration: 1000,
                    iterations: 1
                },
                glitchTimeSpan: {
                    start: 0.2,
                    end: 0.5
                },
                shake: {
                    velocity: 20,
                    amplitudeX: 0.25,
                    amplitudeY: 0.15
                },
                slice: {
                    count: 6,
                    velocity: 20,
                    minHeight: 0.02,
                    maxHeight: 0.18,
                    hueRotate: true
                },
                ...glitchOptions
            }

            // Apply PowerGlitch to the card
            PowerGlitch.glitch(cardRef.current, defaultOptions)
        }
    }, [glitchOptions])

    return (
        <div
            ref={cardRef}
            className={`powerglitch-card ${className}`}
        >
            {children}
        </div>
    )
}
