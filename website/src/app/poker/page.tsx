"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PokerEntry {
  id: string
  date: string
  result: number
  notes?: string
}

export default function PokerTracker() {
  const [entries, setEntries] = useState<PokerEntry[]>([])
  const [result, setResult] = useState('')
  const [notes, setNotes] = useState('')

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('poker-entries')
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('poker-entries', JSON.stringify(entries))
    }
  }, [entries])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const resultNum = parseFloat(result)
    if (isNaN(resultNum)) return

    const newEntry: PokerEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      result: resultNum,
      notes: notes.trim() || undefined
    }

    setEntries([newEntry, ...entries])
    setResult('')
    setNotes('')
  }

  const getResultColor = (result: number) => {
    if (result > 0) return 'text-green-600 bg-green-50 border-green-200'
    if (result < 0) return 'text-red-600 bg-red-50 border-red-200'
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  const formatCurrency = (amount: number) => {
    const sign = amount >= 0 ? '+' : ''
    return `${sign}$${amount.toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date)
  }

  const totalResult = entries.reduce((sum, entry) => sum + entry.result, 0)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Poker Tracker</h1>
          <p className="text-muted-foreground">Track your poker sessions</p>
        </div>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${totalResult > 0 ? 'text-green-600' : totalResult < 0 ? 'text-red-600' : 'text-gray-600'}`}>
              {formatCurrency(totalResult)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {entries.length} session{entries.length !== 1 ? 's' : ''} recorded
            </p>
          </CardContent>
        </Card>

        {/* Entry Form */}
        <Card>
          <CardHeader>
            <CardTitle>Log New Session</CardTitle>
            <CardDescription>Add a new poker session result</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="result" className="text-sm font-medium">
                  Result ($)
                </label>
                <Input
                  id="result"
                  type="number"
                  step="0.01"
                  placeholder="Enter amount (e.g., 150 or -50)"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notes (optional)
                </label>
                <Input
                  id="notes"
                  type="text"
                  placeholder="Any notes about the session..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Add Entry
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Entries List */}
        <Card>
          <CardHeader>
            <CardTitle>Session History</CardTitle>
            <CardDescription>Your recent poker sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No sessions recorded yet. Add your first entry above!
              </p>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-4 rounded-lg border ${getResultColor(entry.result)} transition-colors`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">
                            {formatCurrency(entry.result)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {formatDate(entry.date)}
                          </Badge>
                        </div>
                        {entry.notes && (
                          <p className="text-sm mt-1 opacity-80">{entry.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
