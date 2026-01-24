import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(120deg, rgba(16,24,40,1) 0%, rgba(17,61,79,1) 45%, rgba(245,158,11,1) 100%)",
          padding: "64px",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "24px",
              background: "#FDF6E3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#101828",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            ES
          </div>
          <div style={{ fontSize: "28px", letterSpacing: "0.25em" }}>
            eastsky english studio
          </div>
        </div>
        <div style={{ maxWidth: "780px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Korean prompts,
            <br />
            English confidence.
          </div>
          <div style={{ fontSize: "28px", color: "rgba(248,250,252,0.85)" }}>
            Speak first. Listen. Reveal the answer. Repeat daily.
          </div>
        </div>
      </div>
    ),
    size
  )
}
