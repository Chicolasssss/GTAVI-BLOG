import { supabaseAdmin } from "@/lib/supabase"
import ForumFeed from "./ForumFeed"

export const dynamic = "force-dynamic"

const CATEGORIES = [
  { slug: "general", label: "Discusión General", icon: "💬" },
  { slug: "roleplay", label: "Roleplay", icon: "🎭" },
  { slug: "coches", label: "Mecánica / Coches", icon: "🏎️" },
  { slug: "salseo", label: "Salseo / Noticias", icon: "🔥" },
] as const

function getDb() {
  const db = supabaseAdmin
  if (!db) throw new Error("Database not configured")
  return db
}

async function getPosts(category?: string) {
  let query = getDb()
    .from("posts")
    .select("id, title, content, category, upvotes, author_name, created_at")
    .order("created_at", { ascending: false })
    .limit(50)

  if (category && category !== "todo") {
    query = query.eq("category", category)
  }

  const { data } = await query
  return data ?? []
}

export default async function ForoPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const posts = await getPosts(cat)

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black gradient-text">
              Foro Ciudadano
            </h1>
            <p className="text-white/40 text-sm mt-1">
              La voz de Leonida — debates, noticias y comunidad
            </p>
          </div>
          <a
            href="/foro/nuevo"
            className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all"
          >
            + Nueva Publicación
          </a>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-56 shrink-0">
            <nav className="glass rounded-2xl p-3 space-y-1">
              <a
                href="/foro"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                  !cat || cat === "todo"
                    ? "bg-[#ff007f]/15 text-[#ff007f] font-semibold"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                📋 Todas las categorías
              </a>
              {CATEGORIES.map((c) => (
                <a
                  key={c.slug}
                  href={`/foro?cat=${c.slug}`}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                    cat === c.slug
                      ? "bg-[#ff007f]/15 text-[#ff007f] font-semibold"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {c.icon} {c.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Feed */}
          <main className="flex-1 space-y-3">
            <ForumFeed posts={posts} />
          </main>
        </div>
      </div>
    </div>
  )
}
