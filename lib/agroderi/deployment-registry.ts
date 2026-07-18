import deploymentJson from "@/config/deployments/bsc-mainnet.json"

export type HexAddress = `0x${string}`

export type DeploymentStatus =
  | "validated"
  | "declared-unverified"
  | "missing-address"
  | "pending-registry"
  | "pending-deployment-registry"

export type ContractName = keyof typeof deploymentJson.contracts
export type ExternalAssetName = keyof typeof deploymentJson.externalAssets
export type AgroDeriAssetName = keyof typeof deploymentJson.agroderiAssets

export interface RegistryEntry {
  address: string | null
  status: DeploymentStatus
  role?: string
}

const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/

export const bscDeploymentRegistry = deploymentJson

export function isHexAddress(value: string | null): value is HexAddress {
  return typeof value === "string" && ADDRESS_PATTERN.test(value)
}

export function getContractEntry(name: ContractName): RegistryEntry {
  return bscDeploymentRegistry.contracts[name] as RegistryEntry
}

export function getContractAddressForRead(name: ContractName): HexAddress {
  const entry = getContractEntry(name)

  if (!isHexAddress(entry.address)) {
    throw new Error(`Contract ${name} does not have a valid registered address`)
  }

  return entry.address
}

export function getContractAddressForWrite(name: ContractName): HexAddress {
  const entry = getContractEntry(name)

  if (entry.status !== "validated") {
    throw new Error(
      `Write access blocked for ${name}: deployment status is ${entry.status}`,
    )
  }

  if (!isHexAddress(entry.address)) {
    throw new Error(`Contract ${name} does not have a valid registered address`)
  }

  return entry.address
}

export function listPendingDeploymentValidations(): Array<{
  category: "contract" | "external-asset" | "agroderi-asset"
  name: string
  status: DeploymentStatus
}> {
  const contracts = Object.entries(bscDeploymentRegistry.contracts)
    .filter(([, entry]) => entry.status !== "validated")
    .map(([name, entry]) => ({
      category: "contract" as const,
      name,
      status: entry.status as DeploymentStatus,
    }))

  const externalAssets = Object.entries(bscDeploymentRegistry.externalAssets)
    .filter(([, entry]) => entry.status !== "validated")
    .map(([name, entry]) => ({
      category: "external-asset" as const,
      name,
      status: entry.status as DeploymentStatus,
    }))

  const agroderiAssets = Object.entries(bscDeploymentRegistry.agroderiAssets)
    .filter(([, entry]) => entry.status !== "validated")
    .map(([name, entry]) => ({
      category: "agroderi-asset" as const,
      name,
      status: entry.status as DeploymentStatus,
    }))

  return [...contracts, ...externalAssets, ...agroderiAssets]
}
