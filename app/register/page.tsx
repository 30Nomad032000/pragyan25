"use client"

/// <reference path="../../types/cashfree.d.ts" />
import { load } from "@cashfreepayments/cashfree-js"
import { CreditCard, Loader2, CheckCircle, XCircle } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import FaultyTerminalBackground from "../../components/ui/custom-background"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { CreateOrderRequest, CreateOrderResponse, EVENT_PRICING } from "../../lib/types/payment"
import { registerUser, createMultiEventRegistration, getUserByEmail } from "../../lib/supabase"

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
// Zod schema for multi-event form validation
const multiEventRegistrationSchema = z.object({
    firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
    organization: z.string().min(1, "College/Organization is required"),
    selectedEvents: z.array(z.string()).min(1, "Please select at least one event").max(3, "You can select maximum 3 events"),
})

type MultiEventRegistrationFormData = z.infer<typeof multiEventRegistrationSchema>

export default function Page() {
    const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null)
    const [sdkLoading, setSdkLoading] = useState(true)
    const [sdkError, setSdkError] = useState<string | null>(null)
    const [formError, setFormError] = useState<string | null>(null)
    const [isSubmittingForm, setIsSubmittingForm] = useState(false)
    const [selectedEvents, setSelectedEvents] = useState<string[]>([])

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<MultiEventRegistrationFormData>({
        resolver: zodResolver(multiEventRegistrationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            organization: "",
            selectedEvents: [],
        },
    })

    // Calculate total amount
    const totalAmount = selectedEvents.reduce((total, eventName) => {
        return total + (EVENT_PRICING[eventName]?.amount || 0)
    }, 0)

    // Initialize Cashfree SDK
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

    const createOrder = async (data: MultiEventRegistrationFormData): Promise<CreateOrderResponse> => {
        const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

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
                })
            }

            // Create multi-event registration in Supabase
            await createMultiEventRegistration({
                user_id: user.id,
                order_id: orderId,
                payment_amount: totalAmount,
                payment_currency: 'INR',
                selected_events: selectedEvents,
            })

            console.log('Multi-event registration saved to Supabase successfully')
        } catch (error) {
            console.error('Error saving multi-event registration to Supabase:', error)
            // Continue with payment even if Supabase save fails
        }

        const orderData: CreateOrderRequest = {
            orderId,
            orderAmount: totalAmount.toString(),
            customerName: `${data.firstName} ${data.lastName}`,
            customerEmail: data.email,
            customerPhone: data.phone,
            eventName: data.selectedEvents.join(', '), // Multiple events as comma-separated string
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

    const handleEventToggle = (eventName: string) => {
        const newSelectedEvents = selectedEvents.includes(eventName)
            ? selectedEvents.filter(event => event !== eventName)
            : [...selectedEvents, eventName].slice(0, 3) // Limit to 3 events

        setSelectedEvents(newSelectedEvents)
        setValue("selectedEvents", newSelectedEvents)
    }

    const handlePayment = async (data: MultiEventRegistrationFormData) => {
        setIsSubmittingForm(true)
        setFormError(null)

        try {
            // Check if Cashfree SDK is loaded
            if (!cashfree) {
                throw new Error('Payment gateway not loaded. Please refresh the page.')
            }

            // Validate that at least one event is selected
            if (selectedEvents.length === 0) {
                throw new Error('Please select at least one event')
            }

            // Create order
            const orderResponse = await createOrder(data)

            if (!orderResponse.success) {
                throw new Error(orderResponse.error || 'Failed to create order')
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
                    console.log("User has closed the popup or there is some payment error, Check for Payment Status")
                    console.log(result.error)
                    toast.error('Payment was cancelled or failed. Please try again.')
                }

                if (result.redirect) {
                    console.log("Payment will be redirected")
                    toast.info('Payment will be redirected to complete the transaction.')
                }

                if (result.paymentDetails) {
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
                        {/* Left Side - Events Selection */}
                        <div className="flex items-center justify-center order-1 lg:order-1 pt-2 md:pt-24">
                            <Card className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-cyan-500/40 hover:border-cyan-400/60 hover:scale-[1.02] group">
                                <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                                    <CardTitle className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] text-center">
                                        Select Events
                                    </CardTitle>
                                    <CardDescription className="text-cyan-300/80 text-center text-sm sm:text-base">
                                        Choose up to 3 events to register
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6">
                                    <div className="grid 2grid-cols-1 md:grid-cols-2 gap-3">
                                        {events.map((event) => (
                                            <div
                                                key={event.id}
                                                onClick={() => handleEventToggle(event.id)}
                                                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${selectedEvents.includes(event.id)
                                                    ? 'bg-cyan-500/20 border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                                                    : 'bg-black/40 border-cyan-500/30 hover:border-cyan-400/50 hover:bg-black/50'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={event.image}
                                                            alt={event.name}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <h3 className="text-cyan-100 font-semibold">
                                                                {event.name}
                                                            </h3>
                                                            <p className="text-cyan-300/70 text-sm">
                                                                ₹{EVENT_PRICING[event.id]?.amount}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {selectedEvents.includes(event.id) ? (
                                                            <CheckCircle className="w-5 h-5 text-cyan-400" />
                                                        ) : (
                                                            <div className="w-5 h-5 border-2 border-cyan-500/50 rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Selection Summary */}
                                    {selectedEvents.length > 0 && (
                                        <div className="mt-4 p-3 bg-black/40 rounded-lg border border-cyan-500/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-cyan-300 font-medium text-sm">
                                                    Selected Events ({selectedEvents.length}/3)
                                                </span>
                                                <CreditCard className="w-4 h-4 text-cyan-400" />
                                            </div>
                                            <div className="space-y-1">
                                                {selectedEvents.map(eventId => {
                                                    const event = events.find(e => e.id === eventId);
                                                    return (
                                                        <div key={eventId} className="flex justify-between text-xs">
                                                            <span className="text-cyan-200">
                                                                {event ? event.name : eventId.replace('-', ' ')}
                                                            </span>
                                                            <span className="text-cyan-400">
                                                                ₹{EVENT_PRICING[eventId]?.amount}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="border-t border-cyan-500/30 mt-2 pt-2">
                                                <div className="flex justify-between">
                                                    <span className="text-cyan-300 font-semibold">Total Amount</span>
                                                    <span className="text-cyan-400 font-bold">₹{totalAmount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Side - Registration Form */}
                        <div className="flex items-center justify-center order-2 lg:order-2 pt-2 md:pt-24">
                            <div className="relative w-full max-w-sm sm:max-w-md">
                                <Card className={`w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/40 `}>
                                    <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                                        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                                        <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                            Registration
                                        </CardTitle>
                                        <CardDescription className="text-cyan-300/80 text-center text-sm sm:text-base capitalize">
                                            Complete your registration for selected events
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

                                            {/* Event Selection Error */}
                                            <div className="flex items-center">
                                                {errors.selectedEvents && (
                                                    <p className="text-red-400 text-xs animate-in slide-in-from-top-1 duration-200">
                                                        {errors.selectedEvents.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Payment Information */}
                                            {selectedEvents.length > 0 && (
                                                <div className="bg-black/40 rounded-lg p-4 border border-cyan-500/30">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-cyan-300 font-medium text-sm">Total Registration Fee</span>
                                                        <CreditCard className="w-4 h-4 text-cyan-400" />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-cyan-200 text-sm">
                                                            {selectedEvents.length} event{selectedEvents.length > 1 ? 's' : ''} selected
                                                        </span>
                                                        <span className="text-cyan-400 font-bold">₹{totalAmount}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* SDK Error Display */}
                                            <div className="overflow-hidden">
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
                                                disabled={isSubmitting || isSubmittingForm || sdkLoading || !!sdkError || selectedEvents.length === 0}
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
                                                ) : selectedEvents.length === 0 ? (
                                                    <>
                                                        <span className="relative z-10">Select Events First</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="relative z-10">Complete Registration & Pay ₹{totalAmount}</span>
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
        </div>
    )
}