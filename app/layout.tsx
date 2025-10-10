import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pragyan.fun'),
  title: "Pragyan 2025",
  description: "The ultimate college techfest. Get ready for an extraordinary journey into the future of technology.",

  // Open Graph tags for Facebook, WhatsApp, LinkedIn, etc.
  openGraph: {
    title: "Pragyan 2025 - The Ultimate MCA College Techfest",
    description: "The ultimate college techfest. Get ready for an extraordinary journey into the future of technology.",
    url: "https://pragyan.fun", // Replace with your actual domain
    siteName: "Pragyan 2025",
    images: [
      {
        url: "/og-image.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Pragyan 2025 - MCA College Techfest",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card tags
  twitter: {
    card: "summary_large_image",
    title: "Pragyan 2025 - The Ultimate MCA College Techfest",
    description: "The ultimate MCA college techfest. Get ready for an extraordinary journey into the future of technology.",
    images: ["/og-image.png"], // Same image as Open Graph
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["techfest", "college", "technology", "events", "competitions", "Pragyan 2025", "MCA College Techfest"],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ backgroundColor: '#000000' }}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body, #__next { 
              background-color: #000000 !important; 
              margin: 0; 
              padding: 0; 
            }
          `
        }} />
      </head>
      <body
        className={`antialiased ${inter.variable}`}
        style={{ backgroundColor: '#000000' }}
      >

        <Navbar />
        {children}
        <Toaster
          richColors
          position="top-right"
          theme="dark"
          className="toaster-custom"
          toastOptions={{
            classNames: {
              toast: "group toast group-[.toaster-custom]:bg-black/90 group-[.toaster-custom]:text-cyan-100 group-[.toaster-custom]:border-cyan-500/40 group-[.toaster-custom]:shadow-2xl group-[.toaster-custom]:shadow-cyan-500/20 group-[.toaster-custom]:backdrop-blur-xl group-[.toaster-custom]:rounded-xl",
              description: "group-[.toast]:text-cyan-200/80",
              actionButton: "group-[.toast]:bg-gradient-to-r group-[.toast]:from-cyan-500 group-[.toast]:to-purple-500 group-[.toast]:text-black group-[.toast]:font-bold group-[.toast]:rounded-lg",
              cancelButton: "group-[.toast]:bg-black/40 group-[.toast]:text-cyan-300 group-[.toast]:border group-[.toast]:border-cyan-500/30 group-[.toast]:rounded-lg",
              title: "group-[.toast]:text-cyan-100 group-[.toast]:font-semibold",
              success: "group-[.toast]:border-green-500/40 group-[.toast]:bg-green-500/5",
              error: "group-[.toast]:border-red-500/40 group-[.toast]:bg-red-500/5",
              info: "group-[.toast]:border-blue-500/40 group-[.toast]:bg-blue-500/5",
              warning: "group-[.toast]:border-yellow-500/40 group-[.toast]:bg-yellow-500/5",
            },
          }}
        />
      </body>
    </html>
  );
}
