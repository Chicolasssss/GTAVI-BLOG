import { createClient } from "@supabase/supabase-js"

function getClient() {
  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseUrl.includes("fmttxwhztplzertoxwlf")) {
    supabaseUrl = supabaseUrl.replace("fmttxwhztplzertoxwlf", "fmtxwhzteplzertoxwlf")
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

function getAdminClient() {
  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (supabaseUrl && supabaseUrl.includes("fmttxwhztplzertoxwlf")) {
    supabaseUrl = supabaseUrl.replace("fmttxwhztplzertoxwlf", "fmtxwhzteplzertoxwlf")
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }

  return createClient(supabaseUrl, serviceRoleKey)
}

export const supabase = getClient()
export const supabaseAdmin = getAdminClient()

export async function queryWithTimeout<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  timeoutMs = 3000,
): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const result = await fn(controller.signal)
    return result
  } finally {
    clearTimeout(timer)
  }
}
