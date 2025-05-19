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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, FolderOpen, ChevronDown, Trash2 } from "lucide-react"

interface ChartLayout {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export function ChartLayouts() {
  const [layouts, setLayouts] = useState<ChartLayout[]>([
    {
      id: "default",
      name: "Padrão",
      description: "Layout padrão do sistema",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "crypto-analysis",
      name: "Análise Crypto",
      description: "Layout para análise de criptomoedas",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "forex-trading",
      name: "Trading Forex",
      description: "Layout para trading de forex",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ])

  const [newLayoutName, setNewLayoutName] = useState("")
  const [newLayoutDescription, setNewLayoutDescription] = useState("")
  const [selectedLayout, setSelectedLayout] = useState<ChartLayout>(layouts[0])

  const handleSaveLayout = () => {
    const newLayout: ChartLayout = {
      id: `layout-${Date.now()}`,
      name: newLayoutName,
      description: newLayoutDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setLayouts([...layouts, newLayout])
    setNewLayoutName("")
    setNewLayoutDescription("")
  }

  const handleDeleteLayout = (id: string) => {
    if (id === "default") return // Não permite excluir o layout padrão

    const updatedLayouts = layouts.filter((layout) => layout.id !== id)
    setLayouts(updatedLayouts)

    if (selectedLayout.id === id) {
      setSelectedLayout(layouts[0])
    }
  }

  const handleSelectLayout = (layout: ChartLayout) => {
    setSelectedLayout(layout)
    // Aqui você implementaria a lógica para carregar o layout selecionado
  }

  return (
    <div className="flex items-center space-x-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <FolderOpen className="h-4 w-4" />
            <span className="text-xs">{selectedLayout.name}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Layouts Salvos</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {layouts.map((layout) => (
            <DropdownMenuItem
              key={layout.id}
              className="flex items-center justify-between"
              onClick={() => handleSelectLayout(layout)}
            >
              <span>{layout.name}</span>
              {layout.id !== "default" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteLayout(layout.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Save className="h-4 w-4" />
            <span className="text-xs">Salvar</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar Layout</DialogTitle>
            <DialogDescription>Salve a configuração atual do gráfico para uso futuro.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={newLayoutName}
                onChange={(e) => setNewLayoutName(e.target.value)}
                className="col-span-3"
                placeholder="Meu Layout"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                value={newLayoutDescription}
                onChange={(e) => setNewLayoutDescription(e.target.value)}
                className="col-span-3"
                placeholder="Descrição do layout"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveLayout} disabled={!newLayoutName}>
              Salvar Layout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
