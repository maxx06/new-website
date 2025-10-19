import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'poker-entries.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// GET - Read entries
export async function GET() {
  try {
    await ensureDataDir()

    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8')
      const entries = JSON.parse(data)
      return NextResponse.json(entries)
    } catch (error) {
      // File doesn't exist yet, return empty array
      return NextResponse.json([])
    }
  } catch (error) {
    console.error('Error reading poker entries:', error)
    return NextResponse.json({ error: 'Failed to read entries' }, { status: 500 })
  }
}

// POST - Write entries
export async function POST(request: Request) {
  try {
    await ensureDataDir()

    const entries = await request.json()
    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error writing poker entries:', error)
    return NextResponse.json({ error: 'Failed to write entries' }, { status: 500 })
  }
}
