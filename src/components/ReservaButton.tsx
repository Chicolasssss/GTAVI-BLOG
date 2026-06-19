"use client"

import { ShoppingCart } from "lucide-react"
import { AFFILIATE_LINKS } from "@/constants/links"

const platformMap: Record<string, { link: string; label: string }> = {
  ps5: { link: AFFILIATE_LINKS.GTA6_PS5, label: "PS5" },
  pc: { link: AFFILIATE_LINKS.GTA6_PC, label: "PC" },
  xbox: { link: AFFILIATE_LINKS.GTA6_XBOX, label: "Xbox" },
}

export default function ReservaButton({ platform }: { platform: "ps5" | "pc" | "xbox" }) {
  const info = platformMap[platform]
  if (!info || info.link.startsWith("TU_")) return null

  return (
    <a
      href={info.link}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#ff007f]/30 transition-all"
    >
      <ShoppingCart size={16} /> Pre-order on {info.label}
    </a>
  )
}
