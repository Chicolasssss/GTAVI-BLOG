"use server"

import { auth } from "@/auth"
import { supabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

function getDb() {
  const db = supabaseAdmin
  if (!db) throw new Error("Base de datos no configurada")
  return db
}

const ADMIN_IDS = ["343975648157827083"]

export async function createCategory(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id || !ADMIN_IDS.includes(session.user.id)) {
    return { ok: false, error: "No autorizado" }
  }

  const name = (formData.get("name") as string)?.trim()
  const slug = (formData.get("slug") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const colorHex = (formData.get("color_hex") as string) || "#ff007f"

  if (!name || name.length < 2) return { ok: false, error: "Nombre inválido" }
  if (!slug || slug.length < 2) return { ok: false, error: "Slug inválido" }

  const db = getDb()
  const { error } = await db.from("forum_categories").insert({
    name, slug, description, color_hex: colorHex,
  })

  if (error) {
    if (error.code === "23505") return { ok: false, error: "Ya existe una categoría con ese nombre o slug" }
    return { ok: false, error: "Error al crear categoría" }
  }

  revalidatePath("/admin/categorias")
  return { ok: true, error: null }
}

export async function deleteCategory(id: number) {
  const session = await auth()
  if (!session?.user?.id || !ADMIN_IDS.includes(session.user.id)) {
    return { ok: false, error: "No autorizado" }
  }

  const db = getDb()
  const { error } = await db.from("forum_categories").delete().eq("id", id)
  if (error) return { ok: false, error: "Error al eliminar" }

  revalidatePath("/admin/categorias")
  return { ok: true, error: null }
}

export async function getCategories() {
  const db = getDb()
  const { data } = await db.from("forum_categories").select("*").order("id", { ascending: true })
  return data ?? []
}
