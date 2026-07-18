import { createHash } from "node:crypto"
import type { OkxRestClient } from "./client"
import type {
  OkxDemoOrderInput,
  OkxOrderSide,
  OkxTradingSafetyConfig,
  OkxValidatedDemoOrder,
} from "./types"

export class OkxRiskError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly httpStatus = 400,
  ) {
    super(message)
    this.name = "OkxRiskError"
  }
}

function readString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new OkxRiskError(`${field} is required`, "INVALID_ORDER_INPUT")
  }

  return value.trim()
}

function readIdentifier(value: unknown, field: string): string {
  const identifier = readString(value, field)

  if (!/^[A-Za-z0-9_-]{3,64}$/.test(identifier)) {
    throw new OkxRiskError(
      `${field} must contain 3-64 letters, numbers, underscores or hyphens`,
      "INVALID_EXECUTION_CONTEXT",
    )
  }

  return identifier
}

function parseSide(value: unknown): OkxOrderSide {
  if (value === "buy" || value === "sell") {
    return value
  }

  throw new OkxRiskError("side must be buy or sell", "INVALID_ORDER_SIDE")
}

function assertDecimal(value: string, field: string): void {
  if (!/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value) || Number(value) <= 0) {
    throw new OkxRiskError(`${field} must be a positive decimal string`, "INVALID_DECIMAL")
  }
}

function decimalPlaces(value: string): number {
  return value.includes(".") ? value.split(".")[1].length : 0
}

function toScaledInteger(value: string, scale: number): bigint {
  const [whole, fraction = ""] = value.split(".")
  return BigInt(`${whole}${fraction.padEnd(scale, "0")}`)
}

function isAligned(value: string, step: string): boolean {
  const scale = Math.max(decimalPlaces(value), decimalPlaces(step))
  const valueUnits = toScaledInteger(value, scale)
  const stepUnits = toScaledInteger(step, scale)

  return stepUnits > 0n && valueUnits % stepUnits === 0n
}

function createClientOrderId(requestId: string): string {
  const digest = createHash("sha256").update(requestId).digest("hex")
  return `akin${digest.slice(0, 28)}`
}

export function parseOkxDemoOrderInput(payload: unknown): OkxDemoOrderInput {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new OkxRiskError("Order payload must be an object", "INVALID_ORDER_INPUT")
  }

  const record = payload as Record<string, unknown>
  const requestId = readString(record.requestId, "requestId")

  if (!/^[A-Za-z0-9_-]{8,64}$/.test(requestId)) {
    throw new OkxRiskError(
      "requestId must contain 8-64 letters, numbers, underscores or hyphens",
      "INVALID_REQUEST_ID",
    )
  }

  const instId = readString(record.instId, "instId").toUpperCase()
  const price = readString(record.price, "price")
  const size = readString(record.size, "size")

  assertDecimal(price, "price")
  assertDecimal(size, "size")

  return {
    requestId,
    capitalCellId: readIdentifier(record.capitalCellId, "capitalCellId"),
    riskCellId: readIdentifier(record.riskCellId, "riskCellId"),
    strategyId: readIdentifier(record.strategyId, "strategyId"),
    instId,
    side: parseSide(record.side),
    price,
    size,
  }
}

export async function validateOkxDemoOrder(
  input: OkxDemoOrderInput,
  client: OkxRestClient,
  safety: OkxTradingSafetyConfig,
): Promise<OkxValidatedDemoOrder> {
  if (input.capitalCellId !== safety.allowedCapitalCellId) {
    throw new OkxRiskError(
      "Capital Cell is not authorized for the OKX demo connector",
      "CAPITAL_CELL_NOT_ALLOWED",
      403,
    )
  }

  if (input.riskCellId !== safety.allowedRiskCellId) {
    throw new OkxRiskError(
      "Risk Cell is not authorized for the OKX demo connector",
      "RISK_CELL_NOT_ALLOWED",
      403,
    )
  }

  if (!safety.allowedInstruments.includes(input.instId)) {
    throw new OkxRiskError("Instrument is not in the OKX demo allowlist", "INSTRUMENT_NOT_ALLOWED", 403)
  }

  const [instruments, tickers] = await Promise.all([
    client.getInstruments("SPOT", input.instId),
    client.getTicker(input.instId),
  ])

  const instrument = instruments[0]
  const ticker = tickers[0]

  if (!instrument || instrument.instId !== input.instId) {
    throw new OkxRiskError("Instrument was not found on OKX", "INSTRUMENT_NOT_FOUND", 404)
  }

  if (instrument.state !== "live") {
    throw new OkxRiskError("Instrument is not in live trading state", "INSTRUMENT_NOT_LIVE")
  }

  if (instrument.instType !== "SPOT" || instrument.quoteCcy !== "USDT") {
    throw new OkxRiskError(
      "Initial OKX demo execution supports only USDT-quoted spot instruments",
      "UNSUPPORTED_INSTRUMENT",
    )
  }

  if (!isAligned(input.price, instrument.tickSz)) {
    throw new OkxRiskError(`price must align with tick size ${instrument.tickSz}`, "INVALID_TICK_SIZE")
  }

  if (!isAligned(input.size, instrument.lotSz)) {
    throw new OkxRiskError(`size must align with lot size ${instrument.lotSz}`, "INVALID_LOT_SIZE")
  }

  if (Number(input.size) < Number(instrument.minSz)) {
    throw new OkxRiskError(`size must be at least ${instrument.minSz}`, "SIZE_BELOW_MINIMUM")
  }

  const lastPrice = Number(ticker?.last)
  const price = Number(input.price)
  const size = Number(input.size)

  if (!Number.isFinite(lastPrice) || lastPrice <= 0) {
    throw new OkxRiskError("OKX ticker did not return a valid last price", "INVALID_MARKET_PRICE", 502)
  }

  const notionalUsdt = price * size

  if (!Number.isFinite(notionalUsdt) || notionalUsdt <= 0) {
    throw new OkxRiskError("Order notional is invalid", "INVALID_NOTIONAL")
  }

  if (notionalUsdt > safety.maxOrderNotionalUsdt) {
    throw new OkxRiskError(
      `Order notional exceeds the configured USDT ${safety.maxOrderNotionalUsdt} limit`,
      "ORDER_NOTIONAL_LIMIT",
      403,
    )
  }

  const deviationBps = Math.abs(price - lastPrice) / lastPrice * 10_000

  if (deviationBps > safety.maxLimitDeviationBps) {
    throw new OkxRiskError(
      `Limit price exceeds the configured ${safety.maxLimitDeviationBps} bps deviation`,
      "LIMIT_PRICE_DEVIATION",
      403,
    )
  }

  return {
    request: {
      instId: input.instId,
      tdMode: "cash",
      side: input.side,
      ordType: "limit",
      sz: input.size,
      px: input.price,
      clOrdId: createClientOrderId(input.requestId),
      tag: "AKINDEMO",
    },
    executionContext: {
      capitalCellId: input.capitalCellId,
      riskCellId: input.riskCellId,
      strategyId: input.strategyId,
    },
    lastPrice,
    notionalUsdt,
    deviationBps,
    tickSize: instrument.tickSz,
    lotSize: instrument.lotSz,
    minSize: instrument.minSz,
  }
}
