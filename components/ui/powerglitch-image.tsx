"use client"

import { useEffect, useRef } from 'react'
import { PowerGlitch } from 'powerglitch'

interface PowerGlitchImageProps {
    src: string
    alt: string
    width?: number
    height?: number
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

export default function PowerGlitchImage({
    src,
    alt,
    width = 400,
    height = 300,
    className = "",
    glitchOptions = {}
}: PowerGlitchImageProps) {
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (imageRef.current) {
            // Default glitch options
            const defaultOptions = {
                playMode: 'hover' as const,
                createContainers: true,
                hideOverflow: false,
                timing: {
                    duration: 2000,
                    iterations: Infinity
                },
                glitchTimeSpan: {
                    start: 0.5,
                    end: 0.7
                },
                shake: {
                    velocity: 15,
                    amplitudeX: 0.2,
                    amplitudeY: 0.2
                },
                slice: {
                    count: 6,
                    velocity: 15,
                    minHeight: 0.02,
                    maxHeight: 0.15,
                    hueRotate: true
                },
                ...glitchOptions
            }

            // Apply PowerGlitch to the image
            PowerGlitch.glitch(imageRef.current, defaultOptions)
        }
    }, [glitchOptions])

    return (
        <div className={`powerglitch-container ${className}`}>
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto"
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto'
                }}
            />
        </div>
    )
}
