"use client"

import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const [player, setPlayer] = useState({ name: "", position: "", age: "" })
  const [event, setEvent] = useState({ title: "", description: "" })
  const [image, setImage] = useState({ url: "", description: "" })

  const addPlayer = async () => {
    if (!player.name) return
    await addDoc(collection(db, "players"), {
      name: player.name,
      position: player.position,
      age: Number(player.age),
    })
    setPlayer({ name: "", position: "", age: "" })
  }

  const addEvent = async () => {
    if (!event.title) return
    await addDoc(collection(db, "events"), {
      title: event.title,
      description: event.description,
    })
    setEvent({ title: "", description: "" })
  }

  const addImage = async () => {
    if (!image.url) return
    await addDoc(collection(db, "images"), {
      url: image.url,
      description: image.description,
    })
    setImage({ url: "", description: "" })
  }

  return (
    <div className="space-y-8 p-4">
      <Card className="bg-black/70 border-4 border-yellow-500">
        <CardHeader>
          <CardTitle>선수 등록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={player.name}
            onChange={(e) => setPlayer({ ...player, name: e.target.value })}
            placeholder="이름"
          />
          <Input
            value={player.position}
            onChange={(e) => setPlayer({ ...player, position: e.target.value })}
            placeholder="포지션"
          />
          <Input
            type="number"
            value={player.age}
            onChange={(e) => setPlayer({ ...player, age: e.target.value })}
            placeholder="나이"
          />
          <Button onClick={addPlayer}>등록</Button>
        </CardContent>
      </Card>

      <Card className="bg-black/70 border-4 border-yellow-500">
        <CardHeader>
          <CardTitle>이벤트 등록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            placeholder="제목"
          />
          <Input
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
            placeholder="설명"
          />
          <Button onClick={addEvent}>등록</Button>
        </CardContent>
      </Card>

      <Card className="bg-black/70 border-4 border-yellow-500">
        <CardHeader>
          <CardTitle>이미지 등록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={image.url}
            onChange={(e) => setImage({ ...image, url: e.target.value })}
            placeholder="이미지 URL"
          />
          <Input
            value={image.description}
            onChange={(e) => setImage({ ...image, description: e.target.value })}
            placeholder="설명"
          />
          <Button onClick={addImage}>등록</Button>
        </CardContent>
      </Card>
    </div>
  )
}
