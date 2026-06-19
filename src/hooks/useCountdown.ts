"use client"

import { useEffect, useState } from "react"

type Countdown = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

export function useCountdown(target: Date): Countdown & { isMounted: boolean } {
  const [mounted, setMounted] = useState(false)
  const [countdown, setCountdown] = useState<Countdown>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  useEffect(() => {
    setMounted(true)

    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" })
        return
      }
      setCountdown({
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        minutes: pad(Math.floor((diff % 3600000) / 60000)),
        seconds: pad(Math.floor((diff % 60000) / 1000)),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return { ...countdown, isMounted: mounted }
}
