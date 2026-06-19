"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Code2, Download, Upload, Lock, Star, Tag,
} from "lucide-react"

type Script = {
  id: number
  title: string
  desc: string
  tags: string[]
  price: string
  downloads: number
  rating: number
}

const FIVEM_SCRIPTS: Script[] = [
  {
    id: 1,
    title: "Advanced Inventory System",
    desc: "Full inventory with drag & drop, item caching, and police evidence tracking. Supports ESX & QBCore.",
    tags: ["LUA", "ESX", "QBCore"],
    price: "Free",
    downloads: 12450,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Police HUD + Radar",
    desc: "Complete police interface: radar, speed gun, plate lookup, arrest menu, and dispatch integration.",
    tags: ["LUA", "StandAlone"],
    price: "$24.99",
    downloads: 8900,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Real Estate Core",
    desc: "Buy, sell, and rent properties. Includes interior preview, mortgage system, and multi-character support.",
    tags: ["LUA", "ESX", "QBCore"],
    price: "$34.99",
    downloads: 6700,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Gang Territory Wars",
    desc: "Claim and defend territories with dynamic PvP zones. Includes gang stash, reputation, and turf bonuses.",
    tags: ["LUA", "QBCore"],
    price: "Free",
    downloads: 15300,
    rating: 4.9,
  },
]

export default function ScriptsPage() {
  const [tab, setTab] = useState<"fivem" | "gtavi">("fivem")

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/20 text-[#00ffff] text-xs font-medium mb-4">
            <Code2 size={14} /> Development Center
          </div>
          <h1 className="text-3xl md:text-5xl font-black gradient-text leading-tight">
            Script Vault
          </h1>
          <p className="text-white/40 mt-3 max-w-xl mx-auto text-sm">
            Scripts, mods, and resources for the FiveM and Leonida community. Share your creations or find the perfect script for your server.
          </p>
        </div>

        {/* Tabs + Upload */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setTab("fivem")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "fivem"
                  ? "bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white shadow-lg shadow-[#ff007f]/20"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              GTA V (FiveM)
            </button>
            <button
              onClick={() => setTab("gtavi")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "gtavi"
                  ? "bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white shadow-lg shadow-[#ff007f]/20"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              GTA VI (Coming Soon)
            </button>
          </div>

          <button className="inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all">
            <Upload size={16} /> Upload Script
          </button>
        </div>

        {tab === "fivem" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIVEM_SCRIPTS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover:border-[#00ffff]/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-bold text-lg group-hover:text-[#00ffff] transition-colors">
                    {s.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    s.price === "Free"
                      ? "bg-[#69f0ae]/15 text-[#69f0ae]"
                      : "bg-[#ffd740]/15 text-[#ffd740]"
                  }`}>
                    {s.price}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff007f]/10 text-[#ff007f]/80 uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Download size={13} /> {s.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-[#ffd740]" /> {s.rating}
                    </span>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-xs hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all">
                    <Download size={13} /> Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
              <div className="max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff007f] to-[#00ffff] flex items-center justify-center mx-auto mb-4">
                  <Lock size={32} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Leonida SDK Not Available Yet</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  The GTA VI development tools have not been released. Get ready for the next generation — the Script Vault will open when Leonida launches.
                </p>
              </div>
            </div>
            {/* Ghost cards behind blur */}
            <div className="grid grid-cols-2 gap-4 opacity-10 select-none">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white/5 rounded-2xl p-6 text-left">
                  <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
                  <div className="h-3 w-full bg-white/10 rounded mb-1" />
                  <div className="h-3 w-2/3 bg-white/10 rounded mb-3" />
                  <div className="flex gap-2">
                    <div className="h-5 w-12 bg-white/10 rounded" />
                    <div className="h-5 w-12 bg-white/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
