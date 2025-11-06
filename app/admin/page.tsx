"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { CheckCircle, XCircle, Clock, Users, Calendar, Mail, Phone } from "lucide-react"
import FaultyTerminalBackground from "../../components/ui/custom-background"
import { supabase } from "../../lib/supabase"

interface Registration {
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

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'failed' | 'spot'>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(25)

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 300)

        return () => clearTimeout(timer)
    }, [searchQuery])

    useEffect(() => {
        fetchRegistrations()
    }, [filter])

    // Reset to first page when filter or search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [filter, debouncedSearchQuery])

    const fetchRegistrations = async () => {
        try {
            setLoading(true)
            setError(null)

            // Fetch single event registrations
            const { data: singleRegistrations, error: singleError } = await supabase
                .from('registrations')
                .select(`
          *,
          users (*),
          events (*)
        `)
                .order('created_at', { ascending: false })

            if (singleError) throw singleError

            // Fetch multi-event registrations
            const { data: multiRegistrations, error: multiError } = await supabase
                .from('multi_event_registrations')
                .select(`
          *,
          users (*)
        `)
                .order('created_at', { ascending: false })

            if (multiError) throw multiError

            // Combine and format registrations
            const allRegistrations = [
                ...(singleRegistrations || []).map(reg => ({ ...reg, type: 'single' })),
                ...(multiRegistrations || []).map(reg => ({ ...reg, type: 'multi' }))
            ]

            // Apply filter
            let filteredRegistrations = allRegistrations
            if (filter !== 'all') {
                filteredRegistrations = allRegistrations.filter(reg => reg.payment_status === filter)
            }

            setRegistrations(filteredRegistrations)
        } catch (error) {
            console.error('Error fetching registrations:', error)
            setError('Failed to fetch registrations')
        } finally {
            setLoading(false)
        }
    }

    const updateParticipationStatus = async (registrationId: string, confirmed: boolean) => {
        try {
            // Try to update in single event registrations first
            const { error: singleError } = await supabase
                .from('registrations')
                .update({ participation_confirmed: confirmed })
                .eq('id', registrationId)

            if (singleError) {
                // If not found in single registrations, try multi-event registrations
                const { error: multiError } = await supabase
                    .from('multi_event_registrations')
                    .update({ participation_confirmed: confirmed })
                    .eq('id', registrationId)

                if (multiError) throw multiError
            }

            // Refresh the data
            fetchRegistrations()
        } catch (error) {
            console.error('Error updating participation status:', error)
            setError('Failed to update participation status')
        }
    }

    // Client-side filtering for search
    const filteredRegistrations = useMemo(() => {
        let filtered = registrations

        if (debouncedSearchQuery.trim()) {
            filtered = registrations.filter(reg => {
                const fullName = `${reg.users.first_name} ${reg.users.last_name}`.toLowerCase()
                return fullName.includes(debouncedSearchQuery.toLowerCase())
            })
        }

        return filtered
    }, [registrations, debouncedSearchQuery])

    // Pagination logic
    const totalPages = Math.ceil(filteredRegistrations.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex)

    // Pagination handlers
    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1))
    }

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1))
    }

    const getPaymentStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return <CheckCircle className="w-4 h-4 text-green-400" />
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-400" />
            case 'failed':
                return <XCircle className="w-4 h-4 text-red-400" />
            case 'spot':
                return <Users className="w-4 h-4 text-blue-400" />
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
            spot: 'secondary'
        } as const

        return (
            <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
                {status.toUpperCase()}
            </Badge>
        )
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
                                Admin Dashboard
                            </CardTitle>
                            <CardDescription className="text-cyan-300/80 text-center text-sm">
                                Manage event registrations and confirmations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {/* Search Field */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2 bg-black/30 border border-cyan-500/50 rounded-lg text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {(['all', 'paid', 'pending', 'failed', 'spot'] as const).map((filterType) => (
                                    <Button
                                        key={filterType}
                                        onClick={() => setFilter(filterType)}
                                        variant={filter === filterType ? 'default' : 'outline'}
                                        className={`capitalize ${filter === filterType
                                            ? 'bg-cyan-500 hover:bg-cyan-400 text-black font-semibold'
                                            : 'border-cyan-500/70 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white bg-black/20'
                                            }`}
                                    >
                                        {filterType}
                                    </Button>
                                ))}
                                <Button
                                    onClick={fetchRegistrations}
                                    variant="outline"
                                    className="border-cyan-500/70 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white bg-black/20"
                                >
                                    Refresh
                                </Button>
                            </div>

                            {/* Summary Stats */}
                            {!loading && registrations.length > 0 && (
                                <div className="mb-6 pb-4 border-b border-cyan-500/30">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-cyan-400">{registrations.length}</p>
                                            <p className="text-sm text-cyan-300">Total</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-green-400">
                                                {registrations.filter(r => r.payment_status === 'paid').length}
                                            </p>
                                            <p className="text-sm text-cyan-300">Paid</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-yellow-400">
                                                {registrations.filter(r => r.payment_status === 'pending').length}
                                            </p>
                                            <p className="text-sm text-cyan-300">Pending</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-blue-400">
                                                {registrations.filter(r => r.payment_status === 'spot').length}
                                            </p>
                                            <p className="text-sm text-cyan-300">Spot</p>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {/* Error Display */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Loading State */}
                            {loading && (
                                <div className="text-center py-8">
                                    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-cyan-300">Loading registrations...</p>
                                </div>
                            )}

                            {/* Registrations Table */}
                            {!loading && (
                                <div className="overflow-x-auto">
                                    {paginatedRegistrations.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                                            <p className="text-cyan-300">No registrations found</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Desktop Table */}
                                            <div className="hidden lg:block">
                                                <table className="w-full border-collapse">
                                                    <thead>
                                                        <tr className="border-b border-cyan-500/30">
                                                            <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Name</th>
                                                            <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Email</th>
                                                            <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Phone</th>
                                                            <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Organization</th>
                                                            <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Payment Status</th>
                                                            <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Amount</th>
                                                            <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Events</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {paginatedRegistrations.map((registration) => (
                                                            <tr key={registration.id} className="border-b border-cyan-500/20 hover:bg-black/10 transition-colors">
                                                                <td className="py-3 px-4">
                                                                    <div className="text-cyan-100 font-medium">
                                                                        {registration.users.first_name} {registration.users.last_name}
                                                                    </div>
                                                                    <div className="text-xs text-cyan-400">
                                                                        {new Date(registration.created_at).toLocaleDateString()}
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-4 text-cyan-300 text-sm">
                                                                    {registration.users.email}
                                                                </td>
                                                                <td className="py-3 px-4 text-cyan-300 text-sm">
                                                                    {registration.users.phone}
                                                                </td>
                                                                <td className="py-3 px-4 text-cyan-300 text-sm">
                                                                    {registration.users.organization}
                                                                </td>
                                                                <td className="py-3 px-4">
                                                                    <div className="flex items-center gap-2">
                                                                        {getPaymentStatusIcon(registration.payment_status)}
                                                                        {getPaymentStatusBadge(registration.payment_status)}
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-4 text-cyan-300 text-sm">
                                                                    ₹{registration.payment_amount}
                                                                </td>
                                                                <td className="py-3 px-4 text-cyan-300 text-sm">
                                                                    {registration.events ? (
                                                                        <span>{registration.events.name}</span>
                                                                    ) : registration.selected_events ? (
                                                                        <span>{registration.selected_events.join(', ')}</span>
                                                                    ) : (
                                                                        <span className="text-gray-500">-</span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Mobile Cards */}
                                            <div className="lg:hidden space-y-4">
                                                {paginatedRegistrations.map((registration) => (
                                                    <Card key={registration.id} className="bg-black/20 border border-cyan-500/30">
                                                        <CardContent className="p-4">
                                                            <div className="space-y-3">
                                                                <div className="flex items-center justify-between">
                                                                    <h3 className="text-lg font-semibold text-cyan-100">
                                                                        {registration.users.first_name} {registration.users.last_name}
                                                                    </h3>
                                                                    <div className="flex items-center gap-2">
                                                                        {getPaymentStatusIcon(registration.payment_status)}
                                                                        {getPaymentStatusBadge(registration.payment_status)}
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 gap-2 text-sm">
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

                                                                <div className="text-sm space-y-1">
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

                                                                <div className="flex items-center justify-between pt-2 border-t border-cyan-500/20">
                                                                    <Badge variant={registration.participation_confirmed ? 'default' : 'secondary'}>
                                                                        {registration.participation_confirmed ? 'Confirmed' : 'Pending'}
                                                                    </Badge>
                                                                    {registration.payment_status === 'paid' && (
                                                                        <div className="flex gap-2">
                                                                            <Button
                                                                                size="sm"
                                                                                onClick={() => updateParticipationStatus(registration.id, true)}
                                                                                disabled={registration.participation_confirmed}
                                                                                className="bg-green-500 hover:bg-green-400 text-black text-xs"
                                                                            >
                                                                                Confirm
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                onClick={() => updateParticipationStatus(registration.id, false)}
                                                                                disabled={!registration.participation_confirmed}
                                                                                className="border-red-500/50 text-red-300 hover:bg-red-500/10 text-xs"
                                                                            >
                                                                                Unconfirm
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Pagination Controls */}
                            {!loading && filteredRegistrations.length > 0 && (
                                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    {/* Page Size Selector */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-cyan-300 text-sm">Show:</span>
                                        <select
                                            value={pageSize}
                                            onChange={(e) => {
                                                setPageSize(Number(e.target.value))
                                                setCurrentPage(1)
                                            }}
                                            className="bg-black/30 border border-cyan-500/50 rounded px-2 py-1 text-cyan-100 text-sm focus:outline-none focus:border-cyan-400"
                                        >
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                        <span className="text-cyan-300 text-sm">per page</span>
                                    </div>

                                    {/* Pagination Info */}
                                    <div className="text-cyan-300 text-sm">
                                        Showing {startIndex + 1} to {Math.min(endIndex, filteredRegistrations.length)} of {filteredRegistrations.length} entries
                                    </div>

                                    {/* Pagination Buttons */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={goToPreviousPage}
                                            disabled={currentPage === 1}
                                            variant="outline"
                                            size="sm"
                                            className="border-cyan-500/70 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white bg-black/20 disabled:opacity-50"
                                        >
                                            Previous
                                        </Button>

                                        {/* Page Numbers */}
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = currentPage - 2 + i;
                                                }

                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        onClick={() => goToPage(pageNum)}
                                                        variant={currentPage === pageNum ? 'default' : 'outline'}
                                                        size="sm"
                                                        className={`${currentPage === pageNum
                                                            ? 'bg-cyan-500 hover:bg-cyan-400 text-black font-semibold'
                                                            : 'border-cyan-500/70 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white bg-black/20'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                );
                                            })}
                                        </div>

                                        <Button
                                            onClick={goToNextPage}
                                            disabled={currentPage === totalPages}
                                            variant="outline"
                                            size="sm"
                                            className="border-cyan-500/70 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white bg-black/20 disabled:opacity-50"
                                        >
                                            Next
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
