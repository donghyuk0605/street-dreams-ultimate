"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
  tips?: string[]
}

export function LoadingScreen({ onComplete, tips = [] }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [tip, setTip] = useState("")

  useEffect(() => {
    const defaultTips = [
      "골목축구에서 명성을 쌓으면 더 많은 기회가 찾아옵니다!",
      "정기적인 휴식은 부상 위험을 줄여줍니다.",
      "라이벌과의 경쟁은 더 빠른 성장을 도와줍니다.",
      "성격 특성은 경기 스타일에 큰 영향을 미칩니다.",
      "계절별 이벤트에 참여하여 특별한 보상을 얻으세요!",
    ]

    const allTips = [...defaultTips, ...tips]
    setTip(allTips[Math.floor(Math.random() * allTips.length)])

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete, tips])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-russo text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 text-center">
          STREET DREAMS
        </h1>
        <p className="text-lg text-blue-300 text-center mt-2">European Journey</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-64 h-64 relative mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
        <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-[url('/images/soccer-ball.png')] bg-contain bg-center bg-no-repeat animate-spin-slow"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-80 space-y-4"
      >
        <Progress value={progress} className="h-3 bg-gray-800" />
        <p className="text-center text-white font-bold">{Math.round(progress)}%</p>
        <div className="bg-black/30 p-4 rounded-lg border border-blue-500">
          <p className="text-sm text-blue-200 italic">💡 {tip}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
