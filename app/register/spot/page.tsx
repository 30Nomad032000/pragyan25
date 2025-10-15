"use client"

import { Loader2, Users, Calendar, Clock, MapPin, Star, Timer, Code, Bug, Camera, Palette, Video, Gamepad2, Music, Search, Zap, CheckCircle, X } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import FaultyTerminalBackground from "../../../components/ui/custom-background"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { registerUser, createRegistration, getEventBySlug, getUserByEmail } from "../../../lib/supabase"

// Event pricing configuration
const EVENT_PRICING: Record<string, { amount: number; currency: string; description: string }> = {
    "code-loom": {
        amount: 100,
        currency: "INR",
        description: "Code Loom Registration Fee",
    },
    "beat-verse": {
        amount: 100,
        currency: "INR",
        description: "Beat Verse Registration Fee",
    },
    "click-clash": {
        amount: 50,
        currency: "INR",
        description: "Click Clash Registration Fee",
    },
    "bug-x": {
        amount: 100,
        currency: "INR",
        description: "Bug X Registration Fee",
    },
    "idea-synth": {
        amount: 100,
        currency: "INR",
        description: "Idea Synth Registration Fee",
    },
    "trail-hack": {
        amount: 400,
        currency: "INR",
        description: "Trail Hack Registration Fee",
    },
    "clip-forge": {
        amount: 200,
        currency: "INR",
        description: "Clip Forge Registration Fee",
    },
    "trialis": {
        amount: 50,
        currency: "INR",
        description: "Trialis Registration Fee",
    },
    "golazo": {
        amount: 100,
        currency: "INR",
        description: "Golazo Registration Fee",
    },
};

