import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency with proper symbol
export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

// Format percentage
export function formatPercentage(value: number) {
  return `${value >= 0 ? "+" : ""}${(value * 100).toFixed(2)}%`
}

// Calculate profit/loss
export function calculatePnL(entryPrice: number, exitPrice: number, side: "buy" | "sell") {
  if (side === "buy") {
    return (exitPrice - entryPrice) / entryPrice
  } else {
    return (entryPrice - exitPrice) / entryPrice
  }
}
