"use client"

import { ImageWithSkeleton as Image } from "@/components/ui/image-with-skeleton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import logoSrc from "@/public/placeholder-logo.png"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black text-white">
      <Image
        src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=60"
        alt="login background"
        fill
        className="object-cover opacity-40"
      />
      <Card className="relative z-10 w-full max-w-sm border-4 border-yellow-500 glass-dark shadow-3d card-hover animate-slide-in-up">
        <CardHeader className="flex flex-col items-center gap-2">
          <Image src={logoSrc} alt="Street Dreams" width={80} height={80} />
          <CardTitle className="text-center font-bebas text-4xl">로그인</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="game"
            className="w-full hover-lift"
            onClick={handleLogin}
          >
            입장하기
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/">게스트 입장</Link>
          </Button>
          <p className="text-center text-sm">
            아직 계정이 없으신가요? {" "}
            <Link href="/signup" className="text-primary underline">회원가입</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
