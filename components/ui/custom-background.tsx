"use client"

import { useEffect, useRef } from "react"
import React from "react"

export default function FaultyTerminalBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Terminal characters
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
        const fontSize = 14
        const columns = canvas.width / fontSize

        // Initialize drops
        const drops: number[] = []
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100
        }

        // Color palette
        const colors = ["#06b6d4", "#22d3ee", "#a855f7", "#c084fc"]

        // Animation
        const draw = () => {
            // Semi-transparent black for trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = chars[Math.floor(Math.random() * chars.length)]

                // Random color from palette
                const color = colors[Math.floor(Math.random() * colors.length)]

                // Add glow effect
                ctx.shadowBlur = 10
                ctx.shadowColor = color
                ctx.fillStyle = color

                // Draw character
                const x = i * fontSize
                const y = drops[i] * fontSize
                ctx.fillText(char, x, y)

                // Reset drop randomly
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }

                // Move drop down
                drops[i]++
            }

            // Reset shadow
            ctx.shadowBlur = 0
        }

        // Animation loop
        const interval = setInterval(draw, 50)

        return () => {
            clearInterval(interval)
            window.removeEventListener("resize", resizeCanvas)
        }
    }, [])

    return (
        <>
            {/* Canvas for matrix effect */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: "linear-gradient(to bottom, #000000, #0a0a0a)" }}
            />

            {/* Overlay gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-purple-950/20 pointer-events-none"></div>

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

            {/* Subtle noise texture */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            ></div>
        </>
    )
}
