"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { BarChart2, ChevronDown, LayoutDashboard, LineChart, LogOut, Settings, TestTube2 } from "lucide-react"

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <BarChart2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Trading Bot</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/markets"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/markets" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Mercados
            </Link>
            <Link
              href="/strategies"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/strategies" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Estratégias
            </Link>
            <Link
              href="/charts"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/charts" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Gráficos
            </Link>
            <Link
              href="/backtesting"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/backtesting" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Backtesting
            </Link>
          </nav>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <span>Menu</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/markets" className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4" />
                Mercados
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/strategies" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Estratégias
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/charts" className="flex items-center">
                <LineChart className="mr-2 h-4 w-4" />
                Gráficos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/backtesting" className="flex items-center">
                <TestTube2 className="mr-2 h-4 w-4" />
                Backtesting
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <img src="/diverse-avatars.png" alt="Avatar" className="h-8 w-8 rounded-full" />
                  <span className="sr-only">Perfil</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/api-keys" className="cursor-pointer">
                    Chaves API
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer flex items-center text-red-500">
                    <LogOut className="mr-2 h-4 w-4" /> Sair
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
