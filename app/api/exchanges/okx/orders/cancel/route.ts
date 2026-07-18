import { NextResponse } from "next/server"
import {
  assertOkxDemoWritesAllowed,
  getOkxClientConfig,
  getOkxTradingSafetyConfig,
  verifyInternalOrderToken,
} from "@/lib/exchanges/okx/config"
import { OkxApiError, OkxRestClient } from "@/lib/exchanges/okx/client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function readString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key]
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}

export async function POST(request: Request) {
  try {
    assertOkxDemoWritesAllowed()

    if (!verifyInternalOrderToken(request.headers.get("x-akin-order-token"))) {
      return NextResponse.json(
        { ok: false, exchange: "okx", errorCode: "UNAUTHORIZED" },
        { status: 401 },
      )
    }

    const payload = await request.json()

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json(
        { ok: false, exchange: "okx", errorCode: "INVALID_CANCEL_REQUEST" },
        { status: 400 },
      )
    }

    const record = payload as Record<string, unknown>
    const instId = readString(record, "instId")?.toUpperCase()
    const ordId = readString(record, "ordId")
    const clOrdId = readString(record, "clOrdId")
    const safety = getOkxTradingSafetyConfig()

    if (!instId || (!ordId && !clOrdId)) {
      return NextResponse.json(
        {
          ok: false,
          exchange: "okx",
          errorCode: "INVALID_CANCEL_REQUEST",
          message: "instId and either ordId or clOrdId are required",
        },
        { status: 400 },
      )
    }

    if (!safety.allowedInstruments.includes(instId)) {
      return NextResponse.json(
        { ok: false, exchange: "okx", errorCode: "INSTRUMENT_NOT_ALLOWED" },
        { status: 403 },
      )
    }

    const client = new OkxRestClient(getOkxClientConfig())
    const acknowledgement = await client.cancelOrder({ instId, ordId, clOrdId })

    return NextResponse.json({
      ok: true,
      exchange: "okx",
      mode: "demo",
      cancellation: acknowledgement,
    })
  } catch (error) {
    if (error instanceof OkxApiError) {
      return NextResponse.json(
        { ok: false, exchange: "okx", errorCode: error.code, message: error.message },
        { status: error.httpStatus || 502 },
      )
    }

    return NextResponse.json(
      {
        ok: false,
        exchange: "okx",
        errorCode: "CANCEL_REQUEST_FAILED",
        message: error instanceof Error ? error.message : "Unable to cancel OKX demo order",
      },
      { status: 500 },
    )
  }
}
