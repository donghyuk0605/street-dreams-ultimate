"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import type { CareerCollectionItem } from "@/lib/game/types"

interface CareerCollectionProps {
  items: CareerCollectionItem[]
}

export function CareerCollection({ items }: CareerCollectionProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-2 border-purple-400">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" /> 진로 컬렉션
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {items.map((item) => (
              <li key={item.id} className={item.obtained ? "text-yellow-300" : "text-gray-400"}>
                {item.name} - {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-300">아직 획득한 진로 컬렉션이 없습니다.</div>
        )}
      </CardContent>
    </Card>
  )
}
