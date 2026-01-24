import { promises as fs } from "fs"
import path from "path"

export const runtime = "nodejs"

const dayPattern = /^Day\d{2}$/
const audioPattern = /^[A-Za-z0-9._-]+\.mp3$/

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ day: string; file: string }> }
) {
  const { day, file } = await params

  if (!dayPattern.test(day) || !audioPattern.test(file)) {
    return new Response("Invalid request.", { status: 400 })
  }

  const baseDir = path.join(process.cwd(), "assets", day)
  const resolvedBase = path.resolve(baseDir)
  const resolvedFile = path.resolve(baseDir, file)

  if (!resolvedFile.startsWith(`${resolvedBase}${path.sep}`)) {
    return new Response("Invalid request.", { status: 400 })
  }

  try {
    const data = await fs.readFile(resolvedFile)
    return new Response(data, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return new Response("Audio not found.", { status: 404 })
  }
}
