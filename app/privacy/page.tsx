"use client"

import { AnimatedPostersBackground } from "@/components/ui/animated-posters-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, Users, Mail, Phone, Calendar, AlertCircle, CheckCircle, DollarSign } from "lucide-react"

const dataTypes = [
    {
        icon: Users,
        title: "Personal Information",
        data: [
            "Full name and contact details",
            "College ID and institution name",
            "Email address and phone number",
            "Academic year and department"
        ]
    },
    {
        icon: Database,
        title: "Event Data",
        data: [
            "Event registrations and participation",
            "Submission files and project data",
            "Performance scores and rankings",
            "Photographs and videos from events"
        ]
    },
    {
        icon: Eye,
        title: "Usage Analytics",
        data: [
            "Website visit patterns and duration",
            "Page views and navigation paths",
            "Device information and browser type",
            "IP address and location data"
        ]
    }
]

const dataUsage = [
    {
        icon: CheckCircle,
        title: "Event Management",
        description: "To organize and manage event registrations, communications, and logistics"
    },
    {
        icon: CheckCircle,
        title: "Communication",
        description: "To send event updates, notifications, and important announcements"
    },
    {
        icon: CheckCircle,
        title: "Analytics & Improvement",
        description: "To analyze website usage and improve user experience"
    },
    {
        icon: CheckCircle,
        title: "Legal Compliance",
        description: "To comply with applicable laws and regulations"
    }
]

const dataProtection = [
    {
        icon: Lock,
        title: "Encryption",
        description: "All sensitive data is encrypted using industry-standard protocols"
    },
    {
        icon: Shield,
        title: "Access Control",
        description: "Strict access controls limit data access to authorized personnel only"
    },
    {
        icon: Database,
        title: "Secure Storage",
        description: "Data is stored on secure servers with regular security updates"
    },
    {
        icon: Users,
        title: "Staff Training",
        description: "All staff members are trained on data protection best practices"
    }
]

const userRights = [
    "Right to access your personal data",
    "Right to correct inaccurate information",
    "Right to delete your data (with limitations)",
    "Right to restrict data processing",
    "Right to data portability",
    "Right to object to processing",
    "Right to withdraw consent"
]

const refundPolicies = [
    {
        icon: DollarSign,
        title: "Refund Eligibility",
        description: "Refunds are available for event registrations cancelled at least 7 days before the event start date"
    },
    {
        icon: Calendar,
        title: "Processing Time",
        description: "Refund requests are processed within 5-7 business days after approval"
    },
    {
        icon: AlertCircle,
        title: "Non-Refundable Items",
        description: "Merchandise, accommodation bookings, and late cancellations are generally non-refundable"
    },
    {
        icon: CheckCircle,
        title: "Refund Method",
        description: "Refunds are processed through the original payment method used for registration"
    }
]

export default function PrivacyPolicyPage() {
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
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto leading-relaxed">
                            Your privacy is important to us. This policy explains how we collect,
                            use, and protect your personal information at Pragyan 2025.
                        </p>
                        <p className="text-sm text-cyan-300/60 mt-4">
                            Last updated: October 1, 2025
                        </p>
                    </div>

                    {/* Introduction */}
                    <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden mb-12">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Introduction</h2>
                            <p className="text-cyan-200/80 leading-relaxed mb-4">
                                Pragyan 2025 ("we," "our," or "us") is committed to protecting your privacy.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard
                                your information when you visit our website or participate in our events.
                            </p>
                            <p className="text-cyan-200/80 leading-relaxed">
                                By using our services, you agree to the collection and use of information
                                in accordance with this policy.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Data Collection */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-8">
                            Information We Collect
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {dataTypes.map((type, index) => (
                                <Card key={index} className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-400/60 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold text-cyan-300 flex items-center">
                                            <type.icon className="w-6 h-6 mr-3" />
                                            {type.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {type.data.map((item, idx) => (
                                                <li key={idx} className="text-cyan-200/80 flex items-start">
                                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Data Usage */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-purple-300 mb-8">
                            How We Use Your Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {dataUsage.map((usage, index) => (
                                <Card key={index} className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-400/60 transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex items-start">
                                            <usage.icon className="w-6 h-6 text-purple-400 mr-4 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-lg font-bold text-purple-300 mb-2">{usage.title}</h3>
                                                <p className="text-cyan-200/80">{usage.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Data Protection */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-green-300 mb-8">
                            Data Protection Measures
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {dataProtection.map((protection, index) => (
                                <Card key={index} className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl overflow-hidden hover:border-green-400/60 transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex items-start">
                                            <protection.icon className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-lg font-bold text-green-300 mb-2">{protection.title}</h3>
                                                <p className="text-cyan-200/80">{protection.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* User Rights */}
                    <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl overflow-hidden mb-12">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-blue-300">Your Rights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-cyan-200/80 mb-6">
                                Under applicable data protection laws, you have the following rights regarding your personal data:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {userRights.map((right, index) => (
                                    <div key={index} className="flex items-center text-cyan-200/80">
                                        <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                                        <span>{right}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Sharing */}
                    <Card className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl overflow-hidden mb-12">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-orange-300">Data Sharing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-cyan-200/80 leading-relaxed mb-4">
                                We do not sell, trade, or otherwise transfer your personal information to third parties
                                without your consent, except in the following circumstances:
                            </p>
                            <ul className="space-y-2 text-cyan-200/80">
                                <li className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>When required by law or legal process</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>To protect our rights, property, or safety</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>With trusted service providers who assist in event operations</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>For academic or research purposes (anonymized data only)</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Refunds Policy */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">
                            Refunds Policy
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {refundPolicies.map((policy, index) => (
                                <Card key={index} className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl overflow-hidden hover:border-yellow-400/60 transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex items-start">
                                            <policy.icon className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-lg font-bold text-yellow-300 mb-2">{policy.title}</h3>
                                                <p className="text-cyan-200/80">{policy.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Additional Refund Information */}
                        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-xl overflow-hidden mt-8">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-yellow-300 mb-4">Important Refund Information</h3>
                                <div className="space-y-3 text-cyan-200/80">
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>All refund requests must be submitted through our official channels with proper documentation</span>
                                    </div>
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Partial refunds may apply for events cancelled due to circumstances beyond our control</span>
                                    </div>
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Refund policies may vary for different event types and special circumstances</span>
                                    </div>
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Contact our support team for specific refund inquiries and assistance</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div className="text-center">
                        <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden max-w-2xl mx-auto">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-cyan-300 mb-4">Contact Us</h3>
                                <p className="text-cyan-200/80 mb-4">
                                    If you have any questions about this Privacy Policy or wish to exercise your rights,
                                    please contact us:
                                </p>
                                <div className="space-y-2 text-cyan-200/80">
                                    <div className="flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-cyan-400 mr-2" />
                                        <span>privacy@pragyan.fun</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-cyan-400 mr-2" />
                                        <span>+91-XXXX-XXXX</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-cyan-400 mr-2" />
                                        <span>Response time: 48 hours</span>
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
