import { NextResponse } from "next/server"
import { areOkxPrivateReadsEnabled, getOkxClientConfig } from "@/lib/exchanges/okx/config"
import { OkxApiError, OkxRestClient } from "@/lib/exchanges/okx/client"
import type { OkxHealthResult } from "@/lib/exchanges/okx/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const checkedAt = new Date().toISOString()

  try {
    const config = getOkxClientConfig()
    const client = new OkxRestClient(config)
    const result: OkxHealthResult = {
      mode: config.mode,
      baseUrl: config.baseUrl,
      publicApi: "error",
      authenticatedApi: "not-configured",
      checkedAt,
    }

    try {
      const serverTime = await client.getServerTime()
      result.publicApi = "ok"
      result.serverTimestamp = serverTime[0]?.ts
    } catch (error) {
      result.errorCode = error instanceof OkxApiError ? error.code : "PUBLIC_CHECK_FAILED"
      return NextResponse.json({ ok: false, exchange: "okx", ...result }, { status: 502 })
    }

    if (!areOkxPrivateReadsEnabled()) {
      result.authenticatedApi = "disabled"
    } else if (!config.credentials) {
      result.authenticatedApi = "not-configured"
    } else {
      try {
        await client.getAccountConfig()
        result.authenticatedApi = "ok"
      } catch (error) {
        result.authenticatedApi = "error"
        result.errorCode = error instanceof OkxApiError ? error.code : "AUTH_CHECK_FAILED"
      }
    }

    return NextResponse.json({
      ok: result.publicApi === "ok" && result.authenticatedApi !== "error",
      exchange: "okx",
      ...result,
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        exchange: "okx",
        checkedAt,
        errorCode: error instanceof Error ? "CONFIGURATION_ERROR" : "UNKNOWN_ERROR",
      },
      { status: 500 },
    )
  }
}
