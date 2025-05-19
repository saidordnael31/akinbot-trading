import ccxt from "ccxt"
import type { ExchangeType, TradeSide } from "./types"
import "@/lib/global-config" // Import global config

// Default configuration that doesn't rely on environment variables
const DEFAULT_CONFIG = {
  exchangeType: "binance" as ExchangeType,
  testMode: true,
  isDemoMode: true,
}

// Initialize exchange with API credentials
export function initializeExchange(
  exchangeType: ExchangeType = DEFAULT_CONFIG.exchangeType,
  apiKey?: string,
  apiSecret?: string,
  testMode = DEFAULT_CONFIG.testMode,
) {
  // Use provided credentials or empty strings (for demo/mock mode)
  const key = apiKey || ""
  const secret = apiSecret || ""

  if (exchangeType === "binance") {
    return new ccxt.binanceusdm({
      apiKey: key,
      secret: secret,
      enableRateLimit: true,
      options: {
        testnet: testMode,
      },
    })
  } else if (exchangeType === "exness") {
    return new ccxt.exness({
      apiKey: key,
      secret: secret,
      enableRateLimit: true,
    })
  }

  throw new Error(`Unsupported exchange: ${exchangeType}`)
}

// Get configuration from environment or use defaults
export function getConfig() {
  // Try to get from global variables first, then environment variables, then defaults
  return {
    exchangeType: (global.EXCHANGE_TYPE || process.env.EXCHANGE_TYPE || DEFAULT_CONFIG.exchangeType) as ExchangeType,
    testMode:
      global.EXCHANGE_TEST_MODE === "false" || process.env.EXCHANGE_TEST_MODE === "false"
        ? false
        : DEFAULT_CONFIG.testMode,
    apiKey: global.EXCHANGE_API_KEY || process.env.EXCHANGE_API_KEY || "",
    apiSecret: global.EXCHANGE_API_SECRET || process.env.EXCHANGE_API_SECRET || "",
    isDemoMode:
      (!global.EXCHANGE_API_KEY && !process.env.EXCHANGE_API_KEY) ||
      (!global.EXCHANGE_API_SECRET && !process.env.EXCHANGE_API_SECRET),
  }
}

// Execute a market order
export async function executeMarketOrder(
  exchangeType: ExchangeType = DEFAULT_CONFIG.exchangeType,
  symbol: string,
  side: TradeSide,
  amount: number,
  apiKey?: string,
  apiSecret?: string,
) {
  // Get configuration
  const config = getConfig()

  // Use provided credentials or get from config
  const key = apiKey || config.apiKey
  const secret = apiSecret || config.apiSecret
  const testMode = config.testMode

  // Check if we're in demo mode (no credentials)
  const isDemoMode = !key || !secret

  if (isDemoMode) {
    console.log("Running in DEMO mode - no real trades will be executed")

    // Return a simulated order response
    return {
      id: `demo_${Date.now()}`,
      symbol,
      side,
      amount,
      price: side === "buy" ? 40000 : 39900, // Simulated price
      timestamp: new Date().toISOString(),
      status: "open",
      info: { demo: true },
    }
  }

  const exchange = initializeExchange(exchangeType, key, secret, testMode)

  // Load markets to ensure the symbol is valid
  await exchange.loadMarkets()

  // Check if the symbol exists
  if (!exchange.markets[symbol]) {
    throw new Error(`Symbol ${symbol} not found on ${exchangeType}`)
  }

  // Execute the trade
  return await exchange.createMarketOrder(symbol, side, amount)
}

// Close a position
export async function closePosition(
  exchangeType: ExchangeType = DEFAULT_CONFIG.exchangeType,
  symbol: string,
  side: TradeSide,
  amount: number,
  apiKey?: string,
  apiSecret?: string,
) {
  // The opposite side to close the position
  const closeSide = side === "buy" ? "sell" : "buy"

  return await executeMarketOrder(exchangeType, symbol, closeSide, amount, apiKey, apiSecret)
}

