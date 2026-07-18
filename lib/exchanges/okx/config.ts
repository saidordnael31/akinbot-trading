import { timingSafeEqual } from "node:crypto"
import type {
  OkxClientConfig,
  OkxCredentials,
  OkxMode,
  OkxTradingSafetyConfig,
} from "./types"

const DEFAULT_TIMEOUT_MS = 10_000
const DEFAULT_MAX_ORDER_NOTIONAL_USDT = 25
const DEFAULT_MAX_LIMIT_DEVIATION_BPS = 500
const DEFAULT_CANCEL_ALL_AFTER_SECONDS = 30
const DEFAULT_ALLOWED_INSTRUMENTS = ["BTC-USDT", "ETH-USDT"]

const ALLOWED_BASE_URLS = new Set([
  "https://www.okx.com",
  "https://eea.okx.com",
])

function normalizeBaseUrl(value: string | undefined): string {
  const normalized = (value || "https://eea.okx.com").trim().replace(/\/+$/, "")

  if (!ALLOWED_BASE_URLS.has(normalized)) {
    throw new Error("OKX_BASE_URL is not in the approved host allowlist")
  }

  return normalized
}

function getMode(value: string | undefined): OkxMode {
  if (!value || value === "demo") {
    return "demo"
  }

  if (value === "production") {
    return "production"
  }

  throw new Error("OKX_MODE must be either demo or production")
}

function optionalCredentials(): OkxCredentials | undefined {
  const apiKey = process.env.OKX_API_KEY?.trim()
  const apiSecret = process.env.OKX_API_SECRET?.trim()
  const passphrase = process.env.OKX_API_PASSPHRASE?.trim()

  const configuredValues = [apiKey, apiSecret, passphrase].filter(Boolean).length

  if (configuredValues === 0) {
    return undefined
  }

  if (configuredValues !== 3 || !apiKey || !apiSecret || !passphrase) {
    throw new Error("OKX credentials are incomplete; key, secret and passphrase are all required")
  }

  return { apiKey, apiSecret, passphrase }
}

function parsePositiveNumber(value: string | undefined, fallback: number, name: string): number {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive number`)
  }

  return parsed
}

function parseCancelAllAfterSeconds(value: string | undefined): number {
  const parsed = Math.trunc(
    parsePositiveNumber(value, DEFAULT_CANCEL_ALL_AFTER_SECONDS, "OKX_CANCEL_ALL_AFTER_SECONDS"),
  )

  if (parsed < 10 || parsed > 120) {
    throw new Error("OKX_CANCEL_ALL_AFTER_SECONDS must be between 10 and 120")
  }

  return parsed
}

function parseAllowedInstruments(value: string | undefined): string[] {
  const instruments = (value || DEFAULT_ALLOWED_INSTRUMENTS.join(","))
    .split(",")
    .map((instrument) => instrument.trim().toUpperCase())
    .filter(Boolean)

  if (instruments.length === 0) {
    throw new Error("OKX_ALLOWED_INSTRUMENTS cannot be empty")
  }

  return [...new Set(instruments)]
}

export function getOkxClientConfig(): OkxClientConfig {
  const mode = getMode(process.env.OKX_MODE)

  // Production writes remain blocked. This connector is intentionally limited
  // to OKX Demo Trading until the institutional risk stack is validated.
  if (mode !== "demo") {
    throw new Error("OKX production mode is blocked")
  }

  return {
    baseUrl: normalizeBaseUrl(process.env.OKX_BASE_URL),
    mode,
    credentials: optionalCredentials(),
    requestTimeoutMs: DEFAULT_TIMEOUT_MS,
  }
}

export function getOkxTradingSafetyConfig(): OkxTradingSafetyConfig {
  return {
    orderWritesEnabled: process.env.OKX_ENABLE_ORDER_WRITES === "true",
    // Default-on kill switch: trading must be explicitly unlocked.
    killSwitchActive: process.env.OKX_TRADING_KILL_SWITCH !== "false",
    internalOrderToken: process.env.OKX_INTERNAL_ORDER_TOKEN?.trim() || undefined,
    allowedInstruments: parseAllowedInstruments(process.env.OKX_ALLOWED_INSTRUMENTS),
    maxOrderNotionalUsdt: parsePositiveNumber(
      process.env.OKX_MAX_ORDER_NOTIONAL_USDT,
      DEFAULT_MAX_ORDER_NOTIONAL_USDT,
      "OKX_MAX_ORDER_NOTIONAL_USDT",
    ),
    maxLimitDeviationBps: parsePositiveNumber(
      process.env.OKX_MAX_LIMIT_DEVIATION_BPS,
      DEFAULT_MAX_LIMIT_DEVIATION_BPS,
      "OKX_MAX_LIMIT_DEVIATION_BPS",
    ),
    cancelAllAfterSeconds: parseCancelAllAfterSeconds(process.env.OKX_CANCEL_ALL_AFTER_SECONDS),
  }
}

export function areOkxPrivateReadsEnabled(): boolean {
  return process.env.OKX_ENABLE_PRIVATE_READS !== "false"
}

export function areOkxOrderWritesEnabled(): boolean {
  return getOkxTradingSafetyConfig().orderWritesEnabled
}

export function assertOkxDemoWritesAllowed(): void {
  const clientConfig = getOkxClientConfig()
  const safetyConfig = getOkxTradingSafetyConfig()

  if (clientConfig.mode !== "demo") {
    throw new Error("OKX order writes are restricted to demo mode")
  }

  if (!clientConfig.credentials) {
    throw new Error("OKX demo credentials are not configured")
  }

  if (!safetyConfig.orderWritesEnabled) {
    throw new Error("OKX order writes are disabled")
  }

  if (safetyConfig.killSwitchActive) {
    throw new Error("OKX trading kill switch is active")
  }

  if (!safetyConfig.internalOrderToken) {
    throw new Error("OKX_INTERNAL_ORDER_TOKEN is not configured")
  }
}

export function verifyInternalOrderToken(providedToken: string | null): boolean {
  const expectedToken = getOkxTradingSafetyConfig().internalOrderToken

  if (!expectedToken || !providedToken) {
    return false
  }

  const expected = Buffer.from(expectedToken)
  const provided = Buffer.from(providedToken)

  return expected.length === provided.length && timingSafeEqual(expected, provided)
}
