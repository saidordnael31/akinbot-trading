"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PriceChart } from "@/components/price-chart"
import { ChartControls } from "@/components/chart-controls"
import { DrawingTools } from "@/components/drawing-tools"
import { ChartLayouts } from "@/components/chart-layouts"
import { PriceAlerts } from "@/components/price-alerts"
import { MultiAssetComparison } from "@/components/multi-asset-comparison"
import { TechnicalIndicators } from "@/components/technical-indicators"
import { MarketInfo } from "@/components/market-info"

export default function ChartsPage() {
  const [symbol, setSymbol] = useState("BTC/USDT")
  const [timeframe, setTimeframe] = useState("1h")
  const [chartType, setChartType] = useState("candlestick")

  const symbols = [
    { value: "BTC/USDT", label: "Bitcoin (BTC/USDT)" },
    { value: "ETH/USDT", label: "Ethereum (ETH/USDT)" },
    { value: "SOL/USDT", label: "Solana (SOL/USDT)" },
    { value: "BNB/USDT", label: "Binance Coin (BNB/USDT)" },
    { value: "ADA/USDT", label: "Cardano (ADA/USDT)" },
    { value: "XRP/USDT", label: "Ripple (XRP/USDT)" },
    { value: "DOT/USDT", label: "Polkadot (DOT/USDT)" },
    { value: "DOGE/USDT", label: "Dogecoin (DOGE/USDT)" },
  ]

  const timeframes = [
    { value: "1m", label: "1 minuto" },
    { value: "5m", label: "5 minutos" },
    { value: "15m", label: "15 minutos" },
    { value: "30m", label: "30 minutos" },
    { value: "1h", label: "1 hora" },
    { value: "4h", label: "4 horas" },
    { value: "1d", label: "1 dia" },
    { value: "1w", label: "1 semana" },
  ]

  const chartTypes = [
    { value: "candlestick", label: "Candlestick" },
    { value: "line", label: "Linha" },
    { value: "area", label: "Área" },
    { value: "bars", label: "Barras" },
  ]

  const handleSelectTool = (tool: string) => {
    console.log(`Ferramenta selecionada: ${tool}`)
    // Implementar lógica para ativar a ferramenta de desenho
  }

  const handleClearDrawings = () => {
    console.log("Limpar todos os desenhos")
    // Implementar lógica para limpar desenhos
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h1 className="text-2xl font-bold">Gráficos</h1>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um par" />
            </SelectTrigger>
            <SelectContent>
              {symbols.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((tf) => (
                <SelectItem key={tf.value} value={tf.value}>
                  {tf.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tipo de Gráfico" />
            </SelectTrigger>
            <SelectContent>
              {chartTypes.map((ct) => (
                <SelectItem key={ct.value} value={ct.value}>
                  {ct.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex h-[600px] flex-col">
                <div className="flex items-center justify-between border-b p-2">
                  <div className="flex items-center space-x-2">
                    <ChartLayouts />
                    <DrawingTools onSelectTool={handleSelectTool} onClearDrawings={handleClearDrawings} />
                  </div>

                  <div className="flex items-center space-x-2">
                    <PriceAlerts symbol={symbol} />
                    <MultiAssetComparison mainSymbol={symbol} />
                  </div>
                </div>

                <div className="relative flex-1">
                  <PriceChart symbol={symbol} timeframe={timeframe} chartType={chartType} />
                </div>

                <ChartControls />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <MarketInfo symbol={symbol} />
          <TechnicalIndicators symbol={symbol} timeframe={timeframe} />
        </div>
      </div>
    </div>
  )
}
