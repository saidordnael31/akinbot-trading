import type { OkxClientConfig, OkxCredentials, OkxMode } from "./types"

const DEFAULT_TIMEOUT_MS = 10_000
const ALLOWED_BASE_URLS = new Set([
  "https://www.okx.com",
  "https://eea.okx.com",
])

function normalizeBaseUrl(value: string | undefined): string {
  const normalized = (value || "https://www.okx.com").trim().replace(/\/+$/, "")

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

export function getOkxClientConfig(): OkxClientConfig {
  const mode = getMode(process.env.OKX_MODE)

  // The recovery branch is restricted to OKX demo trading. Production access
  // remains blocked until risk controls, credential isolation and approvals exist.
  if (mode !== "demo") {
    throw new Error("OKX production mode is blocked during the recovery phase")
  }

  return {
    baseUrl: normalizeBaseUrl(process.env.OKX_BASE_URL),
    mode,
    credentials: optionalCredentials(),
    requestTimeoutMs: DEFAULT_TIMEOUT_MS,
  }
}

export function areOkxPrivateReadsEnabled(): boolean {
  return process.env.OKX_ENABLE_PRIVATE_READS !== "false"
}

export function areOkxOrderWritesEnabled(): boolean {
  // This flag is deliberately insufficient on its own. The current OKX client
  // does not expose any order-write method.
  return process.env.OKX_ENABLE_ORDER_WRITES === "true"
}
