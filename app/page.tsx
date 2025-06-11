"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Brain,
  Dumbbell,
  Users,
  BookOpen,
  Home,
  Calendar,
  Star,
  Trophy,
  Play,
  Clock,
  Smile,
  Frown,
  Meh,
  Zap,
  Target,
  School,
  GraduationCap,
  Gamepad2,
  Flame,
  Swords,
  Crown,
  Medal,
  Sparkles,
} from "lucide-react"

// 새로운 컴포넌트들 import
import { SeasonEventSystem } from "@/components/season-event-system"
import { InjurySystem } from "@/components/injury-system"
import { PersonalitySystem } from "@/components/personality-system"
import { RivalSystem } from "@/components/rival-system"
import { GrowthAnalysis } from "@/components/growth-analysis"
import { GameMenu } from "@/components/ui/game-menu"
import { NotificationSystem, type Notification } from "@/components/ui/notification-system"
import { GameHud } from "@/components/ui/game-hud"

// 지역 및 학교 데이터
const REGIONS = {
  seoul: {
    name: "서울",
    streetFields: ["홍대 골목구장", "강남 뒷골목", "명동 공터", "잠실 놀이터"],
    elementary: ["서울중앙초", "한강초", "명동초", "강남초", "홍대초"],
    middle: ["서울중앙중", "한강중", "명문중", "강남중", "홍익중"],
    high: ["서울고", "경기고", "휘문고", "중앙고", "배재고"],
    universities: ["서울대", "연세대", "고려대", "성균관대", "한양대"],
    proTeams: ["FC서울", "서울 유나이티드"],
    youthClubs: ["서울FC 유스", "강남 유나이티드 U-15", "홍대 드림팀"],
  },
  busan: {
    name: "부산",
    streetFields: ["해운대 해변구장", "광안리 골목", "남포동 공터", "동래 놀이터"],
    elementary: ["부산중앙초", "해운대초", "광안초", "남포초", "동래초"],
    middle: ["부산중앙중", "해운대중", "광안중", "남포중", "동래중"],
    high: ["부산고", "동래고", "해운대고", "경남고", "부산외고"],
    universities: ["부산대", "동아대", "부경대", "신라대"],
    proTeams: ["부산 아이파크", "부산 FC"],
    youthClubs: ["부산FC 유스", "해운대 FC", "동래 축구단"],
  },
  incheon: {
    name: "인천",
    streetFields: ["송도 센트럴파크", "부평 골목구장", "계양 공터", "연수 놀이터"],
    elementary: ["인천중앙초", "송도초", "부평초", "계양초", "연수초"],
    middle: ["인천중앙중", "송도중", "부평중", "계양중", "연수중"],
    high: ["인천고", "송도고", "부평고", "인천외고", "연수고"],
    universities: ["인천대", "인하대", "경인교대"],
    proTeams: ["인천 유나이티드"],
    youthClubs: ["인천FC 유스", "송도 드림팀", "부평 FC"],
  },
}

// 게임 상태 인터페이스 (확장됨)
interface GameState {
  // 기본 정보
  childName: string
  age: number
  month: number
  year: number
  region: keyof typeof REGIONS
  level: number
  experience: number
  maxExperience: number

  // 핵심 능력치 (0-100)
  physical: number
  technique: number
  intelligence: number
  social: number
  creativity: number
  discipline: number
  confidence: number
  leadership: number

  // 축구 특화 능력치
  shooting: number
  passing: number
  dribbling: number
  defending: number
  goalkeeping: number
  speed: number
  stamina: number
  mentality: number

  // 상태 관리
  health: number
  stress: number
  happiness: number
  fatigue: number
  motivation: number
  energy: number

  // 관계도
  parentRelation: number
  friendRelation: number
  coachRelation: number
  teammateRelation: number
  teacherRelation: number

  // 경제
  allowance: number
  savings: number

  // 학교 정보
  schoolName: string
  schoolType: "elementary" | "middle" | "high" | "university"
  grade: string
  schoolRank: number
  academicGrade: string
  attendanceRate: number

  // 축구 기록
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

  // 트로피 & 업적
  trophies: TrophyType[]
  achievements: Achievement[]
  records: Record[]

  // 성장 기록
  memories: string[]
  growthHistory: GrowthData[]

  // 스케줄 관리
  weeklyTemplate: { [key: string]: string }
  monthlySchedule: { [key: number]: string }
  currentDay: number
  isMonthRunning: boolean
  monthProgress: number

  // 특별 상태
  isInjured: boolean
  injuryType?: "minor" | "moderate" | "severe"
  injuryName?: string
  injuryDays: number
  totalInjuryDays: number
  specialEvents: string[]
  upcomingMatches: Match[]

  // 진로 관련
  careerPath: "street" | "academic" | "youth" | "pro" | "undecided"
  graduationYear: number
  finalEnding?: EndingType

