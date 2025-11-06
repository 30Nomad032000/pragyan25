"use client"

import {
    Award,
    Clock,
    Download,
    Eye,
    EyeOff,
    Mail,
    Send,
    Users
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from './badge'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Checkbox } from './checkbox'
import FaultyTerminalBackground from './custom-background'
import { Input } from './input'
import { Label } from './label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Textarea } from './textarea'

interface Participant {
    id: string
    name: string
    email: string
    event: string
    participationConfirmed: boolean
    certificateSent: boolean
}

const mockParticipants: Participant[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@college.edu',
        event: 'Code Loom',
        participationConfirmed: true,
        certificateSent: false
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@college.edu',
        event: 'Bug X',
        participationConfirmed: true,
        certificateSent: true
    },
    {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@college.edu',
        event: 'Trail Hack',
        participationConfirmed: true,
        certificateSent: false
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@college.edu',
        event: 'Click Clash',
        participationConfirmed: false,
        certificateSent: false
    }
]

export default function CertificateSender() {
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
    const [emailSubject, setEmailSubject] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [filterEvent, setFilterEvent] = useState<string>('all')
    const [filterStatus, setFilterStatus] = useState<string>('all')

    const filteredParticipants = mockParticipants.filter(participant => {
        const eventMatch = filterEvent === 'all' || participant.event === filterEvent
        const statusMatch = filterStatus === 'all' ||
            (filterStatus === 'confirmed' && participant.participationConfirmed) ||
            (filterStatus === 'unconfirmed' && !participant.participationConfirmed) ||
            (filterStatus === 'sent' && participant.certificateSent) ||
            (filterStatus === 'not-sent' && !participant.certificateSent)
        return eventMatch && statusMatch
    })

    const handleSelectParticipant = (participantId: string) => {
        setSelectedParticipants(prev =>
            prev.includes(participantId)
                ? prev.filter(id => id !== participantId)
                : [...prev, participantId]
        )
    }

    const handleSelectAll = () => {
        const eligibleParticipants = filteredParticipants
            .filter(p => p.participationConfirmed && !p.certificateSent)
            .map(p => p.id)

        if (selectedParticipants.length === eligibleParticipants.length) {
            setSelectedParticipants([])
        } else {
            setSelectedParticipants(eligibleParticipants)
        }
    }

    const handleSendCertificates = async () => {
        setIsSending(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSending(false)
        setSelectedParticipants([])
        setEmailSubject('')
        setEmailMessage('')
    }

    const getStatusBadge = (participant: Participant) => {
        if (!participant.participationConfirmed) {
            return <Badge variant="destructive">Not Confirmed</Badge>
        }
        if (participant.certificateSent) {
            return <Badge variant="default">Certificate Sent</Badge>
        }
        return <Badge variant="secondary">Ready to Send</Badge>
    }

    return (
        <div className="min-h-screen relative pt-28 md:pt-2">
            <FaultyTerminalBackground />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/30 animate-pulse"></div>

            <div className="relative flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 z-10 min-h-screen ">
                <div className="w-full max-w-7xl mx-auto pt-28">
                    <Card className="w-full bg-black/30 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-2xl">
                        <CardHeader className="space-y-3 pb-6">
                            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
                                Certificate Management
                            </CardTitle>
                            <CardDescription className="text-cyan-300/80 text-center text-lg">
                                Send participation certificates to confirmed participants
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-8">
                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-cyan-300 font-medium">Filter by Event</Label>
                                    <Select value={filterEvent} onValueChange={setFilterEvent}>
                                        <SelectTrigger className="bg-black/40 border-cyan-500/50 text-cyan-100">
                                            <SelectValue placeholder="Select event" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black/90 border-cyan-500/50">
                                            <SelectItem value="all">All Events</SelectItem>
                                            <SelectItem value="Code Loom">Code Loom</SelectItem>
                                            <SelectItem value="Bug X">Bug X</SelectItem>
                                            <SelectItem value="Trail Hack">Trail Hack</SelectItem>
                                            <SelectItem value="Click Clash">Click Clash</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-cyan-300 font-medium">Filter by Status</Label>
                                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                                        <SelectTrigger className="bg-black/40 border-cyan-500/50 text-cyan-100">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black/90 border-cyan-500/50">
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="confirmed">Confirmed</SelectItem>
                                            <SelectItem value="unconfirmed">Not Confirmed</SelectItem>
                                            <SelectItem value="sent">Certificate Sent</SelectItem>
                                            <SelectItem value="not-sent">Not Sent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-end">
                                    <Button
                                        onClick={handleSelectAll}
                                        variant="outline"
                                        className="w-full border-cyan-500/70 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white bg-black/20"
                                    >
                                        <Users className="w-4 h-4 mr-2" />
                                        Select All Eligible
                                    </Button>
                                </div>
                            </div>

                            {/* Participants List */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-cyan-100">Participants</h3>
                                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-300">
                                        {filteredParticipants.length} participants
                                    </Badge>
                                </div>

                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {filteredParticipants.map((participant) => (
                                        <div
                                            key={participant.id}
                                            className={`p-4 rounded-lg border transition-all duration-200 ${selectedParticipants.includes(participant.id)
                                                ? 'bg-cyan-500/20 border-cyan-400/60'
                                                : 'bg-black/20 border-cyan-500/30 hover:border-cyan-400/50'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <Checkbox
                                                    checked={selectedParticipants.includes(participant.id)}
                                                    onCheckedChange={() => handleSelectParticipant(participant.id)}
                                                    disabled={!participant.participationConfirmed || participant.certificateSent}
                                                    className="border-cyan-500/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                                />

                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-lg font-medium text-cyan-100">{participant.name}</h4>
                                                        {getStatusBadge(participant)}
                                                    </div>
                                                    <div className="flex items-center space-x-4 mt-1">
                                                        <div className="flex items-center space-x-1 text-cyan-300/80">
                                                            <Mail className="w-4 h-4" />
                                                            <span className="text-sm">{participant.email}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1 text-cyan-300/80">
                                                            <Award className="w-4 h-4" />
                                                            <span className="text-sm">{participant.event}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* Email Configuration */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-cyan-100">Email Configuration</h3>
                                    <Button
                                        onClick={() => setShowPreview(!showPreview)}
                                        variant="outline"
                                        size="sm"
                                        className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
                                    >
                                        {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                        {showPreview ? 'Hide' : 'Show'} Preview
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-cyan-300 font-medium">Email Subject</Label>
                                    <Input
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        placeholder="Participation Certificate for Pragyan 2025"
                                        className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-cyan-300 font-medium">Email Message</Label>
                                    <Textarea
                                        value={emailMessage}
                                        onChange={(e) => setEmailMessage(e.target.value)}
                                        placeholder="Dear [Name], Congratulations on your participation in [Event] at Pragyan 2025. Your participation certificate is attached..."
                                        rows={4}
                                        className="bg-black/40 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-400/50"
                                    />
                                </div>
                            </div>

                            {/* Preview */}
                            {showPreview && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-cyan-100">Email Preview</h3>
                                    <div className="p-6 bg-black/20 border border-cyan-500/30 rounded-lg">
                                        <div className="space-y-3">
                                            <div>
                                                <Label className="text-cyan-300/80 text-sm">To:</Label>
                                                <p className="text-cyan-100">
                                                    {selectedParticipants.length > 0
                                                        ? `${selectedParticipants.length} participant(s)`
                                                        : 'No participants selected'
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-cyan-300/80 text-sm">Subject:</Label>
                                                <p className="text-cyan-100">{emailSubject || 'Participation Certificate for Pragyan 2025'}</p>
                                            </div>
                                            <div>
                                                <Label className="text-cyan-300/80 text-sm">Message:</Label>
                                                <div className="p-3 bg-black/40 rounded border border-cyan-500/20">
                                                    <p className="text-cyan-100 whitespace-pre-wrap">
                                                        {emailMessage || 'Dear [Name],\n\nCongratulations on your participation in [Event] at Pragyan 2025. Your participation certificate is attached...'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-cyan-500/30">
                                <div className="flex items-center space-x-4">
                                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-300">
                                        {selectedParticipants.length} selected
                                    </Badge>
                                    <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                                        Participation Certificates
                                    </Badge>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Button
                                        variant="outline"
                                        className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Certificates
                                    </Button>

                                    <Button
                                        onClick={handleSendCertificates}
                                        disabled={selectedParticipants.length === 0 || isSending}
                                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold"
                                    >
                                        {isSending ? (
                                            <>
                                                <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Certificates
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
