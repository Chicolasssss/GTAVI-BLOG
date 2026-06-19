"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import type { Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"

export default function ParticlesBg() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="particles-bg"
      init={particlesInit}
      className="fixed inset-0 pointer-events-none z-0"
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true } },
          color: { value: "#ff007f" },
          links: {
            color: "#ff007f",
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 0.5,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: { default: "bounce" },
          },
          size: { value: { min: 0.5, max: 2 } },
          opacity: { value: 0.3 },
        },
        detectRetina: true,
      }}
    />
  )
}
