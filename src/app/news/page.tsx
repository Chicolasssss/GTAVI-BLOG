import { getArticles } from "@/app/actions/news"
import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"

export const revalidate = 60 // Revalidate every minute

export const metadata = {
  title: "News & Updates — Leonida Hub",
  description: "Latest news, leaks and official updates about the Grand Theft Auto VI universe.",
}

export default async function NewsFeedPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00ffff]">LEONIDA</span> NEWS
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            All the latest news, leaks, and official development updates from the GTA VI universe.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="glass rounded-3xl p-20 text-center border-dashed">
            <p className="text-white/40 text-xl font-medium">Coming soon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group glass rounded-3xl overflow-hidden hover:border-[#00ffff]/50 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-video w-full relative overflow-hidden bg-[#121216]">
                  {article.image_url ? (
                    <img 
                      src={article.image_url} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#ff007f]/20 to-[#00ffff]/20 flex items-center justify-center">
                      <span className="text-white/20 font-black text-2xl tracking-widest uppercase">LEONIDA HUB</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/10">
                      News
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-white/40 text-xs font-medium mb-3">
                    <Clock size={14} />
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white leading-tight mb-4 group-hover:text-[#00ffff] transition-colors line-clamp-3">
                    {article.title}
                  </h2>

                  <div className="mt-auto flex items-center gap-2 text-[#ff007f] text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                    Read more <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
