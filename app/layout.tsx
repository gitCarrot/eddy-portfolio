import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eddy Jeon | Software Developer",
  description: "Portfolio of Eddy Jeon, a software developer specializing in modern web applications with React, TypeScript, and Node.js.",
  keywords: ["software developer", "web developer", "react", "typescript", "nextjs", "portfolio"],
  authors: [{ name: "Eddy Jeon" }],
  openGraph: {
    title: "Eddy Jeon | Software Developer",
    description: "Portfolio of Eddy Jeon, a software developer specializing in modern web applications.",
    url: "https://eddyjeon.com",
    siteName: "Eddy Jeon Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Create this image later
        width: 1200,
        height: 630,
        alt: "Eddy Jeon Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="scroll-container">
          {children}
        </div>
      </body>
    </html>
  );
}
