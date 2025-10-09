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
        event: "IdeaSynth: Prompt Designing",
        fee: "₹100",
        duration: "2 hours",
        venue: "ASIET AI Lab (2nd floor)",
        rules: [
            "Individual participation only - no teams allowed",
            "Design tools will be provided on the day of competition",
            "Each round has specific time limits",
            "All smart devices are prohibited during competition",
            "Must follow event coordinators' instructions at all times",
            "Misconduct or rule violation results in disqualification",
            "Two rounds with new design challenges each round"
        ],
        coordinators: [
            { name: "Jeffy John T", phone: "8129495761" },
            { name: "Athul", phone: "9037184607" }
        ]
    },
    {
        event: "ClipForge Reels Competition",
        fee: "₹200 per team",
        duration: "3 hours",
        venue: "To be announced",
        rules: [
            "Maximum 4 members per team",
            "Video length strictly 30 seconds",
            "Final video must be submitted within 3 hours",
            "Theme announced at reporting time",
            "MP4 or MOV format, preferably vertical (9:16)",
            "Original content only - no plagiarism",
            "Copyright-free music/voiceovers only",
            "Late submissions not accepted under any circumstances"
        ],
        judging: [
            "Content Creativity & Storytelling - 40%",
            "Relevance to Theme - 25%",
            "Technical Quality - 20%",
            "Originality & Engagement - 15%"
        ]
    },
    {
        event: "Golazo - eFootball Tournament",
        fee: "₹100",
        duration: "Knockout format",
        venue: "To be announced",
        rules: [
            "Team strength: 3100 maximum",
            "No double booster allowed",
            "Single elimination knockout format",
            "Normal knockout: 6 minutes per match",
            "Use own network connection",
            "Reporting time: 11:30 PM",
            "Date: 16-10-25"
        ],
        coordinators: [
            { name: "Vishnu C.S", phone: "7736191701" },
            { name: "Gokul P", phone: "6238285908" }
        ]
    },
    {
        event: "Code Crucible: Debugging Challenge",
        fee: "₹100",
        duration: "90 minutes + 10 minute break",
        venue: "MCA Lab, PG Block",
        rules: [
            "Individual participation only",
            "60 computers available (1:1 ratio)",
            "Report 10 minutes before start time",
            "Only lab-provided computer allowed",
            "No external resources, mobile phones, or AI tools",
            "90-minute debugging rounds",
            "10-minute break between rounds",
            "Late submissions not accepted",
            "System tampering results in disqualification"
        ],
        evaluation: [
            "Accuracy of bug fixes",
            "Code readability and structure",
            "Time taken to resolve issues"
        ]
    },
    {
        event: "CodeLoom: Web Designing",
        fee: "₹100",
        duration: "180 minutes (including breaks)",
        venue: "AI LAB",
        rules: [
            "Individual participation only",
            "30 computers available",
            "Report 10 minutes before start time",
            "Only lab-provided computer and platform allowed",
            "Multiple rounds with increasing difficulty",
            "System tampering results in disqualification",
            "Maintain discipline and respect equipment"
        ]
    },
    {
        event: "Spot Dance: BeatVerse Battle",
        fee: "₹100",
        duration: "3 minutes per performance",
        venue: "To be announced",
        rules: [
            "Individual participation only",
            "Songs provided by organizers - no changes allowed",
            "Maximum 3 minutes per performance",
            "Continuous dancing required - no pauses",
            "Properties provided on spot - use creatively",
            "Any genre: Bollywood, Western, Folk, Hip-Hop",
            "Evaluation based on creativity and property use"
        ]
    },
    {
        event: "Treasure Hunt",
        fee: "Team event",
        duration: "Multiple rounds",
        venue: "Campus",
        rules: [
            "Teams of exactly 4 members",
            "3 rounds: Activities, Logical & Thinking, Final Hunt",
            "Top 12 teams qualify from Round 1",
            "4 teams reach final hunt",
            "Time tracked - fastest completion wins",
            "Do not tamper with clues or materials",
            "No cheating or interfering with other teams",
            "Stay in accessible areas only",
            "Tie-breaker determines winner if needed"
        ]
    },
    {
        event: "Spot Photography",
        fee: "₹50",
        duration: "Limited time",
        venue: "Campus",
        rules: [
            "Theme announced on the spot",
            "Only mobile photography - no DSLR or drone",
            "Basic edits only: crop, brightness, contrast",
            "No filters or AI editing",
            "Submit one photo in .JPG/.JPEG format (max 10MB)",
            "Limited time to click and submit",
            "Photo must be original and taken during event",
            "Judging: creativity, theme relevance, composition"
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

                    {/* Event Cancellation Notice */}
                    <Alert className="mb-12 bg-orange-500/10 border-orange-500/30 text-orange-300">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-lg font-semibold">
                            <strong>Event Cancellation Policy:</strong> In case of insufficient participation,
                            any event is subject to cancellation. Participants will be notified in advance
                            if cancellation occurs.
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
                                        <CardTitle className="text-xl font-bold text-purple-300 mb-2">
                                            {event.event}
                                        </CardTitle>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                                                Fee: {event.fee}
                                            </Badge>
                                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                                                Duration: {event.duration}
                                            </Badge>
                                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                                                Venue: {event.venue}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-lg font-semibold text-purple-300 mb-2">Rules & Guidelines</h4>
                                                <ul className="space-y-2">
                                                    {event.rules.map((rule, idx) => (
                                                        <li key={idx} className="flex items-start text-cyan-200/80">
                                                            <Info className="w-4 h-4 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                                                            <span>{rule}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {event.judging && (
                                                <div>
                                                    <h4 className="text-lg font-semibold text-purple-300 mb-2">Judging Criteria</h4>
                                                    <ul className="space-y-1">
                                                        {event.judging.map((criteria, idx) => (
                                                            <li key={idx} className="text-cyan-200/80 text-sm">
                                                                • {criteria}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {event.evaluation && (
                                                <div>
                                                    <h4 className="text-lg font-semibold text-purple-300 mb-2">Evaluation Criteria</h4>
                                                    <ul className="space-y-1">
                                                        {event.evaluation.map((criteria, idx) => (
                                                            <li key={idx} className="text-cyan-200/80 text-sm">
                                                                • {criteria}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {event.coordinators && (
                                                <div>
                                                    <h4 className="text-lg font-semibold text-purple-300 mb-2">Event Coordinators</h4>
                                                    <div className="space-y-1">
                                                        {event.coordinators.map((coordinator, idx) => (
                                                            <div key={idx} className="text-cyan-200/80 text-sm">
                                                                <strong>{coordinator.name}</strong>: {coordinator.phone}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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
                        <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden max-w-4xl mx-auto">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-cyan-300 mb-4">Questions or Clarifications?</h3>
                                <p className="text-cyan-200/80 mb-6">
                                    If you have any questions about the rules or need clarification,
                                    please contact our organizing committee or specific event coordinators.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-cyan-300 mb-3">General Contact</h4>
                                        <div className="space-y-2">
                                            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 block w-fit mx-auto">
                                                Email: pragyan2025@college.edu
                                            </Badge>
                                            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 block w-fit mx-auto">
                                                Phone: +91-XXXX-XXXX
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-cyan-300 mb-3">Event-Specific Coordinators</h4>
                                        <div className="space-y-2 text-sm text-cyan-200/80">
                                            <div><strong>IdeaSynth:</strong> Jeffy John T (8129495761), Athul (9037184607)</div>
                                            <div><strong>Golazo:</strong> Vishnu C.S (7736191701), Gokul P (6238285908)</div>
                                            <div><strong>Other Events:</strong> Contact general committee</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
