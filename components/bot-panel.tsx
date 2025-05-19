"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowUpDown, Timer, RefreshCw, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Lista de pares de negociação simulados
const MOCK_TRADING_PAIRS = [
  "BTC/USDT",
  "ETH/USDT",
  "SOL/USDT",
  "XRP/USDT",
  "ADA/USDT",
  "DOGE/USDT",
  "DOT/USDT",
  "AVAX/USDT",
  "MATIC/USDT",
  "LINK/USDT",
]

export function BotPanel() {
  const [executing, setExecuting] = useState(false)
  const [symbol, setSymbol] = useState("BTC/USDT")
  const [tradingPairs, setTradingPairs] = useState<string[]>(MOCK_TRADING_PAIRS)
  const [loading, setLoading] = useState(false)
  const [side, setSide] = useState("buy")
  const [amount, setAmount] = useState("0.001")
  const [autoClose, setAutoClose] = useState(true)
  const [timeLimit, setTimeLimit] = useState("5")
  const [error, setError] = useState<string | null>(null)
  const [accountBalance, setAccountBalance] = useState(2000)
  const [lastTradeId, setLastTradeId] = useState<string | null>(null)

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

  // Simular carregamento de pares de negociação
  const fetchTradingPairs = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Usar a lista de pares simulados
      setTradingPairs(MOCK_TRADING_PAIRS)

      // Garantir que BTC/USDT esteja selecionado
      if (!symbol) {
        setSymbol("BTC/USDT")
      }
    } catch (error) {
      console.error("Erro ao buscar pares de negociação:", error)
      setError("Falha ao carregar pares de negociação")

      toast({
        title: "Erro ao carregar pares",
        description: "Não foi possível carregar os pares de negociação",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [symbol])

  // Carregar pares de negociação ao montar o componente
  useEffect(() => {
    fetchTradingPairs()
  }, [fetchTradingPairs])

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

  // Função para executar uma negociação
  const handleExecute = async () => {
    if (!symbol) {
      toast({
        title: "Par de negociação não selecionado",
        description: "Por favor, selecione um par de negociação",
        variant: "destructive",
      })
      return
    }

    const amountValue = Number.parseFloat(amount)
    if (!amount || amountValue <= 0) {
      toast({
        title: "Quantidade inválida",
        description: "Por favor, insira uma quantidade válida",
        variant: "destructive",
      })
      return
    }

    // Verificar se há saldo suficiente (simulação simplificada)
    const estimatedCost = amountValue * (symbol === "BTC/USDT" ? 40000 : 2000)
    if (estimatedCost > accountBalance) {
      toast({
        title: "Saldo insuficiente",
        description: `Você precisa de aproximadamente $${estimatedCost.toFixed(2)} para esta operação`,
        variant: "destructive",
      })
      return
    }

    setExecuting(true)

    try {
      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Gerar ID único para a negociação
      const tradeId = `trade_${Date.now()}`
      setLastTradeId(tradeId)

      // Simular dedução do saldo (apenas para compras)
      if (side === "buy") {
        const newBalance = accountBalance - amountValue * 0.1 // Simulação simplificada
        updateAccountBalance(newBalance)
      }

      // Adicionar a negociação ao histórico (em um sistema real, isso seria feito no backend)
      const trade = {
        id: tradeId,
        symbol,
        side,
        amount: amountValue,
        price: symbol === "BTC/USDT" ? 40000 : 2000,
        timestamp: new Date().toISOString(),
        status: "executed",
      }

      // Em um sistema real, você armazenaria isso em um banco de dados
      console.log("Negociação executada:", trade)

      toast({
        title: "Negociação executada",
        description: `${side === "buy" ? "Compra" : "Venda"} de ${amount} ${symbol} executada com sucesso`,
      })

      // Se auto-close estiver ativado, configurar o fechamento automático
      if (autoClose && timeLimit) {
        const timeLimitMs = Number.parseInt(timeLimit) * 60 * 1000

        toast({
          title: "Fechamento automático configurado",
          description: `A posição será fechada automaticamente em ${timeLimit} minutos`,
        })

        // Em um sistema real, isso seria feito no backend
        setTimeout(() => {
          // Simular fechamento da posição
          const closingPrice = symbol === "BTC/USDT" ? 40100 : 2010 // Preço ligeiramente melhor
          const profit =
            side === "buy" ? (closingPrice - trade.price) * amountValue : (trade.price - closingPrice) * amountValue

          // Atualizar saldo
          const newBalance = accountBalance + profit
          updateAccountBalance(newBalance)

          toast({
            title: "Posição fechada automaticamente",
            description: `${symbol} ${side === "buy" ? "compra" : "venda"} fechada com ${profit >= 0 ? "lucro" : "perda"} de $${Math.abs(profit).toFixed(2)}`,
            variant: profit >= 0 ? "default" : "destructive",
          })
        }, timeLimitMs)
      }
    } catch (error) {
      console.error("Erro ao executar negociação:", error)
      toast({
        title: "Erro ao executar negociação",
        description: "Ocorreu um erro ao processar sua solicitação",
        variant: "destructive",
      })
    } finally {
      setExecuting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controle de Bot de Negociação</CardTitle>
        <CardDescription>Configurar e executar negociações</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastTradeId && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Negociação ativa</AlertTitle>
            <AlertDescription>
              Você tem uma negociação em andamento (ID: {lastTradeId.substring(0, 8)}...)
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="symbol">Par de negociação</Label>
            <Button variant="ghost" size="sm" onClick={fetchTradingPairs} disabled={loading} className="h-8 px-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span className="sr-only">Atualizar</span>
            </Button>
          </div>
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger id="symbol">
              <SelectValue placeholder={loading ? "Carregando..." : "Selecione um par"} />
            </SelectTrigger>
            <SelectContent>
              {tradingPairs.map((pair) => (
                <SelectItem key={pair} value={pair}>
                  {pair}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="side">Direção Comercial</Label>
          <Select value={side} onValueChange={setSide}>
            <SelectTrigger id="side">
              <SelectValue placeholder="Selecione a direção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Longo (Compra)</SelectItem>
              <SelectItem value="sell">Curto (Venda)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Quantidade</Label>
          <Input
            id="amount"
            type="number"
            step="0.001"
            min="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="auto-close" checked={autoClose} onCheckedChange={setAutoClose} />
          <Label htmlFor="auto-close" className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Posição de fechamento automático
          </Label>
        </div>

        {autoClose && (
          <div className="space-y-2">
            <Label htmlFor="time-limit">Limite de tempo (minutos)</Label>
            <Input
              id="time-limit"
              type="number"
              min="1"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>
        )}

        <div className="mt-2 text-sm">
          <p>
            Saldo disponível: <strong>${accountBalance.toFixed(2)}</strong>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleExecute}
          disabled={executing || !symbol}
          variant={side === "buy" ? "default" : "destructive"}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {executing ? "Executando..." : `Executar negociação ${side === "buy" ? "longa" : "curta"}`}
        </Button>
      </CardFooter>
    </Card>
  )
}
