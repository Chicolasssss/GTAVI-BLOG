"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { ChevronUp, MessageSquare, Clock, User } from "lucide-react"
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
    }
  }

  if (posts.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-white/30 text-lg">No posts yet.</p>
        <a
          href="/foro/nuevo"
          className="inline-flex items-center gap-2 mt-4 text-[#ff007f] hover:underline text-sm"
        >
          Be the first to create one
        </a>
      </div>
    )
  }

  return (
    <>
      {posts.map((post) => (
        <a
          key={post.id}
          href={`/foro/${post.id}`}
          className="glass rounded-2xl p-5 flex gap-4 hover:border-[#ff007f]/30 transition-all group"
        >
          <div className="flex flex-col items-center gap-0.5 min-w-[48px]">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleVote(post.id)
              }}
              className="p-1.5 rounded-lg text-white/30 hover:text-[#ff007f] hover:bg-[#ff007f]/10 transition-all"
            >
              <ChevronUp size={20} />
            </button>
            <span className="text-sm font-bold text-white/70">{post.upvotes}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-widest text-[#ff007f]/60 font-semibold">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
            </div>
            <h2 className="text-white font-semibold text-lg mt-0.5 group-hover:text-[#ff007f] transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="text-white/40 text-sm mt-1 line-clamp-2">
              {post.content || "No content"}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <User size={12} /> {post.author_name}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {timeAgo(post.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={12} /> 0
              </span>
            </div>
          </div>
        </a>
      ))}
    </>
  )
}
