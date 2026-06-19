"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, X } from "lucide-react"

type ToastType = "success" | "error"

type ToastItem = {
  id: number
  type: ToastType
  message: string
}

type ToastCtx = {
  toast: (type: ToastType, message: string) => void
}

const Ctx = createContext<ToastCtx>({ toast: () => {} })
export const useToast = () => useContext(Ctx)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Date.now()
    setItems((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border text-sm font-medium backdrop-blur-md min-w-[300px] ${
                t.type === "success"
                  ? "bg-[#00c853]/20 border-[#00c853]/40 text-[#69f0ae]"
                  : "bg-[#ff1744]/20 border-[#ff1744]/40 text-[#ff8a80]"
              }`}
            >
              {t.type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <span className="flex-1">{t.message}</span>
              <button
                onClick={() => setItems((prev) => prev.filter((x) => x.id !== t.id))}
                className="opacity-60 hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}
