"use client"

import { useEffect } from "react"

export interface Notification {
  id: string
  message: string
  type: "success" | "info" | "warning" | "error" | "achievement"
  icon?: string
  duration?: number
}

interface NotificationSystemProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export function NotificationSystem({ notifications, onRemove }: NotificationSystemProps) {
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1]

      // 자동 제거 타이머 설정
      const timer = setTimeout(() => {
        onRemove(latestNotification.id)
      }, latestNotification.duration || 4000)

      return () => clearTimeout(timer)
    }
  }, [notifications, onRemove])

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "success":
        return "from-green-500 to-emerald-700 border-green-400"
      case "warning":
        return "from-yellow-500 to-amber-700 border-yellow-400"
      case "error":
        return "from-red-500 to-rose-700 border-red-400"
      case "achievement":
        return "from-purple-500 to-fuchsia-700 border-purple-400"
      default:
        return "from-blue-500 to-indigo-700 border-blue-400"
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-xs w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-gradient-to-r ${getNotificationStyle(
            notification.type,
          )} text-white px-4 py-3 rounded-lg shadow-lg border-2 flex items-center gap-3 animate-slide-in-right`}
          onClick={() => onRemove(notification.id)}
        >
          {notification.icon && <span className="text-xl">{notification.icon}</span>}
          <div className="flex-1 font-medium text-sm">{notification.message}</div>
        </div>
      ))}
    </div>
  )
}
