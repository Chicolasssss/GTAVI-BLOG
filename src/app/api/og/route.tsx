import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "Leonida Hub"
    const subtitle = searchParams.get("subtitle") || "GTA VI Community Portal"
    
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0f",
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255, 0, 127, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 255, 255, 0.1) 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(10, 10, 15, 0.9)",
              padding: "60px 100px",
              borderRadius: "32px",
              border: "2px solid rgba(255, 0, 127, 0.4)",
              boxShadow: "0 0 80px rgba(0, 255, 255, 0.15)",
            }}
          >
            <h1
              style={{
                fontSize: 84,
                color: "white",
                fontWeight: 900,
                margin: 0,
                padding: 0,
                letterSpacing: "-0.04em",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 32,
                color: "#00ffff",
                marginTop: 24,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    return new Response(`Failed to generate image`, { status: 500 })
  }
}
