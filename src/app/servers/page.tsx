"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Server, ArrowBigUp, ExternalLink, Users, Globe, Plus, ShieldCheck } from "lucide-react"
import { toggleUpvote, getPostsList, createPost } from "@/app/actions/forum"
import { motion } from "framer-motion"

type RoleplayServer = {
  id: number
  title: string
  content: string
  category: string
  upvotes: number
  author_name: string
  created_at: string
}

export default function ServersPage() {
  const { data: session } = useSession()
  const [servers, setServers] = useState<RoleplayServer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchServers = async () => {
    setIsLoading(true)
    const res = await getPostsList("server")
    if (res.ok && res.posts) {
      // Sort by upvotes for the ranking
      const sorted = (res.posts as RoleplayServer[]).sort((a, b) => b.upvotes - a.upvotes)
      setServers(sorted)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchServers()
  }, [])

  const handleUpvote = async (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    if (!session) return alert("You must be signed in to vote.")
    
    // Optimistic UI
    setServers(servers.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p).sort((a, b) => b.upvotes - a.upvotes))
    await toggleUpvote(id)
    fetchServers() // Re-sync
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session) return alert("You must be signed in.")
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.append("category", "server")
    
    const res = await createPost(formData)
    setIsSubmitting(false)
    if (res.ok) {
      setShowUpload(false)
      fetchServers()
    } else {
      alert(res.error)
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff007f]/10 border border-[#ff007f]/20 text-[#ff007f] text-xs font-medium mb-4 uppercase tracking-widest">
            <Server size={14} /> Server List
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Roleplay <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#ff5252]">Ranking</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg mb-8">
            Vote for your favorite servers. The top-ranked communities will be officially recommended for GTA VI.
          </p>

          {session ? (
            <button 
              onClick={() => setShowUpload(!showUpload)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff007f] to-[#ff5252] text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all"
            >
              <Plus size={20} /> {showUpload ? "Cancel Registration" : "Register Your Server"}
            </button>
          ) : (
            <div className="text-white/30 text-sm">Sign in to register your server or vote for your favorite community.</div>
          )}
        </div>

        {showUpload && session && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit} 
            className="bg-[#121216] border border-[#ff007f]/20 rounded-3xl p-8 mb-12 shadow-[0_0_40px_rgba(255,0,127,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff007f] to-[#00ffff]" />
            <h3 className="text-2xl font-bold text-white mb-6">Register Server</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Server Name</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="e.g. Los Santos Roleplay" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#ff007f] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Discord / Connect IP</label>
                <input 
                  type="text" 
                  name="content_meta" 
                  placeholder="discord.gg/yourserver" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#ff007f] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Description & Features</label>
              <textarea 
                name="content" 
                placeholder="What makes your server unique? Mention frameworks, economy type (Serious/Soft), and whitelist status." 
                rows={4}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#ff007f] outline-none transition-colors"
              />
            </div>
            
            <button 
              disabled={isSubmitting}
              className="w-full bg-white text-black font-black uppercase tracking-wider py-4 rounded-xl hover:bg-[#ff007f] hover:text-white transition-colors"
            >
              {isSubmitting ? "Processing..." : "Publish to Ranking"}
            </button>
          </motion.form>
        )}

        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-12 text-white/30 animate-pulse">Loading ranking...</div>
          )}

          {!isLoading && servers.length === 0 && (
            <div className="text-center py-12 text-white/30 border border-white/5 rounded-3xl bg-[#121216]">
              No servers registered yet. Be the first to secure the #1 spot!
            </div>
          )}

          {!isLoading && servers.map((server, index) => (
            <motion.div 
              key={server.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col md:flex-row items-center gap-6 p-6 bg-[#121216] border border-white/5 rounded-3xl hover:border-white/20 transition-all relative overflow-hidden"
            >
              {/* Rank Position */}
              <div className={`absolute top-0 left-0 w-2 h-full ${index === 0 ? 'bg-[#ffd740]' : index === 1 ? 'bg-zinc-300' : index === 2 ? 'bg-[#b08d57]' : 'bg-transparent'}`} />
              
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-16 text-center">
                  <div className="text-3xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                    #{index + 1}
                  </div>
                </div>

                <button 
                  onClick={(e) => handleUpvote(e, server.id)}
                  className="flex flex-col items-center justify-center hover:bg-white/5 rounded-2xl p-3 transition-colors cursor-pointer w-20 bg-black/30 border border-transparent hover:border-[#00e676]/30 group/vote"
                >
                  <ArrowBigUp size={28} className="text-white/30 group-hover/vote:text-[#00e676] group-hover/vote:-translate-y-1 transition-all" />
                  <span className="font-bold text-white text-lg group-hover/vote:text-[#00e676]">{server.upvotes}</span>
                </button>
              </div>

              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <a href={`/foro/${server.id}`} className="text-2xl font-black text-white hover:text-[#00ffff] transition-colors truncate">
                    {server.title}
                  </a>
                  {index === 0 && <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#ffd740]/20 text-[#ffd740] border border-[#ffd740]/30"><ShieldCheck size={12} className="inline mr-1"/> Top #1</span>}
                </div>
                
                <p className="text-white/50 text-sm line-clamp-2 mb-4">
                  {server.content}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white/40 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Globe size={14} className="text-[#00ffff]"/> Region: ES/LATAM
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white/40 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Users size={14} className="text-[#ff007f]"/> Admin: {server.author_name}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto mt-4 md:mt-0 shrink-0">
                <a 
                  href={`/foro/${server.id}`} 
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors border border-white/10"
                >
                  <ExternalLink size={18} /> Join Discord
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
