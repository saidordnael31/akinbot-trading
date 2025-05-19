"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BarChart3, Plus, X } from "lucide-react"

interface Asset {
  symbol: string
  name: string
  color: string
  visible: boolean
}

export function MultiAssetComparison({ mainSymbol }: { mainSymbol: string }) {
  const [comparisonAssets, setComparisonAssets] = useState<Asset[]>([
    {
      symbol: "ETH/USDT",
      name: "Ethereum",
      color: "#627EEA",
      visible: true,
    },
    {
      symbol: "SOL/USDT",
      name: "Solana",
      color: "#00FFA3",
      visible: false,
    },
    {
      symbol: "BNB/USDT",
      name: "Binance Coin",
      color: "#F3BA2F",
      visible: false,
    },
    {
      symbol: "ADA/USDT",
      name: "Cardano",
      color: "#0033AD",
      visible: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])

  const availableAssets = [
    { symbol: "BTC/USDT", name: "Bitcoin" },
    { symbol: "ETH/USDT", name: "Ethereum" },
    { symbol: "SOL/USDT", name: "Solana" },
    { symbol: "BNB/USDT", name: "Binance Coin" },
    { symbol: "ADA/USDT", name: "Cardano" },
    { symbol: "XRP/USDT", name: "Ripple" },
    { symbol: "DOT/USDT", name: "Polkadot" },
    { symbol: "DOGE/USDT", name: "Dogecoin" },
    { symbol: "AVAX/USDT", name: "Avalanche" },
    { symbol: "MATIC/USDT", name: "Polygon" },
  ].filter((asset) => asset.symbol !== mainSymbol)

  const filteredAssets = availableAssets.filter(
    (asset) =>
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleAsset = (symbol: string) => {
    setComparisonAssets(
      comparisonAssets.map((asset) => (asset.symbol === symbol ? { ...asset, visible: !asset.visible } : asset)),
    )
  }

  const handleAddAssets = () => {
    const colors = ["#627EEA", "#00FFA3", "#F3BA2F", "#0033AD", "#E84142", "#8A2BE2", "#FF9900"]

    const newAssets = selectedAssets
      .filter((symbol) => !comparisonAssets.some((asset) => asset.symbol === symbol))
      .map((symbol, index) => {
        const assetInfo = availableAssets.find((asset) => asset.symbol === symbol)
        return {
          symbol,
          name: assetInfo?.name || symbol,
          color: colors[index % colors.length],
          visible: true,
        }
      })

    setComparisonAssets([...comparisonAssets, ...newAssets])
    setSelectedAssets([])
  }

  const handleRemoveAsset = (symbol: string) => {
    setComparisonAssets(comparisonAssets.filter((asset) => asset.symbol !== symbol))
  }

  const visibleAssets = comparisonAssets.filter((asset) => asset.visible)

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Comparar</span>
            {visibleAssets.length > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {visibleAssets.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Comparar Ativos</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {comparisonAssets.map((asset) => (
            <DropdownMenuCheckboxItem
              key={asset.symbol}
              checked={asset.visible}
              onCheckedChange={() => handleToggleAsset(asset.symbol)}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: asset.color }} />
                  <span>{asset.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveAsset(asset.symbol)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <div className="p-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="mr-1 h-3 w-3" />
                  Adicionar Ativo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Ativos para Comparação</DialogTitle>
                  <DialogDescription>Selecione os ativos que deseja comparar com {mainSymbol}.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    placeholder="Buscar ativos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                  />
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {filteredAssets.map((asset) => (
                      <div key={asset.symbol} className="flex items-center space-x-2 rounded-md p-2 hover:bg-muted">
                        <Checkbox
                          id={asset.symbol}
                          checked={selectedAssets.includes(asset.symbol)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAssets([...selectedAssets, asset.symbol])
                            } else {
                              setSelectedAssets(selectedAssets.filter((s) => s !== asset.symbol))
                            }
                          }}
                        />
                        <Label htmlFor={asset.symbol} className="flex-1 cursor-pointer">
                          {asset.name} ({asset.symbol})
                        </Label>
                      </div>
                    ))}
                    {filteredAssets.length === 0 && (
                      <div className="py-6 text-center text-sm text-muted-foreground">Nenhum ativo encontrado</div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddAssets} disabled={selectedAssets.length === 0}>
                    Adicionar ({selectedAssets.length})
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
