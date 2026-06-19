"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Loader2, ArrowLeft } from "lucide-react"
import { getArticles, createArticle, deleteArticle } from "@/app/actions/news"
import { useToast } from "@/components/Toast"
import Link from "next/link"

const ADMIN_IDS = ["343975648157827083", "3680e25d-3e9a-4846-83ea-4dbbe6ff8f89"]

export default function AdminNewsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    if (!session?.user?.id || !ADMIN_IDS.includes(session.user.id)) {
      setLoading(false)
      return
    }
    getArticles().then((data) => {
      setArticles(data)
      setLoading(false)
    })
  }, [session])

  if (!session?.user?.id || !ADMIN_IDS.includes(session.user.id)) {
    return (
      <div className="min-h-screen pt-24 px-4 pb-20 flex items-center justify-center">
        <div className="glass rounded-2xl p-10 text-center max-w-md border border-red-500/30">
          <p className="text-white/80 font-bold mb-4">Acceso restringido a administradores</p>
          <p className="text-white/40 text-sm">Tu ID actual de Discord/Google es:</p>
          <div className="bg-black/50 p-3 rounded-lg mt-2 font-mono text-[#00ffff] select-all border border-white/5">
            {session?.user?.id || "No detectado"}
          </div>
          <p className="text-white/30 text-xs mt-4">Pásale este ID al sistema para que te dé acceso.</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const res = await createArticle(fd)
    setSubmitting(false)

    if (res.ok) {
      toast("success", "Noticia creada correctamente")
      setModalOpen(false)
      setArticles((prev) => [res.data, ...prev])
    } else {
      toast("error", res.error ?? "Error al crear la noticia")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres borrar esta noticia?")) return
    setDeleting(id)
    const res = await deleteArticle(id)
    if (res.ok) {
      toast("success", "Noticia borrada")
      setArticles((prev) => prev.filter((a) => a.id !== id))
    } else {
      toast("error", res.error ?? "Error al borrar")
    }
    setDeleting(null)
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin/categorias" className="text-white/40 hover:text-white mb-2 inline-block text-sm">
              <ArrowLeft size={16} className="inline mr-1" /> Back to Categories (Admin)
            </Link>
            <h1 className="text-3xl font-bold text-white">Manage News</h1>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff007f] text-white rounded-lg font-bold hover:bg-[#ff007f]/80 transition"
          >
            <Plus size={18} /> New Article
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="animate-spin text-[#00ffff]" size={40} />
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.length === 0 ? (
              <p className="text-white/40 text-center p-10 glass rounded-xl">No articles published yet.</p>
            ) : (
              articles.map((article) => (
                <div key={article.id} className="glass rounded-xl p-6 flex justify-between items-center group">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{article.title}</h3>
                    <p className="text-sm text-white/50">/{article.slug}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(article.id)}
                    disabled={deleting === article.id}
                    className="p-3 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
                  >
                    {deleting === article.id ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Create Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#121216] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-white">Publish New Article</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">Title</label>
                  <input
                    name="title"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#ff007f]"
                    placeholder="GTA VI Trailer 2 Announced"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">Slug (URL friendly)</label>
                  <input
                    name="slug"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00ffff]"
                    placeholder="gta-vi-trailer-2-date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">Cover Image URL</label>
                  <input
                    name="image_url"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#ff007f]"
                    placeholder="https://i.imgur.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">Content (Markdown Supported)</label>
                  <textarea
                    name="content"
                    required
                    rows={10}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00ffff] font-mono text-sm"
                    placeholder="Write the article here..."
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-3 rounded-lg bg-white/5 text-white/60 font-medium hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-bold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {submitting ? "Publishing..." : "Publish Article"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
