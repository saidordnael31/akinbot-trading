import { readFile } from "node:fs/promises"

const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/

const deploymentPath = new URL("../config/deployments/bsc-mainnet.json", import.meta.url)
const tokenomicsPath = new URL("../config/tokenomics/agd.json", import.meta.url)

const deployment = JSON.parse(await readFile(deploymentPath, "utf8"))
const tokenomics = JSON.parse(await readFile(tokenomicsPath, "utf8"))

const errors = []

if (deployment.network.chainId !== 56) {
  errors.push("BNB Smart Chain registry must use chainId 56")
}

if (deployment.network.gasAsset !== "BNB") {
  errors.push("BNB Smart Chain gas asset must be BNB")
}

if (tokenomics.supply.maximumTokens !== "10000000000") {
  errors.push("AGD maximum supply must be 10,000,000,000 tokens")
}

if (tokenomics.supply.mintAfterTge !== false) {
  errors.push("AGD minting must be disabled after TGE")
}

if (tokenomics.institutionalReferences.warrantTokenQuantity !== "300000000") {
  errors.push("A 3% warrant over 10 billion AGD must equal 300,000,000 tokens")
}

if (
  tokenomics.token.canonicalAddress.toLowerCase() !==
  deployment.contracts.agd.address?.toLowerCase()
) {
  errors.push("Canonical AGD address differs between tokenomics and deployment registry")
}

const registeredAddresses = []

for (const [categoryName, category] of Object.entries({
  contracts: deployment.contracts,
  externalAssets: deployment.externalAssets,
  agroderiAssets: deployment.agroderiAssets,
})) {
  for (const [name, entry] of Object.entries(category)) {
    if (entry.address === null) {
      continue
    }

    if (!ADDRESS_PATTERN.test(entry.address)) {
      errors.push(`${categoryName}.${name} has an invalid address`)
      continue
    }

    registeredAddresses.push({
      key: `${categoryName}.${name}`,
      address: entry.address.toLowerCase(),
    })
  }
}

const addressOwners = new Map()

for (const entry of registeredAddresses) {
  const previous = addressOwners.get(entry.address)

  if (previous) {
    errors.push(`Duplicate address used by ${previous} and ${entry.key}`)
  } else {
    addressOwners.set(entry.address, entry.key)
  }
}

if (deployment.contracts.clearingEngine.address !== null) {
  errors.push("Clearing Engine must remain null until its address is confirmed")
}

if (deployment.contracts.clearingEngine.status !== "missing-address") {
  errors.push("Clearing Engine must be marked as missing-address")
}

if (errors.length > 0) {
  console.error("Deployment validation failed:\n")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(
  `Deployment registry valid: ${registeredAddresses.length} formatted addresses, AGD supply invariant confirmed.`,
)
