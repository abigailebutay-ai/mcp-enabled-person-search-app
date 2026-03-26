import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Database, Server, Code, Palette, Zap, Linkedin, Twitter } from 'lucide-react'

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
              <li>• <strong>Framework:</strong> Next.js 15 (App Router)</li>
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
              <li>• <strong>API:</strong> Next.js API Routes</li>
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
          <div>
            <h4 className="font-semibold mb-2">Core Technologies</h4>
            <div className="flex flex-wrap gap-2">
              <Badge>Next.js 15</Badge>
              <Badge>React 19</Badge>
              <Badge>TypeScript</Badge>
              <Badge>PostgreSQL</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">UI/UX</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
              <Badge variant="secondary">Radix UI</Badge>
              <Badge variant="secondary">Lucide Icons</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Development Tools</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Prisma</Badge>
              <Badge variant="outline">Zod</Badge>
              <Badge variant="outline">ESLint</Badge>
              <Badge variant="outline">Vercel</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function KeyFeatures() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-6 w-6" />
          Key Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <strong>Full CRUD Operations:</strong> Create, read, update, and delete user records
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <strong>Real-time Search:</strong> Instant search with server-side filtering
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <strong>Responsive Design:</strong> Optimized for desktop and mobile devices
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <strong>Data Validation:</strong> Comprehensive form validation with Zod schemas
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <strong>Database Integration:</strong> Prisma ORM with PostgreSQL backend
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <strong>Modern UI:</strong> Clean interface with dark/light mode support
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <Link href="https://www.linkedin.com/in/callumbir/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="https://github.com/abigailebutay-ai" target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href="https://x.com/callumbir">
          <Twitter className="mr-2 h-4 w-4" /> Contact Me
        </Link>
      </Button>
    </div>
  )
}

function DeveloperInfo() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>About the Developer</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Hi, I&apos;m <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Callum Bir</code>, the developer behind Person Search. I&apos;m passionate about creating 
          efficient, user-friendly web applications using the latest technologies.
        </p>
        <p className="mb-4">
          This project serves as a demonstration of my skills in Next.js, React, and modern frontend development.
          I&apos;m always looking to learn and improve, so feel free to reach out with any questions or feedback!
        </p>
        <SocialLinks />
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
        <TechStack />
        <KeyFeatures />
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
        </div>
      </main>
    </div>
  )
}

