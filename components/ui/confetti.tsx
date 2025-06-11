"use client"

import { useState, useEffect } from "react"
import ReactConfetti from "react-confetti"

interface ConfettiProps {
  active: boolean
  duration?: number
  onComplete?: () => void
}

export function Confetti({ active, duration = 3000, onComplete }: ConfettiProps) {
  const [isActive, setIsActive] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (active) {
      setIsActive(true)
      const timer = setTimeout(() => {
        setIsActive(false)
        if (onComplete) onComplete()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [active, duration, onComplete])

  if (!isActive) return null

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
      colors={["#FFD700", "#FFA500", "#FF4500", "#FF6347", "#FF8C00", "#FFD700"]}
    />
  )
}
