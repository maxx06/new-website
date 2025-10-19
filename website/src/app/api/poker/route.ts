import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// Initialize table (runs once when needed)
async function ensureTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS poker_entries (
        id TEXT PRIMARY KEY,
        date TIMESTAMP NOT NULL,
        result DECIMAL(10, 2) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `
  } catch (error) {
    console.error('Error creating table:', error)
  }
}

// GET - Read all entries
export async function GET() {
  try {
    await ensureTable()

    const { rows } = await sql`
      SELECT id, date, result, notes
      FROM poker_entries
      ORDER BY date DESC
    `

    // Convert result from string to number
    const entries = rows.map(row => ({
      ...row,
      result: parseFloat(row.result)
    }))

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error reading poker entries:', error)
    return NextResponse.json({ error: 'Failed to read entries' }, { status: 500 })
  }
}

// POST - Add a new entry
export async function POST(request: Request) {
  try {
    await ensureTable()

    const entry = await request.json()

    await sql`
      INSERT INTO poker_entries (id, date, result, notes)
      VALUES (${entry.id}, ${entry.date}, ${entry.result}, ${entry.notes || null})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding poker entry:', error)
    return NextResponse.json({ error: 'Failed to add entry' }, { status: 500 })
  }
}
