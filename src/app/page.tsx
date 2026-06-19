"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LogIn, LogOut, Sparkles, Gamepad2, Users, Map, Cpu } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <div className="relative z-10">
      <HeroSection session={session} status={status} signIn={signIn} signOut={signOut} />
      <FeaturesGrid />
    </div>
  )
}

function HeroSection({ session, status, signIn, signOut }: any) {
  const target = new Date("2025-12-31T00:00:00")
  const [countdown, setCountdown] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" })

  useEffect(() => {
    const update = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setCountdown({
        days: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff007f]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ffd700]/30 text-[#ffd700] text-xs font-semibold tracking-widest uppercase mb-8">
            <Sparkles size={14} /> Próximamente
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-2">
            <span className="block text-white/90">Prepara tu llegada</span>
            <span className="block gradient-text text-6xl md:text-8xl lg:text-9xl mt-2">
              a Leonida
            </span>
          </h1>

          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto tracking-widest uppercase">
            La red de ciudadanos de Grand Theft Auto VI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex justify-center gap-8 md:gap-12"
        >
          {Object.entries(countdown).map(([key, val]) => (
            <div key={key} className="text-center">
              <div className="text-4xl md:text-6xl font-black gradient-text leading-none">
                {val}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest mt-2">
                {key === "days" ? "Días" : key === "hours" ? "Horas" : key === "minutes" ? "Min" : "Seg"}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          {status === "loading" ? (
            <div className="w-64 h-12 mx-auto rounded-full bg-white/5 animate-pulse" />
          ) : session?.user ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 glass rounded-full px-6 py-3">
                <img
                  src={session.user.image || ""}
                  alt=""
                  className="w-10 h-10 rounded-full ring-2 ring-[#ff007f]"
                />
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{session.user.name}</p>
                  <p className="text-white/40 text-xs">Reserva de nombre activa</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-white/30 hover:text-white/60 transition ml-4"
                >
                  <LogOut size={18} />
                </button>
              </div>
              <p className="text-white/60 text-sm">
                🎮 Bienvenido, <span className="text-white font-semibold">{session.user.name}</span>.
                Tu nombre está reservado en Leonida.
              </p>
              <Link
                href="/bottleneck"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#ff007f]/40 transition-all mt-2"
              >
                <Gamepad2 size={18} /> Explorar Herramientas
              </Link>
            </div>
          ) : (
            <button
              onClick={() => signIn("discord")}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,0,127,0.3),0_0_40px_rgba(0,255,255,0.1)]"
            >
              <LogIn size={20} /> Entrar con Discord para Reservar tu Nombre
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturesGrid() {
  const features = [
    { icon: Cpu, title: "Test de Cuello de Botella", desc: "¿Tu PC corre GTA VI?", href: "/bottleneck" },
    { icon: Map, title: "Mapa Interactivo", desc: "Explora Vice City", href: "/map" },
    { icon: Users, title: "Directorio de Servidores", desc: "Encuentra tu comunidad", href: "/servers" },
    { icon: Gamepad2, title: "16 Herramientas", desc: "Todo en un solo lugar", href: "/" },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <Link key={i} href={f.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover:border-[#ff007f]/40 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ff007f]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff007f]/20 transition-colors">
                  <Icon className="text-[#ff007f]" size={22} />
                </div>
                <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                <p className="text-white/40 text-sm">{f.desc}</p>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
