"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

type UserData = {
  email: string
  name: string
  balance: number
  currency: string
  isLoggedIn: boolean
}

export function AccountSummary() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activePositions, setActivePositions] = useState(0)
  const [totalPnl, setTotalPnl] = useState(0)
  const [winRate, setWinRate] = useState(0)

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        setUserData(parsedUser)
      } catch (error) {
        console.error("Erro ao analisar dados do usuário:", error)
      }
    }

    // Simular dados de negociação
    setActivePositions(2)
    setTotalPnl(125.75)
    setWinRate(65)
  }, [])

  if (!userData) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo da Conta</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${userData.balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Conta Demo em {userData.currency}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Negociações Ativas</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activePositions}</div>
          <p className="text-xs text-muted-foreground">Posições abertas atualmente</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lucro/Perda Total</CardTitle>
          {totalPnl >= 0 ? (
            <ArrowUp className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
            {totalPnl >= 0 ? "+" : ""}
            {totalPnl.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Lucro/perda acumulado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Vitória</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{winRate}%</div>
          <p className="text-xs text-muted-foreground">Percentual de operações lucrativas</p>
        </CardContent>
      </Card>
    </div>
  )
}
