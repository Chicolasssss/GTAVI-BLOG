"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Cpu, Monitor, Gauge, AlertTriangle, CheckCircle, ShoppingCart, MemoryStick,
} from "lucide-react"
import Link from "next/link"
import Combobox from "@/components/Combobox"

type Result = {
  score: number
  label: string
  color: string
  icon: typeof CheckCircle
  bottleneck: string | null
}

const cpuList = [
  { value: "i3-10100", label: "Intel Core i3-10100", score: 45 },
  { value: "i5-10400", label: "Intel Core i5-10400", score: 55 },
  { value: "i5-11400", label: "Intel Core i5-11400", score: 60 },
  { value: "i5-12400", label: "Intel Core i5-12400", score: 78 },
  { value: "i5-12600K", label: "Intel Core i5-12600K", score: 84 },
  { value: "i5-13600K", label: "Intel Core i5-13600K", score: 90 },
  { value: "i5-14600K", label: "Intel Core i5-14600K", score: 92 },
  { value: "i7-10700K", label: "Intel Core i7-10700K", score: 65 },
  { value: "i7-11700K", label: "Intel Core i7-11700K", score: 72 },
  { value: "i7-12700K", label: "Intel Core i7-12700K", score: 90 },
  { value: "i7-13700K", label: "Intel Core i7-13700K", score: 94 },
  { value: "i7-14700K", label: "Intel Core i7-14700K", score: 96 },
  { value: "i9-10900K", label: "Intel Core i9-10900K", score: 72 },
  { value: "i9-11900K", label: "Intel Core i9-11900K", score: 78 },
  { value: "i9-12900K", label: "Intel Core i9-12900K", score: 93 },
  { value: "i9-13900K", label: "Intel Core i9-13900K", score: 97 },
  { value: "i9-14900K", label: "Intel Core i9-14900K", score: 99 },
  { value: "r3-3100", label: "AMD Ryzen 3 3100", score: 42 },
  { value: "r5-3600", label: "AMD Ryzen 5 3600", score: 58 },
  { value: "r5-5600X", label: "AMD Ryzen 5 5600X", score: 80 },
  { value: "r5-7600X", label: "AMD Ryzen 5 7600X", score: 88 },
  { value: "r7-3700X", label: "AMD Ryzen 7 3700X", score: 65 },
  { value: "r7-5700X3D", label: "AMD Ryzen 7 5700X3D", score: 88 },
  { value: "r7-7700X", label: "AMD Ryzen 7 7700X", score: 91 },
  { value: "r7-7800X3D", label: "AMD Ryzen 7 7800X3D", score: 96 },
  { value: "r9-3900X", label: "AMD Ryzen 9 3900X", score: 70 },
  { value: "r9-5900X", label: "AMD Ryzen 9 5900X", score: 86 },
  { value: "r9-5950X", label: "AMD Ryzen 9 5950X", score: 90 },
  { value: "r9-7900X", label: "AMD Ryzen 9 7900X", score: 94 },
  { value: "r9-7950X3D", label: "AMD Ryzen 9 7950X3D", score: 98 },
]

const gpuList = [
  { value: "gtx-1650", label: "NVIDIA GTX 1650", score: 25 },
  { value: "gtx-1660S", label: "NVIDIA GTX 1660 Super", score: 35 },
  { value: "rtx-2060", label: "NVIDIA RTX 2060", score: 45 },
  { value: "rtx-2070S", label: "NVIDIA RTX 2070 Super", score: 55 },
  { value: "rtx-2080Ti", label: "NVIDIA RTX 2080 Ti", score: 65 },
  { value: "rtx-3050", label: "NVIDIA RTX 3050", score: 38 },
  { value: "rtx-3060", label: "NVIDIA RTX 3060", score: 65 },
  { value: "rtx-3060Ti", label: "NVIDIA RTX 3060 Ti", score: 72 },
  { value: "rtx-3070", label: "NVIDIA RTX 3070", score: 78 },
  { value: "rtx-3080", label: "NVIDIA RTX 3080", score: 88 },
  { value: "rtx-3080Ti", label: "NVIDIA RTX 3080 Ti", score: 92 },
  { value: "rtx-3090", label: "NVIDIA RTX 3090", score: 94 },
  { value: "rtx-4060", label: "NVIDIA RTX 4060", score: 70 },
  { value: "rtx-4060Ti", label: "NVIDIA RTX 4060 Ti", score: 78 },
  { value: "rtx-4070", label: "NVIDIA RTX 4070", score: 90 },
  { value: "rtx-4070S", label: "NVIDIA RTX 4070 Super", score: 93 },
  { value: "rtx-4080", label: "NVIDIA RTX 4080", score: 96 },
  { value: "rtx-4090", label: "NVIDIA RTX 4090", score: 100 },
  { value: "rx-5600XT", label: "AMD RX 5600 XT", score: 35 },
  { value: "rx-5700XT", label: "AMD RX 5700 XT", score: 45 },
  { value: "rx-6600", label: "AMD RX 6600", score: 52 },
  { value: "rx-6650XT", label: "AMD RX 6650 XT", score: 60 },
  { value: "rx-6700XT", label: "AMD RX 6700 XT", score: 68 },
  { value: "rx-6800", label: "AMD RX 6800", score: 78 },
  { value: "rx-6800XT", label: "AMD RX 6800 XT", score: 84 },
  { value: "rx-6900XT", label: "AMD RX 6900 XT", score: 90 },
  { value: "rx-7600", label: "AMD RX 7600", score: 58 },
  { value: "rx-7700XT", label: "AMD RX 7700 XT", score: 75 },
  { value: "rx-7800XT", label: "AMD RX 7800 XT", score: 85 },
  { value: "rx-7900GRE", label: "AMD RX 7900 GRE", score: 90 },
  { value: "rx-7900XT", label: "AMD RX 7900 XT", score: 95 },
  { value: "rx-7900XTX", label: "AMD RX 7900 XTX", score: 98 },
]

