"use client"

import { motion } from "framer-motion"
import { Car, Crosshair, Users, MapPin } from "lucide-react"
import Link from "next/link"
import DbSearchBar from "@/components/DbSearchBar"
import { DATABASE_ENTRIES, getEntriesByCategory } from "@/lib/databaseData"
import { StatusBadge } from "@/components/DbSearchBar"

const CATEGORIES = [
  { id: "vehicles", title: "Vehicles", count: `${getEntriesByCategory("vehicles").length} Entries`, icon: Car, color: "#ff007f", gradient: "from-[#ff007f] to-[#ff5252]" },
  { id: "weapons", title: "Weapons", count: `${getEntriesByCategory("weapons").length} Entries`, icon: Crosshair, color: "#00ffff", gradient: "from-[#00ffff] to-[#00bfff]" },
  { id: "characters", title: "Characters", count: `${getEntriesByCategory("characters").length} Entries`, icon: Users, color: "#ffd740", gradient: "from-[#ffd740] to-[#ffb300]" },
  { id: "locations", title: "Locations", count: `${getEntriesByCategory("locations").length} Entries`, icon: MapPin, color: "#69f0ae", gradient: "from-[#69f0ae] to-[#00e676]" },
]

export default function DatabasePage() {
  const recentEntries = [...DATABASE_ENTRIES].sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime()).slice(0, 5)

  return (
    <div className="min-h-screen pt-28 px-4 pb-20 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Leonida <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Database</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto mb-8">
            The definitive, open-source encyclopedia for Grand Theft Auto VI. Every confirmed vehicle, weapon, character, and location documented.
          </p>
          
          <DbSearchBar entries={DATABASE_ENTRIES} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link href={`/db/${cat.id}`} key={cat.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#121216] border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all group cursor-pointer h-full relative overflow-hidden"
              >
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${cat.gradient} opacity-5 blur-[40px] group-hover:opacity-20 transition-opacity`} />
                
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  <cat.icon size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{cat.title}</h3>
                <p className="text-white/30 text-sm font-mono">{cat.count}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-[#121216] border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recently Added</h2>
          <div className="space-y-3">
            {recentEntries.map((item) => (
              <Link href={`/db/${item.category}/${item.slug}`} key={item.id}>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                  <div className="flex items-center gap-4">
                    <StatusBadge status={item.confirmation_status} />
                    <span className="font-semibold text-white">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-mono">
                    <span className="text-white/40 uppercase tracking-widest hidden sm:inline-block">{item.category}</span>
                    <span className="text-white/20">{new Date(item.date_added).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
