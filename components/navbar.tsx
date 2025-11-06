"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const mobileMenuRef = useRef<HTMLDivElement>(null)


    const navigationItems = pathname.startsWith("/admin") ? [
        { href: "/", label: "Home" },
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/event", label: "Events" },
        { href: "/admin/certificates", label: "Certificates" },
    ] : [
        { href: "/", label: "Home" },
        { href: "/events", label: "Events" },
        { href: "/about", label: "About" },
        { href: "/rules", label: "Rules" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy" },
    ]

    const isActiveRoute = (href: string) => {
        if (href === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(href)
    }

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false)
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMobileMenuOpen])

    return (
        <header className="w-full">
            {/* Position like reference: absolute, centered, pill with glass effect */}
            <nav aria-label="Main" className="absolute left-0 right-0 top-10 z-50">
                <div
                    className={cn(
                        "mx-auto w-[80%] lg:w-[60%]",
                        "flex items-center justify-between",
                        "rounded-[50px] py-4 px-4 lg:px-6 text-white",
                        "bg-black/20 backdrop-blur-md",
                        "border border-white/10",
                        "shadow-lg shadow-black/20"
                    )}
                >
                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-2" aria-label="Homepage">
                        <Image
                            src="/logo.png"
                            alt="Brand logo"
                            width={42}
                            height={42}
                            className="rounded-sm"
                            priority
                        />
                    </Link>

                    {/* Center: Links (desktop) */}
                    <div className="hidden items-center gap-8 font-semibold text-sm md:flex">
                        {navigationItems.slice(1).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "hover:text-cyan-400 transition-colors",
                                    isActiveRoute(item.href) && "text-cyan-400"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Mobile menu trigger */}
                    <div className="flex items-center gap-2">

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden p-2 text-white hover:bg-white/10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div
                    ref={mobileMenuRef}
                    className={cn(
                        "md:hidden absolute top-full left-0 right-0 mt-2 mx-4 z-50",
                        "transition-all duration-300 ease-in-out",
                        isMobileMenuOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-4 pointer-events-none"
                    )}
                >
                    <div
                        className="rounded-2xl py-4 px-6 text-white bg-black/30 backdrop-blur-lg border border-white/15 shadow-xl shadow-black/30"
                    >
                        <nav className="flex flex-col space-y-3">
                            {navigationItems.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-white/10",
                                        "transform transition-all duration-300 ease-out",
                                        isMobileMenuOpen
                                            ? "translate-x-0 opacity-100"
                                            : "translate-x-4 opacity-0",
                                        isActiveRoute(item.href)
                                            ? "bg-white/15 text-cyan-400 border border-white/20"
                                            : "text-white hover:text-cyan-300"
                                    )}
                                    style={{
                                        transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms"
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </nav>
        </header>
    )
}
