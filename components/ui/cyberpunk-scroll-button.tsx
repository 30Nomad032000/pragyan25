"use client"

import { useState, useEffect } from "react"

interface CyberpunkScrollButtonProps {
    targetId?: string
    className?: string
}

export default function CyberpunkScrollButton({
    targetId = "events-section",
    className = ""
}: CyberpunkScrollButtonProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            // Show button when user has scrolled down a bit but not reached the bottom
            setIsVisible(scrollTop > windowHeight * 0.3 && scrollTop < documentHeight - windowHeight - 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToBottom = () => {
        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
            // Fallback to scroll to bottom of page
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
        }
    }

    if (!isVisible) return null

    return (
        <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
            <button
                onClick={scrollToBottom}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
          relative group overflow-hidden
          px-6 py-3 rounded-lg
          bg-gradient-to-r from-purple-600/20 to-cyan-600/20
          border border-cyan-400/30
          backdrop-blur-sm
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-2xl
          ${isHovered ? 'shadow-cyan-400/50' : 'shadow-purple-400/30'}
        `}
            >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glitch effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" />
                </div>

                {/* Scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Button content */}
                <div className="relative flex items-center space-x-2 text-cyan-400 font-mono text-sm font-bold tracking-wider">
                    <span className="relative">
                        <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-200">SCROLL</span>
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-purple-400">
                            ACCESS
                        </span>
                    </span>

                    {/* Animated arrow */}
                    <div className="relative w-4 h-4">
                        <svg
                            className={`w-full h-full transition-transform duration-300 ${isHovered ? 'translate-y-1 rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7 14L12 9L17 14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="drop-shadow-sm"
                            />
                        </svg>

                        {/* Glitch effect for arrow */}
                        <svg
                            className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isHovered ? 'translate-y-1 rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7 14L12 9L17 14"
                                stroke="#ff00ff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="animate-pulse"
                            />
                        </svg>
                    </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            </button>
        </div>
    )
}
