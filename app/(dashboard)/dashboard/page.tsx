"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { BotPanel } from "@/components/bot-panel"
import { SignalLog } from "@/components/signal-log"
import { OpenPositions } from "@/components/open-positions"
import { AccountSummary } from "@/components/account-summary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthCheck } from "@/components/auth-check"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [userName, setUserName] = useState("")
  const [userPlan, setUserPlan] = useState("")

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const userData = JSON.parse(user)
        setUserName(userData.name || "Usuário")
        setUserPlan(userData.plan || "basic")
      } catch (error) {
        console.error("Erro ao analisar dados do usuário:", error)
      }
    }
  }, [])

  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
            <h2 className="text-3xl font-bold tracking-tight">
              Bem-vindo, {userName} <span className="text-blue-600">|</span>{" "}
              <span className="text-lg font-normal text-muted-foreground">Plano {userPlan?.toUpperCase()}</span>
            </h2>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/markets">
                  Ver Mercados
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/strategies">
                  Estratégias
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão geral</TabsTrigger>
              <TabsTrigger value="positions">Posições</TabsTrigger>
              <TabsTrigger value="signals">Sinais</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <AccountSummary />
              <div className="grid gap-4 md:grid-cols-2">
                <BotPanel />
                <SignalLog />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Latência Média</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12ms</div>
                    <p className="text-xs text-muted-foreground">Tempo médio de execução de ordens</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Trades Diários</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">142</div>
                    <p className="text-xs text-muted-foreground">Média de operações por dia</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Nível de Risco</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Moderado</div>
                    <p className="text-xs text-muted-foreground">Configuração atual de risco</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="positions" className="space-y-4">
              <OpenPositions />
            </TabsContent>
            <TabsContent value="signals" className="space-y-4">
              <SignalLog fullWidth />
            </TabsContent>
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance do Bot</CardTitle>
                  <CardDescription>Análise de desempenho histórico</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-green-500 bg-green-50 p-4 text-center dark:bg-green-900/20">
                      <h3 className="mb-1 text-3xl font-bold text-green-600">+32.8%</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Retorno Médio Anual</p>
                    </div>
                    <div className="rounded-lg border border-blue-500 bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                      <h3 className="mb-1 text-3xl font-bold text-blue-600">0.87</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Índice de Sharpe</p>
                    </div>
                    <div className="rounded-lg border border-purple-500 bg-purple-50 p-4 text-center dark:bg-purple-900/20">
                      <h3 className="mb-1 text-3xl font-bold text-purple-600">12.4%</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Drawdown Máximo</p>
                    </div>
                  </div>
                  <div className="h-80 w-full bg-[url('/placeholder.svg?key=4ce6w')] bg-cover bg-center bg-no-repeat"></div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Configurações de API</CardTitle>
                      <CardDescription>Conecte suas exchanges para trading automatizado</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
                          <div className="flex items-center">
                            <Shield className="mr-2 h-5 w-5 text-green-600" />
                            <span className="font-medium text-green-600">Conectado à Binance (Modo Demo)</span>
                          </div>
                          <div className="mt-2 text-sm">
                            <p className="font-medium">Saldo Disponível:</p>
                            <ul className="mt-1 space-y-1">
                              <li>BTC: 0.01</li>
                              <li>ETH: 0.5</li>
                              <li>USDT: 2000</li>
                            </ul>
                          </div>
                        </div>
                        <Button className="w-full">Gerenciar Conexões</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Configurações de Risco</CardTitle>
                      <CardDescription>Defina parâmetros de gerenciamento de risco</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border p-4">
                            <p className="text-sm font-medium">Stop Loss</p>
                            <p className="text-2xl font-bold">2.5%</p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <p className="text-sm font-medium">Take Profit</p>
                            <p className="text-2xl font-bold">5.0%</p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <p className="text-sm font-medium">Alocação Máxima</p>
                            <p className="text-2xl font-bold">10%</p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <p className="text-sm font-medium">Drawdown Máximo</p>
                            <p className="text-2xl font-bold">15%</p>
                          </div>
                        </div>
                        <Button className="w-full">Ajustar Configurações</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthCheck>
  )
}
