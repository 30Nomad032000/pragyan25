"use client"

/// <reference path="../../../types/cashfree.d.ts" />
import { load } from "@cashfreepayments/cashfree-js"
import { CreditCard, Loader2, Plus, X, Users, Calendar, Clock, MapPin, Star, Timer, Code, Bug, Camera, Palette, Video, Gamepad2, Music, Search, Zap, Shield, CheckCircle, Info } from "lucide-react"
import { notFound } from "next/navigation"
import React, { useEffect, useState, use } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import FaultyTerminalBackground from "../../../components/ui/custom-background"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../../components/ui/sheet"
import { CreateOrderRequest, CreateOrderResponse, EVENT_PRICING, PaymentFormData } from "../../../lib/types/payment"
import { registerUser, createRegistration, getEventBySlug, getUserByEmail } from "../../../lib/supabase"

// Type definitions for Cashfree SDK
interface CashfreeInstance {
    checkout(options: {
        paymentSessionId: string;
        redirectTarget: string;
    }): Promise<CashfreeCheckoutResult>;
}

interface CashfreeCheckoutResult {
    error?: any;
    redirect?: boolean;
    paymentDetails?: {
        paymentMessage: string;
    };
}

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
        id: 'bug-x',
        name: 'Bug X',
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
        prize: '₹3,000'
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

// Event-specific rules mapping
const eventRules: Record<string, {
    rules: string[]
    coordinators?: { name: string; phone: string }[]
    judging?: string[]
    evaluation?: string[]
}> = {
    'idea-synth': {
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
    'clip-forge': {
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
        ],
        coordinators: [
            { name: "Arunima A.P", phone: "8891446372" },
            { name: "Abin Sebastian", phone: "9567108534" }
        ]
    },
    'golazo': {
        rules: [
            "Team strength: 3100 maximum",
            "No double booster allowed",
            "Single elimination knockout format",
            "Normal knockout: 6 minutes per match",
            "Use own network connection",
        ],
        coordinators: [
            { name: "Vishnu C.S", phone: "7736191701" },
            { name: "Gokul P", phone: "6238285908" }
        ]
    },
    'bug-x': {
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
        ], coordinators: [
            { name: "Jomon Vincent", phone: "9074849868" },
            { name: "Joyal P", phone: "9946117762" }
        ]

    },
    'code-loom': {
        rules: [
            "Individual participation only",
            "30 computers available",
            "Report 10 minutes before start time",
            "Only lab-provided computer and platform allowed",
            "Multiple rounds with increasing difficulty",
            "System tampering results in disqualification",
            "Maintain discipline and respect equipment"
        ]
        , coordinators: [
            { name: "Aswathy Babu", phone: "8606014492" },
            { name: "K Govindan", phone: "7025895728" }
        ]
    },
    'beat-verse': {
        rules: [
            "Individual participation only",
            "Songs provided by organizers - no changes allowed",
            "Maximum 3 minutes per performance",
            "Continuous dancing required - no pauses",
            "Properties provided on spot - use creatively",
            "Any genre: Bollywood, Western, Folk, Hip-Hop",
            "Evaluation based on creativity and property use"
        ],
        coordinators: [
            { name: "Abhinav", phone: "9526184769" },
            { name: "Gladia", phone: "9778535808" }
        ]
    },
    'trail-hack': {
        rules: [
            "Teams of exactly 4 members",
            "3 rounds: Activities, Logical & Thinking, Final Hunt",
            "Top 12 teams qualify from Round 1",
            "4 teams reach final hunt",
            "Time tracked - fastest completion wins",
            "Do not tamper with clues or materials",
            "No cheating or interfering with other teams",
            "Stay in accessible areas only",
            "Tie-breaker determines winner if needed",
            "Participants registering for the Treasure Hunt event will not be eligible to participate in other events, due to time constraints and overlapping schedules."
        ], coordinators: [
            { name: "Bavin C Jeni", phone: "9656139011" },
            { name: "Shiva", phone: "8547460695" }
        ]
    },
    'click-clash': {
        rules: [
            "Theme announced on the spot",
            "Only mobile photography - no DSLR or drone",
            "Basic edits only: crop, brightness, contrast",
            "No filters or AI editing",
            "Submit one photo in .JPG/.JPEG format (max 10MB)",
            "Limited time to click and submit",
            "Photo must be original and taken during event",
            "Judging: creativity, theme relevance, composition"
        ], coordinators: [
            { name: "Karthik PM", phone: "9567053549" },
            { name: "Abhilash", phone: "9633461686" }
        ]
    },
    'trialis': {
        rules: [
            "Individual participation only",
            "Multiple rounds of mini-games",
            "Quick reflexes and strategic thinking required",
            "Scores tracked across all rounds",
            "No external assistance allowed",
            "Follow all game-specific instructions",
            "Respect other participants and equipment"
        ], coordinators: [
            { name: "Adwaith", phone: "9074548615" },
            { name: "Harikrishnan", phone: "7510533172" }
        ]
    }
}

