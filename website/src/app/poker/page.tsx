"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeIn } from '@/components/magicui/fade-in'

interface PokerEntry {
  id: string
  date: string
  result: number
  notes?: string
}

type TimePeriod = 'week' | 'month' | 'year' | 'all'

export default function PokerTracker() {
  const [entries, setEntries] = useState<PokerEntry[]>([])
  const [result, setResult] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('all')

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
    if (result > 0) return 'from-green-500/10 to-green-500/5 border-green-500/20 text-green-600'
    if (result < 0) return 'from-red-500/10 to-red-500/5 border-red-500/20 text-red-600'
    return 'from-gray-500/10 to-gray-500/5 border-gray-500/20 text-gray-600'
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 0) {
      return `+$${amount.toFixed(2)}`
    } else {
      return `-$${Math.abs(amount).toFixed(2)}`
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(date)
  }

  const getFilteredEntries = (period: TimePeriod) => {
    const now = new Date()
    const cutoffDate = new Date()

    switch (period) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7)
        break
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        cutoffDate.setFullYear(now.getFullYear() - 1)
        break
      case 'all':
        return entries
    }

    return entries.filter(entry => new Date(entry.date) >= cutoffDate)
  }

  const getChartData = (period: TimePeriod) => {
    const filtered = getFilteredEntries(period)
    if (filtered.length === 0) return []

    // Sort entries by date (oldest first)
    const sorted = [...filtered].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    // Calculate cumulative PnL
    let cumulative = 0
    return sorted.map(entry => {
      cumulative += entry.result
      return {
        date: entry.date,
        pnl: cumulative
      }
    })
  }

  const chartData = getChartData(selectedPeriod)
  const filteredEntries = getFilteredEntries(selectedPeriod)
  const totalResult = entries.reduce((sum, entry) => sum + entry.result, 0)
  const periodResult = filteredEntries.reduce((sum, entry) => sum + entry.result, 0)

  // Calculate chart dimensions and scaling
  const getChartPoints = () => {
    if (chartData.length === 0) return { points: '', maxPnl: 0, minPnl: 0 }

    const pnlValues = chartData.map(d => d.pnl)
    const maxPnl = Math.max(...pnlValues, 0)
    const minPnl = Math.min(...pnlValues, 0)
    const range = maxPnl - minPnl || 1

    const width = 1000
    const height = 200
    const padding = 20

    const points = chartData.map((d, i) => {
      const x = padding + (i / Math.max(chartData.length - 1, 1)) * (width - 2 * padding)
      const y = height - padding - ((d.pnl - minPnl) / range) * (height - 2 * padding)
      return `${x},${y}`
    }).join(' ')

    return { points, maxPnl, minPnl, width, height }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <FadeIn delay={0.1} direction="down">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">max's degen tracker</h1>
          </div>
        </FadeIn>

        {/* PnL Graph */}
        <FadeIn delay={0.2} direction="up">
          <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Performance Chart</CardTitle>
                <CardDescription>Cumulative profit & loss over time</CardDescription>
              </div>
              <div className="flex gap-1">
                {(['week', 'month', 'year', 'all'] as TimePeriod[]).map(period => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className="text-xs capitalize"
                  >
                    {period === 'all' ? 'All' : period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No data for this period
              </p>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Period PnL</p>
                    <p className={`text-2xl font-bold ${periodResult > 0 ? 'text-green-600' : periodResult < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {formatCurrency(periodResult)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">All Time</p>
                    <p className={`text-2xl font-bold ${totalResult > 0 ? 'text-green-600' : totalResult < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {formatCurrency(totalResult)}
                    </p>
                  </div>
                </div>

                <div className="relative w-full aspect-[5/2] bg-muted/20 rounded-lg overflow-hidden">
                  <svg
                    viewBox={`0 0 ${getChartPoints().width} ${getChartPoints().height}`}
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {/* Define gradients */}
                    <defs>
                      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgb(22 163 74)', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(22 163 74)', stopOpacity: 0 }} />
                      </linearGradient>
                      <linearGradient id="redGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgb(220 38 38)', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(220 38 38)', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line
                      x1="20"
                      y1={getChartPoints().height / 2}
                      x2={getChartPoints().width - 20}
                      y2={getChartPoints().height / 2}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="opacity-20"
                      strokeDasharray="4"
                    />

                    {/* Zero line */}
                    {(() => {
                      const { maxPnl, minPnl, height } = getChartPoints()
                      const range = maxPnl - minPnl || 1
                      const zeroY = height - 20 - ((0 - minPnl) / range) * (height - 40)
                      return (
                        <line
                          x1="20"
                          y1={zeroY}
                          x2={getChartPoints().width - 20}
                          y2={zeroY}
                          stroke="currentColor"
                          strokeWidth="2"
                          className="opacity-30"
                        />
                      )
                    })()}

                    {/* Area under/over the curve with gradient */}
                    {getChartPoints().points && (() => {
                      const { maxPnl, minPnl, height } = getChartPoints()
                      const range = maxPnl - minPnl || 1
                      const zeroY = height - 20 - ((0 - minPnl) / range) * (height - 40)

                      if (periodResult >= 0) {
                        // For positive, fill from line down to zero line
                        return (
                          <polygon
                            points={`${getChartPoints().points.split(' ')[0].split(',')[0]},${zeroY} ${getChartPoints().points} ${getChartPoints().points.split(' ').slice(-1)[0].split(',')[0]},${zeroY}`}
                            fill="url(#greenGradient)"
                          />
                        )
                      } else {
                        // For negative, fill from zero line down to line
                        return (
                          <polygon
                            points={`${getChartPoints().points.split(' ')[0].split(',')[0]},${zeroY} ${getChartPoints().points} ${getChartPoints().points.split(' ').slice(-1)[0].split(',')[0]},${zeroY}`}
                            fill="url(#redGradient)"
                          />
                        )
                      }
                    })()}

                    {/* Line chart */}
                    {getChartPoints().points && (
                      <polyline
                        points={getChartPoints().points}
                        fill="none"
                        stroke={periodResult >= 0 ? 'rgb(22 163 74)' : 'rgb(220 38 38)'}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Data points */}
                    {getChartPoints().points.split(' ').map((point, i) => {
                      const [x, y] = point.split(',')
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="4"
                          fill={periodResult >= 0 ? 'rgb(22 163 74)' : 'rgb(220 38 38)'}
                          className="opacity-60"
                        />
                      )
                    })}
                  </svg>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{filteredEntries.length} session{filteredEntries.length !== 1 ? 's' : ''}</span>
                  <span>
                    {chartData.length > 0 && formatDate(chartData[0].date)} - {chartData.length > 0 && formatDate(chartData[chartData.length - 1].date)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        </FadeIn>

        {/* Entry Form */}
        <FadeIn delay={0.3} direction="up">
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
        </FadeIn>

        {/* Entries List */}
        <FadeIn delay={0.4} direction="up">
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
              <div className="overflow-hidden rounded-xl border">
                {entries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`group relative backdrop-blur-sm bg-gradient-to-r ${getResultColor(entry.result)} transition-all duration-300 hover:brightness-95 ${index !== 0 ? 'border-t border-current/10' : ''}`}
                  >
                    <div className="flex items-center justify-between px-4 py-3 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col min-w-[140px]">
                          <span className="text-xs font-medium opacity-60">
                            {formatDate(entry.date)}
                          </span>
                          <span className="text-xs opacity-50">
                            {formatTime(entry.date)}
                          </span>
                        </div>

                        <div className="h-8 w-px bg-current opacity-10" />

                        <div className="font-bold text-xl tracking-tight">
                          {formatCurrency(entry.result)}
                        </div>
                      </div>

                      {entry.notes && (
                        <p className="text-xs opacity-70 text-right max-w-md truncate">
                          {entry.notes}
                        </p>
                      )}
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
