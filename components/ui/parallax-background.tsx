"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()

  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100])
  const midgroundY = useTransform(scrollY, [0, 1000], [0, -200])
  const foregroundY = useTransform(scrollY, [0, 1000], [0, -300])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 별 배경 */}
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80')] bg-repeat opacity-70"
        style={{ y: backgroundY }}
      />

      {/* 도시 실루엣 */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[30vh] bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80')] bg-repeat-x bg-bottom opacity-40"
        style={{ y: midgroundY }}
      />

      {/* 구름 */}
      <motion.div
        className="absolute top-[20%] left-0 right-0 h-[20vh] bg-[url('https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1920&q=80')] bg-repeat-x bg-contain opacity-20"
        style={{ y: foregroundY }}
      />

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-purple-900/50" />
    </div>
  )
}
