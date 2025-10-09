"use client"

import { AnimatedPostersBackground } from "@/components/ui/animated-posters-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Trophy, Star, Code, Camera, Gamepad2, Palette, Music, Brain } from "lucide-react"

const eventCategories = [
    {
        icon: Code,
        name: "Web Designing",
        description: "Build stunning websites from scratch",
        color: "bg-blue-500/20 text-blue-300 border-blue-400/30"
    },
    {
        icon: Brain,
        name: "Code Debugging",
        description: "Sharpen your analytical skills",
        color: "bg-green-500/20 text-green-300 border-green-400/30"
    },
    {
        icon: Camera,
        name: "Spot Photography",
        description: "Capture extraordinary moments",
        color: "bg-purple-500/20 text-purple-300 border-purple-400/30"
    },
    {
        icon: Brain,
        name: "Prompt Designing",
        description: "Master AI communication",
        color: "bg-orange-500/20 text-orange-300 border-orange-400/30"
    },
    {
        icon: Camera,
        name: "Reels Making",
        description: "Create viral short videos",
        color: "bg-pink-500/20 text-pink-300 border-pink-400/30"
    },
    {
        icon: Gamepad2,
        name: "Mini Level Games",
        description: "Fast-paced gaming challenges",
        color: "bg-red-500/20 text-red-300 border-red-400/30"
    },
    {
        icon: Music,
        name: "Spontaneous Dance",
        description: "Express creativity through dance",
        color: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
    },
    {
        icon: Gamepad2,
        name: "E-Game",
        description: "Competitive eFootball tournament",
        color: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30"
    },
    {
        icon: Palette,
        name: "Treasure Hunt",
        description: "Mind-bending puzzle adventure",
        color: "bg-teal-500/20 text-teal-300 border-teal-400/30"
    }
]

const stats = [
    { icon: Calendar, label: "Event Date", value: "October 16 2025" },
    { icon: Clock, label: "Duration", value: "1 Day" },
    { icon: MapPin, label: "Location", value: "MCA Department" },
    { icon: Users, label: "Expected Participants", value: "500+" },
    { icon: Trophy, label: "Total Prize Pool", value: "₹50,000+" },
    { icon: Star, label: "Events", value: "11 Competitions" }
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden pt-28">
            {/* Background Component */}
            <AnimatedPostersBackground
                opacity={0.15}
                enableAnimations={true}
                enableHoverEffects={true}
            />

            {/* Enhanced Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            {/* Floating Glass Orbs */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-transparent rounded-full blur-xl animate-pulse delay-2000"></div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400/40 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-400/40 animate-pulse"></div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}


                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                        {stats.map((stat, index) => (
                            <Card key={index} className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <CardContent className="relative p-4 text-center">
                                    <div className="relative inline-block mb-3">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-lg"></div>
                                        <stat.icon className="relative w-8 h-8 text-cyan-300 mx-auto" />
                                    </div>
                                    <p className="text-sm text-slate-300/70 mb-1">{stat.label}</p>
                                    <p className="text-lg font-semibold text-white">{stat.value}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Event Categories */}
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-xl blur-lg"></div>
                                <h2 className="relative text-3xl font-bold text-slate-200 px-6 py-2">
                                    Event Categories
                                </h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {eventCategories.map((category, index) => (
                                <Card key={index} className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <CardContent className="relative p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="relative mr-4">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-sm"></div>
                                                <div className={`relative p-3 rounded-xl ${category.color} backdrop-blur-sm`}>
                                                    <category.icon className="w-6 h-6" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{category.name}</h3>
                                        </div>
                                        <p className="text-slate-200/80">{category.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* About Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <Card className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <CardHeader className="relative">
                                <CardTitle className="text-2xl font-bold text-cyan-300">Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent className="relative space-y-4">
                                <p className="text-slate-200/90 leading-relaxed">
                                    Pragyan 2025 aims to provide students with a platform to showcase their
                                    technical skills, creativity, and innovation. We believe in fostering
                                    a competitive yet collaborative environment where participants can
                                    learn, grow, and excel.
                                </p>
                                <p className="text-slate-200/90 leading-relaxed">
                                    Our events are designed to challenge participants while providing
                                    valuable learning experiences that extend beyond the classroom.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <CardHeader className="relative">
                                <CardTitle className="text-2xl font-bold text-purple-300">What to Expect</CardTitle>
                            </CardHeader>
                            <CardContent className="relative space-y-4">
                                <ul className="space-y-3 text-slate-200/90">
                                    <li className="flex items-start">
                                        <div className="relative mr-3 mt-0.5 flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-sm"></div>
                                            <Trophy className="relative w-5 h-5 text-yellow-300" />
                                        </div>
                                        <span>Competitive events with exciting prizes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="relative mr-3 mt-0.5 flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-sm"></div>
                                            <Users className="relative w-5 h-5 text-cyan-300" />
                                        </div>
                                        <span>Networking opportunities with peers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="relative mr-3 mt-0.5 flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-sm"></div>
                                            <Code className="relative w-5 h-5 text-green-300" />
                                        </div>
                                        <span>Hands-on technical challenges</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="relative mr-3 mt-0.5 flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-sm"></div>
                                            <Star className="relative w-5 h-5 text-purple-300" />
                                        </div>
                                        <span>Fun zone activities and entertainment</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Fun Zone Section */}
                    <Card className="group relative bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <CardHeader className="relative">
                            <CardTitle className="text-2xl font-bold text-purple-300">Fun Zone</CardTitle>
                        </CardHeader>
                        <CardContent className="relative">
                            <p className="text-slate-200/90 leading-relaxed mb-4">
                                Take a break from the competition and enjoy our Fun Zone activities!
                                Experience cutting-edge Virtual Reality, compete in PlayStation gaming
                                tournaments, and unwind with friends.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 backdrop-blur-sm hover:bg-purple-500/30 transition-colors duration-300">
                                    Virtual Reality Experience
                                </Badge>
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 backdrop-blur-sm hover:bg-purple-500/30 transition-colors duration-300">
                                    PlayStation Gaming Arena
                                </Badge>
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 backdrop-blur-sm hover:bg-purple-500/30 transition-colors duration-300">
                                    All Day Access
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
