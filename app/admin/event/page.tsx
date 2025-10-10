"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { CheckCircle, XCircle, Loader2, Calendar, Users, TrendingUp, Filter } from "lucide-react"
import FaultyTerminalBackground from "../../../components/ui/custom-background"
import Link from "next/link"
import { getAllRegistrations, getAllEvents } from "../../../lib/supabase"
import { toast } from "sonner"

interface Event {
    id: string
    name: string
    description?: string
    date?: string
    location?: string
    max_participants?: number
    created_at: string
}

interface Registration {
    id: string
    order_id: string
    type: 'single' | 'multiple'
    data: {
        users: {
            first_name: string
            last_name: string
            email: string
            phone: string
            organization: string
        }
        events?: {
            id: string
            name: string
        }
        selected_events?: Array<{
            id: string
            name: string
        }>
        payment_amount: number
        payment_status: string
        created_at: string
    }
}

export default function AdminEventPage() {
    const [loading, setLoading] = useState(true)
    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const [selectedEvent, setSelectedEvent] = useState<string>('all')
    const [registrationType, setRegistrationType] = useState<string>('all')
    const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        filterRegistrationsByEvent()
    }, [selectedEvent, registrationType, registrations])

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)

            const [registrationsData, eventsData] = await Promise.all([
                getAllRegistrations(),
                getAllEvents()
            ])

            setRegistrations(registrationsData)
            setEvents(eventsData)

            toast.success('Data loaded successfully!', {
                description: `Found ${registrationsData.length} registrations and ${eventsData.length} events.`,
                duration: 3000,
            })
        } catch (err) {
            console.error('Error fetching data:', err)
            setError('Failed to load data')
            toast.error('Failed to load data', {
                description: 'There was an error loading registrations and events.',
                duration: 4000,
            })
        } finally {
            setLoading(false)
        }
    }

    const filterRegistrationsByEvent = () => {
        let filtered = registrations

        // Filter by registration type
        if (registrationType !== 'all') {
            filtered = filtered.filter(reg => reg.type === registrationType)
        }

        // Filter by event
        if (selectedEvent !== 'all') {
            filtered = filtered.filter(reg => {
                if (reg.type === 'single') {
                    return reg.data.events?.id === selectedEvent
                } else if (reg.type === 'multiple') {
                    return reg.data.selected_events?.some(event => event.id === selectedEvent)
                }
                return false
            })
        }

        setFilteredRegistrations(filtered)
    }

    const getEventStats = () => {
        const totalRegistrations = filteredRegistrations.length
        const paidRegistrations = filteredRegistrations.filter(reg => reg.data.payment_status === 'paid').length
        const pendingRegistrations = filteredRegistrations.filter(reg => reg.data.payment_status === 'pending').length
        const failedRegistrations = filteredRegistrations.filter(reg => reg.data.payment_status === 'failed').length

        return {
            total: totalRegistrations,
            paid: paidRegistrations,
            pending: pendingRegistrations,
            failed: failedRegistrations
        }
    }

    const getSelectedEventName = () => {
        if (selectedEvent === 'all') return 'All Events'
        const event = events.find(e => e.id === selectedEvent)
        return event?.name || 'Unknown Event'
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
                <div className="w-full max-w-6xl mx-auto pt-32">
                    <Card className="w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl">
                        <CardHeader className="space-y-3 pb-6">
                            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                Event Management
                            </CardTitle>
                            <CardDescription className="text-cyan-300/80 text-center text-sm">
                                View registrations and attendance by event
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {/* Event Filter */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-cyan-400" />
                                    <span className="text-cyan-300 font-medium">Filter by Event:</span>
                                </div>
                                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                                    <SelectTrigger className="w-[200px] bg-black/20 border-cyan-500/70 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white focus:ring-cyan-500/50">
                                        <SelectValue placeholder="Select event" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black/90 border-cyan-500/30">
                                        <SelectItem value="all" className="text-cyan-200 hover:bg-cyan-500/30 hover:text-white focus:bg-cyan-500/30 focus:text-white data-[highlighted]:bg-cyan-500/30 data-[highlighted]:text-white">
                                            All Events
                                        </SelectItem>
                                        {events.map((event) => (
                                            <SelectItem
                                                key={event.id}
                                                value={event.id}
                                                className="text-cyan-200 hover:bg-cyan-500/30 hover:text-white focus:bg-cyan-500/30 focus:text-white data-[highlighted]:bg-cyan-500/30 data-[highlighted]:text-white"
                                            >
                                                {event.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={registrationType} onValueChange={setRegistrationType}>
                                    <SelectTrigger className="w-[180px] bg-black/20 border-cyan-500/70 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white focus:ring-cyan-500/50">
                                        <SelectValue placeholder="Registration type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black/90 border-cyan-500/30">
                                        <SelectItem value="all" className="text-cyan-200 hover:bg-cyan-500/30 hover:text-white focus:bg-cyan-500/30 focus:text-white data-[highlighted]:bg-cyan-500/30 data-[highlighted]:text-white">
                                            All Types
                                        </SelectItem>
                                        <SelectItem value="single" className="text-cyan-200 hover:bg-cyan-500/30 hover:text-white focus:bg-cyan-500/30 focus:text-white data-[highlighted]:bg-cyan-500/30 data-[highlighted]:text-white">
                                            Single Event
                                        </SelectItem>
                                        <SelectItem value="multiple" className="text-cyan-200 hover:bg-cyan-500/30 hover:text-white focus:bg-cyan-500/30 focus:text-white data-[highlighted]:bg-cyan-500/30 data-[highlighted]:text-white">
                                            Multiple Events
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button
                                    onClick={fetchData}
                                    variant="outline"
                                    className="border-cyan-500/70 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white bg-black/20"
                                >
                                    Refresh
                                </Button>
                            </div>

                            {/* Error Display */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Loading State */}
                            {loading && (
                                <div className="text-center space-y-4">
                                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
                                    <h3 className="text-xl font-bold text-cyan-400">Loading Data</h3>
                                    <p className="text-cyan-300/80">Fetching registrations and events...</p>
                                </div>
                            )}

                            {/* Event Statistics */}
                            {!loading && !error && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" />
                                        Statistics for: {getSelectedEventName()}
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-black/40 rounded-lg p-4 border border-cyan-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Users className="w-4 h-4 text-cyan-400" />
                                                <span className="text-sm text-cyan-300">Total</span>
                                            </div>
                                            <p className="text-2xl font-bold text-cyan-400">{getEventStats().total}</p>
                                        </div>
                                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                <span className="text-sm text-green-300">Paid</span>
                                            </div>
                                            <p className="text-2xl font-bold text-green-400">{getEventStats().paid}</p>
                                        </div>
                                        <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Calendar className="w-4 h-4 text-yellow-400" />
                                                <span className="text-sm text-yellow-300">Pending</span>
                                            </div>
                                            <p className="text-2xl font-bold text-yellow-400">{getEventStats().pending}</p>
                                        </div>
                                        <div className="bg-black/40 rounded-lg p-4 border border-red-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <XCircle className="w-4 h-4 text-red-400" />
                                                <span className="text-sm text-red-300">Failed</span>
                                            </div>
                                            <p className="text-2xl font-bold text-red-400">{getEventStats().failed}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Registrations List */}
                            {!loading && !error && filteredRegistrations.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        Registrations ({filteredRegistrations.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {filteredRegistrations.map((registration) => (
                                            <div
                                                key={registration.id}
                                                className="bg-black/40 rounded-lg p-4 border border-cyan-500/30 hover:border-cyan-400/50 transition-colors"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {/* Participant Info */}
                                                    <div>
                                                        <h4 className="font-semibold text-cyan-300 mb-2">
                                                            {`${registration.data.users.first_name} ${registration.data.users.last_name}`}
                                                        </h4>
                                                        <div className="space-y-1 text-sm text-cyan-300/80">
                                                            <p><span className="font-medium">Email:</span> {registration.data.users.email}</p>
                                                            <p><span className="font-medium">Phone:</span> {registration.data.users.phone}</p>
                                                            <p><span className="font-medium">Organization:</span> {registration.data.users.organization}</p>
                                                        </div>
                                                    </div>

                                                    {/* Event Info */}
                                                    <div>
                                                        <h4 className="font-semibold text-purple-300 mb-2">Event Details</h4>
                                                        <div className="space-y-1 text-sm text-purple-300/80">
                                                            <p><span className="font-medium">Registration Type:</span> {registration.type}</p>
                                                            {registration.type === 'single' && registration.data.events && (
                                                                <p><span className="font-medium">Event:</span> {registration.data.events.name}</p>
                                                            )}
                                                            {registration.type === 'multiple' && registration.data.selected_events && (
                                                                <p><span className="font-medium">Events:</span> {
                                                                    registration.data.selected_events
                                                                        .map(eventObj => {
                                                                            // Handle both object and string formats
                                                                            const eventId = typeof eventObj === 'string' ? eventObj : eventObj.id;
                                                                            const event = events.find(e => e.id === eventId);
                                                                            return event ? event.name : eventId;
                                                                        })
                                                                        .filter(name => name)
                                                                        .join(', ') || 'No events selected'
                                                                }</p>
                                                            )}
                                                            <p><span className="font-medium">Registered:</span> {formatDate(registration.data.created_at)}</p>
                                                        </div>
                                                    </div>

                                                    {/* Payment Info */}
                                                    <div>
                                                        <h4 className="font-semibold text-green-300 mb-2">Payment Details</h4>
                                                        <div className="space-y-1 text-sm text-green-300/80">
                                                            <p><span className="font-medium">Order ID:</span> {registration.order_id}</p>
                                                            <p><span className="font-medium">Amount:</span> {formatAmount(registration.data.payment_amount)}</p>
                                                            <p><span className="font-medium">Status:</span>
                                                                <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${registration.data.payment_status === 'paid'
                                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                                    : registration.data.payment_status === 'pending'
                                                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                                    }`}>
                                                                    {registration.data.payment_status || 'Unknown'}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-4 pt-3 border-t border-cyan-500/30 flex gap-2">
                                                    <Link href={`/admin/confirm/${registration.order_id}`}>
                                                        <Button
                                                            variant="outline"
                                                            className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-white"
                                                        >
                                                            View Ticket
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* No Registrations */}
                            {!loading && !error && filteredRegistrations.length === 0 && (
                                <div className="text-center space-y-4">
                                    <Users className="w-16 h-16 text-gray-400 mx-auto" />
                                    <h3 className="text-xl font-bold text-gray-400">No Registrations Found</h3>
                                    <p className="text-cyan-300/80">
                                        No registrations found for {getSelectedEventName()}.
                                    </p>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="mt-8 pt-6 border-t border-cyan-500/30">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/admin">
                                        <Button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-purple-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/60">
                                            Back to Admin Dashboard
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
