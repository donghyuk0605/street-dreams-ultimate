"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Settings, Save, Volume2, VolumeX, Moon, Sun, Home, RefreshCw, X, Info } from "lucide-react"

interface GameMenuProps {
  onSave?: () => void
  onLoad?: () => void
  onReset?: () => void
  onExit?: () => void
}

export function GameMenu({ onSave, onLoad, onReset, onExit }: GameMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"settings" | "help" | "about">("settings")
  const [isMuted, setIsMuted] = useState(false)
  const { theme = "dark", setTheme } = useTheme()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!isOpen) {
    return (
      <button
        aria-label="메뉴 열기"
        title="메뉴 열기"
        onClick={toggleMenu}
        className="fixed top-20 right-4 z-50 bg-primary p-3 rounded-full shadow-lg border-2 border-primary hover:scale-110 transition-transform"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg border-2 border-primary shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-primary">
          <h2 className="text-2xl font-bold text-white">게임 메뉴</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="메뉴 닫기"
            className="rounded-full hover:bg-primary/50"
          >
            <X className="w-5 h-5 text-gray-300" />
          </Button>
        </div>

        <div className="flex border-b border-primary">
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "settings" ? "bg-primary text-white" : "text-gray-300 hover:bg-primary/30"
            }`}
          >
            설정
          </button>
          <button
            onClick={() => setActiveTab("help")}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "help" ? "bg-primary text-white" : "text-gray-300 hover:bg-primary/30"
            }`}
          >
            도움말
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "about" ? "bg-primary text-white" : "text-gray-300 hover:bg-primary/30"
            }`}
          >
            정보
          </button>
        </div>

        <div className="p-6">
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium flex items-center gap-2">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    소리
                  </label>
                  <button
                    onClick={toggleMute}
                    className={`w-12 h-6 rounded-full ${
                      isMuted ? "bg-gray-600" : "bg-primary"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        isMuted ? "translate-x-0.5" : "translate-x-6"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium flex items-center gap-2">
                    {theme === "dark" ? (
                      <Moon className="w-5 h-5" />
                    ) : (
                      <Sun className="w-5 h-5" />
                    )}
                    {theme === "dark" ? "다크 모드" : "라이트 모드"}
                  </label>
                  <button
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full ${
                      theme === "dark" ? "bg-primary" : "bg-gray-600"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        theme === "dark" ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <Button
                  variant="outline"
                  className="bg-primary/50 border-primary text-white hover:bg-primary"
                  onClick={onSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  저장하기
                </Button>
                <Button
                  variant="outline"
                  className="bg-primary/50 border-primary text-white hover:bg-primary"
                  onClick={onLoad}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  불러오기
                </Button>
                <Button
                  variant="outline"
                  className="bg-destructive/50 border-destructive text-white hover:bg-destructive"
                  onClick={onReset}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  초기화
                </Button>
                <Button
                  variant="outline"
                  className="bg-primary/50 border-primary text-white hover:bg-primary"
                  onClick={onExit}
                >
                  <Home className="w-4 h-4 mr-2" />
                  나가기
                </Button>
              </div>
            </div>
          )}

          {activeTab === "help" && (
            <div className="space-y-4">
              <div className="bg-primary/30 p-4 rounded-lg border border-primary">
                <h3 className="text-lg font-bold text-blue-300 mb-2">게임 방법</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>
                      <strong>스케줄 탭</strong>에서 월간 일정을 계획하세요.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>
                      <strong>START MONTH</strong> 버튼으로 계획한 일정을 실행하세요.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>
                      <strong>시스템 탭</strong>에서 계절 이벤트와 라이벌 도전에 참여하세요.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>
                      <strong>진로 탭</strong>에서 원하는 미래를 위한 조건을 확인하세요.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/30 p-4 rounded-lg border border-primary">
                <h3 className="text-lg font-bold text-purple-300 mb-2">팁</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>에너지를 관리하며 활동을 계획하세요.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>부상을 당하면 즉시 치료하는 것이 좋습니다.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>라이벌과의 경쟁은 빠른 성장에 도움이 됩니다.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>계절 이벤트는 특별한 보상을 제공합니다.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">STREET DREAMS</h3>
                <p className="text-blue-300 mt-1">European Journey</p>
                <p className="text-gray-400 text-sm mt-2">버전 1.0.0</p>
              </div>

              <div className="bg-black/30 p-4 rounded-lg border border-primary mt-4">
                <p className="text-sm text-gray-300 text-center">
                  축구 꿈나무의 성장 스토리를 그리는 RPG 게임
                  <br />
                  골목축구부터 프로 무대까지, 당신의 선택이 미래를 결정합니다.
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="link" className="text-primary hover:text-primary/80">
                  <Info className="w-4 h-4 mr-2" />
                  크레딧 보기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
