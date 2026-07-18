import { createHmac } from "node:crypto"
import type {
  OkxAccountBalance,
  OkxAccountConfig,
  OkxClientConfig,
  OkxEnvelope,
  OkxHttpMethod,
  OkxInstrument,
  OkxInstrumentType,
  OkxServerTime,
} from "./types"

interface RequestOptions {
  method?: OkxHttpMethod
  path: string
  query?: Record<string, string | number | boolean | undefined>
  body?: unknown
  authenticated?: boolean
}

export class OkxApiError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly httpStatus?: number,
  ) {
    super(message)
    this.name = "OkxApiError"
  }
}

function buildRequestPath(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): string {
  if (!path.startsWith("/api/v5/")) {
    throw new Error("OKX request path must use the /api/v5 namespace")
  }

  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(query || {})) {
    if (value !== undefined) {
      params.set(key, String(value))
    }
  }

  const queryString = params.toString()
  return queryString ? `${path}?${queryString}` : path
}

export class OkxRestClient {
  constructor(private readonly config: OkxClientConfig) {}

  private sign(timestamp: string, method: OkxHttpMethod, requestPath: string, body: string): string {
    const credentials = this.config.credentials

    if (!credentials) {
      throw new OkxApiError("OKX credentials are not configured", "CREDENTIALS_NOT_CONFIGURED")
    }

    const prehash = `${timestamp}${method}${requestPath}${body}`

    return createHmac("sha256", credentials.apiSecret)
      .update(prehash)
      .digest("base64")
  }

  private async request<T>(options: RequestOptions): Promise<T> {
    const method = options.method || "GET"
    const requestPath = buildRequestPath(options.path, options.query)
    const body = options.body === undefined ? "" : JSON.stringify(options.body)
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    }

    if (this.config.mode === "demo") {
      headers["x-simulated-trading"] = "1"
    }

    if (options.authenticated) {
      const credentials = this.config.credentials

      if (!credentials) {
        throw new OkxApiError("OKX credentials are not configured", "CREDENTIALS_NOT_CONFIGURED")
      }

      const timestamp = new Date().toISOString()
      headers["OK-ACCESS-KEY"] = credentials.apiKey
      headers["OK-ACCESS-PASSPHRASE"] = credentials.passphrase
      headers["OK-ACCESS-TIMESTAMP"] = timestamp
      headers["OK-ACCESS-SIGN"] = this.sign(timestamp, method, requestPath, body)
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.config.requestTimeoutMs)

    try {
      const response = await fetch(`${this.config.baseUrl}${requestPath}`, {
        method,
        headers,
        body: method === "POST" ? body : undefined,
        cache: "no-store",
        signal: controller.signal,
      })

      const rawPayload = await response.text()
      let payload: OkxEnvelope<T>

      try {
        payload = JSON.parse(rawPayload) as OkxEnvelope<T>
      } catch {
        throw new OkxApiError("OKX returned a non-JSON response", "INVALID_RESPONSE", response.status)
      }

      if (!response.ok || payload.code !== "0") {
        throw new OkxApiError(
          payload.msg || "OKX API request failed",
          payload.code || "HTTP_ERROR",
          response.status,
        )
      }

      return payload.data
    } catch (error) {
      if (error instanceof OkxApiError) {
        throw error
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new OkxApiError("OKX request timed out", "REQUEST_TIMEOUT")
      }

      throw new OkxApiError("Unable to reach OKX", "NETWORK_ERROR")
    } finally {
      clearTimeout(timeout)
    }
  }

  getServerTime(): Promise<OkxServerTime[]> {
    return this.request<OkxServerTime[]>({
      path: "/api/v5/public/time",
    })
  }

  getInstruments(instType: OkxInstrumentType): Promise<OkxInstrument[]> {
    return this.request<OkxInstrument[]>({
      path: "/api/v5/public/instruments",
      query: { instType },
    })
  }

  getAccountConfig(): Promise<OkxAccountConfig[]> {
    return this.request<OkxAccountConfig[]>({
      path: "/api/v5/account/config",
      authenticated: true,
    })
  }

  getAccountBalance(currency?: string): Promise<OkxAccountBalance[]> {
    return this.request<OkxAccountBalance[]>({
      path: "/api/v5/account/balance",
      query: { ccy: currency },
      authenticated: true,
    })
  }
}
