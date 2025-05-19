import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { exchange, apiKey, apiSecret, testMode } = await request.json()

    // Validação de entrada
    if (!exchange) {
      return NextResponse.json({ error: "Parâmetro de exchange ausente" }, { status: 400 })
    }

    // No ambiente v0.dev, sempre simulamos a conexão
    console.log("Simulando conexão com a exchange")

    // Simula uma resposta de saldo
    const mockBalance = {
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

    // Armazena as credenciais globalmente (apenas para simulação)
    if (apiKey && apiSecret) {
      console.log("Credenciais armazenadas para simulação")
    }

    return NextResponse.json({ success: true, balance: mockBalance })
  } catch (error) {
    console.error("Erro ao testar conexão:", error)
    return NextResponse.json({ error: error.message || "Falha ao conectar à exchange" }, { status: 500 })
  }
}
