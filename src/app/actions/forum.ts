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

  const db = getDb()
  const { data, error } = await db
    .from("posts")
    .insert({
      user_id: session.user.id,
      author_name: session.user.name ?? "Anónimo",
      title,
      content,
      category,
    })
    .select("id")
    .single()

  if (error) {
    return { ok: false, error: "Error al publicar" }
  }

  revalidatePath("/foro")
  return { ok: true, id: data.id }
}

export async function toggleUpvote(postId: number) {
  const session = await auth()
  if (!session?.user?.id) {
    return { ok: false, error: "Debes iniciar sesión" }
  }

  const userId = session.user.id
  const db = getDb()

  const { data: existing } = await db
    .from("upvotes_log")
    .select()
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle()

  if (existing) {
    await db.from("upvotes_log").delete().eq("user_id", userId).eq("post_id", postId)
    await db.rpc("decrement_upvotes", { row_id: postId })
  } else {
    await db.from("upvotes_log").insert({ user_id: userId, post_id: postId })
    await db.rpc("increment_upvotes", { row_id: postId })
  }

  revalidatePath("/foro")
  revalidatePath(`/foro/${postId}`)
  return { ok: true }
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

  const db = getDb()
  const { error } = await db.from("comments").insert({
    post_id: postId,
    user_id: session.user.id,
    author_name: session.user.name ?? "Anónimo",
    content,
  })

  if (error) {
    return { ok: false, error: "Error al comentar" }
  }

  revalidatePath(`/foro/${postId}`)
  return { ok: true }
}
