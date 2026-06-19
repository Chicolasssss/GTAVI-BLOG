"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cpu, Monitor, Gauge, AlertTriangle, CheckCircle, ShoppingCart, MemoryStick, ChevronDown, Search, ShieldCheck
} from "lucide-react"
import Link from "next/link"

function CustomSelect({ options, value, onChange, placeholder, color }: { options: any[], value: string, onChange: (v: string) => void, placeholder: string, color: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false) }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
  const selected = options.find(o => o.value === value)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#121216]/80 border rounded-xl px-4 h-14 text-white outline-none flex items-center justify-between transition-all backdrop-blur-md font-mono text-sm group hover:bg-[#1a1a24]"
        style={{ borderColor: isOpen ? color : 'rgba(255,255,255,0.1)', boxShadow: isOpen ? `0 0 20px ${color}20` : 'none' }}
      >
        <span className={selected ? "text-white font-bold" : "text-white/40"}>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} className={`text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: isOpen ? color : undefined }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#121216]/95 backdrop-blur-xl border rounded-xl p-2 z-50 flex flex-col shadow-2xl overflow-hidden" 
            style={{ borderColor: `${color}40`, boxShadow: `0 10px 40px rgba(0,0,0,0.8), 0 0 20px ${color}10`, maxHeight: '320px' }}
          >
            <div className="relative mb-2 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar modelo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm font-mono text-white outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="overflow-y-auto scrollbar-none flex-1 space-y-1">
              {filtered.length === 0 ? (
                <p className="text-white/30 text-center text-xs py-6 font-mono uppercase tracking-widest">No results</p>
              ) : (
                filtered.map(o => (
                  <button
                    key={o.value}
                    onClick={() => { onChange(o.value); setIsOpen(false); setSearch(""); }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-mono transition-colors flex items-center justify-between ${
                      value === o.value ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {o.label}
                    {value === o.value && <CheckCircle size={14} style={{ color }} />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type Result = {
  score: number
  label: string
  color: string
  icon: typeof CheckCircle
  bottleneck: string | null
}

const cpuList = [
  // Intel
  { value: "i3-8100", label: "Intel Core i3-8100", score: 20 },
  { value: "i5-8400", label: "Intel Core i5-8400", score: 25 },
  { value: "i7-8700K", label: "Intel Core i7-8700K", score: 35 },
  { value: "i3-10100", label: "Intel Core i3-10100", score: 35 },
  { value: "i5-10400", label: "Intel Core i5-10400", score: 45 },
  { value: "i7-10700K", label: "Intel Core i7-10700K", score: 55 },
  { value: "i9-10900K", label: "Intel Core i9-10900K", score: 60 },
  { value: "i5-11400", label: "Intel Core i5-11400", score: 50 },
  { value: "i7-11700K", label: "Intel Core i7-11700K", score: 62 },
  { value: "i9-11900K", label: "Intel Core i9-11900K", score: 68 },
  { value: "i3-12100", label: "Intel Core i3-12100", score: 60 },
  { value: "i5-12400", label: "Intel Core i5-12400", score: 78 },
  { value: "i7-12700K", label: "Intel Core i7-12700K", score: 90 },
  { value: "i9-12900K", label: "Intel Core i9-12900K", score: 95 },
  { value: "i5-13400", label: "Intel Core i5-13400", score: 85 },
  { value: "i7-13700K", label: "Intel Core i7-13700K", score: 96 },
  { value: "i9-13900K", label: "Intel Core i9-13900K", score: 98 },
  { value: "i5-14600K", label: "Intel Core i5-14600K", score: 92 },
  { value: "i7-14700K", label: "Intel Core i7-14700K", score: 97 },
  { value: "i9-14900K", label: "Intel Core i9-14900K", score: 100 },
  // AMD Ryzen
  { value: "r3-3100", label: "AMD Ryzen 3 3100", score: 30 },
  { value: "r5-3600", label: "AMD Ryzen 5 3600", score: 40 },
  { value: "r7-3700X", label: "AMD Ryzen 7 3700X", score: 48 },
  { value: "r9-3900X", label: "AMD Ryzen 9 3900X", score: 52 },
  { value: "r5-5600X", label: "AMD Ryzen 5 5600X", score: 80 },
  { value: "r7-5800X", label: "AMD Ryzen 7 5800X", score: 88 },
  { value: "r7-5800X3D", label: "AMD Ryzen 7 5800X3D", score: 94 },
  { value: "r9-5900X", label: "AMD Ryzen 9 5900X", score: 92 },
  { value: "r5-7600X", label: "AMD Ryzen 5 7600X", score: 90 },
  { value: "r7-7700X", label: "AMD Ryzen 7 7700X", score: 94 },
  { value: "r7-7800X3D", label: "AMD Ryzen 7 7800X3D", score: 100 },
  { value: "r9-7950X", label: "AMD Ryzen 9 7950X", score: 98 },
]

const gpuList = [
  // NVIDIA
  { value: "gtx-970", label: "NVIDIA GTX 970", score: 15 },
  { value: "gtx-980", label: "NVIDIA GTX 980", score: 18 },
  { value: "gtx-1060", label: "NVIDIA GTX 1060", score: 20 },
  { value: "gtx-1070", label: "NVIDIA GTX 1070", score: 28 },
  { value: "gtx-1080", label: "NVIDIA GTX 1080", score: 35 },
  { value: "gtx-1080ti", label: "NVIDIA GTX 1080 Ti", score: 45 },
  { value: "gtx-1650", label: "NVIDIA GTX 1650", score: 22 },
  { value: "gtx-1660", label: "NVIDIA GTX 1660", score: 30 },
  { value: "rtx-2060", label: "NVIDIA RTX 2060", score: 40 },
  { value: "rtx-2070", label: "NVIDIA RTX 2070", score: 50 },
  { value: "rtx-2080", label: "NVIDIA RTX 2080", score: 60 },
  { value: "rtx-2080ti", label: "NVIDIA RTX 2080 Ti", score: 70 },
  { value: "rtx-3050", label: "NVIDIA RTX 3050", score: 45 },
  { value: "rtx-3060", label: "NVIDIA RTX 3060", score: 65 },
  { value: "rtx-3060ti", label: "NVIDIA RTX 3060 Ti", score: 75 },
  { value: "rtx-3070", label: "NVIDIA RTX 3070", score: 82 },
  { value: "rtx-3080", label: "NVIDIA RTX 3080", score: 92 },
  { value: "rtx-3090", label: "NVIDIA RTX 3090", score: 96 },
  { value: "rtx-4060", label: "NVIDIA RTX 4060", score: 78 },
  { value: "rtx-4060ti", label: "NVIDIA RTX 4060 Ti", score: 85 },
  { value: "rtx-4070", label: "NVIDIA RTX 4070", score: 90 },
  { value: "rtx-4070-super", label: "NVIDIA RTX 4070 Super", score: 92 },
  { value: "rtx-4080", label: "NVIDIA RTX 4080", score: 98 },
  { value: "rtx-4090", label: "NVIDIA RTX 4090", score: 100 },
  // AMD
  { value: "rx-580", label: "AMD RX 580", score: 20 },
  { value: "rx-5600xt", label: "AMD RX 5600 XT", score: 35 },
  { value: "rx-5700xt", label: "AMD RX 5700 XT", score: 48 },
  { value: "rx-6600", label: "AMD RX 6600", score: 52 },
  { value: "rx-6700xt", label: "AMD RX 6700 XT", score: 75 },
  { value: "rx-6800xt", label: "AMD RX 6800 XT", score: 88 },
  { value: "rx-6900xt", label: "AMD RX 6900 XT", score: 94 },
  { value: "rx-7600", label: "AMD RX 7600", score: 65 },
  { value: "rx-7700xt", label: "AMD RX 7700 XT", score: 80 },
  { value: "rx-7800xt", label: "AMD RX 7800 XT", score: 85 },
  { value: "rx-7900xt", label: "AMD RX 7900 XT", score: 95 },
  { value: "rx-7900xtx", label: "AMD RX 7900 XTX", score: 98 },
  // Intel ARC
  { value: "arc-a750", label: "Intel ARC A750", score: 50 },
  { value: "arc-a770", label: "Intel ARC A770", score: 58 },
]

const ramList = [
  { value: "8", label: "8 GB DDR4", score: 30 },
  { value: "16", label: "16 GB DDR4/5", score: 75 },
  { value: "32", label: "32 GB DDR4/5", score: 95 },
  { value: "64", label: "64 GB DDR5", score: 100 },
]

export default function BottleneckCalculator() {
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
      const r = ramList.find((x) => x.value === ram)!
      
      // Calculate final score using weighting
      const score = Math.round(c.score * 0.35 + g.score * 0.50 + r.score * 0.15)

      let label: string, color: string, icon: typeof CheckCircle, bottleneck: string | null

      if (score >= 75) {
        label = "Excellent Compatibility"
        color = "#00ffff"
        icon = CheckCircle
        bottleneck = null
      } else if (score >= 50) {
        label = "Compatible — Adjust settings"
        color = "#ffd740"
        icon = AlertTriangle
        
        if (r.score < 50) {
          bottleneck = "RAM is severely limiting your system (16GB+ recommended)"
        } else {
          bottleneck = Math.abs(c.score - g.score) > 20
            ? (c.score < g.score ? "CPU bottleneck: Your processor will limit GPU performance" : "GPU bottleneck: Graphics card may be underutilized")
            : null
        }
      } else {
        label = "Not Ready For Leonida"
        color = "#ff007f"
        icon = AlertTriangle
        bottleneck = "Major upgrade required to run GTA VI"
      }

      setResult({ score, label, color, icon, bottleneck })
      setLoading(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen pt-28 px-4 pb-20 bg-[#0a0a0f]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ffff]/30 text-[#00ffff] text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
            <Gauge size={14} /> System Scan
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff007f] to-[#00ffff] drop-shadow-[0_0_15px_rgba(255,0,127,0.5)]">
            GTA VI PC Analyzer
          </h1>
          <p className="text-[#00ffff]/60 mt-3 max-w-lg mx-auto font-mono text-sm uppercase tracking-wide">
            Select your Hardware for Leonida Compatibility Test
          </p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 md:p-8 space-y-6 border border-[#ff007f]/30 shadow-[0_0_30px_rgba(255,0,127,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-[#00ffff] text-sm font-bold mb-2 flex items-center gap-2 font-mono uppercase tracking-wide">
                <Cpu size={16} className="text-[#ff007f]" /> CPU
              </label>
              <CustomSelect 
                options={cpuList} 
                value={cpu} 
                onChange={(v) => { setCpu(v); setResult(null); }} 
                placeholder="Select Processor..." 
                color="#00ffff" 
              />
            </div>
            
            <div>
              <label className="text-[#00ffff] text-sm font-bold mb-2 flex items-center gap-2 font-mono uppercase tracking-wide">
                <Monitor size={16} className="text-[#ff007f]" /> GPU
              </label>
              <CustomSelect 
                options={gpuList} 
                value={gpu} 
                onChange={(v) => { setGpu(v); setResult(null); }} 
                placeholder="Select Graphics..." 
                color="#ff007f" 
              />
            </div>

            <div>
              <label className="text-[#00ffff] text-sm font-bold mb-2 flex items-center gap-2 font-mono uppercase tracking-wide">
                <MemoryStick size={16} className="text-[#ff007f]" /> RAM
              </label>
              <CustomSelect 
                options={ramList} 
                value={ram} 
                onChange={(v) => { setRam(v); setResult(null); }} 
                placeholder="Select RAM..." 
                color="#00ffff" 
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!cpu || !gpu || !ram || loading}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-[#00ffff] to-[#ff007f] text-black font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:scale-[1.02] transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Gauge size={22} /> Initiate Scan
              </>
            )}
          </button>
        </div>

        {loading && (
          <div className="mt-8 bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-[#00ffff]/30">
            <div className="w-full bg-black/50 rounded-full h-3 overflow-hidden border border-[#ff007f]/20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff007f] via-[#00ffff] to-[#ff007f] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
            <p className="text-[#00ffff] font-mono text-sm text-center mt-3 animate-pulse uppercase tracking-widest">
              Connecting to Leonida Databanks...
            </p>
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 space-y-4"
          >
            <div className="bg-gray-900/90 rounded-2xl p-8 text-center border" style={{ borderColor: `${result.color}50`, boxShadow: `0 0 30px ${result.color}20` }}>
              <div className="text-7xl font-black mb-2 tracking-tighter" style={{ color: result.color, textShadow: `0 0 20px ${result.color}` }}>
                {result.score}%
              </div>
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest border"
                style={{ background: `${result.color}10`, color: result.color, borderColor: `${result.color}50` }}
              >
                <result.icon size={18} /> {result.label}
              </div>
              {result.bottleneck && (
                <p className="text-[#ffd740] font-mono text-sm mt-5 flex items-center justify-center gap-2 bg-[#ffd740]/10 py-2 px-4 rounded-lg inline-flex mx-auto border border-[#ffd740]/30">
                  <AlertTriangle size={16} />
                  {result.bottleneck}
                </p>
              )}
            </div>

            <div className="bg-gradient-to-r from-[#121216] to-[#1a1a24] rounded-2xl p-6 md:p-8 border border-[#00ffff]/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffff]/10 blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-xl text-center md:text-left">
                <h3 className="text-[#00ffff] font-black text-xl mb-2 flex items-center justify-center md:justify-start gap-2 uppercase tracking-wide">
                  <ShieldCheck size={20} className="text-[#ff007f]" /> Prepare your arsenal
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Struggling with the RAGE Engine requirements? Discover our official recommendations for the best consoles, 4K displays, and roleplay peripherals to conquer Vice City.
                </p>
              </div>
              <Link 
                href="/gear"
                className="relative z-10 shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00ffff]/50 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all group"
              >
                <ShoppingCart size={18} className="text-[#00ffff] group-hover:scale-110 transition-transform" /> 
                View Setup & Gear
              </Link>
            </div>

            <div className="text-center mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/40 hover:text-[#00ffff] text-sm font-mono uppercase tracking-widest transition-colors"
              >
                ← Return to Base
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
