"use client"

import { AnimatedPostersBackground } from "@/components/ui/animated-posters-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Calendar, Users, Trophy, Clock, MapPin, CreditCard, Shield, Mail, Phone } from "lucide-react"

const faqCategories = [
    {
        icon: Calendar,
        title: "Event Registration",
        color: "text-blue-400"
    },
    {
        icon: Users,
        title: "Participation",
        color: "text-green-400"
    },
    {
        icon: Trophy,
        title: "Prizes & Awards",
        color: "text-yellow-400"
    },
    {
        icon: Clock,
        title: "Schedule & Timing",
        color: "text-purple-400"
    },
    {
        icon: MapPin,
        title: "Venue & Location",
        color: "text-red-400"
    },
    {
        icon: CreditCard,
        title: "Payments & Fees",
        color: "text-orange-400"
    }
]

const faqData = [
    {
        category: "Event Registration",
        questions: [
            {
                question: "How do I register for events?",
                answer: "You can register for events through our online registration portal. Simply select the events you want to participate in, fill out the required information, and submit your registration. You'll receive a confirmation email with further details."
            },
            {
                question: "Can I register for multiple events?",
                answer: "Yes, you can register for up to 3 events. However, please check the event schedules to ensure there are no timing conflicts between your selected events."
            },
            {
                question: "What is the registration deadline?",
                answer: "Registration closes 24 hours before each event's start time. We recommend registering early as some events have limited slots and fill up quickly."
            },
            {
                question: "Can I change my event selection after registration?",
                answer: "Yes, you can modify your event selection up to 48 hours before the event start time. Contact our support team to make changes to your registration."
            }
        ]
    },
    {
        category: "Participation",
        questions: [
            {
                question: "Do I need to bring my own equipment?",
                answer: "It depends on the event. For coding events like Code Loom and Bug Ex, you need to bring your own laptop. For photography events, bring your camera or phone. Check the specific event rules for detailed requirements."
            },
            {
                question: "What if I'm late to an event?",
                answer: "Participants who arrive more than 30 minutes late may be disqualified at the organizer's discretion. We recommend arriving 30 minutes before the scheduled start time."
            },
            {
                question: "Can I participate in team events individually?",
                answer: "Some events like Trail Hack require teams (maximum 4 members), while others can be done individually. Check the event description for team requirements."
            },
            {
                question: "What happens if I can't attend a registered event?",
                answer: "If you cannot attend, please inform us at least 24 hours in advance. This helps us manage resources and allows other participants to join if there's a waiting list."
            }
        ]
    },
    {
        category: "Prizes & Awards",
        questions: [
            {
                question: "What are the prizes for each event?",
                answer: "Prize amounts vary by event, ranging from ₹3,000 to ₹7,000. The total prize pool exceeds ₹50,000. Check individual event pages for specific prize amounts."
            },
            {
                question: "How are winners determined?",
                answer: "Winners are determined by our panel of expert judges based on creativity, technical skill, and adherence to event rules. Judging criteria are explained at the beginning of each event."
            },
            {
                question: "When will prizes be distributed?",
                answer: "Prizes will be distributed during the closing ceremony on October 17, 2025. Winners must be present to receive their prizes or arrange for collection within 7 days."
            },
            {
                question: "Are there certificates for participation?",
                answer: "Yes, all participants will receive digital certificates of participation. Winners will receive additional certificates and trophies."
            }
        ]
    },
    {
        category: "Schedule & Timing",
        questions: [
            {
                question: "What are the event timings?",
                answer: "Events run from 9:30 AM to 3:00 PM on October 16, 2025. Fun Zone activities are available all day on both October 16-17, 2025. Check individual event pages for specific timings."
            },
            {
                question: "How long do events last?",
                answer: "Event duration varies: Code Loom (3 hours), Bug Ex (1 hour 40 minutes), Trail Hack (5 hours), Click Clash (4 hours), and others range from 2-4 hours."
            },
            {
                question: "Is there a lunch break?",
                answer: "Yes, there's a lunch break from 12:30 PM to 1:30 PM. Food stalls will be available on campus, or you can bring your own lunch."
            },
            {
                question: "What if events run over time?",
                answer: "We strive to stick to the schedule, but some events may run slightly over. Participants will be informed of any timing changes in advance."
            }
        ]
    },
    {
        category: "Venue & Location",
        questions: [
            {
                question: "Where is Pragyan 2025 being held?",
                answer: "The event is being held at the MCA Department campus. Specific locations for each event are mentioned in the event details (AI Lab 1, MCA Lab, Elective Classroom, etc.)."
            },
            {
                question: "How do I reach the venue?",
                answer: "The campus is easily accessible by public transport. Detailed directions and parking information will be provided in your confirmation email."
            },
            {
                question: "Is parking available?",
                answer: "Yes, limited parking is available on campus. We recommend carpooling or using public transport due to space constraints."
            },
            {
                question: "Are there facilities for differently-abled participants?",
                answer: "Yes, our campus is accessible and we provide necessary accommodations. Please inform us during registration if you need any special assistance."
            }
        ]
    },
    {
        category: "Payments & Fees",
        questions: [
            {
                question: "Are there any registration fees?",
                answer: "Most competitive events are free to participate. However, Fun Zone activities have entry fees: Virtual Reality Experience (₹100) and PlayStation Gaming Arena (₹50)."
            },
            {
                question: "How can I pay for Fun Zone activities?",
                answer: "Fun Zone activities can be paid for on-site using cash or UPI. No advance payment is required for these activities."
            },
            {
                question: "Are there any hidden costs?",
                answer: "No, there are no hidden costs. All fees are clearly mentioned in the event descriptions. Food and beverages are available for purchase separately."
            },
            {
                question: "Can I get a refund if I can't attend?",
                answer: "Refunds for Fun Zone activities are not available. However, if you inform us 24 hours in advance about not attending competitive events, we can help with rescheduling."
            }
        ]
    }
]

