import type React from "react"

export interface GrowthData {
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

export interface Rival {
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
}

export interface ScoutOffer {
  id: string
  teamName: string
  level: "street" | "youth" | "semi-pro" | "pro"
  requirements: string
  benefits: string
  deadline: string
}

export interface EndingType {
  id: string
  title: string
  description: string
  type: "university" | "pro" | "semi-pro" | "street-legend" | "other"
  achievement: string
  finalStats: { [key: string]: number }
}

export interface TrophyType {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: "bronze" | "silver" | "gold" | "platinum" | "legendary"
  dateEarned: string
  category: "academic" | "soccer" | "social" | "special" | "street"
}

export interface Achievement {
  id: string
  name: string
  description: string
  progress: number
  maxProgress: number
  reward?: string
  icon: React.ReactNode
}

export interface Record {
  id: string
  type: "goal" | "assist" | "match" | "academic" | "special" | "street"
  description: string
  date: string
  value: number
}

export interface CareerCollectionItem {
  id: string
  name: string
  description: string
  obtained: boolean
}

export interface Match {
  id: string
  opponent: string
  date: string
  type: "league" | "cup" | "friendly" | "tournament" | "street"
  importance: "low" | "medium" | "high" | "legendary"
  venue: string
  result?: "win" | "loss" | "draw"
  score?: string
  playerPerformance?: {
    goals: number
    assists: number
    rating: number
  }
}

export interface Activity {
  id: string
  name: string
  description: string
  category: "soccer" | "study" | "social" | "rest" | "special" | "school" | "street"
  effects: { [key: string]: number }
  requirements?: { [key: string]: number }
  cost?: number
  energyCost?: number
  icon: React.ReactNode
  mood: "happy" | "neutral" | "tired"
  parentApproval: number
  color: string
  schoolActivity?: boolean
  rarity?: "common" | "rare" | "epic" | "legendary"
}

export interface GameState {
  childName: string
  age: number
  month: number
  year: number
  region: string
  level: number
  experience: number
  skillPoints: number
  maxExperience: number

  physical: number
  technique: number
  intelligence: number
  social: number
  creativity: number
  discipline: number
  confidence: number
  leadership: number

  shooting: number
  passing: number
  dribbling: number
  defending: number
  goalkeeping: number
  speed: number
  stamina: number
  mentality: number

  health: number
  stress: number
  happiness: number
  fatigue: number
  motivation: number
  energy: number

  parentRelation: number
  friendRelation: number
  coachRelation: number
  teammateRelation: number
  teacherRelation: number

  allowance: number
  savings: number

  schoolName: string
  schoolType: "elementary" | "middle" | "high" | "university"
  grade: string
  schoolRank: number
  academicGrade: string
  attendanceRate: number

  currentTeam: string
  position: string
  reputation: number
  matchesPlayed: number
  goals: number
  assists: number
  wins: number
  losses: number
  draws: number
  scoutingOffers: ScoutOffer[]
  streetCredits: number

  trophies: TrophyType[]
  achievements: Achievement[]
  records: Record[]
  careerCollection: CareerCollectionItem[]

  memories: string[]
  growthHistory: GrowthData[]

  weeklyTemplate: { [key: string]: string }
  monthlySchedule: { [key: number]: string }
  currentDay: number
  isMonthRunning: boolean
  monthProgress: number

  isInjured: boolean
  injuryType?: "minor" | "moderate" | "severe"
  injuryName?: string
  injuryDays: number
  totalInjuryDays: number
  specialEvents: string[]
  upcomingMatches: Match[]

  careerPath: "street" | "academic" | "youth" | "pro" | "undecided"
  graduationYear: number
  finalEnding?: EndingType

  currentSeason: "spring" | "summer" | "fall" | "winter"
  personalityTraits: {
    competitiveness: number
    teamwork: number
    creativity: number
    discipline: number
    confidence: number
    calmness: number
  }
  rivals: Rival[]
}

