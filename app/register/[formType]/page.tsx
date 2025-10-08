"use client"

import React from "react"
import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import FaultyTerminalBackground from "../../../components/ui/custom-background"

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Handle form submission here
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <FaultyTerminalBackground />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-pulse"></div>

            {/* Glass Overlay Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 h-full min-h-[80vh]">
                        {/* Left Side - Event Poster Glass Card */}
                        <div className="flex items-center justify-center">
                            <Card className="w-full max-w-md bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-cyan-500/40 hover:border-cyan-400/60 hover:scale-[1.02] group">
                                <div className="relative">
                                    <img
                                        src="https://placehold.co/600x800/0a0a0a/68f6f6?text=EVENT+POSTER"
                                        alt="Event Poster"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.03)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite] pointer-events-none"></div>

                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                                            {params.formType.toUpperCase()}
                                        </h2>
                                        <p className="text-cyan-200/90 text-lg font-light tracking-wide">Join the future of technology</p>
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
                        <div className="flex items-center justify-center">
                            <Card className="w-full max-w-md bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/40">
                                <CardHeader className="space-y-3 pb-6">
                                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                        Registration
                                    </CardTitle>
                                    <CardDescription className="text-cyan-300/80 text-center text-base">
                                        Complete your registration for {params.formType}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Name Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60 relative overflow-hidden group mt-6"
                                        >
                                            <span className="relative z-10">Complete Registration</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
