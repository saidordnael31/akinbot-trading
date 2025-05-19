"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthCheckProps {
  children: React.ReactNode
}

export function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar se o usuário está logado
    const user = localStorage.getItem("user")

    if (!user) {
      router.push("/login")
    } else {
      try {
        const userData = JSON.parse(user)
        if (userData.isLoggedIn) {
          setIsAuthenticated(true)
        } else {
          router.push("/login")
        }
      } catch (error) {
        router.push("/login")
      }
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
