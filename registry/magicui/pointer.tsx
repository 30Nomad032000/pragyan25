"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { ReactNode, useEffect, useRef, useState } from "react"

interface PointerProps {
    children?: ReactNode
    className?: string
    color?: string
    size?: number
    delay?: number
}

export function Pointer({
    children,
    className,
    color = "#fff",
    size = 20,
    delay = 0,
}: PointerProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                setPosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                })
                setIsVisible(true)
            }
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        const element = ref.current
        if (element) {
            element.addEventListener("mousemove", handleMouseMove)
            element.addEventListener("mouseleave", handleMouseLeave)
        }

        return () => {
            if (element) {
                element.removeEventListener("mousemove", handleMouseMove)
                element.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    }, [])

    return (
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
            {children}
            <motion.div
                className="pointer-events-none fixed z-50"
                animate={{
                    x: position.x - size / 2,
                    y: position.y - size / 2,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    delay,
                }}
                style={{
                    width: size,
                    height: size,
                }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 0 20px ${color}40`,
                    }}
                />
            </motion.div>
        </div>
    )
}
