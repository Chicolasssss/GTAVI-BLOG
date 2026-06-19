"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { ArrowBigUp, MessageSquare, Clock, User } from "lucide-react"
import { toggleUpvote } from "@/app/actions/forum"
import { useToast } from "@/components/Toast"

type Post = {
  id: number
  title: string
  content: string
  category: string
  upvotes: number
  author_name: string
  created_at: string
}

const CATEGORY_LABELS: Record<string, string> = {
  general: "General Discussion",
  roleplay: "Roleplay",
  coches: "Mechanics / Cars",
  salseo: "News / Rumors",
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(date).toLocaleDateString()
}

export default function ForumFeed({ posts: initial }: { posts: Post[] }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [posts, setPosts] = useState(initial)
  const [voting, setVoting] = useState<Set<number>>(new Set())

  const handleVote = async (postId: number) => {
    if (!session) return toast("error", "You must log in to vote")
    if (voting.has(postId)) return
    setVoting((prev) => new Set(prev).add(postId))

    const res = await toggleUpvote(postId)
    setVoting((prev) => {
      const next = new Set(prev)
      next.delete(postId)
      return next
    })

    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, upvotes: p.upvotes + (p.upvotes % 2 === 0 ? 1 : -1) } : p
        )
      )
    } else {
      toast("error", "Failed to vote. Try again.")
    }
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white/5 rounded-2xl p-12 text-center border border-white/10">
        <p className="text-white/40 text-lg font-medium">No posts found in this section.</p>
        <a
          href="/foro/nuevo"
          className="inline-flex items-center gap-2 mt-4 text-[#00ffff] hover:text-white transition-colors font-medium text-sm"
        >
          Be the first to create one →
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <a
          key={post.id}
          href={`/foro/${post.id}`}
          className="bg-[#121216] border border-white/5 rounded-xl flex hover:border-white/20 transition-all cursor-pointer overflow-hidden group"
        >
          {/* Vote Column */}
          <div className="w-12 bg-[#0a0a0f] flex flex-col items-center py-3 gap-1 shrink-0 border-r border-white/5">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleVote(post.id)
              }}
              className="text-white/30 hover:text-[#ff4500] hover:bg-white/5 p-1 rounded transition-colors"
            >
              <ArrowBigUp size={24} strokeWidth={1.5} />
            </button>
            <span className="text-sm font-bold text-white/90">{post.upvotes}</span>
          </div>

          {/* Content Column */}
          <div className="p-3 pl-4 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-white/50 mb-1.5">
              <span className="font-bold text-white/80 hover:underline">
                t/{post.category}
              </span>
              <span>•</span>
              <span>Posted by <span className="hover:text-white transition-colors">u/{post.author_name}</span></span>
              <span>•</span>
              <span>{timeAgo(post.created_at)}</span>
            </div>
            
            <h2 className="text-lg font-semibold text-white/90 leading-snug mb-1 group-hover:text-white">
              {post.title}
            </h2>
            
            <p className="text-sm text-white/60 line-clamp-3 mb-3 leading-relaxed">
              {post.content || "No text content"}
            </p>
            
            <div className="flex items-center gap-4 text-xs font-bold text-white/40">
              <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-1.5 rounded transition-colors">
                <MessageSquare size={16} />
                <span>Comments</span>
              </div>
              <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-1.5 rounded transition-colors">
                <span>Share</span>
              </div>
              <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-1.5 rounded transition-colors">
                <span>Save</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
