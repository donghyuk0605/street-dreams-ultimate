"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSound } from "@/components/sound-context"

interface MiniGameProps {
  type: "shooting" | "dribbling" | "passing"
  difficulty?: "easy" | "medium" | "hard"
  onComplete: (score: number) => void
  onCancel: () => void
}

export function MiniGame({ type, difficulty = "medium", onComplete, onCancel }: MiniGameProps) {
  const [isActive, setIsActive] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; size: number; hit: boolean }[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const { playSfx } = useSound()

  // 난이도에 따른 설정
  const difficultySettings = {
    easy: { targetCount: 3, targetSpeed: 1, targetSize: 50 },
    medium: { targetCount: 5, targetSpeed: 1.5, targetSize: 40 },
    hard: { targetCount: 7, targetSpeed: 2, targetSize: 30 },
  }

  const settings = difficultySettings[difficulty]

  // 게임 시작
  const startGame = () => {
    setGameStarted(true)
    setIsActive(true)
    setScore(0)
    setTimeLeft(15)
    setTargets([])
    playSfx("match")
  }

  // 게임 종료
  const endGame = () => {
    setIsActive(false)
    cancelAnimationFrame(animationRef.current)
    onComplete(score)
  }

  // 타이머
  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive])

  // 타겟 생성
  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const createTarget = () => {
      if (targets.length < settings.targetCount) {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * (canvas.width - settings.targetSize),
          y: Math.random() * (canvas.height - settings.targetSize),
          size: settings.targetSize,
          hit: false,
        }
        setTargets((prev) => [...prev, newTarget])
      }
    }

    const interval = setInterval(createTarget, 1000)
    return () => clearInterval(interval)
  }, [isActive, targets, settings])

  // 게임 렌더링
  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 배경 그리기
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 타입에 따른 배경 요소
      if (type === "shooting") {
        // 골대 그리기
        ctx.strokeStyle = "white"
        ctx.lineWidth = 3
        ctx.strokeRect(canvas.width / 2 - 60, 10, 120, 80)
      } else if (type === "dribbling") {
        // 콘 그리기
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = "orange"
          ctx.beginPath()
          ctx.moveTo(50 + i * 100, canvas.height - 30)
          ctx.lineTo(70 + i * 100, canvas.height - 30)
          ctx.lineTo(60 + i * 100, canvas.height - 60)
          ctx.closePath()
          ctx.fill()
        }
      } else if (type === "passing") {
        // 패스 라인 그리기
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 2
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.moveTo(0, 50 + i * 100)
          ctx.lineTo(canvas.width, 50 + i * 100)
          ctx.stroke()
        }
      }

      // 타겟 그리기
      targets.forEach((target) => {
        if (target.hit) return

        if (type === "shooting") {
          // 축구공 그리기
          ctx.fillStyle = "white"
          ctx.beginPath()
          ctx.arc(target.x + target.size / 2, target.y + target.size / 2, target.size / 2, 0, Math.PI * 2)
          ctx.fill()

          // 축구공 패턴
          ctx.strokeStyle = "black"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(target.x + target.size / 2, target.y + target.size / 2, target.size / 2, 0, Math.PI * 2)
          ctx.stroke()

          // 패턴 추가
          ctx.beginPath()
          ctx.moveTo(target.x + target.size / 2, target.y)
          ctx.lineTo(target.x + target.size / 2, target.y + target.size)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(target.x, target.y + target.size / 2)
          ctx.lineTo(target.x + target.size, target.y + target.size / 2)
          ctx.stroke()
        } else if (type === "dribbling") {
          // 드리블 타겟 (축구공)
          ctx.fillStyle = "white"
          ctx.beginPath()
          ctx.arc(target.x + target.size / 2, target.y + target.size / 2, target.size / 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = "black"
          ctx.lineWidth = 1
          ctx.stroke()
        } else if (type === "passing") {
          // 패스 타겟 (선수 실루엣)
          ctx.fillStyle = "rgba(0, 100, 255, 0.7)"
          ctx.fillRect(target.x, target.y, target.size, target.size * 1.5)
          ctx.fillStyle = "rgba(0, 100, 255, 0.9)"
          ctx.beginPath()
          ctx.arc(target.x + target.size / 2, target.y - target.size / 4, target.size / 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // 타겟 이동
        if (type === "shooting") {
          target.y -= settings.targetSpeed * 2
          if (target.y + target.size < 0) {
            setTargets((prev) => prev.filter((t) => t.id !== target.id))
          }
        } else if (type === "dribbling") {
          target.x += settings.targetSpeed * (Math.random() > 0.5 ? 1 : -1)
          target.y += settings.targetSpeed * (Math.random() > 0.5 ? 1 : -1)

          // 경계 체크
          if (target.x < 0) target.x = 0
          if (target.x + target.size > canvas.width) target.x = canvas.width - target.size
          if (target.y < 0) target.y = 0
          if (target.y + target.size > canvas.height) target.y = canvas.height - target.size
        } else if (type === "passing") {
          target.x += settings.targetSpeed * 3
          if (target.x > canvas.width) {
            setTargets((prev) => prev.filter((t) => t.id !== target.id))
          }
        }
      })

      // 시간 표시
      ctx.fillStyle = "white"
      ctx.font = "bold 24px Arial"
      ctx.textAlign = "center"
      ctx.fillText(`시간: ${timeLeft}초`, canvas.width / 2, 30)

      // 점수 표시
      ctx.fillText(`점수: ${score}`, canvas.width / 2, 60)

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animationRef.current)
  }, [isActive, targets, score, timeLeft, type, settings])

  // 캔버스 클릭 핸들러
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let hit = false

    setTargets((prev) =>
      prev.map((target) => {
        if (
          !target.hit &&
          x >= target.x &&
          x <= target.x + target.size &&
          y >= target.y &&
          y <= target.y + (type === "passing" ? target.size * 1.5 : target.size)
        ) {
          hit = true
          return { ...target, hit: true }
        }
        return target
      }),
    )

    if (hit) {
      playSfx("success")
      setScore((prev) => prev + 10)
      setTimeout(() => {
        setTargets((prev) => prev.filter((t) => !t.hit))
      }, 100)
    }
  }

  // 캔버스 크기 설정
  useEffect(() => {
    if (!canvasRef.current) return

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-lg border-2 border-blue-500 shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        <div className="p-4 border-b border-blue-500 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white font-orbitron">
            {type === "shooting" ? "슈팅 미니게임" : type === "dribbling" ? "드리블 미니게임" : "패스 미니게임"}
          </h2>
          <div className="flex items-center gap-2">
            <div className="text-sm text-yellow-400 font-bold">난이도: {difficulty}</div>
          </div>
        </div>

        {!gameStarted ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-6">{type === "shooting" ? "🎯" : type === "dribbling" ? "⚡" : "🎪"}</div>
            <h3 className="text-xl font-bold text-white mb-4">
              {type === "shooting"
                ? "골대를 향해 슈팅하세요!"
                : type === "dribbling"
                  ? "공을 빠르게 드리블하세요!"
                  : "정확한 패스를 연결하세요!"}
            </h3>
            <p className="text-gray-300 mb-6">
              {type === "shooting"
                ? "움직이는 공을 클릭하여 골대에 슈팅하세요. 시간 내에 최대한 많은 골을 넣으세요!"
                : type === "dribbling"
                  ? "움직이는 공을 클릭하여 드리블하세요. 콘을 피해 최대한 많은 공을 드리블하세요!"
                  : "이동하는 선수를 클릭하여 패스하세요. 시간 내에 최대한 많은 패스를 성공시키세요!"}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold border-2 border-green-400"
              >
                게임 시작
              </Button>
              <Button onClick={onCancel} variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-800">
                취소
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-[400px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}
