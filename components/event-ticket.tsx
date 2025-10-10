"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import QRCode from "qrcode";

// --- SVG Icons ---

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const TicketIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
    </svg>
);

// --- Helper Components ---

const DashedLine = () => (
    <div
        className="w-full border-t-2 border-dashed border-gray-300"
        aria-hidden="true"
    />
);

const QRCodeComponent = ({ value }: { value: string }) => {
    const [qrCodeDataURL, setQrCodeDataURL] = React.useState<string>("");

    React.useEffect(() => {
        const generateQRCode = async () => {
            try {
                // Generate the admin confirmation URL
                const adminUrl = `${window.location.origin}/admin/confirm/${value}`;

                const dataURL = await QRCode.toDataURL(adminUrl, {
                    width: 100,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
                setQrCodeDataURL(dataURL);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        };

        generateQRCode();
    }, [value]);

    if (!qrCodeDataURL) {
        return (
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <img
                src={qrCodeDataURL}
                alt={`QR Code for ${value}`}
                className="w-24 h-24 rounded-lg border-2 border-gray-300"
            />
        </div>
    );
};

const ConfettiExplosion = () => {
    const confettiCount = 100;
    const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#8b5cf6", "#f97316"];

    return (
        <>
            <style>
                {`
          @keyframes fall {
            0% {
                transform: translateY(-10vh) rotate(0deg);
                opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
            </style>
            <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
                {Array.from({ length: confettiCount }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-4"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${-20 + Math.random() * 10}%`,
                            backgroundColor: colors[i % colors.length],
                            transform: `rotate(${Math.random() * 360}deg)`,
                            animation: `fall ${2.5 + Math.random() * 2.5}s ${Math.random() * 2}s linear forwards`,
                        }}
                    />
                ))}
            </div>
        </>
    );
};

// --- Main Event Ticket Component ---

export interface EventTicketProps extends React.HTMLAttributes<HTMLDivElement> {
    ticketId: string;
    amount: number;
    date: Date;
    participantName: string;
    participantEmail: string;
    participantPhone: string;
    organization: string;
    eventName: string;
    barcodeValue: string;
    icon?: React.ReactNode;
}

const EventTicket = React.forwardRef<HTMLDivElement, EventTicketProps>(
    (
        {
            className,
            ticketId,
            amount,
            date,
            participantName,
            participantEmail,
            participantPhone,
            organization,
            eventName,
            barcodeValue,
            ...props
        },
        ref
    ) => {
        const [showConfetti, setShowConfetti] = React.useState(false);

        React.useEffect(() => {
            const mountTimer = setTimeout(() => setShowConfetti(true), 100);
            const unmountTimer = setTimeout(() => setShowConfetti(false), 6000);
            return () => {
                clearTimeout(mountTimer);
                clearTimeout(unmountTimer);
            };
        }, []);

        const formattedAmount = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount);

        const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date).replace(',', ' •');

        return (
            <>
                {showConfetti && <ConfettiExplosion />}
                <div
                    ref={ref}
                    className={cn(
                        "relative w-full max-w-lg bg-white text-black rounded-2xl shadow-lg font-sans z-10 border-2 border-gray-200",
                        "animate-in fade-in-0 zoom-in-95 duration-500",
                        className
                    )}
                    {...props}
                >
                    {/* Ticket cut-out effect */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50" />
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50" />

                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-full">
                                    <TicketIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold">Event Ticket</h1>
                                    <p className="text-sm text-cyan-100">Pragyan 2025</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-cyan-100 uppercase">Amount</p>
                                <p className="font-bold text-lg">{formattedAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        {/* Event Name */}
                        <div className="text-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800">{eventName}</h2>
                            <p className="text-sm text-gray-600">Registration Confirmed</p>
                        </div>

                        <DashedLine />

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Left Column */}
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Ticket ID</p>
                                    <p className="font-mono font-bold text-sm">{ticketId}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Registration Date</p>
                                    <p className="font-medium text-sm text-gray-800">{formattedDate}</p>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Participant</p>
                                    <p className="font-semibold text-sm text-gray-800">{participantName}</p>
                                    <p className="text-xs text-gray-600">{organization}</p>
                                </div>
                            </div>

                            {/* Right Column - QR Code */}
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Entry Code</p>
                                <QRCodeComponent value={barcodeValue} />
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Present at entrance
                                </p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                                <div>
                                    <span className="font-semibold">Email:</span> {participantEmail}
                                </div>
                                <div>
                                    <span className="font-semibold">Phone:</span> {participantPhone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
);

EventTicket.displayName = "EventTicket";

export { EventTicket };
