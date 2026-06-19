"use client";

import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    name: "Port Gellhorn",
    coords: [25.68, -80.68] as [number, number],
    desc: "Industrial and port area seen in the leaks. Expected to be a major hub for illicit activities.",
  },
];

export default function MapComponent() {
  const [customIcon, setCustomIcon] = useState<L.DivIcon | null>(null);

  useEffect(() => {
    // Create the custom icon only on the client side
    const icon = L.divIcon({
      html: `
        <div class="relative flex items-center justify-center w-8 h-8">
          <div class="absolute w-full h-full bg-[#ff007f] rounded-full animate-ping opacity-60"></div>
          <div class="relative w-4 h-4 bg-[#00ffff] border-2 border-white rounded-full shadow-[0_0_15px_#00ffff]"></div>
        </div>
      `,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
    setCustomIcon(icon);
  }, []);

  const bounds: [[number, number], [number, number]] = [
    [25.3, -80.9],
    [26.0, -79.6],
  ];

  return (
    <div className="relative" style={{ height: "calc(100vh - 64px)", marginTop: "64px" }}>
      {/* Title Overlay */}
      <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] flex flex-col">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00ffff] filter drop-shadow-[0_0_10px_rgba(255,0,127,0.5)]">LEONIDA</span>
          <span className="text-2xl md:text-3xl uppercase tracking-widest text-white/90">Concept Map</span>
        </h1>
        <p className="text-white/70 font-mono text-xs mt-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md inline-block border border-white/10">
          v1.0 (Based on Trailer 1 & Leaks)
        </p>
      </div>

      <MapContainer
        center={[25.68, -80.27]}
        zoom={10}
        zoomControl={false} // Will add custom control if needed, but keeping it clean
        attributionControl={false}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={0.8}
        style={{ height: "100%", width: "100%", background: "#6296a6" }} // Match ocean color
      >
        <ImageOverlay
          url="/gta-vi-map-concept.webp"
          bounds={bounds}
          opacity={1} // Fully opaque for best look
        />
        {customIcon && POINTS.map((p) => (
          <Marker key={p.id} position={p.coords} icon={customIcon}>
            <Popup className="cyberpunk-popup">
              <div style={{ fontFamily: "system-ui", minWidth: "220px" }}>
                <h3 style={{ color: "#00ffff", fontWeight: 800, fontSize: "16px", margin: "0 0 4px", textShadow: "0 0 10px rgba(0,255,255,0.4)" }}>{p.name}</h3>
                <p style={{ color: "#ccc", fontSize: "13px", margin: "0 0 12px", lineHeight: 1.5 }}>{p.desc}</p>
                <Link
                  href="/foro?cat=general"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    background: "linear-gradient(90deg,#ff007f,#00ffff)",
                    color: "#000",
                    fontSize: "13px",
                    fontWeight: 800,
                    padding: "8px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    boxShadow: "0 4px 15px rgba(255,0,127,0.3)"
                  }}
                >
                  Join Discussion
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Global CSS Overrides for Leaflet */}
      <style jsx global>{`
        .leaflet-container { 
          background: #6296a6 !important; /* Ocean Color */
        }
        .cyberpunk-popup .leaflet-popup-content-wrapper {
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 255, 255, 0.2);
          border-radius: 16px;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 255, 255, 0.1);
        }
        .cyberpunk-popup .leaflet-popup-tip { 
          background: rgba(10, 10, 15, 0.95); 
          border: 1px solid rgba(0, 255, 255, 0.2); 
        }
        .leaflet-popup-close-button { 
          color: #fff !important; 
          text-shadow: none !important;
          padding: 8px !important;
        }
      `}</style>
    </div>
  );
}
