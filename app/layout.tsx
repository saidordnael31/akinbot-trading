import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext" // Importa o LanguageProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SET Token - Um token cripto imobiliário",
  description: "Invista em imóveis com SET Token, um token cripto imobiliário.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
