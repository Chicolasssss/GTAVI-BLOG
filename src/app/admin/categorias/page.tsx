"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Loader2 } from "lucide-react"
import { createCategory, deleteCategory, getCategories } from "@/app/actions/categories"
import { useToast } from "@/components/Toast"

type Category = {
  id: number
  name: string
  slug: string
  description: string
  color_hex: string
}

const ADMIN_IDS = ["343975648157827083"]

export default function AdminCategoriasPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    if (!session?.user?.id || !ADMIN_IDS.includes(session.user.id)) {
      setLoading(false)
      return
    }
    getCategories().then((data) => {
      setCategories(data)
      setLoading(false)
    })
  }, [session])

  if (!session?.user?.id || !ADMIN_IDS.includes(session.user.id)) {
    return (
      <div className="min-h-screen pt-24 px-4 pb-20 flex items-center justify-center">
        <div className="glass rounded-2xl p-10 text-center max-w-md">
          <p className="text-white/40">Acceso restringido a administradores</p>
        </div>
      </div>
    )
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const res = await createCategory(fd)
    setSubmitting(false)
    if (res.ok) {
      toast("success", "Categoría creada")
      setModalOpen(false)
      const updated = await getCategories()
      setCategories(updated)
    } else {
      toast("error", res.error ?? "Error")
    }
  }

  const handleDelete = async (id: number) => {
    setDeleting(id)
    const res = await deleteCategory(id)
    setDeleting(null)
    if (res.ok) {
      toast("success", "Categoría eliminada")
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } else {
      toast("error", res.error ?? "Error")
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black gradient-text">Categorías del Foro</h1>
            <p className="text-white/40 text-sm mt-1">Gestiona las categorías disponibles en el foro</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all"
          >
            <Plus size={18} /> Crear Categoría
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="animate-spin text-white/20" />
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-white/40 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">ID</th>
                  <th className="text-left px-5 py-3 font-medium">Nombre</th>
                  <th className="text-left px-5 py-3 font-medium">Slug</th>
                  <th className="text-left px-5 py-3 font-medium">Descripción</th>
                  <th className="text-left px-5 py-3 font-medium">Color</th>
                  <th className="text-right px-5 py-3 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 text-white/30 font-mono text-xs">{cat.id}</td>
                    <td className="px-5 py-3 text-white font-medium">{cat.name}</td>
                    <td className="px-5 py-3 text-white/40 font-mono text-xs">{cat.slug}</td>
                    <td className="px-5 py-3 text-white/40 text-xs max-w-[200px] truncate">{cat.description}</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                        style={{ color: cat.color_hex, backgroundColor: `${cat.color_hex}15` }}
                      >
                        {cat.color_hex}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        disabled={deleting === cat.id}
                        className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-30"
                      >
                        {deleting === cat.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-white/20 text-sm">
                      No hay categorías todavía
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="glass rounded-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">Nueva Categoría</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-white/60 text-xs font-medium mb-1 block">Nombre</label>
                <input name="name" required maxLength={40} placeholder="Ej: Tutoriales" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-11 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all text-sm" />
              </div>
              <div>
                <label className="text-white/60 text-xs font-medium mb-1 block">Slug</label>
                <input name="slug" required maxLength={40} placeholder="Ej: tutoriales" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-11 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all text-sm" />
              </div>
              <div>
                <label className="text-white/60 text-xs font-medium mb-1 block">Descripción</label>
                <input name="description" maxLength={200} placeholder="Breve descripción..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-11 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all text-sm" />
              </div>
              <div>
                <label className="text-white/60 text-xs font-medium mb-1 block">Color Hexadecimal</label>
                <div className="flex gap-3 items-center">
                  <input name="color_hex" type="color" defaultValue="#ff007f" className="w-11 h-11 rounded-xl border border-white/10 bg-transparent cursor-pointer" />
                  <input name="color_hex_text" defaultValue="#ff007f" placeholder="#ff007f" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 h-11 text-white placeholder:text-white/20 outline-none focus:border-[#ff007f] transition-all text-sm font-mono" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 h-11 rounded-xl border border-white/10 text-white/50 text-sm font-medium hover:bg-white/5 transition-all">Cancelar</button>
                <button type="submit" disabled={submitting} className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
