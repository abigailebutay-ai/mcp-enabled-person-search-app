import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const claudeConfigSnippet = `{
  "mcpServers": {
    "person-crud": {
      "command": "pnpm",
      "args": ["mcp:server"],
      "cwd": "C:/Users/KURT/Butay - Week 4/mcp-person-search",
      "env": {
        "DATABASE_URL": "postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require"
      }
    }
  }
}`

const sampleSession = `You: Use tool create_person with:
{
  "name": "MCP Eva",
  "email": "mcp-eva@example.com",
  "phoneNumber": "0412345678"
}

Claude Desktop tool result:
{
  "id": "cm9...",
  "name": "MCP Eva",
  "email": "mcp-eva@example.com",
  "phoneNumber": "0412345678",
  "createdAt": "2026-03-27T09:22:05.233Z",
  "updatedAt": "2026-03-27T09:22:05.233Z"
}`

const sampleCrudFlow = `1) list_people {"query":"MCP"}
2) get_person {"id":"cm9..."}
3) update_person {"id":"cm9...", "phoneNumber":"0498765432"}
4) delete_person {"id":"cm9..."}`

export default function McpSetupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">MCP Setup Guide (Person CRUD)</h1>
          <p className="text-muted-foreground">
            Complete evaluator guide for connecting Claude Desktop to the Person CRUD MCP server in this repository.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge>Create</Badge>
            <Badge variant="secondary">Read</Badge>
            <Badge variant="outline">Update</Badge>
            <Badge variant="outline">Delete</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Prerequisites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Install Node.js 20+, pnpm, and Claude Desktop.</p>
            <p>Set a valid PostgreSQL connection string in your environment as <strong>DATABASE_URL</strong>.</p>
            <p>Install dependencies and generate Prisma client:</p>
            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">pnpm install{`\n`}npx prisma generate</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Register MCP Server in Claude Desktop</CardTitle>
            <CardDescription>
              Add this under your Claude Desktop MCP configuration file.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">{claudeConfigSnippet}</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Run and Verify Locally</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Run the web app:</p>
            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">pnpm dev</pre>
            <p>Run the MCP server directly (optional local verification):</p>
            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">pnpm mcp:server</pre>
            <p>Once Claude Desktop is connected, call each tool and verify database changes from the app homepage and this project&apos;s MCP demo page.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Tools Exposed by MCP Server</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>list_people</strong>: Search by optional name prefix and return people list.</p>
            <p><strong>get_person</strong>: Fetch one person by ID.</p>
            <p><strong>create_person</strong>: Insert a new person.</p>
            <p><strong>update_person</strong>: Update name/email/phoneNumber by ID.</p>
            <p><strong>delete_person</strong>: Remove a person by ID.</p>
            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">{sampleCrudFlow}</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Screenshot / Example Evidence</CardTitle>
            <CardDescription>
              Use this as baseline expected output when validating in Claude Desktop.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">{sampleSession}</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. API and Connection Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>MCP server file: <code>mcp-server/person-crud-server.mjs</code></p>
            <p>Demo endpoint used by <strong>/mcp-demo</strong>: <code>POST /api/mcp-demo</code></p>
            <p>Primary app CRUD endpoint (Week 3 behavior): <code>/api/people</code></p>
            <p>All operations target the same Prisma User model and PostgreSQL database.</p>
          </CardContent>
        </Card>

        <div className="flex gap-3 flex-wrap">
          <Button asChild>
            <Link href="/mcp-demo">Open MCP Live Demo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/github">Open GitHub Page</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to App</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
