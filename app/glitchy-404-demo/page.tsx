"use client";
import { useTheme } from "next-themes";
import { Glitchy404 } from "@/components/ui/glitchy-404-1";

export default function Glitchy404Demo() {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-black">
            <div className="text-center space-y-8">
                <h1 className="text-4xl font-bold text-white mb-8">
                    Glitchy 404 Component Demo
                </h1>

                {/* Default white version */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">Default (White)</h2>
                    <Glitchy404 width={800} height={232} color="#fff" />
                </div>

                {/* Black version for light theme */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">Black Version</h2>
                    <Glitchy404 width={800} height={232} color="#000" />
                </div>

                {/* Red version */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">Red Version</h2>
                    <Glitchy404 width={800} height={232} color="#ff0000" />
                </div>

                {/* Blue version */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">Blue Version</h2>
                    <Glitchy404 width={600} height={174} color="#00bfff" />
                </div>

                {/* Small version */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">Small Version</h2>
                    <Glitchy404 width={400} height={116} color="#00ff00" />
                </div>

                {/* Theme-aware version */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Theme-aware Version (Current: {theme || "system"})
                    </h2>
                    <Glitchy404
                        width={800}
                        height={232}
                        color={theme === "dark" ? "#fff" : "#000"}
                    />
                </div>

                <div className="text-white text-sm max-w-2xl mx-auto">
                    <p className="mb-4">
                        This component features:
                    </p>
                    <ul className="text-left space-y-2">
                        <li>• Glitchy shake animations with different timing for each part</li>
                        <li>• Fuzzy canvas effect that creates a distorted look</li>
                        <li>• Customizable width, height, and color props</li>
                        <li>• Responsive design that works on different screen sizes</li>
                        <li>• Built with Framer Motion for smooth animations</li>
                        <li>• TypeScript support with proper type definitions</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