export default function FAQPage() {
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
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto leading-relaxed">
                            Find answers to common questions about Pragyan 2025.
                            Can't find what you're looking for? Contact us!
                        </p>
                    </div>

                    {/* FAQ Categories */}


                    {/* FAQ Content */}
                    <div className="space-y-8">
                        {faqData.map((category, categoryIndex) => (
                            <Card key={categoryIndex} className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl shadow-black/20 hover:bg-white/8 hover:border-white/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
                                <CardHeader className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border-b border-white/10">
                                    <CardTitle className="text-2xl font-bold text-cyan-300 flex items-center">
                                        <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-3">
                                            <HelpCircle className="w-6 h-6" />
                                        </div>
                                        {category.category}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Accordion type="single" collapsible className="w-full">
                                        {category.questions.map((faq, faqIndex) => (
                                            <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`} className="border-white/10 last:border-b-0">
                                                <AccordionTrigger className="text-left text-cyan-200 hover:text-cyan-300 px-6 py-4 hover:bg-white/5 transition-all duration-300">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-cyan-200/80 leading-relaxed px-6 pb-4 bg-white/5 backdrop-blur-sm">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-16">
                        <Card className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                            <CardHeader className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border-b border-white/10">
                                <CardTitle className="text-2xl font-bold text-purple-300 text-center flex items-center justify-center">
                                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-3">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    Still Have Questions?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center p-8">
                                <p className="text-cyan-200/80 mb-8 text-lg">
                                    Our support team is here to help! Reach out to us for any additional questions or clarifications.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-center p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-4">
                                                <Mail className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <span className="text-cyan-200/80 font-medium">support@pragyan2025.edu</span>
                                        </div>
                                        <div className="flex items-center justify-center p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-4">
                                                <Phone className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <span className="text-cyan-200/80 font-medium">+91-XXXX-XXXX</span>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-center p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-4">
                                                <Clock className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <span className="text-cyan-200/80 font-medium">Response time: 24 hours</span>
                                        </div>
                                        <div className="flex items-center justify-center p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-4">
                                                <Shield className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <span className="text-cyan-200/80 font-medium">Available 9 AM - 6 PM</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex flex-wrap justify-center gap-3">
                                    <Badge className="bg-white/10 backdrop-blur-sm text-cyan-300 border-white/20 hover:bg-white/20 transition-all duration-300 px-4 py-2">
                                        Email Support
                                    </Badge>
                                    <Badge className="bg-white/10 backdrop-blur-sm text-cyan-300 border-white/20 hover:bg-white/20 transition-all duration-300 px-4 py-2">
                                        Phone Support
                                    </Badge>
                                    <Badge className="bg-white/10 backdrop-blur-sm text-cyan-300 border-white/20 hover:bg-white/20 transition-all duration-300 px-4 py-2">
                                        Live Chat
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
