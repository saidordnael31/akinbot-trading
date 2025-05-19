"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { RefreshCw, X } from "lucide-react"

type Position = {
  id: string
  symbol: string
  side: string
  amount: number
  entryPrice: number
  markPrice: number
  pnl: number
  pnlPercentage: number
  timestamp: string
}

// Posições simuladas
const MOCK_POSITIONS: Position[] = [
  {
    id: "pos_1",
    symbol: "BTC/USDT",
    side: "buy",
    amount: 0.001,
    entryPrice: 39500,
    markPrice: 40000,
    pnl: 0.5,
    pnlPercentage: 1.27,
    timestamp: new Date().toISOString(),
  },
  {
    id: "pos_2",
    symbol: "ETH/USDT",
    side: "sell",
    amount: 0.01,
    entryPrice: 2200,
    markPrice: 2150,
    pnl: 0.5,
    pnlPercentage: 2.27,
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
]

export function OpenPositions() {
  const [positions, setPositions] = useState<Position[]>(MOCK_POSITIONS)
  const [loading, setLoading] = useState(false)
  const [accountBalance, setAccountBalance] = useState(2000)

  // Carregar saldo da conta do localStorage
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const userData = JSON.parse(user)
        setAccountBalance(userData.balance || 2000)
      } catch (error) {
        console.error("Erro ao analisar dados do usuário:", error)
      }
    }
  }, [])

  // Função para atualizar o saldo da conta
  const updateAccountBalance = (newBalance: number) => {
    // Atualizar no estado
    setAccountBalance(newBalance)

    // Atualizar no localStorage
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const userData = JSON.parse(user)
        userData.balance = newBalance
        localStorage.setItem("user", JSON.stringify(userData))
      } catch (error) {
        console.error("Erro ao atualizar saldo:", error)
      }
    }
  }

  const fetchPositions = useCallback(async () => {
    setLoading(true)
    try {
      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Em um sistema real, você buscaria as posições do backend
      setPositions(MOCK_POSITIONS)
    } catch (error) {
      console.error("Erro ao buscar posições:", error)
      toast({
        title: "Erro ao buscar posições",
        description: "Não foi possível carregar as posições abertas",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPositions()
  }, [fetchPositions])

  const closePosition = async (position: Position) => {
    try {
      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remover a posição da lista
      setPositions((prevPositions) => prevPositions.filter((pos) => pos.id !== position.id))

      // Simular adição do lucro/perda ao saldo
      const profit = position.pnl
      const newBalance = accountBalance + profit
      updateAccountBalance(newBalance)

      toast({
        title: "Posição fechada",
        description: `${position.symbol} ${position.side === "buy" ? "compra" : "venda"} fechada com ${profit >= 0 ? "lucro" : "perda"} de $${Math.abs(profit).toFixed(2)}`,
        variant: profit >= 0 ? "default" : "destructive",
      })
    } catch (error) {
      console.error("Erro ao fechar posição:", error)
      toast({
        title: "Erro ao fechar posição",
        description: "Não foi possível fechar a posição",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Posições Abertas</CardTitle>
          <CardDescription>Posições de negociação atualmente ativas</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchPositions} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </CardHeader>
      <CardContent>
        {positions.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            {loading ? "Carregando posições..." : "Nenhuma posição aberta"}
          </div>
        ) : (
          <div className="space-y-4">
            {positions.map((position) => (
              <div key={position.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="font-medium">{position.symbol}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                        position.side === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {position.side === "buy" ? "Longo" : "Curto"}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Quantidade: {position.amount} • Entrada: ${position.entryPrice.toFixed(2)}
                  </div>
                  <div className={`text-sm font-medium ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                    PnL: ${position.pnl.toFixed(2)} ({position.pnl >= 0 ? "+" : ""}
                    {position.pnlPercentage.toFixed(2)}%)
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => closePosition(position)}>
                  <X className="h-4 w-4 mr-1" />
                  Fechar
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
