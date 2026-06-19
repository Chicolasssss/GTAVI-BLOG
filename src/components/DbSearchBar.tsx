"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { DatabaseEntry, ConfirmationStatus } from "@/lib/databaseData"

export function StatusBadge({ status }: { status: ConfirmationStatus }) {
  if (status === "confirmed") {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-md bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/20">✅ Confirmed</span>
  }
  if (status === "leaked") {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-md bg-[#ff007f]/10 text-[#ff007f] border border-[#ff007f]/20">💻 Leak</span>
  }
  return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-md bg-[#ffd740]/10 text-[#ffd740] border border-[#ffd740]/20">🕵️ Rumor</span>
}

export default function DbSearchBar({ entries }: { entries: DatabaseEntry[] }) {
  const [query, setQuery] = useState("")

  const filtered = query.length > 1 
    ? entries.filter(e => 
        e.name.toLowerCase().includes(query.toLowerCase()) || 
        e.description.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="max-w-xl mx-auto relative z-50">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
        <input 
          type="text" 
          placeholder="Search characters, vehicles, weapons..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#121216] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white outline-none focus:border-[#00ffff] focus:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all text-lg"
        />
      </div>

      {query.length > 1 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#16161b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-white/40">No entries found for "{query}"</div>
          ) : (
            filtered.map((entry) => (
              <Link 
                href={`/db/${entry.category}/${entry.slug}`} 
                key={entry.id}
                onClick={() => setQuery("")}
                className="flex items-start gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-white font-bold group-hover:text-[#00ffff] transition-colors truncate">{entry.name}</h4>
                    <StatusBadge status={entry.confirmation_status} />
                  </div>
                  <div className="flex gap-2 text-xs font-mono text-white/30 uppercase tracking-widest mb-1.5">
                    <span>{entry.category}</span>
                    {entry.vehicle_class && <span>• {entry.vehicle_class}</span>}
                    {entry.weapon_type && <span>• {entry.weapon_type}</span>}
                    {entry.district && <span>• {entry.district}</span>}
                  </div>
                  <p className="text-white/50 text-sm line-clamp-1">{entry.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