  // 새로운 시스템들
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

// 새로운 인터페이스들
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

interface Rival {
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

// 기존 인터페이스들...
interface ScoutOffer {
  id: string
  teamName: string
  level: "street" | "youth" | "semi-pro" | "pro"
  requirements: string
  benefits: string
  deadline: string
}

interface EndingType {
  id: string
  title: string
  description: string
  type: "university" | "pro" | "semi-pro" | "street-legend" | "other"
  achievement: string
  finalStats: { [key: string]: number }
}

interface TrophyType {
  id: string
  name: string
  description: string
  icon: string
  rarity: "bronze" | "silver" | "gold" | "platinum" | "legendary"
  dateEarned: string
  category: "academic" | "soccer" | "social" | "special" | "street"
}

interface Achievement {
  id: string
  name: string
  description: string
  progress: number
  maxProgress: number
  reward?: string
  icon: string
}

interface Record {
  id: string
  type: "goal" | "assist" | "match" | "academic" | "special" | "street"
  description: string
  date: string
  value: number
}

interface Match {
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

interface Activity {
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

// 주간 템플릿
const WEEKLY_TEMPLATES = {
  street_warrior: {
    name: "골목축구 전사",
    description: "골목에서 실력을 키우는 진짜 축구",
    schedule: {
      monday: "attend_school",
      tuesday: "street_soccer",
      wednesday: "attend_school",
      thursday: "street_training",
      friday: "attend_school",
      saturday: "street_tournament",
      sunday: "rest",
    },
  },
  academy_star: {
    name: "아카데미 엘리트",
    description: "체계적인 훈련으로 프로를 꿈꾸다",
    schedule: {
      monday: "attend_school",
      tuesday: "youth_training",
      wednesday: "attend_school",
      thursday: "team_practice",
      friday: "attend_school",
      saturday: "academy_match",
      sunday: "tactical_study",
    },
  },
  balanced_life: {
    name: "균형잡힌 생활",
    description: "공부와 축구를 균형있게",
    schedule: {
      monday: "attend_school",
      tuesday: "basic_training",
      wednesday: "attend_school",
      thursday: "homework",
      friday: "attend_school",
      saturday: "team_practice",
      sunday: "family_time",
    },
  },
  study_first: {
    name: "학업 우선",
    description: "미래를 위한 탄탄한 기초",
    schedule: {
      monday: "attend_school",
      tuesday: "homework",
      wednesday: "attend_school",
      thursday: "study_group",
      friday: "attend_school",
      saturday: "reading",
      sunday: "family_time",
    },
  },
}

export default function StreetDreamsSoccer() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // 게임 상태 (확장됨)
  const [gameState, setGameState] = useState<GameState>({
    childName: "태기",
    age: 8,
    month: 3,
    year: 1,
    region: "seoul",
    level: 1,
    experience: 0,
    maxExperience: 100,

    physical: 30,
    technique: 20,
    intelligence: 40,
    social: 35,
    creativity: 25,
    discipline: 30,
    confidence: 40,
    leadership: 15,

    shooting: 15,
    passing: 20,
    dribbling: 25,
    defending: 10,
    goalkeeping: 5,
    speed: 30,
    stamina: 25,
    mentality: 20,

    health: 80,
    stress: 10,
    happiness: 70,
    fatigue: 20,
    motivation: 60,
    energy: 100,

    parentRelation: 80,
    friendRelation: 50,
    coachRelation: 60,
    teammateRelation: 45,
    teacherRelation: 70,

    allowance: 50000,
    savings: 0,

    schoolName: "서울중앙초",
    schoolType: "elementary",
    grade: "2학년",
    schoolRank: 15,
    academicGrade: "B+",
    attendanceRate: 95,

    currentTeam: "홍대 골목구장",
    position: "자유포지션",
    reputation: 10,
    matchesPlayed: 0,
    goals: 0,
    assists: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    scoutingOffers: [],
    streetCredits: 50,

    trophies: [
      {
        id: "first_ball",
        name: "첫 축구공",
        description: "인생 첫 축구공을 받았다",
        icon: "⚽",
        rarity: "bronze",
        dateEarned: "1년 3월",
        category: "special",
      },
    ],
    achievements: [
      {
        id: "street_king",
        name: "골목의 왕",
        description: "골목축구에서 10승 달성",
        progress: 0,
        maxProgress: 10,
        reward: "골목 명성 +50",
        icon: "👑",
      },
      {
        id: "first_goal",
        name: "첫 골의 기쁨",
        description: "생애 첫 골을 넣어보세요",
        progress: 0,
        maxProgress: 1,
        reward: "자신감 +10",
        icon: "⚽",
      },
    ],
    records: [],

    memories: ["첫 축구공을 받은 날", "홍대 골목구장에서의 첫 경기"],
    growthHistory: [
      {
        month: "1년 1월",
        physical: 25,
        technique: 15,
        intelligence: 35,
        social: 30,
        shooting: 10,
        passing: 15,
        dribbling: 20,
        defending: 8,
        speed: 25,
      },
      {
        month: "1년 2월",
        physical: 28,
        technique: 18,
        intelligence: 38,
        social: 33,
        shooting: 13,
        passing: 18,
        dribbling: 23,
        defending: 9,
        speed: 28,
      },
      {
        month: "1년 3월",
        physical: 30,
        technique: 20,
        intelligence: 40,
        social: 35,
        shooting: 15,
        passing: 20,
        dribbling: 25,
        defending: 10,
        speed: 30,
      },
    ],

    weeklyTemplate: WEEKLY_TEMPLATES.street_warrior.schedule,
    monthlySchedule: {},
    currentDay: 1,
    isMonthRunning: false,
    monthProgress: 0,

    isInjured: false,
    injuryType: undefined,
    injuryName: undefined,
    injuryDays: 0,
    totalInjuryDays: 0,
    specialEvents: [],
    upcomingMatches: [
      {
        id: "street_match1",
        opponent: "강남 뒷골목 팀",
        date: "이번 달 25일",
        type: "street",
        importance: "medium",
        venue: "홍대 골목구장",
      },
    ],

    careerPath: "undecided",
    graduationYear: 0,

    // 새로운 시스템들
    currentSeason: "spring",
    personalityTraits: {
      competitiveness: 60,
      teamwork: 45,
      creativity: 70,
      discipline: 40,
      confidence: 55,
      calmness: 35,
    },
    rivals: [
      {
        id: "rival1",
        name: "김민수",
        team: "강남 FC",
        position: "공격수",
        level: 2,
        stats: {
          shooting: 18,
          passing: 15,
          dribbling: 22,
          defending: 8,
          speed: 28,
        },
        relationship: "neutral",
        matchHistory: {
          wins: 0,
          losses: 1,
          draws: 0,
          lastMatch: {
            result: "loss",
            score: "1-2",
            date: "지난 달",
          },
        },
      },
      {
        id: "rival2",
        name: "박서준",
        team: "홍대 드림팀",
        position: "미드필더",
        level: 1,
        stats: {
          shooting: 12,
          passing: 25,
          dribbling: 18,
          defending: 15,
          speed: 20,
        },
        relationship: "friendly",
        matchHistory: {
          wins: 1,
          losses: 0,
          draws: 1,
        },
      },
    ],
  })

  const [activeTab, setActiveTab] = useState("dashboard")
  const [monthlyResult, setMonthlyResult] = useState<any>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [currentActivity, setCurrentActivity] = useState<string | null>(null)
  const [dayEvents, setDayEvents] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("street_warrior")

