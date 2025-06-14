"use client"

import { ImageWithSkeleton as Image } from "@/components/ui/image-with-skeleton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import logoSrc from "@/public/placeholder-logo.png"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const handleSignup = async () => {
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다")
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/login")
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black text-white">
      <Image
        src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=60"
        alt="signup background"
        fill
        className="object-cover opacity-40"
      />
      <Card className="relative z-10 w-full max-w-sm border-4 border-yellow-500 bg-black/70 backdrop-blur-md animate-slide-in-up">
        <CardHeader className="flex flex-col items-center gap-2">
          <Image src={logoSrc} alt="Street Dreams" width={80} height={80} />
          <CardTitle className="text-center font-bebas text-4xl">회원가입</CardTitle>
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
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button
            className="w-full bg-primary text-primary-foreground"
            onClick={handleSignup}
          >
            가입하기
          </Button>
          <p className="text-center text-sm">
            이미 계정이 있으신가요? {" "}
            <Link href="/login" className="text-primary underline">로그인</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
