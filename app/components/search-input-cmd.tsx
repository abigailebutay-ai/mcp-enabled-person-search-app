'use client'

import * as React from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchCommand } from "@/components/search-command"
import { User } from "../actions/schemas"



export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = React.useCallback(async (value: string) => {
    if (!value.trim()) return []

    const response = await fetch(`/api/people?query=${encodeURIComponent(value)}`)
    if (response.status === 404) return []
    if (!response.ok) throw new Error('Search failed')

    return response.json() as Promise<User[]>
  }, [])

  const handleSelect = React.useCallback((user: User) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('userId', user.id)
    router.push(`/?${params.toString()}`)
    router.refresh()
  }, [router, searchParams])

  return (
    <div className="w-full max-w-md mx-auto">
      <SearchCommand<User>
        onSearch={handleSearch}
        onItemSelect={handleSelect}
        getItemId={(user) => user.id}
        getItemLabel={(user) => user.name}
        placeholder="Search users..."
        noResultsText="No users found."
      />
    </div>
  )
}