// Get account balance
export async function getAccountBalance(
  exchangeType: ExchangeType = DEFAULT_CONFIG.exchangeType,
  apiKey?: string,
  apiSecret?: string,
) {
  // Get configuration
  const config = getConfig()

  // Use provided credentials or get from config
  const key = apiKey || config.apiKey
  const secret = apiSecret || config.apiSecret
  const testMode = config.testMode

  // Check if we're in demo mode (no credentials)
  const isDemoMode = !key || !secret

  if (isDemoMode) {
    console.log("Running in DEMO mode - returning mock balance")

    // Return a simulated balance
    return {
      info: { demo: true },
      free: {
        BTC: "0.01",
        ETH: "0.5",
        USDT: "1000",
      },
      used: {
        BTC: "0",
        ETH: "0",
        USDT: "0",
      },
      total: {
        BTC: "0.01",
        ETH: "0.5",
        USDT: "1000",
      },
    }
  }

  const exchange = initializeExchange(exchangeType, key, secret, testMode)

  return await exchange.fetchBalance()
}

// Get open positions
export async function getOpenPositions(
  exchangeType: ExchangeType = DEFAULT_CONFIG.exchangeType,
  apiKey?: string,
  apiSecret?: string,
) {
  // Get configuration
  const config = getConfig()

  // Use provided credentials or get from config
  const key = apiKey || config.apiKey
  const secret = apiSecret || config.apiSecret
  const testMode = config.testMode

  // Check if we're in demo mode (no credentials)
  const isDemoMode = !key || !secret

  if (isDemoMode) {
    console.log("Running in DEMO mode - returning mock positions")

    // Return simulated positions
    return [
      {
        symbol: "BTC/USDT",
        side: "buy",
        amount: 0.001,
        entryPrice: 39500,
        markPrice: 40000,
        pnl: 0.5,
        pnlPercentage: 1.27,
        timestamp: new Date().toISOString(),
        info: { demo: true },
      },
      {
        symbol: "ETH/USDT",
        side: "sell",
        amount: 0.01,
        entryPrice: 2200,
        markPrice: 2150,
        pnl: 0.5,
        pnlPercentage: 2.27,
        timestamp: new Date().toISOString(),
        info: { demo: true },
      },
    ]
  }

  const exchange = initializeExchange(exchangeType, key, secret, testMode)

  // Different exchanges have different methods for fetching positions
  if (exchangeType === "binance") {
    const rawPositions = await exchange.fetchPositions()

    // Filter out positions with zero amount
    return rawPositions
      .filter((pos) => Math.abs(Number.parseFloat(pos.info.positionAmt)) > 0)
      .map((pos) => {
        const entryPrice = Number.parseFloat(pos.info.entryPrice)
        const markPrice = Number.parseFloat(pos.info.markPrice)
        const amount = Math.abs(Number.parseFloat(pos.info.positionAmt))
        const side = Number.parseFloat(pos.info.positionAmt) > 0 ? "buy" : "sell"

        // Calculate PnL
        let pnl = 0
        let pnlPercentage = 0

        if (side === "buy") {
          pnl = (markPrice - entryPrice) * amount
          pnlPercentage = ((markPrice - entryPrice) / entryPrice) * 100
        } else {
          pnl = (entryPrice - markPrice) * amount
          pnlPercentage = ((entryPrice - markPrice) / entryPrice) * 100
        }

        return {
          symbol: pos.symbol,
          side,
          amount,
          entryPrice,
          markPrice,
          pnl,
          pnlPercentage,
          timestamp: new Date().toISOString(),
        }
      })
  } else if (exchangeType === "exness") {
    // For Exness, you might need to adapt this based on their API
    const openOrders = await exchange.fetchOpenOrders()

    return openOrders.map((order) => {
      return {
        symbol: order.symbol,
        side: order.side,
        amount: order.amount,
        entryPrice: order.price,
        markPrice: order.price, // This would need to be fetched separately
        pnl: 0, // Would need calculation
        pnlPercentage: 0,
        timestamp: order.datetime,
      }
    })
  }

  throw new Error(`Unsupported exchange for positions: ${exchangeType}`)
}