const events = [
    {
        id: 'code-loom',
        name: 'Code Loom',
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
        id: 'bug-x',
        name: 'Bug X',
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
        description: 'Feel the rhythm and let loose! This event challenges participants to spontaneously choreograph and perform a dance, showcasing raw talent and energy to an unpredictable beat.',
        date: 'October 16, 2025',
        time: '1:00 PM - 3:00 PM',
        location: 'MCA Corridor(2nd floor), Seminar Hall',
        participants: '30',
        category: 'Spontaneous Dance',
        duration: '2 hrs',
        prize: '₹3,000'
    },
    {
        id: 'golazo',
        name: 'Golazo',
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


// Zod schema for form validation
const spotRegistrationSchema = z.object({
    firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
    organization: z.string().min(1, "College/Organization is required"),
    position: z.string().optional(),
    experience: z.string().optional(),
    interests: z.string().optional(),
    additionalInfo: z.string().optional(),
    selectedEvent: z.string().min(1, "Event selection is required"),
    teammates: z.array(z.object({
        name: z.string().min(1, "Teammate name is required").min(2, "Teammate name must be at least 2 characters"),
        email: z.string().min(1, "Teammate email is required").email("Please enter a valid email address"),
        phone: z.string().min(10, "Teammate phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
    })).optional(),
})

type SpotRegistrationFormData = z.infer<typeof spotRegistrationSchema>

export default function SpotRegistrationPage() {
    const [formError, setFormError] = useState<string | null>(null)
    const [isSubmittingForm, setIsSubmittingForm] = useState(false)
    const [teammates, setTeammates] = useState<Array<{ name: string, email: string, phone: string }>>([])
    const [selectedEvent, setSelectedEvent] = useState<string>("")
    const [isSuccess, setIsSuccess] = useState(false)

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<SpotRegistrationFormData>({
        resolver: zodResolver(spotRegistrationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            organization: "",
            position: "",
            experience: "",
            interests: "",
            additionalInfo: "",
            selectedEvent: "",
            teammates: [],
        },
    })

    const watchedSelectedEvent = watch("selectedEvent")

    // Function to get icon based on event category
    const getCategoryIcon = (category: string) => {
        const categoryLower = category.toLowerCase()
        if (categoryLower.includes('web') || categoryLower.includes('design')) return Palette
        if (categoryLower.includes('debug') || categoryLower.includes('code')) return Bug
        if (categoryLower.includes('photography') || categoryLower.includes('photo')) return Camera
        if (categoryLower.includes('prompt') || categoryLower.includes('ai')) return Zap
        if (categoryLower.includes('video') || categoryLower.includes('reel')) return Video
        if (categoryLower.includes('game') || categoryLower.includes('mini')) return Gamepad2
        if (categoryLower.includes('dance') || categoryLower.includes('music')) return Music
        if (categoryLower.includes('treasure') || categoryLower.includes('hunt')) return Search
        return Code // Default icon
    }

    // Get current event details
    const currentEvent = events.find(event => event.id === watchedSelectedEvent)

    // Teammate management functions
    const addTeammate = () => {
        if (teammates.length < 3) { // Maximum 3 teammates (4 total including team leader)
            const newTeammate = { name: "", email: "", phone: "" }
            const updatedTeammates = [...teammates, newTeammate]
            setTeammates(updatedTeammates)
            setValue("teammates", updatedTeammates)
        }
    }

    const removeTeammate = (index: number) => {
        const updatedTeammates = teammates.filter((_, i) => i !== index)
        setTeammates(updatedTeammates)
        setValue("teammates", updatedTeammates)
    }

    const updateTeammate = (index: number, field: 'name' | 'email' | 'phone', value: string) => {
        const updatedTeammates = teammates.map((teammate, i) =>
            i === index ? { ...teammate, [field]: value } : teammate
        )
        setTeammates(updatedTeammates)
        setValue("teammates", updatedTeammates)
    }


    const handleRegistration = async (data: SpotRegistrationFormData) => {
        setIsSubmittingForm(true)
        setFormError(null)

        try {
            const orderId = `SPOT_ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            const eventPricing = EVENT_PRICING[data.selectedEvent]

            // Get or create user in Supabase
            let user = await getUserByEmail(data.email)
            if (!user) {
                user = await registerUser({
                    email: data.email,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    phone: data.phone,
                    organization: data.organization,
                    position: data.position,
                    experience: data.experience,
                    interests: data.interests,
                    additional_info: data.additionalInfo,
                })
            }

            // Get event details from Supabase
            const event = await getEventBySlug(data.selectedEvent)

            // Create registration in Supabase
            await createRegistration({
                user_id: user.id,
                event_id: event.id,
                order_id: orderId,
                payment_amount: eventPricing.amount,
                payment_currency: eventPricing.currency,
                payment_status: 'spot', // Mark as spot registration
                teammates: data.teammates || null,
            })

            console.log('Spot registration saved to Supabase successfully')
            setIsSuccess(true)
            toast.success('Registration successful!', {
                description: 'You have been registered for the event.',
                duration: 5000,
            })

        } catch (error) {
            console.error('Registration error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.'
            setFormError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsSubmittingForm(false)
        }
    }

    return (
        <div className="min-h-screen relative pt-32 md:pt-2">
            <FaultyTerminalBackground />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-pulse"></div>

            {/* Glass Overlay Container */}
            <div className="relative flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 z-10 min-h-screen">
                <div className="w-full max-w-4xl mx-auto">
                    {isSuccess ? (
                        <Card className="w-full bg-black/30 backdrop-blur-xl border border-green-500/40 shadow-2xl shadow-green-500/30 rounded-2xl">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-green-300 mb-2">Registration Successful!</h2>
                                <p className="text-cyan-300/80 mb-4">You have been successfully registered for the event.</p>
                                <Button
                                    onClick={() => {
                                        setIsSuccess(false)
                                        setSelectedEvent("")
                                        setValue("selectedEvent", "")
                                        setValue("firstName", "")
                                        setValue("lastName", "")
                                        setValue("email", "")
                                        setValue("phone", "")
                                        setValue("organization", "")
                                        setTeammates([])
                                    }}
                                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium"
                                >
                                    Register Another Event
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                            {/* Left Side - Event Details */}
                            <div className="flex items-center justify-center order-1 lg:order-1">
                                <Card className="w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl transition-all duration-500 hover:shadow-cyan-500/40 hover:border-cyan-400/60 hover:scale-[1.02] group">
                                    <CardContent className="p-6">
                                        {currentEvent ? (
                                            <div className="space-y-6">
                                                {/* Event Header */}
                                                <div className="text-center">
                                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                        {(() => {
                                                            const IconComponent = getCategoryIcon(currentEvent.category);
                                                            return <IconComponent className="w-8 h-8 text-cyan-400" />;
                                                        })()}
                                                    </div>
                                                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                                        {currentEvent.name}
                                                    </h2>
                                                    <p className="text-cyan-300/80 text-sm mb-4">{currentEvent.category}</p>
                                                    <div className="flex items-center justify-center space-x-3">
                                                        <div className="relative">
                                                            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                                                            <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                                                        </div>
                                                        <span className="text-sm text-cyan-300/90 font-medium tracking-wider uppercase">
                                                            Spot Registration Open
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Event Description */}
                                                <div>
                                                    <p className="text-cyan-300/90 text-sm leading-relaxed">
                                                        {currentEvent.description}
                                                    </p>
                                                </div>

                                                {/* Event Details Grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-cyan-300/80">Date:</span>
                                                        <span className="text-cyan-200 font-medium">{currentEvent.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-cyan-300/80">Time:</span>
                                                        <span className="text-cyan-200 font-medium">{currentEvent.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-cyan-300/80">Location:</span>
                                                        <span className="text-cyan-200 font-medium">{currentEvent.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Timer className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-cyan-300/80">Duration:</span>
                                                        <span className="text-cyan-200 font-medium">{currentEvent.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 sm:col-span-2">
                                                        <Star className="w-4 h-4 text-yellow-400" />
                                                        <span className="text-cyan-300/80">Prize:</span>
                                                        <span className="text-yellow-300 font-medium">{currentEvent.prize}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                                    <Calendar className="w-8 h-8 text-cyan-400" />
                                                </div>
                                                <h3 className="text-xl font-semibold text-cyan-200 mb-2">Select an Event</h3>
                                                <p className="text-cyan-300/70">Choose an event from the dropdown to view details</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Side - Registration Form */}
                            <div className="flex items-center justify-center order-2 lg:order-2 pt-2 md:pt-24">
                                <div className="relative w-full max-w-sm sm:max-w-md">
                                    <Card className="w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/40">
                                        <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                                            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                                            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                                Spot Registration
                                            </CardTitle>
                                            <CardDescription className="text-cyan-300/80 text-center text-sm sm:text-base">
                                                Register for any event on the spot
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-4 sm:p-6">
                                            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-3">
                                                {/* Event Selection Dropdown */}
                                                <div className="space-y-1">
                                                    <Label htmlFor="selectedEvent" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                        Select Event
                                                    </Label>
                                                    <Select
                                                        value={watchedSelectedEvent}
                                                        onValueChange={(value) => {
                                                            setValue("selectedEvent", value)
                                                            setSelectedEvent(value)
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-full bg-black/40 border-cyan-500/50 text-cyan-100 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50">
                                                            <SelectValue placeholder="Choose an event to register" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-black/90 border-cyan-500/30">
                                                            {events.map((event) => (
                                                                <SelectItem
                                                                    key={event.id}
                                                                    value={event.id}
                                                                    className="text-cyan-100 hover:bg-cyan-500/30 hover:text-cyan-50 focus:bg-cyan-500/30 focus:text-cyan-50 data-[highlighted]:bg-cyan-500/30 data-[highlighted]:text-cyan-50"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        {(() => {
                                                                            const IconComponent = getCategoryIcon(event.category);
                                                                            return <IconComponent className="w-4 h-4 text-cyan-400" />;
                                                                        })()}
                                                                        <span className="font-medium">{event.name}</span>
                                                                        <span className="text-cyan-400/80 text-xs">({event.category})</span>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="flex items-center">
                                                        {errors.selectedEvent && (
                                                            <p className="text-red-400 text-xs animate-in slide-in-from-top-1 duration-200">
                                                                {errors.selectedEvent.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Name Fields */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    <div className="space-y-1">
                                                        <Label htmlFor="firstName" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                            First Name
                                                        </Label>
                                                        <Input
                                                            id="firstName"
                                                            {...register("firstName")}
                                                            placeholder="Enter your first name"
                                                            className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                        />
                                                        <div className="flex items-center">
                                                            {errors.firstName && (
                                                                <p className="text-red-400 text-xs animate-in slide-in-from-top-1 duration-200">
                                                                    {errors.firstName.message}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label htmlFor="lastName" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                            Last Name
                                                        </Label>
                                                        <Input
                                                            id="lastName"
                                                            {...register("lastName")}
                                                            placeholder="Enter your last name"
                                                            className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                        />
                                                        <div className="flex items-center">
                                                            {errors.lastName && (
                                                                <p className="text-red-400 text-xs animate-in slide-in-from-top-1 duration-200">
                                                                    {errors.lastName.message}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="space-y-1">
                                                    <Label htmlFor="email" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                        Email Address
                                                    </Label>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        {...register("email")}
                                                        placeholder="Enter your email address"
                                                        className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                    />
                                                    <div className="flex items-center">
                                                        {errors.email && (
                                                            <p className="text-red-400 text-xs animate-in slide-in-from-top-1 duration-200">
                                                                {errors.email.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Phone */}
                                                <div className="space-y-1">
                                                    <Label htmlFor="phone" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        type="tel"
                                                        id="phone"
                                                        {...register("phone")}
                                                        placeholder="Enter your phone number"
                                                        className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                    />
                                                    <div className="flex items-center">
                                                        {errors.phone && (
                                                            <p className="text-red-400 text-xs animate-in slide-in-from-top-1 duration-200">
                                                                {errors.phone.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Organization */}
                                                <div className="space-y-1">
                                                    <Label htmlFor="organization" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                        College
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        id="organization"
                                                        {...register("organization")}
                                                        placeholder="Enter your college/organization"
                                                        className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                    />
                                                    <div className="flex items-center">
                                                        {errors.organization && (
                                                            <p className="text-red-400 text-xs animate-in slide-in-from-top-1 duration-200">
                                                                {errors.organization.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Teammate Fields for Trail Hack */}
                                                {watchedSelectedEvent === 'trail-hack' && (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <Users className="w-5 h-5 text-cyan-400" />
                                                                <Label className="text-cyan-300 font-medium text-sm tracking-wide">
                                                                    Team Members (Optional)
                                                                </Label>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                onClick={addTeammate}
                                                                disabled={teammates.length >= 3}
                                                                className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 hover:border-cyan-400/70 px-3 py-1 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Users className="w-4 h-4 mr-1" />
                                                                Add Member
                                                            </Button>
                                                        </div>

                                                        {teammates.length > 0 && (
                                                            <div className="text-xs text-cyan-300/70 mb-2">
                                                                Maximum 3 teammates allowed (4 total including you)
                                                            </div>
                                                        )}

                                                        {teammates.map((teammate, index) => (
                                                            <div key={index} className="bg-black/20 border border-cyan-500/30 rounded-lg p-4 space-y-3">
                                                                <div className="flex items-center justify-between">
                                                                    <h4 className="text-cyan-300 font-medium text-sm">
                                                                        Team Member {index + 1}
                                                                    </h4>
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => removeTeammate(index)}
                                                                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/50 hover:border-red-400/70 p-1 rounded-lg transition-all duration-300"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </Button>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <div className="space-y-1">
                                                                        <Label className="text-cyan-300 font-medium text-xs tracking-wide">
                                                                            Full Name
                                                                        </Label>
                                                                        <Input
                                                                            value={teammate.name}
                                                                            onChange={(e) => updateTeammate(index, 'name', e.target.value)}
                                                                            placeholder="Enter teammate's full name"
                                                                            className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                                        />
                                                                    </div>

                                                                    <div className="space-y-1">
                                                                        <Label className="text-cyan-300 font-medium text-xs tracking-wide">
                                                                            Email Address
                                                                        </Label>
                                                                        <Input
                                                                            type="email"
                                                                            value={teammate.email}
                                                                            onChange={(e) => updateTeammate(index, 'email', e.target.value)}
                                                                            placeholder="Enter teammate's email"
                                                                            className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                                        />
                                                                    </div>

                                                                    <div className="space-y-1">
                                                                        <Label className="text-cyan-300 font-medium text-xs tracking-wide">
                                                                            Phone Number
                                                                        </Label>
                                                                        <Input
                                                                            type="tel"
                                                                            value={teammate.phone}
                                                                            onChange={(e) => updateTeammate(index, 'phone', e.target.value)}
                                                                            placeholder="Enter teammate's phone number"
                                                                            className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Registration Fee Display */}
                                                {currentEvent && (
                                                    <div className="bg-black/40 rounded-lg p-4 border border-cyan-500/30">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-cyan-300 font-medium text-sm">Registration Fee</span>
                                                            <span className="text-cyan-400 font-bold">₹{EVENT_PRICING[watchedSelectedEvent]?.amount}</span>
                                                        </div>
                                                        <p className="text-cyan-300/70 text-xs mt-1">{EVENT_PRICING[watchedSelectedEvent]?.description}</p>
                                                    </div>
                                                )}

                                                {/* Form Error Display */}
                                                <div className="overflow-hidden">
                                                    {formError && (
                                                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-3 animate-in slide-in-from-top-2 duration-300">
                                                            <div className="flex items-center space-x-2">
                                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                                <p className="text-red-400 text-sm font-medium">Registration Error</p>
                                                            </div>
                                                            <p className="text-red-300 text-xs mt-1">{formError}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting || isSubmittingForm || !watchedSelectedEvent}
                                                    className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60 relative overflow-hidden group mt-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                                >
                                                    {(isSubmitting || isSubmittingForm) ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            <span className="relative z-10">
                                                                {isSubmitting ? 'Validating Form...' : 'Registering...'}
                                                            </span>
                                                        </>
                                                    ) : !watchedSelectedEvent ? (
                                                        <>
                                                            <span className="relative z-10">Select an Event First</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="relative z-10">Complete Spot Registration</span>
                                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}