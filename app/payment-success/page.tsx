"use client"

import { Camera, Link as LinkIcon, Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { EventTicket } from "../../components/event-ticket"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import FaultyTerminalBackground from "../../components/ui/custom-background"
import { getRegistrationByOrderId, updateRegistrationPaymentStatus } from "../../lib/supabase"

function PaymentSuccessContent() {
    const searchParams = useSearchParams()
    const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [orderDetails, setOrderDetails] = useState<any>(null)
    const ticketRef = useRef<HTMLDivElement>(null)

    const orderId = searchParams.get('order_id') || searchParams.get('orderId')
    const paymentSessionId = searchParams.get('payment_session_id') || searchParams.get('paymentSessionId')
    const orderStatus = searchParams.get('order_status') || searchParams.get('orderStatus')
    const paymentStatusParam = searchParams.get('payment_status') || searchParams.get('paymentStatus')

    useEffect(() => {
        console.log('Payment Success Page - URL Parameters:', {
            orderId,
            paymentSessionId,
            orderStatus,
            paymentStatusParam,
            allParams: Object.fromEntries(searchParams.entries())
        })

        // If we have order status from URL, use it immediately
        if (orderStatus || paymentStatusParam) {
            const isSuccess = orderStatus === 'PAID' || paymentStatusParam === 'SUCCESS'
            setPaymentStatus(isSuccess ? 'success' : 'error')

            // Still fetch detailed status for more info
            if (orderId) {
                fetchPaymentStatus(orderId)
            }
        } else if (orderId) {
            // Fetch payment status from API
            fetchPaymentStatus(orderId)
        } else {
            setPaymentStatus('error')
        }
    }, [orderId, orderStatus, paymentStatusParam])

    const fetchPaymentStatus = async (orderId: string) => {
        try {
            const response = await fetch('/api/payment-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            })

            const result = await response.json()
            console.log('Payment Status API Response:', result)

            if (result.success && result.payments && Array.isArray(result.payments)) {
                const getOrderResponse = result.payments
                let orderStatus

                // Determine order status based on payment transactions
                if (getOrderResponse.filter((transaction: any) => transaction.payment_status === "SUCCESS").length > 0) {
                    orderStatus = "Success"

                    // Update Supabase with successful payment
                    try {
                        await updateRegistrationPaymentStatus(orderId, 'paid')
                        console.log('Payment status updated in Supabase')
                    } catch (error) {
                        console.error('Error updating Supabase payment status:', error)
                    }
                } else if (getOrderResponse.filter((transaction: any) => transaction.payment_status === "PENDING").length > 0) {
                    orderStatus = "Pending"
                } else {
                    orderStatus = "Failure"

                    // Update Supabase with failed payment
                    try {
                        await updateRegistrationPaymentStatus(orderId, 'failed')
                        console.log('Payment failure status updated in Supabase')
                    } catch (error) {
                        console.error('Error updating Supabase payment status:', error)
                    }
                }

                console.log('Determined Order Status:', orderStatus)
                console.log('Payment Transactions:', getOrderResponse)

                // Get registration details from Supabase
                let supabaseRegistration = null
                try {
                    supabaseRegistration = await getRegistrationByOrderId(orderId)
                } catch (error) {
                    console.error('Error fetching registration from Supabase:', error)
                }

                // Set the order details and status
                setOrderDetails({
                    orderId: orderId,
                    orderStatus: orderStatus,
                    transactions: getOrderResponse,
                    supabaseRegistration: supabaseRegistration,
                    // Get the first successful transaction if available
                    successfulTransaction: getOrderResponse.find((t: any) => t.payment_status === "SUCCESS") || null
                })

                // Set payment status based on determined order status
                if (orderStatus === "Success") {
                    setPaymentStatus('success')
                } else if (orderStatus === "Pending") {
                    setPaymentStatus('loading') // Show loading for pending payments
                } else {
                    setPaymentStatus('error')
                }
            } else {
                console.log('No payment data found, checking URL parameters')
                // If no payment data, check URL parameters
                const urlSuccess = orderStatus === 'PAID' || paymentStatusParam === 'SUCCESS'

                // Update Supabase based on URL parameters
                if (urlSuccess) {
                    try {
                        await updateRegistrationPaymentStatus(orderId, 'paid')
                        console.log('Payment status updated in Supabase from URL parameters')
                    } catch (error) {
                        console.error('Error updating Supabase payment status:', error)
                    }
                }

                setPaymentStatus(urlSuccess ? 'success' : 'error')
            }
        } catch (error) {
            console.error('Error fetching payment status:', error)
            // Fallback to URL parameter check
            const urlSuccess = orderStatus === 'PAID' || paymentStatusParam === 'SUCCESS'
            setPaymentStatus(urlSuccess ? 'success' : 'error')
        }
    }

    return (
        <div className="min-h-screen relative pt-28 md:pt-2">
            <FaultyTerminalBackground />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-pulse"></div>

            <div className="relative flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 z-10 min-h-screen ">
                <div className="w-full max-w-lg mx-auto pt-2 md:pt-28">
                    <Card className="w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl">
                        <CardHeader className="space-y-3 pb-6">
                            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                Entry Ticket
                            </CardTitle>
                            <CardDescription className="text-cyan-300/80 text-center text-sm">
                                {paymentStatus != 'loading' && (
                                    <p className="text-cyan-300/80">
                                        Your registration has been confirmed. Here's your event ticket:
                                    </p>)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {paymentStatus === 'loading' && (
                                <div className="text-center space-y-4">
                                    <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto" />
                                    <h3 className="text-xl font-bold text-yellow-400">Payment Processing</h3>
                                    <p className="text-cyan-300/80">
                                        Your payment is being processed. Please wait while we verify your transaction.
                                    </p>
                                    {orderDetails && (
                                        <div className="bg-black/40 rounded-lg p-4 space-y-2 text-left">
                                            <p className="text-sm text-cyan-300">
                                                <span className="font-medium">Order ID:</span> {orderDetails.orderId}
                                            </p>
                                            <p className="text-sm text-cyan-300">
                                                <span className="font-medium">Status:</span> {orderDetails.orderStatus}
                                            </p>
                                            <p className="text-sm text-yellow-300">
                                                <span className="font-medium">Note:</span> Payment is pending confirmation
                                            </p>
                                        </div>
                                    )}
                                    <div className="pt-4">
                                        <Button
                                            onClick={() => window.location.reload()}
                                            className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 hover:from-yellow-400 hover:via-yellow-300 hover:to-orange-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-500/40 hover:shadow-xl hover:shadow-yellow-400/50 border border-yellow-400/60"
                                        >
                                            Refresh Status
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {paymentStatus === 'success' && (
                                <div className="text-center space-y-6">



                                    {/* Ticket Display */}
                                    {orderDetails && orderDetails.supabaseRegistration && (
                                        <div className="mt-6">
                                            <div ref={ticketRef} className="flex justify-center">
                                                <EventTicket
                                                    ticketId={orderDetails.orderId}
                                                    amount={orderDetails.supabaseRegistration.data.payment_amount || 0}
                                                    date={new Date(orderDetails.supabaseRegistration.data.created_at)}
                                                    participantName={`${orderDetails.supabaseRegistration.data.users?.first_name || ''} ${orderDetails.supabaseRegistration.data.users?.last_name || ''}`.trim()}
                                                    participantEmail={orderDetails.supabaseRegistration.data.users?.email || ''}
                                                    participantPhone={orderDetails.supabaseRegistration.data.users?.phone || ''}
                                                    organization={orderDetails.supabaseRegistration.data.users?.organization || ''}
                                                    eventName={
                                                        orderDetails.supabaseRegistration.type === 'single'
                                                            ? orderDetails.supabaseRegistration.data.events?.name || 'Event'
                                                            : orderDetails.supabaseRegistration.data.selected_events?.join(', ') || 'Events'
                                                    }
                                                    barcodeValue={orderDetails.orderId}
                                                />
                                            </div>

                                            {/* Instructions Section */}
                                            <div className="mt-6 bg-black/40 rounded-lg p-4 space-y-4">
                                                <h4 className="text-lg font-bold text-cyan-300">For Event Entry:</h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* Screenshot Option */}
                                                    <div className="bg-black/60 rounded-lg p-4 border border-cyan-500/30">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <Camera className="w-6 h-6 text-cyan-400" />
                                                            <h5 className="font-semibold text-cyan-300">Take Screenshot</h5>
                                                        </div>
                                                        <p className="text-sm text-cyan-300/80 mb-3">
                                                            Take a screenshot of this ticket and show it at the event entrance.
                                                        </p>
                                                        <div className="text-xs text-gray-400 space-y-1">
                                                            <p>• Mobile: Power + Volume Down</p>
                                                            <p>• Desktop: Print Screen or Snipping Tool</p>
                                                        </div>
                                                    </div>

                                                    {/* URL Option */}
                                                    <div className="bg-black/60 rounded-lg p-4 border border-purple-500/30">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <LinkIcon className="w-6 h-6 text-purple-400" />
                                                            <h5 className="font-semibold text-purple-300">Save URL</h5>
                                                        </div>
                                                        <p className="text-sm text-purple-300/80 mb-3">
                                                            Save this page URL to access your ticket anytime.
                                                        </p>
                                                        <Button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(window.location.href)
                                                                toast.success('URL copied to clipboard!', {
                                                                    description: 'You can now paste this URL anywhere to access your ticket.',
                                                                    duration: 3000,
                                                                })
                                                            }}
                                                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white text-sm py-2 px-4 rounded-lg transition-all duration-300"
                                                        >
                                                            Copy URL
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                                                    <p className="text-sm text-yellow-300">
                                                        <span className="font-semibold">Important:</span> Keep this ticket safe and bring it (screenshot or URL) to the event for entry verification.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4 space-y-2">
                                        <Link href="/">
                                            <Button className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60">
                                                Return to Home
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {paymentStatus === 'error' && (
                                <div className="text-center space-y-4">
                                    <XCircle className="w-16 h-16 text-red-400 mx-auto" />
                                    <h3 className="text-xl font-bold text-red-400">Payment Failed</h3>
                                    <p className="text-cyan-300/80">
                                        There was an issue processing your payment. Please try again or contact support.
                                    </p>
                                    <div className="pt-4 space-y-2">
                                        <Link href="/">
                                            <Button className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60">
                                                Return to Home
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            className="w-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
                                            onClick={() => window.history.back()}
                                        >
                                            Try Again
                                        </Button>
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

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen relative pt-28 md:pt-2">
                <FaultyTerminalBackground />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
                <div className="relative flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 z-10 min-h-screen">
                    <div className="w-full max-w-lg mx-auto pt-2 md:pt-28">
                        <Card className="w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl">
                            <CardContent className="p-6">
                                <div className="text-center space-y-4">
                                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
                                    <h3 className="text-xl font-bold text-cyan-400">Loading...</h3>
                                    <p className="text-cyan-300/80">
                                        Please wait while we load your payment information.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    )
}
