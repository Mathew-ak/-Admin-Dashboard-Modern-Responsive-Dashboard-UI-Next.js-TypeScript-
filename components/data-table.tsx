"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  joinDate: string
  revenue: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    joinDate: "2024-01-15",
    revenue: "$2,400",
  },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "active", joinDate: "2024-02-20", revenue: "$1,800" },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    status: "inactive",
    joinDate: "2024-03-10",
    revenue: "$3,200",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    status: "active",
    joinDate: "2024-01-25",
    revenue: "$2,100",
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@example.com",
    status: "active",
    joinDate: "2024-04-05",
    revenue: "$1,950",
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank@example.com",
    status: "inactive",
    joinDate: "2024-02-14",
    revenue: "$2,800",
  },
  {
    id: "7",
    name: "Grace Lee",
    email: "grace@example.com",
    status: "active",
    joinDate: "2024-03-30",
    revenue: "$3,100",
  },
  {
    id: "8",
    name: "Henry Wilson",
    email: "henry@example.com",
    status: "active",
    joinDate: "2024-04-18",
    revenue: "$2,500",
  },
]

type SortKey = keyof User
type SortDirection = "asc" | "desc"

export function DataTable() {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<SortDirection>("asc")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")

  const filteredAndSorted = useMemo(() => {
    const filtered = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [search, sortKey, sortDir, statusFilter])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return <div className="w-4 h-4" />
    return sortDir === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Users</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("inactive")}
            >
              Inactive
            </Button>
          </div>
        </div>
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    Name <SortIcon columnKey="name" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                  <button
                    onClick={() => handleSort("email")}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    Email <SortIcon columnKey="email" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                  <button
                    onClick={() => handleSort("joinDate")}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    Join Date <SortIcon columnKey="joinDate" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                  <button
                    onClick={() => handleSort("revenue")}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    Revenue <SortIcon columnKey="revenue" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-foreground font-medium">{user.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                        user.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                      )}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{user.joinDate}</td>
                  <td className="py-4 px-4 font-medium text-foreground">{user.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing {filteredAndSorted.length} of {mockUsers.length} users
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