  // 활동 목록 (기존과 동일)
  const activities: Activity[] = [
    // 골목축구 관련
    {
      id: "street_soccer",
      name: "골목축구",
      description: "동네 골목에서 친구들과 축구하기",
      category: "street",
      effects: { dribbling: 3, creativity: 2, streetCredits: 5, happiness: 5, energy: -20 },
      energyCost: 20,
      icon: <Gamepad2 className="w-4 h-4" />,
      mood: "happy",
      parentApproval: 6,
      color: "bg-orange-100 border-orange-400",
      rarity: "common",
    },
    {
      id: "street_training",
      name: "골목 개인훈련",
      description: "혼자서 벽에 공 차기, 리프팅 연습",
      category: "street",
      effects: { technique: 2, shooting: 2, passing: 1, discipline: 1, energy: -15 },
      energyCost: 15,
      icon: <Target className="w-4 h-4" />,
      mood: "neutral",
      parentApproval: 7,
      color: "bg-green-100 border-green-400",
      rarity: "common",
    },
    {
      id: "street_tournament",
      name: "골목 토너먼트",
      description: "동네 최강팀을 가리는 토너먼트",
      category: "street",
      effects: {
        technique: 4,
        mentality: 3,
        confidence: 3,
        streetCredits: 10,
        reputation: 2,
        energy: -30,
      },
      energyCost: 30,
      icon: <Crown className="w-4 h-4" />,
      mood: "happy",
      parentApproval: 5,
      color: "bg-yellow-100 border-yellow-400",
      rarity: "rare",
    },

    // 정식 축구 훈련
    {
      id: "youth_training",
      name: "유스팀 훈련",
      description: "체계적인 유스팀 훈련 프로그램",
      category: "soccer",
      effects: {
        technique: 3,
        physical: 2,
        discipline: 2,
        teamwork: 2,
        coachRelation: 3,
        energy: -25,
      },
      energyCost: 25,
      cost: 10000,
      icon: <Dumbbell className="w-4 h-4" />,
      mood: "neutral",
      parentApproval: 9,
      color: "bg-blue-100 border-blue-400",
      rarity: "rare",
    },
    {
      id: "academy_match",
      name: "아카데미 경기",
      description: "정식 유스 아카데미 경기 참가",
      category: "soccer",
      effects: {
        technique: 2,
        mentality: 4,
        confidence: 3,
        reputation: 5,
        experience: 20,
        energy: -35,
      },
      energyCost: 35,
      cost: 15000,
      icon: <Trophy className="w-4 h-4" />,
      mood: "happy",
      parentApproval: 10,
      color: "bg-purple-100 border-purple-400",
      rarity: "epic",
    },
    {
      id: "tactical_study",
      name: "전술 공부",
      description: "축구 전술과 이론 학습",
      category: "soccer",
      effects: { intelligence: 3, creativity: 2, mentality: 2, energy: -10 },
      energyCost: 10,
      icon: <Brain className="w-4 h-4" />,
      mood: "neutral",
      parentApproval: 8,
      color: "bg-indigo-100 border-indigo-400",
      rarity: "common",
    },

    // 학교 관련
    {
      id: "attend_school",
      name: "학교 수업",
      description: "정규 학교 수업 참여",
      category: "school",
      effects: { intelligence: 2, discipline: 1, teacherRelation: 2, attendanceRate: 1, energy: -15 },
      energyCost: 15,
      icon: <School className="w-4 h-4" />,
      mood: "neutral",
      parentApproval: 10,
      color: "bg-blue-100 border-blue-300",
      schoolActivity: true,
      rarity: "common",
    },
    {
      id: "homework",
      name: "숙제하기",
      description: "학교 숙제 완료",
      category: "study",
      effects: { intelligence: 3, discipline: 2, stress: 5, parentRelation: 3, energy: -10 },
      energyCost: 10,
      icon: <BookOpen className="w-4 h-4" />,
      mood: "neutral",
      parentApproval: 10,
      color: "bg-purple-100 border-purple-300",
      rarity: "common",
    },
    {
      id: "study_group",
      name: "스터디 그룹",
      description: "친구들과 함께 공부",
      category: "study",
      effects: { intelligence: 2, social: 2, friendRelation: 3, energy: -15 },
      energyCost: 15,
      icon: <Users className="w-4 h-4" />,
      mood: "happy",
      parentApproval: 8,
      color: "bg-indigo-100 border-indigo-300",
      rarity: "common",
    },

    // 사회 활동
    {
      id: "play_friends",
      name: "친구들과 놀기",
      description: "친구들과 즐거운 시간",
      category: "social",
      effects: { social: 2, happiness: 5, friendRelation: 3, stress: -5, energy: -10 },
      energyCost: 10,
      icon: <Users className="w-4 h-4" />,
      mood: "happy",
      parentApproval: 5,
      color: "bg-pink-100 border-pink-300",
      rarity: "common",
    },
    {
      id: "family_time",
      name: "가족 시간",
      description: "온 가족이 함께하는 시간",
      category: "social",
      effects: { happiness: 3, parentRelation: 4, stress: -8, energy: -5 },
      energyCost: 5,
      icon: <Home className="w-4 h-4" />,
      mood: "happy",
      parentApproval: 10,
      color: "bg-yellow-100 border-yellow-300",
      rarity: "common",
    },
    {
      id: "rest",
      name: "휴식",
      description: "충분한 휴식으로 컨디션 회복",
      category: "rest",
      effects: { fatigue: -15, stress: -10, health: 3, energy: 30 },
      energyCost: -30,
      icon: <Home className="w-4 h-4" />,
      mood: "happy",
      parentApproval: 3,
      color: "bg-gray-100 border-gray-300",
      rarity: "common",
    },

    // 특별 활동
    {
      id: "pro_scout_meeting",
      name: "프로팀 스카우트 미팅",
      description: "프로팀 스카우터와의 특별 만남",
      category: "special",
      effects: {
        confidence: 5,
        mentality: 3,
        reputation: 10,
        experience: 50,
        energy: -20,
      },
      energyCost: 20,
      requirements: { reputation: 70, technique: 60 },
      icon: <Star className="w-4 h-4" />,
      mood: "happy",
      parentApproval: 10,
      color: "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400",
      rarity: "legendary",
    },
  ]

