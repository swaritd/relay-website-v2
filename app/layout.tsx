import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Relay - Never Miss Another Patient Call",
  description:
    "Relay text-based answering service ensures every patient reaches your dental practice, even when you're busy with appointments. Convert 85% of missed calls into appointments.",
  generator: "v0.dev",
  metadataBase: new URL("https://getrelay.ca"),
  openGraph: {
    title: "Relay - Never Miss Another Patient Call",
    description:
      "Relay text-based answering service ensures every patient reaches your dental practice, even when you're busy with appointments. Convert 85% of missed calls into appointments.",
    url: "https://getrelay.ca",
    siteName: "Relay",
    images: [
      {
        url: "/relay-logo.svg",
        width: 1200,
        height: 630,
        alt: "Relay - Never Miss Another Patient Call",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relay - Never Miss Another Patient Call",
    description:
      "Convert 85% of missed calls into appointments with our text-based answering service for dental practices.",
    images: ["/relay-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
