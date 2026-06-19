import { supabaseAdmin, queryWithTimeout } from "@/lib/supabase"
import PostDetail from "./PostDetail"
import type { Metadata, ResolvingMetadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id: idStr } = await params
  const id = parseInt(idStr)
  if (isNaN(id)) return { title: "Post no encontrado" }

  try {
    const post = await queryWithTimeout(async (signal) => {
      const db = supabaseAdmin
      if (!db) return null
      const { data } = await db.from("posts").select("title, content").eq("id", id).single()
      return data
    }, 2000)

    if (!post) return { title: "Post no encontrado" }

    const truncate = (str: string, length: number) => str.length > length ? str.substring(0, length) + "..." : str

    return {
      title: `${post.title} — Leonida Hub Forum`,
      description: truncate(post.content || "", 160),
      openGraph: {
        title: post.title,
        description: truncate(post.content || "", 160),
        type: "article",
        siteName: "Leonida Hub",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: truncate(post.content || "", 160),
      }
    }
  } catch (e) {
    return { title: "Foro Leonida Hub" }
  }
}

function getDb() {
  const db = supabaseAdmin
  if (!db) return null
  return db
}

async function getPost(id: number) {
  try {
    return await queryWithTimeout(async () => {
      const db = getDb()
      if (!db) return null
      const { data } = await db.from("posts").select("*").eq("id", id).single()
      return data
    }, 2500)
  } catch (e) {
    return null
  }
}

async function getComments(postId: number) {
  try {
    return await queryWithTimeout(async () => {
      const db = getDb()
      if (!db) return []
      const { data } = await db.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true })
      return data ?? []
    }, 2500)
  } catch (e) {
    return []
  }
}

const CATEGORY_ICONS: Record<string, string> = {
  general: "💬",
  roleplay: "🎭",
  coches: "🏎️",
  salseo: "🔥",
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: idStr } = await params
  const id = parseInt(idStr)
  if (isNaN(id)) return <div className="p-20 text-center text-white/30">Post no encontrado</div>

  const [post, comments] = await Promise.all([getPost(id), getComments(id)])
  if (!post) return <div className="p-20 text-center text-white/30">Post no encontrado</div>

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "headline": post.title,
    "text": post.content,
    "author": {
      "@type": "Person",
      "name": post.author_name
    },
    "datePublished": post.created_at,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/UpAction",
      "userInteractionCount": post.upvotes
    },
    "commentCount": comments.length
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetail post={post} comments={comments} categoryIcon={CATEGORY_ICONS[post.category] ?? "💬"} />
    </>
  )
}
