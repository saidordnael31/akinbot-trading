import type { HexAddress } from "@/lib/agroderi/deployment-registry"

export type EnvironmentId =
  | "akin-proprietary"
  | "nickel-pod"
  | "gem-facility"
  | "agd-liquidity"
  | "agroderi-sandbox"
  | "quiin-lab"

export type InstrumentType =
  | "spot"
  | "index"
  | "perpetual"
  | "future"
  | "forward"
  | "option"
  | "swap"
  | "synthetic"

export type SettlementType = "cash" | "physical" | "hybrid"

export type RiskParameterStatus =
  | "operational"
  | "approved"
  | "proposed"
  | "experimental"
  | "illustrative"
  | "regulatory"

export interface CapitalCell {
  id: string
  environmentId: EnvironmentId
  ownerEntity: string
  baseCurrency: string
  permittedVenues: string[]
  permittedRiskCells: string[]
  credentialsScope: string
  active: boolean
}

export interface ProductRiskCell {
  id: string
  instrumentIds: string[]
  collateralPolicyId: string
  marginPolicyId: string
  waterfallPolicyId: string
  insuranceAllocationId?: string
  firstLossCapitalId?: string
  status: "draft" | "sandbox" | "restricted" | "active" | "stressed" | "closed"
}

export interface InstrumentDefinition {
  id: string
  symbol: string
  name: string
  type: InstrumentType
  underlying: string
  quoteAsset: string
  collateralAssets: string[]
  settlementType: SettlementType
  oracleId: string
  pricingPolicyId: string
  riskCellId: string
  venueIds: string[]
  region?: string
  unit?: string
  qualitySpecification?: string
  maturity?: string
  registryAddress?: HexAddress
  status: "draft" | "sandbox" | "restricted" | "active" | "stressed" | "closed"
}

export interface OrderIntent {
  id: string
  environmentId: EnvironmentId
  capitalCellId: string
  riskCellId: string
  instrumentId: string
  venueId: string
  side: "buy" | "sell"
  quantity: string
  orderType: "market" | "limit" | "post-only" | "ioc" | "fok"
  limitPrice?: string
  strategyId: string
  createdAt: string
  expiresAt?: string
  simulationOnly: boolean
}

export interface RiskDecision {
  orderIntentId: string
  decision: "approved" | "rejected" | "reduced" | "manual-review"
  approvedQuantity: string
  policyVersion: string
  reasons: string[]
  decidedAt: string
}

export interface CollateralAssetPolicy {
  assetId: string
  class: "cash" | "sovereign" | "stablecoin" | "gold" | "bitcoin" | "productive"
  issuerId?: string
  custodianIds: string[]
  oracleId: string
  policyFloorHaircut: number
  maximumConcentration: number
  redemptionRequired: boolean
  proofOfReservesRequired: boolean
  eligibleRiskCells: string[]
  status: RiskParameterStatus
}

export interface ThresholdDefinition {
  id:
    | "TH-GEM-DRAWDOWN"
    | "TH-WARRANT-EXERCISE"
    | "TH-MARKET-ACTIVATION"
    | "TH-MARGIN"
    | "TH-LIQUIDATION"
    | "TH-ORACLE-DEVIATION"
    | "TH-DEPEG"
  value: string | null
  unit: string
  sourceDocument: string | null
  effectiveAt: string | null
  owner: string
  version: string
  status: RiskParameterStatus
}

export function assertOrderCellSegregation(
  order: OrderIntent,
  capitalCell: CapitalCell,
  riskCell: ProductRiskCell,
): void {
  if (order.environmentId !== capitalCell.environmentId) {
    throw new Error("Order environment does not match the capital cell")
  }

  if (order.capitalCellId !== capitalCell.id) {
    throw new Error("Order references a different capital cell")
  }

  if (order.riskCellId !== riskCell.id) {
    throw new Error("Order references a different product risk cell")
  }

  if (!capitalCell.permittedRiskCells.includes(riskCell.id)) {
    throw new Error("Capital cell is not permitted to fund this product risk cell")
  }

  if (!capitalCell.permittedVenues.includes(order.venueId)) {
    throw new Error("Capital cell is not permitted to use this venue")
  }
}
