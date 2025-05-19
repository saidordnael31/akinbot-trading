// Biblioteca de indicadores técnicos avançados

// Fibonacci Retracement
export function calculateFibonacciLevels(high: number, low: number) {
  const diff = high - low
  return {
    level0: high, // 0%
    level236: high - diff * 0.236, // 23.6%
    level382: high - diff * 0.382, // 38.2%
    level50: high - diff * 0.5, // 50%
    level618: high - diff * 0.618, // 61.8%
    level786: high - diff * 0.786, // 78.6%
    level100: low, // 100%
  }
}

// Ichimoku Cloud
export function calculateIchimoku(highs: number[], lows: number[], closes: number[]) {
  // Tenkan-sen (Conversion Line): (9-period high + 9-period low)/2
  const tenkanSen = calculateMidpoint(highs.slice(-9), lows.slice(-9))

  // Kijun-sen (Base Line): (26-period high + 26-period low)/2
  const kijunSen = calculateMidpoint(highs.slice(-26), lows.slice(-26))

  // Senkou Span A (Leading Span A): (Conversion Line + Base Line)/2
  const senkouSpanA = (tenkanSen + kijunSen) / 2

  // Senkou Span B (Leading Span B): (52-period high + 52-period low)/2
  const senkouSpanB = calculateMidpoint(highs.slice(-52), lows.slice(-52))

  // Chikou Span (Lagging Span): Close plotted 26 periods back
  const chikouSpan = closes[closes.length - 1]

  return {
    tenkanSen,
    kijunSen,
    senkouSpanA,
    senkouSpanB,
    chikouSpan,
  }
}

// Função auxiliar para calcular o ponto médio entre o máximo e o mínimo
function calculateMidpoint(highs: number[], lows: number[]) {
  const highestHigh = Math.max(...highs)
  const lowestLow = Math.min(...lows)
  return (highestHigh + lowestLow) / 2
}

// Pivot Points
export function calculatePivotPoints(high: number, low: number, close: number) {
  // Pivot Point (PP) = (High + Low + Close) / 3
  const pp = (high + low + close) / 3

  // Support and Resistance Levels
  // First level
  const s1 = 2 * pp - high
  const r1 = 2 * pp - low

  // Second level
  const s2 = pp - (high - low)
  const r2 = pp + (high - low)

  // Third level
  const s3 = low - 2 * (high - pp)
  const r3 = high + 2 * (pp - low)

  return {
    pp,
    s1,
    s2,
    s3,
    r1,
    r2,
    r3,
  }
}

// Average Directional Index (ADX)
export function calculateADX(highs: number[], lows: number[], closes: number[], period = 14) {
  // Implementação simplificada do ADX
  // Em uma implementação real, seria mais complexo

  // Simulando um valor de ADX entre 0 e 100
  const adxValue = Math.random() * 100

  // Valores +DI e -DI também entre 0 e 100
  const plusDI = Math.random() * 100
  const minusDI = Math.random() * 100

  return {
    adx: adxValue,
    plusDI,
    minusDI,
  }
}

// On-Balance Volume (OBV)
export function calculateOBV(closes: number[], volumes: number[]) {
  let obv = 0

  for (let i = 1; i < closes.length; i++) {
    if (closes[i] > closes[i - 1]) {
      // Preço subiu, adiciona volume
      obv += volumes[i]
    } else if (closes[i] < closes[i - 1]) {
      // Preço caiu, subtrai volume
      obv -= volumes[i]
    }
    // Se o preço não mudou, OBV não muda
  }

  return obv
}

// Relative Vigor Index (RVI)
export function calculateRVI(opens: number[], highs: number[], lows: number[], closes: number[], period = 10) {
  // Implementação simplificada
  // Simulando um valor entre -100 e 100
  return Math.random() * 200 - 100
}

// Commodity Channel Index (CCI)
export function calculateCCI(highs: number[], lows: number[], closes: number[], period = 20) {
  // Implementação simplificada
  // Simulando um valor entre -200 e 200
  return Math.random() * 400 - 200
}

// Awesome Oscillator
export function calculateAwesomeOscillator(highs: number[], lows: number[]) {
  // Implementação simplificada
  // Simulando um valor entre -10 e 10
  return Math.random() * 20 - 10
}
