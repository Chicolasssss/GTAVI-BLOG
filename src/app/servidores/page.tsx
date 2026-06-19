"use client"

import { useState } from "react"
import { Shield, Send, Server, Users, Hash, Loader2 } from "lucide-react"
import { preRegisterServer } from "@/app/actions/servers"
import { useToast } from "@/components/Toast"

const ROLE_TYPES = [
  { value: "serio", label: "Serious (Heavy RP)", color: "#ff007f" },
  { value: "casual", label: "Casual (Light RP)", color: "#00ffff" },
  { value: "gangs", label: "Gangs / Criminal", color: "#ff8800" },
]

export default function ServersPage() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const res = await preRegisterServer(fd)
    setSubmitting(false)
    if (res.ok) {
      toast("success", "Spot secured! We'll contact you soon.")
      ;(e.target as HTMLFormElement).reset()
    } else {
      toast("error", res.error ?? "Registration failed")
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff007f]/10 border border-[#ff007f]/20 text-[#ff007f] text-xs font-medium mb-4">
            <Shield size={14} /> Pre-Registration
          </div>
          <h1 className="text-3xl md:text-5xl font-black gradient-text leading-tight">
            Get ahead of the launch
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mt-2 font-semibold">
            Pre-register your Leonida Server
          </p>
          <p className="text-white/30 text-sm mt-3 max-w-lg mx-auto">
            GTA VI is coming. Reserve your spot in the community and be one of the first to have your server ready.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-white/60 text-sm font-medium mb-1.5">
                  <Server size={15} /> Server Name
                </label>
                <input
                  name="server_name"
                  required
                  maxLength={60}
                  placeholder="e.g. Los Santos Roleplay"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/60 text-sm font-medium mb-1.5">
                  <Users size={15} /> Role Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ROLE_TYPES.map((r) => (
                    <label
                      key={r.value}
                      className="relative flex items-center justify-center px-3 h-12 rounded-xl border border-white/10 bg-white/5 cursor-pointer has-[:checked]:border-[--color] has-[:checked]:bg-[--color]/10 transition-all text-sm font-medium text-white/50 has-[:checked]:text-white"
                      style={{ "--color": r.color } as React.CSSProperties}
                    >
                      <input type="radio" name="role_type" value={r.value} defaultChecked={r.value === "serio"} className="sr-only" />
                      {r.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/60 text-sm font-medium mb-1.5">
                  <Hash size={15} /> Discord Link
                </label>
                <input
                  name="discord_link"
                  placeholder="https://discord.gg/your-invite"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white placeholder:text-white/20 outline-none focus:border-[#00ffff] transition-all"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm font-medium mb-1.5 block">Short Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Tell us about your server..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-13 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all disabled:opacity-50 text-sm py-4"
              >
                {submitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                {submitting ? "Registering..." : "Secure My Spot"}
              </button>
            </form>
          </div>

          <div className="md:col-span-2">
            <div className="glass rounded-2xl p-6 md:p-8 h-full relative overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center z-10">
                <div className="text-center">
                  <p className="text-4xl font-black gradient-text">+50</p>
                  <p className="text-white/50 text-sm mt-1 max-w-[180px] mx-auto leading-relaxed">
                    Projects already preparing their infrastructure
                  </p>
                </div>
              </div>

              <div className="space-y-3 opacity-20 select-none">
                <div className="flex items-center gap-3 text-xs text-white/40 border-b border-white/5 pb-2">
                  <span className="w-6 text-right">#</span>
                  <span className="flex-1">Server</span>
                  <span className="w-16 text-center">Type</span>
                  <span className="w-12 text-right">Status</span>
                </div>
                {[
                  { n: 1, name: "Los Santos RP", type: "Serious" },
                  { n: 2, name: "Vice City Vibes", type: "Casual" },
                  { n: 3, name: "Los Santos RP", type: "Serious" },
                  { n: 4, name: "Paleto Bay Mafia", type: "Gangs" },
                  { n: 5, name: "Sandy Shores RP", type: "Casual" },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-3 text-xs text-white/30">
                    <span className="w-6 text-right text-white/20">{s.n}</span>
                    <span className="flex-1 truncate">{s.name}</span>
                    <span className="w-16 text-center px-1.5 py-0.5 rounded bg-white/5">{s.type}</span>
                    <span className="w-12 text-right text-green-400/50">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
