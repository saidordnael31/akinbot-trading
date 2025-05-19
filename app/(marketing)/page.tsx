import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart2, Zap, Globe, Clock, Shield, Award } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-white" />
              <span className="ml-2 text-2xl font-bold text-white">AkinBot Trading</span>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <Link href="#features" className="text-white hover:text-blue-200">
                Recursos
              </Link>
              <Link href="#markets" className="text-white hover:text-blue-200">
                Mercados
              </Link>
              <Link href="#performance" className="text-white hover:text-blue-200">
                Performance
              </Link>
              <Link href="#pricing" className="text-white hover:text-blue-200">
                Preços
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-white text-blue-600 hover:bg-blue-100">
                <Link href="/register">Registrar</Link>
              </Button>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Trading Automatizado de Alta Performance
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-blue-100">
              Opere com precisão em múltiplos mercados com nosso robô de trading de baixa latência e alta frequência.
              Especializado em BTC/USD e commodities.
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
                <Link href="/register">Começar Gratuitamente</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="#demo">Ver Demonstração</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 h-80 bg-[url('/placeholder.svg?key=6t5nd')] bg-cover bg-center bg-no-repeat"></div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Recursos Avançados de Trading</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <Clock className="mb-4 h-10 w-10 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold">Trading de Baixa Latência</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Execução de ordens em microssegundos com nossa infraestrutura otimizada para velocidade.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <BarChart2 className="mb-4 h-10 w-10 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold">Algoritmos Avançados</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Estratégias proprietárias baseadas em análise técnica, machine learning e análise de sentimento.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <Shield className="mb-4 h-10 w-10 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold">Gerenciamento de Risco</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Proteção avançada contra drawdowns com stop-loss dinâmico e alocação inteligente de capital.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <Globe className="mb-4 h-10 w-10 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold">Multi-Mercado</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Opere simultaneamente em exchanges centralizadas, DEX, forex e mercados tradicionais.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <Zap className="mb-4 h-10 w-10 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold">HFT (High Frequency Trading)</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Capture micro-oportunidades com execução de centenas de trades por segundo.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <Award className="mb-4 h-10 w-10 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold">Especialização em Crypto e Commodities</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Performance excepcional em BTC/USD e principais commodities com estratégias específicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section id="markets" className="bg-gray-50 py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Mercados Suportados</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
              <h3 className="mb-4 text-xl font-bold">Exchanges Centralizadas (CEX)</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Binance
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Coinbase
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Kraken
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Bybit
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  OKX
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
              <h3 className="mb-4 text-xl font-bold">Exchanges Descentralizadas (DEX)</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Uniswap
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  PancakeSwap
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  dYdX
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  SushiSwap
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Curve
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
              <h3 className="mb-4 text-xl font-bold">Forex</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  EUR/USD
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  GBP/USD
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  USD/JPY
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  AUD/USD
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  USD/CAD
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
              <h3 className="mb-4 text-xl font-bold">Commodities & Ações</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Ouro (XAU)
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Petróleo (WTI/Brent)
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Prata (XAG)
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  S&P 500
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  NASDAQ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Performance Comprovada</h2>
          <div className="mb-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-green-500 bg-green-50 p-6 text-center dark:bg-green-900/20">
              <h3 className="mb-2 text-4xl font-bold text-green-600">+32.8%</h3>
              <p className="text-gray-600 dark:text-gray-400">Retorno Médio Anual</p>
            </div>
            <div className="rounded-lg border border-blue-500 bg-blue-50 p-6 text-center dark:bg-blue-900/20">
              <h3 className="mb-2 text-4xl font-bold text-blue-600">0.87</h3>
              <p className="text-gray-600 dark:text-gray-400">Índice de Sharpe</p>
            </div>
            <div className="rounded-lg border border-purple-500 bg-purple-50 p-6 text-center dark:bg-purple-900/20">
              <h3 className="mb-2 text-4xl font-bold text-purple-600">12.4%</h3>
              <p className="text-gray-600 dark:text-gray-400">Drawdown Máximo</p>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-xl font-bold">Performance Histórica</h3>
            <div className="h-80 w-full bg-[url('/placeholder.svg?key=vajl9')] bg-cover bg-center bg-no-repeat"></div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Planos e Preços</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
              <h3 className="mb-2 text-2xl font-bold">Básico</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">Para traders iniciantes</p>
              <p className="mb-6 text-4xl font-bold">
                $49<span className="text-lg font-normal">/mês</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Acesso a 3 mercados
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  5 estratégias automáticas
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Volume máximo: $10.000
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Suporte por email
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/register?plan=basic">Começar Agora</Link>
              </Button>
            </div>
            <div className="relative rounded-lg bg-blue-600 p-6 text-white shadow-md">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold text-blue-900">
                MAIS POPULAR
              </div>
              <h3 className="mb-2 text-2xl font-bold">Profissional</h3>
              <p className="mb-6 text-blue-200">Para traders sérios</p>
              <p className="mb-6 text-4xl font-bold">
                $149<span className="text-lg font-normal">/mês</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Acesso a todos os mercados
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  15 estratégias automáticas
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Volume máximo: $100.000
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Suporte prioritário
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Acesso à API
                </li>
              </ul>
              <Button asChild className="w-full bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/register?plan=pro">Escolher Plano</Link>
              </Button>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
              <h3 className="mb-2 text-2xl font-bold">Institucional</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">Para fundos e empresas</p>
              <p className="mb-6 text-4xl font-bold">
                $499<span className="text-lg font-normal">/mês</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Acesso ilimitado a todos os mercados
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Estratégias personalizadas
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Volume ilimitado
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Gerente de conta dedicado
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Infraestrutura dedicada
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Falar com Vendas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">O Que Nossos Clientes Dizem</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                "O AkinBot transformou completamente minha estratégia de trading. A precisão e velocidade são
                incomparáveis, especialmente no mercado de BTC/USD."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <p className="font-bold">Carlos Mendes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Trader Profissional</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                "Como gestor de fundo, a capacidade do AkinBot de operar em múltiplos mercados simultaneamente com baixa
                latência nos deu uma vantagem competitiva significativa."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <p className="font-bold">Ana Oliveira</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gestora de Hedge Fund</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                "A especialização em commodities do AkinBot é impressionante. Consegui resultados consistentes no
                mercado de ouro que nunca tinha alcançado com outras soluções."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <p className="font-bold">Roberto Santos</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Trader de Commodities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Pronto para Revolucionar seu Trading?</h2>
          <p className="mb-10 mx-auto max-w-2xl text-xl text-blue-100">
            Junte-se a milhares de traders que estão maximizando seus resultados com nossa tecnologia de ponta.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
              <Link href="/register">Começar Gratuitamente</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Agendar Demonstração</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center">
                <Zap className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-xl font-bold">AkinBot Trading</span>
              </div>
              <p className="mt-4 text-gray-400">Tecnologia de trading de alta frequência para mercados globais.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-400 hover:text-white">
                    Equipe
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white">
                    Carreiras
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-400 hover:text-white">
                    Documentação
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-gray-400 hover:text-white">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Termos de Serviço
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="text-gray-400 hover:text-white">
                    Compliance
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-gray-400 hover:text-white">
                    Segurança
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2023 AkinBot Trading. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
