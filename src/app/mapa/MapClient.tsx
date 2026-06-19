"use client"

import { useEffect, useRef, useState } from "react"

const POINTS = [
  {
    id: 1,
    name: "Vice City Beach",
    coords: [25.76, -80.19] as [number, number],
    desc: "Iconic sunset view of the beach with palm trees, skyscrapers in the background, and the ocean reflecting the city lights. Trailer 1 — Opening scene.",
  },
  {
    id: 2,
    name: "Leonida Swamps",
    coords: [25.5, -80.55] as [number, number],
    desc: "Aerial shot of vast swamps with dense vegetation, alligators, and a mysterious atmosphere. Trailer 1 — Wildlife sequence.",
  },
  {
    id: 3,
    name: "Gas Station",
    coords: [25.68, -80.38] as [number, number],
    desc: "Hooded thief robbing a gas station with neon lighting. Trailer 1 — Street crime scene.",
  },
]

export default function MapClient() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      let cancelled = false

      import("leaflet").then((L) => {
        if (cancelled || !mapRef.current) return

        const map = L.map(mapRef.current, {
          center: [25.68, -80.27],
          zoom: 10,
          zoomControl: true,
          attributionControl: false,
        })

        const bounds: [[number, number], [number, number]] = [
          [25.4, -80.8],
          [25.95, -79.7],
        ]
        L.imageOverlay(
          "https://placehold.co/1200x800/0a0a0f/ff007f?text=GTA+VI+Concept+Map",
          bounds,
          { opacity: 1 },
        ).addTo(map)

        const neonIcon = L.divIcon({
          className: "",
          html: `<div style="
            width: 24px; height: 24px;
            background: #ff007f;
            border: 3px solid #00ffff;
            border-radius: 50%;
            box-shadow: 0 0 20px #ff007f, 0 0 40px #00ffff;
            cursor: pointer;
          "></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        POINTS.forEach((p) => {
          const marker = L.marker(p.coords, { icon: neonIcon }).addTo(map)
          marker.bindPopup(`
            <div style="font-family: system-ui; min-width: 200px;">
              <h3 style="color:#ff007f; font-weight:800; font-size:16px; margin:0 0 4px;">${p.name}</h3>
              <p style="color:#ccc; font-size:13px; margin:0 0 8px; line-height:1.4;">${p.desc}</p>
              <a href="/foro?cat=general" style="
                display:inline-block;
                background:linear-gradient(90deg,#ff007f,#00ffff);
                color:#fff;
                font-size:12px;
                font-weight:600;
                padding:6px 14px;
                border-radius:999px;
                text-decoration:none;
              ">Discuss in forum</a>
            </div>
          `)
        })

        map.fitBounds(bounds)
        mapInstance.current = map
        setReady(true)
      })

      return () => {
        cancelled = true
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <div className="relative" style={{ height: "calc(100vh - 64px)", marginTop: "64px" }}>
      <div ref={mapRef} className="w-full h-full" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f] z-50">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#ff007f] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-white/40 text-sm">Loading map...</p>
          </div>
        </div>
      )}
      <style jsx global>{`
        .leaflet-container { background: #0a0a0f; }
        .leaflet-popup-content-wrapper {
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 0 30px rgba(255, 0, 127, 0.2);
        }
        .leaflet-popup-tip { background: rgba(10, 10, 15, 0.95); border: 1px solid rgba(255, 255, 255, 0.1); }
        .leaflet-popup-close-button { color: #fff; }
        .leaflet-control-zoom a { background: rgba(10, 10, 15, 0.9); color: #fff; border-color: rgba(255, 255, 255, 0.1); }
        .leaflet-control-zoom a:hover { background: rgba(255, 0, 127, 0.2); }
      `}</style>
    </div>
  )
}
