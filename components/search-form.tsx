"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

interface SearchFormProps {
  initialQuery?: string
}

export default function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      // We don't need to set isSearching to false here as the page will reload
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isSearching}>
        {isSearching ? "Searching..." : "Search"}
      </Button>
    </form>
  )
}

