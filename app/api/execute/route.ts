import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { symbol, side, amount, autoClose, timeLimit } = await request.json()

    // Validação de entrada
    if (!symbol || !side || !amount) {
      return NextResponse.json({ error: "Parâmetros obrigatórios ausentes" }, { status: 400 })
    }

    // No ambiente v0.dev, sempre simulamos a execução
    console.log("Simulando execução de ordem")

    // Simula uma resposta de ordem
    const mockOrder = {
      id: `demo_${Date.now()}`,
      symbol,
      side,
      amount: Number.parseFloat(amount.toString()),
      price: side === "buy" ? 40000 : 39900, // Preço simulado
      timestamp: new Date().toISOString(),
      status: "open",
      info: { demo: true },
    }

    // Se auto-close estiver ativado, simula o fechamento após o tempo especificado
    if (autoClose && timeLimit) {
      console.log(`Ordem ${mockOrder.id} será fechada automaticamente após ${timeLimit} minutos`)

      // Em um ambiente de produção, você usaria uma solução mais robusta como uma fila
      // Para este exemplo, apenas logamos a intenção
    }

    return NextResponse.json({ success: true, order: mockOrder })
  } catch (error) {
    console.error("Erro ao executar negociação:", error)
    return NextResponse.json({ error: error.message || "Falha ao executar negociação" }, { status: 500 })
  }
}
