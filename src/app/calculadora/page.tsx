"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Cpu, Monitor, Gauge, AlertTriangle, CheckCircle, ShoppingCart,
} from "lucide-react"
import Link from "next/link"

type Result = {
  score: number
  label: string
  color: string
  icon: typeof CheckCircle
  bottleneck: string | null
}

const cpuList = [
  { value: "i5-12400", label: "Intel Core i5-12400", score: 78 },
  { value: "i7-12700K", label: "Intel Core i7-12700K", score: 90 },
  { value: "i9-13900K", label: "Intel Core i9-13900K", score: 97 },
  { value: "r5-5600X", label: "AMD Ryzen 5 5600X", score: 80 },
  { value: "r7-7800X3D", label: "AMD Ryzen 7 7800X3D", score: 96 },
]

const gpuList = [
  { value: "rtx-3060", label: "NVIDIA RTX 3060", score: 65 },
  { value: "rtx-4070", label: "NVIDIA RTX 4070", score: 90 },
  { value: "rtx-4090", label: "NVIDIA RTX 4090", score: 100 },
  { value: "rx-6600", label: "AMD RX 6600", score: 52 },
  { value: "rx-7800XT", label: "AMD RX 7800 XT", score: 85 },
]

export default function Calculadora() {
  const [cpu, setCpu] = useState("")
  const [gpu, setGpu] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const handleAnalyze = () => {
    if (!cpu || !gpu) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const c = cpuList.find((x) => x.value === cpu)!
      const g = gpuList.find((x) => x.value === gpu)!
      const score = Math.round(c.score * 0.4 + g.score * 0.6)

      let label: string, color: string, icon: typeof CheckCircle, bottleneck: string | null
      if (score >= 85) {
        label = "Compatibilidad Excelente"
        color = "#69f0ae"
        icon = CheckCircle
        bottleneck = null
      } else if (score >= 65) {
        label = "Compatible — Ajusta gráficos"
        color = "#ffd740"
        icon = AlertTriangle
        bottleneck = Math.abs(c.score - g.score) > 15
          ? (c.score < g.score ? "Tu CPU podría limitar la GPU" : "Tu GPU podría estar desaprovechada")
          : null
      } else {
        label = "Riesgo de Cuello de Botella"
        color = "#ff5252"
        icon = AlertTriangle
        bottleneck = "Considera actualizar ambos componentes"
      }

      setResult({ score, label, color, icon, bottleneck })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen pt-28 px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff007f]/30 text-[#ff007f] text-xs font-semibold tracking-widest uppercase mb-4">
            <Gauge size={14} /> Hardware
          </div>
          <h1 className="text-4xl md:text-5xl font-black gradient-text">
            Calculadora de Cuello de Botella
          </h1>
          <p className="text-white/40 mt-3 max-w-lg mx-auto">
            Descubre si tu PC está lista para GTA VI. Selecciona tu CPU y GPU y analizamos la compatibilidad.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm font-medium mb-1.5 flex items-center gap-2">
                <Cpu size={16} /> Tu Procesador
              </label>
              <select
                value={cpu}
                onChange={(e) => { setCpu(e.target.value); setResult(null) }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white outline-none focus:border-[#ff007f] transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0a0a0f]">Selecciona...</option>
                {cpuList.map((c) => (
                  <option key={c.value} value={c.value} className="bg-[#0a0a0f]">{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium mb-1.5 flex items-center gap-2">
                <Monitor size={16} /> Tu Tarjeta Gráfica
              </label>
              <select
                value={gpu}
                onChange={(e) => { setGpu(e.target.value); setResult(null) }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white outline-none focus:border-[#ff007f] transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0a0a0f]">Selecciona...</option>
                {gpuList.map((g) => (
                  <option key={g.value} value={g.value} className="bg-[#0a0a0f]">{g.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!cpu || !gpu || loading}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all disabled:opacity-40"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analizando...
              </>
            ) : (
              <>
                <Gauge size={22} /> Analizar mi PC
              </>
            )}
          </button>
        </div>

        {loading && (
          <div className="mt-8 glass rounded-2xl p-6">
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            <p className="text-white/30 text-sm text-center mt-3">Calculando rendimiento...</p>
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            <div className="glass rounded-2xl p-8 text-center border border-white/5">
              <div className="text-6xl font-black mb-2" style={{ color: result.color }}>
                {result.score}%
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{ background: `${result.color}20`, color: result.color }}
              >
                <result.icon size={18} /> {result.label}
              </div>
              {result.bottleneck && (
                <p className="text-white/50 text-sm mt-4 flex items-center justify-center gap-2">
                  <AlertTriangle size={16} className="text-[#ffd740]" />
                  {result.bottleneck}
                </p>
              )}
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart size={18} className="text-[#ff007f]" /> Mejoras Recomendadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "RTX 4070 Super", price: "~650€", tag: "GPU" },
                  { name: "Ryzen 7 7800X3D", price: "~450€", tag: "CPU" },
                  { name: "32 GB DDR5", price: "~100€", tag: "RAM" },
                  { name: "SSD NVMe 1TB", price: "~90€", tag: "Almacenamiento" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <span className="text-[#ffd740] text-xs">{item.price}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/20">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition"
              >
                Volver al inicio
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
