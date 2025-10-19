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
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]) // YYYY-MM-DD format
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('all')
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; pnl: number; date: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLocked, setIsLocked] = useState(true)

  // Load entries from API on mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch('/api/poker')
        if (response.ok) {
          const data = await response.json()
          setEntries(data)
        }
      } catch (error) {
        console.error('Failed to load entries:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadEntries()
  }, [])

  // Save entries to API whenever they change
  const saveEntries = async (newEntries: PokerEntry[]) => {
    try {
      await fetch('/api/poker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntries)
      })
    } catch (error) {
      console.error('Failed to save entries:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLocked) return // Prevent submission if locked

    const resultNum = parseFloat(result)
    if (isNaN(resultNum)) return

    // Combine date with current time
    const selectedDate = new Date(date)
    const now = new Date()
    selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds())

    const newEntry: PokerEntry = {
      id: Date.now().toString(),
      date: selectedDate.toISOString(),
      result: resultNum,
      notes: notes.trim() || undefined
    }

    // Optimistically update UI
    setEntries([newEntry, ...entries])

    // Save to database
    try {
      await fetch('/api/poker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      })
    } catch (error) {
      console.error('Failed to save entry:', error)
      // Revert on error
      setEntries(entries)
    }

    setResult('')
    setNotes('')
    setDate(new Date().toISOString().split('T')[0]) // Reset to today
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
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={0.1} direction="down">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold tracking-tight">max's degen tracker</h1>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:h-[calc(100vh-180px)]">
          {/* Left Column - PnL Graph and Form Combined */}
          <div className="lg:overflow-y-auto lg:pr-3">
            <FadeIn delay={0.2} direction="up">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
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
                <CardContent className="space-y-6">
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
                  {/* Tooltip */}
                  {hoveredPoint && (
                    <div
                      className="absolute z-10 bg-popover border border-border rounded-lg px-3 py-2 shadow-lg pointer-events-none"
                      style={{
                        left: `${(hoveredPoint.x / getChartPoints().width) * 100}%`,
                        top: `${(hoveredPoint.y / getChartPoints().height) * 100}%`,
                        transform: 'translate(-50%, -120%)'
                      }}
                    >
                      <div className="text-xs font-semibold">{formatCurrency(hoveredPoint.pnl)}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(hoveredPoint.date)}</div>
                    </div>
                  )}

                  <svg
                    viewBox={`0 0 ${getChartPoints().width} ${getChartPoints().height}`}
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    onMouseLeave={() => setHoveredPoint(null)}
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

                    {/* Data points with hover */}
                    {getChartPoints().points.split(' ').map((point, i) => {
                      const [x, y] = point.split(',')
                      return (
                        <g key={i}>
                          {/* Invisible larger circle for easier hover */}
                          <circle
                            cx={x}
                            cy={y}
                            r="15"
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredPoint({
                              x: parseFloat(x),
                              y: parseFloat(y),
                              pnl: chartData[i].pnl,
                              date: chartData[i].date
                            })}
                          />
                          {/* Visible data point */}
                          <circle
                            cx={x}
                            cy={y}
                            r="4"
                            fill={periodResult >= 0 ? 'rgb(22 163 74)' : 'rgb(220 38 38)'}
                            className="opacity-60 pointer-events-none"
                          />
                        </g>
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

                  {/* Divider */}
                  <div className="border-t border-border my-6"></div>

                  {/* Log New Session Form */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Log New Session</h3>
                      <p className="text-sm text-muted-foreground">Add a new poker session result</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="date" className="text-sm font-medium">
                            Date
                          </label>
                          <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="result" className="text-sm font-medium">
                            Result ($)
                          </label>
                          <Input
                            id="result"
                            type="number"
                            step="0.01"
                            placeholder="e.g., 150 or -50"
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            required
                          />
                        </div>
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
                      <Button type="submit" className="w-full" disabled={isLocked}>
                        Add Entry
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Lock Checkbox at Bottom */}
          <div className="fixed bottom-4 right-4 z-50">
            <label className="flex items-center gap-2 cursor-pointer bg-card border border-border rounded-lg px-3 py-2 shadow-lg hover:bg-accent transition-colors">
              <input
                type="checkbox"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
                className="sr-only"
              />
              <span className="text-xl">{isLocked ? '🔒' : '🔓'}</span>
            </label>
          </div>

          {/* Right Column - Session History (Scrollable) */}
          <div className="lg:overflow-y-auto lg:pl-3">
            <FadeIn delay={0.3} direction="up">
              <Card className="lg:h-full">
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

                        <div className="font-light text-base tracking-tight">
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
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
