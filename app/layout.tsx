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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${inter.variable}`}
      >

        <Navbar />
        {children}
      </body>
    </html>
  );
}
