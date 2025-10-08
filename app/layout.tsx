import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pragyan 2025 - Coming Soon",
  description: "The ultimate college techfest experience is loading... Get ready for an extraordinary journey into the future of technology.",
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
        {children}
      </body>
    </html>
  );
}
