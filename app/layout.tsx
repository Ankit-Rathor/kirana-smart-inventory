import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KiranaIQ - Smart Inventory Management",
  description: "Smart Inventory & Profit Optimization System for Kirana Stores",
  manifest: "/manifest.json",
  themeColor: "#4F46E5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KiranaIQ" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
