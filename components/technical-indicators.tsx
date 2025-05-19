"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TechnicalIndicatorsProps {
  symbol: string
  timeframe: string
}

export function TechnicalIndicators({ symbol, timeframe }: TechnicalIndicatorsProps) {
  const [indicators, setIndicators] = useState({
    // Indicadores básicos
    rsi: 0,
    macd: { value: 0, signal: 0, histogram: 0 },
    ma: { ma20: 0, ma50: 0, ma200: 0 },
    bb: { upper: 0, middle: 0, lower: 0 },
    stoch: { k: 0, d: 0 },

    // Indicadores avançados
    adx: { adx: 0, plusDI: 0, minusDI: 0 },
    ichimoku: {
      tenkanSen: 0,
      kijunSen: 0,
      senkouSpanA: 0,
      senkouSpanB: 0,
      chikouSpan: 0,
    },
    pivotPoints: {
      pp: 0,
      s1: 0,
      s2: 0,
      s3: 0,
      r1: 0,
      r2: 0,
      r3: 0,
    },
    obv: 0,
    rvi: 0,
    cci: 0,
    ao: 0,
  })

  const [activeIndicators, setActiveIndicators] = useState<string[]>(["rsi", "macd", "ma", "bb", "stoch"])

  const allIndicators = [
    { id: "rsi", name: "RSI", category: "oscillators" },
    { id: "macd", name: "MACD", category: "oscillators" },
    { id: "stoch", name: "Estocástico", category: "oscillators" },
    { id: "cci", name: "CCI", category: "oscillators" },
    { id: "rvi", name: "RVI", category: "oscillators" },
    { id: "ao", name: "Awesome Oscillator", category: "oscillators" },
    { id: "ma", name: "Médias Móveis", category: "trends" },
    { id: "bb", name: "Bandas de Bollinger", category: "trends" },
    { id: "adx", name: "ADX", category: "trends" },
    { id: "ichimoku", name: "Ichimoku Cloud", category: "trends" },
    { id: "pivotPoints", name: "Pivot Points", category: "trends" },
    { id: "obv", name: "On-Balance Volume", category: "volume" },
  ]

  useEffect(() => {
    // Simular dados de indicadores técnicos
    const generateIndicators = () => {
      // RSI (0-100)
      const rsi = Math.floor(Math.random() * 100)

      // MACD
      const macd = {
        value: (Math.random() * 2 - 1) * 10,
        signal: (Math.random() * 2 - 1) * 8,
        histogram: (Math.random() * 2 - 1) * 5,
      }

      // Médias Móveis
      let basePrice = 0
      switch (symbol) {
        case "BTC/USDT":
          basePrice = 50000
          break
        case "ETH/USDT":
          basePrice = 3000
          break
        case "SOL/USDT":
          basePrice = 100
          break
        default:
          basePrice = 100
      }

      const ma = {
        ma20: basePrice * (0.95 + Math.random() * 0.1),
        ma50: basePrice * (0.93 + Math.random() * 0.1),
        ma200: basePrice * (0.9 + Math.random() * 0.1),
      }

      // Bandas de Bollinger
      const bb = {
        middle: basePrice,
        upper: basePrice * (1 + 0.02 + Math.random() * 0.02),
        lower: basePrice * (1 - 0.02 - Math.random() * 0.02),
      }

      // Estocástico
      const stoch = {
        k: Math.floor(Math.random() * 100),
        d: Math.floor(Math.random() * 100),
      }

      // ADX
      const adx = {
        adx: Math.floor(Math.random() * 100),
        plusDI: Math.floor(Math.random() * 100),
        minusDI: Math.floor(Math.random() * 100),
      }

      // Ichimoku Cloud
      const ichimoku = {
        tenkanSen: basePrice * (0.98 + Math.random() * 0.04),
        kijunSen: basePrice * (0.97 + Math.random() * 0.04),
        senkouSpanA: basePrice * (0.99 + Math.random() * 0.04),
        senkouSpanB: basePrice * (0.96 + Math.random() * 0.04),
        chikouSpan: basePrice * (1.01 + Math.random() * 0.04),
      }

      // Pivot Points
      const pivotPoints = {
        pp: basePrice,
        s1: basePrice * 0.98,
        s2: basePrice * 0.96,
        s3: basePrice * 0.94,
        r1: basePrice * 1.02,
        r2: basePrice * 1.04,
        r3: basePrice * 1.06,
      }

      // On-Balance Volume
      const obv = Math.floor(Math.random() * 1000000) - 500000

      // Relative Vigor Index
      const rvi = Math.random() * 2 - 1

      // Commodity Channel Index
      const cci = Math.random() * 400 - 200

      // Awesome Oscillator
      const ao = Math.random() * 20 - 10

      return {
        rsi,
        macd,
        ma,
        bb,
        stoch,
        adx,
        ichimoku,
        pivotPoints,
        obv,
        rvi,
        cci,
        ao,
      }
    }

    // Atualizar dados iniciais
    setIndicators(generateIndicators())

    // Atualizar dados a cada 10 segundos
    const interval = setInterval(() => {
      setIndicators(generateIndicators())
    }, 10000)

    return () => clearInterval(interval)
  }, [symbol, timeframe])

  // Determinar sinal do RSI
  const getRsiSignal = (rsi: number) => {
    if (rsi >= 70) return { signal: "Sobrecomprado", variant: "destructive" }
    if (rsi <= 30) return { signal: "Sobrevendido", variant: "default" }
    return { signal: "Neutro", variant: "outline" }
  }

  // Determinar sinal do MACD
  const getMacdSignal = (macd: { value: number; signal: number; histogram: number }) => {
    if (macd.value > macd.signal) return { signal: "Compra", variant: "default" }
    if (macd.value < macd.signal) return { signal: "Venda", variant: "destructive" }
    return { signal: "Neutro", variant: "outline" }
  }

  // Determinar sinal das Médias Móveis
  const getMaSignal = (ma: { ma20: number; ma50: number; ma200: number }) => {
    if (ma.ma20 > ma.ma50 && ma.ma50 > ma.ma200) return { signal: "Tendência de Alta", variant: "default" }
    if (ma.ma20 < ma.ma50 && ma.ma50 < ma.ma200) return { signal: "Tendência de Baixa", variant: "destructive" }
    return { signal: "Sem Tendência Clara", variant: "outline" }
  }

  // Determinar sinal do ADX
  const getAdxSignal = (adx: { adx: number; plusDI: number; minusDI: number }) => {
    if (adx.adx > 25) {
      if (adx.plusDI > adx.minusDI) return { signal: "Tendência de Alta Forte", variant: "default" }
      if (adx.plusDI < adx.minusDI) return { signal: "Tendência de Baixa Forte", variant: "destructive" }
    }
    return { signal: "Sem Tendência Forte", variant: "outline" }
  }

  // Determinar sinal do Ichimoku
  const getIchimokuSignal = (ichimoku: {
    tenkanSen: number
    kijunSen: number
    senkouSpanA: number
    senkouSpanB: number
    chikouSpan: number
  }) => {
    if (ichimoku.tenkanSen > ichimoku.kijunSen && ichimoku.senkouSpanA > ichimoku.senkouSpanB) {
      return { signal: "Tendência de Alta", variant: "default" }
    }
    if (ichimoku.tenkanSen < ichimoku.kijunSen && ichimoku.senkouSpanA < ichimoku.senkouSpanB) {
      return { signal: "Tendência de Baixa", variant: "destructive" }
    }
    return { signal: "Neutro", variant: "outline" }
  }

  // Formatar preço com precisão adequada
  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(6)
    if (price < 1) return price.toFixed(4)
    if (price < 10) return price.toFixed(3)
    if (price < 1000) return price.toFixed(2)
    return price.toFixed(0)
  }

  const handleToggleIndicator = (id: string) => {
    setActiveIndicators((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const oscillators = allIndicators.filter((i) => i.category === "oscillators")
  const trends = allIndicators.filter((i) => i.category === "trends")
  const volume = allIndicators.filter((i) => i.category === "volume")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Indicadores Técnicos</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Plus className="mr-1 h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline">Adicionar</span>
              <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Gerenciar Indicadores</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Osciladores</div>
            {oscillators.map((indicator) => (
              <DropdownMenuCheckboxItem
                key={indicator.id}
                checked={activeIndicators.includes(indicator.id)}
                onCheckedChange={() => handleToggleIndicator(indicator.id)}
              >
                {indicator.name}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Tendências</div>
            {trends.map((indicator) => (
              <DropdownMenuCheckboxItem
                key={indicator.id}
                checked={activeIndicators.includes(indicator.id)}
                onCheckedChange={() => handleToggleIndicator(indicator.id)}
              >
                {indicator.name}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Volume</div>
            {volume.map((indicator) => (
              <DropdownMenuCheckboxItem
                key={indicator.id}
                checked={activeIndicators.includes(indicator.id)}
                onCheckedChange={() => handleToggleIndicator(indicator.id)}
              >
                {indicator.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="oscillators" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="oscillators">Osciladores</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
            <TabsTrigger value="advanced">Avançados</TabsTrigger>
          </TabsList>

          <TabsContent value="oscillators" className="p-4 pt-2">
            <div className="space-y-4">
              {activeIndicators.includes("rsi") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">RSI (14)</p>
                    <Badge variant={getRsiSignal(indicators.rsi).variant as any}>
                      {getRsiSignal(indicators.rsi).signal}
                    </Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${
                        indicators.rsi >= 70 ? "bg-red-500" : indicators.rsi <= 30 ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${indicators.rsi}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>30</span>
                    <span>70</span>
                    <span>100</span>
                  </div>
                  <p className="mt-1 text-center text-sm font-medium">{indicators.rsi.toFixed(1)}</p>
                </div>
              )}

              {activeIndicators.includes("macd") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">MACD (12,26,9)</p>
                    <Badge variant={getMacdSignal(indicators.macd).variant as any}>
                      {getMacdSignal(indicators.macd).signal}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">MACD</p>
                      <p
                        className={`text-sm font-medium ${
                          indicators.macd.value >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {indicators.macd.value.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sinal</p>
                      <p className="text-sm font-medium">{indicators.macd.signal.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Histograma</p>
                      <p
                        className={`text-sm font-medium ${
                          indicators.macd.histogram >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {indicators.macd.histogram.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeIndicators.includes("stoch") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">Estocástico (14,3)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">%K</p>
                      <p
                        className={`text-sm font-medium ${
                          indicators.stoch.k >= 80 ? "text-red-500" : indicators.stoch.k <= 20 ? "text-green-500" : ""
                        }`}
                      >
                        {indicators.stoch.k.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">%D</p>
                      <p
                        className={`text-sm font-medium ${
                          indicators.stoch.d >= 80 ? "text-red-500" : indicators.stoch.d <= 20 ? "text-green-500" : ""
                        }`}
                      >
                        {indicators.stoch.d.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeIndicators.includes("cci") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">CCI (20)</p>
                    <Badge
                      variant={indicators.cci > 100 ? "destructive" : indicators.cci < -100 ? "default" : "outline"}
                    >
                      {indicators.cci > 100 ? "Sobrecomprado" : indicators.cci < -100 ? "Sobrevendido" : "Neutro"}
                    </Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${indicators.cci > 0 ? "bg-green-500" : "bg-red-500"}`}
                      style={{
                        width: `${Math.min(Math.abs(indicators.cci) / 2, 100)}%`,
                        marginLeft: indicators.cci < 0 ? 0 : "50%",
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>-200</span>
                    <span>-100</span>
                    <span>0</span>
                    <span>100</span>
                    <span>200</span>
                  </div>
                  <p className="mt-1 text-center text-sm font-medium">{indicators.cci.toFixed(1)}</p>
                </div>
              )}

              {activeIndicators.includes("rvi") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">RVI (10)</p>
                  </div>
                  <p className="text-center text-sm font-medium">{indicators.rvi.toFixed(3)}</p>
                </div>
              )}

              {activeIndicators.includes("ao") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">Awesome Oscillator</p>
                  </div>
                  <p
                    className={`text-center text-sm font-medium ${
                      indicators.ao > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {indicators.ao.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="p-4 pt-2">
            <div className="space-y-4">
              {activeIndicators.includes("ma") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">Médias Móveis</p>
                    <Badge variant={getMaSignal(indicators.ma).variant as any}>
                      {getMaSignal(indicators.ma).signal}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">MA 20</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.ma.ma20)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">MA 50</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.ma.ma50)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">MA 200</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.ma.ma200)}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeIndicators.includes("bb") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">Bandas de Bollinger (20,2)</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Superior</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.bb.upper)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Média</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.bb.middle)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Inferior</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.bb.lower)}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeIndicators.includes("adx") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">ADX (14)</p>
                    <Badge variant={getAdxSignal(indicators.adx).variant as any}>
                      {getAdxSignal(indicators.adx).signal}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">ADX</p>
                      <p className="text-sm font-medium">{indicators.adx.adx.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">+DI</p>
                      <p className="text-sm font-medium text-green-500">{indicators.adx.plusDI.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">-DI</p>
                      <p className="text-sm font-medium text-red-500">{indicators.adx.minusDI.toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeIndicators.includes("pivotPoints") && (
                <div>
                  <div className="mb-1">
                    <p className="text-sm font-medium">Pivot Points (Clássico)</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">R3</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.pivotPoints.r3)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">R2</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.pivotPoints.r2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">R1</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.pivotPoints.r1)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">PP</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.pivotPoints.pp)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">S1</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.pivotPoints.s1)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">S2</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.pivotPoints.s2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">S3</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.pivotPoints.s3)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="p-4 pt-2">
            <div className="space-y-4">
              {activeIndicators.includes("ichimoku") && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium">Ichimoku Cloud</p>
                    <Badge variant={getIchimokuSignal(indicators.ichimoku).variant as any}>
                      {getIchimokuSignal(indicators.ichimoku).signal}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Tenkan-sen</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.ichimoku.tenkanSen)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kijun-sen</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.ichimoku.kijunSen)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Senkou Span A</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.ichimoku.senkouSpanA)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Senkou Span B</p>
                      <p className="text-sm font-medium">${formatPrice(indicators.ichimoku.senkouSpanB)}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeIndicators.includes("obv") && (
                <div>
                  <div className="mb-1">
                    <p className="text-sm font-medium">On-Balance Volume</p>
                  </div>
                  <p
                    className={`text-center text-sm font-medium ${
                      indicators.obv > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {indicators.obv.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
