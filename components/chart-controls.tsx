"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  MousePointer,
  Crosshair,
  PenLine,
  LineChart,
  BarChart,
  Trash2,
} from "lucide-react"

export function ChartControls() {
  return (
    <div className="border-t p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" title="Voltar">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Avançar">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="ghost" size="icon" title="Ampliar">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Reduzir">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Ajustar à Tela">
            <Maximize className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Resetar Zoom">
            <Minimize className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="cursor" className="w-auto">
          <TabsList className="grid w-auto grid-cols-5">
            <TabsTrigger value="cursor" title="Cursor">
              <MousePointer className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="crosshair" title="Mira">
              <Crosshair className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="drawing" title="Desenho">
              <PenLine className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="indicators" title="Indicadores">
              <LineChart className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="patterns" title="Padrões">
              <BarChart className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" title="Limpar Desenhos">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
