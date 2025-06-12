"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Heart, Activity, Pill } from "lucide-react"

interface InjurySystemProps {
  isInjured: boolean
  injuryType?: "minor" | "moderate" | "severe"
  injuryName?: string
  recoveryDays: number
  totalRecoveryDays: number
  onTreatment: (treatmentType: string) => void
}

export function InjurySystem({
  isInjured,
  injuryType = "minor",
  injuryName = "발목 염좌",
  recoveryDays,
  totalRecoveryDays,
  onTreatment,
}: InjurySystemProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null)

  // 부상 심각도에 따른 색상
  const getInjurySeverityColor = () => {
    switch (injuryType) {
      case "severe":
        return "text-red-500"
      case "moderate":
        return "text-orange-500"
      default:
        return "text-yellow-500"
    }
  }

  // 부상 심각도에 따른 배지 색상
  const getInjurySeverityBadge = () => {
    switch (injuryType) {
      case "severe":
        return "bg-red-500"
      case "moderate":
        return "bg-orange-500"
      default:
        return "bg-yellow-500"
    }
  }

  // 부상 심각도 텍스트
  const getInjurySeverityText = () => {
    switch (injuryType) {
      case "severe":
        return "심각"
      case "moderate":
        return "중간"
      default:
        return "경미"
    }
  }

  // 치료 옵션
  const treatmentOptions = [
    {
      id: "rest",
      name: "휴식",
      description: "충분한 휴식으로 자연 치유",
      effect: "회복 +1일",
      cost: 0,
      energyGain: 20,
    },
    {
      id: "medicine",
      name: "약물 치료",
      description: "소염제와 진통제 복용",
      effect: "회복 +2일",
      cost: 10000,
      energyGain: 10,
    },
    {
      id: "physical_therapy",
      name: "물리치료",
      description: "전문 물리치료사의 치료",
      effect: "회복 +3일",
      cost: 30000,
      energyGain: 15,
    },
    {
      id: "sports_medicine",
      name: "스포츠 의학 센터",
      description: "최첨단 의료 장비로 집중 치료",
      effect: "회복 +5일",
      cost: 100000,
      energyGain: 25,
    },
  ]

  // 치료 선택 핸들러
  const handleTreatmentSelect = (treatmentId: string) => {
    setSelectedTreatment(treatmentId)
  }

  // 치료 적용 핸들러
  const applyTreatment = () => {
    if (selectedTreatment) {
      onTreatment(selectedTreatment)
      setSelectedTreatment(null)
    }
  }

  return (
    <Card
      className={`bg-gradient-to-br from-gray-800 to-gray-900 text-white border ${isInjured ? "border-destructive" : "border-primary"}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isInjured ? (
              <AlertTriangle className="w-5 h-5 text-destructive" />
            ) : (
              <Heart className="w-5 h-5 text-primary" />
            )}
            <span>{isInjured ? "부상 관리" : "건강 상태"}</span>
          </div>
          {isInjured && <Badge className={getInjurySeverityBadge()}>{getInjurySeverityText()}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isInjured ? (
          <>
            <div className="text-center p-4 bg-black/30 rounded-lg border border-destructive">
              <div className={`text-xl font-bold ${getInjurySeverityColor()} mb-2`}>{injuryName}</div>
              <div className="text-sm text-gray-300">
                회복까지 남은 일수: {recoveryDays}일 / {totalRecoveryDays}일
              </div>
              <Progress value={(1 - recoveryDays / totalRecoveryDays) * 100} className="h-2 mt-2 bg-gray-700" />
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold text-primary">치료 옵션:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {treatmentOptions.map((treatment) => (
                  <div
                    key={treatment.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all hover:scale-105 border ${
                      selectedTreatment === treatment.id
                        ? "bg-gradient-to-r from-accent to-primary border-primary"
                        : "bg-black/30 border-gray-600"
                    }`}
                    onClick={() => handleTreatmentSelect(treatment.id)}
                  >
                    <div className="font-bold flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      {treatment.name}
                    </div>
                    <div className="text-xs text-gray-300 mt-1">{treatment.description}</div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="text-primary">{treatment.effect}</span>
                      <span className="text-accent">비용: {treatment.cost.toLocaleString()}원</span>
                    </div>
                    <div className="text-xs text-primary mt-1">에너지 회복: +{treatment.energyGain}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedTreatment && (
              <Button
                onClick={applyTreatment}
                className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white font-bold border border-primary"
              >
                치료 적용하기
              </Button>
            )}

            <div className="text-sm text-red-300 mt-4">
              <div className="font-bold mb-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> 부상 중 주의사항:
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>무리한 활동은 회복을 지연시킵니다</li>
                <li>충분한 휴식이 필요합니다</li>
                <li>부상 중 경기 참여는 상태를 악화시킵니다</li>
                <li>심각한 부상은 장기적인 능력치에 영향을 줄 수 있습니다</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <Activity className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-xl font-bold text-green-400 mb-2">정상 컨디션</div>
            <div className="text-sm text-gray-300">
              현재 건강 상태가 양호합니다. 무리한 훈련은 부상 위험을 높입니다.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
