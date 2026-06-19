"use server"

import { auth } from "@/auth"
import { supabaseAdmin } from "@/lib/supabase"

export async function reserveName(name: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return { ok: false, error: "Debes iniciar sesión con Discord" }
  }

  const clean = name.trim()
  if (!clean || clean.length < 2 || clean.length > 32) {
    return { ok: false, error: "El nombre debe tener entre 2 y 32 caracteres" }
  }

  const { error } = await supabaseAdmin.from("reserved_names").insert({
    discord_id: session.user.id,
    discord_email: session.user.email,
    requested_name: clean,
  })

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Ese nombre ya está reservado por otro usuario" }
    }
    return { ok: false, error: "Error al reservar. Inténtalo de nuevo." }
  }

  return { ok: true, error: null }
}
