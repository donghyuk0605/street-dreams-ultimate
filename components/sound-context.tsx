"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Howl } from "howler"

type SoundType = {
  bgm: Howl | null
  sfx: Record<string, Howl>
  playBgm: () => void
  stopBgm: () => void
  playSfx: (name: string) => void
  setVolume: (type: "bgm" | "sfx", volume: number) => void
  isMuted: boolean
  toggleMute: () => void
}

const SoundContext = createContext<SoundType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  const [bgm, setBgm] = useState<Howl | null>(null)
  const [sfx, setSfx] = useState<Record<string, Howl>>({})
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    let cancelled = false
    let cleanup = () => {}

    const assetExists = async (url: string) => {
      try {
        const res = await fetch(url, { method: "HEAD" })
        return res.ok
      } catch {
        return false
      }
    }

    const loadSounds = async () => {
      let backgroundMusic: Howl | null = null
      const soundEffects: Record<string, Howl> = {}

      if (await assetExists("/sounds/game-bgm.mp3")) {
        backgroundMusic = new Howl({
          src: ["/sounds/game-bgm.mp3"],
          loop: true,
          volume: 0.5,
          html5: true,
          preload: true,
        })
        if (!cancelled) {
          setBgm(backgroundMusic)
        }
      }

      const effects: Array<[string, string, number]> = [
        ["click", "/sounds/click.mp3", 0.7],
        ["success", "/sounds/success.mp3", 0.7],
        ["levelUp", "/sounds/level-up.mp3", 0.8],
        ["match", "/sounds/match.mp3", 0.7],
        ["notification", "/sounds/notification.mp3", 0.6],
      ]

      for (const [name, path, volume] of effects) {
        if (await assetExists(path)) {
          soundEffects[name] = new Howl({ src: [path], volume })
        }
      }

      if (!cancelled) {
        setSfx(soundEffects)
      }

      cleanup = () => {
        backgroundMusic?.unload()
        Object.values(soundEffects).forEach((sound) => sound.unload())
      }
    }

    loadSounds()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  const playBgm = () => {
    if (bgm && !isMuted && !bgm.playing()) {
      bgm.play()
    }
  }

  const stopBgm = () => {
    if (bgm && bgm.playing()) {
      bgm.pause()
    }
  }

  const playSfx = (name: string) => {
    if (sfx[name] && !isMuted) {
      sfx[name].play()
    }
  }

  const setVolume = (type: "bgm" | "sfx", volume: number) => {
    if (type === "bgm" && bgm) {
      bgm.volume(volume)
    } else if (type === "sfx") {
      Object.values(sfx).forEach((sound) => sound.volume(volume))
    }
  }

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev
      if (newMuted && bgm?.playing()) {
        bgm.pause()
      } else if (!newMuted && bgm && !bgm.playing()) {
        bgm.play()
      }
      return newMuted
    })
  }

  const value = {
    bgm,
    sfx,
    playBgm,
    stopBgm,
    playSfx,
    setVolume,
    isMuted,
    toggleMute,
  }

  if (!isMounted) {
    return <>{children}</>
  }

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export const useSound = () => {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}
