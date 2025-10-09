"use client"

import { notFound } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import FaultyTerminalBackground from "../../../components/ui/custom-background"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Lock } from "lucide-react"

const eventNames = ['code-loom', 'beat-verse', 'click-clash', 'virtux', 'bug-ex', 'play-grid', 'idea-synth', 'trail-hack', 'clip-forge', 'trialis', 'goalazo']

export default function Page({ params }: { params: { formType: string } }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
        position: "",
        experience: "",
        interests: "",
        additionalInfo: "",
    })

    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const imageUrl = `/${eventNames.indexOf(params.formType) + 1}.png`

    useEffect(() => {
        if (eventNames.includes(params.formType)) {
            setFormData((prev) => ({
                ...prev,
                event: params.formType,
            }))

        } else {
            notFound()
        }
    }, [params.formType])

    // Live countdown timer effect
    useEffect(() => {
        // Set current time to 2:00 PM on September 10, 2025
        const currentTime = new Date('2025-10-09T14:00:00').getTime()
        // Set registration opening time (12 hours from current time)
        const registrationOpenTime = currentTime + 12 * 60 * 60 * 1000

        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const difference = registrationOpenTime - now

            if (difference > 0) {
                const hours = Math.floor(difference / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                setTimeLeft({ hours, minutes, seconds })
                setIsRegistrationOpen(false)
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
                setIsRegistrationOpen(true)
            }
        }

        // Run immediately
        calculateTimeLeft()

        // Set up interval to update every second
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Handle form submission here
    }

    return (
        <div className="min-h-screen relative pt-28 md:pt-2">
            <FaultyTerminalBackground />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-pulse"></div>

            {/* Glass Overlay Container */}
            <div className="relative flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 z-10 min-h-screen">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                        {/* Left Side - Event Poster Glass Card */}
                        <div className="flex items-center justify-center order-2 lg:order-1">
                            <Card className="w-full max-w-sm sm:max-w-md bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-cyan-500/40 hover:border-cyan-400/60 hover:scale-[1.02] group">
                                <div className="relative">
                                    <img
                                        src={imageUrl}
                                        alt="Event Poster"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.03)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite] pointer-events-none"></div>

                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white">
                                        <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                                            {params.formType.toUpperCase()}
                                        </h2>
                                        <p className="text-cyan-200/90 text-sm sm:text-lg font-light tracking-wide">Join the future of technology</p>
                                        <div className="mt-6 flex items-center space-x-3">
                                            <div className="relative">
                                                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                                                <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                                            </div>
                                            <span className="text-sm text-cyan-300/90 font-medium tracking-wider uppercase">
                                                Registration Open
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Side - Registration Form Glass Card */}
                        <div className="flex items-center justify-center order-1 lg:order-2">
                            <div className="relative w-full max-w-sm sm:max-w-md">
                                <Card className={`w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/40 ${!isRegistrationOpen ? 'blur-sm' : ''}`}>
                                    <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                                        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                                        <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                            Registration
                                        </CardTitle>
                                        <CardDescription className="text-cyan-300/80 text-center text-sm sm:text-base">
                                            Complete your registration for {params.formType}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                            {/* Name Fields */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        id="firstName"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="Enter your first name"
                                                        className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                        Last Name
                                                    </Label>
                                                    <Input
                                                        id="lastName"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="Enter your last name"
                                                        className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                    Email Address
                                                </Label>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Enter your email address"
                                                    className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your phone number"
                                                    className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                />
                                            </div>

                                            {/* Organization */}
                                            <div className="space-y-2">
                                                <Label htmlFor="organization" className="text-cyan-300 font-medium text-sm tracking-wide">
                                                    College
                                                </Label>
                                                <Input
                                                    type="text"
                                                    id="organization"
                                                    name="organization"
                                                    value={formData.organization}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your organization"
                                                    className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 hover:border-cyan-400/70 hover:bg-black/50"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60 relative overflow-hidden group mt-4 sm:mt-6"
                                            >
                                                <span className="relative z-10">Complete Registration</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>

                                {/* Lock Overlay */}
                                {!isRegistrationOpen && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20">
                                        <div className="text-center space-y-4 p-6">
                                            <div className="relative">
                                                <Lock className="w-16 h-16 text-cyan-400 animate-pulse mx-auto" />
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-bold text-cyan-300">
                                                    Registration Closed
                                                </h3>
                                                <p className="text-cyan-200/80 text-sm">
                                                    Registration opens in:
                                                </p>
                                            </div>

                                            <div className="flex justify-center space-x-4 text-center">
                                                <div className="bg-black/40 rounded-lg p-3 min-w-[60px]">
                                                    <div className="text-2xl font-bold text-cyan-400">
                                                        {timeLeft.hours.toString().padStart(2, '0')}
                                                    </div>
                                                    <div className="text-xs text-cyan-300/70 uppercase tracking-wide">
                                                        Hours
                                                    </div>
                                                </div>
                                                <div className="bg-black/40 rounded-lg p-3 min-w-[60px]">
                                                    <div className="text-2xl font-bold text-cyan-400">
                                                        {timeLeft.minutes.toString().padStart(2, '0')}
                                                    </div>
                                                    <div className="text-xs text-cyan-300/70 uppercase tracking-wide">
                                                        Minutes
                                                    </div>
                                                </div>
                                                <div className="bg-black/40 rounded-lg p-3 min-w-[60px]">
                                                    <div className="text-2xl font-bold text-cyan-400">
                                                        {timeLeft.seconds.toString().padStart(2, '0')}
                                                    </div>
                                                    <div className="text-xs text-cyan-300/70 uppercase tracking-wide">
                                                        Seconds
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="w-full bg-cyan-500/20 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                                                        style={{
                                                            width: `${((12 * 60 * 60 - (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds)) / (12 * 60 * 60)) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-cyan-300/60 mt-2">
                                                    Progress to registration opening
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
