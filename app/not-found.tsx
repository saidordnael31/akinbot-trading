import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-2xl font-bold">Página não encontrada</h2>
        <p className="mt-2 text-muted-foreground">A página que você está procurando não existe ou foi movida.</p>
        <Button asChild className="mt-4">
          <Link href="/">Voltar para o Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
