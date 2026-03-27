import McpDemoClient from '@/app/components/mcp-demo-client'

export const dynamic = 'force-dynamic'

export default function McpDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="max-w-4xl space-y-2">
        <h1 className="text-3xl font-bold">MCP Live Demo</h1>
        <p className="text-muted-foreground">
          Run live MCP-style Person CRUD operations against the same PostgreSQL database used by the main app.
        </p>
      </div>

      <McpDemoClient />
    </div>
  )
}