  // 알림 추가
  const addNotification = useCallback(
    (message: string, type: "success" | "info" | "warning" | "error" | "achievement" = "info", icon?: string) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message,
        type,
        icon,
        duration: type === "achievement" ? 6000 : 4000,
      }
      setNotifications((prev) => [...prev, newNotification])
    },
    [],
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const handleSave = useCallback(() => {
    try {
      localStorage.setItem("streetDreamsGameState", JSON.stringify(gameState))
      addNotification("게임이 저장되었습니다!", "success", "💾")
    } catch (error) {
      addNotification("저장에 실패했습니다.", "error", "❌")
    }
  }, [gameState, addNotification])

  const handleLoad = useCallback(() => {
    try {
      const savedState = localStorage.getItem("streetDreamsGameState")
      if (savedState) {
        setGameState(JSON.parse(savedState))
        addNotification("게임을 불러왔습니다!", "success", "📁")
      } else {
        addNotification("저장된 게임이 없습니다.", "warning", "⚠️")
      }
    } catch (error) {
      addNotification("불러오기에 실패했습니다.", "error", "❌")
    }
  }, [addNotification])

  const handleReset = useCallback(() => {
    if (confirm("정말로 게임을 초기화하시겠습니까?")) {
      window.location.reload()
    }
  }, [])

  const handleExit = useCallback(() => {
    if (confirm("게임을 종료하시겠습니까?")) {
      window.close()
    }
  }, [])

  // 경험치 및 레벨업 처리
  const gainExperience = useCallback(
    (amount: number) => {
      setGameState((prev) => {
        const newExp = prev.experience + amount
        const newLevel = Math.floor(newExp / prev.maxExperience) + prev.level
        const remainingExp = newExp % prev.maxExperience

        if (newLevel > prev.level) {
          addNotification(`🎉 레벨업! Lv.${newLevel}`, "achievement", "⭐")
          return {
            ...prev,
            level: newLevel,
            experience: remainingExp,
            maxExperience: prev.maxExperience + 20,
          }
        }

        return {
          ...prev,
          experience: newExp,
        }
      })
    },
    [addNotification],
  )

  // 계절 이벤트 핸들러
  const handleSeasonEvent = useCallback(
    (eventId: string, effects: Record<string, number>) => {
      setGameState((prev) => {
        const newState = { ...prev }

        Object.entries(effects).forEach(([key, value]) => {
          if (key === "experience") {
            gainExperience(value)
          } else if (key in newState) {
            ;(newState as any)[key] = Math.min(100, Math.max(0, (newState as any)[key] + value))
          }
        })

        return newState
      })

      addNotification(`🎉 계절 이벤트 완료!`)
    },
    [gainExperience, addNotification],
  )

  // 부상 치료 핸들러
  const handleTreatment = useCallback(
    (treatmentType: string) => {
      setGameState((prev) => {
        const newState = { ...prev }

        switch (treatmentType) {
          case "rest":
            newState.injuryDays = Math.max(0, newState.injuryDays - 1)
            newState.energy = Math.min(100, newState.energy + 20)
            break
          case "medicine":
            newState.injuryDays = Math.max(0, newState.injuryDays - 2)
            newState.allowance -= 10000
            newState.energy = Math.min(100, newState.energy + 10)
            break
          case "physical_therapy":
            newState.injuryDays = Math.max(0, newState.injuryDays - 3)
            newState.allowance -= 30000
            newState.energy = Math.min(100, newState.energy + 15)
            break
          case "sports_medicine":
            newState.injuryDays = Math.max(0, newState.injuryDays - 5)
            newState.allowance -= 100000
            newState.energy = Math.min(100, newState.energy + 25)
            break
        }

        if (newState.injuryDays <= 0) {
          newState.isInjured = false
          newState.injuryType = undefined
          newState.injuryName = undefined
          addNotification("🎉 부상이 완전히 회복되었습니다!")
        }

        return newState
      })
    },
    [addNotification],
  )

  // 라이벌 도전 핸들러
  const handleChallengeRival = useCallback(
    (rivalId: string) => {
      const rival = gameState.rivals.find((r) => r.id === rivalId)
      if (!rival) return

      // 간단한 경기 시뮬레이션
      const playerTotal = gameState.shooting + gameState.passing + gameState.dribbling + gameState.speed
      const rivalTotal = rival.stats.shooting + rival.stats.passing + rival.stats.dribbling + rival.stats.speed

      const randomFactor = Math.random() * 20 - 10 // -10 ~ +10 랜덤 요소
      const result = playerTotal + randomFactor > rivalTotal

      setGameState((prev) => {
        const newState = { ...prev }
        const updatedRivals = [...newState.rivals]
        const rivalIndex = updatedRivals.findIndex((r) => r.id === rivalId)

        if (rivalIndex !== -1) {
          if (result) {
            updatedRivals[rivalIndex].matchHistory.wins += 1
            newState.confidence = Math.min(100, newState.confidence + 5)
            newState.reputation = Math.min(100, newState.reputation + 3)
            newState.streetCredits += 10
            addNotification(`🏆 ${rival.name}을(를) 이겼습니다!`)
          } else {
            updatedRivals[rivalIndex].matchHistory.losses += 1
            newState.confidence = Math.max(0, newState.confidence - 3)
            addNotification(`😔 ${rival.name}에게 졌습니다...`)
          }

          updatedRivals[rivalIndex].matchHistory.lastMatch = {
            result: result ? "win" : "loss",
            score: result ? "2-1" : "1-2",
            date: "방금 전",
          }
        }

        newState.rivals = updatedRivals
        newState.energy = Math.max(0, newState.energy - 30)

        return newState
      })
    },
    [gameState.rivals, gameState.shooting, gameState.passing, gameState.dribbling, gameState.speed, addNotification],
  )

  // 주간 템플릿 적용
  const applyWeeklyTemplate = useCallback(
    (templateKey: string) => {
      const template = WEEKLY_TEMPLATES[templateKey as keyof typeof WEEKLY_TEMPLATES]
      if (!template) return

      const newSchedule: { [key: number]: string } = {}
      const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

      for (let day = 1; day <= 30; day++) {
        const dayOfWeek = daysOfWeek[day % 7]
        newSchedule[day] = template.schedule[dayOfWeek] || "rest"
      }

      setGameState((prev) => ({
        ...prev,
        monthlySchedule: newSchedule,
        weeklyTemplate: template.schedule,
      }))

      addNotification(`⚡ ${template.name} 스타일 적용!`)
    },
    [addNotification],
  )

