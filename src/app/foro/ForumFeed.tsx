"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { MessageSquare, ArrowBigUp, Eye, Clock, MessageCircle } from "lucide-react"
import { toggleUpvote, getPostsList } from "@/app/actions/forum"
import { useToast } from "@/components/Toast"
import Link from "next/link"

type Post = {
  id: number
  title: string
  category: string
  upvotes: number
  author_name: string
  created_at: string
  hasVoted?: boolean
}

const CATEGORY_COLORS: Record<string, string> = {
  general: "#00ffff",
  roleplay: "#ff007f",
  scripts: "#ffd740",
  server: "#69f0ae",
  offtopic: "#b388ff",
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "1m"
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d`
  return new Date(date).toLocaleDateString()
}

function getAvatarProps(name: string) {
  const colors = ["#ff007f", "#00ffff", "#ffd740", "#69f0ae", "#b388ff"]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = colors[Math.abs(hash) % colors.length]
  const initial = name.charAt(0).toUpperCase()
  return { color, initial }
}

export default function ForumFeed({ category }: { category?: string }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState<Set<number>>(new Set())

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    
    getPostsList(category).then((res) => {
      if (!isMounted) return
      if (res.ok) {
        setPosts(res.posts)
      } else {
        toast("error", res.error || "Failed to load posts")
      }
      setLoading(false)
    })

    return () => { isMounted = false }
  }, [category, toast])

  const handleVote = async (postId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!session) return toast("error", "You must log in to vote")
    if (voting.has(postId)) return
    
    // Prevent spam clicking while request is pending
    setVoting((prev) => new Set(prev).add(postId))

    // 0.00ms Optimistic UI Update
    setPosts((prev) => prev.map((p) => {
      if (p.id !== postId) return p
      const isCurrentlyVoted = !!p.hasVoted
      return {
        ...p,
        upvotes: p.upvotes + (isCurrentlyVoted ? -1 : 1),
        hasVoted: !isCurrentlyVoted
      }
    }))

    // Background server request
    const res = await toggleUpvote(postId)
    
    // Remove from voting set
    setVoting((prev) => {
      const next = new Set(prev)
      next.delete(postId)
      return next
    })

    if (!res.ok) {
      toast("error", "Failed to vote")
      // Revert if server failed
      setPosts((prev) => prev.map((p) => {
        if (p.id !== postId) return p
        const wasVotedBeforeClick = !p.hasVoted
        return {
          ...p,
          upvotes: p.upvotes + (wasVotedBeforeClick ? 1 : -1),
          hasVoted: wasVotedBeforeClick
        }
      }))
    } else {
      // Sync exact state from server just in case
      if (res.hasVoted !== undefined) {
        setPosts((prev) => prev.map((p) => {
          if (p.id !== postId) return p
          if (p.hasVoted !== res.hasVoted) {
            return {
              ...p,
              upvotes: p.upvotes + (res.hasVoted ? 1 : -1),
              hasVoted: res.hasVoted
            }
          }
          return p
        }))
      }
    }
  }

  if (loading) {
    return (
      <div className="w-full bg-[#121216] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex px-6 py-4 border-b border-white/5 bg-[#16161b] text-xs font-bold text-white/40 uppercase tracking-widest">
          <div className="flex-1">Topic</div>
          <div className="w-20 text-center hidden md:block">Replies</div>
          <div className="w-20 text-center hidden md:block">Views</div>
          <div className="w-24 text-right">Activity</div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center px-6 py-4 border-b border-white/5 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-white/5 shrink-0 mr-4"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
              <div className="h-3 bg-white/5 rounded w-1/4"></div>
            </div>
            <div className="w-20 hidden md:flex justify-center"><div className="h-4 w-6 bg-white/5 rounded"></div></div>
            <div className="w-20 hidden md:flex justify-center"><div className="h-4 w-8 bg-white/5 rounded"></div></div>
            <div className="w-24 flex justify-end"><div className="h-4 w-10 bg-white/5 rounded"></div></div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-[#121216] border border-white/5 rounded-2xl p-12 text-center shadow-2xl">
        <MessageSquare size={48} className="mx-auto text-white/10 mb-4" />
        <p className="text-white/40 text-lg font-medium">No topics found in this category.</p>
        <Link
          href="/foro/nuevo"
          className="inline-flex items-center gap-2 mt-4 text-[#00ffff] hover:text-white transition-colors font-medium text-sm"
        >
          Be the first to create one →
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#121216] border border-white/5 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      {/* Table Header */}
      <div className="flex px-6 py-4 border-b border-white/10 bg-[#16161b] text-xs font-bold text-white/40 uppercase tracking-widest items-center">
        <div className="flex-1">Topic</div>
        <div className="w-16 text-center shrink-0">Votes</div>
        <div className="w-20 text-center shrink-0 hidden md:block">Replies</div>
        <div className="w-20 text-center shrink-0 hidden md:block">Views</div>
        <div className="w-24 text-right shrink-0">Activity</div>
      </div>

      {/* Topics List */}
      <div className="flex flex-col">
        {posts.map((post) => {
          const catColor = CATEGORY_COLORS[post.category] || "#ffffff"
          const avatar = getAvatarProps(post.author_name)
          
          // Mock data for discourse style
          const viewsCount = Math.floor(post.upvotes * 14.5) + 12
          const repliesCount = Math.floor(post.upvotes * 2.3)

          return (
            <Link
              key={post.id}
              href={`/foro/${post.id}`}
              className="flex items-center px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
            >
              {/* Author Avatar */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-4 font-bold text-black text-sm shadow-inner"
                style={{ backgroundColor: avatar.color }}
              >
                {avatar.initial}
              </div>

              {/* Topic Info */}
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-base font-semibold text-white/90 group-hover:text-white mb-1 truncate leading-tight transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-2 text-xs">
                  <span 
                    className="inline-flex items-center px-2 py-0.5 rounded font-black uppercase tracking-wider shadow-sm"
                    style={{ backgroundColor: `${catColor}15`, color: catColor, fontSize: '10px' }}
                  >
                    {post.category}
                  </span>
                  <span className="text-white/30 hidden sm:inline">•</span>
                  <span className="text-white/40 truncate hidden sm:inline">
                    by <span className="font-medium text-white/60">{post.author_name}</span>
                  </span>
                </div>
              </div>

              {/* Votes Column */}
              <div className="w-16 flex justify-center shrink-0">
                <button
                  onClick={(e) => handleVote(post.id, e)}
                  disabled={voting.has(post.id)}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${post.hasVoted ? 'bg-[#ff007f]/10' : 'hover:bg-white/5'}`}
                >
                  <ArrowBigUp 
                    size={18} 
                    className={`transition-colors duration-300 ${voting.has(post.id) ? 'opacity-50' : ''} ${post.hasVoted ? 'text-[#ff007f]' : 'text-white/30'}`} 
                  />
                  <span className={`text-xs font-bold transition-colors duration-300 ${post.hasVoted ? 'text-[#ff007f]' : 'text-white/50'}`}>
                    {post.upvotes}
                  </span>
                </button>
              </div>

              {/* Replies Column */}
              <div className="w-20 hidden md:flex flex-col items-center justify-center shrink-0 text-white/40">
                <span className="text-sm font-bold text-white/70">{repliesCount}</span>
              </div>

              {/* Views Column */}
              <div className="w-20 hidden md:flex flex-col items-center justify-center shrink-0 text-white/30">
                <span className="text-sm font-medium">{viewsCount}</span>
              </div>

              {/* Activity Column */}
              <div className="w-24 flex justify-end shrink-0 text-xs font-medium text-white/50">
                <span className="bg-white/5 px-2 py-1 rounded whitespace-nowrap">
                  {timeAgo(post.created_at)}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
