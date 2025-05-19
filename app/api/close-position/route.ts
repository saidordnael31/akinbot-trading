import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { symbol, side, amount } = await request.json()

    // Validação de entrada
    if (!symbol || !side || !amount) {
      return NextResponse.json({ error: "Parâmetros obrigatórios ausentes" }, { status: 400 })
    }

    // No ambiente v0.dev, sempre simulamos o fechamento da posição
    console.log("Simulando fechamento de posição")

    // Simula uma resposta de fechamento
    const mockResult = {
      id: `close_${Date.now()}`,
      symbol,
      side: side === "buy" ? "sell" : "buy", // Lado oposto para fechar
      amount: Number.parseFloat(amount.toString()),
      price: side === "buy" ? 40100 : 39800, // Preço simulado
      timestamp: new Date().toISOString(),
      status: "closed",
      info: { demo: true },
    }

    return NextResponse.json({ success: true, result: mockResult })
  } catch (error) {
    console.error("Erro ao fechar posição:", error)
    return NextResponse.json({ error: error.message || "Falha ao fechar posição" }, { status: 500 })
  }
}
