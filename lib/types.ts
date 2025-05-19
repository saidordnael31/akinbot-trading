// Trading types
export type TradeSide = "buy" | "sell"

export type TradeStatus = "open" | "closed" | "cancelled" | "pending"

export type Trade = {
  id: string
  symbol: string
  side: TradeSide
  amount: number
  entryPrice: number
  exitPrice?: number
  timestamp: string
  closeTimestamp?: string
  status: TradeStatus
  profit?: number
  signalId?: string
}

// Signal types
export type SignalStatus = "pending" | "executed" | "closed" | "cancelled"

export type Signal = {
  id: string
  timestamp: string
  symbol: string
  timeframe?: string
  direction: TradeSide
  confidence: number
  currentPrice?: number
  priceTarget?: number
  stopLoss?: number
  reasoning?: string
  status: SignalStatus
  profit?: number
}

// Exchange API types
export type ExchangeType = "binance" | "exness"

export type ApiKeyConfig = {
  exchange: ExchangeType
  apiKey: string
  apiSecret: string
  testMode: boolean
}
