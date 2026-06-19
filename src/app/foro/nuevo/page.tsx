"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signIn } from "next-auth/react"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { createPost } from "@/app/actions/forum"
import { useToast } from "@/components/Toast"

const CATEGORIES = [
  { value: "general", label: "Discusión General" },
  { value: "roleplay", label: "Roleplay" },
  { value: "coches", label: "Mecánica / Coches" },
  { value: "salseo", label: "Salseo / Noticias" },
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
          <p className="text-white/60 mb-4">Debes iniciar sesión para publicar</p>
          <button
            onClick={() => signIn("discord")}
            className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm"
          >
            Entrar con Discord
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
      toast("success", "Publicación creada")
      router.push(`/foro/${res.id}`)
    } else {
      toast("error", res.error ?? "Error al publicar")
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/foro"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition"
        >
          <ArrowLeft size={16} /> Volver al foro
        </Link>

        <h1 className="text-2xl md:text-3xl font-black gradient-text mb-8">
          Nueva Publicación
        </h1>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-white/60 text-sm font-medium mb-1.5 block">Categoría</label>
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
            <label className="text-white/60 text-sm font-medium mb-1.5 block">Título</label>
            <input
              name="title"
              required
              maxLength={120}
              placeholder="Ej: ¿El jetpack existe en GTA VI?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all"
            />
          </div>

          <div>
            <label className="text-white/60 text-sm font-medium mb-1.5 block">Contenido</label>
            <textarea
              name="content"
              rows={6}
              placeholder="Escribe tu mensaje..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all resize-y"
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
            {submitting ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </div>
    </div>
  )
}