  // 스케줄 설정
  const setSchedule = useCallback(
    (day: number, activityId: string) => {
      setGameState((prev) => ({
        ...prev,
        monthlySchedule: {
          ...prev.monthlySchedule,
          [day]: activityId,
        },
      }))
      setSelectedDay(null)
      const activity = activities.find((a) => a.id === activityId)
      addNotification(`📅 ${day}일: ${activity?.name || "휴식"} 계획!`)
    },
    [addNotification],
  )

  // 월간 실행
  const runMonth = useCallback(() => {
    if (gameState.isMonthRunning) return

    setGameState((prev) => ({ ...prev, isMonthRunning: true, currentDay: 1, monthProgress: 0 }))
    setMonthlyResult(null)
    setDayEvents([])

    const interval = setInterval(() => {
      setGameState((prevState) => {
        const newState = { ...prevState }
        const currentDay = newState.currentDay
        const activityId = newState.monthlySchedule[currentDay] || "rest"
        const activity = activities.find((a) => a.id === activityId)

        if (activity) {
          setCurrentActivity(activity.name)

          // 에너지 체크
          if (activity.energyCost && newState.energy < activity.energyCost) {
            const restActivity = activities.find((a) => a.id === "rest")
            if (restActivity) {
              Object.entries(restActivity.effects).forEach(([key, value]) => {
                if (key in newState) {
                  ;(newState as any)[key] = Math.min(100, Math.max(0, (newState as any)[key] + value))
                }
              })
            }
            setDayEvents((prev) => [...prev, `${currentDay}일: 에너지 부족으로 휴식`])
          } else {
            // 활동 효과 적용
            Object.entries(activity.effects).forEach(([key, value]) => {
              if (key === "experience") {
                gainExperience(value)
              } else if (key.includes("Relation")) {
                ;(newState as any)[key] = Math.min(100, Math.max(0, (newState as any)[key] + value))
              } else if (key in newState) {
                ;(newState as any)[key] = Math.min(100, Math.max(0, (newState as any)[key] + value))
              }
            })

            if (activity.cost) {
              newState.allowance -= activity.cost
            }
            if (activity.energyCost) {
              newState.energy = Math.max(0, newState.energy - activity.energyCost)
            }

            // 부상 위험 체크
            if (activity.energyCost && activity.energyCost > 25 && Math.random() < 0.05) {
              newState.isInjured = true
              newState.injuryType = "minor"
              newState.injuryName = "근육 피로"
              newState.injuryDays = 3
              newState.totalInjuryDays = 3
              setDayEvents((prev) => [...prev, `${currentDay}일: 경미한 부상 발생`])
            }

            if (activity.rarity === "legendary" || Math.random() < 0.1) {
              const events = [
                "🌟 완벽한 플레이를 선보였다!",
                "⚡ 새로운 기술을 깨달았다!",
                "🔥 오늘은 컨디션이 최고였다!",
                "💫 팀원들이 감탄했다!",
                "🎯 정확한 슈팅이 골대를 흔들었다!",
              ]
              const randomEvent = events[Math.floor(Math.random() * events.length)]
              setDayEvents((prev) => [...prev, `${currentDay}일: ${randomEvent}`])
            }
          }
        }

        newState.currentDay += 1
        newState.monthProgress = (currentDay / 30) * 100

        // 월 완료
        if (currentDay >= 30) {
          newState.isMonthRunning = false
          newState.month += 1
          newState.allowance += 20000
          newState.energy = 100

          // 성장 기록 추가
          const newGrowthData = {
            month: `${newState.year}년 ${newState.month}월`,
            physical: newState.physical,
            technique: newState.technique,
            intelligence: newState.intelligence,
            social: newState.social,
            shooting: newState.shooting,
            passing: newState.passing,
            dribbling: newState.dribbling,
            defending: newState.defending,
            speed: newState.speed,
          }
          newState.growthHistory = [...newState.growthHistory, newGrowthData]

          // 계절 변경
          if (newState.month > 12) {
            newState.month = 1
            newState.year += 1
            newState.age += 1
            addNotification(`🎂 ${newState.childName}이가 ${newState.age}살이 되었습니다!`)
          }

          // 계절 업데이트
          if (newState.month >= 3 && newState.month <= 5) newState.currentSeason = "spring"
          else if (newState.month >= 6 && newState.month <= 8) newState.currentSeason = "summer"
          else if (newState.month >= 9 && newState.month <= 11) newState.currentSeason = "fall"
          else newState.currentSeason = "winter"

          const region = REGIONS[newState.region]
          const streetFields = region.streetFields
          const opponents = ["동네 형들", "라이벌 팀", "신참 도전자들", "베테랑 팀"]

          newState.upcomingMatches = [
            {
              id: `street_match_${Date.now()}`,
              opponent: opponents[Math.floor(Math.random() * opponents.length)],
              date: "다음 달 15일",
              type: "street",
              importance: "medium",
              venue: streetFields[Math.floor(Math.random() * streetFields.length)],
            },
          ]

          const result = {
            statChanges: {
              technique: Math.floor(Math.random() * 8) + 2,
              physical: Math.floor(Math.random() * 6) + 2,
              streetCredits: Math.floor(Math.random() * 20) + 5,
            },
            events: dayEvents,
            achievements: [],
            totalCost: 0,
            parentComment: "이번 달도 열심히 했구나! 💪",
            coachComment: "실력이 늘고 있어! 계속 해보자! ⚽",
            streetComment: "골목에서 소문이 자자하다! 🔥",
            levelInfo: `레벨 ${newState.level} (경험치: ${newState.experience}/${newState.maxExperience})`,
            regionInfo: `${REGIONS[newState.region].name} 지역`,
          }

          setMonthlyResult(result)
          setCurrentActivity(null)
          clearInterval(interval)
        }

        return newState
      })
    }, 150)

    return () => clearInterval(interval)
  }, [gameState.isMonthRunning, gameState.monthlySchedule, dayEvents, gainExperience, addNotification])

