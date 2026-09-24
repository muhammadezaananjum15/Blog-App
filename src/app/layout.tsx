import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Content Hub — Premium Intelligence, News & Analysis",
  description:
    "An ultra-premium editorial publication delivering current affairs, geopolitics, technology, crypto markets, and cultural analysis. Powered by real-time public APIs with zero editorial compromise.",
  keywords: [
    "Content Hub",
    "Current Affairs",
    "Geo Politics",
    "Tech News",
    "Crypto News",
    "AI",
    "Design",
    "Editorial",
    "Premium Blog",
    "Real-time News",
  ],
  authors: [{ name: "Content Hub Editorial" }],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#050505] text-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className="bg-[#050505] text-white antialiased selection:bg-[#D4A853] selection:text-black">
        {children}
      </body>
    </html>
  );
}
