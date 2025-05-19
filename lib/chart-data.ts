// Função para gerar dados de candlestick simulados
export function generateCandlestickData(symbol: string, timeframe: string) {
  // Definir preço base e volatilidade para diferentes símbolos
  let basePrice = 0
  let volatility = 0

  switch (symbol) {
    case "BTC/USDT":
      basePrice = 50000
      volatility = 0.02 // 2%
      break
    case "ETH/USDT":
      basePrice = 3000
      volatility = 0.025 // 2.5%
      break
    case "SOL/USDT":
      basePrice = 100
      volatility = 0.03 // 3%
      break
    case "XRP/USDT":
      basePrice = 0.5
      volatility = 0.02 // 2%
      break
    case "ADA/USDT":
      basePrice = 0.4
      volatility = 0.025 // 2.5%
      break
    case "DOGE/USDT":
      basePrice = 0.1
      volatility = 0.035 // 3.5%
      break
    case "DOT/USDT":
      basePrice = 6
      volatility = 0.03 // 3%
      break
    case "AVAX/USDT":
      basePrice = 30
      volatility = 0.028 // 2.8%
      break
    default:
      basePrice = 100
      volatility = 0.02 // 2%
  }

  // Ajustar volatilidade com base no timeframe
  switch (timeframe) {
    case "1m":
      volatility *= 0.3
      break
    case "5m":
      volatility *= 0.5
      break
    case "15m":
      volatility *= 0.7
      break
    case "30m":
      volatility *= 0.8
      break
    case "1h":
      volatility *= 1
      break
    case "4h":
      volatility *= 1.5
      break
    case "1d":
      volatility *= 2
      break
    case "1w":
      volatility *= 3
      break
    default:
      volatility *= 1
  }

  // Gerar dados de candlestick
  const candleData = []
  const volumeData = []
  let currentPrice = basePrice
  let trend = 0 // -1 para baixa, 0 para lateral, 1 para alta
  let trendDuration = 0
  let maxTrendDuration = Math.floor(Math.random() * 20) + 10

  // Gerar 500 candles
  const now = new Date()
  let currentTime = now.getTime()

  // Ajustar intervalo de tempo com base no timeframe
  let timeInterval = 60 * 60 * 1000 // 1 hora em milissegundos (padrão)
  switch (timeframe) {
    case "1m":
      timeInterval = 60 * 1000
      break
    case "5m":
      timeInterval = 5 * 60 * 1000
      break
    case "15m":
      timeInterval = 15 * 60 * 1000
      break
    case "30m":
      timeInterval = 30 * 60 * 1000
      break
    case "1h":
      timeInterval = 60 * 60 * 1000
      break
    case "4h":
      timeInterval = 4 * 60 * 60 * 1000
      break
    case "1d":
      timeInterval = 24 * 60 * 60 * 1000
      break
    case "1w":
      timeInterval = 7 * 24 * 60 * 60 * 1000
      break
  }

  // Começar a partir de 500 intervalos atrás
  currentTime -= timeInterval * 500

  for (let i = 0; i < 500; i++) {
    // Atualizar tendência
    trendDuration++
    if (trendDuration >= maxTrendDuration) {
      trend = Math.floor(Math.random() * 3) - 1 // -1, 0, ou 1
      trendDuration = 0
      maxTrendDuration = Math.floor(Math.random() * 20) + 10
    }

    // Calcular variação de preço com base na tendência
    let priceChange = (Math.random() * 2 - 1) * volatility * currentPrice
    if (trend === 1) {
      priceChange = Math.abs(priceChange) * 0.8 + Math.random() * volatility * currentPrice * 0.2
    } else if (trend === -1) {
      priceChange = -Math.abs(priceChange) * 0.8 - Math.random() * volatility * currentPrice * 0.2
    }

    // Calcular preços
    const open = currentPrice
    const close = open + priceChange
    const high = Math.max(open, close) + Math.random() * volatility * currentPrice * 0.5
    const low = Math.min(open, close) - Math.random() * volatility * currentPrice * 0.5
    const volume = basePrice * 1000 * (0.5 + Math.random() * 1.5)

    // Adicionar candle
    candleData.push({
      time: Math.floor(currentTime / 1000),
      open,
      high,
      low,
      close,
    })

    // Adicionar volume
    volumeData.push({
      time: Math.floor(currentTime / 1000),
      value: volume,
      color: close >= open ? "rgba(38, 166, 154, 0.5)" : "rgba(239, 83, 80, 0.5)",
    })

    // Atualizar preço atual
    currentPrice = close
    currentTime += timeInterval
  }

  return { candleData, volumeData }
}
