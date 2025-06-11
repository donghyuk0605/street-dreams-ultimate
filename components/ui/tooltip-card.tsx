"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TooltipCardProps {
  children: React.ReactNode
  content: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  width?: string
  delay?: number
}

export function TooltipCard({ children, content, position = "top", width = "w-64", delay = 300 }: TooltipCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setIsVisible(true), delay)
  }

  const hideTooltip = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsVisible(false)
  }

  useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      let x = 0
      let y = 0

      switch (position) {
        case "top":
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
          y = triggerRect.top - tooltipRect.height - 10
          break
        case "bottom":
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
          y = triggerRect.bottom + 10
          break
        case "left":
          x = triggerRect.left - tooltipRect.width - 10
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
          break
        case "right":
          x = triggerRect.right + 10
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
          break
      }

      // 화면 경계 체크
      const padding = 10
      x = Math.max(padding, Math.min(x, window.innerWidth - tooltipRect.width - padding))
      y = Math.max(padding, Math.min(y, window.innerHeight - tooltipRect.height - padding))

      setCoords({ x, y })
    }

    if (isVisible) {
      updatePosition()
      window.addEventListener("resize", updatePosition)
      window.addEventListener("scroll", updatePosition)
    }

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [isVisible, position])

  return (
    <div
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      className="relative inline-block"
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              zIndex: 100,
              pointerEvents: "none",
            }}
            className={`${width} bg-gradient-to-br from-gray-900 to-blue-900 text-white p-3 rounded-lg shadow-xl border border-blue-500`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
