import { NextResponse } from "next/server"
import {
  getOkxClientConfig,
  verifyInternalOrderToken,
} from "@/lib/exchanges/okx/config"
import { OkxApiError, OkxRestClient } from "@/lib/exchanges/okx/client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    if (!verifyInternalOrderToken(request.headers.get("x-akin-order-token"))) {
      return NextResponse.json(
        { ok: false, exchange: "okx", errorCode: "UNAUTHORIZED" },
        { status: 401 },
      )
    }

    const config = getOkxClientConfig()

    if (!config.credentials) {
      return NextResponse.json(
        { ok: false, exchange: "okx", errorCode: "CREDENTIALS_NOT_CONFIGURED" },
        { status: 503 },
      )
    }

    const client = new OkxRestClient(config)
    const pendingOrders = await client.getPendingOrders()
    const cancellations = []
    const failures = []

    for (const order of pendingOrders) {
      try {
        const cancellation = await client.cancelOrder({
          instId: order.instId,
          ordId: order.ordId,
        })
        cancellations.push(cancellation)
      } catch (error) {
        failures.push({
          instId: order.instId,
          ordId: order.ordId,
          errorCode: error instanceof OkxApiError ? error.code : "CANCEL_FAILED",
        })
      }
    }

    const cancelAllAfter = await client.cancelAllAfter(10, "AKINKILL")

    return NextResponse.json({
      ok: failures.length === 0,
      exchange: "okx",
      mode: "demo",
      pendingOrdersFound: pendingOrders.length,
      cancelledOrders: cancellations.length,
      failedCancellations: failures,
      cancelAllAfter: cancelAllAfter[0] || null,
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
        errorCode: "KILL_SWITCH_FAILED",
        message: error instanceof Error ? error.message : "Unable to activate OKX demo kill switch",
      },
      { status: 500 },
    )
  }
}
