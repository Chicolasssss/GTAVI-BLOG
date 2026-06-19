"use client"

import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, ChevronUp, User, Clock, Send, Loader2,
} from "lucide-react"
import Link from "next/link"
import { toggleUpvote, addComment } from "@/app/actions/forum"
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

type Comment = {
  id: number
  content: string
  author_name: string
  created_at: string
}

const CATEGORY_LABELS: Record<string, string> = {
  general: "Discusión General",
  roleplay: "Roleplay",
  coches: "Mecánica / Coches",
  salseo: "Salseo / Noticias",
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "ahora"
  if (mins < 60) return `hace ${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `hace ${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `hace ${days}d`
  return new Date(date).toLocaleDateString()
}

export default function PostDetail({
  post,
  comments: initialComments,
  categoryIcon,
}: {
  post: Post
  comments: Comment[]
  categoryIcon: string
}) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [upvotes, setUpvotes] = useState(post.upvotes)
  const [comments, setComments] = useState(initialComments)
  const [voting, setVoting] = useState(false)
  const [submittingComment, setSubmittingComment] = useState(false)
  const [commentText, setCommentText] = useState("")

  const handleVote = async () => {
    if (!session) return toast("error", "Debes iniciar sesión")
    if (voting) return
    setVoting(true)
    const res = await toggleUpvote(post.id)
    setVoting(false)
    if (res.ok) {
      setUpvotes((p) => p + (p === post.upvotes ? 1 : post.upvotes > upvotes ? -1 : 1))
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return signIn("discord")
    if (!commentText.trim()) return
    setSubmittingComment(true)
    const fd = new FormData()
    fd.set("post_id", String(post.id))
    fd.set("content", commentText)
    const res = await addComment(fd)
    setSubmittingComment(false)
    if (res.ok) {
      toast("success", "Comentario añadido")
      setCommentText("")
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: commentText,
          author_name: session.user?.name ?? "Anónimo",
          created_at: new Date().toISOString(),
        },
      ])
    } else {
      toast("error", res.error ?? "Error al comentar")
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/foro"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition"
        >
          <ArrowLeft size={16} /> Volver al foro
        </Link>

        {/* Post */}
        <article className="glass rounded-2xl p-6 md:p-8">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleVote}
                className="p-2 rounded-lg text-white/30 hover:text-[#ff007f] hover:bg-[#ff007f]/10 transition-all"
              >
                <ChevronUp size={24} />
              </button>
              <span className="text-lg font-bold text-white/80">{upvotes}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ff007f]/10 text-[#ff007f]/80 font-medium">
                  {categoryIcon} {CATEGORY_LABELS[post.category] ?? post.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                <span className="flex items-center gap-1"><User size={13} /> {post.author_name}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {timeAgo(post.created_at)}</span>
              </div>

              {post.content && (
                <div className="mt-5 text-white/70 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                  {post.content}
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Comments */}
        <section className="mt-8">
          <h2 className="text-white font-semibold text-lg mb-4">
            Comentarios ({comments.length})
          </h2>

          {session ? (
            <form onSubmit={handleComment} className="glass rounded-2xl p-4 flex gap-3 mb-6">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escribe un comentario..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all"
              />
              <button
                type="submit"
                disabled={submittingComment || !commentText.trim()}
                className="h-12 px-5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all disabled:opacity-50"
              >
                {submittingComment ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </form>
          ) : (
            <div className="glass rounded-2xl p-4 text-center mb-6">
              <button
                onClick={() => signIn("discord")}
                className="text-[#ff007f] hover:underline text-sm"
              >
                Inicia sesión con Discord para comentar
              </button>
            </div>
          )}

          <div className="space-y-3">
            {comments.length === 0 && (
              <p className="text-white/30 text-sm text-center py-8">
                Sin comentarios. Sé el primero en responder.
              </p>
            )}
            {comments.map((c) => (
              <div key={c.id} className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs text-white/30 mb-2">
                  <User size={13} />
                  <span className="font-medium text-white/50">{c.author_name}</span>
                  <span>{timeAgo(c.created_at)}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{c.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
