'use client'

import { useState, useEffect } from 'react'
import { getUserById } from '@/app/actions/actions'
import { User } from '@/app/actions/schemas'

export function useUser(userId: string | null) {
  const [user, setUser] = useState<User | null>(null)
  const applyUser = (fetchedUser: User | null) => setUser(fetchedUser)

  useEffect(() => {
    if (userId) {
      getUserById(userId).then(fetchedUser => {
        applyUser(fetchedUser ?? null)
      })
    } else {
      queueMicrotask(() => applyUser(null))
    }
  }, [userId])

  const mutate = () => {
    if (userId) {
      getUserById(userId).then(fetchedUser => {
        applyUser(fetchedUser ?? null)
      })
    }
  }

  return { user, mutate }
}

