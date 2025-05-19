"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, TrendingUp, BarChart2, DollarSign } from "lucide-react"

interface BacktestResultsProps {
  strategy: string
  symbol: string
  timeframe: string
  startDate?: Date
  endDate?: Date
}

export function BacktestResults({ strategy, symbol, timeframe, startDate, endDate }: BacktestResultsProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Mapear nomes de estratégias para exibição
  const strategyNames = {
    trend_following: "Trend Following",
    breakout: "Breakout",
    mean_reversion: "Mean Reversion",
    momentum: "Momentum",
    btc_specialist: "BTC/USD Specialist",
  }

  // Dados simulados de resultados
  const results = {
    netProfit: 2345.67,
    profitFactor: 1.87,
    winRate: 68.5,
    totalTrades: 47,
    winningTrades: 32,
    losingTrades: 15,
    averageWin: 125.34,
    averageLoss: -78.45,
    maxDrawdown: 12.3,
    sharpeRatio: 1.45,
    sortinoRatio: 2.12,
    returnOnInvestment: 23.46,
    annualizedReturn: 34.78,
    volatility: 15.67,
    maxConsecutiveWins: 8,
    maxConsecutiveLosses: 3,
    averageHoldingPeriod: "14.5 horas",
    bestTrade: 432.1,
    worstTrade: -210.45,
  }

  // Dados simulados para o gráfico de equity
  const equityData = [
    { date: "01/01/2023", equity: 10000 },
    { date: "15/01/2023", equity: 10250 },
    { date: "01/02/2023", equity: 10450 },
    { date: "15/02/2023", equity: 10200 },
    { date: "01/03/2023", equity: 10600 },
    { date: "15/03/2023", equity: 11200 },
    { date: "01/04/2023", equity: 11500 },
    { date: "15/04/2023", equity: 11300 },
    { date: "01/05/2023", equity: 11800 },
    { date: "15/05/2023", equity: 12345 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h3 className="text-lg font-medium">
            Resultados do Backtesting: {strategyNames[strategy as keyof typeof strategyNames] || strategy}
          </h3>
          <p className="text-sm text-muted-foreground">
            {symbol} • {timeframe} •{" "}
            {startDate && endDate
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : "Período completo"}
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          {results.netProfit >= 0 ? "Lucrativo" : "Não Lucrativo"}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${results.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {results.netProfit >= 0 ? "+" : ""}
              {results.netProfit.toFixed(2)} USDT
            </div>
            <p className="text-xs text-muted-foreground">ROI: {results.returnOnInvestment}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.profitFactor.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lucro bruto / Perda bruta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Acerto</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {results.winningTrades} ganhos / {results.losingTrades} perdas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drawdown Máximo</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-{results.maxDrawdown.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Queda máxima do pico</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="equity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="equity">Curva de Equity</TabsTrigger>
          <TabsTrigger value="monthly">Retornos Mensais</TabsTrigger>
          <TabsTrigger value="drawdown">Drawdown</TabsTrigger>
        </TabsList>

        <TabsContent value="equity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Curva de Equity</CardTitle>
              <CardDescription>Evolução do capital ao longo do período de teste</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="h-full w-full bg-[url('/equity-curve-chart.png')] bg-contain bg-center bg-no-repeat"></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retornos Mensais</CardTitle>
              <CardDescription>Desempenho da estratégia por mês</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="h-full w-full bg-[url('/monthly-returns-bar-chart.png')] bg-contain bg-center bg-no-repeat"></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drawdown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Drawdown</CardTitle>
              <CardDescription>Períodos de queda do capital</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="h-full w-full bg-[url('/drawdown-analysis-chart.png')] bg-contain bg-center bg-no-repeat"></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas de Trading</CardTitle>
            <CardDescription>Métricas detalhadas de desempenho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Total de Trades</p>
                <p className="text-lg">{results.totalTrades}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Ganho Médio</p>
                <p className="text-lg text-green-600">+{results.averageWin.toFixed(2)} USDT</p>
              </div>
              <div>
                <p className="text-sm font-medium">Perda Média</p>
                <p className="text-lg text-red-600">{results.averageLoss.toFixed(2)} USDT</p>
              </div>
              <div>
                <p className="text-sm font-medium">Melhor Trade</p>
                <p className="text-lg text-green-600">+{results.bestTrade.toFixed(2)} USDT</p>
              </div>
              <div>
                <p className="text-sm font-medium">Pior Trade</p>
                <p className="text-lg text-red-600">{results.worstTrade.toFixed(2)} USDT</p>
              </div>
              <div>
                <p className="text-sm font-medium">Tempo Médio</p>
                <p className="text-lg">{results.averageHoldingPeriod}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Sequência de Ganhos</p>
                <p className="text-lg">{results.maxConsecutiveWins}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Sequência de Perdas</p>
                <p className="text-lg">{results.maxConsecutiveLosses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas de Risco</CardTitle>
            <CardDescription>Indicadores de risco e retorno</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Sharpe Ratio</p>
                <p className="text-lg">{results.sharpeRatio.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Sortino Ratio</p>
                <p className="text-lg">{results.sortinoRatio.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Retorno Anualizado</p>
                <p className="text-lg">{results.annualizedReturn.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Volatilidade</p>
                <p className="text-lg">{results.volatility.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Profit Factor</p>
                <p className="text-lg">{results.profitFactor.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Expectativa</p>
                <p className="text-lg">
                  {(
                    (results.winRate / 100) * results.averageWin +
                    (1 - results.winRate / 100) * results.averageLoss
                  ).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Retorno/Risco</p>
                <p className="text-lg">{(results.returnOnInvestment / results.maxDrawdown).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Fator de Recuperação</p>
                <p className="text-lg">{(results.netProfit / (10000 * (results.maxDrawdown / 100))).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
