import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Server, Shield, Zap } from 'lucide-react'

export default function DatabasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Database Architecture</h1>
          <p className="text-muted-foreground">
            Complete overview of our database design and implementation
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6" />
              Prisma Schema Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre>{`model User {
  id          String   @id @default(cuid())
  name        String
  email       String   @unique
  phoneNumber String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`}</pre>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Database Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Database Type</span>
                <Badge>PostgreSQL</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>ORM</span>
                <Badge variant="secondary">Prisma</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Hosting</span>
                <Badge variant="outline">Prisma Postgres</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Connection</span>
                <Badge variant="outline">SSL Encrypted</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data Validation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Schema Validation</span>
                <Badge>Zod</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Email Format</span>
                <Badge variant="secondary">Validated</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Phone Format</span>
                <Badge variant="secondary">AU Mobile</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Required Fields</span>
                <Badge variant="outline">Enforced</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Database Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Create</h4>
                <p className="text-sm text-muted-foreground">
                  Adds new users with automatic ID generation and timestamp tracking.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Read</h4>
                <p className="text-sm text-muted-foreground">
                  Retrieves users with case-insensitive search by name prefix.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Update</h4>
                <p className="text-sm text-muted-foreground">
                  Modifies existing user data with validation and timestamp updates.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Delete</h4>
                <p className="text-sm text-muted-foreground">
                  Removes users permanently with proper error handling.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sample Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The database is pre-populated with 10 sample users for testing purposes:
            </p>
            <div className="bg-muted p-3 rounded text-sm font-mono">
              John Doe, Jane Smith, Alice Johnson, Bob Williams,
              Charlie Brown, Emily Davis, Frank Miller, Grace Lee,
              Henry Moore, Isabella Young
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}