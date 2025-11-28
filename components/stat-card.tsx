import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  change: string
  positive: boolean
}

export function StatCard({ icon: Icon, label, value, change, positive }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
          <Icon className={cn("w-5 h-5", positive ? "text-green-500" : "text-red-500")} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <p className={cn("text-sm font-medium", positive ? "text-green-500" : "text-red-500")}>
            {change} from last month
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
