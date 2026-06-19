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
import ReservaButton from "@/components/ReservaButton"

export default function Home() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [reserved, setReserved] = useState(false)

  const handleReserve = async () => {
    if (!name.trim()) return toast("error", "Enter a name")
    setSubmitting(true)
    const res = await reserveName(name)
    setSubmitting(false)
    if (res.ok) {
      setReserved(true)
      toast("success", `"${name}" reserved successfully in Leonida`)
    } else {
      toast("error", res.error ?? "Unknown error")
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

const PRE_ORDER_DATE = new Date("2026-06-25T00:00:00")
const LAUNCH_DATE = new Date("2026-11-19T00:00:00")

function HeroSection({
  session, status, signIn, signOut,
  name, setName, submitting, reserved, handleReserve,
}: any) {
  const isPreSale = Date.now() < PRE_ORDER_DATE.getTime()
  const target = isPreSale ? PRE_ORDER_DATE : LAUNCH_DATE
  const countdown = useCountdown(target)

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
            <Sparkles size={14} /> {isPreSale ? "Pre-Sale Phase" : "Launch Phase"}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-2">
            <span className="block text-white/90">Prepare your arrival</span>
            <span className="block gradient-text text-6xl md:text-8xl lg:text-9xl mt-2">
              to Leonida
            </span>
          </h1>

          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto tracking-widest uppercase">
            The Grand Theft Auto VI citizen network
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <p className="text-white/50 text-sm font-medium tracking-wide">
            {isPreSale
              ? "Leonida Pre-Sale starts in:"
              : "Official Leonida Launch:"}
          </p>
        </motion.div>

        {countdown.isMounted && !countdown.expired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 flex justify-center gap-8 md:gap-12"
          >
            {[
              { key: "days", label: "Days" },
              { key: "hours", label: "Hours" },
              { key: "minutes", label: "Min" },
              { key: "seconds", label: "Sec" },
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

        {isPreSale && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => alert("🔔 We'll notify you when the pre-sale opens!")}
              className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-[#ff007f]/40 text-[#ff007f] text-sm font-semibold hover:bg-[#ff007f]/10 transition-all"
            >
              <Sparkles size={16} /> Notify me when pre-sale opens
            </button>
            <ReservaButton platform="ps5" />
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
                    <CheckCircle size={12} /> Name reserved
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
                href="/test-pc"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#ff007f]/40 transition-all mt-2"
              >
                <Gamepad2 size={18} /> Test Your PC
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
                    <p className="text-white/40 text-xs">Reserve your Leonida name</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
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
                    Claim
                  </button>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="text-white/30 hover:text-white/60 text-xs transition flex items-center gap-1"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("discord")}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,0,127,0.3),0_0_40px_rgba(0,255,255,0.1)]"
            >
              <LogIn size={20} /> Login with Discord to Reserve Your Name
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturesGrid() {
  const features = [
    { icon: Cpu, title: "Bottleneck Calculator", desc: "Does your PC run GTA VI?", href: "/test-pc" },
    { icon: Map, title: "Interactive Map", desc: "Explore Vice City", href: "/mapa" },
    { icon: Users, title: "Server Directory", desc: "Find your community", href: "/servidores" },
    { icon: Gamepad2, title: "16+ Tools", desc: "Everything in one place", href: "/" },
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
