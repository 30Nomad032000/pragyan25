"use client"

import { AnimatedPostersBackground } from "@/components/ui/animated-posters-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock, MapPin, Star, Timer } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"

const events = [
    {
        id: 'code-loom',
        name: 'Code Loom',
        image: '/1.png',
        description: 'Weave your digital magic! Design and build a stunning, functional website from scratch. Put your HTML, CSS, and creativity to the test to craft the ultimate online experience.',
        date: 'October 16, 2025',
        time: '9:30 AM - 12:30 PM',
        location: 'AI Lab 1',
        participants: '50',
        category: 'Web Designing',
        duration: '3 hrs',
        prize: '₹4,000'
    },
    {
        id: 'bug-ex',
        name: 'Bug Ex',
        image: '/5.png',
        description: 'Sharpen your analytical skills and become a debugging detective. Race against the clock to find, fix, and optimize broken code, restoring order to the digital world.',
        date: 'October 16, 2025',
        time: '9:30 AM - 11:30 AM',
        location: 'MCA Lab',
        participants: '30',
        category: 'Code Debugging',
        duration: '100 mins (1 hr 40 min)',
        prize: '₹4,000'
    },
    {
        id: 'trail-hack',
        name: 'Trail Hack',
        image: '/8.png',
        description: 'A mind-bending race against time! Decode clues, solve puzzles, and navigate the terrain to uncover the hidden treasure before your competitors.',
        date: 'October 16, 2025',
        time: '10:00 AM - 3:00 PM',
        location: 'S3 classroom, Elective Classroom',
        participants: '40',
        category: 'Treasure Hunt',
        duration: '5 hrs',
        prize: '₹7,000'
    },
    {
        id: 'click-clash',
        name: 'Click Clash',
        image: '/3.png',
        description: 'Capture the extraordinary in the everyday. Participants must roam and find the most compelling subjects to photograph, turning fleeting moments into timeless visual stories.',
        date: 'October 16, 2025',
        time: '10:30 AM - 2:30 PM',
        location: 'AI Lab 2',
        participants: '25',
        category: 'Spot Photography',
        duration: '4 hrs',
        prize: '₹3,000'
    },
    {
        id: 'idea-synth',
        name: 'Idea Synth',
        image: '/7.png',
        description: 'The future belongs to those who can communicate with AI. Craft the perfect prompts to generate stunning visuals or complex text, demonstrating your mastery of AI tools and creative direction.',
        date: 'October 16, 2025',
        time: '11:00 AM - 1:00 PM',
        location: 'AI Lab 2',
        participants: '20',
        category: 'Prompt Designing',
        duration: '2 hrs',
        prize: '₹4,000'
    },
    {
        id: 'clip-forge',
        name: 'Clip Forge',
        image: '/9.png',
        description: 'Go viral with your creativity! Plan, shoot, and edit a short, impactful video (Reel) that captures attention and tells a story in 30 seconds or less.',
        date: 'October 16, 2025',
        time: '10:30 AM - 2:00 PM',
        location: 'Elective classroom',
        participants: '25',
        category: 'Reels Making',
        duration: '3 hrs',
        prize: '₹4,000'
    },
    {
        id: 'trialis',
        name: 'Trialis',
        image: '/10.png',
        description: 'Quick thinking and even quicker reflexes are key. Navigate a series of fast-paced, challenging mini-games, aiming for high scores and bragging rights in a multi-round competition.',
        date: 'October 16, 2025',
        time: '12:30 PM - 2:30 PM',
        location: 'MCA Lab',
        participants: '30',
        category: 'Mini Level Games',
        duration: '2 hrs',
        prize: '₹3,000'
    },
    {
        id: 'beat-verse',
        name: 'Beat Verse',
        image: '/2.png',
        description: 'Feel the rhythm and let loose! This event challenges participants to spontaneously choreograph and perform a dance, showcasing raw talent and energy to an unpredictable beat.',
        date: 'October 16, 2025',
        time: '1:00 PM - 3:00 PM',
        location: 'MCA Corridor(2nd floor), Seminar Hall',
        participants: '30',
        category: 'Spontaneous Dance',
        duration: '2 hrs',
        prize: '₹4,000'
    },
    {
        id: 'golazo',
        name: 'Golazo',
        image: '/6.png',
        description: 'Lace up your digital boots and take to the pitch! This is a competitive tournament for eFootball Konami.Prove your skills, strategize your way to victory, and compete against the players for prizes',
        date: 'October 16, 2025',
        time: '12:30 PM - 3:00 PM',
        location: 'AI Lab 1',
        participants: '20',
        category: 'E-Game',
        duration: '2.5 hrs',
        prize: '₹3,000'
    }
]

