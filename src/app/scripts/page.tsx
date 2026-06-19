"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Code2, Download, Shield, ExternalLink, Lock,
} from "lucide-react"

export default function ScriptsPage() {
  const [tab, setTab] = useState<"fivem" | "gtavi">("fivem")

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/20 text-[#00ffff] text-xs font-medium mb-4">
            <Code2 size={14} /> Development Center
          </div>
          <h1 className="text-3xl md:text-5xl font-black gradient-text leading-tight">
            Script Vault
          </h1>
          <p className="text-white/40 mt-3 max-w-xl mx-auto text-sm">
            Premium tools and resources for your FiveM server.
          </p>
        </div>

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
        </div>

        {tab === "fivem" ? (
          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 md:p-8 hover:border-[#00ffff]/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff007f]/20 to-[#00ffff]/20 flex items-center justify-center shrink-0">
                  <Shield size={28} className="text-[#00ffff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-white font-bold text-lg group-hover:text-[#00ffff] transition-colors">
                      x64Hub — FiveM Anticheat
                    </h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ffd740]/15 text-[#ffd740] shrink-0">
                      $19
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">
                    Advanced anticheat, log reviewer, custom FiveM page builder, whitelist configurator, and full server management panel. All-in-one solution for your FiveM server.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff007f]/10 text-[#ff007f]/80 uppercase tracking-wider">Anticheat</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff007f]/10 text-[#ff007f]/80 uppercase tracking-wider">Logs</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff007f]/10 text-[#ff007f]/80 uppercase tracking-wider">Whitelist</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff007f]/10 text-[#ff007f]/80 uppercase tracking-wider">Web Panel</span>
                  </div>
                  <a
                    href="https://x64hub.com"
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all"
                  >
                    <ExternalLink size={16} /> View Details
                  </a>
                </div>
              </div>
            </motion.div>
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
