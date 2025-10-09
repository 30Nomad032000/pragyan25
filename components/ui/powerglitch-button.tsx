"use client"

import { useEffect, useRef } from 'react'
import { PowerGlitch } from 'powerglitch'

interface PowerGlitchButtonProps {
    children: React.ReactNode
    onClick?: () => void
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

export default function PowerGlitchButton({
    children,
    onClick,
    className = "",
    glitchOptions = {}
}: PowerGlitchButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (buttonRef.current) {
            // Default glitch options for button click effect
            const defaultOptions = {
                playMode: 'click' as const,
                createContainers: true,
                hideOverflow: false,
                timing: {
                    duration: 800,
                    iterations: 1
                },
                glitchTimeSpan: {
                    start: 0.1,
                    end: 0.4
                },
                shake: {
                    velocity: 25,
                    amplitudeX: 0.3,
                    amplitudeY: 0.2
                },
                slice: {
                    count: 8,
                    velocity: 25,
                    minHeight: 0.02,
                    maxHeight: 0.2,
                    hueRotate: true
                },
                ...glitchOptions
            }

            // Apply PowerGlitch to the button
            PowerGlitch.glitch(buttonRef.current, defaultOptions)
        }
    }, [glitchOptions])

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    )
}
