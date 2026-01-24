import { EnglishPractice } from "@/components/english-practice"
import { promises as fs } from "fs"
import path from "path"

export default async function Page() {
  const assetsDir = path.join(process.cwd(), "assets")
  let days: string[] = []

  try {
    const entries = await fs.readdir(assetsDir, { withFileTypes: true })
    days = entries
      .filter((entry) => entry.isDirectory() && /^Day\d{2}$/.test(entry.name))
      .map((entry) => entry.name)
      .sort()
  } catch {
    days = ["Day01"]
  }

  return <EnglishPractice days={days} />
}
