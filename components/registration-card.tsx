"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { CheckCircle, XCircle, Clock, Users, Calendar, Mail, Phone, RefreshCw } from "lucide-react"
import { supabase } from "../lib/supabase"

interface RegistrationCardProps {
    registration: {
        id: string
        order_id: string
        payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'spot'
        payment_amount: number
        participation_confirmed: boolean
        created_at: string
        users: {
            first_name: string
            last_name: string
            email: string
            phone: string
            organization: string
        }
        events?: {
            name: string
            slug: string
        }
        selected_events?: string[]
    }
    onUpdate?: () => void
}

export function RegistrationCard({ registration, onUpdate }: RegistrationCardProps) {
    const [updating, setUpdating] = useState(false)

    const updateParticipationStatus = async (confirmed: boolean) => {
        try {
            setUpdating(true)

            // Try to update in single event registrations first
            const { error: singleError } = await supabase
                .from('registrations')
                .update({ participation_confirmed: confirmed })
                .eq('id', registration.id)

            if (singleError) {
                // If not found in single registrations, try multi-event registrations
                const { error: multiError } = await supabase
                    .from('multi_event_registrations')
                    .update({ participation_confirmed: confirmed })
                    .eq('id', registration.id)

                if (multiError) throw multiError
            }

            // Call the update callback if provided
            if (onUpdate) {
                onUpdate()
            }
        } catch (error) {
            console.error('Error updating participation status:', error)
        } finally {
            setUpdating(false)
        }
    }

    const getPaymentStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return <CheckCircle className="w-4 h-4 text-green-400" />
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-400" />
            case 'failed':
                return <XCircle className="w-4 h-4 text-red-400" />
            case 'refunded':
                return <RefreshCw className="w-4 h-4 text-gray-400" />
            case 'spot':
                return <Users className="w-4 h-4 text-orange-400" />
            default:
                return <Clock className="w-4 h-4 text-gray-400" />
        }
    }

    const getPaymentStatusBadge = (status: string) => {
        const variants = {
            paid: 'default',
            pending: 'secondary',
            failed: 'destructive',
            refunded: 'outline',
            spot: 'outline'
        } as const

        return (
            <Badge
                variant={variants[status as keyof typeof variants] || 'secondary'}
                className={status === 'spot' ? 'border-orange-500/50 text-orange-300 bg-orange-500/10' : ''}
            >
                {status.toUpperCase()}
            </Badge>
        )
    }

    return (
        <Card className="bg-black/20 border border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
            <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-cyan-100">
                                {registration.users.first_name} {registration.users.last_name}
                            </h3>
                            <div className="flex items-center gap-1">
                                {getPaymentStatusIcon(registration.payment_status)}
                                {getPaymentStatusBadge(registration.payment_status)}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cyan-400" />
                                <span className="text-cyan-300">{registration.users.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-cyan-400" />
                                <span className="text-cyan-300">{registration.users.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-cyan-400" />
                                <span className="text-cyan-300">{registration.users.organization}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-cyan-400" />
                                <span className="text-cyan-300">
                                    {new Date(registration.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="text-sm">
                            <p className="text-cyan-300">
                                <span className="font-medium">Order ID:</span> {registration.order_id}
                            </p>
                            <p className="text-cyan-300">
                                <span className="font-medium">Amount:</span> ₹{registration.payment_amount}
                            </p>
                            {registration.events && (
                                <p className="text-cyan-300">
                                    <span className="font-medium">Event:</span> {registration.events.name}
                                </p>
                            )}
                            {registration.selected_events && (
                                <p className="text-cyan-300">
                                    <span className="font-medium">Events:</span> {registration.selected_events.join(', ')}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="text-center">
                            <p className="text-xs text-cyan-300 mb-1">Participation</p>
                            <Badge variant={registration.participation_confirmed ? 'default' : 'secondary'}>
                                {registration.participation_confirmed ? 'Confirmed' : 'Pending'}
                            </Badge>
                        </div>

                        {registration.payment_status === 'paid' && (
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => updateParticipationStatus(true)}
                                    disabled={registration.participation_confirmed || updating}
                                    className="bg-green-500 hover:bg-green-400 text-black text-xs disabled:opacity-50"
                                >
                                    {updating ? (
                                        <RefreshCw className="w-3 h-3 animate-spin" />
                                    ) : (
                                        'Confirm'
                                    )}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateParticipationStatus(false)}
                                    disabled={!registration.participation_confirmed || updating}
                                    className="border-red-500/50 text-red-300 hover:bg-red-500/10 text-xs disabled:opacity-50"
                                >
                                    {updating ? (
                                        <RefreshCw className="w-3 h-3 animate-spin" />
                                    ) : (
                                        'Unconfirm'
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
