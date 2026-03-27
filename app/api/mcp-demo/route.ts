import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const createSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().regex(/^04\d{8}$/),
})

const updateSchema = createSchema.partial().extend({
  id: z.string().min(1),
})

const deleteSchema = z.object({
  id: z.string().min(1),
})

const getSchema = z.object({
  id: z.string().min(1),
})

const listSchema = z.object({
  query: z.string().optional(),
  limit: z.number().int().min(1).max(100).optional(),
})

async function runOperation(operation: string, payload: unknown) {
  switch (operation) {
    case 'list_people': {
      const input = listSchema.parse(payload)
      const users = await prisma.user.findMany({
        where: input.query
          ? {
              name: {
                startsWith: input.query,
                mode: 'insensitive',
              },
            }
          : undefined,
        orderBy: { name: 'asc' },
        take: input.limit ?? 25,
      })

      return { count: users.length, users }
    }

    case 'get_person': {
      const input = getSchema.parse(payload)
      const user = await prisma.user.findUnique({ where: { id: input.id } })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    }

    case 'create_person': {
      const input = createSchema.parse(payload)
      return prisma.user.create({ data: input })
    }

    case 'update_person': {
      const input = updateSchema.parse(payload)
      const { id, ...rest } = input

      if (Object.keys(rest).length === 0) {
        throw new Error('At least one field is required for update')
      }

      return prisma.user.update({
        where: { id },
        data: rest,
      })
    }

    case 'delete_person': {
      const input = deleteSchema.parse(payload)
      await prisma.user.delete({ where: { id: input.id } })
      return { ok: true, deletedId: input.id }
    }

    default:
      throw new Error(`Unsupported operation: ${operation}`)
  }
}

export async function POST(request: NextRequest) {
  const startedAt = Date.now()

  try {
    const body = await request.json()
    const operation = String(body?.operation ?? '')
    const payload = body?.payload ?? {}

    if (!operation) {
      return NextResponse.json({ error: 'Operation is required.' }, { status: 400 })
    }

    const result = await runOperation(operation, payload)

    return NextResponse.json({
      operation,
      payload,
      result,
      durationMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        durationMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    )
  }
}
