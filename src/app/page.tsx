"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  LogIn, LogOut, Sparkles, Gamepad2, Users, Map, Cpu,
  Send, CheckCircle, Loader2,
} from "lucide-react"
import Link from "next/link"
import { useCountdown } from "@/hooks/useCountdown"
import { useToast } from "@/components/Toast"
import { reserveName } from "@/app/actions/reserve"

export default function Home() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [reserved, setReserved] = useState(false)

  const handleReserve = async () => {
    if (!name.trim()) return toast("error", "Escribe un nombre")
    setSubmitting(true)
    const res = await reserveName(name)
    setSubmitting(false)
    if (res.ok) {
      setReserved(true)
      toast("success", `"${name}" reservado con éxito en Leonida`)
    } else {
      toast("error", res.error ?? "Error desconocido")
    }
  }

  return (
    <div className="relative z-10">
      <HeroSection
        session={session}
        status={status}
        signIn={signIn}
        signOut={signOut}
        name={name}
        setName={setName}
        submitting={submitting}
        reserved={reserved}
        handleReserve={handleReserve}
      />
      <FeaturesGrid />
    </div>
  )
}

function HeroSection({
  session, status, signIn, signOut,
  name, setName, submitting, reserved, handleReserve,
}: any) {
  const countdown = useCountdown(new Date("2025-10-01T00:00:00"))

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

        {countdown.isMounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 flex justify-center gap-8 md:gap-12"
          >
            {[
              { key: "days", label: "Días" },
              { key: "hours", label: "Horas" },
              { key: "minutes", label: "Min" },
              { key: "seconds", label: "Seg" },
            ].map(({ key, label }) => (
              <div key={key} className="text-center">
                <div className="text-4xl md:text-6xl font-black gradient-text leading-none">
                  {countdown[key as keyof typeof countdown]}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-2">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          {status === "loading" ? (
            <div className="w-64 h-12 mx-auto rounded-full bg-white/5 animate-pulse" />
          ) : session?.user && reserved ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 glass rounded-full px-6 py-3">
                <img
                  src={session.user.image || ""}
                  alt=""
                  className="w-10 h-10 rounded-full ring-2 ring-[#ff007f]"
                />
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{session.user.name}</p>
                  <p className="text-[#69f0ae] text-xs flex items-center gap-1">
                    <CheckCircle size={12} /> Nombre reservado
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-white/30 hover:text-white/60 transition ml-4"
                >
                  <LogOut size={18} />
                </button>
              </div>
              <Link
                href="/calculadora"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#ff007f]/40 transition-all mt-2"
              >
                <Gamepad2 size={18} /> Probar Calculadora de PC
              </Link>
            </div>
          ) : session?.user ? (
            <div className="flex flex-col items-center gap-4">
              <div className="glass rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src={session.user.image || ""}
                    alt=""
                    className="w-10 h-10 rounded-full ring-2 ring-[#ff007f]"
                  />
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{session.user.name}</p>
                    <p className="text-white/40 text-xs">Reserva tu nombre en Leonida</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Escribe tu nombre..."
                    maxLength={32}
                    className="flex-1 bg-white/5 border border-[#ff007f]/40 rounded-xl px-4 h-12 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] focus:shadow-[0_0_12px_rgba(255,0,127,0.25)] transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleReserve()}
                  />
                  <button
                    onClick={handleReserve}
                    disabled={submitting}
                    className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all disabled:opacity-50"
                  >
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    Reclamar
                  </button>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="text-white/30 hover:text-white/60 text-xs transition flex items-center gap-1"
              >
                <LogOut size={14} /> Cerrar sesión
              </button>
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
    { icon: Cpu, title: "Test de Cuello de Botella", desc: "¿Tu PC corre GTA VI?", href: "/calculadora" },
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
