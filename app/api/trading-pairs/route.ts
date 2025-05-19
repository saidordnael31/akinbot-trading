import { NextResponse } from "next/server"
import { initializeExchange, getConfig } from "@/lib/trading"

export async function GET() {
  try {
    const config = getConfig()

    // Check if we're in demo mode (no credentials)
    if (config.isDemoMode) {
      console.log("Running in DEMO mode - returning mock trading pairs")

      // Return simulated trading pairs
      return NextResponse.json([
        { symbol: "BTC/USDT", base: "BTC", quote: "USDT" },
        { symbol: "ETH/USDT", base: "ETH", quote: "USDT" },
        { symbol: "SOL/USDT", base: "SOL", quote: "USDT" },
        { symbol: "XRP/USDT", base: "XRP", quote: "USDT" },
        { symbol: "ADA/USDT", base: "ADA", quote: "USDT" },
        { symbol: "DOGE/USDT", base: "DOGE", quote: "USDT" },
        { symbol: "DOT/USDT", base: "DOT", quote: "USDT" },
        { symbol: "AVAX/USDT", base: "AVAX", quote: "USDT" },
      ])
    }

    const exchange = initializeExchange(config.exchangeType, config.apiKey, config.apiSecret, config.testMode)

    // Load markets
    await exchange.loadMarkets()

    // Filter for USDT pairs only and format them
    const pairs = Object.keys(exchange.markets)
      .filter((symbol) => symbol.endsWith("/USDT"))
      .map((symbol) => ({
        symbol,
        base: exchange.markets[symbol].base,
        quote: exchange.markets[symbol].quote,
        precision: exchange.markets[symbol].precision,
        limits: exchange.markets[symbol].limits,
      }))

    return NextResponse.json(pairs)
  } catch (error) {
    console.error("Error fetching trading pairs:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch trading pairs" }, { status: 500 })
  }
}
