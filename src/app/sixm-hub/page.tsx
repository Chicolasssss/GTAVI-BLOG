"use client"

import { motion } from "framer-motion"
import { Server, Shield, Code, ArrowRight, Zap, Globe, Cpu } from "lucide-react"

export default function SixMHub() {
  return (
    <div className="min-h-screen pt-28 px-4 pb-20 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ff007f]/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00ffff]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#ff007f]/30 bg-[#ff007f]/5 text-[#ff007f] text-xs font-black tracking-widest uppercase mb-6"
          >
            <Server size={14} /> The Next Generation of Roleplay
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6"
          >
            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff007f]">SixM Hub</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto"
          >
            The transition from FiveM to the next-gen RAGE Engine starts here. Prepare your community, tools, and scripts for Leonida.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
          <div className="md:col-span-3 bg-[#121216]/80 border border-[#00ffff]/20 rounded-3xl p-8 md:p-12 mb-4 text-center md:text-left flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff007f] to-[#00ffff] shrink-0 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,255,0.3)]">
              <Server size={40} className="text-black" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-3">What is SixM?</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                SixM is the anticipated spiritual successor to FiveM for Grand Theft Auto VI. Our goal at <span className="text-[#00ffff] font-bold">Leonida Hub</span> is to prepare the global roleplay community for this generational leap. Here you will find the first script database, documentation for the new API, and the official registry for pioneer servers opening on Day 1.
              </p>
            </div>
          </div>

          {[
            {
              icon: Code,
              title: "Scripting APIs",
              desc: "Documentation and tutorials on the new Lua and JS engines for GTA VI. Prepare to migrate your current resources.",
              color: "#00ffff"
            },
            {
              icon: Globe,
              title: "Map Streaming",
              desc: "Technical specifications on how the new RAGE engine handles massive seamless interiors without loading screens in Leonida.",
              color: "#ff007f"
            },
            {
              icon: Shield,
              title: "Anticheat Infra",
              desc: "Next-generation defense systems to prevent code injection exploits from day one.",
              color: "#ffd740"
            }
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-[#121216] border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-colors group"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${feat.color}15`, color: feat.color, border: `1px solid ${feat.color}30` }}
              >
                <feat.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-[#ff007f]/20 rounded-[40px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#ff007f]/10 to-transparent pointer-events-none" />
          
          <div className="max-w-xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Pre-register Your Server</h2>
            <p className="text-white/50 mb-8">
              Secure your spot in the official Leonida Hub server registry. When the multiplayer clients launch, your server will be featured on day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/servers"
                className="bg-white text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00ffff] transition-colors w-full sm:w-auto"
              >
                Go to the Official Server Registry <ArrowRight size={18} />
              </a>
            </div>
            <p className="text-white/20 text-xs mt-4 font-mono">
              <Zap size={12} className="inline mr-1 text-[#ff007f]" /> 
              Over 2,400 communities already registered.
            </p>
          </div>

          <div className="relative z-10 hidden md:block">
            <div className="w-64 h-64 border border-[#00ffff]/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
              <div className="w-48 h-48 border border-[#ff007f]/30 rounded-full flex items-center justify-center border-dashed">
                <Cpu size={40} className="text-[#00ffff] animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
