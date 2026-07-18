export type OkxMode = "demo" | "production"

export type OkxHttpMethod = "GET" | "POST"

export type OkxInstrumentType = "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION"

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

export interface OkxHealthResult {
  mode: OkxMode
  baseUrl: string
  publicApi: "ok" | "error"
  authenticatedApi: "ok" | "not-configured" | "disabled" | "error"
  serverTimestamp?: string
  checkedAt: string
  errorCode?: string
}
