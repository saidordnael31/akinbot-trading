"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  PenLine,
  LineChart,
  Square,
  Circle,
  ArrowUpRight,
  Type,
  Ruler,
  Scissors,
  Pipette,
  Eraser,
  Trash2,
  ChevronDown,
} from "lucide-react"

interface DrawingToolsProps {
  onSelectTool: (tool: string) => void
  onClearDrawings: () => void
}

export function DrawingTools({ onSelectTool, onClearDrawings }: DrawingToolsProps) {
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const handleToolSelect = (tool: string) => {
    setActiveTool(tool)
    onSelectTool(tool)
  }

  const tools = [
    {
      id: "line",
      name: "Linha",
      icon: <PenLine className="h-4 w-4" />,
      description: "Desenhar linha reta",
    },
    {
      id: "trendline",
      name: "Linha de Tendência",
      icon: <LineChart className="h-4 w-4" />,
      description: "Desenhar linha de tendência",
    },
    {
      id: "rectangle",
      name: "Retângulo",
      icon: <Square className="h-4 w-4" />,
      description: "Desenhar retângulo",
    },
    {
      id: "circle",
      name: "Círculo",
      icon: <Circle className="h-4 w-4" />,
      description: "Desenhar círculo",
    },
    {
      id: "arrow",
      name: "Seta",
      icon: <ArrowUpRight className="h-4 w-4" />,
      description: "Desenhar seta",
    },
    {
      id: "text",
      name: "Texto",
      icon: <Type className="h-4 w-4" />,
      description: "Adicionar texto",
    },
    {
      id: "measure",
      name: "Medição",
      icon: <Ruler className="h-4 w-4" />,
      description: "Medir distância/percentual",
    },
    {
      id: "fibonacci",
      name: "Fibonacci",
      icon: <Scissors className="h-4 w-4" />,
      description: "Desenhar níveis de Fibonacci",
    },
    {
      id: "colorpicker",
      name: "Seletor de Cor",
      icon: <Pipette className="h-4 w-4" />,
      description: "Selecionar cor",
    },
    {
      id: "eraser",
      name: "Borracha",
      icon: <Eraser className="h-4 w-4" />,
      description: "Apagar desenhos",
    },
  ]

  return (
    <div className="flex items-center space-x-1">
      <Tabs defaultValue="basic" className="w-auto">
        <TabsList className="h-8">
          <TabsTrigger value="basic" className="text-xs px-2 py-1">
            Básico
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs px-2 py-1">
            Avançado
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            {activeTool ? (
              <>
                {tools.find((t) => t.id === activeTool)?.icon}
                <span className="text-xs">{tools.find((t) => t.id === activeTool)?.name}</span>
              </>
            ) : (
              <>
                <PenLine className="h-4 w-4" />
                <span className="text-xs">Ferramentas</span>
              </>
            )}
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="start">
          <div className="grid grid-cols-5 gap-1">
            <TooltipProvider delayDuration={300}>
              {tools.map((tool) => (
                <Tooltip key={tool.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeTool === tool.id ? "default" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleToolSelect(tool.id)}
                    >
                      {tool.icon}
                      <span className="sr-only">{tool.name}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{tool.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
          <div className="mt-2 flex justify-end">
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onClearDrawings}>
              <Trash2 className="mr-1 h-3 w-3" />
              Limpar Tudo
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
