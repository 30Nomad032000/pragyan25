"use client"

import React, { useEffect, useState } from 'react';

interface MobileOptimizedBackgroundProps {
    className?: string;
    style?: React.CSSProperties;
}

export default function MobileOptimizedBackground({
    className = '',
    style = {}
}: MobileOptimizedBackgroundProps) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => prev + 0.1);
        }, 100); // Much slower update rate for mobile

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`w-full h-full ${className}`}
            style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                background: `
                    radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(75, 0, 130, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(0, 100, 0, 0.1) 0%, transparent 50%),
                    linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)
                `,
                ...style
            }}
        >
            {/* Simple animated dots for visual interest */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                        style={{
                            left: `${Math.sin(time + i) * 50 + 50}%`,
                            top: `${Math.cos(time * 0.5 + i) * 50 + 50}%`,
                            animationDelay: `${i * 0.1}s`,
                            animation: `pulse 2s ease-in-out infinite alternate`
                        }}
                    />
                ))}
            </div>

            {/* Simple scanline effect */}
            <div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                style={{
                    transform: `translateY(${Math.sin(time * 2) * 50 + 50}vh)`,
                    transition: 'transform 0.1s linear'
                }}
            />
        </div>
    );
}
