'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type Operation = 'list_people' | 'get_person' | 'create_person' | 'update_person' | 'delete_person'

type DemoLog = {
  id: string
  operation: Operation
  request: unknown
  ok: boolean
  response: unknown
  createdAt: string
}

const samplePayloadByOperation: Record<Operation, string> = {
  list_people: JSON.stringify({ query: 'Ja', limit: 10 }, null, 2),
  get_person: JSON.stringify({ id: 'replace-with-real-id' }, null, 2),
  create_person: JSON.stringify(
    {
      name: 'MCP Demo User',
      email: `mcp-demo-${Date.now()}@example.com`,
      phoneNumber: '0412345678',
    },
    null,
    2
  ),
  update_person: JSON.stringify({ id: 'replace-with-real-id', phoneNumber: '0499999999' }, null, 2),
  delete_person: JSON.stringify({ id: 'replace-with-real-id' }, null, 2),
}

function parsePayload(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch {
    throw new Error('Payload must be valid JSON.')
  }
}

export default function McpDemoClient() {
  const [operation, setOperation] = useState<Operation>('list_people')
  const [payloadText, setPayloadText] = useState(samplePayloadByOperation.list_people)
  const [logs, setLogs] = useState<DemoLog[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const endpoint = useMemo(() => '/api/mcp-demo', [])

  const resetPayload = (nextOperation: Operation) => {
    setPayloadText(samplePayloadByOperation[nextOperation])
  }

  const handleRun = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const payload = parsePayload(payloadText)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation, payload }),
      })

      const body = await response.json()
      const ok = response.ok

      setLogs((previous) => [
        {
          id: crypto.randomUUID(),
          operation,
          request: payload,
          ok,
          response: body,
          createdAt: new Date().toISOString(),
        },
        ...previous,
      ])

      if (!ok) {
        setError(typeof body?.error === 'string' ? body.error : 'Request failed.')
      }
    } catch (runError) {
      const message = runError instanceof Error ? runError.message : 'Unknown error'
      setError(message)
      setLogs((previous) => [
        {
          id: crypto.randomUUID(),
          operation,
          request: payloadText,
          ok: false,
          response: { error: message },
          createdAt: new Date().toISOString(),
        },
        ...previous,
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>MCP CRUD Tester</CardTitle>
          <CardDescription>
            This interface sends MCP-style tool calls to the in-app demo endpoint to validate Create, Read, Update, and Delete behavior in real time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="operation">Operation</Label>
            <Select
              value={operation}
              onValueChange={(value) => {
                const next = value as Operation
                setOperation(next)
                resetPayload(next)
              }}
            >
              <SelectTrigger id="operation">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list_people">list_people</SelectItem>
                <SelectItem value="get_person">get_person</SelectItem>
                <SelectItem value="create_person">create_person</SelectItem>
                <SelectItem value="update_person">update_person</SelectItem>
                <SelectItem value="delete_person">delete_person</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payload">Payload (JSON)</Label>
            <Textarea
              id="payload"
              value={payloadText}
              onChange={(event) => setPayloadText(event.target.value)}
              className="min-h-[220px] font-mono"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleRun} disabled={isLoading}>
              {isLoading ? 'Running...' : 'Run MCP Operation'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setLogs([])
                setError(null)
              }}
            >
              Clear History
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Operation Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Execution History</CardTitle>
          <CardDescription>
            Latest executions appear first. Use created IDs from create/list responses to test get, update, and delete.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No MCP operations executed yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="rounded-md border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{log.operation}</p>
                  <p className={`text-xs ${log.ok ? 'text-green-600' : 'text-red-600'}`}>
                    {log.ok ? 'SUCCESS' : 'ERROR'}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</p>
                <div>
                  <p className="text-xs font-medium mb-1">Request</p>
                  <pre className="text-xs bg-muted rounded p-3 overflow-x-auto">
                    {JSON.stringify(log.request, null, 2)}
                  </pre>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Response</p>
                  <pre className="text-xs bg-muted rounded p-3 overflow-x-auto">
                    {JSON.stringify(log.response, null, 2)}
                  </pre>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
