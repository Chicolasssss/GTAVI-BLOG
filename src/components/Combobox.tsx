"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"

type Option = { value: string; label: string; score?: number }

export default function Combobox({
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: {
  options: Option[]
  value: string
  onChange: (v: string) => void
  placeholder: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div
        className="flex items-center gap-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white cursor-pointer outline-none focus-within:border-[#ff007f] transition-all"
        onClick={() => setOpen(!open)}
      >
        {Icon && <Icon size={16} className="text-white/30 shrink-0" />}
        {open ? (
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered.length > 0) {
                onChange(filtered[0].value)
                setOpen(false)
                setQuery("")
              }
              if (e.key === "Escape") setOpen(false)
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className={`flex-1 text-sm ${selected ? "text-white" : "text-white/20"}`}>
            {selected ? selected.label : placeholder}
          </span>
        )}
        <ChevronDown size={16} className="text-white/30 shrink-0" />
      </div>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#0a0a0f] border border-white/10 rounded-xl max-h-56 overflow-y-auto shadow-2xl shadow-[#ff007f]/5">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-white/20 text-sm text-center">No results</div>
          ) : (
            filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                  value === opt.value
                    ? "bg-[#ff007f]/15 text-[#ff007f]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                  setQuery("")
                }}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
