"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Menu, X, Cpu, MessageSquare, MapPin, Shield, LogOut, LogIn } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "/foro", label: "Foro", icon: MessageSquare },
  { href: "/mapa", label: "Map", icon: MapPin },
  { href: "/servidores", label: "Servers", icon: Shield },
  { href: "/calculadora", label: "PC Test", icon: Cpu },
]

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 font-bold text-lg no-underline">
          <span className="tracking-widest text-white/90 text-xl">LEONIDA HUB</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all no-underline"
              >
                <Icon size={16} />
                {link.label}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="hidden md:flex items-center gap-3">
              <img
                src={session.user.image || ""}
                alt="Avatar"
                className="w-8 h-8 rounded-full ring-2 ring-[#ff007f]"
              />
              <span className="text-sm text-white/80">{session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("discord")}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all"
            >
              <LogIn size={16} /> Login with Discord
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
              <img src={session.user.image || ""} alt="" className="w-8 h-8 rounded-full" />
              <span className="text-sm text-white/80">{session.user.name}</span>
              <button onClick={() => signOut()} className="ml-auto text-white/40 hover:text-white">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("discord")}
              className="flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold"
            >
              <LogIn size={18} /> Login with Discord
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
