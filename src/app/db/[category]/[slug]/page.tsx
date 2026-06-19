import { notFound } from "next/navigation"
import { DATABASE_ENTRIES, getEntryBySlug } from "@/lib/databaseData"
import type { Metadata } from "next"
import { StatusBadge } from "@/components/DbSearchBar"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export async function generateStaticParams() {
  return DATABASE_ENTRIES.map((entry) => ({
    category: entry.category,
    slug: entry.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = getEntryBySlug(slug)
  if (!entry) return { title: "Not Found" }
  
  const title = `${entry.name} - Guide & Stats | Leonida Database`
  
  return {
    title,
    description: entry.description,
    openGraph: {
      title,
      description: entry.description,
      images: [`https://leonidacitizen.com/api/og-db?title=${encodeURIComponent(entry.name)}&category=${encodeURIComponent(entry.category)}&status=${encodeURIComponent(entry.confirmation_status)}`]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: entry.description,
      images: [`https://leonidacitizen.com/api/og-db?title=${encodeURIComponent(entry.name)}&category=${encodeURIComponent(entry.category)}&status=${encodeURIComponent(entry.confirmation_status)}`]
    }
  }
}

export default async function DatabaseEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = getEntryBySlug(slug)
  
  if (!entry) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-28 px-4 pb-20 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <Link href="/db" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Database
        </Link>
        
        <div className="bg-[#121216] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background glow based on category */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-[#00ffff] to-[#ff007f] opacity-10 blur-[60px]" />
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60 uppercase tracking-widest">
                {entry.category}
              </span>
              <StatusBadge status={entry.confirmation_status} />
              <span className="text-white/30 text-sm font-mono">ID: {entry.id}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8">{entry.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-white/80 mb-4 border-b border-white/10 pb-2">Overview</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  {entry.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white/80 mb-4 border-b border-white/10 pb-2">Specs</h3>
                <ul className="space-y-4">
                  {entry.manufacturer && (
                    <li>
                      <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Manufacturer</div>
                      <div className="text-white font-medium">{entry.manufacturer}</div>
                    </li>
                  )}
                  {entry.vehicle_class && (
                    <li>
                      <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Class</div>
                      <div className="text-white font-medium">{entry.vehicle_class}</div>
                    </li>
                  )}
                  {entry.weapon_type && (
                    <li>
                      <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Type</div>
                      <div className="text-white font-medium">{entry.weapon_type}</div>
                    </li>
                  )}
                  {entry.estimated_damage && (
                    <li>
                      <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Damage</div>
                      <div className="text-white font-medium">{entry.estimated_damage}</div>
                    </li>
                  )}
                  {entry.district && (
                    <li>
                      <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">District</div>
                      <div className="text-white font-medium">{entry.district}</div>
                    </li>
                  )}
                  {entry.zone_type && (
                    <li>
                      <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Zone Type</div>
                      <div className="text-white font-medium">{entry.zone_type}</div>
                    </li>
                  )}
                  <li>
                    <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Date Logged</div>
                    <div className="text-white font-medium">{new Date(entry.date_added).toLocaleDateString()}</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 bg-[#16161b] rounded-2xl border border-white/5">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="text-[#00ffff]">ℹ️</span> Editor's Note
              </h3>
              <p className="text-white/50 text-sm">
                This information was last verified on {new Date(entry.date_added).toLocaleDateString()}. As Grand Theft Auto VI is still in active development by Rockstar Games, {entry.confirmation_status === "confirmed" ? "some details may change prior to release despite being officially confirmed." : "this leaked/speculated information is subject to change and should not be considered final."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
