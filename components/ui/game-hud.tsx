"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Crown, Star, Heart, Brain, Calendar, Clock, Smile } from "lucide-react"

interface GameHudProps {
  level: number
  experience: number
  maxExperience: number
  energy: number
  streetCredits: number
  reputation: number
  health: number
  happiness: number
  motivation: number
  month: number
  year: number
  currentDay: number
  isMonthRunning: boolean
  monthProgress: number
}

export function GameHud({
  level,
  experience,
  maxExperience,
  energy,
  streetCredits,
  reputation,
  health,
  happiness,
  motivation,
  month,
  year,
  currentDay,
  isMonthRunning,
  monthProgress,
}: GameHudProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 에너지 색상
  const getEnergyColor = () => {
    if (energy >= 70) return "text-green-500"
    if (energy >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* 로고 및 레벨 */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-primary">STREET DREAMS</h1>
              <p className="text-xs text-blue-300 -mt-1">European Journey</p>
            </div>
            <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 text-sm">
              Lv.{level}
            </Badge>
          </div>

          {/* 중앙 상태 표시 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" title={`에너지: ${energy}/100`}>
              <Zap className={`w-4 h-4 ${getEnergyColor()}`} />
              <span className={`font-bold ${getEnergyColor()}`}>{energy}</span>
            </div>

            <div className="flex items-center gap-1" title={`골목 명성: ${streetCredits}`}>
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="font-bold text-yellow-400">{streetCredits}</span>
            </div>

            <div className="flex items-center gap-1" title={`명성: ${reputation}`}>
              <Star className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-purple-400">{reputation}</span>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1" title={`건강: ${health}/100`}>
                <Heart className="w-4 h-4 text-red-400" />
                <span className="font-bold text-red-400">{health}</span>
              </div>

              <div className="flex items-center gap-1" title={`행복: ${happiness}/100`}>
                <Smile className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-yellow-400">{happiness}</span>
              </div>

              <div className="flex items-center gap-1" title={`동기: ${motivation}/100`}>
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-blue-400">{motivation}</span>
              </div>
            </div>
          </div>

          {/* 날짜 및 진행 상황 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1" title={`${year}년 ${month}월`}>
              <Calendar className="w-4 h-4 text-green-400" />
              <span className="font-bold text-green-400">
                {year}.{month}
              </span>
            </div>

            {isMonthRunning ? (
              <div className="flex items-center gap-1" title={`진행 중: ${currentDay}일`}>
                <Clock className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="font-bold text-orange-400">{currentDay}일</span>
              </div>
            ) : (
              <div className="w-16" title={`월간 진행률: ${Math.round(monthProgress)}%`}>
                <Progress value={monthProgress} className="h-2 bg-gray-700" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
