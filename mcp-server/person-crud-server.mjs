import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const prisma = new PrismaClient()

const personCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phoneNumber: z.string().regex(/^04\d{8}$/, 'Phone number must be a valid Australian mobile number.'),
})

const personUpdateSchema = personCreateSchema.partial()

const server = new McpServer({
  name: 'person-crud-mcp-server',
  version: '1.0.0',
})

server.registerTool(
  'list_people',
  {
    title: 'List People',
    description: 'List all people, or search by optional name prefix.',
    inputSchema: {
      query: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
    },
  },
  async ({ query, limit }) => {
    const users = await prisma.user.findMany({
      where: query
        ? {
            name: {
              startsWith: query,
              mode: 'insensitive',
            },
          }
        : undefined,
      orderBy: {
        name: 'asc',
      },
      take: limit ?? 25,
    })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ count: users.length, users }, null, 2),
        },
      ],
    }
  }
)

server.registerTool(
  'get_person',
  {
    title: 'Get Person',
    description: 'Get one person by ID.',
    inputSchema: {
      id: z.string().min(1),
    },
  },
  async ({ id }) => {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return {
        content: [{ type: 'text', text: JSON.stringify({ error: 'User not found' }) }],
        isError: true,
      }
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(user, null, 2) }],
    }
  }
)

server.registerTool(
  'create_person',
  {
    title: 'Create Person',
    description: 'Create a new person in the database.',
    inputSchema: {
      name: z.string(),
      email: z.string(),
      phoneNumber: z.string(),
    },
  },
  async (rawInput) => {
    const input = personCreateSchema.parse(rawInput)

    const user = await prisma.user.create({
      data: input,
    })

    return {
      content: [{ type: 'text', text: JSON.stringify(user, null, 2) }],
    }
  }
)

server.registerTool(
  'update_person',
  {
    title: 'Update Person',
    description: 'Update one or more person fields.',
    inputSchema: {
      id: z.string(),
      name: z.string().optional(),
      email: z.string().optional(),
      phoneNumber: z.string().optional(),
    },
  },
  async ({ id, ...rest }) => {
    const updateData = personUpdateSchema.parse(rest)

    if (Object.keys(updateData).length === 0) {
      return {
        content: [{ type: 'text', text: JSON.stringify({ error: 'At least one field is required for update.' }) }],
        isError: true,
      }
    }

    try {
      const user = await prisma.user.update({
        where: { id },
        data: updateData,
      })

      return {
        content: [{ type: 'text', text: JSON.stringify(user, null, 2) }],
      }
    } catch {
      return {
        content: [{ type: 'text', text: JSON.stringify({ error: 'User not found' }) }],
        isError: true,
      }
    }
  }
)

server.registerTool(
  'delete_person',
  {
    title: 'Delete Person',
    description: 'Delete a person by ID.',
    inputSchema: {
      id: z.string().min(1),
    },
  },
  async ({ id }) => {
    try {
      await prisma.user.delete({ where: { id } })

      return {
        content: [{ type: 'text', text: JSON.stringify({ ok: true, deletedId: id }, null, 2) }],
      }
    } catch {
      return {
        content: [{ type: 'text', text: JSON.stringify({ error: 'User not found' }) }],
        isError: true,
      }
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch(async (error) => {
  console.error('Failed to start MCP server:', error)
  await prisma.$disconnect()
  process.exit(1)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