  // 월간 결과 확인 완료
  const completeMonth = useCallback(() => {
    setMonthlyResult(null)
    setDayEvents([])
    addNotification("🚀 새로운 달이 시작되었습니다!")
  }, [addNotification])

  // 감정 상태 아이콘
  const getMoodIcon = () => {
    if (gameState.happiness >= 70) return <Smile className="w-6 h-6 text-green-500" />
    if (gameState.happiness >= 40) return <Meh className="w-6 h-6 text-yellow-500" />
    return <Frown className="w-6 h-6 text-red-500" />
  }

  // 에너지 색상
  const getEnergyColor = () => {
    if (gameState.energy >= 70) return "text-green-500"
    if (gameState.energy >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  // 레어도 색상
  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case "legendary":
        return "from-purple-400 to-pink-400"
      case "epic":
        return "from-purple-300 to-blue-300"
      case "rare":
        return "from-blue-300 to-green-300"
      default:
        return "from-gray-200 to-gray-300"
    }
  }

  // 캐릭터 아바타 (게임 스타일)
  const GameCharacterSVG = () => {
    const isHappy = gameState.happiness >= 70
    const isTired = gameState.energy <= 30
    const isStreetLegend = gameState.streetCredits >= 200

    return (
      <div className="relative">
        <svg viewBox="0 0 120 120" className="w-32 h-32">
          {gameState.level >= 5 && (
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke={isStreetLegend ? "#fbbf24" : "#3b82f6"}
              strokeWidth="2"
              className="animate-pulse"
            />
          )}

          <circle cx="60" cy="50" r="30" fill={isTired ? "#f59e0b" : "#fbbf24"} />
          <path d="M30 45 Q60 20 90 45 Q85 30 60 25 Q35 30 30 45" fill="#92400e" />
          <circle cx="50" cy="47" r={isTired ? "2" : "3"} fill="#000" />
          <circle cx="70" cy="47" r={isTired ? "2" : "3"} fill="#000" />

          {isHappy ? (
            <path d="M50 58 Q60 65 70 58" stroke="#000" strokeWidth="2" fill="none" />
          ) : isTired ? (
            <path d="M53 60 Q60 57 67 60" stroke="#000" strokeWidth="2" fill="none" />
          ) : (
            <line x1="53" y1="60" x2="67" y2="60" stroke="#000" strokeWidth="2" />
          )}

          <rect x="45" y="75" width="30" height="35" fill="#1e40af" rx="5" />
          <text x="60" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            {gameState.level}
          </text>

          <rect x="35" y="80" width="10" height="25" fill={isTired ? "#f59e0b" : "#fbbf24"} rx="5" />
          <rect x="75" y="80" width="10" height="25" fill={isTired ? "#f59e0b" : "#fbbf24"} rx="5" />
          <rect x="48" y="108" width="8" height="15" fill={isTired ? "#f59e0b" : "#fbbf24"} rx="4" />
          <rect x="64" y="108" width="8" height="15" fill={isTired ? "#f59e0b" : "#fbbf24"} rx="4" />
          <ellipse cx="52" cy="125" rx="6" ry="3" fill="#000" />
          <ellipse cx="68" cy="125" rx="6" ry="3" fill="#000" />

          {currentActivity && (
            <>
              <circle cx="40" cy="40" r="3" fill="#fbbf24" className="animate-ping" />
              <circle
                cx="80"
                cy="40"
                r="3"
                fill="#fbbf24"
                className="animate-ping"
                style={{ animationDelay: "0.5s" }}
              />
              <circle cx="60" cy="30" r="2" fill="#fbbf24" className="animate-bounce" />
            </>
          )}

          {isStreetLegend && (
            <path
              d="M45 25 L50 15 L55 20 L60 10 L65 20 L70 15 L75 25 Z"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="1"
            />
          )}
        </svg>

        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          {gameState.level}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-x-hidden">
      <GameHud
        level={gameState.level}
        experience={gameState.experience}
        maxExperience={gameState.maxExperience}
        energy={gameState.energy}
        streetCredits={gameState.streetCredits}
        reputation={gameState.reputation}
        health={gameState.health}
        happiness={gameState.happiness}
        motivation={gameState.motivation}
        month={gameState.month}
        year={gameState.year}
        currentDay={gameState.currentDay}
        isMonthRunning={gameState.isMonthRunning}
        monthProgress={gameState.monthProgress}
      />

      <GameMenu onSave={handleSave} onLoad={handleLoad} onReset={handleReset} onExit={handleExit} />

      <NotificationSystem notifications={notifications} onRemove={removeNotification} />

      <div className="max-w-7xl mx-auto relative z-10 pt-20">
        {/* 월간 결과 모달 */}
        {monthlyResult && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <Card className="max-w-4xl w-full bg-gradient-to-br from-purple-900 to-blue-900 text-white max-h-[80vh] overflow-y-auto border-2 border-yellow-400">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-t-lg">
                <CardTitle className="text-3xl text-center font-bold">🎉 MONTHLY REPORT 🎉</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="text-center p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg border-2 border-purple-400">
                  <div className="text-xl font-bold text-yellow-300 mb-2">⭐ LEVEL STATUS</div>
                  <div className="text-white text-lg">{monthlyResult.levelInfo}</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg border-2 border-orange-400">
                  <div className="text-xl font-bold text-yellow-300 mb-2">🔥 STREET REPUTATION</div>
                  <div className="text-white text-lg">{monthlyResult.streetComment}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg border-2 border-pink-400">
                    <div className="text-lg font-bold text-yellow-300 mb-2">👨‍👩‍👧‍👦 PARENTS</div>
                    <div className="text-white">"{monthlyResult.parentComment}"</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg border-2 border-blue-400">
                    <div className="text-lg font-bold text-yellow-300 mb-2">⚽ COACH</div>
                    <div className="text-white">"{monthlyResult.coachComment}"</div>
                  </div>
                </div>

                {dayEvents.length > 0 && (
                  <div>
                    <h3 className="font-bold text-yellow-300 mb-3 text-xl">🎮 MONTHLY HIGHLIGHTS</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {dayEvents.map((event, index) => (
                        <div
                          key={index}
                          className="p-3 bg-black/30 rounded border border-yellow-400 text-sm backdrop-blur-sm"
                        >
                          {event}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={completeMonth}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black text-xl py-4 font-bold border-2 border-yellow-400"
                >
                  CONTINUE JOURNEY ➡️
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 메인 대시보드 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* 캐릭터 카드 */}
          <Card className="bg-gradient-to-br from-blue-900 to-purple-900 text-white border-2 border-yellow-400">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-3">
                <GameCharacterSVG />
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{gameState.childName}</div>
                  <div className="text-sm text-blue-300">{gameState.currentTeam}</div>
                  <div className="text-xs text-purple-300">{gameState.position}</div>
                  {currentActivity && (
                    <div className="text-xs text-green-400 animate-pulse mt-2">🎮 {currentActivity}</div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    EXP:
                  </span>
                  <span className="font-bold text-yellow-400">
                    {gameState.experience}/{gameState.maxExperience}
                  </span>
                </div>
                <Progress value={(gameState.experience / gameState.maxExperience) * 100} className="h-3 bg-gray-700" />
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-orange-400" />
                    골목 명성:
                  </span>
                  <span className="font-bold text-orange-400">{gameState.streetCredits}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 능력치 레이더 */}
          <Card className="bg-gradient-to-br from-green-900 to-blue-900 text-white border-2 border-green-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="w-5 h-5 mr-2 text-red-400" />
                SOCCER SKILLS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "슈팅", value: gameState.shooting, icon: "🎯", color: "text-red-400" },
                { name: "패스", value: gameState.passing, icon: "🎪", color: "text-blue-400" },
                { name: "드리블", value: gameState.dribbling, icon: "⚡", color: "text-yellow-400" },
                { name: "스피드", value: gameState.speed, icon: "💨", color: "text-green-400" },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-2">
                      <span>{skill.icon}</span>
                      {skill.name}:
                    </span>
                    <span className={`font-bold ${skill.color}`}>{skill.value}/100</span>
                  </div>
                  <Progress value={skill.value} className="h-2 bg-gray-700" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 상태 정보 */}
          <Card className="bg-gradient-to-br from-purple-900 to-pink-900 text-white border-2 border-purple-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-400" />
                STATUS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "에너지", value: gameState.energy, icon: "⚡", color: getEnergyColor() },
                { name: "행복", value: gameState.happiness, icon: "😊", color: "text-yellow-400" },
                { name: "건강", value: gameState.health, icon: "❤️", color: "text-red-400" },
                { name: "동기", value: gameState.motivation, icon: "🔥", color: "text-orange-400" },
              ].map((stat) => (
                <div key={stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-2">
                      <span>{stat.icon}</span>
                      {stat.name}:
                    </span>
                    <span className={`font-bold ${stat.color}`}>{stat.value}/100</span>
                  </div>
                  <Progress value={stat.value} className="h-2 bg-gray-700" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 진행 상황 */}
          <Card className="bg-gradient-to-br from-orange-900 to-red-900 text-white border-2 border-orange-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-400" />
                PROGRESS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>이번 달:</span>
                    <span className="font-bold">{Math.round(gameState.monthProgress)}%</span>
                  </div>
                  <Progress value={gameState.monthProgress} className="h-3 bg-gray-700" />
                </div>

                {gameState.isMonthRunning ? (
                  <div className="text-center">
                    <div className="text-sm text-orange-300 mb-2">🎮 Day {gameState.currentDay}</div>
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span className="text-sm text-gray-300">게임 진행 중...</span>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={runMonth}
                    disabled={Object.keys(gameState.monthlySchedule).length === 0}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold border-2 border-green-400"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    START MONTH!
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 게임 탭 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-black/30 backdrop-blur-sm border-2 border-yellow-400">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Gamepad2 className="w-4 h-4 mr-2" />
              대시보드
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Calendar className="w-4 h-4 mr-2" />
              스케줄
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Dumbbell className="w-4 h-4 mr-2" />
              스킬
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Trophy className="w-4 h-4 mr-2" />
              경기
            </TabsTrigger>
            <TabsTrigger value="career" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <GraduationCap className="w-4 h-4 mr-2" />
              진로
            </TabsTrigger>
            <TabsTrigger
              value="collection"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              <Medal className="w-4 h-4 mr-2" />
              컬렉션
            </TabsTrigger>
            <TabsTrigger value="systems" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Brain className="w-4 h-4 mr-2" />
              시스템
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Star className="w-4 h-4 mr-2" />
              분석
            </TabsTrigger>
          </TabsList>

          {/* 대시보드 탭 */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 골목축구 현황 */}
              <Card className="bg-gradient-to-br from-orange-900 to-red-900 text-white border-2 border-orange-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                    골목축구 전설
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-yellow-400">{gameState.streetCredits}</div>
                    <div className="text-sm text-orange-300">골목 명성</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>현재 구장:</span>
                        <span className="text-yellow-400">{gameState.currentTeam}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>지역:</span>
                        <span className="text-blue-400">{REGIONS[gameState.region].name}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 다가오는 경기 */}
              <Card className="bg-gradient-to-br from-blue-900 to-purple-900 text-white border-2 border-blue-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Swords className="w-5 h-5 mr-2 text-red-400" />
                    다음 대결
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {gameState.upcomingMatches.length > 0 ? (
                    <div className="space-y-3">
                      {gameState.upcomingMatches.map((match) => (
                        <div key={match.id} className="p-3 bg-black/30 rounded-lg border border-blue-400">
                          <div className="font-bold text-yellow-400">vs {match.opponent}</div>
                          <div className="text-sm text-blue-300">{match.venue}</div>
                          <div className="text-xs text-gray-400">{match.date}</div>
                          <div className="text-xs text-orange-400">
                            {match.type === "street" ? "🔥 골목축구" : "⚽ 정식경기"}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-4">예정된 경기가 없습니다</div>
                  )}
                </CardContent>
              </Card>

              {/* 업적 진행도 */}
              <Card className="bg-gradient-to-br from-purple-900 to-pink-900 text-white border-2 border-purple-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Medal className="w-5 h-5 mr-2 text-yellow-400" />
                    업적 진행
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gameState.achievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{achievement.icon}</span>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-yellow-400">{achievement.name}</div>
                            <div className="text-xs text-gray-400">{achievement.description}</div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>진행도:</span>
                          <span className="text-yellow-400">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className="h-2 bg-gray-700"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 스케줄 탭 */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 플레이스타일 선택 */}
              <Card className="bg-gradient-to-br from-blue-900 to-purple-900 text-white border-2 border-blue-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gamepad2 className="w-5 h-5 mr-2 text-blue-400" />
                    플레이스타일
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(WEEKLY_TEMPLATES).map(([key, template]) => (
                    <div
                      key={key}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:scale-105 border-2 ${
                        selectedTemplate === key
                          ? "bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-400"
                          : "bg-black/30 border-gray-600"
                      }`}
                      onClick={() => setSelectedTemplate(key)}
                    >
                      <div className="font-bold text-yellow-400">{template.name}</div>
                      <div className="text-xs text-gray-300 mt-1">{template.description}</div>
                    </div>
                  ))}
                  <Button
                    onClick={() => applyWeeklyTemplate(selectedTemplate)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold border-2 border-green-400"
                  >
                    스타일 적용
                  </Button>
                </CardContent>
              </Card>

              {/* 활동 목록 */}
              <Card className="bg-gradient-to-br from-green-900 to-blue-900 text-white border-2 border-green-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-400" />
                    활동 목록
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className={`p-3 rounded-lg border-2 ${activity.color} cursor-pointer hover:scale-105 transition-all`}
                      onClick={() => selectedDay && setSchedule(selectedDay, activity.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {activity.icon}
                        <div className="font-bold text-gray-800">{activity.name}</div>
                        {activity.rarity && (
                          <Badge className={`bg-gradient-to-r ${getRarityColor(activity.rarity)} text-black text-xs`}>
                            {activity.rarity}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{activity.description}</div>
                      <div className="flex justify-between text-xs text-gray-700">
                        <span>에너지: {activity.energyCost || 0}</span>
                        <span>부모 만족도: {activity.parentApproval}/10</span>
                      </div>
                      {activity.cost && (
                        <div className="text-xs text-red-600 mt-1">비용: {activity.cost.toLocaleString()}원</div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 30일 달력 */}
              <Card className="bg-gradient-to-br from-purple-900 to-pink-900 text-white border-2 border-purple-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                    {gameState.year}년 {gameState.month}월 스케줄
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                      <div key={day} className="text-center text-xs font-bold p-1 text-purple-300">
                        {day}
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
                        <div
                          key={day}
                          className={`aspect-square p-1 text-xs rounded cursor-pointer transition-all hover:scale-110 border-2 ${
                            isSelected
                              ? "bg-yellow-500 text-black border-yellow-300"
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
                            <div className="text-xs truncate" title={activity.name}>
                              {activity.name.slice(0, 4)}
                            </div>
                          )}
                        </div>
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
            </div>
          </TabsContent>

          {/* 시스템 탭 */}
          <TabsContent value="systems" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 계절 이벤트 시스템 */}
              <SeasonEventSystem
                currentSeason={gameState.currentSeason}
                currentMonth={gameState.month}
                onEventSelect={handleSeasonEvent}
              />

              {/* 부상 시스템 */}
              <InjurySystem
                isInjured={gameState.isInjured}
                injuryType={gameState.injuryType}
                injuryName={gameState.injuryName}
                recoveryDays={gameState.injuryDays}
                totalRecoveryDays={gameState.totalInjuryDays}
                onTreatment={handleTreatment}
              />

              {/* 성격 시스템 */}
              <PersonalitySystem traits={gameState.personalityTraits} />

              {/* 라이벌 시스템 */}
              <RivalSystem
                playerStats={{
                  shooting: gameState.shooting,
                  passing: gameState.passing,
                  dribbling: gameState.dribbling,
                  defending: gameState.defending,
                  speed: gameState.speed,
                }}
                rivals={gameState.rivals}
                onChallengeRival={handleChallengeRival}
              />
            </div>
          </TabsContent>

          {/* 성장 분석 탭 */}
          <TabsContent value="analysis" className="space-y-6">
            <GrowthAnalysis
              growthData={gameState.growthHistory}
              playerAge={gameState.age}
              playerLevel={gameState.level}
              playerPosition={gameState.position}
              comparisonData={[
                {
                  name: "평균 또래",
                  position: "전체",
                  age: gameState.age,
                  level: Math.max(1, gameState.level - 1),
                  stats: {
                    physical: Math.max(0, gameState.physical - 10),
                    technique: Math.max(0, gameState.technique - 5),
                    intelligence: Math.max(0, gameState.intelligence - 8),
                    social: Math.max(0, gameState.social - 5),
                    shooting: Math.max(0, gameState.shooting - 8),
                    passing: Math.max(0, gameState.passing - 5),
                    dribbling: Math.max(0, gameState.dribbling - 7),
                    defending: Math.max(0, gameState.defending - 3),
                    speed: Math.max(0, gameState.speed - 6),
                  },
                },
              ]}
            />
          </TabsContent>

          {/* 기타 탭들은 간단한 플레이스홀더로 */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-gradient-to-br from-red-900 to-orange-900 text-white border-2 border-red-400">
              <CardHeader>
                <CardTitle>스킬 개발</CardTitle>
              </CardHeader>
              <CardContent>
                <p>스킬 시스템이 곧 추가됩니다!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <Card className="bg-gradient-to-br from-green-900 to-blue-900 text-white border-2 border-green-400">
              <CardHeader>
                <CardTitle>경기 시스템</CardTitle>
              </CardHeader>
              <CardContent>
                <p>경기 시스템이 곧 추가됩니다!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900 to-pink-900 text-white border-2 border-purple-400">
              <CardHeader>
                <CardTitle>진로 시스템</CardTitle>
              </CardHeader>
              <CardContent>
                <p>진로 시스템이 곧 추가됩니다!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collection" className="space-y-6">
            <Card className="bg-gradient-to-br from-yellow-900 to-orange-900 text-white border-2 border-yellow-400">
              <CardHeader>
                <CardTitle>컬렉션</CardTitle>
              </CardHeader>
              <CardContent>
                <p>컬렉션 시스템이 곧 추가됩니다!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
