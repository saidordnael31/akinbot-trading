export type OkxMode = "demo" | "production"

export type OkxHttpMethod = "GET" | "POST"

export type OkxInstrumentType = "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION"

export type OkxOrderSide = "buy" | "sell"

export type OkxTradeMode = "cash"

export type OkxOrderType = "limit"

export interface OkxCredentials {
  apiKey: string
  apiSecret: string
  passphrase: string
}

export interface OkxClientConfig {
  baseUrl: string
  mode: OkxMode
  credentials?: OkxCredentials
  requestTimeoutMs: number
}

export interface OkxTradingSafetyConfig {
  orderWritesEnabled: boolean
  killSwitchActive: boolean
  internalOrderToken?: string
  allowedInstruments: string[]
  maxOrderNotionalUsdt: number
  maxLimitDeviationBps: number
  cancelAllAfterSeconds: number
}

export interface OkxEnvelope<T> {
  code: string
  msg: string
  data: T
  inTime?: string
  outTime?: string
}

export interface OkxServerTime {
  ts: string
}

export interface OkxInstrument {
  instType: OkxInstrumentType
  instId: string
  instFamily?: string
  baseCcy?: string
  quoteCcy?: string
  settleCcy?: string
  state: string
  tickSz: string
  lotSz: string
  minSz: string
  ctVal?: string
  ctValCcy?: string
  ctType?: string
  expTime?: string
  listTime?: string
}

export interface OkxTicker {
  instType: OkxInstrumentType
  instId: string
  last: string
  lastSz?: string
  askPx?: string
  askSz?: string
  bidPx?: string
  bidSz?: string
  open24h?: string
  high24h?: string
  low24h?: string
  vol24h?: string
  volCcy24h?: string
  ts: string
}

export interface OkxAccountConfig {
  uid: string
  mainUid?: string
  acctLv: string
  posMode: string
  autoLoan?: boolean
  greeksType?: string
  level?: string
  levelTmp?: string
}

export interface OkxBalanceDetail {
  ccy: string
  availBal?: string
  availEq?: string
  cashBal?: string
  eq?: string
  eqUsd?: string
  frozenBal?: string
  ordFrozen?: string
  upl?: string
}

export interface OkxAccountBalance {
  adjEq?: string
  availEq?: string
  isoEq?: string
  mgnRatio?: string
  notionalUsd?: string
  totalEq: string
  uTime: string
  details: OkxBalanceDetail[]
}

export interface OkxPlaceOrderRequest {
  instId: string
  tdMode: OkxTradeMode
  side: OkxOrderSide
  ordType: OkxOrderType
  sz: string
  px: string
  clOrdId: string
  tag?: string
}

export interface OkxOrderAck {
  clOrdId: string
  ordId: string
  tag?: string
  ts: string
  sCode: string
  sMsg: string
}

export interface OkxCancelOrderRequest {
  instId: string
  ordId?: string
  clOrdId?: string
}

export interface OkxOrderDetails {
  instType: OkxInstrumentType
  instId: string
  ordId: string
  clOrdId: string
  tag?: string
  px: string
  sz: string
  ordType: string
  side: OkxOrderSide
  tdMode: string
  state: string
  fillPx?: string
  fillSz?: string
  avgPx?: string
  accFillSz?: string
  fee?: string
  feeCcy?: string
  cTime: string
  uTime: string
}

export interface OkxCancelAllAfterResult {
  triggerTime: string
  tag?: string
  ts: string
}

export interface OkxHealthResult {
  mode: OkxMode
  baseUrl: string
  publicApi: "ok" | "error"
  authenticatedApi: "ok" | "not-configured" | "disabled" | "error"
  serverTimestamp?: string
  checkedAt: string
  errorCode?: string
}

export interface OkxDemoOrderInput {
  requestId: string
  instId: string
  side: OkxOrderSide
  price: string
  size: string
}

export interface OkxValidatedDemoOrder {
  request: OkxPlaceOrderRequest
  lastPrice: number
  notionalUsdt: number
  deviationBps: number
  tickSize: string
  lotSize: string
  minSize: string
}
