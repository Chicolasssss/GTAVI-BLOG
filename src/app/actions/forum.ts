"use server"

import { auth } from "@/auth"
import { supabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

function getDb() {
  const db = supabaseAdmin
  if (!db) throw new Error("Base de datos no configurada")
  return db
}

export async function createPost(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { ok: false, error: "Debes iniciar sesión" }
  }

  const title = (formData.get("title") as string)?.trim()
  const content = (formData.get("content") as string)?.trim()
  const category = (formData.get("category") as string) || "general"

  if (!title || title.length < 3) {
    return { ok: false, error: "El título debe tener al menos 3 caracteres" }
  }

  const safeUserId = session.user.id.length > 15 ? session.user.id.substring(0, 15) : session.user.id

  const db = getDb()
  const { data, error } = await db
    .from("posts")
    .insert({
      user_id: safeUserId,
      author_name: session.user.name ?? "Anónimo",
      title,
      content,
      category,
    })
    .select("id")
    .single()

  if (error) {
    console.error("Supabase insert error:", error)
    return { ok: false, error: "Error al publicar: " + error.message }
  }

  revalidatePath("/foro")
  return { ok: true, id: data.id }
}

export async function toggleUpvote(postId: number) {
  const session = await auth()
  if (!session?.user?.id) {
    return { ok: false, error: "Debes iniciar sesión" }
  }

  const safeUserId = session.user.id.length > 15 ? session.user.id.substring(0, 15) : session.user.id
  const db = getDb()

  const { data: existing } = await db
    .from("upvotes_log")
    .select()
    .eq("user_id", safeUserId)
    .eq("post_id", postId)
    .maybeSingle()

  if (existing) {
    await db.from("upvotes_log").delete().eq("user_id", safeUserId).eq("post_id", postId)
    await db.rpc("decrement_upvotes", { row_id: postId })
  } else {
    await db.from("upvotes_log").insert({ user_id: safeUserId, post_id: postId })
    await db.rpc("increment_upvotes", { row_id: postId })
  }

  revalidatePath("/foro")
  revalidatePath(`/foro/${postId}`)
  return { ok: true, hasVoted: !existing }
}

export async function addComment(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { ok: false, error: "Debes iniciar sesión" }
  }

  const postId = parseInt(formData.get("post_id") as string)
  const content = (formData.get("content") as string)?.trim()

  if (!content || content.length < 1) {
    return { ok: false, error: "Escribe algo" }
  }

  const safeUserId = session.user.id.length > 15 ? session.user.id.substring(0, 15) : session.user.id
  const db = getDb()
  const { error } = await db.from("comments").insert({
    post_id: postId,
    user_id: safeUserId,
    author_name: session.user.name ?? "Anónimo",
    content,
  })

  if (error) {
    return { ok: false, error: "Error al comentar" }
  }

  revalidatePath(`/foro/${postId}`)
  return { ok: true }
}

export async function getPostsList(category?: string) {
  try {
    const session = await auth()
    const db = getDb()
    let query = db
      .from("posts")
      .select("id, title, category, upvotes, author_name, created_at")
      .order("created_at", { ascending: false })
      .limit(50)

    if (category && category !== "todo") {
      query = query.eq("category", category)
    }

    const { data, error } = await query
    if (error) throw error

    let posts = data ?? []

    if (session?.user?.id && posts.length > 0) {
      const safeUserId = session.user.id.length > 15 ? session.user.id.substring(0, 15) : session.user.id
      const postIds = posts.map(p => p.id)
      
      const { data: votesData } = await db
        .from("upvotes_log")
        .select("post_id")
        .eq("user_id", safeUserId)
        .in("post_id", postIds)

      const votedPostIds = new Set((votesData || []).map(v => v.post_id))
      
      return { 
        ok: true, 
        posts: posts.map(p => ({ ...p, hasVoted: votedPostIds.has(p.id) })) 
      }
    }

    return { 
      ok: true, 
      posts: posts.map(p => ({ ...p, hasVoted: false })) 
    }
  } catch (error: any) {
    console.error("Error fetching posts:", error)
    return { ok: false, posts: [], error: error.message || "Unknown error" }
  }
}

export async function getUserProfile(username: string) {
  try {
    const db = getDb()
    
    // Fetch all posts by this username (author_name)
    const { data, error } = await db
      .from("posts")
      .select("id, title, category, upvotes, created_at")
      .eq("author_name", decodeURIComponent(username))
      .order("created_at", { ascending: false })
      
    if (error) throw error
    
    const posts = data ?? []
    
    // Calculate stats
    const totalPosts = posts.filter(p => p.category !== 'scripts' && p.category !== 'server').length
    const totalScripts = posts.filter(p => p.category === 'scripts').length
    const totalServers = posts.filter(p => p.category === 'server').length
    const totalUpvotes = posts.reduce((sum, p) => sum + p.upvotes, 0)
    
    // Determine badges based on activity
    const badges = []
    if (totalUpvotes > 50) badges.push({ id: 'popular', name: 'Popular Creator', icon: '🔥', color: '#ff007f' })
    if (totalScripts > 0) badges.push({ id: 'dev', name: 'Script Developer', icon: '💻', color: '#00ffff' })
    if (totalServers > 0) badges.push({ id: 'owner', name: 'Server Owner', icon: '👑', color: '#ffd740' })
    if (posts.length > 10) badges.push({ id: 'active', name: 'Active Member', icon: '🗣️', color: '#00e676' })
    
    if (badges.length === 0) badges.push({ id: 'new', name: 'New Citizen', icon: '🌴', color: '#ffffff' })
    
    return { 
      ok: true, 
      stats: { totalPosts, totalScripts, totalServers, totalUpvotes },
      badges,
      recentActivity: posts.slice(0, 10)
    }
  } catch (error: any) {
    return { ok: false, error: error.message || "Error fetching profile" }
  }
}
