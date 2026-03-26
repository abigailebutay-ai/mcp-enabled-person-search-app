import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from 'lucide-react'

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
              This Person Search application is open source and available on GitHub.
              You can view the source code, contribute to the project, or report issues.
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
                <li>• Responsive design for mobile and desktop</li>
                <li>• Database integration with Prisma ORM</li>
                <li>• Form validation with Zod schemas</li>
                <li>• Modern UI with shadcn/ui components</li>
                <li>• Server-side rendering with Next.js 15</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}