"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Radio, RefreshCw, MessageCircle, Heart, Share2,
} from "lucide-react"

type NewsItem = {
  id: number
  text: string
  tag: "rumor" | "oficial" | "fivem" | "filtracion"
  author: string
  time: string
  likes: number
  shares: number
}

const TAGS = [
  { key: "all", label: "All", icon: "📡", color: "#ff007f" },
  { key: "rumor", label: "RUMOR", icon: "🚨", color: "#ff5252" },
  { key: "oficial", label: "OFFICIAL", icon: "✅", color: "#69f0ae" },
  { key: "fivem", label: "FIVEM DEV", icon: "💻", color: "#00ffff" },
  { key: "filtracion", label: "LEAK", icon: "🕵️", color: "#ffd740" },
] as const

const FEED: NewsItem[] = [
  {
    id: 1,
    text: "Rockstar would have registered a new trademark related to an online battle royale mode within GTA VI. No official comment yet.",
    tag: "rumor",
    author: "TezFunz2",
    time: "2h ago",
    likes: 342,
    shares: 89,
  },
  {
    id: 2,
    text: "Take-Two confirms in its latest financial report that GTA VI development is 'on schedule' and the marketing campaign will begin in the coming months.",
    tag: "oficial",
    author: "Take-Two Interactive",
    time: "6h ago",
    likes: 1204,
    shares: 567,
  },
  {
    id: 3,
    text: "FiveM devs are already testing early Leonida builds. The first private beta for infrastructure testing could arrive before the official launch.",
    tag: "fivem",
    author: "CFX.re Team",
    time: "14h ago",
    likes: 891,
    shares: 234,
  },
  {
    id: 4,
    text: "New leaked footage shows what appears to be a dynamic police chase system with real-time traffic AI. Source: anonymous forum post.",
    tag: "filtracion",
    author: "GTAForums user",
    time: "1d ago",
    likes: 2301,
    shares: 1045,
  },
  {
    id: 5,
    text: "Rumor: GTA VI map would be twice the size of GTA V and more than 75% would be explorable without loading screens.",
    tag: "rumor",
    author: "RedditLeaks",
    time: "2d ago",
    likes: 567,
    shares: 123,
  },
  {
    id: 6,
    text: "Rockstar opens new job postings for 'GTA Online monetization systems'. Could be related to the next-gen economy.",
    tag: "oficial",
    author: "Rockstar Careers",
    time: "3d ago",
    likes: 432,
    shares: 98,
  },
]

const TAG_COLORS: Record<string, string> = {
  rumor: "#ff5252",
  oficial: "#69f0ae",
  fivem: "#00ffff",
  filtracion: "#ffd740",
}

export default function RadarPage() {
  const [activeTag, setActiveTag] = useState("all")

  const filtered = activeTag === "all" ? FEED : FEED.filter((item) => item.tag === activeTag)

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Sticky header */}
        <div className="sticky top-16 z-30 pb-4 mb-6 bg-[#0a0a0f]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff007f] to-[#00ffff] flex items-center justify-center">
              <Radio size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white">Leonida Radar</h1>
              <p className="text-white/30 text-xs">Intel & Leaks in real time</p>
            </div>
            <button className="ml-auto p-2 rounded-lg text-white/30 hover:text-[#00ffff] hover:bg-[#00ffff]/10 transition-all">
              <RefreshCw size={18} />
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {TAGS.map((t) => {
              const active = activeTag === t.key
              const color = t.color
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTag(t.key)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                  style={
                    active
                      ? { background: `${color}20`, color, border: `1px solid ${color}40` }
                      : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }
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
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:border-[#ff007f]/20 transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: TAG_COLORS[item.tag] }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{
                        color: TAG_COLORS[item.tag],
                        backgroundColor: `${TAG_COLORS[item.tag]}15`,
                      }}
                    >
                      {TAGS.find((t) => t.key === item.tag)?.icon}{" "}
                      {TAGS.find((t) => t.key === item.tag)?.label}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                    <span>{item.author}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-white/20">
                    <span className="flex items-center gap-1 hover:text-[#ff007f] transition-colors cursor-pointer">
                      <Heart size={14} /> {item.likes}
                    </span>
                    <span className="flex items-center gap-1 hover:text-[#00ffff] transition-colors cursor-pointer">
                      <Share2 size={14} /> {item.shares}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white/40 transition-colors cursor-pointer">
                      <MessageCircle size={14} /> Discuss
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
