"use client"

import { ImageWithSkeleton as Image } from "@/components/ui/image-with-skeleton"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export interface MatchResultDisplay {
  opponent: string
  score: string
  result: "win" | "loss" | "draw"
  opponentLogo?: string
  homeLogo?: string
}

interface ScoreboardOverlayProps {
  data: MatchResultDisplay | null
  onClose: () => void
}

export function ScoreboardOverlay({ data, onClose }: ScoreboardOverlayProps) {
  if (!data) return null

  const resultText =
    data.result === "win" ? "승리!" : data.result === "loss" ? "패배..." : "무승부"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">

      <Card className="relative w-full max-w-lg overflow-hidden text-white border-4 border-yellow-500 bg-fifa-gradient glass-dark shadow-3d card-hover animate-slide-in-up">
        <Image
          src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=60"
          alt="scoreboard background"
          fill
          className="object-cover opacity-40"
        />
        <CardHeader className="relative z-10 flex items-center justify-between p-6">
          <div className="flex flex-col items-center">
            <Image
              src={data.homeLogo ?? "/placeholder-logo.png"}
              alt="Street Dreams"
              width={96}
              height={96}
              className="rounded-md shadow-lg"
            />
            <div className="mt-1 font-bebas text-xl">Street Dreams</div>
          </div>
          <div className="text-center">
            <CardTitle className="text-5xl text-responsive-xl font-russo">{data.score}</CardTitle>
            <div className="mt-1 text-2xl text-responsive-lg font-bold">{resultText}</div>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={data.opponentLogo ?? "/placeholder-logo.png"}
              alt={data.opponent}
              width={96}
              height={96}
              className="rounded-md shadow-lg"
            />
            <div className="mt-1 font-bebas text-xl">{data.opponent}</div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 p-6">

          <Card className="relative w-full max-w-md overflow-hidden text-white border-2 border-yellow-500 bg-fifa-gradient animate-slide-in-right">
        <Image
          src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=60"
          alt="scoreboard background"
          fill
          className="object-cover opacity-30"
        />
        <CardHeader className="relative z-10">
          <CardTitle className="text-center text-4xl text-responsive-xl font-orbitron">
            {data.score}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Image
              src={data.homeLogo ?? "/placeholder-logo.png"}
              alt="Street Dreams"
              width={40}
              height={40}
            />
            <div className="text-2xl text-responsive-lg font-bold">{resultText}</div>
            <Image
              src={data.opponentLogo ?? "/placeholder-logo.png"}
              alt={data.opponent}
              width={40}
              height={40}
            />
          </div>
          <div className="text-center text-xl">
            Street Dreams <span className="text-yellow-400">vs</span> {data.opponent}
          </div>

          <Button onClick={onClose} variant="game" className="w-full hover-lift">
            확인
          </Button>
        </CardContent>
      </Card>
        </CardContent>
      </Card>
    </div>
  )
}
