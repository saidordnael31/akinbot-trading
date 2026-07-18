import { NextResponse } from "next/server"
import {
  assertOkxDemoWritesAllowed,
  getOkxClientConfig,
  getOkxTradingSafetyConfig,
  verifyInternalOrderToken,
} from "@/lib/exchanges/okx/config"
import { OkxApiError, OkxRestClient } from "@/lib/exchanges/okx/client"
import {
  OkxRiskError,
  parseOkxDemoOrderInput,
  validateOkxDemoOrder,
} from "@/lib/exchanges/okx/risk"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function errorResponse(error: unknown) {
  if (error instanceof OkxRiskError) {
    return NextResponse.json(
      { ok: false, exchange: "okx", errorCode: error.code, message: error.message },
      { status: error.httpStatus },
    )
  }

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
      errorCode: "ORDER_REQUEST_FAILED",
      message: error instanceof Error ? error.message : "Unable to process OKX demo order",
    },
    { status: 500 },
  )
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
    const input = parseOkxDemoOrderInput(payload)
    const client = new OkxRestClient(getOkxClientConfig())
    const safety = getOkxTradingSafetyConfig()
    const validated = await validateOkxDemoOrder(input, client, safety)

    // Arm OKX Cancel All After before submitting the order. This is a
    // protection mechanism, not part of the strategy.
    await client.cancelAllAfter(safety.cancelAllAfterSeconds)

    const acknowledgement = await client.placeOrder(validated.request)

    return NextResponse.json(
      {
        ok: true,
        exchange: "okx",
        mode: "demo",
        order: acknowledgement,
        risk: {
          instrument: validated.request.instId,
          clientOrderId: validated.request.clOrdId,
          lastPrice: validated.lastPrice,
          limitPrice: Number(validated.request.px),
          notionalUsdt: validated.notionalUsdt,
          deviationBps: validated.deviationBps,
          maxOrderNotionalUsdt: safety.maxOrderNotionalUsdt,
          maxLimitDeviationBps: safety.maxLimitDeviationBps,
          cancelAllAfterSeconds: safety.cancelAllAfterSeconds,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    return errorResponse(error)
  }
}
