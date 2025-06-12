export interface PlayerStats {
  shooting: number
  passing: number
  dribbling: number
  defending: number
  speed: number
}

export interface PlayerSkills {
  curvingShot?: boolean
  ambidextrous?: boolean
  dribbleLevel: number
  specialMoves: string[]
}

export interface PlayerProfile {
  id: string
  name: string
  position: string
  stats: PlayerStats
  skills: PlayerSkills
}
