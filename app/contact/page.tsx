"use client"

import { AnimatedPostersBackground } from "@/components/ui/animated-posters-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Globe, Instagram, Twitter, Linkedin, Github } from "lucide-react"
import { useState } from "react"

const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        details: ["info@pragyan.fun", "support@pragyan.fun"],
        description: "Drop us a line anytime"
    },
    {
        icon: Phone,
        title: "Call Us",
        details: ["+91-6238111288", "+91-9747643485"],
        description: "Mon-Fri from 9am to 6pm"
    },
    {
        icon: MapPin,
        title: "Visit Us",
        details: ["MCA Department", "ASIET Kalady", "Ernakulam, Kerala"],
        description: "Come say hello in person"
    },
    {
        icon: Clock,
        title: "Office Hours",
        details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
        description: "We're here to help"
    }
]

const socialLinks = [
    {
        icon: Instagram,
        name: "Instagram",
        url: "https://instagram.com/pragyan.fun",
        color: "hover:text-pink-400"
    },
    {
        icon: Twitter,
        name: "Twitter",
        url: "https://twitter.com/pragyan.fun",
        color: "hover:text-blue-400"
    },
    {
        icon: Linkedin,
        name: "LinkedIn",
        url: "https://linkedin.com/company/pragyan.fun",
        color: "hover:text-blue-600"
    },
    {
        icon: Github,
        name: "GitHub",
        url: "https://github.com/pragyan.fun",
        color: "hover:text-gray-400"
    }
]

const quickLinks = [
    { title: "Rules & Guidelines", href: "/rules" },
    { title: "FAQ", href: "/faq" },
    { title: "Privacy Policy", href: "/privacy" }
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitStatus("success")
            setFormData({ name: "", email: "", subject: "", message: "" })

            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus("idle"), 3000)
        }, 2000)
    }

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
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                            Contact Us
                        </h1>
                        <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto leading-relaxed">
                            Get in touch with the Pragyan 2025 team. We're here to help and answer any questions you might have.
                        </p>
                    </div>

                    {/* Contact Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <Card key={index} className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-400/60 transition-all duration-300">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
                                            <info.icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-cyan-300 mb-2">{info.title}</h3>
                                    <p className="text-sm text-cyan-200/60 mb-3">{info.description}</p>
                                    <div className="space-y-1">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-sm text-cyan-200/80">{detail}</p>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {/* Contact Form */}
                        <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-purple-300 flex items-center">
                                    <MessageSquare className="w-6 h-6 mr-3" />
                                    Send us a Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name" className="text-cyan-200/80 mb-2 block">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-black/50 border-cyan-500/30 text-white placeholder:text-cyan-200/50 focus:border-cyan-400"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email" className="text-cyan-200/80 mb-2 block">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-black/50 border-cyan-500/30 text-white placeholder:text-cyan-200/50 focus:border-cyan-400"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="subject" className="text-cyan-200/80 mb-2 block">Subject</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-black/50 border-cyan-500/30 text-white placeholder:text-cyan-200/50 focus:border-cyan-400"
                                            placeholder="What's this about?"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="message" className="text-cyan-200/80 mb-2 block">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="bg-black/50 border-cyan-500/30 text-white placeholder:text-cyan-200/50 focus:border-cyan-400 resize-none"
                                            placeholder="Tell us what's on your mind..."
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Message
                                            </div>
                                        )}
                                    </Button>
                                    {submitStatus === "success" && (
                                        <div className="text-center text-green-400 text-sm">
                                            ✅ Message sent successfully! We'll get back to you soon.
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>

                        {/* Quick Links & Social */}
                        <div className="space-y-6">
                            {/* Quick Links */}
                            <Card className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-green-300 flex items-center">
                                        <Users className="w-5 h-5 mr-2" />
                                        Quick Links
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {quickLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.href}
                                                className="block p-3 rounded-lg bg-black/30 border border-green-500/20 hover:border-green-400/40 hover:bg-green-500/10 transition-all duration-300 group"
                                            >
                                                <span className="text-green-200 group-hover:text-green-300 transition-colors">
                                                    {link.title}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Media */}
                            <Card className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-orange-300 flex items-center">
                                        <Globe className="w-5 h-5 mr-2" />
                                        Follow Us
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-3">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center p-3 rounded-lg bg-black/30 border border-orange-500/20 hover:border-orange-400/40 hover:bg-orange-500/10 transition-all duration-300 group ${social.color}`}
                                            >
                                                <social.icon className="w-5 h-5 mr-2" />
                                                <span className="text-orange-200 group-hover:text-orange-300 transition-colors text-sm">
                                                    {social.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-blue-300">Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-cyan-200/80 mb-4">
                                Can't find what you're looking for? Check out our FAQ section for quick answers to common questions.
                            </p>
                            <Button
                                asChild
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                            >
                                <a href="/faq">Visit FAQ</a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
