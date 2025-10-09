"use client"

import { AnimatedPostersBackground } from "@/components/ui/animated-posters-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, Users, Trophy, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"

const generalRules = [
    {
        icon: Users,
        title: "Registration",
        rules: [
            "All participants must register online before the event",
            "Registration closes 24 hours before the event start time",
            "Each participant can register for a maximum of 3 events",
            "Valid college ID is mandatory for verification"
        ]
    },
    {
        icon: Clock,
        title: "Timing & Attendance",
        rules: [
            "Participants must arrive 30 minutes before event start time",
            "Late arrivals may be disqualified at organizer's discretion",
            "Events will start exactly at the scheduled time",
            "Participants must stay for the entire duration of the event"
        ]
    },
    {
        icon: Shield,
        title: "Code of Conduct",
        rules: [
            "Respect all participants, judges, and organizers",
            "No plagiarism or cheating will be tolerated",
            "Use of unfair means will result in immediate disqualification",
            "Maintain decorum and follow venue rules"
        ]
    },
    {
        icon: Trophy,
        title: "Judging & Prizes",
        rules: [
            "Judges' decisions are final and binding",
            "Prizes will be awarded based on performance and creativity",
            "In case of ties, additional criteria will be considered",
            "Prize distribution will be held after all events conclude"
        ]
    }
]

const eventSpecificRules = [
    {
        event: "Code Loom",
        rules: [
            "Participants must bring their own laptops",
            "Internet access will be provided",
            "No pre-built templates or frameworks allowed",
            "Submission must be original work created during the event"
        ]
    },
    {
        event: "Bug Ex",
        rules: [
            "Participants will be given buggy code to debug",
            "No external help or internet access allowed",
            "Solutions must be submitted within the time limit",
            "Code efficiency will be considered in judging"
        ]
    },
    {
        event: "Click Clash",
        rules: [
            "Participants must bring their own cameras/phones",
            "Photos must be taken within the campus premises",
            "No editing software allowed during the event",
            "Submit original RAW files along with edited versions"
        ]
    },
    {
        event: "Idea Synth",
        rules: [
            "AI tools will be provided by organizers",
            "Prompts must be original and creative",
            "No pre-written prompts allowed",
            "Judging based on creativity and output quality"
        ]
    },
    {
        event: "Clip Forge",
        rules: [
            "Participants can use their own devices",
            "Video must be exactly 30 seconds or less",
            "No copyrighted music or content allowed",
            "Submit both raw footage and final edited video"
        ]
    },
    {
        event: "Trail Hack",
        rules: [
            "Teams of maximum 4 members allowed",
            "No external help or internet access",
            "All clues must be solved in sequence",
            "First team to complete all tasks wins"
        ]
    }
]

const penalties = [
    {
        icon: XCircle,
        type: "Disqualification",
        description: "Cheating, plagiarism, or violation of code of conduct",
        color: "text-red-400"
    },
    {
        icon: AlertTriangle,
        type: "Warning",
        description: "Minor rule violations or inappropriate behavior",
        color: "text-yellow-400"
    },
    {
        icon: Info,
        type: "Point Deduction",
        description: "Late submissions or minor technical violations",
        color: "text-orange-400"
    }
]

export default function RulesPage() {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden pt-28">
            {/* Background Component */}
            <AnimatedPostersBackground
                opacity={0.2}
                enableAnimations={true}
                enableHoverEffects={true}
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-pulse"></div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                            Event Rules & Guidelines
                        </h1>
                        <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto leading-relaxed">
                            Please read and follow these rules to ensure a fair and enjoyable
                            experience for all participants at Pragyan 2025.
                        </p>
                    </div>

                    {/* Important Notice */}
                    <Alert className="mb-12 bg-red-500/10 border-red-500/30 text-red-300">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-lg font-semibold">
                            <strong>Important:</strong> All participants must agree to these rules during registration.
                            Violation of any rule may result in disqualification.
                        </AlertDescription>
                    </Alert>

                    {/* General Rules */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-8">
                            General Rules
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {generalRules.map((rule, index) => (
                                <Card key={index} className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-400/60 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold text-cyan-300 flex items-center">
                                            <rule.icon className="w-6 h-6 mr-3" />
                                            {rule.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {rule.rules.map((item, idx) => (
                                                <li key={idx} className="flex items-start text-cyan-200/80">
                                                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Event-Specific Rules */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-purple-300 mb-8">
                            Event-Specific Rules
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {eventSpecificRules.map((event, index) => (
                                <Card key={index} className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-400/60 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold text-purple-300">
                                            {event.event}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {event.rules.map((rule, idx) => (
                                                <li key={idx} className="flex items-start text-cyan-200/80">
                                                    <Info className="w-4 h-4 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span>{rule}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Penalties Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-red-300 mb-8">
                            Penalties & Consequences
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {penalties.map((penalty, index) => (
                                <Card key={index} className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl overflow-hidden hover:border-red-400/60 transition-all duration-300">
                                    <CardContent className="p-6 text-center">
                                        <penalty.icon className={`w-12 h-12 ${penalty.color} mx-auto mb-4`} />
                                        <h3 className="text-xl font-bold text-white mb-2">{penalty.type}</h3>
                                        <p className="text-cyan-200/80">{penalty.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Fun Zone Rules */}
                    <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-purple-300">Fun Zone Rules</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-purple-300 mb-3">Virtual Reality Experience</h4>
                                    <ul className="space-y-2 text-cyan-200/80">
                                        <li>• Entry fee: ₹100 per session</li>
                                        <li>• Sessions are 15 minutes each</li>
                                        <li>• Safety briefing mandatory before use</li>
                                        <li>• No food or drinks near VR equipment</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-purple-300 mb-3">PlayStation Gaming Arena</h4>
                                    <ul className="space-y-2 text-cyan-200/80">
                                        <li>• Entry fee: ₹50 per session</li>
                                        <li>• Sessions are 30 minutes each</li>
                                        <li>• First come, first served basis</li>
                                        <li>• Respectful gaming behavior required</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="mt-12 text-center">
                        <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden max-w-2xl mx-auto">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-cyan-300 mb-4">Questions or Clarifications?</h3>
                                <p className="text-cyan-200/80 mb-4">
                                    If you have any questions about the rules or need clarification,
                                    please contact our organizing committee.
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                                        Email: pragyan2025@college.edu
                                    </Badge>
                                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                                        Phone: +91-XXXX-XXXX
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
