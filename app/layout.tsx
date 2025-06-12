import type React from "react"
import type { Metadata } from "next"
import {
  Inter,
  Orbitron,
  Russo_One,
  Bebas_Neue,
} from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })
const russo = Russo_One({ subsets: ["latin"], variable: "--font-russo" })
const bebas = Bebas_Neue({ subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: "Street Dreams: European Journey",
  description: "축구 꿈나무의 성장 스토리를 그리는 RPG 게임",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${orbitron.variable} ${russo.variable} ${bebas.variable}`}> 
      <body className="font-inter">{children}</body>
    </html>
  )
}
