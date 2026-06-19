"use client"

import { motion } from "framer-motion"
import { Calendar, Video, Newspaper, Target, CheckCircle2 } from "lucide-react"

const EVENTS = [
  {
    id: "trailer-1",
    date: "December 4, 2023",
    title: "Trailer 1 Revealed",
    desc: "Rockstar officially releases the first look at Grand Theft Auto VI in Vice City, Leonida.",
    icon: Video,
    status: "completed",
    color: "#ff007f"
  },
  {
    id: "earnings-q4",
    date: "May 16, 2024",
    title: "Take-Two Q4 Report",
    desc: "Take-Two narrows the release window of GTA VI to Fall 2025.",
    icon: Newspaper,
    status: "completed",
    color: "#00ffff"
  },
  {
    id: "trailer-2",
    date: "Expected Late 2024",
    title: "Trailer 2",
    desc: "Community consensus points to a second trailer dropping between November and December.",
    icon: Video,
    status: "pending",
    color: "#ffd740"
  },
  {
    id: "preorders",
    date: "Expected Early 2025",
    title: "Pre-orders Open",
    desc: "Digital and physical pre-orders expected to go live globally.",
    icon: Target,
    status: "pending",
    color: "#ffd740"
  },
  {
    id: "launch",
    date: "Fall 2025",
    title: "Official Launch",
    desc: "Grand Theft Auto VI launches on PlayStation 5 and Xbox Series X|S.",
    icon: Calendar,
    status: "pending",
    color: "#69f0ae"
  }
]

export default function TimelinePage() {
  return (
    <div className="min-h-screen pt-28 px-4 pb-20 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Road to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00ffff]">Leonida</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            The definitive timeline tracking every major milestone, leak, and official announcement leading up to release.
          </p>
        </div>

        <div className="relative border-l-2 border-white/10 ml-6 md:ml-12 space-y-12 pb-12">
          {EVENTS.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative pl-10 md:pl-16"
            >
              <div 
                className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center bg-[#0a0a0f] border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                style={{ borderColor: ev.color }}
              >
                {ev.status === "completed" ? (
                  <CheckCircle2 size={16} color={ev.color} />
                ) : (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ev.color }} />
                )}
              </div>

              <div className="bg-[#121216] border border-white/5 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${ev.color}15`, color: ev.color }}
                    >
                      <ev.icon size={20} />
                    </div>
                    <h3 
                      className="text-2xl font-bold text-white transition-all duration-300" 
                      style={{ textShadow: `0 0 0px transparent` }}
                      onMouseEnter={(e) => (e.currentTarget.style.textShadow = `0 0 20px ${ev.color}, 0 0 40px ${ev.color}`)}
                      onMouseLeave={(e) => (e.currentTarget.style.textShadow = `0 0 0px transparent`)}
                    >
                      {ev.title}
                    </h3>
                  </div>
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/10"
                    style={{ color: ev.status === "completed" ? "white" : ev.color, backgroundColor: ev.status === "completed" ? "transparent" : `${ev.color}10` }}
                  >
                    {ev.date}
                  </span>
                </div>
                <p className="text-white/60 leading-relaxed pl-[3.25rem] text-lg font-medium">
                  {ev.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
