import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "Unknown Entry"
    const category = searchParams.get("category") || "DATABASE"
    const status = searchParams.get("status") || "UNKNOWN"
    
    let statusColor = "#ffd740" // Rumor (yellow)
    if (status === "confirmed") statusColor = "#00e676" // Confirmed (green)
    if (status === "leaked") statusColor = "#ff007f" // Leak (pink)

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            backgroundColor: "#0a0a0f",
            backgroundImage: "radial-gradient(circle at 100% 0%, rgba(0, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(255, 0, 127, 0.2) 0%, transparent 50%)",
            padding: "80px",
          }}
        >
          {/* Header Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
              gap: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                padding: "10px 24px",
                borderRadius: "100px",
                color: "white",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </div>
            
            <div
              style={{
                backgroundColor: `${statusColor}20`,
                border: `2px solid ${statusColor}60`,
                padding: "10px 24px",
                borderRadius: "100px",
                color: statusColor,
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {status === "confirmed" ? "✅ " : status === "leaked" ? "💻 " : "🕵️ "}
              {status}
            </div>
          </div>

          <h1
            style={{
              fontSize: 100,
              color: "white",
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
              padding: 0,
              letterSpacing: "-0.04em",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.5)",
              marginTop: 20,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            LEONIDA DATABASE • GTAVI INTELLIGENCE
          </p>
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
