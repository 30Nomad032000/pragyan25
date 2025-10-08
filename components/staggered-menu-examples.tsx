import { useState } from "react"
import { StaggeredMenu } from "@/components/ui/staggered-menu"

// Example 1: Basic usage with external control
export function BasicStaggeredMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const menuItems = [
        { label: "Home", ariaLabel: "Go to homepage", link: "/" },
        { label: "About", ariaLabel: "Learn about us", link: "/about" },
        { label: "Contact", ariaLabel: "Contact us", link: "/contact" }
    ]

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>
            <StaggeredMenu
                items={menuItems}
                isFixed={true}
                isOpen={isOpen}
                position="right"
                colors={['#B19EEF', '#5227FF']}
                onMenuOpen={() => console.log('Menu opened')}
                onMenuClose={() => console.log('Menu closed')}
            />
        </div>
    )
}

// Example 2: Left positioned with social links
export function LeftStaggeredMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const menuItems = [
        { label: "Products", ariaLabel: "View our products", link: "/products" },
        { label: "Services", ariaLabel: "Our services", link: "/services" },
        { label: "Portfolio", ariaLabel: "View our work", link: "/portfolio" },
        { label: "Blog", ariaLabel: "Read our blog", link: "/blog" }
    ]

    const socialItems = [
        { label: "Twitter", link: "https://twitter.com" },
        { label: "GitHub", link: "https://github.com" },
        { label: "LinkedIn", link: "https://linkedin.com" }
    ]

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>
            <StaggeredMenu
                position="left"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                isFixed={true}
                isOpen={isOpen}
                colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
                accentColor="#FF6B6B"
                logoUrl="/logo.png"
            />
        </div>
    )
}

// Example 3: Custom styled menu
export function CustomStaggeredMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const menuItems = [
        { label: "Dashboard", ariaLabel: "Go to dashboard", link: "/dashboard" },
        { label: "Analytics", ariaLabel: "View analytics", link: "/analytics" },
        { label: "Settings", ariaLabel: "Open settings", link: "/settings" },
        { label: "Profile", ariaLabel: "View profile", link: "/profile" },
        { label: "Help", ariaLabel: "Get help", link: "/help" }
    ]

    const socialItems = [
        { label: "Discord", link: "https://discord.com" },
        { label: "YouTube", link: "https://youtube.com" },
        { label: "Instagram", link: "https://instagram.com" }
    ]

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-purple-500 text-white rounded"
            >
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>
            <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={false}
                isFixed={false}
                isOpen={isOpen}
                colors={['#667eea', '#764ba2']}
                accentColor="#667eea"
                logoUrl="/logo.png"
                className="custom-menu-wrapper"
                onMenuOpen={() => console.log("Custom menu opened")}
                onMenuClose={() => console.log("Custom menu closed")}
            />
        </div>
    )
}

// Example 4: Minimal menu without social links
export function MinimalStaggeredMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const menuItems = [
        { label: "Home", ariaLabel: "Homepage", link: "/" },
        { label: "Work", ariaLabel: "Our work", link: "/work" },
        { label: "About", ariaLabel: "About us", link: "/about" },
        { label: "Contact", ariaLabel: "Contact", link: "/contact" }
    ]

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>
            <StaggeredMenu
                position="right"
                items={menuItems}
                displaySocials={false}
                displayItemNumbering={true}
                isFixed={true}
                isOpen={isOpen}
                colors={['#1a1a1a', '#333333']}
                accentColor="#00ff88"
            />
        </div>
    )
}
