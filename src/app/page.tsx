"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  LogIn, LogOut, Sparkles, Gamepad2, Users, Map, Cpu,
  Send, CheckCircle, Loader2, Database, Code2,
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
          ) : session?.user ? (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 glass rounded-[20px] p-2 pr-6 border border-white/5 shadow-2xl bg-black/40 backdrop-blur-md">
                <img
                  src={session.user.image || ""}
                  alt=""
                  className="w-12 h-12 rounded-[14px] ring-1 ring-white/10"
                />
                <div className="text-left">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-0.5">Welcome Back</p>
                  <p className="text-white font-semibold text-base leading-none">{session.user.name}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="ml-6 p-2 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all group"
                  title="Sign Out"
                >
                  <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  href={`/u/${encodeURIComponent(session.user.name || "")}`}
                  className="px-6 py-3 rounded-xl bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors border border-white/5"
                >
                  View Profile
                </Link>
                <Link
                  href="/foro"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,0,127,0.3)] hover:shadow-[0_0_30px_rgba(255,0,127,0.5)] transition-all hover:scale-105"
                >
                  Enter Forum
                </Link>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => signIn()}
              className="mt-6 flex items-center justify-center gap-3 mx-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-black text-lg shadow-[0_0_30px_rgba(255,0,127,0.4)] hover:shadow-[0_0_50px_rgba(255,0,127,0.6)] hover:scale-[1.02] transition-all"
            >
              <LogIn size={22} /> Login to Join the Community
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturesGrid() {
  const features = [
    {
      icon: Database,
      title: "The Ultimate Database",
      desc: "Complete GTA VI wiki featuring confirmed and leaked characters, vehicles, and weapons. Updated 24/7.",
      color: "from-[#ff007f] to-[#ff007f]/50",
      text: "text-[#ff007f]"
    },
    {
      icon: Code2,
      title: "Scripts & Development",
      desc: "The meeting point for developers. Share, download, and prepare for the new Roleplay server APIs.",
      color: "from-[#00ffff] to-[#00ffff]/50",
      text: "text-[#00ffff]"
    },
    {
      icon: Users,
      title: "Community & Servers",
      desc: "Find your next home. Official ranking for the first GTA VI Roleplay servers currently in development.",
      color: "from-[#ffd740] to-[#ffd740]/50",
      text: "text-[#ffd740]"
    },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 pb-32 mt-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          PREPARE FOR THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00ffff]">NEXT GENERATION</span>
        </h2>
        <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto font-medium">
          Leonida Hub is the central platform for the international GTA VI community. 
          Everything you need to survive and dominate in Vice City, gathered in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
              
              <div className="relative h-full bg-black/40 backdrop-blur-xl rounded-[23px] p-8 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} bg-opacity-10 flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
