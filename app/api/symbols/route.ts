import { NextResponse } from "next/server"

// Lista de pares de negociação simulados
const MOCK_TRADING_PAIRS = [
  "BTC/USDT",
  "ETH/USDT",
  "SOL/USDT",
  "XRP/USDT",
  "ADA/USDT",
  "DOGE/USDT",
  "DOT/USDT",
  "AVAX/USDT",
  "MATIC/USDT",
  "LINK/USDT",
  "UNI/USDT",
  "ATOM/USDT",
  "LTC/USDT",
  "BCH/USDT",
  "ALGO/USDT",
  "NEAR/USDT",
  "FTM/USDT",
  "SAND/USDT",
  "MANA/USDT",
  "AAVE/USDT",
]

export async function GET() {
  try {
    // No ambiente v0.dev, vamos sempre retornar pares simulados
    // Em um ambiente de produção, você usaria CCXT para buscar pares reais
    console.log("Retornando pares de negociação simulados")

    return NextResponse.json(MOCK_TRADING_PAIRS)
  } catch (error) {
    console.error("Erro ao buscar pares de negociação:", error)

    // Garantir que sempre retornamos JSON válido, mesmo em caso de erro
    return NextResponse.json({ error: "Falha ao buscar pares de negociação" }, { status: 500 })
  }
}
