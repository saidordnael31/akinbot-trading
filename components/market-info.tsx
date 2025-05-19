"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Clock, BarChart2, TrendingUp, DollarSign } from "lucide-react"

interface MarketInfoProps {
  symbol: string
}

export function MarketInfo({ symbol }: MarketInfoProps) {
  const [marketData, setMarketData] = useState({
    price: 0,
    change: 0,
    changePercent: 0,
    high: 0,
    low: 0,
    volume: 0,
    marketCap: 0,
    lastUpdate: "",
  })

  useEffect(() => {
    // Simular dados de mercado
    const generateMarketData = () => {
      let basePrice = 0
      let baseVolume = 0
      let baseMarketCap = 0

      // Definir preços base para diferentes símbolos
      switch (symbol) {
        case "BTC/USDT":
          basePrice = 50000 + Math.random() * 5000
          baseVolume = 15000000000
          baseMarketCap = 950000000000
          break
        case "ETH/USDT":
          basePrice = 3000 + Math.random() * 300
          baseVolume = 8000000000
          baseMarketCap = 350000000000
          break
        case "SOL/USDT":
          basePrice = 100 + Math.random() * 20
          baseVolume = 2000000000
          baseMarketCap = 40000000000
          break
        case "XRP/USDT":
          basePrice = 0.5 + Math.random() * 0.1
          baseVolume = 1500000000
          baseMarketCap = 25000000000
          break
        case "ADA/USDT":
          basePrice = 0.4 + Math.random() * 0.1
          baseVolume = 1000000000
          baseMarketCap = 15000000000
          break
        case "DOGE/USDT":
          basePrice = 0.1 + Math.random() * 0.02
          baseVolume = 800000000
          baseMarketCap = 12000000000
          break
        case "DOT/USDT":
          basePrice = 6 + Math.random() * 1
          baseVolume = 500000000
          baseMarketCap = 8000000000
          break
        case "AVAX/USDT":
          basePrice = 30 + Math.random() * 5
          baseVolume = 400000000
          baseMarketCap = 10000000000
          break
        default:
          basePrice = 100 + Math.random() * 10
          baseVolume = 1000000000
          baseMarketCap = 20000000000
      }

      const change = (Math.random() * 10 - 5) * (basePrice * 0.01)
      const changePercent = (change / basePrice) * 100
      const high = basePrice + Math.abs(change) * 1.5
      const low = basePrice - Math.abs(change) * 1.5
      const volume = baseVolume * (0.8 + Math.random() * 0.4)
      const marketCap = baseMarketCap * (0.95 + Math.random() * 0.1)

      return {
        price: basePrice,
        change,
        changePercent,
        high,
        low,
        volume,
        marketCap,
        lastUpdate: new Date().toLocaleTimeString(),
      }
    }

    // Atualizar dados iniciais
    setMarketData(generateMarketData())

    // Atualizar dados a cada 5 segundos
    const interval = setInterval(() => {
      setMarketData((prev) => {
        const newData = generateMarketData()
        // Manter a tendência anterior com alguma variação
        const trendFactor = 0.7 // 70% da tendência anterior
        newData.change = prev.change * trendFactor + newData.change * (1 - trendFactor)
        newData.changePercent = (newData.change / newData.price) * 100
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [symbol])

  // Formatar números grandes
  const formatNumber = (num: number, digits = 2) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(digits) + "B"
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(digits) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(digits) + "K"
    }
    return num.toFixed(digits)
  }

  // Formatar preço com precisão adequada
  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(6)
    if (price < 1) return price.toFixed(4)
    if (price < 10) return price.toFixed(3)
    if (price < 1000) return price.toFixed(2)
    return price.toFixed(0)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Informações de Mercado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">${formatPrice(marketData.price)}</p>
            <div className="flex items-center space-x-2">
              <Badge variant={marketData.change >= 0 ? "default" : "destructive"} className="font-medium">
                {marketData.change >= 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {marketData.change >= 0 ? "+" : ""}
                {marketData.changePercent.toFixed(2)}%
              </Badge>
              <span className="text-xs text-muted-foreground">24h</span>
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            Atualizado: {marketData.lastUpdate}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3" />
              Máxima 24h
            </p>
            <p className="text-sm font-medium">${formatPrice(marketData.high)}</p>
          </div>
          <div>
            <p className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 rotate-180" />
              Mínima 24h
            </p>
            <p className="text-sm font-medium">${formatPrice(marketData.low)}</p>
          </div>
          <div>
            <p className="flex items-center text-xs text-muted-foreground">
              <BarChart2 className="mr-1 h-3 w-3" />
              Volume 24h
            </p>
            <p className="text-sm font-medium">${formatNumber(marketData.volume)}</p>
          </div>
          <div>
            <p className="flex items-center text-xs text-muted-foreground">
              <DollarSign className="mr-1 h-3 w-3" />
              Cap. de Mercado
            </p>
            <p className="text-sm font-medium">${formatNumber(marketData.marketCap)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
