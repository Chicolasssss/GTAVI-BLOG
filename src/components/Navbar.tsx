"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Menu, X, Cpu, MessageSquare, MapPin, Shield, Radio, Code2, LogOut, LogIn, Database, Timer, Server, Newspaper, Calculator, Monitor } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/foro", label: "Forum", icon: MessageSquare },
  { href: "/scripts", label: "Scripts", icon: Code2 },
  { href: "/servidores", label: "Servers", icon: Shield },
  { href: "/radar", label: "Radar", icon: Radio },
  { href: "/db", label: "Wiki", icon: Database },
  { href: "/timeline", label: "Timeline", icon: Timer },
  { href: "/mapa", label: "Map", icon: MapPin },
  { href: "/sixm-hub", label: "SixM Hub", icon: Server },
  { href: "/calculadora", label: "Calc", icon: Calculator },
  { href: "/test-pc", label: "PC Test", icon: Monitor },
]

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 font-bold text-lg no-underline shrink-0">
          <span className="tracking-widest text-white/90 text-xl hidden sm:inline-block">LEONIDA HUB</span>
          <span className="tracking-widest text-white/90 text-xl sm:hidden">LH</span>
        </a>

        <div className="hidden lg:flex items-center gap-1 mx-4 overflow-x-auto no-scrollbar mask-edges">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all no-underline whitespace-nowrap"
              >
                <Icon size={14} />
                {link.label}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {session?.user ? (
            <div className="hidden md:flex items-center gap-3">
              <a href={`/u/${encodeURIComponent(session.user.name || "")}`} className="flex items-center gap-2 hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">
                <img
                  src={session.user.image || ""}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full ring-2 ring-[#ff007f]"
                />
                <span className="text-sm font-bold text-white/80">{session.user.name}</span>
              </a>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all"
            >
              <LogIn size={16} /> Sign In
            </button>
          )}

          <button
            className="md:hidden text-white/80"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2 text-white/60 hover:text-white no-underline"
              >
                <Icon size={18} /> {link.label}
              </a>
            )
          })}
          <hr className="border-white/10" />
          {session?.user ? (
            <div className="flex items-center gap-3 py-2">
              <a href={`/u/${encodeURIComponent(session.user.name || "")}`} className="flex items-center gap-3 w-full">
                <img src={session.user.image || ""} alt="" className="w-10 h-10 rounded-full ring-2 ring-[#ff007f]" />
                <span className="text-sm font-bold text-white/90">{session.user.name}</span>
              </a>
              <button onClick={() => signOut()} className="ml-auto text-white/40 hover:text-white bg-white/5 p-2 rounded-lg">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold"
            >
              <LogIn size={18} /> Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
