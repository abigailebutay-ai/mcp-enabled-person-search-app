import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/app/actions/schemas'
import { searchUsers, addUser, updateUser, deleteUser } from '@/app/actions/actions'

export const dynamic = 'force-dynamic'

function getErrorMessage(error: unknown): string {
  const e = error as { code?: string; message?: string }

  if (e?.code === 'P2002') {
    return 'Email already exists. Please use a different email.'
  }

  if (e?.code === 'P2025') {
    return 'User not found.'
  }

  if (typeof e?.message === 'string' && e.message.length > 0) {
    return e.message
  }

  return 'Internal server error'
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const users: User[] = await searchUsers(query)

    if (users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 })
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error searching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newUser = await addUser(body)
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    const message = getErrorMessage(error)
    const status = message.includes('exists') ? 409 : 400
    return NextResponse.json({ error: message }, { status })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const updatedUser = await updateUser(id, updateData)
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    const message = getErrorMessage(error)
    const status = message === 'User not found.' ? 404 : 400
    return NextResponse.json({ error: message }, { status })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    await deleteUser(id)
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    const message = getErrorMessage(error)
    const status = message === 'User not found.' ? 404 : 400
    return NextResponse.json({ error: message }, { status })
  }
}