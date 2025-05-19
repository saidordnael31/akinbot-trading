"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUp, ArrowDown, Search, Filter } from "lucide-react"

interface BacktestTradeListProps {
  strategy: string
  symbol: string
  timeframe: string
}

interface Trade {
  id: string
  entryDate: string
  exitDate: string
  side: "buy" | "sell"
  entryPrice: number
  exitPrice: number
  quantity: number
  profit: number
  profitPercentage: number
  duration: string
  status: "win" | "loss"
}

export function BacktestTradeList({ strategy, symbol, timeframe }: BacktestTradeListProps) {
  const [loading, setLoading] = useState(true)
  const [trades, setTrades] = useState<Trade[]>([])
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sideFilter, setSideFilter] = useState("all")
  const [resultFilter, setResultFilter] = useState("all")

  // Gerar dados simulados de trades
  useEffect(() => {
    const generateTrades = () => {
      const mockTrades: Trade[] = []

      // Gerar 50 trades simulados
      for (let i = 1; i <= 50; i++) {
        const side = Math.random() > 0.5 ? "buy" : "sell"
        const entryPrice = side === "buy" ? 40000 - Math.random() * 2000 : 40000 + Math.random() * 2000
        const exitPrice =
          side === "buy"
            ? entryPrice * (1 + (Math.random() * 0.05 - 0.02))
            : entryPrice * (1 - (Math.random() * 0.05 - 0.02))
        const quantity = 0.01 + Math.random() * 0.09
        const profit = side === "buy" ? (exitPrice - entryPrice) * quantity : (entryPrice - exitPrice) * quantity
        const profitPercentage =
          side === "buy" ? ((exitPrice - entryPrice) / entryPrice) * 100 : ((entryPrice - exitPrice) / entryPrice) * 100

        // Gerar datas aleatórias em um período de 3 meses
        const startDate = new Date(2023, 0, 1).getTime()
        const endDate = new Date(2023, 3, 1).getTime()
        const entryTimestamp = startDate + Math.random() * (endDate - startDate)
        const entryDate = new Date(entryTimestamp)

        // Duração aleatória do trade (entre 1 hora e 3 dias)
        const durationHours = 1 + Math.random() * 72
        const exitDate = new Date(entryTimestamp + durationHours * 60 * 60 * 1000)

        // Calcular duração formatada
        const durationMs = exitDate.getTime() - entryDate.getTime()
        const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24))
        const durationHoursRemainder = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const durationFormatted =
          durationDays > 0 ? `${durationDays}d ${durationHoursRemainder}h` : `${durationHoursRemainder}h`

        mockTrades.push({
          id: `T${i.toString().padStart(3, "0")}`,
          entryDate: entryDate.toLocaleString(),
          exitDate: exitDate.toLocaleString(),
          side,
          entryPrice,
          exitPrice,
          quantity,
          profit,
          profitPercentage,
          duration: durationFormatted,
          status: profit >= 0 ? "win" : "loss",
        })
      }

      // Ordenar por data de entrada (mais recente primeiro)
      return mockTrades.sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
    }

    // Simular carregamento de dados
    setTimeout(() => {
      const generatedTrades = generateTrades()
      setTrades(generatedTrades)
      setFilteredTrades(generatedTrades)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrar trades quando os filtros mudarem
  useEffect(() => {
    let filtered = [...trades]

    // Filtrar por pesquisa
    if (searchQuery) {
      filtered = filtered.filter(
        (trade) =>
          trade.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trade.entryDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trade.exitDate.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filtrar por lado (compra/venda)
    if (sideFilter !== "all") {
      filtered = filtered.filter((trade) => trade.side === sideFilter)
    }

    // Filtrar por resultado (ganho/perda)
    if (resultFilter !== "all") {
      filtered = filtered.filter((trade) => trade.status === resultFilter)
    }

    setFilteredTrades(filtered)
  }, [searchQuery, sideFilter, resultFilter, trades])

  // Calcular estatísticas dos trades filtrados
  const totalTrades = filteredTrades.length
  const winningTrades = filteredTrades.filter((t) => t.status === "win").length
  const losingTrades = filteredTrades.filter((t) => t.status === "loss").length
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0
  const totalProfit = filteredTrades.reduce((sum, trade) => sum + trade.profit, 0)
  const averageProfit = totalTrades > 0 ? totalProfit / totalTrades : 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h3 className="text-lg font-medium">Lista de Negociações</h3>
          <p className="text-sm text-muted-foreground">
            {totalTrades} negociações • {winningTrades} ganhos ({winRate.toFixed(1)}%) • {losingTrades} perdas
          </p>
        </div>
        <div>
          <Badge variant={totalProfit >= 0 ? "default" : "destructive"} className="ml-auto">
            {totalProfit >= 0 ? "+" : ""}
            {totalProfit.toFixed(2)} USDT
          </Badge>
        </div>
      </div>

      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar negociações..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={sideFilter} onValueChange={setSideFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Direção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="buy">Compra</SelectItem>
              <SelectItem value="sell">Venda</SelectItem>
            </SelectContent>
          </Select>

          <Select value={resultFilter} onValueChange={setResultFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Resultado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="win">Ganhos</SelectItem>
              <SelectItem value="loss">Perdas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead>Direção</TableHead>
                <TableHead className="text-right">Preço Entrada</TableHead>
                <TableHead className="text-right">Preço Saída</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Lucro</TableHead>
                <TableHead className="text-right">Lucro %</TableHead>
                <TableHead>Duração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    Carregando negociações...
                  </TableCell>
                </TableRow>
              ) : filteredTrades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    Nenhuma negociação encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell className="font-medium">{trade.id}</TableCell>
                    <TableCell>{trade.entryDate}</TableCell>
                    <TableCell>{trade.exitDate}</TableCell>
                    <TableCell>
                      <Badge variant={trade.side === "buy" ? "default" : "outline"}>
                        {trade.side === "buy" ? (
                          <>
                            <ArrowUp className="mr-1 h-3 w-3" /> Compra
                          </>
                        ) : (
                          <>
                            <ArrowDown className="mr-1 h-3 w-3" /> Venda
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{trade.entryPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{trade.exitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{trade.quantity.toFixed(4)}</TableCell>
                    <TableCell className={`text-right ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {trade.profit >= 0 ? "+" : ""}
                      {trade.profit.toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={`text-right ${trade.profitPercentage >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {trade.profitPercentage >= 0 ? "+" : ""}
                      {trade.profitPercentage.toFixed(2)}%
                    </TableCell>
                    <TableCell>{trade.duration}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
