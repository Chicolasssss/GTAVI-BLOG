"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Radio, RefreshCw, MessageCircle, Heart, Share2, Search, CheckCircle, ExternalLink
} from "lucide-react"

type NewsItem = {
  id: number
  text: string
  tag: "rumor" | "official" | "fivem" | "leak"
  author: string
  time: string
  initialLikes: number
  initialShares: number
  sourceUrl?: string
}

const TAGS = [
  { key: "all", label: "All", icon: "📡", color: "#ff007f" },
  { key: "rumor", label: "RUMOR", icon: "🚨", color: "#ff5252" },
  { key: "official", label: "OFFICIAL", icon: "✅", color: "#69f0ae" },
  { key: "fivem", label: "FIVEM DEV", icon: "💻", color: "#00ffff" },
  { key: "leak", label: "LEAK", icon: "🕵️", color: "#ffd740" },
] as const

const FEED: NewsItem[] = [
  {
    id: 1,
    text: "GTA VI Trailer 1 has broken 3 Guinness World Records, including the most viewed non-music video on YouTube in 24 hours (90 million views).",
    tag: "official",
    author: "GuinnessWorldRecords",
    time: "2h ago",
    initialLikes: 14502,
    initialShares: 4320,
  },
  {
    id: 2,
    text: "Take-Two confirms in their latest financial report that GTA VI is still scheduled for 'Fall 2025' on PS5 and Xbox Series X|S. PC was not mentioned.",
    tag: "official",
    author: "Take-Two Interactive",
    time: "5h ago",
    initialLikes: 8904,
    initialShares: 2100,
  },
  {
    id: 3,
    text: "Multiple insiders suggest that the Leonida map will include dynamic zones that change over time (e.g. buildings under construction that get completed).",
    tag: "rumor",
    author: "JasonSchreier",
    time: "10h ago",
    initialLikes: 5430,
    initialShares: 1200,
  },
  {
    id: 4,
    text: "The FiveM community is already developing the first base frameworks (Next-Gen QBCore) using reverse engineering of the updated RAGE engine.",
    tag: "fivem",
    author: "CFX.re Community",
    time: "12h ago",
    initialLikes: 3210,
    initialShares: 890,
  },
  {
    id: 5,
    text: "Leak: References to over 150 purchasable properties have been found in the leaked code, ranging from motels in Vice City to mansions on Starfish Island.",
    tag: "leak",
    author: "GTAForums Leaker",
    time: "1d ago",
    initialLikes: 12040,
    initialShares: 5600,
  },
]

const TAG_COLORS: Record<string, string> = {
  rumor: "#ff5252",
  official: "#69f0ae",
  fivem: "#00ffff",
  leak: "#ffd740",
}

export default function RadarPage() {
  const [activeTag, setActiveTag] = useState("all")
  const [search, setSearch] = useState("")
  const [likes, setLikes] = useState<Record<number, boolean>>({})
  const [shares, setShares] = useState<Record<number, boolean>>({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleShare = (id: number) => {
    setShares(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const filtered = FEED.filter((item) => {
    const matchTag = activeTag === "all" || item.tag === activeTag
    const matchSearch = item.text.toLowerCase().includes(search.toLowerCase()) || item.author.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  return (
    <div className="min-h-screen pt-24 px-4 pb-20 bg-[#0a0a0f]">
      <div className="max-w-2xl mx-auto">
        {/* Sticky header */}
        <div className="sticky top-16 z-30 pb-4 mb-6 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3 mb-4 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff007f] to-[#00ffff] flex items-center justify-center shadow-[0_0_20px_rgba(255,0,127,0.4)]">
              <Radio size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Leonida Radar</h1>
              <p className="text-[#00ffff] text-xs font-mono uppercase tracking-widest">Real-time Intel & Leaks</p>
            </div>
            <button 
              onClick={handleRefresh}
              className="ml-auto p-2.5 rounded-xl text-white/30 hover:text-[#00ffff] bg-white/5 hover:bg-[#00ffff]/10 border border-white/5 transition-all"
            >
              <RefreshCw size={18} className={isRefreshing ? "animate-spin text-[#00ffff]" : ""} />
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input 
              type="text" 
              placeholder="Search news, authors, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121216] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-[#ff007f] focus:shadow-[0_0_15px_rgba(255,0,127,0.2)] transition-all"
            />
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {TAGS.map((t) => {
              const active = activeTag === t.key
              const color = t.color
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTag(t.key)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider"
                  style={
                    active
                      ? { background: `${color}20`, color, border: `1px solid ${color}60`, boxShadow: `0 0 10px ${color}30` }
                      : { background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.05)" }
                  }
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-white/30">
                No reports found in the Leonida radar.
              </motion.div>
            )}
            {filtered.map((item, i) => {
              const isLiked = likes[item.id]
              const isShared = shares[item.id]
              const currentLikes = item.initialLikes + (isLiked ? 1 : 0)
              const currentShares = item.initialShares + (isShared ? 1 : 0)

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-[#121216] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-1.5 h-full min-h-[4rem] rounded-full shrink-0"
                      style={{ backgroundColor: TAG_COLORS[item.tag] }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border"
                          style={{
                            color: TAG_COLORS[item.tag],
                            backgroundColor: `${TAG_COLORS[item.tag]}10`,
                            borderColor: `${TAG_COLORS[item.tag]}30`,
                          }}
                        >
                          {TAGS.find((t) => t.key === item.tag)?.icon}{" "}
                          {TAGS.find((t) => t.key === item.tag)?.label}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-white/30 font-mono">
                          <span>{item.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-white/80 hover:text-white cursor-pointer transition-colors text-sm">
                          @{item.author}
                        </span>
                        {item.tag === "official" && <CheckCircle size={14} className="text-[#69f0ae]" />}
                      </div>

                      <p className="text-white/90 text-sm leading-relaxed mb-4 font-medium">{item.text}</p>
                      
                      <div className="flex items-center gap-6 mt-4 text-xs font-semibold border-t border-white/5 pt-3">
                        <button 
                          onClick={() => handleLike(item.id)}
                          className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-[#ff007f]' : 'text-white/30 hover:text-[#ff007f]'}`}
                        >
                          <Heart size={16} fill={isLiked ? "#ff007f" : "transparent"} /> 
                          {currentLikes.toLocaleString()}
                        </button>
                        <button 
                          onClick={() => handleShare(item.id)}
                          className={`flex items-center gap-1.5 transition-colors ${isShared ? 'text-[#00ffff]' : 'text-white/30 hover:text-[#00ffff]'}`}
                        >
                          <Share2 size={16} /> 
                          {currentShares.toLocaleString()}
                        </button>
                        <button className="flex items-center gap-1.5 text-white/30 hover:text-white transition-colors ml-auto">
                          <MessageCircle size={16} /> Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
