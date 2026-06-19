"use client";

import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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
];

export default function MapComponent() {
  const bounds: [[number, number], [number, number]] = [
    [25.4, -80.8],
    [25.95, -79.7],
  ];

  return (
    <div className="relative" style={{ height: "calc(100vh - 64px)", marginTop: "64px" }}>
      <MapContainer
        center={[25.68, -80.27]}
        zoom={10}
        zoomControl={true}
        attributionControl={false}
        bounds={bounds}
        style={{ height: "100%", width: "100%", background: "#0a0a0f" }}
      >
        <ImageOverlay
          url="https://placehold.co/1200x800/0a0a0f/ff007f?text=GTA+VI+Concept+Map"
          bounds={bounds}
          opacity={1}
        />
        {POINTS.map((p) => (
          <Marker key={p.id} position={p.coords}>
            <Popup className="cyberpunk-popup">
              <div style={{ fontFamily: "system-ui", minWidth: "200px" }}>
                <h3 style={{ color: "#ff007f", fontWeight: 800, fontSize: "16px", margin: "0 0 4px" }}>{p.name}</h3>
                <p style={{ color: "#ccc", fontSize: "13px", margin: "0 0 8px", lineHeight: 1.4 }}>{p.desc}</p>
                <Link
                  href="/foro?cat=general"
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(90deg,#ff007f,#00ffff)",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "6px 14px",
                    borderRadius: "999px",
                    textDecoration: "none",
                  }}
                >
                  Discuss in forum
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style jsx global>{`
        .leaflet-container { background: #0a0a0f; }
        .cyberpunk-popup .leaflet-popup-content-wrapper {
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 0 30px rgba(255, 0, 127, 0.2);
        }
        .cyberpunk-popup .leaflet-popup-tip { background: rgba(10, 10, 15, 0.95); border: 1px solid rgba(255, 255, 255, 0.1); }
        .leaflet-popup-close-button { color: #fff !important; }
        .leaflet-control-zoom a { background: rgba(10, 10, 15, 0.9) !important; color: #fff !important; border-color: rgba(255, 255, 255, 0.1) !important; }
        .leaflet-control-zoom a:hover { background: rgba(255, 0, 127, 0.2) !important; }
      `}</style>
    </div>
  );
}
