"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Users, Zap, Target, Shield, Flame } from "lucide-react"

interface PersonalityTrait {
  name: string
  value: number
  icon: React.ReactNode
  description: string
  effects: string[]
}

interface PersonalitySystemProps {
  traits: {
    competitiveness: number
    teamwork: number
    creativity: number
    discipline: number
    confidence: number
    calmness: number
  }
}

export function PersonalitySystem({ traits }: PersonalitySystemProps) {
  // 성격 특성 정의
  const personalityTraits: PersonalityTrait[] = [
    {
      name: "경쟁심",
      value: traits.competitiveness,
      icon: <Flame className="w-5 h-5 text-red-400" />,
      description: "승부욕과 경쟁에 대한 열정",
      effects: ["슈팅 능력 향상", "중요 경기 퍼포먼스 증가", "스트레스 증가"],
    },
    {
      name: "팀워크",
      value: traits.teamwork,
      icon: <Users className="w-5 h-5 text-blue-400" />,
      description: "동료와의 협력 능력",
      effects: ["패스 능력 향상", "팀원 관계 개선", "어시스트 증가"],
    },
    {
      name: "창의성",
      value: traits.creativity,
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      description: "독창적인 플레이와 문제 해결 능력",
      effects: ["드리블 능력 향상", "예측 불가능한 플레이", "위험한 패스 시도"],
    },
    {
      name: "규율성",
      value: traits.discipline,
      icon: <Target className="w-5 h-5 text-green-400" />,
      description: "자기 관리와 규칙 준수 능력",
      effects: ["체력 관리 향상", "일관된 퍼포먼스", "전술 이해도 증가"],
    },
    {
      name: "자신감",
      value: traits.confidence,
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      description: "자신의 능력에 대한 믿음",
      effects: ["중요한 순간 결정력 향상", "실수 후 회복력", "과신 위험"],
    },
    {
      name: "침착함",
      value: traits.calmness,
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      description: "압박 상황에서의 평정심",
      effects: ["스트레스 저항", "정확한 판단력", "위기 상황 대처 능력"],
    },
  ]

  // 성격 유형 결정
  const getPersonalityType = () => {
    const highestTraits = [...personalityTraits]
      .sort((a, b) => b.value - a.value)
      .slice(0, 2)
      .map((t) => t.name)

    if (highestTraits.includes("경쟁심") && highestTraits.includes("자신감")) {
      return { type: "공격형 에이스", description: "승부욕이 강하고 자신감 넘치는 골 사냥꾼" }
    } else if (highestTraits.includes("팀워크") && highestTraits.includes("창의성")) {
      return { type: "창의적 플레이메이커", description: "팀을 이끄는 창의적인 패스 마스터" }
    } else if (highestTraits.includes("규율성") && highestTraits.includes("침착함")) {
      return { type: "안정적 수비수", description: "침착하고 규율 있는 수비의 중심" }
    } else if (highestTraits.includes("창의성") && highestTraits.includes("경쟁심")) {
      return { type: "화려한 드리블러", description: "창의적이고 승부욕 넘치는 개인기 마스터" }
    } else if (highestTraits.includes("팀워크") && highestTraits.includes("규율성")) {
      return { type: "헌신적 미드필더", description: "팀을 위해 헌신하는 중원의 조율사" }
    } else if (highestTraits.includes("침착함") && highestTraits.includes("자신감")) {
      return { type: "리더형 캡틴", description: "침착하고 자신감 있는 팀의 리더" }
    } else {
      return { type: "균형 잡힌 올라운더", description: "다양한 능력을 갖춘 만능 선수" }
    }
  }

  const personalityType = getPersonalityType()

  return (
    <Card className="bg-gradient-to-br from-purple-900 to-blue-900 text-white border-2 border-purple-400">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span>성격 시스템</span>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">{personalityType.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-black/30 rounded-lg border border-purple-400">
          <div className="text-lg font-bold text-purple-300 mb-2">{personalityType.type}</div>
          <div className="text-sm text-gray-300">{personalityType.description}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalityTraits.map((trait) => (
            <div key={trait.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {trait.icon}
                  <span className="font-bold">{trait.name}</span>
                </div>
                <span className="text-sm">{trait.value}/100</span>
              </div>
              <Progress value={trait.value} className="h-2 bg-gray-700" />
              <div className="text-xs text-gray-400">{trait.description}</div>
              <div className="text-xs text-gray-300">
                <span className="font-bold text-purple-300">효과:</span> {trait.effects.join(", ")}
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-purple-300 mt-4">
          <div className="font-bold mb-1">💡 성격 시스템:</div>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
            <li>성격 특성은 경험과 선택에 따라 변화합니다</li>
            <li>각 특성은 게임 내 다양한 상황에 영향을 줍니다</li>
            <li>균형 잡힌 성격이 항상 최선은 아닙니다</li>
            <li>포지션과 플레이 스타일에 맞는 성격을 발전시키세요</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