const ramOptions = [
  { value: "8", label: "8 GB DDR4", score: 30 },
  { value: "16", label: "16 GB DDR4", score: 60 },
  { value: "32", label: "32 GB DDR5", score: 95 },
  { value: "64", label: "64 GB DDR5", score: 100 },
]

export default function TestPCPage() {
  const [cpu, setCpu] = useState("")
  const [gpu, setGpu] = useState("")
  const [ram, setRam] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const handleAnalyze = () => {
    if (!cpu || !gpu || !ram) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const c = cpuList.find((x) => x.value === cpu)!
      const g = gpuList.find((x) => x.value === gpu)!
      const r = ramOptions.find((x) => x.value === ram)!
      const score = Math.round(c.score * 0.3 + g.score * 0.5 + r.score * 0.2)

      let label: string, color: string, icon: typeof CheckCircle, bottleneck: string | null

      if (score >= 85) {
        label = "Excellent Compatibility"
        color = "#69f0ae"
        icon = CheckCircle
        bottleneck = null
      } else if (score >= 65) {
        label = "Compatible — Adjust settings"
        color = "#ffd740"
        icon = AlertTriangle
        bottleneck = Math.abs(c.score - g.score) > 15
          ? (c.score < g.score ? "Your CPU may bottleneck the GPU" : "Your GPU may be underutilized")
          : null
      } else {
        label = "Bottleneck Risk"
        color = "#ff5252"
        icon = AlertTriangle
        bottleneck = "Consider upgrading your hardware"
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
            <Gauge size={14} /> Hardware Lab
          </div>
          <h1 className="text-4xl md:text-5xl font-black gradient-text">
            PC Bottleneck Calculator
          </h1>
          <p className="text-white/40 mt-3 max-w-lg mx-auto">
            Select your CPU, GPU, and RAM to see if your rig is ready for GTA VI. Search by typing the component name.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm font-medium mb-1.5 flex items-center gap-2">
                <Cpu size={16} /> Processor
              </label>
              <Combobox
                options={cpuList}
                value={cpu}
                onChange={setCpu}
                placeholder="Search CPU..."
                icon={Cpu}
              />
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium mb-1.5 flex items-center gap-2">
                <Monitor size={16} /> Graphics Card
              </label>
              <Combobox
                options={gpuList}
                value={gpu}
                onChange={setGpu}
                placeholder="Search GPU..."
                icon={Monitor}
              />
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium mb-1.5 flex items-center gap-2">
                <MemoryStick size={16} /> RAM
              </label>
              <Combobox
                options={ramOptions}
                value={ram}
                onChange={setRam}
                placeholder="Select RAM..."
                icon={MemoryStick}
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!cpu || !gpu || !ram || loading}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all disabled:opacity-40"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Gauge size={22} /> Analyze My Rig
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
            <p className="text-white/30 text-sm text-center mt-3">Testing your hardware...</p>
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
                <ShoppingCart size={18} className="text-[#ff007f]" /> Recommended Upgrades
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "RTX 4070 Super", price: "~$700", tag: "GPU" },
                  { name: "Ryzen 7 7800X3D", price: "~$480", tag: "CPU" },
                  { name: "32 GB DDR5", price: "~$110", tag: "RAM" },
                  { name: "SSD NVMe 1TB", price: "~$100", tag: "Storage" },
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
                Back to home
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
