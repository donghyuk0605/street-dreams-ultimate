"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Swords, Goal } from "lucide-react"

interface Match {
  id: string
  opponent: string
  date: string
  type: "league" | "cup" | "friendly" | "tournament" | "street"
  importance: "low" | "medium" | "high" | "legendary"
  venue: string
  result?: "win" | "loss" | "draw"
  score?: string
}

interface MatchResult {
  result: "win" | "loss" | "draw"
  score: string
}

interface MatchSystemProps {
  matches: Match[]
  onPlayMatch: (matchId: string, result: MatchResult) => void
}

export function MatchSystem({ matches, onPlayMatch }: MatchSystemProps) {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedMatch(id === selectedMatch ? null : id)
  }

  const handlePlay = () => {
    if (!selectedMatch) return

    const playerScore = Math.floor(Math.random() * 4)
    const opponentScore = Math.floor(Math.random() * 4)
    const result: MatchResult = {
      result:
        playerScore > opponentScore
          ? "win"
          : playerScore < opponentScore
            ? "loss"
            : "draw",
      score: `${playerScore}-${opponentScore}`,
    }

    onPlayMatch(selectedMatch, result)
    setSelectedMatch(null)
  }

  const getBadgeClass = (r: "win" | "loss" | "draw") => {
    switch (r) {
      case "win":
        return "bg-green-500"
      case "loss":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-green-600 to-blue-600 text-white border-2 border-green-400">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Swords className="w-5 h-5" /> 경기 시스템
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {matches.length > 0 ? (
          <>
            <div className="space-y-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => handleSelect(match.id)}
                  className={`p-3 rounded-lg border cursor-pointer bg-black/30 transition-all ${selectedMatch === match.id ? "border-yellow-400 ring-2 ring-yellow-400" : "border-gray-600"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-yellow-400">vs {match.opponent}</div>
                      <div className="text-xs text-gray-300">
                        {match.venue} • {match.date}
                      </div>
                    </div>
                    {match.result && (
                      <Badge className={getBadgeClass(match.result)}>
                        {match.result === "win" ? "승" : match.result === "loss" ? "패" : "무"} {match.score}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {selectedMatch && (
              <Button onClick={handlePlay} className="w-full bg-yellow-500 text-black font-bold">
                <Goal className="w-4 h-4 mr-2" /> 경기 시작
              </Button>
            )}
          </>
        ) : (
          <div className="text-center text-gray-200 py-4">예정된 경기가 없습니다</div>
        )}
      </CardContent>
    </Card>
  )
}

