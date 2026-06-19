import { supabaseAdmin } from "@/lib/supabase"
import ForumFeed from "./ForumFeed"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Forum",
  description: "Join the GTA VI community discussion — the voice of Leonida.",
}

const CATEGORIES = [
  { slug: "general", label: "General Discussion", icon: "💬" },
  { slug: "roleplay", label: "Roleplay", icon: "🎭" },
  { slug: "coches", label: "Mechanics / Cars", icon: "🏎️" },
  { slug: "salseo", label: "News / Rumors", icon: "🔥" },
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

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const posts = await getPosts(cat)

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black gradient-text">
              Citizen Forum
            </h1>
            <p className="text-white/40 text-sm mt-1">
              The voice of Leonida — discussions, news, and community
            </p>
          </div>
          <a
            href="/foro/nuevo"
            className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all"
          >
            + New Post
          </a>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
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
                📋 All categories
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

          <main className="flex-1 space-y-3">
            <ForumFeed posts={posts} />
          </main>
        </div>
      </div>
    </div>
  )
}
