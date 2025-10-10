"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { XCircle, AlertCircle, Loader2 } from "lucide-react"
import FaultyTerminalBackground from "../../components/ui/custom-background"
import Link from "next/link"

function PaymentFailureContent() {
    const searchParams = useSearchParams()
    const [errorMessage, setErrorMessage] = useState<string>('')

    const orderId = searchParams.get('orderId')
    const error = searchParams.get('error')

    useEffect(() => {
        if (error) {
            setErrorMessage(decodeURIComponent(error))
        } else {
            setErrorMessage('Payment was cancelled or failed. Please try again.')
        }
    }, [error])

    return (
        <div className="min-h-screen relative pt-28 md:pt-2">
            <FaultyTerminalBackground />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-pulse"></div>

            <div className="relative flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 z-10 min-h-screen">
                <div className="w-full max-w-md mx-auto">
                    <Card className="w-full bg-black/30 backdrop-blur-xl border border-red-500/40 shadow-2xl shadow-red-500/30 rounded-2xl">
                        <CardHeader className="space-y-3 pb-6">
                            <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full"></div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent text-center tracking-tight">
                                Payment Failed
                            </CardTitle>
                            <CardDescription className="text-red-300/80 text-center text-sm">
                                Your payment could not be processed
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="text-center space-y-4">
                                <XCircle className="w-16 h-16 text-red-400 mx-auto" />
                                <h3 className="text-xl font-bold text-red-400">Payment Unsuccessful</h3>

                                <div className="bg-black/40 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-red-300/80 text-sm text-left">
                                            {errorMessage}
                                        </p>
                                    </div>
                                </div>

                                {orderId && (
                                    <div className="bg-black/40 rounded-lg p-4 space-y-2 text-left">
                                        <p className="text-sm text-red-300">
                                            <span className="font-medium">Order ID:</span> {orderId}
                                        </p>
                                        <p className="text-sm text-red-300">
                                            <span className="font-medium">Status:</span> Failed
                                        </p>
                                    </div>
                                )}

                                <div className="pt-4 space-y-2">
                                    <Link href="/">
                                        <Button className="w-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 hover:from-red-400 hover:via-red-300 hover:to-red-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-400/50 border border-red-400/60">
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

                                <div className="pt-4 border-t border-red-500/20">
                                    <p className="text-xs text-red-300/60 text-center">
                                        If you continue to experience issues, please contact our support team.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default function PaymentFailurePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen relative pt-28 md:pt-2">
                <FaultyTerminalBackground />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
                <div className="relative flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 z-10 min-h-screen">
                    <div className="w-full max-w-md mx-auto">
                        <Card className="w-full bg-black/30 backdrop-blur-xl border border-red-500/40 shadow-2xl shadow-red-500/30 rounded-2xl">
                            <CardContent className="p-6">
                                <div className="text-center space-y-4">
                                    <Loader2 className="w-12 h-12 text-red-400 animate-spin mx-auto" />
                                    <h3 className="text-xl font-bold text-red-400">Loading...</h3>
                                    <p className="text-red-300/80">
                                        Please wait while we load your payment information.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        }>
            <PaymentFailureContent />
        </Suspense>
    )
}
