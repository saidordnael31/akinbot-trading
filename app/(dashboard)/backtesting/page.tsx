"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AuthCheck } from "@/components/auth-check"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { BacktestResults } from "@/components/backtest-results"
import { BacktestTradeList } from "@/components/backtest-trade-list"
import { BacktestMetrics } from "@/components/backtest-metrics"
import { toast } from "@/components/ui/use-toast"
import { Play, Settings, BarChart2, History, Download, RefreshCw } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

export default function BacktestingPage() {
  // Estado para armazenar os parâmetros do backtest
  const [selectedStrategy, setSelectedStrategy] = useState("trend_following")
  const [selectedSymbol, setSelectedSymbol] = useState("BTC/USDT")
  const [timeframe, setTimeframe] = useState("1h")
  const [initialCapital, setInitialCapital] = useState("10000")
  const [positionSize, setPositionSize] = useState("10")
  const [stopLoss, setStopLoss] = useState("2")
  const [takeProfit, setTakeProfit] = useState("4")
  const [useTrailingStop, setUseTrailingStop] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -90),
    to: new Date(),
  })

  // Estado para controlar o processo de backtesting
  const [isRunning, setIsRunning] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [activeTab, setActiveTab] = useState("parameters")

  // Função para executar o backtesting
  const runBacktest = async () => {
    if (!selectedStrategy || !selectedSymbol || !timeframe || !initialCapital || !date?.from || !date?.to) {
      toast({
        title: "Parâmetros incompletos",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsRunning(true)

    try {
      // Simulação de processamento de backtesting
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulação de resultado bem-sucedido
      setHasResults(true)
      setActiveTab("results")

      toast({
        title: "Backtesting concluído",
        description: "O teste da estratégia foi concluído com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro no backtesting",
        description: "Ocorreu um erro ao processar o backtesting",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  // Função para exportar resultados
  const exportResults = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os resultados estão sendo exportados para CSV",
    })

    // Simulação de download
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: "Os resultados foram exportados com sucesso",
      })
    }, 1500)
  }

  // Função para resetar o formulário
  const resetForm = () => {
    setSelectedStrategy("trend_following")
    setSelectedSymbol("BTC/USDT")
    setTimeframe("1h")
    setInitialCapital("10000")
    setPositionSize("10")
    setStopLoss("2")
    setTakeProfit("4")
    setUseTrailingStop(false)
    setDate({
      from: addDays(new Date(), -90),
      to: new Date(),
    })

    toast({
      title: "Formulário resetado",
      description: "Os parâmetros foram redefinidos para os valores padrão",
    })
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
            <h2 className="text-3xl font-bold tracking-tight">Backtesting</h2>
            <div className="flex items-center gap-2">
              {hasResults && (
                <Button variant="outline" size="sm" onClick={exportResults}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Resultados
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={resetForm}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Resetar
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Teste de Estratégias em Dados Históricos</CardTitle>
              <CardDescription>
                Configure os parâmetros e execute testes para avaliar o desempenho das estratégias antes de utilizá-las
                em mercados reais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="parameters">
                    <Settings className="mr-2 h-4 w-4" />
                    Parâmetros
                  </TabsTrigger>
                  <TabsTrigger value="results" disabled={!hasResults}>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Resultados
                  </TabsTrigger>
                  <TabsTrigger value="trades" disabled={!hasResults}>
                    <History className="mr-2 h-4 w-4" />
                    Negociações
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="parameters" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="strategy">Estratégia</Label>
                        <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                          <SelectTrigger id="strategy">
                            <SelectValue placeholder="Selecione uma estratégia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trend_following">Trend Following</SelectItem>
                            <SelectItem value="breakout">Breakout</SelectItem>
                            <SelectItem value="mean_reversion">Mean Reversion</SelectItem>
                            <SelectItem value="momentum">Momentum</SelectItem>
                            <SelectItem value="btc_specialist">BTC/USD Specialist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="symbol">Par de Trading</Label>
                        <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                          <SelectTrigger id="symbol">
                            <SelectValue placeholder="Selecione um par" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                            <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                            <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                            <SelectItem value="XRP/USDT">XRP/USDT</SelectItem>
                            <SelectItem value="ADA/USDT">ADA/USDT</SelectItem>
                            <SelectItem value="DOGE/USDT">DOGE/USDT</SelectItem>
                            <SelectItem value="DOT/USDT">DOT/USDT</SelectItem>
                            <SelectItem value="AVAX/USDT">AVAX/USDT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeframe">Timeframe</Label>
                        <Select value={timeframe} onValueChange={setTimeframe}>
                          <SelectTrigger id="timeframe">
                            <SelectValue placeholder="Selecione um timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1m">1 minuto</SelectItem>
                            <SelectItem value="5m">5 minutos</SelectItem>
                            <SelectItem value="15m">15 minutos</SelectItem>
                            <SelectItem value="30m">30 minutos</SelectItem>
                            <SelectItem value="1h">1 hora</SelectItem>
                            <SelectItem value="4h">4 horas</SelectItem>
                            <SelectItem value="1d">1 dia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date-range">Período de Teste</Label>
                        <DatePickerWithRange date={date} setDate={setDate} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="initial-capital">Capital Inicial (USDT)</Label>
                        <Input
                          id="initial-capital"
                          type="number"
                          value={initialCapital}
                          onChange={(e) => setInitialCapital(e.target.value)}
                          min="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position-size">Tamanho da Posição (% do capital)</Label>
                        <div className="flex items-center space-x-4">
                          <Slider
                            id="position-size-slider"
                            min={1}
                            max={100}
                            step={1}
                            value={[Number.parseInt(positionSize)]}
                            onValueChange={(value) => setPositionSize(value[0].toString())}
                            className="flex-1"
                          />
                          <Input
                            id="position-size"
                            type="number"
                            value={positionSize}
                            onChange={(e) => setPositionSize(e.target.value)}
                            className="w-20"
                            min="1"
                            max="100"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                        <div className="flex items-center space-x-4">
                          <Slider
                            id="stop-loss-slider"
                            min={0.5}
                            max={20}
                            step={0.5}
                            value={[Number.parseFloat(stopLoss)]}
                            onValueChange={(value) => setStopLoss(value[0].toString())}
                            className="flex-1"
                          />
                          <Input
                            id="stop-loss"
                            type="number"
                            value={stopLoss}
                            onChange={(e) => setStopLoss(e.target.value)}
                            className="w-20"
                            min="0.5"
                            step="0.5"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="take-profit">Take Profit (%)</Label>
                        <div className="flex items-center space-x-4">
                          <Slider
                            id="take-profit-slider"
                            min={0.5}
                            max={50}
                            step={0.5}
                            value={[Number.parseFloat(takeProfit)]}
                            onValueChange={(value) => setTakeProfit(value[0].toString())}
                            className="flex-1"
                          />
                          <Input
                            id="take-profit"
                            type="number"
                            value={takeProfit}
                            onChange={(e) => setTakeProfit(e.target.value)}
                            className="w-20"
                            min="0.5"
                            step="0.5"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Switch id="trailing-stop" checked={useTrailingStop} onCheckedChange={setUseTrailingStop} />
                        <Label htmlFor="trailing-stop">Usar Trailing Stop</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="results" className="space-y-4">
                  {hasResults ? (
                    <BacktestResults
                      strategy={selectedStrategy}
                      symbol={selectedSymbol}
                      timeframe={timeframe}
                      startDate={date?.from}
                      endDate={date?.to}
                    />
                  ) : (
                    <div className="flex h-60 items-center justify-center">
                      <p className="text-muted-foreground">Execute o backtesting para ver os resultados</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="trades" className="space-y-4">
                  {hasResults ? (
                    <BacktestTradeList strategy={selectedStrategy} symbol={selectedSymbol} timeframe={timeframe} />
                  ) : (
                    <div className="flex h-60 items-center justify-center">
                      <p className="text-muted-foreground">Execute o backtesting para ver as negociações</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <BacktestMetrics visible={hasResults} />
              <Button onClick={runBacktest} disabled={isRunning} className="ml-auto">
                {isRunning ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Executar Backtesting
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </AuthCheck>
  )
}
