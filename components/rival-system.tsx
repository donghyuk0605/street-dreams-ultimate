"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Swords, ArrowUp, ArrowDown, Minus } from "lucide-react"

interface Rival {
  id: string
  name: string
  team: string
  position: string
  level: number
  stats: {
    shooting: number
    passing: number
    dribbling: number
    defending: number
    speed: number
  }
  relationship: "friendly" | "neutral" | "hostile"
  matchHistory: {
    wins: number
    losses: number
    draws: number
    lastMatch?: {
      result: "win" | "loss" | "draw"
      score: string
      date: string
    }
  }
  image?: string
}

interface RivalSystemProps {
  playerStats: {
    shooting: number
    passing: number
    dribbling: number
    defending: number
    speed: number
  }
  rivals: Rival[]
  onChallengeRival: (rivalId: string) => void
}

export function RivalSystem({ playerStats, rivals, onChallengeRival }: RivalSystemProps) {
  const [selectedRival, setSelectedRival] = useState<string | null>(null)

  // 라이벌 관계에 따른 색상
  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "friendly":
        return "text-green-400"
      case "hostile":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  // 라이벌 관계에 따른 배지 색상
  const getRelationshipBadge = (relationship: string) => {
    switch (relationship) {
      case "friendly":
        return "bg-green-500"
      case "hostile":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  // 라이벌 관계 텍스트
  const getRelationshipText = (relationship: string) => {
    switch (relationship) {
      case "friendly":
        return "라이벌이자 친구"
      case "hostile":
        return "앙숙"
      default:
        return "경쟁자"
    }
  }

  // 능력치 비교 아이콘
  const getComparisonIcon = (playerStat: number, rivalStat: number) => {
    if (playerStat > rivalStat) return <ArrowUp className="w-4 h-4 text-green-400" />
    if (playerStat < rivalStat) return <ArrowDown className="w-4 h-4 text-red-400" />
    return <Minus className="w-4 h-4 text-yellow-400" />
  }

  // 라이벌 선택 핸들러
  const handleRivalSelect = (rivalId: string) => {
    setSelectedRival(rivalId === selectedRival ? null : rivalId)
  }

  // 라이벌 도전 핸들러
  const handleChallengeRival = () => {
    if (selectedRival) {
      onChallengeRival(selectedRival)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-red-900 to-orange-900 text-white border-2 border-red-400">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-red-400" />
            <span>라이벌 시스템</span>
          </div>
          <Badge className="bg-red-500">{rivals.length}명의 라이벌</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-orange-300 mb-4">
          라이벌과의 경쟁을 통해 더 빠르게 성장하세요! 라이벌을 이기면 추가 경험치와 명성을 얻습니다.
        </div>

        <div className="grid grid-cols-1 gap-4">
          {rivals.map((rival) => (
            <div
              key={rival.id}
              className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 border-2 bg-gradient-to-r from-gray-900 to-red-900 ${
                selectedRival === rival.id ? "border-yellow-400 ring-2 ring-yellow-400" : "border-gray-600"
              }`}
              onClick={() => handleRivalSelect(rival.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {rival.image ? (
                    <img
                      src={rival.image || "/placeholder.svg"}
                      alt={rival.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-400"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-xl font-bold">
                      {rival.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-white">{rival.name}</div>
                    <div className="text-xs text-gray-300">
                      {rival.team} • {rival.position}
                    </div>
                  </div>
                </div>
                <Badge className={getRelationshipBadge(rival.relationship)}>
                  {getRelationshipText(rival.relationship)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs font-bold text-orange-300 mb-2">능력치 비교:</div>
                  <div className="space-y-1">
                    {Object.entries(rival.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-xs">
                        <span className="capitalize">{key}:</span>
                        <div className="flex items-center gap-1">
                          <span>{value}</span>
                          {getComparisonIcon(playerStats[key as keyof typeof playerStats], value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-orange-300 mb-2">대결 기록:</div>
                  <div className="text-center p-2 bg-black/30 rounded">
                    <div className="text-sm font-bold">
                      {rival.matchHistory.wins}승 {rival.matchHistory.draws}무 {rival.matchHistory.losses}패
                    </div>
                    {rival.matchHistory.lastMatch && (
                      <div className="text-xs text-gray-400 mt-1">
                        최근 경기:{" "}
                        {rival.matchHistory.lastMatch.result === "win"
                          ? "승리"
                          : rival.matchHistory.lastMatch.result === "loss"
                            ? "패배"
                            : "무승부"}
                        ({rival.matchHistory.lastMatch.score})
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedRival === rival.id && (
                <div className="mt-3 pt-3 border-t border-gray-600">
                  <div className="text-xs text-gray-300 mb-2">
                    {rival.relationship === "friendly"
                      ? "친선 경쟁을 통해 서로 발전하는 라이벌입니다."
                      : rival.relationship === "hostile"
                        ? "서로를 인정하지 않는 앙숙 관계입니다."
                        : "서로의 실력을 인정하는 경쟁자입니다."}
                  </div>
                  <Button
                    onClick={handleChallengeRival}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold border border-red-400"
                  >
                    <Swords className="w-4 h-4 mr-2" />
                    라이벌에게 도전
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {rivals.length === 0 && (
          <div className="text-center p-6 bg-black/30 rounded-lg">
            <Swords className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <div className="text-xl font-bold text-red-400 mb-2">아직 라이벌이 없습니다</div>
            <div className="text-sm text-gray-300">경기에 참여하고 다른 선수들과 경쟁하면 라이벌이 생깁니다.</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