// Zod schema for form validation
const registrationSchema = z.object({
    firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
    organization: z.string().min(1, "College/Organization is required"),
    position: z.string().optional(),
    experience: z.string().optional(),
    interests: z.string().optional(),
    additionalInfo: z.string().optional(),
    event: z.string().min(1, "Event selection is required"),
    teammates: z.array(z.object({
        name: z.string().min(1, "Teammate name is required").min(2, "Teammate name must be at least 2 characters"),
        email: z.string().min(1, "Teammate email is required").email("Please enter a valid email address"),
        phone: z.string().min(10, "Teammate phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
    })).optional(),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function Page({ params }: { params: Promise<{ formType: string }> }) {
    const resolvedParams = use(params)

    const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null)
    const [sdkLoading, setSdkLoading] = useState(true)
    const [sdkError, setSdkError] = useState<string | null>(null)
    const [formError, setFormError] = useState<string | null>(null)
    const [isSubmittingForm, setIsSubmittingForm] = useState(false)
    const [teammates, setTeammates] = useState<Array<{ name: string, email: string, phone: string }>>([])
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
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
            event: resolvedParams.formType,
            teammates: [],
        },
    })

    const eventNames = events.map(event => event.id)
    const imageUrl = `/${eventNames.indexOf(resolvedParams.formType) + 1}.png`

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

    useEffect(() => {
        if (eventNames.includes(resolvedParams.formType)) {
            setValue("event", resolvedParams.formType)
        } else {
            notFound()
        }
    }, [resolvedParams.formType, setValue])

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



    // Initialize Cashfree SDK using official method
    useEffect(() => {
        const initializeSDK = async () => {
            try {
                setSdkLoading(true)
                setSdkError(null)
                const environment = process.env.NEXT_PUBLIC_CASHFREE_ENVIRONMENT || "sandbox"
                const cashfreeInstance = await load({
                    mode: environment
                }) as CashfreeInstance
                setCashfree(cashfreeInstance)
                console.log('Cashfree SDK initialized successfully')

            } catch (error) {
                console.error('Error loading Cashfree SDK:', error)
                const errorMessage = 'Failed to initialize payment system. Please refresh the page.'
                setSdkError(errorMessage)
                toast.error(errorMessage)
            } finally {
                setSdkLoading(false)
            }
        }

        initializeSDK()
    }, [])

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Rules content component
    const RulesContent = () => {
        const rules = eventRules[resolvedParams.formType];
        if (!rules) return null;

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Rules Section */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                            Event Rules & Guidelines
                        </h4>
                        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg p-4">
                            <div className="space-y-2">
                                <ul className="space-y-2">
                                    {rules.rules.map((rule, idx) => (
                                        <li key={idx} className="flex items-start text-white/80 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Judging Criteria */}
                                {rules.judging && (
                                    <div className="mt-4 pt-3 border-t border-white/10">
                                        <h6 className="text-white font-medium mb-2 text-sm">Judging Criteria:</h6>
                                        <ul className="space-y-1">
                                            {rules.judging.map((criteria, idx) => (
                                                <li key={idx} className="text-white/70 text-xs">
                                                    • {criteria}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Evaluation Criteria */}
                                {rules.evaluation && (
                                    <div className="mt-4 pt-3 border-t border-white/10">
                                        <h6 className="text-white font-medium mb-2 text-sm">Evaluation Criteria:</h6>
                                        <ul className="space-y-1">
                                            {rules.evaluation.map((criteria, idx) => (
                                                <li key={idx} className="text-white/70 text-xs">
                                                    • {criteria}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Details Section */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg flex items-center">
                            <Info className="w-5 h-5 mr-2 text-purple-400" />
                            Event Coordinators
                        </h4>
                        {rules.coordinators && (
                            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg p-4">
                                <div className="space-y-2">
                                    {rules.coordinators.map((coordinator, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5">
                                            <div>
                                                <p className="text-white font-medium text-sm">{coordinator.name}</p>
                                                <p className="text-cyan-300/80 text-xs">Event Coordinator</p>
                                            </div>
                                            <a
                                                href={`tel:${coordinator.phone}`}
                                                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200"
                                            >
                                                {coordinator.phone}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const createOrder = async (data: RegistrationFormData): Promise<CreateOrderResponse> => {
        const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const eventPricing = EVENT_PRICING[resolvedParams.formType]

        try {
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
            const event = await getEventBySlug(resolvedParams.formType)

            // Create registration in Supabase
            await createRegistration({
                user_id: user.id,
                event_id: event.id,
                order_id: orderId,
                payment_amount: eventPricing.amount,
                payment_currency: eventPricing.currency,
                teammates: data.teammates || null,
            })

            console.log('Registration saved to Supabase successfully')
        } catch (error) {
            console.error('Error saving registration to Supabase:', error)
            // Continue with payment even if Supabase save fails
        }

        const orderData: CreateOrderRequest = {
            orderId,
            orderAmount: eventPricing.amount.toString(),
            customerName: `${data.firstName} ${data.lastName}`,
            customerEmail: data.email,
            customerPhone: data.phone,
            eventName: resolvedParams.formType,
        }

        // Add teammate information for trail-hack event
        if (resolvedParams.formType === 'trail-hack' && data.teammates && data.teammates.length > 0) {
            orderData.teammates = data.teammates
        }

        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })

        return await response.json()
    }


    const handlePayment = async (data: RegistrationFormData) => {
        setIsSubmittingForm(true)
        setFormError(null)

        try {
            // Check if Cashfree SDK is loaded
            if (!cashfree) {
                throw new Error('Payment gateway not loaded. Please refresh the page.')
            }

            // Create order
            const orderResponse = await createOrder(data)

            if (!orderResponse.success) {
                throw new Error(orderResponse.details[0]?.message || 'Failed to create order')
            }

            console.log('Order created successfully:', orderResponse)


            // Initialize Cashfree checkout with proper callback handling
            const checkoutOptions = {
                paymentSessionId: orderResponse.paymentSessionId,
                redirectTarget: "_modal",
            }

            console.log('Opening Cashfree checkout with options:', checkoutOptions)

            cashfree.checkout(checkoutOptions).then((result: CashfreeCheckoutResult) => {
                console.log('Cashfree checkout result:', result)

                if (result.error) {
                    // User closed popup or payment error
                    console.log("User has closed the popup or there is some payment error, Check for Payment Status")
                    console.log(result.error)
                    toast.error('Payment was cancelled or failed. Please try again.')
                }

                if (result.redirect) {
                    // Payment redirection couldn't be opened in same window
                    console.log("Payment will be redirected")
                    toast.info('Payment will be redirected to complete the transaction.')
                }

                if (result.paymentDetails) {
                    // Payment completed irrespective of transaction status
                    console.log("Payment has been completed, Check for Payment Status")
                    console.log(result.paymentDetails.paymentMessage)
                    toast.success('Payment completed!', {
                        description: 'Redirecting to confirmation page...',
                        duration: 3000,
                    })

                    // Redirect to success page to check payment status
                    window.location.href = `/payment-success?orderId=${orderResponse.orderId}`
                }
            }).catch((error: any) => {
                console.error('Cashfree checkout error:', error)
                toast.error('Payment failed. Please try again.')
            })

        } catch (error) {
            console.error('Payment error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.'
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
                <div className="w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                        {/* Left Side - Event Poster Glass Card with Overlay Details */}
                        <div className="flex items-center justify-center order-1 lg:order-1">
                            <Card className="w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-cyan-500/40 hover:border-cyan-400/60 hover:scale-[1.02] group">
                                <div className="relative">
                                    <img
                                        src={(() => {
                                            const currentEvent = events.find(e => e.id === resolvedParams.formType);
                                            return currentEvent ? currentEvent.image : imageUrl;
                                        })()}
                                        alt="Event Poster"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.03)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite] pointer-events-none"></div>

                                    {/* Top Section - Event Title */}
                                    <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 text-white">
                                        <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                                            {resolvedParams.formType.toUpperCase()}
                                        </h2>
                                        <p className="text-cyan-200/90 text-sm sm:text-lg font-light tracking-wide">Join the future of technology</p>
                                        <div className="mt-4 flex items-center space-x-3">
                                            <div className="relative">
                                                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                                                <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                                            </div>
                                            <span className="text-sm text-cyan-300/90 font-medium tracking-wider uppercase">
                                                Registration Open
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Section - Event Details Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                                        {(() => {
                                            const currentEvent = events.find(e => e.id === resolvedParams.formType);
                                            if (!currentEvent) return <p className="text-red-400 text-sm">Event not found</p>;

                                            return (
                                                <div className="space-y-3 ">
                                                    {/* Event Name and Category */}
                                                    <div className="md:flex items-center gap-3 mb-3 hidden">
                                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                            {(() => {
                                                                const IconComponent = getCategoryIcon(currentEvent.category);
                                                                return <IconComponent className="w-6 h-6 text-cyan-400" />;
                                                            })()}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-cyan-200 font-semibold text-lg">{currentEvent.name}</h3>
                                                            <p className="text-cyan-300/80 text-sm">{currentEvent.category}</p>
                                                        </div>
                                                    </div>

                                                    {/* Event Description */}
                                                    <p className="text-cyan-300/90 text-sm leading-relaxed mb-3">
                                                        {currentEvent.description}
                                                    </p>

                                                    {/* Event Details Grid */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
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
                                            );
                                        })()}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Side - Registration Form Glass Card */}
                        <div className="flex items-center justify-center order-2 lg:order-2 pt-2 md:pt-24">
                            <div className="relative w-full max-w-sm sm:max-w-md">
                                <Card className={`w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/40 `}>
                                    <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                                        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                                        <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                            Registration
                                        </CardTitle>
                                        <CardDescription className="text-cyan-300/80 text-center text-sm sm:text-base capitalize">
                                            Complete your registration for {resolvedParams.formType}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                        <form onSubmit={handleSubmit(handlePayment)} className="space-y-3">
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
                                            {resolvedParams.formType === 'trail-hack' && (
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
                                                            <Plus className="w-4 h-4 mr-1" />
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

                                            {/* Payment Information */}
                                            <div className="bg-black/40 rounded-lg p-4 border border-cyan-500/30">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-cyan-300 font-medium text-sm">Registration Fee</span>
                                                    <CreditCard className="w-4 h-4 text-cyan-400" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-cyan-200 text-sm">{EVENT_PRICING[resolvedParams.formType]?.description}</span>
                                                    <span className="text-cyan-400 font-bold">₹{EVENT_PRICING[resolvedParams.formType]?.amount}</span>
                                                </div>

                                                {/* Rules Button */}
                                                <div className="mt-3 pt-3 border-t border-cyan-500/30">
                                                    <Button
                                                        type="button"
                                                        onClick={() => setIsRulesModalOpen(true)}
                                                        className="w-full bg-gradient-to-r from-purple-500/80 via-purple-400/80 to-cyan-500/80 hover:from-purple-400/90 hover:via-purple-300/90 hover:to-cyan-400/90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-400/30 border border-purple-400/40 relative overflow-hidden group"
                                                    >
                                                        <span className="relative z-10 flex items-center justify-center space-x-2">
                                                            <Shield className="w-4 h-4" />
                                                            <span>View Rules & Contact Details</span>
                                                        </span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* SDK Error Display */}
                                            <div className=" overflow-hidden">
                                                {sdkError && (
                                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-3 animate-in slide-in-from-top-2 duration-300">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                            <p className="text-red-400 text-sm font-medium">Payment System Error</p>
                                                        </div>
                                                        <p className="text-red-300 text-xs mt-1">{sdkError}</p>
                                                        <div className="flex space-x-2 mt-2">
                                                            <button
                                                                onClick={() => window.location.reload()}
                                                                className="text-red-400 hover:text-red-300 text-xs underline"
                                                            >
                                                                Refresh Page
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSdkError(null)
                                                                    setSdkLoading(true)
                                                                    // Re-trigger SDK initialization
                                                                    const initializeSDK = async () => {
                                                                        try {
                                                                            const environment = process.env.NEXT_PUBLIC_CASHFREE_ENVIRONMENT || "sandbox"
                                                                            const cashfreeInstance = await load({
                                                                                mode: environment
                                                                            }) as CashfreeInstance
                                                                            setCashfree(cashfreeInstance)
                                                                            toast.success('Payment system ready!', {
                                                                                description: 'Cashfree SDK loaded successfully',
                                                                                duration: 3000,
                                                                            })
                                                                        } catch (error) {
                                                                            console.error('Error loading Cashfree SDK:', error)
                                                                            const errorMessage = 'Failed to initialize payment system. Please refresh the page.'
                                                                            setSdkError(errorMessage)
                                                                            toast.error(errorMessage)
                                                                        } finally {
                                                                            setSdkLoading(false)
                                                                        }
                                                                    }
                                                                    initializeSDK()
                                                                }}
                                                                className="text-red-400 hover:text-red-300 text-xs underline"
                                                            >
                                                                Retry
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

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

                                            {/* SDK Loading State */}
                                            <div className="overflow-hidden">
                                                {sdkLoading && (
                                                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-3 animate-in slide-in-from-top-2 duration-300">
                                                        <div className="flex items-center space-x-2">
                                                            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                                                            <p className="text-blue-400 text-sm font-medium">Initializing Payment System...</p>
                                                        </div>
                                                        <p className="text-blue-300 text-xs mt-1">Please wait while we set up the payment gateway</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting || isSubmittingForm || sdkLoading || !!sdkError}
                                                className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60 relative overflow-hidden group mt-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            >
                                                {(isSubmitting || isSubmittingForm) ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        <span className="relative z-10">
                                                            {isSubmitting ? 'Validating Form...' : 'Processing Payment...'}
                                                        </span>
                                                    </>
                                                ) : sdkLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        <span className="relative z-10">Initializing...</span>
                                                    </>
                                                ) : sdkError ? (
                                                    <>
                                                        <span className="relative z-10">Payment System Unavailable</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="relative z-10">Complete Registration & Pay</span>
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
                </div>
            </div>

            {/* Rules Modal/Sheet */}
            {isMobile ? (
                // Mobile: Sheet from bottom
                <Sheet open={isRulesModalOpen} onOpenChange={setIsRulesModalOpen}>
                    <SheetContent side="bottom" className="h-[85vh] bg-black/40 backdrop-blur-xl border-cyan-500/40 rounded-t-2xl p-0">
                        <SheetHeader className="space-y-2 px-6 pt-6 pb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
                                Event Rules & Contact Details
                            </SheetTitle>
                            <SheetDescription className="text-cyan-300/80 text-center">
                                Important information for {resolvedParams.formType}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="overflow-y-auto flex-1 px-6 pb-6">
                            <RulesContent />
                        </div>
                    </SheetContent>
                </Sheet>
            ) : (
                // Desktop: Dialog modal
                isRulesModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsRulesModalOpen(false)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
                            <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl overflow-hidden">
                                <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6 relative">
                                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                                    <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] text-center">
                                        Event Rules & Contact Details
                                    </CardTitle>
                                    <CardDescription className="text-cyan-300/80 text-center text-sm sm:text-base">
                                        Important information for {resolvedParams.formType}
                                    </CardDescription>

                                    {/* Close Button */}
                                    <Button
                                        onClick={() => setIsRulesModalOpen(false)}
                                        className="absolute top-4 right-4 w-8 h-8 p-0 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-full transition-all duration-200"
                                    >
                                        <X className="w-4 h-4 text-red-400" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
                                    <RulesContent />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}
