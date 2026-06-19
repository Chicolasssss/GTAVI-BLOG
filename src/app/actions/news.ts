"use server"

import { supabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getArticles() {
  if (!supabaseAdmin) return []
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }
  return data
}

export async function getArticleBySlug(slug: string) {
  if (!supabaseAdmin) return null
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching article by slug:", error)
    return null
  }
  return data
}

export async function createArticle(formData: FormData) {
  if (!supabaseAdmin) return { ok: false, error: "Database not configured" }

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const author_name = formData.get("author_name") as string || "Admin"

  if (!title || !slug || !content) {
    return { ok: false, error: "Faltan campos obligatorios" }
  }

  const { data, error } = await supabaseAdmin
    .from("articles")
    .insert([{ title, slug, content, image_url, author_name }])
    .select()
    .single()

  if (error) {
    console.error("Error creating article:", error)
    return { ok: false, error: error.message }
  }

  revalidatePath("/news")
  revalidatePath("/")
  return { ok: true, data }
}

export async function deleteArticle(id: number) {
  if (!supabaseAdmin) return { ok: false, error: "Database not configured" }

  const { error } = await supabaseAdmin
    .from("articles")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting article:", error)
    return { ok: false, error: error.message }
  }

  revalidatePath("/news")
  return { ok: true }
}
