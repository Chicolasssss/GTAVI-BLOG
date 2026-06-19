"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Code2, ArrowBigUp, Clock, Terminal, Plus } from "lucide-react"
import { toggleUpvote, getPostsList, createPost } from "@/app/actions/forum"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"

type ScriptPost = {
  id: number
  title: string
  category: string
  upvotes: number
  author_name: string
  created_at: string
}

export default function ScriptsFeed() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<ScriptPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchScripts = async () => {
    setIsLoading(true)
    const res = await getPostsList("scripts")
    if (res.ok && res.posts) {
      setPosts(res.posts as ScriptPost[])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchScripts()
  }, [])

  const handleUpvote = async (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    if (!session) return alert("You must be signed in to upvote.")
    
    // Optimistic UI
    setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
    await toggleUpvote(id)
    fetchScripts() // Re-sync
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session) return alert("You must be signed in.")
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.append("category", "scripts")
    
    const res = await createPost(formData)
    setIsSubmitting(false)
    if (res.ok) {
      setShowUpload(false)
      fetchScripts()
    } else {
      alert(res.error)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Terminal className="text-[#00ffff]" /> Community Scripts
        </h2>
        {session && (
          <button 
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 bg-[#00ffff]/10 text-[#00ffff] px-4 py-2 rounded-lg font-bold hover:bg-[#00ffff]/20 transition-colors"
          >
            <Plus size={18} /> {showUpload ? "Cancel" : "Publish Script"}
          </button>
        )}
      </div>

      {showUpload && session && (
        <form onSubmit={handleSubmit} className="bg-[#121216] border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Publish a new Script</h3>
          <input 
            type="text" 
            name="title" 
            placeholder="Script Name & Version (e.g. qb-core v2.0)" 
            required
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white mb-4 focus:border-[#00ffff] outline-none"
          />
          <textarea 
            name="content" 
            placeholder="Provide a description, features, and the GitHub/Tebex download link..." 
            rows={5}
            required
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white mb-4 focus:border-[#00ffff] outline-none"
          />
          <button 
            disabled={isSubmitting}
            className="w-full bg-[#00ffff] text-black font-bold py-3 rounded-lg hover:bg-white transition-colors"
          >
            {isSubmitting ? "Publishing..." : "Submit Script"}
          </button>
        </form>
      )}

      <div className="bg-[#121216] rounded-2xl border border-white/5 overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[auto_1fr_120px_150px] gap-4 p-4 border-b border-white/5 text-white/40 text-sm font-bold uppercase tracking-wider">
          <div className="w-16 text-center">Votes</div>
          <div>Script Name & Author</div>
          <div className="text-center">Engine</div>
          <div className="text-right">Activity</div>
        </div>

        {/* Skeleton Loader */}
        {isLoading && (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map(n => (
              <div key={n} className="flex items-center gap-4 animate-pulse">
                <div className="w-16 h-12 bg-white/5 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/5 rounded w-1/3" />
                  <div className="h-3 bg-white/5 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts */}
        {!isLoading && posts.length === 0 && (
          <div className="p-8 text-center text-white/30">
            No scripts published yet. Be the first!
          </div>
        )}

        {!isLoading && posts.map(post => (
          <div key={post.id} className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_120px_150px] gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center group">
            {/* Upvotes */}
            <button 
              onClick={(e) => handleUpvote(e, post.id)}
              className="w-16 flex flex-col items-center justify-center hover:bg-white/5 rounded-xl p-2 transition-colors cursor-pointer group/vote"
            >
              <ArrowBigUp size={24} className="text-white/30 group-hover/vote:text-[#ff007f]" />
              <span className="font-bold text-white group-hover/vote:text-[#ff007f]">{post.upvotes}</span>
            </button>

            {/* Main Info */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00ffff]/10 text-[#00ffff] uppercase tracking-wider hidden sm:inline-block">
                  Resource
                </span>
                <a href={`/foro/${post.id}`} className="text-lg font-bold text-white/90 hover:text-[#00ffff] transition-colors truncate">
                  {post.title}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff007f] to-[#00ffff] flex items-center justify-center text-white text-[10px] font-bold">
                  {post.author_name.charAt(0).toUpperCase()}
                </div>
                <span>by <span className="font-semibold text-white/60">{post.author_name}</span></span>
              </div>
            </div>

            {/* Engine */}
            <div className="hidden md:flex justify-center">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">
                <Code2 size={12} /> FiveM
              </span>
            </div>

            {/* Activity */}
            <div className="hidden md:flex flex-col items-end text-sm">
              <span className="text-white/60 flex items-center gap-1">
                <Clock size={12} className="text-white/30" /> 
                {formatDistanceToNow(new Date(post.created_at), { locale: enUS, addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
