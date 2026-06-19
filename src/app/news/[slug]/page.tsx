import { getArticleBySlug } from "@/app/actions/news"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, User } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: "News not found" }

  const truncate = (str: string, length: number) => str.length > length ? str.substring(0, length) + "..." : str

  return {
    title: `${article.title} — Leonida News`,
    description: truncate(article.content, 160),
    openGraph: {
      title: article.title,
      description: truncate(article.content, 160),
      type: "article",
      images: article.image_url ? [{ url: article.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: truncate(article.content, 160),
      images: article.image_url ? [article.image_url] : [],
    }
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": article.image_url ? [article.image_url] : [],
    "datePublished": article.created_at,
    "dateModified": article.created_at,
    "author": [{
      "@type": "Person",
      "name": article.author_name
    }]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pt-24 px-4 pb-20">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition"
          >
            <ArrowLeft size={16} /> Back to News
          </Link>

          {article.image_url && (
            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-2xl border border-white/5">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-10">
            <div className="flex items-center gap-4 text-white/40 text-sm font-medium mb-4">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Clock size={14} /> {new Date(article.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <User size={14} /> {article.author_name}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-2">
              {article.title}
            </h1>
          </div>

          <div className="glass rounded-3xl p-6 md:p-10 border-t-4 border-t-[#ff007f]">
            <div className="prose prose-invert max-w-none prose-lg prose-pre:bg-[#0a0a0f] prose-pre:border prose-pre:border-white/10 prose-img:rounded-2xl prose-a:text-[#00ffff] hover:prose-a:text-[#ff007f] prose-headings:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
