"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { useState, useEffect } from "react"
import { SoundProvider } from "@/components/sound-context"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SoundProvider>{children}</SoundProvider>
    </ThemeProvider>
  )
}
