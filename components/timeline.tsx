"use client"

import { useState, useEffect } from "react"
import { Clock, Users, Trophy, Calendar } from "lucide-react"
import React from "react"

interface Event {
    id: number
    title: string
    description: string
    time: string
    date: string
    category: string
    status: "Upcoming" | "Live" | "Completed"
    prize: string
    participants: string
    difficulty: string
    startTime?: string
    endTime?: string
}

interface TimelineProps {
    events?: Event[]
}

export default function LiveTimeline({ events: propEvents }: TimelineProps) {
    const [currentTime, setCurrentTime] = useState(new Date())

    const defaultEvents: Event[] = [
        {
            id: 1,
            title: "Hackathon 2025",
            description: "48-hour coding marathon with cutting-edge tech challenges",
            time: "Day 1-2",
            date: "March 15-16, 2025",
            category: "Tech",
            status: "Upcoming",
            prize: "₹50,000",
            participants: "100+",
            difficulty: "Advanced",
            startTime: "09:00",
            endTime: "18:00",
        },
        {
            id: 2,
            title: "Cyber Security Workshop",
            description: "Learn advanced penetration testing techniques",
            time: "Day 2",
            date: "March 16, 2025",
            category: "Workshop",
            status: "Live",
            prize: "Certificate",
            participants: "50",
            difficulty: "Intermediate",
            startTime: "10:00",
            endTime: "16:00",
        },
        {
            id: 3,
            title: "AI/ML Competition",
            description: "Build intelligent systems and compete for prizes",
            time: "Day 3",
            date: "March 17, 2025",
            category: "Competition",
            status: "Upcoming",
            prize: "₹30,000",
            participants: "75+",
            difficulty: "Advanced",
            startTime: "11:00",
            endTime: "17:00",
        },
        {
            id: 4,
            title: "Robotics Expo",
            description: "Showcase your innovative robotic creations",
            time: "Day 2-3",
            date: "March 16-17, 2025",
            category: "Exhibition",
            status: "Upcoming",
            prize: "₹25,000",
            participants: "40+",
            difficulty: "All Levels",
            startTime: "09:30",
            endTime: "17:30",
        },
        {
            id: 5,
            title: "Gaming Tournament",
            description: "Esports competition with massive prize pool",
            time: "Day 1-3",
            date: "March 15-17, 2025",
            category: "Gaming",
            status: "Live",
            prize: "₹40,000",
            participants: "200+",
            difficulty: "All Levels",
            startTime: "14:00",
            endTime: "22:00",
        },
        {
            id: 6,
            title: "Tech Talk Series",
            description: "Industry leaders share insights on future tech",
            time: "All Days",
            date: "March 15-17, 2025",
            category: "Talks",
            status: "Completed",
            prize: "Knowledge",
            participants: "500+",
            difficulty: "All Levels",
            startTime: "15:00",
            endTime: "18:00",
        },
    ]

    const events = propEvents || defaultEvents

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const getCurrentTimeString = () => {
        return currentTime.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    }

    const getCurrentDateString = () => {
        return currentTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Live":
                return "from-emerald-500/20 to-emerald-600/20 border-emerald-500/40"
            case "Upcoming":
                return "from-blue-500/20 to-blue-600/20 border-blue-500/40"
            case "Completed":
                return "from-slate-500/20 to-slate-600/20 border-slate-500/40"
            default:
                return "from-slate-500/20 to-slate-600/20 border-slate-500/40"
        }
    }

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "Live":
                return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
            case "Upcoming":
                return "bg-blue-500/20 text-blue-400 border-blue-500/50"
            case "Completed":
                return "bg-slate-500/20 text-slate-400 border-slate-500/50"
            default:
                return "bg-slate-500/20 text-slate-400 border-slate-500/50"
        }
    }

    const getButtonColor = (status: string) => {
        switch (status) {
            case "Live":
                return "bg-emerald-500 hover:bg-emerald-600 text-white"
            case "Upcoming":
                return "bg-blue-500 hover:bg-blue-600 text-white"
            case "Completed":
                return "bg-slate-600 hover:bg-slate-700 text-slate-300 cursor-not-allowed"
            default:
                return "bg-slate-600 hover:bg-slate-700 text-slate-300"
        }
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Event Schedule
                        </h1>
                        <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl">
                            <time className="font-mono text-3xl font-semibold text-blue-400 sm:text-4xl">
                                {getCurrentTimeString()}
                            </time>
                            <p className="text-sm text-slate-400 sm:text-base">{getCurrentDateString()}</p>
                        </div>
                    </header>

                    {/* Events grid */}
                    <div className="space-y-6">
                        {events.map((event, index) => (
                            <article
                                key={event.id}
                                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 ${getStatusColor(
                                    event.status,
                                )}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Status badge */}
                                <div className="absolute right-4 top-4 z-10">
                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm ${getStatusBadgeColor(
                                            event.status,
                                        )}`}
                                    >
                                        {event.status === "Live" && (
                                            <span className="relative flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                            </span>
                                        )}
                                        {event.status}
                                    </span>
                                </div>

                                <div className="p-6 sm:p-8">
                                    {/* Event header */}
                                    <div className="mb-4">
                                        <h2 className="mb-2 text-2xl font-bold text-white group-hover:text-blue-400 transition-colors sm:text-3xl">
                                            {event.title}
                                        </h2>
                                        <p className="text-balance text-sm leading-relaxed text-slate-300 sm:text-base">
                                            {event.description}
                                        </p>
                                    </div>

                                    {/* Event metadata */}
                                    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-blue-400" aria-hidden="true" />
                                            <span className="text-slate-300">
                                                {event.startTime} - {event.endTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-blue-400" aria-hidden="true" />
                                            <span className="text-slate-300">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Trophy className="h-4 w-4 text-blue-400" aria-hidden="true" />
                                            <span className="text-slate-300">{event.prize}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Users className="h-4 w-4 text-blue-400" aria-hidden="true" />
                                            <span className="text-slate-300">{event.participants}</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-6 flex flex-wrap gap-2">
                                        <span className="rounded-lg bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300 border border-purple-500/30">
                                            {event.category}
                                        </span>
                                        <span className="rounded-lg bg-slate-500/20 px-3 py-1 text-xs font-medium text-slate-300 border border-slate-500/30">
                                            {event.difficulty}
                                        </span>
                                    </div>

                                    {/* Progress bar for live events */}
                                    {event.status === "Live" && (
                                        <div className="mb-6 overflow-hidden rounded-full bg-slate-800/50">
                                            <div className="h-1.5 w-3/5 animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
                                        </div>
                                    )}

                                    {/* Action button */}
                                    <button
                                        className={`w-full rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${getButtonColor(
                                            event.status,
                                        )}`}
                                        disabled={event.status === "Completed"}
                                    >
                                        {event.status === "Live"
                                            ? "Join Now"
                                            : event.status === "Upcoming"
                                                ? "Set Reminder"
                                                : "View Details"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Legend */}
                    <footer className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                            </div>
                            <span className="text-slate-300">Live Now</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500" />
                            <span className="text-slate-300">Upcoming</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-slate-500" />
                            <span className="text-slate-300">Completed</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}
