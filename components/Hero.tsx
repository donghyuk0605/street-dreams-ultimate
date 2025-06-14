"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1667482654587-e7091bb42e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzQ5ODgyNzc3fDA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        className="relative z-10 space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bebas tracking-wider drop-shadow-2xl">
          STREET DREAMS ULTIMATE
        </h1>
        <p className="text-xl max-w-2xl mx-auto font-montserrat">
          Rule the neon streets and become a legend of urban football.
        </p>
      </motion.div>
    </section>
  )
}
