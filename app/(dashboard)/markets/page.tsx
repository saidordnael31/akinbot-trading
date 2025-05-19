"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AuthCheck } from "@/components/auth-check"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart2, Search, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dados simulados de mercados
  const cryptoMarkets = [
    { symbol: "BTC/USDT", name: "Bitcoin", price: 40250.75, change: 2.35, volume: "1.2B", market: "Binance" },
    { symbol: "ETH/USDT", name: "Ethereum", price: 2150.5, change: 1.75, volume: "850M", market: "Binance" },
    { symbol: "SOL/USDT", name: "Solana", price: 105.25, change: 4.2, volume: "450M", market: "Binance" },
    { symbol: "XRP/USDT", name: "Ripple", price: 0.58, change: -1.2, volume: "320M", market: "Binance" },
    { symbol: "ADA/USDT", name: "Cardano", price: 0.45, change: -0.75, volume: "210M", market: "Binance" },
    { symbol: "DOT/USDT", name: "Polkadot", price: 6.85, change: 3.1, volume: "180M", market: "Binance" },
    { symbol: "DOGE/USDT", name: "Dogecoin", price: 0.085, change: 5.4, volume: "150M", market: "Binance" },
    { symbol: "AVAX/USDT", name: "Avalanche", price: 35.2, change: 2.8, volume: "120M", market: "Binance" },
  ]

  const forexMarkets = [
    { symbol: "EUR/USD", name: "Euro/US Dollar", price: 1.0925, change: 0.15, volume: "950M", market: "Forex" },
    {
      symbol: "GBP/USD",
      name: "British Pound/US Dollar",
      price: 1.275,
      change: -0.25,
      volume: "780M",
      market: "Forex",
    },
    { symbol: "USD/JPY", name: "US Dollar/Japanese Yen", price: 148.35, change: 0.45, volume: "820M", market: "Forex" },
    {
      symbol: "AUD/USD",
      name: "Australian Dollar/US Dollar",
      price: 0.658,
      change: -0.1,
      volume: "450M",
      market: "Forex",
    },
    {
      symbol: "USD/CAD",
      name: "US Dollar/Canadian Dollar",
      price: 1.365,
      change: 0.2,
      volume: "520M",
      market: "Forex",
    },
    { symbol: "USD/CHF", name: "US Dollar/Swiss Franc", price: 0.892, change: -0.05, volume: "380M", market: "Forex" },
    {
      symbol: "NZD/USD",
      name: "New Zealand Dollar/US Dollar",
      price: 0.612,
      change: 0.3,
      volume: "280M",
      market: "Forex",
    },
    { symbol: "EUR/GBP", name: "Euro/British Pound", price: 0.857, change: 0.25, volume: "320M", market: "Forex" },
  ]

  const commoditiesMarkets = [
    { symbol: "GOLD", name: "Gold", price: 2025.5, change: 0.85, volume: "650M", market: "Commodities" },
    { symbol: "SILVER", name: "Silver", price: 23.75, change: 1.2, volume: "420M", market: "Commodities" },
    { symbol: "WTI", name: "Crude Oil WTI", price: 78.35, change: -1.5, volume: "580M", market: "Commodities" },
    { symbol: "BRENT", name: "Crude Oil Brent", price: 82.2, change: -1.25, volume: "520M", market: "Commodities" },
    { symbol: "NATGAS", name: "Natural Gas", price: 2.85, change: 2.1, volume: "380M", market: "Commodities" },
    { symbol: "COPPER", name: "Copper", price: 3.95, change: 0.65, volume: "290M", market: "Commodities" },
    { symbol: "PLATINUM", name: "Platinum", price: 925.4, change: -0.45, volume: "180M", market: "Commodities" },
    { symbol: "CORN", name: "Corn", price: 4.25, change: 1.8, volume: "150M", market: "Commodities" },
  ]

  const stockMarkets = [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.25, change: 1.2, volume: "850M", market: "NASDAQ" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 380.5, change: 0.85, volume: "720M", market: "NASDAQ" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.75, change: -0.45, volume: "650M", market: "NASDAQ" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.35, change: 2.1, volume: "680M", market: "NASDAQ" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 215.6, change: -1.75, volume: "750M", market: "NASDAQ" },
    { symbol: "META", name: "Meta Platforms Inc.", price: 325.4, change: 1.5, volume: "580M", market: "NASDAQ" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 450.25, change: 3.2, volume: "820M", market: "NASDAQ" },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 145.8, change: 0.65, volume: "420M", market: "NYSE" },
  ]

  // Filtrar mercados com base na pesquisa
  const filterMarkets = (markets) => {
    if (!searchQuery) return markets
    return markets.filter(
      (market) =>
        market.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const filteredCryptoMarkets = filterMarkets(cryptoMarkets)
  const filteredForexMarkets = filterMarkets(forexMarkets)
  const filteredCommoditiesMarkets = filterMarkets(commoditiesMarkets)
  const filteredStockMarkets = filterMarkets(stockMarkets)

  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
            <h2 className="text-3xl font-bold tracking-tight">Mercados</h2>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar mercados..."
                className="w-full pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mercados Disponíveis</CardTitle>
              <CardDescription>
                Explore os mercados disponíveis para trading com o AkinBot. Especialistas em BTC/USD e commodities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="crypto" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="crypto">Crypto (CEX)</TabsTrigger>
                  <TabsTrigger value="dex">Crypto (DEX)</TabsTrigger>
                  <TabsTrigger value="forex">Forex</TabsTrigger>
                  <TabsTrigger value="commodities">Commodities</TabsTrigger>
                  <TabsTrigger value="stocks">Ações</TabsTrigger>
                </TabsList>

                <TabsContent value="crypto" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Símbolo</div>
                      <div>Nome</div>
                      <div className="text-right">Preço</div>
                      <div className="text-right">Variação 24h</div>
                      <div className="text-right">Volume 24h</div>
                      <div className="text-right">Ação</div>
                    </div>
                    <div className="divide-y">
                      {filteredCryptoMarkets.map((market) => (
                        <div key={market.symbol} className="grid grid-cols-6 gap-4 p-4">
                          <div className="font-medium">{market.symbol}</div>
                          <div>{market.name}</div>
                          <div className="text-right">${market.price.toLocaleString()}</div>
                          <div className={`text-right ${market.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {market.change >= 0 ? (
                              <ArrowUp className="mr-1 inline h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 inline h-3 w-3" />
                            )}
                            {Math.abs(market.change)}%
                          </div>
                          <div className="text-right">{market.volume}</div>
                          <div className="text-right">
                            <Button size="sm">Operar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dex" className="space-y-4">
                  <div className="flex h-40 items-center justify-center rounded-md border">
                    <div className="text-center text-muted-foreground">
                      <BarChart2 className="mx-auto h-10 w-10 opacity-50" />
                      <p className="mt-2">Mercados DEX disponíveis apenas no plano Profissional ou superior</p>
                      <Button size="sm" className="mt-4">
                        Fazer Upgrade
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="forex" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Símbolo</div>
                      <div>Nome</div>
                      <div className="text-right">Preço</div>
                      <div className="text-right">Variação 24h</div>
                      <div className="text-right">Volume 24h</div>
                      <div className="text-right">Ação</div>
                    </div>
                    <div className="divide-y">
                      {filteredForexMarkets.map((market) => (
                        <div key={market.symbol} className="grid grid-cols-6 gap-4 p-4">
                          <div className="font-medium">{market.symbol}</div>
                          <div>{market.name}</div>
                          <div className="text-right">{market.price.toLocaleString()}</div>
                          <div className={`text-right ${market.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {market.change >= 0 ? (
                              <ArrowUp className="mr-1 inline h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 inline h-3 w-3" />
                            )}
                            {Math.abs(market.change)}%
                          </div>
                          <div className="text-right">{market.volume}</div>
                          <div className="text-right">
                            <Button size="sm">Operar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="commodities" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Símbolo</div>
                      <div>Nome</div>
                      <div className="text-right">Preço</div>
                      <div className="text-right">Variação 24h</div>
                      <div className="text-right">Volume 24h</div>
                      <div className="text-right">Ação</div>
                    </div>
                    <div className="divide-y">
                      {filteredCommoditiesMarkets.map((market) => (
                        <div key={market.symbol} className="grid grid-cols-6 gap-4 p-4">
                          <div className="font-medium">{market.symbol}</div>
                          <div>{market.name}</div>
                          <div className="text-right">${market.price.toLocaleString()}</div>
                          <div className={`text-right ${market.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {market.change >= 0 ? (
                              <ArrowUp className="mr-1 inline h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 inline h-3 w-3" />
                            )}
                            {Math.abs(market.change)}%
                          </div>
                          <div className="text-right">{market.volume}</div>
                          <div className="text-right">
                            <Button size="sm">Operar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stocks" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Símbolo</div>
                      <div>Nome</div>
                      <div className="text-right">Preço</div>
                      <div className="text-right">Variação 24h</div>
                      <div className="text-right">Volume 24h</div>
                      <div className="text-right">Ação</div>
                    </div>
                    <div className="divide-y">
                      {filteredStockMarkets.map((market) => (
                        <div key={market.symbol} className="grid grid-cols-6 gap-4 p-4">
                          <div className="font-medium">{market.symbol}</div>
                          <div>{market.name}</div>
                          <div className="text-right">${market.price.toLocaleString()}</div>
                          <div className={`text-right ${market.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {market.change >= 0 ? (
                              <ArrowUp className="mr-1 inline h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 inline h-3 w-3" />
                            )}
                            {Math.abs(market.change)}%
                          </div>
                          <div className="text-right">{market.volume}</div>
                          <div className="text-right">
                            <Button size="sm">Operar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mercados em Destaque</CardTitle>
              <CardDescription>Mercados com maior volume e oportunidades de trading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">BTC/USDT</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$40,250.75</div>
                    <p className="flex items-center text-sm text-green-600">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      +2.35% nas últimas 24h
                    </p>
                    <div className="mt-4 h-20 w-full bg-[url('/placeholder.svg?key=mp27b')] bg-cover bg-center bg-no-repeat"></div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">GOLD</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$2,025.50</div>
                    <p className="flex items-center text-sm text-green-600">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      +0.85% nas últimas 24h
                    </p>
                    <div className="mt-4 h-20 w-full bg-[url('/placeholder.svg?key=88won')] bg-cover bg-center bg-no-repeat"></div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">EUR/USD</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.0925</div>
                    <p className="flex items-center text-sm text-green-600">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      +0.15% nas últimas 24h
                    </p>
                    <div className="mt-4 h-20 w-full bg-[url('/placeholder.svg?key=cm3nt')] bg-cover bg-center bg-no-repeat"></div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">WTI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$78.35</div>
                    <p className="flex items-center text-sm text-red-600">
                      <ArrowDown className="mr-1 h-4 w-4" />
                      -1.50% nas últimas 24h
                    </p>
                    <div className="mt-4 h-20 w-full bg-[url('/placeholder.svg?key=wd7em')] bg-cover bg-center bg-no-repeat"></div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </AuthCheck>
  )
}
