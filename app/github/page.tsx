import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Server } from 'lucide-react'

export default function GithubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-6 w-6" />
              GitHub Repository
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This MCP-enabled Person application is open source and available on GitHub.
              The repository includes both the Next.js app and a Person CRUD MCP server for Claude Desktop.
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Repository Information</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>Owner:</strong> abigailebutay-ai</li>
                <li><strong>Repository:</strong> person-search-app</li>
                <li><strong>License:</strong> MIT</li>
                <li><strong>Language:</strong> TypeScript</li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Server className="h-4 w-4" /> MCP Server Location
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Person CRUD MCP server source is in <strong>mcp-server/person-crud-server.mjs</strong>.
              </p>
              <Button variant="secondary" asChild>
                <Link
                  href="https://github.com/abigailebutay-ai/person-search-app/tree/main/mcp-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Open MCP Server Folder
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex gap-4">
              <Button asChild>
                <Link
                  href="https://github.com/abigailebutay-ai/person-search-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  Back to App
                </Link>
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Features Implemented</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Full CRUD operations for user management</li>
                <li>• Real-time search functionality</li>
                <li>• Person CRUD MCP server for Claude Desktop</li>
                <li>• In-app MCP live testing at /mcp-demo</li>
                <li>• MCP setup documentation at /mcp-setup</li>
                <li>• Responsive design for mobile and desktop</li>
                <li>• Database integration with Prisma ORM</li>
                <li>• Form validation with Zod schemas</li>
                <li>• Modern UI with shadcn/ui components</li>
                <li>• Server-side rendering with Next.js 16</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}