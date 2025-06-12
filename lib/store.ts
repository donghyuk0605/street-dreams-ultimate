import type React from "react"
import { create } from "zustand"
import type { Notification } from "@/components/ui/notification-system"

interface GameUIStore {
  notifications: Notification[]
  activeTab: string
  monthlyResult: any
  selectedDay: number | null
  currentActivity: string | null
  dayEvents: React.ReactNode[]
  selectedTemplate: string
  scoreboardResult: {
    opponent: string
    score: string
    result: 'win' | 'loss' | 'draw'
    homeLogo?: string
    opponentLogo?: string
  } | null
  addNotification: (n: Notification) => void
  removeNotification: (id: string) => void
  setActiveTab: (tab: string) => void
  setMonthlyResult: (result: any) => void
  setSelectedDay: (day: number | null) => void
  setCurrentActivity: (activity: string | null) => void
  setDayEvents: (
    events:
      | React.ReactNode[]
      | ((prev: React.ReactNode[]) => React.ReactNode[]),
  ) => void
  setSelectedTemplate: (template: string) => void
  setScoreboardResult: (
    result: {
      opponent: string
      score: string
      result: 'win' | 'loss' | 'draw'
      homeLogo?: string
      opponentLogo?: string
    } | null,
  ) => void
}

export const useGameUIStore = create<GameUIStore>((set) => ({
  notifications: [],
  activeTab: "dashboard",
  monthlyResult: null,
  selectedDay: null,
  currentActivity: null,
  dayEvents: [],
  selectedTemplate: "street_warrior",
  scoreboardResult: null,
  addNotification: (n) => set((s) => ({ notifications: [...s.notifications, n] })),
  removeNotification: (id) =>
    set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setMonthlyResult: (result) => set({ monthlyResult: result }),
  setSelectedDay: (day) => set({ selectedDay: day }),
  setCurrentActivity: (activity) => set({ currentActivity: activity }),
  setDayEvents: (events) =>
    set((s) => ({
      dayEvents:
        typeof events === "function" ? events(s.dayEvents) : events,
    })),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  setScoreboardResult: (result) => set({ scoreboardResult: result }),
}))
