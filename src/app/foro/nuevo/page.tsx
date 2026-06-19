"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signIn } from "next-auth/react"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { createPost } from "@/app/actions/forum"
import { useToast } from "@/components/Toast"

const CATEGORIES = [
  { value: "general", label: "General Discussion" },
  { value: "roleplay", label: "Roleplay" },
  { value: "scripts", label: "Scripts & Dev" },
  { value: "server", label: "Servers" },
  { value: "offtopic", label: "Off-Topic" },
]

export default function NewPostPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  if (!session) {
    return (
      <div className="min-h-screen pt-24 px-4 pb-20 flex items-center justify-center">
        <div className="glass rounded-2xl p-10 text-center max-w-md">
          <p className="text-white/60 mb-4">You must log in to post</p>
          <button
            onClick={() => signIn("discord")}
            className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm"
          >
            Login with Discord
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const res = await createPost(fd)
    setSubmitting(false)

    if (res.ok && res.id) {
      toast("success", "Post created")
      router.push(`/foro/${res.id}`)
    } else {
      toast("error", res.error ?? "Error creating post")
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/foro"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition"
        >
          <ArrowLeft size={16} /> Back to forum
        </Link>

        <h1 className="text-2xl md:text-3xl font-black gradient-text mb-8">
          New Post
        </h1>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-white/60 text-sm font-medium mb-1.5 block">Category</label>
            <select
              name="category"
              defaultValue="general"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white outline-none focus:border-[#ff007f] transition-all appearance-none cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-[#0a0a0f]">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white/60 text-sm font-medium mb-1.5 block">Title</label>
            <input
              name="title"
              required
              maxLength={120}
              placeholder="e.g. Does the jetpack exist in GTA VI?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white/60 text-sm font-semibold">Content</label>
            <div className="flex items-center gap-2 mb-2 text-xs text-white/40 bg-white/5 p-2 rounded-lg">
              <span className="font-bold text-white/60">Markdown Supported:</span>
              <span>**bold**</span>
              <span>*italic*</span>
              <span className="font-mono bg-black/50 px-1 rounded">```code```</span>
              <span>[link](url)</span>
            </div>
            <textarea
              name="content"
              required
              rows={8}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#00ffff] transition-all font-mono text-sm"
              placeholder="What's on your mind? You can use Markdown to format your text."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
            {submitting ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  )
}
