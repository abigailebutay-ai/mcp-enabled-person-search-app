import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Database, Server, Code, Zap } from 'lucide-react'

function ArchitectureOverview() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-6 w-6" />
          Application Architecture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Frontend Layer
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Framework:</strong> Next.js 16 (App Router)</li>
              <li>• <strong>Language:</strong> TypeScript</li>
              <li>• <strong>UI Library:</strong> React 19</li>
              <li>• <strong>Styling:</strong> Tailwind CSS</li>
              <li>• <strong>Components:</strong> shadcn/ui + Radix UI</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Backend Layer
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Runtime:</strong> Node.js</li>
              <li>• <strong>Database:</strong> PostgreSQL</li>
              <li>• <strong>ORM:</strong> Prisma</li>
              <li>• <strong>Validation:</strong> Zod</li>
              <li>• <strong>Primary CRUD:</strong> Next.js Server Actions + Routes</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function McpArchitecture() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-6 w-6" />
          MCP Integration Architecture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">MCP Server</h4>
            <ul className="space-y-2 text-sm">
              <li>• File: <strong>mcp-server/person-crud-server.mjs</strong></li>
              <li>• Protocol: Model Context Protocol (MCP) over stdio</li>
              <li>• Tools: list_people, get_person, create_person, update_person, delete_person</li>
              <li>• Data Access: Prisma Client to PostgreSQL User table</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Testing and Visibility</h4>
            <ul className="space-y-2 text-sm">
              <li>• `/mcp-demo`: real-time MCP-style CRUD execution panel</li>
              <li>• `/mcp-setup`: full Claude Desktop setup and config docs</li>
              <li>• `/`: direct in-app CRUD on same database model</li>
              <li>• Result: evaluators can verify both app and MCP pathways</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TechStack() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-6 w-6" />
          Technology Stack
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold mb-2">Core</h4>
            <div className="flex flex-wrap gap-2">
              <Badge>Next.js 16</Badge>
              <Badge>React 19</Badge>
              <Badge>TypeScript</Badge>
              <Badge>PostgreSQL</Badge>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold mb-2">Data and Validation</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Prisma ORM</Badge>
              <Badge variant="secondary">Zod</Badge>
              <Badge variant="secondary">Server Actions</Badge>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold mb-2">MCP</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">@modelcontextprotocol/sdk</Badge>
              <Badge variant="outline">Claude Desktop</Badge>
              <Badge variant="outline">stdio transport</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DeveloperInfo() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Project Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This application demonstrates a production-style architecture where user records can be managed directly through the web UI and through an external MCP server connected to Claude Desktop.
        </p>
        <p className="mb-4">
          Both paths use the same Prisma User model and PostgreSQL database, ensuring that CRUD operations remain consistent regardless of entry point.
        </p>
        <Button asChild variant="outline">
          <Link href="https://github.com/abigailebutay-ai/person-search-app" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> View Repository
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About Person Search</h1>
        <ArchitectureOverview />
        <McpArchitecture />
        <TechStack />
        <DeveloperInfo />
        <div className="flex gap-4 mt-8">
          <Button asChild variant="link">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/database">
              View Database Schema
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/github">
              View on GitHub
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/mcp-setup">
              MCP Setup
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/mcp-demo">
              MCP Demo
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

