"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AuthCheck } from "@/components/auth-check"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Zap, TrendingUp, BarChart2, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

export default function StrategiesPage() {
  const [activeStrategies, setActiveStrategies] = useState<string[]>(["trend_following", "breakout"])

  const toggleStrategy = (strategyId: string) => {
    if (activeStrategies.includes(strategyId)) {
      setActiveStrategies(activeStrategies.filter((id) => id !== strategyId))
      toast({
        title: "Estratégia desativada",
        description: "A estratégia foi desativada com sucesso",
      })
    } else {
      setActiveStrategies([...activeStrategies, strategyId])
      toast({
        title: "Estratégia ativada",
        description: "A estratégia foi ativada com sucesso",
      })
    }
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
            <h2 className="text-3xl font-bold tracking-tight">Estratégias de Trading</h2>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/backtesting">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Testar Estratégias
                </Link>
              </Button>
              <Button>
                <Zap className="mr-2 h-4 w-4" />
                Criar Nova Estratégia
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estratégias Disponíveis</CardTitle>
              <CardDescription>Configure e ative as estratégias de trading para diferentes mercados</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="active">Ativas</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="forex">Forex</TabsTrigger>
                  <TabsTrigger value="commodities">Commodities</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Trend Following Strategy */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">Trend Following</CardTitle>
                          <Badge variant={activeStrategies.includes("trend_following") ? "default" : "outline"}>
                            {activeStrategies.includes("trend_following") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Segue tendências de médio e longo prazo</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+18.5% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">8.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">4h, Diário</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="trend_following"
                            checked={activeStrategies.includes("trend_following")}
                            onCheckedChange={() => toggleStrategy("trend_following")}
                          />
                          <Label htmlFor="trend_following">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Breakout Strategy */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">Breakout</CardTitle>
                          <Badge variant={activeStrategies.includes("breakout") ? "default" : "outline"}>
                            {activeStrategies.includes("breakout") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Identifica e opera rompimentos de suporte e resistência</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+22.3% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">12.5%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">1h, 4h</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="breakout"
                            checked={activeStrategies.includes("breakout")}
                            onCheckedChange={() => toggleStrategy("breakout")}
                          />
                          <Label htmlFor="breakout">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Mean Reversion Strategy */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">Mean Reversion</CardTitle>
                          <Badge variant={activeStrategies.includes("mean_reversion") ? "default" : "outline"}>
                            {activeStrategies.includes("mean_reversion") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Opera reversões à média em mercados laterais</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+15.8% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">7.5%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">15m, 1h</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="mean_reversion"
                            checked={activeStrategies.includes("mean_reversion")}
                            onCheckedChange={() => toggleStrategy("mean_reversion")}
                          />
                          <Label htmlFor="mean_reversion">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Momentum Strategy */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">Momentum</CardTitle>
                          <Badge variant={activeStrategies.includes("momentum") ? "default" : "outline"}>
                            {activeStrategies.includes("momentum") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Captura movimentos fortes de curto prazo</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+24.2% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">14.8%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">5m, 15m</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="momentum"
                            checked={activeStrategies.includes("momentum")}
                            onCheckedChange={() => toggleStrategy("momentum")}
                          />
                          <Label htmlFor="momentum">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* HFT Strategy */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">HFT Scalping</CardTitle>
                          <Badge variant="secondary">Premium</Badge>
                        </div>
                        <CardDescription>Trading de alta frequência com baixa latência</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+35.5% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">9.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">1m, 5m</span>
                          </div>
                        </div>
                        <div className="mt-4 rounded-md bg-muted p-3">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              Esta estratégia está disponível apenas para usuários do plano Institucional.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Fazer Upgrade
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* BTC/USD Specialist */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">BTC/USD Specialist</CardTitle>
                          <Badge variant={activeStrategies.includes("btc_specialist") ? "default" : "outline"}>
                            {activeStrategies.includes("btc_specialist") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Estratégia especializada para o par BTC/USD</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+28.7% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">11.3%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">15m, 1h, 4h</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="btc_specialist"
                            checked={activeStrategies.includes("btc_specialist")}
                            onCheckedChange={() => toggleStrategy("btc_specialist")}
                          />
                          <Label htmlFor="btc_specialist">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                  {activeStrategies.length === 0 ? (
                    <div className="flex h-40 items-center justify-center rounded-md border">
                      <div className="text-center text-muted-foreground">
                        <AlertCircle className="mx-auto h-10 w-10 opacity-50" />
                        <p className="mt-2">Nenhuma estratégia ativa no momento</p>
                        <Button size="sm" className="mt-4">
                          Ativar Estratégias
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {activeStrategies.includes("trend_following") && (
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium">Trend Following</CardTitle>
                              <Badge>Ativa</Badge>
                            </div>
                            <CardDescription>Segue tendências de médio e longo prazo</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                                  Performance
                                </span>
                                <span className="text-sm font-medium text-green-600">+18.5% anual</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                                  Drawdown Máximo
                                </span>
                                <span className="text-sm font-medium">8.2%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <Clock className="mr-1 h-4 w-4 text-blue-600" />
                                  Timeframe
                                </span>
                                <span className="text-sm font-medium">4h, Diário</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
                                  Status
                                </span>
                                <span className="text-sm font-medium text-green-600">Em execução</span>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                              <Switch
                                id="trend_following_active"
                                checked={true}
                                onCheckedChange={() => toggleStrategy("trend_following")}
                              />
                              <Label htmlFor="trend_following_active">Ativa</Label>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm" className="w-full">
                              Configurar Parâmetros
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {activeStrategies.includes("breakout") && (
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium">Breakout</CardTitle>
                              <Badge>Ativa</Badge>
                            </div>
                            <CardDescription>Identifica e opera rompimentos de suporte e resistência</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                                  Performance
                                </span>
                                <span className="text-sm font-medium text-green-600">+22.3% anual</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                                  Drawdown Máximo
                                </span>
                                <span className="text-sm font-medium">12.5%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <Clock className="mr-1 h-4 w-4 text-blue-600" />
                                  Timeframe
                                </span>
                                <span className="text-sm font-medium">1h, 4h</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
                                  Status
                                </span>
                                <span className="text-sm font-medium text-green-600">Em execução</span>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                              <Switch
                                id="breakout_active"
                                checked={true}
                                onCheckedChange={() => toggleStrategy("breakout")}
                              />
                              <Label htmlFor="breakout_active">Ativa</Label>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm" className="w-full">
                              Configurar Parâmetros
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {activeStrategies.includes("mean_reversion") && (
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium">Mean Reversion</CardTitle>
                              <Badge>Ativa</Badge>
                            </div>
                            <CardDescription>Opera reversões à média em mercados laterais</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                                  Performance
                                </span>
                                <span className="text-sm font-medium text-green-600">+15.8% anual</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                                  Drawdown Máximo
                                </span>
                                <span className="text-sm font-medium">7.5%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <Clock className="mr-1 h-4 w-4 text-blue-600" />
                                  Timeframe
                                </span>
                                <span className="text-sm font-medium">15m, 1h</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
                                  Status
                                </span>
                                <span className="text-sm font-medium text-green-600">Em execução</span>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                              <Switch
                                id="mean_reversion_active"
                                checked={true}
                                onCheckedChange={() => toggleStrategy("mean_reversion")}
                              />
                              <Label htmlFor="mean_reversion_active">Ativa</Label>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm" className="w-full">
                              Configurar Parâmetros
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {activeStrategies.includes("momentum") && (
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium">Momentum</CardTitle>
                              <Badge>Ativa</Badge>
                            </div>
                            <CardDescription>Captura movimentos fortes de curto prazo</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                                  Performance
                                </span>
                                <span className="text-sm font-medium text-green-600">+24.2% anual</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                                  Drawdown Máximo
                                </span>
                                <span className="text-sm font-medium">14.8%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <Clock className="mr-1 h-4 w-4 text-blue-600" />
                                  Timeframe
                                </span>
                                <span className="text-sm font-medium">5m, 15m</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
                                  Status
                                </span>
                                <span className="text-sm font-medium text-green-600">Em execução</span>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                              <Switch
                                id="momentum_active"
                                checked={true}
                                onCheckedChange={() => toggleStrategy("momentum")}
                              />
                              <Label htmlFor="momentum_active">Ativa</Label>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm" className="w-full">
                              Configurar Parâmetros
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {activeStrategies.includes("btc_specialist") && (
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium">BTC/USD Specialist</CardTitle>
                              <Badge>Ativa</Badge>
                            </div>
                            <CardDescription>Estratégia especializada para o par BTC/USD</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                                  Performance
                                </span>
                                <span className="text-sm font-medium text-green-600">+28.7% anual</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                                  Drawdown Máximo
                                </span>
                                <span className="text-sm font-medium">11.3%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <Clock className="mr-1 h-4 w-4 text-blue-600" />
                                  Timeframe
                                </span>
                                <span className="text-sm font-medium">15m, 1h, 4h</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm">
                                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
                                  Status
                                </span>
                                <span className="text-sm font-medium text-green-600">Em execução</span>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                              <Switch
                                id="btc_specialist_active"
                                checked={true}
                                onCheckedChange={() => toggleStrategy("btc_specialist")}
                              />
                              <Label htmlFor="btc_specialist_active">Ativa</Label>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm" className="w-full">
                              Configurar Parâmetros
                            </Button>
                          </CardFooter>
                        </Card>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="crypto" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* BTC/USD Specialist */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">BTC/USD Specialist</CardTitle>
                          <Badge variant={activeStrategies.includes("btc_specialist") ? "default" : "outline"}>
                            {activeStrategies.includes("btc_specialist") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Estratégia especializada para o par BTC/USD</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+28.7% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">11.3%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">15m, 1h, 4h</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="btc_specialist_crypto"
                            checked={activeStrategies.includes("btc_specialist")}
                            onCheckedChange={() => toggleStrategy("btc_specialist")}
                          />
                          <Label htmlFor="btc_specialist_crypto">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Breakout Strategy */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">Breakout</CardTitle>
                          <Badge variant={activeStrategies.includes("breakout") ? "default" : "outline"}>
                            {activeStrategies.includes("breakout") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Identifica e opera rompimentos de suporte e resistência</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+22.3% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">12.5%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">1h, 4h</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="breakout_crypto"
                            checked={activeStrategies.includes("breakout")}
                            onCheckedChange={() => toggleStrategy("breakout")}
                          />
                          <Label htmlFor="breakout_crypto">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="forex" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Trend Following Strategy */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">Trend Following</CardTitle>
                          <Badge variant={activeStrategies.includes("trend_following") ? "default" : "outline"}>
                            {activeStrategies.includes("trend_following") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Segue tendências de médio e longo prazo</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+18.5% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">8.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">4h, Diário</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="trend_following_forex"
                            checked={activeStrategies.includes("trend_following")}
                            onCheckedChange={() => toggleStrategy("trend_following")}
                          />
                          <Label htmlFor="trend_following_forex">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Mean Reversion Strategy */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">Mean Reversion</CardTitle>
                          <Badge variant={activeStrategies.includes("mean_reversion") ? "default" : "outline"}>
                            {activeStrategies.includes("mean_reversion") ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <CardDescription>Opera reversões à média em mercados laterais</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                              Performance
                            </span>
                            <span className="text-sm font-medium text-green-600">+15.8% anual</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                              Drawdown Máximo
                            </span>
                            <span className="text-sm font-medium">7.5%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-blue-600" />
                              Timeframe
                            </span>
                            <span className="text-sm font-medium">15m, 1h</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            id="mean_reversion_forex"
                            checked={activeStrategies.includes("mean_reversion")}
                            onCheckedChange={() => toggleStrategy("mean_reversion")}
                          />
                          <Label htmlFor="mean_reversion_forex">Ativar estratégia</Label>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar Parâmetros
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="commodities" className="space-y-4">
                  {/* Commodities Strategies */}
                  {/* Placeholder for Commodities Strategies */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </AuthCheck>
  )
}
