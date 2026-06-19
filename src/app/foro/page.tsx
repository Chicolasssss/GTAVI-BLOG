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
  { slug: "scripts", label: "Scripts & Dev", icon: "💻" },
  { slug: "server", label: "Servers", icon: "🌐" },
  { slug: "offtopic", label: "Off-Topic", icon: "☕" },
] as const

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

          <main className="flex-1 min-w-0">
            <ForumFeed category={cat} />
          </main>
        </div>
      </div>
    </div>
  )
}
