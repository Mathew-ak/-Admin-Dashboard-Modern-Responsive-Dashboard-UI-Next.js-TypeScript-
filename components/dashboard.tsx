"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { DataTable } from "@/components/data-table"
import { StatCard } from "@/components/stat-card"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

const stats = [
  { icon: DollarSign, label: "Total Revenue", value: "$45,231.89", change: "+12.5%", positive: true },
  { icon: Users, label: "Total Users", value: "2,543", change: "+8.2%", positive: true },
  { icon: ShoppingCart, label: "Total Orders", value: "1,234", change: "-2.3%", positive: false },
  { icon: TrendingUp, label: "Conversion Rate", value: "3.24%", change: "+0.5%", positive: true },
]

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="flex-1 overflow-y-auto bg-background p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <AnalyticsCharts />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed analytics data and insights</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <DataTable />
        </TabsContent>
      </Tabs>
    </main>
  )
}
