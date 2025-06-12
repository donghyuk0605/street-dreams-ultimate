"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { GameState, Activity } from "@/lib/game/types"

interface ScheduleProps {
  gameState: GameState
  activities: Activity[]
  selectedDay: number | null
  setSelectedDay: (day: number | null) => void
  setSchedule: (day: number, activityId: string) => void
}

export function Schedule({
  gameState,
  activities,
  selectedDay,
  setSelectedDay,
  setSchedule,
}: ScheduleProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-2 border-purple-400">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-400" />
          {gameState.year}년 {gameState.month}월 스케줄
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d} className="text-center text-xs font-bold p-1 text-purple-300">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const activity = activities.find((a) => a.id === gameState.monthlySchedule[day])
            const isSelected = selectedDay === day
            const isCompleted = gameState.isMonthRunning && day < gameState.currentDay
            const isCurrent = gameState.isMonthRunning && day === gameState.currentDay

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square p-1 text-xs rounded cursor-pointer border-2 ${
                  isSelected
                    ? "bg-yellow-500 text-black border-yellow-300 ring-2 ring-yellow-400"
                    : isCurrent
                      ? "bg-green-500 text-white border-green-300 animate-pulse"
                      : isCompleted
                        ? "bg-gray-600 text-gray-300 border-gray-500"
                        : activity
                          ? "bg-blue-600 text-white border-blue-400"
                          : "bg-black/30 text-gray-400 border-gray-600"
                }`}
                onClick={() => !gameState.isMonthRunning && setSelectedDay(day)}
              >
                <div className="font-bold">{day}</div>
                {activity && (
                  <div className="text-xs truncate" title={activity.name} onClick={() => setSchedule(day, activity.id)}>
                    {activity.name.slice(0, 4)}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
        {selectedDay && (
          <div className="mt-4 p-3 bg-black/30 rounded border border-purple-400">
            <div className="text-sm font-bold text-purple-300 mb-2">{selectedDay}일 선택됨</div>
            <div className="text-xs text-gray-300">활동을 선택하여 스케줄을 설정하세요</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
