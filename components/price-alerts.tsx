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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, Plus, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface PriceAlert {
  id: string
  symbol: string
  price: number
  condition: "above" | "below"
  active: boolean
  createdAt: string
}

export function PriceAlerts({ symbol }: { symbol: string }) {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: "alert-1",
      symbol: "BTC/USDT",
      price: 50000,
      condition: "above",
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "alert-2",
      symbol: "BTC/USDT",
      price: 45000,
      condition: "below",
      active: true,
      createdAt: new Date().toISOString(),
    },
  ])

  const [newAlertPrice, setNewAlertPrice] = useState("")
  const [newAlertCondition, setNewAlertCondition] = useState<"above" | "below">("above")

  const handleCreateAlert = () => {
    const price = Number.parseFloat(newAlertPrice)

    if (isNaN(price) || price <= 0) {
      toast({
        title: "Preço inválido",
        description: "Por favor, insira um preço válido.",
        variant: "destructive",
      })
      return
    }

    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      symbol,
      price,
      condition: newAlertCondition,
      active: true,
      createdAt: new Date().toISOString(),
    }

    setAlerts([...alerts, newAlert])
    setNewAlertPrice("")

    toast({
      title: "Alerta criado",
      description: `Alerta criado para ${symbol} ${newAlertCondition === "above" ? "acima de" : "abaixo de"} ${price}`,
    })
  }

  const handleToggleAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, active: !alert.active } : alert)))
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))

    toast({
      title: "Alerta removido",
      description: "O alerta foi removido com sucesso.",
    })
  }

  const filteredAlerts = alerts.filter((alert) => alert.symbol === symbol)

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Bell className="h-4 w-4" />
            <span className="text-xs">Alertas</span>
            {filteredAlerts.length > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {filteredAlerts.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Alertas de Preço</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Alerta de Preço</DialogTitle>
                  <DialogDescription>
                    Crie um alerta para ser notificado quando o preço atingir um determinado valor.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="symbol" className="text-right">
                      Símbolo
                    </Label>
                    <Input id="symbol" value={symbol} disabled className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="condition" className="text-right">
                      Condição
                    </Label>
                    <Select
                      value={newAlertCondition}
                      onValueChange={(value) => setNewAlertCondition(value as "above" | "below")}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione a condição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Preço acima de</SelectItem>
                        <SelectItem value="below">Preço abaixo de</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Preço
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newAlertPrice}
                      onChange={(e) => setNewAlertPrice(e.target.value)}
                      className="col-span-3"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateAlert}>Criar Alerta</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {filteredAlerts.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Nenhum alerta configurado para {symbol}
            </div>
          ) : (
            <div className="mt-2 space-y-2">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {alert.condition === "above" ? "Acima de" : "Abaixo de"} {alert.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={alert.active} onCheckedChange={() => handleToggleAlert(alert.id)} />
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDeleteAlert(alert.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
