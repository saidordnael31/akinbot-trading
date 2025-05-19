"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowDown, TrendingUp, BarChart2 } from "lucide-react"

interface BacktestMetricsProps {
  visible: boolean
}

export function BacktestMetrics({ visible }: BacktestMetricsProps) {
  if (!visible) return null

  // Dados simulados de métricas
  const metrics = {
    netProfit: 2345.67,
    profitFactor: 1.87,
    winRate: 68.5,
    maxDrawdown: 12.3,
    sharpeRatio: 1.45,
    totalTrades: 47,
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <TrendingUp className="mr-1 h-4 w-4 text-muted-foreground" />
        <span className="text-sm">Win Rate:</span>
        <Badge variant="outline" className="ml-1">
          {metrics.winRate.toFixed(1)}%
        </Badge>
      </div>

      <Separator orientation="vertical" className="h-4" />

      <div className="flex items-center">
        <BarChart2 className="mr-1 h-4 w-4 text-muted-foreground" />
        <span className="text-sm">Profit Factor:</span>
        <Badge variant="outline" className="ml-1">
          {metrics.profitFactor.toFixed(2)}
        </Badge>
      </div>

      <Separator orientation="vertical" className="h-4" />

      <div className="flex items-center">
        <ArrowDown className="mr-1 h-4 w-4 text-red-600" />
        <span className="text-sm">Max DD:</span>
        <Badge variant="outline" className="ml-1">
          {metrics.maxDrawdown.toFixed(1)}%
        </Badge>
      </div>
    </div>
  )
}
