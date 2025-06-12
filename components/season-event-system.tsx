"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sun, Cloud, Snowflake, Flower, Zap } from "lucide-react"

interface SeasonEventProps {
  currentSeason: "spring" | "summer" | "fall" | "winter"
  currentMonth: number
  onEventSelect: (eventId: string, effects: Record<string, number>) => void
}

export function SeasonEventSystem({ currentSeason, currentMonth, onEventSelect }: SeasonEventProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  // 계절별 이벤트 정의
  const seasonEvents = {
    spring: [
      {
        id: "spring_tournament",
        name: "봄맞이 골목 토너먼트",
        description: "새 학기를 맞아 열리는 동네 토너먼트",
        icon: <Flower className="w-5 h-5 text-pink-400" />,
        effects: { technique: 5, streetCredits: 20, experience: 30 },
        duration: "3일",
        energyCost: 40,
        rarity: "rare",
      },
      {
        id: "cherry_blossom_match",
        name: "벚꽃 아래 친선경기",
        description: "벚꽃이 흩날리는 공원에서 즐기는 경기",
        icon: <Flower className="w-5 h-5 text-pink-300" />,
        effects: { happiness: 10, creativity: 3, social: 5, experience: 15 },
        duration: "1일",
        energyCost: 25,
        rarity: "common",
      },
      {
        id: "rainy_day_match",
        name: "봄비 속 친선 경기",
        description: "비 오는 날에도 거침없는 실력을 보여 주세요",
        icon: <Cloud className="w-5 h-5 text-blue-200" />,
        effects: { stamina: 4, technique: 3, experience: 20 },
        duration: "1일",
        energyCost: 30,
        rarity: "common",
      },
    ],
    summer: [
      {
        id: "summer_camp",
        name: "여름 축구 캠프",
        description: "방학 기간 집중 훈련 캠프",
        icon: <Sun className="w-5 h-5 text-yellow-400" />,
        effects: { physical: 8, technique: 7, stamina: 6, experience: 50 },
        duration: "5일",
        energyCost: 60,
        rarity: "epic",
      },
      {
        id: "beach_soccer",
        name: "해변 축구",
        description: "모래사장에서 즐기는 특별한 축구",
        icon: <Sun className="w-5 h-5 text-orange-400" />,
        effects: { stamina: 10, physical: 5, happiness: 8, experience: 20 },
        duration: "2일",
        energyCost: 35,
        rarity: "rare",
      },
      {
        id: "fireworks_night_match",
        name: "불꽃 야간 경기",
        description: "한여름 밤 불꽃놀이와 함께하는 경기",
        icon: <Sun className="w-5 h-5 text-red-400" />,
        effects: { creativity: 5, happiness: 10, experience: 25 },
        duration: "1일",
        energyCost: 30,
        rarity: "rare",
      },
    ],
    fall: [
      {
        id: "school_tournament",
        name: "교내 체육대회",
        description: "학교를 대표해 출전하는 체육대회",
        icon: <Cloud className="w-5 h-5 text-blue-400" />,
        effects: { reputation: 10, leadership: 5, teamwork: 7, experience: 40 },
        duration: "3일",
        energyCost: 45,
        rarity: "rare",
      },
      {
        id: "fall_league",
        name: "가을 리그",
        description: "지역 학교들이 참가하는 정식 리그",
        icon: <Cloud className="w-5 h-5 text-gray-400" />,
        effects: { technique: 6, mentality: 8, reputation: 15, experience: 60 },
        duration: "시즌 내내",
        energyCost: 50,
        rarity: "epic",
      },
      {
        id: "harvest_festival_match",
        name: "수확 축제 매치",
        description: "풍성한 가을을 기념하는 지역 경기",
        icon: <Cloud className="w-5 h-5 text-orange-300" />,
        effects: { teamwork: 6, reputation: 5, experience: 35 },
        duration: "2일",
        energyCost: 30,
        rarity: "common",
      },
    ],
    winter: [
      {
        id: "winter_training",
        name: "동계 특별 훈련",
        description: "추운 날씨 속에서 단련하는 특별 훈련",
        icon: <Snowflake className="w-5 h-5 text-blue-300" />,
        effects: { physical: 10, mentality: 12, stamina: 8, experience: 70 },
        duration: "7일",
        energyCost: 70,
        rarity: "legendary",
      },
      {
        id: "indoor_futsal",
        name: "실내 풋살",
        description: "추운 겨울을 피해 실내에서 즐기는 풋살",
        icon: <Snowflake className="w-5 h-5 text-white" />,
        effects: { technique: 5, passing: 7, dribbling: 4, experience: 25 },
        duration: "2일",
        energyCost: 30,
        rarity: "common",
      },
      {
        id: "new_year_challenge",
        name: "신년맞이 챌린지 경기",
        description: "새해 첫날 열리는 특별 매치",
        icon: <Snowflake className="w-5 h-5 text-yellow-200" />,
        effects: { confidence: 8, technique: 5, experience: 40 },
        duration: "1일",
        energyCost: 40,
        rarity: "epic",
      },
    ],
  }

  // 현재 계절에 맞는 이벤트 가져오기
  const currentEvents = seasonEvents[currentSeason]

  // 이벤트 선택 핸들러
  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId)
    const event = currentEvents.find((e) => e.id === eventId)
    if (event) {
      onEventSelect(eventId, event.effects)
    }
  }

  // 레어도에 따른 색상 클래스
  const getRarityColorClass = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-purple-500 to-pink-500 border-purple-400"
      case "epic":
        return "from-blue-500 to-purple-500 border-blue-400"
      case "rare":
        return "from-green-500 to-blue-500 border-green-400"
      default:
        return "from-gray-500 to-blue-500 border-gray-400"
    }
  }

  // 계절 아이콘
  const getSeasonIcon = () => {
    switch (currentSeason) {
      case "spring":
        return <Flower className="w-6 h-6 text-pink-400" />
      case "summer":
        return <Sun className="w-6 h-6 text-yellow-400" />
      case "fall":
        return <Cloud className="w-6 h-6 text-orange-400" />
      case "winter":
        return <Snowflake className="w-6 h-6 text-blue-300" />
    }
  }

  // 계절 이름 (한글)
  const getSeasonName = () => {
    switch (currentSeason) {
      case "spring":
        return "봄"
      case "summer":
        return "여름"
      case "fall":
        return "가을"
      case "winter":
        return "겨울"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-blue-900 text-white border-2 border-blue-400">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getSeasonIcon()}
            <span>{getSeasonName()} 시즌 이벤트</span>
          </div>
          <Badge className="bg-blue-500">{currentMonth}월</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-blue-300 mb-4">
          계절마다 특별한 이벤트에 참여하여 추가 경험치와 능력치를 얻으세요!
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 border-2 bg-gradient-to-r ${getRarityColorClass(
                event.rarity,
              )} ${selectedEvent === event.id ? "ring-2 ring-yellow-400" : ""}`}
              onClick={() => handleEventSelect(event.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                {event.icon}
                <div>
                  <div className="font-bold text-white">{event.name}</div>
                  <div className="text-xs opacity-80">{event.description}</div>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>기간:</span>
                  <span className="font-bold">{event.duration}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>에너지 소모:</span>
                  <span className="font-bold text-red-300 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {event.energyCost}
                  </span>
                </div>
                <div className="text-xs uppercase font-bold mt-1 text-yellow-300">{event.rarity}</div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/20">
                <div className="text-xs font-bold mb-1">획득 효과:</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(event.effects).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-xs bg-black/30">
                      {key}: +{value}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold border-2 border-green-400 mt-4">
            이벤트 참가하기
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
