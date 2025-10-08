"use client"

import { AnimatedPostersBackground } from "@/components/ui/animated-posters-background"
import { EventPostersBackground } from "@/components/ui/event-posters-background"
import { useState } from "react"

export default function EventsPage() {
    const [backgroundType, setBackgroundType] = useState<'animated' | 'static'>('animated')
    const [opacity, setOpacity] = useState(0.4)
    const [enableAnimations, setEnableAnimations] = useState(true)
    const [enableHoverEffects, setEnableHoverEffects] = useState(true)

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Component */}
            {backgroundType === 'animated' ? (
                <AnimatedPostersBackground
                    opacity={opacity}
                    enableAnimations={enableAnimations}
                    enableHoverEffects={enableHoverEffects}
                />
            ) : (
                <EventPostersBackground
                    opacity={opacity}
                    animationSpeed={20}
                />
            )}

            {/* Main content */}




            {/* Status indicator */}

        </div>
    )
}
