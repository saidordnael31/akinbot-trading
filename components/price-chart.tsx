"use client"

import { useEffect, useRef, useState } from "react"
import { createChart, ColorType, CrosshairMode, LineStyle, PriceScaleMode } from "lightweight-charts"
import { generateCandlestickData } from "@/lib/chart-data"

interface PriceChartProps {
  symbol: string
  timeframe: string
  chartType: string
}

export function PriceChart({ symbol, timeframe, chartType }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<any>(null)
  const [candleSeries, setCandleSeries] = useState<any>(null)
  const [volumeSeries, setVolumeSeries] = useState<any>(null)

  // Inicializar o gráfico
  useEffect(() => {
    if (!chartContainerRef.current) return

    // Limpar qualquer gráfico existente
    chartContainerRef.current.innerHTML = ""

    // Criar novo gráfico
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.9)",
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.1)",
          style: LineStyle.Dotted,
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.1)",
          style: LineStyle.Dotted,
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: "rgba(224, 227, 235, 0.1)",
          style: LineStyle.Solid,
        },
        horzLine: {
          width: 1,
          color: "rgba(224, 227, 235, 0.1)",
          style: LineStyle.Solid,
        },
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.4)",
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
        mode: PriceScaleMode.Normal,
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.4)",
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    })

    // Adicionar série de candlestick
    const newCandleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    })

    // Adicionar série de volume
    const newVolumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    // Armazenar referências
    setChartInstance(chart)
    setCandleSeries(newCandleSeries)
    setVolumeSeries(newVolumeSeries)

    // Redimensionar o gráfico quando a janela for redimensionada
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [])

  // Atualizar dados quando o símbolo ou timeframe mudar
  useEffect(() => {
    if (!candleSeries || !volumeSeries) return

    // Gerar dados simulados
    const { candleData, volumeData } = generateCandlestickData(symbol, timeframe)

    // Atualizar dados
    candleSeries.setData(candleData)
    volumeSeries.setData(volumeData)

    // Ajustar a visualização para mostrar os últimos 50 candles
    if (chartInstance) {
      chartInstance.timeScale().fitContent()
    }
  }, [symbol, timeframe, candleSeries, volumeSeries, chartInstance])

  // Atualizar tipo de gráfico
  useEffect(() => {
    if (!chartInstance || !candleSeries) return

    if (chartType === "line" || chartType === "area") {
      // Remover série de candlestick
      chartInstance.removeSeries(candleSeries)

      // Adicionar série de linha ou área
      const seriesType = chartType === "line" ? "line" : "area"
      const newSeries = chartInstance.addLineSeries({
        color: "#2962FF",
        lineWidth: 2,
        crosshairMarkerVisible: true,
        lastValueVisible: true,
        priceLineVisible: true,
        ...(seriesType === "area" && {
          lineColor: "rgba(41, 98, 255, 1)",
          topColor: "rgba(41, 98, 255, 0.4)",
          bottomColor: "rgba(41, 98, 255, 0.1)",
        }),
      })

      // Gerar dados de linha (usando o preço de fechamento dos candles)
      const { candleData } = generateCandlestickData(symbol, timeframe)
      const lineData = candleData.map((candle) => ({
        time: candle.time,
        value: candle.close,
      }))

      // Atualizar dados
      newSeries.setData(lineData)
      setCandleSeries(newSeries)
    } else if (chartType === "bars") {
      // Remover série de candlestick
      chartInstance.removeSeries(candleSeries)

      // Adicionar série de barras
      const newSeries = chartInstance.addBarSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
      })

      // Atualizar dados
      const { candleData } = generateCandlestickData(symbol, timeframe)
      newSeries.setData(candleData)
      setCandleSeries(newSeries)
    } else {
      // Remover série existente
      if (candleSeries && candleSeries.seriesType() !== "Candlestick") {
        chartInstance.removeSeries(candleSeries)

        // Adicionar série de candlestick
        const newSeries = chartInstance.addCandlestickSeries({
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: false,
          wickUpColor: "#26a69a",
          wickDownColor: "#ef5350",
        })

        // Atualizar dados
        const { candleData } = generateCandlestickData(symbol, timeframe)
        newSeries.setData(candleData)
        setCandleSeries(newSeries)
      }
    }
  }, [chartType, chartInstance, candleSeries, symbol, timeframe])

  return <div ref={chartContainerRef} className="h-full w-full" />
}
