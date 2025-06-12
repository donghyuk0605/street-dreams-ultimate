"use client"

import { GameHud } from "@/components/ui/game-hud"
import type { GameState } from "@/lib/game/types"

interface Props {
  state: GameState
}

export function GameHUD({ state }: Props) {
  return (
    <GameHud
      level={state.level}
      experience={state.experience}
      maxExperience={state.maxExperience}
      energy={state.energy}
      streetCredits={state.streetCredits}
      reputation={state.reputation}
      health={state.health}
      happiness={state.happiness}
      motivation={state.motivation}
      month={state.month}
      year={state.year}
      currentDay={state.currentDay}
      isMonthRunning={state.isMonthRunning}
      monthProgress={state.monthProgress}
    />
  )
}
