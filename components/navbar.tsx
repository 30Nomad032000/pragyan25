"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {

    return (
        <header className="w-full">
            {/* Position like reference: absolute, centered, pill with glass effect */}
            <nav aria-label="Main" className="absolute left-0 right-0 top-10 z-10">
                <div
                    className={cn(
                        "mx-auto w-[80%] lg:w-[60%]",
                        "flex items-center justify-between",
                        "rounded-[50px] py-4 px-4 lg:px-6 text-white",
                    )}
                    style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
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

                        <Link href="/events" className="hover:text-cyan-400 transition-colors">
                            Events
                        </Link>

                        <Link href="/faq" className="hover:text-cyan-400 transition-colors">
                            About
                        </Link>

                        <Link href="/faq" className="hover:text-cyan-400 transition-colors">
                            Rules
                        </Link>

                    </div>

                    {/* Right: Login (desktop) + Mobile menu trigger */}
                    <div className="flex items-center gap-2">
                        <Button
                            asChild
                            variant="outline"
                            className="hidden rounded-full bg-transparent px-5 text-white border-white/30 hover:bg-white/10 md:inline-flex"
                        >
                            <Link href="/register">Register</Link>
                        </Button>

                        {/* Mobile menu button */}


                    </div>
                </div>
            </nav>
        </header>
    )
}