const funzoneEvents = [
    {
        id: 'play-grid',
        name: 'Play Grid (PS4/PS5) Gaming Arena',
        image: '/11.png',
        description: 'Compete, challenge friends, and enjoy the latest titles on PlayStation 4 and PlayStation 5 consoles. Whether you\'re a pro or casual player, grab a controller and jump into the action!',
        date: 'October 16, 2025',
        time: 'All Day',
        location: 'MCA S1',
        participants: 'Unlimited',
        category: 'Fun Zone',
        duration: 'All Day',
        prize: '₹50',
        'entry-fee': '₹50'
    },
    {
        id: 'virtux',
        name: 'VirtuX: Virtual Reality Experience',
        image: '/4.png',
        description: 'Dive into immersive new worlds with cutting-edge Virtual Reality headsets! Experience heart-pounding games, incredible simulations, and truly interactive adventures. A mind-blowing experience for everyone.',
        date: 'October 17, 2025',
        time: 'All Day',
        location: 'MCA S1',
        participants: 'Unlimited',
        category: 'Fun Zone',
        duration: 'All Day',
        prize: '₹100',
        'entry-fee': '₹100'
    }
]

export default function EventsPage({ searchParams }: { searchParams: { id?: string } }) {
    const [selectedEvent, setSelectedEvent] = useState(() => {
        if (searchParams.id) {
            const event = events.find(e => e.id === searchParams.id) ?? funzoneEvents.find(e => e.id === searchParams.id)
            return event || events[0]
        }
        return null
    })

    const detailsRef = useRef<HTMLDivElement>(null)

    const handleEventSelect = (event: typeof events[0] | typeof funzoneEvents[0]) => {
        setSelectedEvent(event)

        // Check if we're on mobile (screen width < 1024px)
        if (window.innerWidth < 1024) {
            // Scroll to details section on mobile
            setTimeout(() => {
                detailsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }, 100)
        }
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden pt-28">
            {/* Background Component */}
            <AnimatedPostersBackground
                opacity={0.3}
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
                <div className="max-w-7xl mx-auto">
                    <div className={`grid grid-cols-1 ${selectedEvent ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-6 lg:gap-8 transition-all duration-500 ease-in-out`}>
                        {/* Event Details Panel */}
                        <div className={`lg:col-span-1 order-1 lg:order-2 transition-all duration-500 ease-in-out ${selectedEvent ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95 pointer-events-none'}`} ref={detailsRef}>
                            <Card className="sticky top-8 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out transform shadow-2xl shadow-black/50 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5 before:rounded-2xl before:pointer-events-none">
                                {/* Glass reflection effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30 rounded-2xl pointer-events-none"></div>
                                {/* Mobile scroll indicator */}
                                <div className="lg:hidden absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"></div>
                                <CardContent className={`p-6 transition-all duration-500 ease-in-out relative z-10 ${selectedEvent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    {selectedEvent && (
                                        <>
                                            <div className="text-center mb-6">
                                                <div className="aspect-square w-full max-w-xs mx-auto mb-4">
                                                    <img
                                                        src={selectedEvent.image}
                                                        alt={selectedEvent.name}
                                                        className="w-full h-full object-contain rounded-xl"
                                                    />
                                                </div>
                                                <h2 className="text-2xl font-bold text-white mb-2">
                                                    {selectedEvent.name}
                                                </h2>
                                                <div className="flex justify-center mb-4">
                                                    <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                                                        {selectedEvent.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3 text-white/80">
                                                    <Calendar className="w-5 h-5 text-white/60" />
                                                    <div>
                                                        <p className="text-sm text-white/50">Date</p>
                                                        <p className="font-medium text-white">{selectedEvent.date}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 text-white/80">
                                                    <Clock className="w-5 h-5 text-white/60" />
                                                    <div>
                                                        <p className="text-sm text-white/50">Time</p>
                                                        <p className="font-medium text-white">{selectedEvent.time}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 text-white/80">
                                                    <MapPin className="w-5 h-5 text-white/60" />
                                                    <div>
                                                        <p className="text-sm text-white/50">Location</p>
                                                        <p className="font-medium text-white">{selectedEvent.location}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 text-white/80">
                                                    <Clock className="w-5 h-5 text-white/60" />
                                                    <div>
                                                        <p className="text-sm text-white/50">Duration</p>
                                                        <p className="font-medium text-white">{selectedEvent.duration}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 text-white/80">
                                                    <Star className="w-5 h-5 text-white/60" />
                                                    <div>
                                                        <p className="text-sm text-white/50">
                                                            {selectedEvent.category === 'Fun Zone' ? 'Entry Fee' : 'Prize Pool'}
                                                        </p>
                                                        <p className="font-medium text-yellow-300">
                                                            {selectedEvent.category === 'Fun Zone' ? (selectedEvent as any)['entry-fee'] : selectedEvent.prize}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg">
                                                <h4 className="text-white font-semibold mb-2">Description</h4>
                                                <p className="text-white/80 text-sm leading-relaxed">
                                                    {selectedEvent.description}
                                                </p>
                                            </div>

                                            <div className="mt-6">
                                                {selectedEvent.category === 'Fun Zone' ? (
                                                    <Button
                                                        disabled
                                                        className="w-full bg-gradient-to-r from-purple-500 via-purple-400 to-cyan-500 hover:from-purple-400 hover:via-purple-300 hover:to-cyan-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-400/50 border border-purple-400/60 relative overflow-hidden group opacity-50 cursor-not-allowed"
                                                    >
                                                        <span className="relative z-10 flex items-center justify-center">
                                                            Only Spot Registerations
                                                            &nbsp;<Timer />
                                                        </span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                                    </Button>
                                                ) : (
                                                    <Link href={`/register/${selectedEvent.id}`}>
                                                        <Button className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60 relative overflow-hidden group">
                                                            <span className="relative z-10 flex items-center justify-center">
                                                                Register Now
                                                                &nbsp; <Timer />
                                                            </span>
                                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Events Grid */}
                        <div className={`${selectedEvent ? 'lg:col-span-2' : 'lg:col-span-1'} order-2 lg:order-1 transition-all duration-500 ease-in-out`}>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 ${selectedEvent ? 'xl:grid-cols-3' : 'lg:grid-cols-3'} gap-4 sm:gap-6 transition-all duration-500 ease-in-out`}>
                                {events.map((event, index) => (
                                    <Card
                                        key={event.id}
                                        className={`group cursor-pointer bg-black/40 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 ${selectedEvent?.id === event.id ? 'ring-2 ring-cyan-400/50 shadow-cyan-500/30' : ''
                                            }`}
                                        onClick={() => selectedEvent?.id === event.id ? setSelectedEvent(null) : handleEventSelect(event)}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="relative aspect-square">
                                            <img
                                                src={event.image}
                                                alt={event.name}
                                                className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 rounded-xl"></div>

                                            {/* Event Info Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                                    {event.name}
                                                </h3>
                                                <div className="flex items-center space-x-2 text-cyan-200/80 text-sm">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-cyan-200/80 text-sm mt-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-3 right-3">
                                                <span className="bg-cyan-500/20 backdrop-blur-sm text-cyan-300 px-3 py-1 rounded-full text-xs font-medium border border-cyan-400/30">
                                                    {event.category}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Funzone Events Section */}
                            <div className="mt-8">
                                <div className={`grid grid-cols-1 ${selectedEvent ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4 sm:gap-6 transition-all duration-500 ease-in-out`}>
                                    {funzoneEvents.map((event, index) => (
                                        <Card
                                            key={event.id}
                                            className={`group cursor-pointer bg-black/40 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/60 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${selectedEvent?.id === event.id ? 'ring-2 ring-purple-400/50 shadow-purple-500/30' : ''
                                                }`}
                                            onClick={() => selectedEvent?.id === event.id ? setSelectedEvent(null) : handleEventSelect(event)}
                                            style={{ animationDelay: `${(events.length + index) * 100}ms` }}
                                        >
                                            <div className="relative aspect-square">
                                                <img
                                                    src={event.image}
                                                    alt={event.name}
                                                    className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 rounded-xl"></div>

                                                {/* Event Info Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                                                        {event.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 text-purple-200/80 text-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{event.date}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-purple-200/80 text-sm mt-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                </div>

                                                {/* Category Badge */}
                                                <div className="absolute top-3 right-3">
                                                    <span className="bg-purple-500/20 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-400/30">
                                                        {event.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}