import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TechnicalOverview() {
  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>How it works</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          The search functionality is implemented using a server action backed by PostgreSQL through Prisma. The AsyncSelect component sends the search query to the server action, which filters persisted users based on a{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            startsWith
          </code>
          {" "}matching logic. This same User model is also exposed by the MCP server for Claude Desktop CRUD operations and by the in-app MCP demo tester.
        </p>
      </CardContent>
    </Card>
  )
}

