import { Geist, Geist_Mono, Inter, IBM_Plex_Serif } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const ibmPlexSerif = IBM_Plex_Serif({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-ibm-plex-serif' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
const metadata = {
  title: "Horizon",
  description: "Horizon is a modern baking platform for everyone.",
  keywords: ["banking", "finance", "online banking"],
  author: "Aymane EL ABBAS",
  icons: {
    icon: '/icons/logo.svg'
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      {/* Add suppressHydrationWarning here */}
      <body
        suppressHydrationWarning
        className={`${inter.className} ${ibmPlexSerif.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
