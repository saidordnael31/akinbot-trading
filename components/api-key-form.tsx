"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, KeyRound, ShieldCheck, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ApiKeyForm() {
  const [exchange, setExchange] = useState("binance")
  const [apiKey, setApiKey] = useState("")
  const [apiSecret, setApiSecret] = useState("")
  const [testMode, setTestMode] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(true)
  const [balance, setBalance] = useState<any>(null)

  useEffect(() => {
    // Verificar se já temos uma conexão simulada
    setIsConnected(true)
    setIsDemoMode(true)

    // Simular saldo
    setBalance({
      free: {
        BTC: "0.01",
        ETH: "0.5",
        USDT: "2000",
      },
    })
  }, [])

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!apiKey || !apiSecret) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, forneça a Chave de API e o Segredo",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Chaves de API salvas",
        description: `Conectado com sucesso à ${exchange}`,
      })

      setIsConnected(true)
      setIsDemoMode(false)

      // Simular saldo real
      setBalance({
        free: {
          BTC: "0.05",
          ETH: "1.2",
          USDT: "5000",
        },
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar chaves de API",
        description: "Não foi possível conectar à exchange",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSaveKeys}>
      <Card>
        <CardHeader>
          <CardTitle>Configuração de API da Exchange</CardTitle>
          <CardDescription>Conecte sua conta de exchange para habilitar negociações automatizadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDemoMode && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Modo Demo Ativo</AlertTitle>
              <AlertDescription>
                Você está executando no modo de demonstração. Nenhuma negociação real será executada. Adicione suas
                chaves de API abaixo para conectar a uma exchange real.
              </AlertDescription>
            </Alert>
          )}

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Para segurança, crie chaves de API com permissões apenas de negociação e restrições de IP. Nunca
              compartilhe seu Segredo de API com ninguém.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="exchange">Exchange</Label>
            <Select value={exchange} onValueChange={setExchange}>
              <SelectTrigger id="exchange">
                <SelectValue placeholder="Selecione a exchange" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binance">Binance</SelectItem>
                <SelectItem value="exness">Exness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">Chave de API</Label>
            <Input
              id="api-key"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Digite sua Chave de API"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-secret">Segredo de API</Label>
            <Input
              id="api-secret"
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder="Digite seu Segredo de API"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="test-mode"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={testMode}
              onChange={(e) => setTestMode(e.target.checked)}
            />
            <Label htmlFor="test-mode">Habilitar Modo de Teste (sem negociações reais)</Label>
          </div>

          {isConnected && (
            <div className="flex flex-col space-y-2 rounded-md bg-green-50 p-3 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <div className="flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5" />
                <span>
                  {isDemoMode
                    ? `Conectado à ${exchange} (Modo Demo)`
                    : `Conectado com sucesso à ${exchange} ${testMode ? "(Modo de Teste)" : ""}`}
                </span>
              </div>
              {balance && (
                <div className="mt-2 text-sm">
                  <p className="font-medium">Saldo Disponível:</p>
                  <ul className="mt-1 space-y-1">
                    {Object.entries(balance.free)
                      .filter(([currency, amount]) => Number.parseFloat(amount as string) > 0)
                      .slice(0, 5) // Mostrar apenas as primeiras 5 moedas
                      .map(([currency, amount]) => (
                        <li key={currency}>
                          {currency}: {amount}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving} className="w-full">
            <KeyRound className="mr-2 h-4 w-4" />
            {isSaving
              ? "Conectando..."
              : isConnected
                ? isDemoMode
                  ? "Conectar Exchange Real"
                  : "Atualizar Conexão"
                : "Conectar Exchange"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
