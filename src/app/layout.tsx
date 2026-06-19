import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import Navbar from "@/components/Navbar"
import ParticlesBg from "@/components/ParticlesBg"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const siteUrl = "https://leonidacitizen.com"

export const metadata: Metadata = {
  title: {
    default: "Leonida Hub — GTA VI Community Portal",
    template: "%s — Leonida Hub",
  },
  description:
    "The definitive Grand Theft Auto VI community hub. Pre-register your server, explore the interactive map of Vice City, calculate your PC specs, and join the forum.",
  keywords: [
    "GTA VI",
    "GTA 6",
    "Grand Theft Auto VI",
    "Leonida",
    "Vice City",
    "GTA 6 community",
    "GTA VI forum",
    "GTA VI map",
    "GTA VI servers",
    "bottleneck calculator",
  ],
  authors: [{ name: "Leonida Hub" }],
  openGraph: {
    title: "Leonida Hub — GTA VI Community Portal",
    description:
      "The definitive Grand Theft Auto VI community hub. Pre-register your server, explore the interactive map, calculate your PC specs, and join the forum.",
    url: siteUrl,
    siteName: "Leonida Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: "Leonida Hub — GTA VI Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonida Hub — GTA VI Community Portal",
    description:
      "The definitive Grand Theft Auto VI community hub. Pre-register your server, explore the interactive map, calculate your PC specs, and join the forum.",
    images: [`${siteUrl}/logo.png`],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Leonida Hub",
              url: siteUrl,
              description:
                "The definitive Grand Theft Auto VI community hub. Pre-register your server, explore the interactive map of Vice City, calculate your PC specs, and join the forum.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/foro?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <ParticlesBg />
          <Navbar />
          <main className="relative z-10">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
