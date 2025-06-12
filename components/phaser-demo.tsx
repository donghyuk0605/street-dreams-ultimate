"use client"

import { useEffect, useRef } from "react"
import Phaser from "phaser"

export default function PhaserDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    const width = 480
    const height = 320

    class DemoScene extends Phaser.Scene {
      player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
      cursors!: Phaser.Types.Input.Keyboard.CursorKeys

      constructor() {
        super("demo")
      }

      create() {
        this.cursors = this.input.keyboard.createCursorKeys()
        const rect = this.add.rectangle(width / 2, height / 2, 40, 40, 0xffd700)
        this.physics.add.existing(rect)
        ;(rect.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true)
        this.player = rect as any
      }

      update() {
        const body = this.player.body as Phaser.Physics.Arcade.Body
        body.setVelocity(0)
        const speed = 200
        if (this.cursors.left?.isDown) {
          body.setVelocityX(-speed)
        } else if (this.cursors.right?.isDown) {
          body.setVelocityX(speed)
        }
        if (this.cursors.up?.isDown) {
          body.setVelocityY(-speed)
        } else if (this.cursors.down?.isDown) {
          body.setVelocityY(speed)
        }
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width,
      height,
      backgroundColor: "#222",
      physics: { default: "arcade", arcade: { debug: false } },
      scene: DemoScene,
      parent: containerRef.current,
    }

    gameRef.current = new Phaser.Game(config)
    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [])

  return <div ref={containerRef} />
}
