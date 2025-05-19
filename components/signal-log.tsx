"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowDown, ArrowUp, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

type Signal = {
  id: string
  timestamp: string
  symbol: string
  direction: "buy" | "sell"
  confidence: number
  status: "pending" | "executed" | "closed" | "cancelled"
  profit?: number
}

// Sinais simulados
const MOCK_SIGNALS: Signal[] = [
  {
    id: "sig_1",
    timestamp: new Date().toISOString(),
    symbol: "BTC/USDT",
    direction: "buy",
    confidence: 0.85,
    status: "executed",
    profit: 2.3,
  },
  {
    id: "sig_2",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    symbol: "ETH/USDT",
    direction: "sell",
    confidence: 0.72,
    status: "closed",
    profit: -1.2,
  },
  {
    id: "sig_3",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    symbol: "SOL/USDT",
    direction: "buy",
    confidence: 0.91,
    status: "pending",
  },
  {
    id: "sig_4",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    symbol: "XRP/USDT",
    direction: "buy",
    confidence: 0.68,
    status: "executed",
    profit: 1.5,
  },
  {
    id: "sig_5",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    symbol: "ADA/USDT",
    direction: "sell",
    confidence: 0.77,
    status: "closed",
    profit: 0.8,
  },
]

interface SignalLogProps {
  fullWidth?: boolean
}

export function SignalLog({ fullWidth = false }: SignalLogProps) {
  const [signals, setSignals] = useState<Signal[]>(MOCK_SIGNALS)
  const [loading, setLoading] = useState(false)

  const fetchSignals = useCallback(async () => {
    setLoading(true)
    try {
      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Em um sistema real, você buscaria os sinais do backend
      setSignals(MOCK_SIGNALS)
    } catch (error) {
      console.error("Erro ao buscar sinais:", error)
      toast({
        title: "Erro ao buscar sinais",
        description: "Não foi possível carregar os sinais de negociação",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSignals()
  }, [fetchSignals])

  const executeSignal = async (signalId: string) => {
    try {
      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Atualizar o status do sinal
      setSignals((prevSignals) =>
        prevSignals.map((signal) => (signal.id === signalId ? { ...signal, status: "executed" as const } : signal)),
      )

      toast({
        title: "Sinal executado",
        description: "O sinal foi executado com sucesso",
      })
    } catch (error) {
      console.error("Erro ao executar sinal:", error)
      toast({
        title: "Erro ao executar sinal",
        description: "Não foi possível executar o sinal",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className={fullWidth ? "w-full" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Registro de Sinal</CardTitle>
          <CardDescription>Sinais de negociação recentes e seu status</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSignals} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className={fullWidth ? "h-[500px]" : "h-[350px]"}>
          <div className="space-y-4">
            {signals.length === 0 ? (
              <div className="flex h-20 items-center justify-center text-muted-foreground">
                {loading ? "Carregando sinais..." : "Nenhum sinal disponível"}
              </div>
            ) : (
              signals.map((signal) => (
                <div key={signal.id} className="flex items-start space-x-4 rounded-md border p-3">
                  <div
                    className={`mt-0.5 rounded-full p-1 ${signal.direction === "buy" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {signal.direction === "buy" ? (
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{signal.symbol}</p>
                      <Badge
                        variant={
                          signal.status === "executed"
                            ? "default"
                            : signal.status === "closed"
                              ? "outline"
                              : signal.status === "cancelled"
                                ? "destructive"
                                : "secondary"
                        }
                      >
                        {signal.status === "executed"
                          ? "executado"
                          : signal.status === "closed"
                            ? "fechado"
                            : signal.status === "cancelled"
                              ? "cancelado"
                              : "pendente"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(signal.timestamp).toLocaleString()}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Confiança: {(signal.confidence * 100).toFixed(0)}%</span>
                      {signal.profit !== undefined && (
                        <span className={signal.profit >= 0 ? "text-green-600" : "text-red-600"}>
                          {signal.profit >= 0 ? "+" : ""}
                          {signal.profit.toFixed(2)}%
                        </span>
                      )}
                    </div>
                    {signal.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 w-full"
                        onClick={() => executeSignal(signal.id)}
                      >
                        Executar este sinal
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
