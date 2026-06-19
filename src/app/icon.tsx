import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

export const runtime = "nodejs"
export const size = { width: 256, height: 256 }
export const contentType = "image/png"

export default function Icon() {
  const logoData = readFileSync(join(process.cwd(), "public", "logo.png"))
  const logoBase64 = logoData.toString("base64")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={`data:image/png;base64,${logoBase64}`}
          style={{
            objectFit: "contain",
            width: "80%",
            height: "80%",
          }}
        />
      </div>
    ),
    { ...size }
  )
}
