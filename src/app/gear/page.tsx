import Link from "next/link"
import { Monitor, CreditCard, Headphones, ShoppingCart, ArrowRight, ShieldCheck, Zap } from "lucide-react"

export const metadata = {
  title: "Setup & Gear — Leonida Hub",
  description: "Recommended hardware, digital balance, and roleplay peripherals for GTA VI.",
}

const affiliateData = {
  hardware: [
    { name: "PlayStation 5 Slim / Pro", desc: "The optimal console experience with 60FPS support for the RAGE Engine.", tag: "Console", color: "from-[#00439C] to-[#0070cc]" },
    { name: "Xbox Series X", desc: "Raw 4K power. Perfect for seamless loading across Leonida's massive map.", tag: "Console", color: "from-[#107C10] to-[#17b517]" },
    { name: "Monitors & Smart TVs 4K HDR", desc: "Don't bottleneck your graphics. Experience true HDR lighting in Vice City.", tag: "Display", color: "from-[#ff007f] to-[#00ffff]" },
  ],
  digital: [
    { name: "PSN Card $50 / $100", desc: "Top up your wallet for GTA VI pre-orders or Shark Cards without credit cards.", tag: "PS Store", color: "from-[#00439C] to-[#00439C]/50" },
    { name: "Xbox Live Gift Card", desc: "Instantly add funds to your Xbox account. Secure and fast delivery.", tag: "Xbox", color: "from-[#107C10] to-[#107C10]/50" },
  ],
  peripherals: [
    { name: "Low-Latency Headsets (Meta-RP)", desc: "Hear approaching police sirens before you see them. Crucial for serious Roleplay.", tag: "Audio", color: "from-[#ff007f] to-[#ff5252]" },
    { name: "Ergonomic Chairs", desc: "For those 12-hour server grinds. Keep your posture perfect while conquering the city.", tag: "Comfort", color: "from-[#00ffff] to-[#0080ff]" },
  ]
}

export default function GearPage() {
  return (
    <div className="min-h-screen pt-28 px-4 pb-20 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ffff]/30 bg-[#00ffff]/5 text-[#00ffff] text-xs font-black tracking-widest uppercase mb-6">
            <ShieldCheck size={14} /> Official Recommendations
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Leonida Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00ffff]">Gear</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Ensure your setup is ready for the next generation. From raw hardware power to the best Roleplay peripherals, these are our top picks for dominating Vice City.
          </p>
        </div>

        {/* Section 1: Hardware */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff007f] to-[#ff5252] flex items-center justify-center shadow-lg shadow-[#ff007f]/20">
              <Monitor size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white">Recommended Hardware</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {affiliateData.hardware.map((item) => (
              <AffiliateCard key={item.name} item={item} />
            ))}
          </div>
        </section>

        {/* Section 2: Digital Balance */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ffff] to-[#0080ff] flex items-center justify-center shadow-lg shadow-[#00ffff]/20">
              <CreditCard size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white">Digital Prepaid Balance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {affiliateData.digital.map((item) => (
              <AffiliateCard key={item.name} item={item} />
            ))}
          </div>
        </section>

        {/* Section 3: Peripherals */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd740] to-[#ff9100] flex items-center justify-center shadow-lg shadow-[#ffd740]/20">
              <Headphones size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white">Roleplay Peripherals</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {affiliateData.peripherals.map((item) => (
              <AffiliateCard key={item.name} item={item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

function AffiliateCard({ item }: { item: any }) {
  return (
    <div className="group bg-[#121216] border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity`} />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-widest border border-white/5 group-hover:text-white transition-colors">
          {item.tag}
        </span>
        <Zap size={16} className="text-white/20 group-hover:text-[#00ffff] transition-colors" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3 relative z-10">{item.name}</h3>
      <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1 relative z-10">
        {item.desc}
      </p>

      <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all relative z-10 border border-white/5 hover:border-white/20">
        <ShoppingCart size={16} /> View Options
      </button>
    </div>
  )
}
