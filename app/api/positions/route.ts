import { NextResponse } from "next/server"

export async function GET() {
  try {
    // No ambiente v0.dev, sempre retornamos posições simuladas
    console.log("Retornando posições simuladas")

    // Retorna posições simuladas
    return NextResponse.json([
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
    ])
  } catch (error) {
    console.error("Erro ao buscar posições:", error)
    return NextResponse.json({ error: error.message || "Falha ao buscar posições" }, { status: 500 })
  }
}
