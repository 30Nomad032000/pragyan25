"use client"

import { Calendar, CheckCircle, Loader2, User, XCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { EventTicket } from "../../../../components/event-ticket"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import FaultyTerminalBackground from "../../../../components/ui/custom-background"
import { getRegistrationByOrderId } from "../../../../lib/supabase"

export default function AdminConfirmPage() {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [registration, setRegistration] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [confirmed, setConfirmed] = useState(false)

    const orderId = params.orderId as string

    useEffect(() => {
        if (orderId) {
            fetchRegistrationDetails()
        }
    }, [orderId])

    const fetchRegistrationDetails = async () => {
        try {
            setLoading(true)
            setError(null)

            const registrationData = await getRegistrationByOrderId(orderId)

            if (registrationData) {
                setRegistration(registrationData)
                toast.success('Registration found!', {
                    description: 'Ticket details loaded successfully.',
                    duration: 3000,
                })
            } else {
                setError('Registration not found')
                toast.error('Registration not found', {
                    description: 'No registration found for this order ID.',
                    duration: 4000,
                })
            }
        } catch (err) {
            console.error('Error fetching registration:', err)
            setError('Failed to load registration details')
            toast.error('Failed to load registration', {
                description: 'There was an error loading the registration details.',
                duration: 4000,
            })
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmEntry = () => {
        setConfirmed(true)
        toast.success('Entry Confirmed!', {
            description: 'This participant has been marked as entered.',
            duration: 3000,
        })
    }

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat("en-GB", {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(new Date(dateString)).replace(',', ' •')
    }

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount)
    }

    return (
        <div className="min-h-screen relative pt-28 md:pt-2">
            <FaultyTerminalBackground />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-pulse"></div>

            <div className="relative flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 z-10 min-h-screen">
                <div className="w-full max-w-4xl mx-auto pt-2 md:pt-28">
                    <Card className="w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl">
                        <CardHeader className="space-y-3 pb-6">
                            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                Admin - Ticket Confirmation
                            </CardTitle>
                            <CardDescription className="text-cyan-300/80 text-center text-sm">
                                Verify and confirm event entry
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {loading && (
                                <div className="text-center space-y-4">
                                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
                                    <h3 className="text-xl font-bold text-cyan-400">Loading Registration</h3>
                                    <p className="text-cyan-300/80">
                                        Fetching registration details for order ID: <span className="font-mono">{orderId}</span>
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="text-center space-y-4">
                                    <XCircle className="w-16 h-16 text-red-400 mx-auto" />
                                    <h3 className="text-xl font-bold text-red-400">Registration Not Found</h3>
                                    <p className="text-cyan-300/80">
                                        No registration found for order ID: <span className="font-mono">{orderId}</span>
                                    </p>
                                    <div className="pt-4 space-y-2">
                                        <Button
                                            onClick={fetchRegistrationDetails}
                                            className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60"
                                        >
                                            Try Again
                                        </Button>
                                        <Link href="/admin">
                                            <Button
                                                variant="outline"
                                                className="w-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
                                            >
                                                Back to Admin
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {registration && !loading && (
                                <div className="space-y-6">
                                    {/* Registration Status */}
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                            <CheckCircle className="w-8 h-8 text-green-400" />
                                            <h3 className="text-xl font-bold text-green-400">Registration Found</h3>
                                        </div>
                                        <p className="text-cyan-300/80">
                                            Order ID: <span className="font-mono font-bold">{orderId}</span>
                                        </p>
                                    </div>

                                    {/* Ticket Display */}
                                    <div className="flex justify-center">
                                        <EventTicket
                                            ticketId={orderId}
                                            amount={registration.data.payment_amount || 0}
                                            date={new Date(registration.data.created_at)}
                                            participantName={`${registration.data.users?.first_name || ''} ${registration.data.users?.last_name || ''}`.trim()}
                                            participantEmail={registration.data.users?.email || ''}
                                            participantPhone={registration.data.users?.phone || ''}
                                            organization={registration.data.users?.organization || ''}
                                            eventName={
                                                registration.type === 'single'
                                                    ? registration.data.events?.name || 'Event'
                                                    : registration.data.selected_events?.join(', ') || 'Events'
                                            }
                                            barcodeValue={orderId}
                                        />
                                    </div>

                                    {/* Registration Details */}
                                    <div className="bg-black/40 rounded-lg p-6 space-y-4">
                                        <h4 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            Registration Details
                                        </h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Participant Info */}
                                            <div className="space-y-3">
                                                <div className="bg-black/60 rounded-lg p-4">
                                                    <h5 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                                                        <User className="w-4 h-4" />
                                                        Participant Information
                                                    </h5>
                                                    <div className="space-y-2 text-sm">
                                                        <p className="text-cyan-300/80">
                                                            <span className="font-medium">Name:</span> {`${registration.data.users?.first_name || ''} ${registration.data.users?.last_name || ''}`.trim()}
                                                        </p>
                                                        <p className="text-cyan-300/80">
                                                            <span className="font-medium">Email:</span> {registration.data.users?.email || 'N/A'}
                                                        </p>
                                                        <p className="text-cyan-300/80">
                                                            <span className="font-medium">Phone:</span> {registration.data.users?.phone || 'N/A'}
                                                        </p>
                                                        <p className="text-cyan-300/80">
                                                            <span className="font-medium">Organization:</span> {registration.data.users?.organization || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Event & Payment Info */}
                                            <div className="space-y-3">
                                                <div className="bg-black/60 rounded-lg p-4">
                                                    <h5 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        Event & Payment
                                                    </h5>
                                                    <div className="space-y-2 text-sm">
                                                        <p className="text-purple-300/80">
                                                            <span className="font-medium">Event(s):</span> {
                                                                registration.type === 'single'
                                                                    ? registration.data.events?.name || 'Event'
                                                                    : registration.data.selected_events?.join(', ') || 'Events'
                                                            }
                                                        </p>
                                                        <p className="text-purple-300/80">
                                                            <span className="font-medium">Registration Date:</span> {formatDate(registration.data.created_at)}
                                                        </p>
                                                        <p className="text-purple-300/80">
                                                            <span className="font-medium">Payment Amount:</span> {formatAmount(registration.data.payment_amount || 0)}
                                                        </p>
                                                        <p className="text-purple-300/80">
                                                            <span className="font-medium">Payment Status:</span>
                                                            <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${registration.data.payment_status === 'paid'
                                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                                }`}>
                                                                {registration.data.payment_status || 'Unknown'}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            onClick={handleConfirmEntry}
                                            disabled={confirmed}
                                            className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${confirmed
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-green-500 via-green-400 to-emerald-500 hover:from-green-400 hover:via-green-300 hover:to-emerald-400 text-black font-bold shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-400/50 border border-green-400/60'
                                                }`}
                                        >
                                            {confirmed ? (
                                                <>
                                                    <CheckCircle className="w-5 h-5 mr-2" />
                                                    Entry Confirmed
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-5 h-5 mr-2" />
                                                    Confirm Entry
                                                </>
                                            )}
                                        </Button>

                                        <Link href="/admin">
                                            <Button
                                                variant="outline"
                                                className="flex-1 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
                                            >
                                                Back to Admin
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
