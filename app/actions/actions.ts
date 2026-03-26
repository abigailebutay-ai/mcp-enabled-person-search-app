//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { User, userSchema } from './schemas'
import { prisma } from '@/lib/prisma'

export async function searchUsers(query: string): Promise<User[]> {
    console.log('Searching users with query:', query)
    const results = await prisma.user.findMany({
        where: {
            name: {
                startsWith: query,
                mode: 'insensitive'
            }
        }
    })
    console.log('Search results:', results)
    return results
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
    const validatedUser = userSchema.omit({ id: true }).parse(data)
    const newUser = await prisma.user.create({
        data: validatedUser
    })
    revalidatePath('/')
    return newUser
}

export async function deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
        where: { id }
    })
    console.log(`User with id ${id} has been deleted.`)
    revalidatePath('/')
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    const validatedUser = userSchema.omit({ id: true }).partial().parse(data)
    const updatedUser = await prisma.user.update({
        where: { id },
        data: validatedUser
    })
    console.log(`User with id ${id} has been updated.`)
    revalidatePath('/')
    return updatedUser
}

export async function getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { id }
    })
    return user
}

// Seed function to add initial data
export async function seedDatabase() {
    const existingUsers = await prisma.user.count()
    if (existingUsers > 0) return

    const sampleUsers = [
        { name: 'John Doe', phoneNumber: '0412345678', email: 'john@example.com' },
        { name: 'Jane Smith', phoneNumber: '0423456789', email: 'jane@example.com' },
        { name: 'Alice Johnson', phoneNumber: '0434567890', email: 'alice@example.com' },
        { name: 'Bob Williams', phoneNumber: '0445678901', email: 'bob@example.com' },
        { name: 'Charlie Brown', phoneNumber: '0456789012', email: 'charlie@example.com' },
        { name: 'Emily Davis', phoneNumber: '0467890123', email: 'emily@example.com' },
        { name: 'Frank Miller', phoneNumber: '0478901234', email: 'frank@example.com' },
        { name: 'Grace Lee', phoneNumber: '0489012345', email: 'grace@example.com' },
        { name: 'Henry Moore', phoneNumber: '0490123456', email: 'henry@example.com' },
        { name: 'Isabella Young', phoneNumber: '0401234567', email: 'isabella@example.com' },
    ]

    await prisma.user.createMany({
        data: sampleUsers
    })

    console.log('Database seeded with sample users')
}
