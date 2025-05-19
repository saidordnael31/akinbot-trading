import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Em uma aplicação real, você buscaria os sinais de um banco de dados
    // Para este exemplo, retornamos dados simulados

    const signals = [
      {
        id: "sig_1",
        timestamp: new Date().toISOString(),
        symbol: "BTC/USDT",
        direction: "buy",
        confidence: 0.85,
        status: "executed",
        profit: 2.3,
      },
      {
        id: "sig_2",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        symbol: "ETH/USDT",
        direction: "sell",
        confidence: 0.72,
        status: "closed",
        profit: -1.2,
      },
      {
        id: "sig_3",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        symbol: "SOL/USDT",
        direction: "buy",
        confidence: 0.91,
        status: "pending",
      },
    ]

    return NextResponse.json(signals)
  } catch (error) {
    console.error("Erro ao buscar sinais:", error)
    return NextResponse.json({ error: error.message || "Falha ao buscar sinais" }, { status: 500 })
  }
}
