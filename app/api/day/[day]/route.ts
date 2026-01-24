import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export const runtime = "nodejs"

const dayPattern = /^Day\d{2}$/

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ day: string }> }
) {
  const { day } = await params
  if (!dayPattern.test(day)) {
    return new NextResponse("Invalid day.", { status: 400 })
  }

  const filePath = path.join(process.cwd(), "assets", day, `${day}_ko.json`)

  try {
    const raw = await fs.readFile(filePath, "utf8")
    const payload = JSON.parse(raw)
    return NextResponse.json(payload)
  } catch {
    return new NextResponse("Day data not found.", { status: 404 })
  }
}
