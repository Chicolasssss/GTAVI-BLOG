import { supabaseAdmin } from "@/lib/supabase"
import PostDetail from "./PostDetail"

export const dynamic = "force-dynamic"

function getDb() {
  const db = supabaseAdmin
  if (!db) throw new Error("Database not configured")
  return db
}

async function getPost(id: number) {
  const { data } = await getDb()
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()
  return data
}

async function getComments(postId: number) {
  const { data } = await getDb()
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true })
  return data ?? []
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

  return <PostDetail post={post} comments={comments} categoryIcon={CATEGORY_ICONS[post.category] ?? "💬"} />
}
