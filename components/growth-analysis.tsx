"use client"

import { Progress } from "@/components/ui/progress"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { BarChartIcon as ChartIcon, TrendingUp, Star, Award } from "lucide-react"

interface GrowthData {
  month: string
  physical: number
  technique: number
  intelligence: number
  social: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  speed: number
}

interface GrowthAnalysisProps {
  growthData: GrowthData[]
  playerAge: number
  playerLevel: number
  playerPosition: string
  comparisonData?: {
    name: string
    position: string
    age: number
    level: number
    stats: {
      physical: number
      technique: number
      intelligence: number
      social: number
      shooting: number
      passing: number
      dribbling: number
      defending: number
      speed: number
    }
  }[]
}

export function GrowthAnalysis({
  growthData,
  playerAge,
  playerLevel,
  playerPosition,
  comparisonData = [],
}: GrowthAnalysisProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [selectedStat, setSelectedStat] = useState("technique")

  // 통계 옵션
  const statOptions = [
    { id: "physical", name: "체력", color: "#ef4444" },
    { id: "technique", name: "기술", color: "#3b82f6" },
    { id: "intelligence", name: "지능", color: "#8b5cf6" },
    { id: "social", name: "사회성", color: "#10b981" },
    { id: "shooting", name: "슈팅", color: "#f97316" },
    { id: "passing", name: "패스", color: "#06b6d4" },
    { id: "dribbling", name: "드리블", color: "#eab308" },
    { id: "defending", name: "수비", color: "#64748b" },
    { id: "speed", name: "스피드", color: "#ec4899" },
  ]

  // 선택된 통계의 색상 가져오기
  const getStatColor = (statId: string) => {
    return statOptions.find((stat) => stat.id === statId)?.color || "#3b82f6"
  }

  // 성장 예측 데이터 생성
  const generatePredictionData = () => {
    if (growthData.length < 2) return []

    const lastTwoMonths = growthData.slice(-2)
    const growthRate: Record<string, number> = {}

    // 각 능력치의 성장률 계산
    Object.keys(lastTwoMonths[1]).forEach((key) => {
      if (key !== "month" && typeof lastTwoMonths[1][key] === "number" && typeof lastTwoMonths[0][key] === "number") {
        growthRate[key] = (lastTwoMonths[1][key] as number) - (lastTwoMonths[0][key] as number)
      }
    })

    // 향후 6개월 예측 데이터 생성
    const lastMonth = lastTwoMonths[1]
    const predictions = []

    for (let i = 1; i <= 6; i++) {
      const prediction: Record<string, any> = { month: `예측 ${i}개월` }

      Object.keys(growthRate).forEach((key) => {
        prediction[key] = Math.min(100, Math.max(0, (lastMonth[key] as number) + growthRate[key] * i))
      })

      predictions.push(prediction)
    }

    return predictions
  }

  const predictionData = generatePredictionData()

  // 비교 데이터 포맷팅
  const formattedComparisonData = comparisonData.map((player) => ({
    name: player.name,
    position: player.position,
    age: player.age,
    level: player.level,
    ...player.stats,
  }))

  // 최근 성장 계산
  const calculateRecentGrowth = () => {
    if (growthData.length < 2) return { stat: "데이터 부족", growth: 0 }

    const lastTwoMonths = growthData.slice(-2)
    let maxGrowth = 0
    let maxGrowthStat = ""

    Object.keys(lastTwoMonths[1]).forEach((key) => {
      if (key !== "month" && typeof lastTwoMonths[1][key] === "number" && typeof lastTwoMonths[0][key] === "number") {
        const growth = (lastTwoMonths[1][key] as number) - (lastTwoMonths[0][key] as number)
        if (growth > maxGrowth) {
          maxGrowth = growth
          maxGrowthStat = key
        }
      }
    })

    return {
      stat: statOptions.find((stat) => stat.id === maxGrowthStat)?.name || maxGrowthStat,
      growth: maxGrowth,
    }
  }

  const recentGrowth = calculateRecentGrowth()

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-purple-900 text-white border-2 border-blue-400">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChartIcon className="w-5 h-5 text-blue-400" />
            <span>성장 분석</span>
          </div>
          <Badge className="bg-blue-500">
            Lv.{playerLevel} • {playerAge}세
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/30">
            <TabsTrigger value="general" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              성장 추이
            </TabsTrigger>
            <TabsTrigger value="prediction" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              성장 예측
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Award className="w-4 h-4 mr-2" />
              또래 비교
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {statOptions.map((stat) => (
                <Badge
                  key={stat.id}
                  variant="outline"
                  className={`cursor-pointer ${selectedStat === stat.id ? "bg-blue-500 text-white" : "bg-black/30"}`}
                  onClick={() => setSelectedStat(stat.id)}
                  style={{ borderColor: stat.color }}
                >
                  {stat.name}
                </Badge>
              ))}
            </div>

            <div className="h-64 w-full bg-black/30 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedStat}
                    stroke={getStatColor(selectedStat)}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-black/30 rounded-lg border border-blue-400">
                <div className="text-sm text-blue-300 mb-1">최근 가장 큰 성장</div>
                <div className="text-xl font-bold">{recentGrowth.stat}</div>
                <div className="text-sm text-green-400">+{recentGrowth.growth} 포인트</div>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border border-purple-400">
                <div className="text-sm text-purple-300 mb-1">현재 최고 능력치</div>
                <div className="text-xl font-bold">
                  {statOptions.find(
                    (stat) =>
                      stat.id ===
                      Object.entries(growthData[growthData.length - 1])
                        .filter(([key]) => key !== "month")
                        .sort(([, a], [, b]) => (b as number) - (a as number))[0][0],
                  )?.name || "데이터 없음"}
                </div>
                <div className="text-sm text-yellow-400">포지션 적합도: 높음</div>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border border-green-400">
                <div className="text-sm text-green-300 mb-1">성장 속도</div>
                <div className="text-xl font-bold">
                  {recentGrowth.growth > 5
                    ? "매우 빠름"
                    : recentGrowth.growth > 3
                      ? "빠름"
                      : recentGrowth.growth > 1
                        ? "보통"
                        : "느림"}
                </div>
                <div className="text-sm text-blue-400">또래 평균 대비 +15%</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prediction" className="space-y-4 mt-4">
            <div className="text-sm text-blue-300 mb-4">
              현재 성장 추세를 바탕으로 향후 6개월간의 능력치 변화를 예측합니다.
            </div>

            <div className="h-64 w-full bg-black/30 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...growthData.slice(-3), ...predictionData]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedStat}
                    stroke={getStatColor(selectedStat)}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  {/* 예측 구간 표시 */}
                  <Line
                    type="monotone"
                    dataKey={selectedStat}
                    data={predictionData}
                    stroke={getStatColor(selectedStat)}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 bg-black/30 rounded-lg border border-purple-400">
              <div className="text-lg font-bold text-purple-300 mb-2">AI 성장 예측</div>
              <div className="text-sm text-gray-300">
                {playerPosition === "자유포지션" ? (
                  <span>
                    현재 성장 추세를 분석한 결과, <span className="text-yellow-400">드리블</span>과
                    <span className="text-yellow-400"> 스피드</span> 능력이 두드러지게 발전하고 있습니다. 윙어나 공격형
                    미드필더 포지션이 적합할 것으로 예측됩니다.
                  </span>
                ) : (
                  <span>
                    현재 {playerPosition} 포지션에서 계속 성장한다면, 6개월 후{" "}
                    <span className="text-green-400">Lv.{playerLevel + 2}</span> 수준에 도달할 것으로 예상됩니다.
                  </span>
                )}
              </div>
              <div className="mt-3 text-sm">
                <span className="font-bold text-blue-300">추천 훈련:</span>{" "}
                {selectedStat === "shooting"
                  ? "슈팅 정확도, 마무리"
                  : selectedStat === "passing"
                    ? "패스 정확도, 비전 훈련"
                    : selectedStat === "dribbling"
                      ? "볼 컨트롤, 1대1 상황"
                      : selectedStat === "defending"
                        ? "태클, 위치선정"
                        : selectedStat === "speed"
                          ? "스프린트, 민첩성"
                          : "기본기 훈련"}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4 mt-4">
            <div className="text-sm text-blue-300 mb-4">같은 나이대의 다른 선수들과 능력치를 비교해보세요.</div>

            <div className="h-64 w-full bg-black/30 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" type="category" allowDuplicatedCategory={false} stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  {statOptions.map((stat) => (
                    <Line
                      key={stat.id}
                      type="monotone"
                      dataKey={stat.id}
                      data={[
                        {
                          name: "나",
                          [stat.id]:
                            growthData.length > 0 ? growthData[growthData.length - 1][stat.id as keyof GrowthData] : 0,
                        },
                        ...formattedComparisonData,
                      ]}
                      stroke={stat.color}
                      strokeWidth={selectedStat === stat.id ? 3 : 1}
                      dot={{ r: selectedStat === stat.id ? 5 : 3 }}
                      activeDot={{ r: selectedStat === stat.id ? 7 : 5 }}
                      hide={selectedStat !== stat.id}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/30 rounded-lg border border-blue-400">
                <div className="text-lg font-bold text-blue-300 mb-2">또래 비교 분석</div>
                <div className="text-sm text-gray-300">
                  {selectedStat === "technique" ? (
                    <span>
                      기술 능력이 또래 평균보다 <span className="text-green-400">15% 높습니다</span>.
                    </span>
                  ) : selectedStat === "physical" ? (
                    <span>
                      체력이 또래 평균과 <span className="text-yellow-400">비슷한 수준입니다</span>.
                    </span>
                  ) : selectedStat === "shooting" ? (
                    <span>
                      슈팅 능력이 또래 평균보다 <span className="text-green-400">20% 높습니다</span>.
                    </span>
                  ) : selectedStat === "passing" ? (
                    <span>
                      패스 능력이 또래 평균보다 <span className="text-green-400">10% 높습니다</span>.
                    </span>
                  ) : selectedStat === "dribbling" ? (
                    <span>
                      드리블 능력이 또래 평균보다 <span className="text-green-400">25% 높습니다</span>.
                    </span>
                  ) : (
                    <span>선택한 능력치가 또래 평균과 비교됩니다.</span>
                  )}
                </div>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border border-purple-400">
                <div className="text-lg font-bold text-purple-300 mb-2">포지션별 적합도</div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>공격수:</span>
                      <span className="text-yellow-400">
                        {Math.round(
                          ((growthData.length > 0
                            ? (growthData[growthData.length - 1].shooting as number) * 0.4 +
                              (growthData[growthData.length - 1].dribbling as number) * 0.3 +
                              (growthData[growthData.length - 1].speed as number) * 0.3
                            : 0) /
                            3) *
                            100,
                        ) / 100}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        growthData.length > 0
                          ? (growthData[growthData.length - 1].shooting as number) * 0.4 +
                            (growthData[growthData.length - 1].dribbling as number) * 0.3 +
                            (growthData[growthData.length - 1].speed as number) * 0.3
                          : 0
                      }
                      className="h-2 bg-gray-700"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>미드필더:</span>
                      <span className="text-green-400">
                        {Math.round(
                          ((growthData.length > 0
                            ? (growthData[growthData.length - 1].passing as number) * 0.4 +
                              (growthData[growthData.length - 1].technique as number) * 0.3 +
                              (growthData[growthData.length - 1].intelligence as number) * 0.3
                            : 0) /
                            3) *
                            100,
                        ) / 100}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        growthData.length > 0
                          ? (growthData[growthData.length - 1].passing as number) * 0.4 +
                            (growthData[growthData.length - 1].technique as number) * 0.3 +
                            (growthData[growthData.length - 1].intelligence as number) * 0.3
                          : 0
                      }
                      className="h-2 bg-gray-700"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>수비수:</span>
                      <span className="text-blue-400">
                        {Math.round(
                          ((growthData.length > 0
                            ? (growthData[growthData.length - 1].defending as number) * 0.5 +
                              (growthData[growthData.length - 1].physical as number) * 0.3 +
                              (growthData[growthData.length - 1].intelligence as number) * 0.2
                            : 0) /
                            3) *
                            100,
                        ) / 100}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        growthData.length > 0
                          ? (growthData[growthData.length - 1].defending as number) * 0.5 +
                            (growthData[growthData.length - 1].physical as number) * 0.3 +
                            (growthData[growthData.length - 1].intelligence as number) * 0.2
                          : 0
                      }
                      className="h-2 bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
