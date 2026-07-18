import { NextResponse } from "next/server"
import {
  areOkxPrivateReadsEnabled,
  getOkxClientConfig,
  verifyInternalOrderToken,
} from "@/lib/exchanges/okx/config"
import { OkxApiError, OkxRestClient } from "@/lib/exchanges/okx/client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    if (!areOkxPrivateReadsEnabled()) {
      return NextResponse.json(
        { ok: false, exchange: "okx", errorCode: "PRIVATE_READS_DISABLED" },
        { status: 403 },
      )
    }

    if (!verifyInternalOrderToken(request.headers.get("x-akin-order-token"))) {
      return NextResponse.json(
        { ok: false, exchange: "okx", errorCode: "UNAUTHORIZED" },
        { status: 401 },
      )
    }

    const url = new URL(request.url)
    const instId = url.searchParams.get("instId")?.trim().toUpperCase()
    const ordId = url.searchParams.get("ordId")?.trim() || undefined
    const clOrdId = url.searchParams.get("clOrdId")?.trim() || undefined

    if (!instId || (!ordId && !clOrdId)) {
      return NextResponse.json(
        {
          ok: false,
          exchange: "okx",
          errorCode: "INVALID_STATUS_REQUEST",
          message: "instId and either ordId or clOrdId are required",
        },
        { status: 400 },
      )
    }

    const client = new OkxRestClient(getOkxClientConfig())
    const orders = await client.getOrderDetails({ instId, ordId, clOrdId })

    return NextResponse.json({
      ok: true,
      exchange: "okx",
      mode: "demo",
      order: orders[0] || null,
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
        errorCode: "STATUS_REQUEST_FAILED",
        message: error instanceof Error ? error.message : "Unable to read OKX demo order status",
      },
      { status: 500 },
    )
  }
}
