"use server"

import { supabaseAdmin } from "@/lib/supabase"

function getDb() {
  const db = supabaseAdmin
  if (!db) throw new Error("Base de datos no configurada")
  return db
}

export async function preRegisterServer(formData: FormData) {
  const serverName = (formData.get("server_name") as string)?.trim()
  const roleType = formData.get("role_type") as string
  const discordLink = (formData.get("discord_link") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()

  if (!serverName || serverName.length < 2) {
    return { ok: false, error: "El nombre debe tener al menos 2 caracteres" }
  }
  if (!["serio", "casual", "gangs"].includes(roleType)) {
    return { ok: false, error: "Tipo de rol inválido" }
  }

  const db = getDb()
  const { error } = await db.from("pre_registered_servers").insert({
    server_name: serverName,
    role_type: roleType,
    discord_link: discordLink || null,
    description: description || null,
  })

  if (error) {
    return { ok: false, error: "Error al registrar. Inténtalo de nuevo." }
  }

  return { ok: true, error: null }
}
