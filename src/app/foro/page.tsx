import { Suspense } from "react"
import { supabaseAdmin, queryWithTimeout } from "@/lib/supabase"
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
  if (!db) {
    console.warn("Database not configured. Returning empty posts.")
    return null
  }
  return db
}

async function getPosts(category?: string) {
  const db = getDb()
  if (!db) return []

  try {
    const data = await queryWithTimeout(async () => {
      let query = db
        .from("posts")
        .select("id, title, content, category, upvotes, author_name, created_at")
        .order("created_at", { ascending: false })
        .limit(50)

      if (category && category !== "todo") {
        query = query.eq("category", category)
      }

      const { data, error } = await query
      if (error) throw error
      return data ?? []
    }, 4000)

    return data
  } catch (err) {
    console.error("Failed to fetch posts (timeout or error):", err)
    return []
  }
}

async function PostList({ category }: { category?: string }) {
  const posts = await getPosts(category)
  return <ForumFeed posts={posts} />
}

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams

  return (
    <div className="min-h-screen pt-24 px-4 pb-20 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Leonida Citizens
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Join the fastest growing GTA VI community
            </p>
          </div>
          <a
            href="/foro/nuevo"
            className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all shadow-md"
          >
            + Create Post
          </a>
        </div>

        <div className="flex gap-8 flex-col md:flex-row">
          <aside className="md:w-64 shrink-0">
            <nav className="space-y-1">
              <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-4">
                Feeds
              </div>
              <a
                href="/foro"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  !cat || cat === "todo"
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                🏠 Home
              </a>
              <div className="text-xs font-bold text-white/40 uppercase tracking-wider mt-6 mb-3 px-4">
                Topics
              </div>
              {CATEGORIES.map((c) => (
                <a
                  key={c.slug}
                  href={`/foro?cat=${c.slug}`}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    cat === c.slug
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-lg">{c.icon}</span> {c.label}
                </a>
              ))}
            </nav>
          </aside>

          <main className="flex-1 space-y-4">
            <Suspense
              fallback={
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/5 rounded-2xl p-5 h-32 border border-white/5"></div>
                  ))}
                </div>
              }
            >
              <PostList category={cat} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
