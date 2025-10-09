import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
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
      </body>
    </html>
  );
}
