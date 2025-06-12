import type React from "react"
import { Smile, Meh, Frown } from "lucide-react"

export const REGIONS = {
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

export const WEEKLY_TEMPLATES = {
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

export function getMoodIcon(happiness: number): React.ReactNode {
  if (happiness >= 70) return <Smile className="w-6 h-6 text-green-500" />
  if (happiness >= 40) return <Meh className="w-6 h-6 text-yellow-500" />
  return <Frown className="w-6 h-6 text-red-500" />
}

export function getEnergyColor(energy: number): string {
  if (energy >= 70) return "text-green-500"
  if (energy >= 40) return "text-yellow-500"
  return "text-red-500"
}

export function getRarityColor(rarity?: string): string {
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
