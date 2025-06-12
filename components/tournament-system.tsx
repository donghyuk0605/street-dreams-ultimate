"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Swords } from "lucide-react"

interface TournamentSystemProps {
  teams: string[]
  onFinish?: (winner: string) => void
}

interface MatchResult {
  score: string
  winner: string
}

export function TournamentSystem({ teams, onFinish }: TournamentSystemProps) {
  // 4팀 토너먼트만 지원
  const [semiResults, setSemiResults] = useState<(MatchResult | null)[]>([
    null,
    null,
  ])
  const [finalResult, setFinalResult] = useState<MatchResult | null>(null)

  const playMatch = (
    teamA: string,
    teamB: string,
    round: "semi" | "final",
    index: number,
  ) => {
    const scoreA = Math.floor(Math.random() * 5)
    const scoreB = Math.floor(Math.random() * 5)
    const result: MatchResult = {
      score: `${scoreA}-${scoreB}`,
      winner: scoreA >= scoreB ? teamA : teamB,
    }

    if (round === "semi") {
      const updated = [...semiResults]
      updated[index] = result
      setSemiResults(updated)
    } else {
      setFinalResult(result)
      if (onFinish) onFinish(result.winner)
    }
  }

  const canPlayFinal = semiResults.every((r) => r !== null)
  const finalistA = semiResults[0]?.winner ?? teams[0]
  const finalistB = semiResults[1]?.winner ?? teams[3]

  return (
    <Card className="bg-gradient-to-br from-yellow-600 to-red-600 text-white border-2 border-yellow-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" /> 토너먼트
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 준결승 */}
        <div className="space-y-3">
          {[
            [teams[0], teams[1]],
            [teams[2], teams[3]],
          ].map(([a, b], i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-black/30 border border-gray-600 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-yellow-300">
                  {a} vs {b}
                </div>
                {semiResults[i] && (
                  <Badge className="bg-purple-500">
                    {semiResults[i]!.winner} 승 {semiResults[i]!.score}
                  </Badge>
                )}
              </div>
              {!semiResults[i] && (
                <Button
                  onClick={() => playMatch(a, b, "semi", i)}
                  className="w-full bg-purple-500 text-black font-bold"
                >
                  <Swords className="w-4 h-4 mr-2" /> 경기 진행
                </Button>
              )}
            </div>
          ))}
        </div>
        {/* 결승 */}
        {canPlayFinal && !finalResult && (
          <div className="p-3 rounded-lg bg-black/30 border border-yellow-500 space-y-2">
            <div className="font-bold text-yellow-300">
              {finalistA} vs {finalistB} (결승)
            </div>
            <Button
              onClick={() => playMatch(finalistA, finalistB, "final", 0)}
              className="w-full bg-yellow-500 text-black font-bold"
            >
              <Swords className="w-4 h-4 mr-2" /> 결승 진행
            </Button>
          </div>
        )}
        {finalResult && (
          <div className="p-4 rounded-lg bg-black/30 border border-yellow-500 text-center space-y-2">
            <div className="text-lg font-bold text-yellow-300">우승팀: {finalResult.winner}</div>
            <div className="text-sm">점수 {finalResult.score}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
