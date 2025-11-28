"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronDown,
  Activity,
  FileText,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "#",
    submenu: [
      { label: "Revenue", href: "#" },
      { label: "Traffic", href: "#" },
      { label: "Users", href: "#" },
    ],
  },
  { icon: Users, label: "Users", href: "#" },
  { icon: ShoppingCart, label: "Orders", href: "#" },
  { icon: FileText, label: "Reports", href: "#" },
  { icon: Activity, label: "Monitoring", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function Sidebar({ isOpen }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>("Analytics")

  return (
    <aside
      className={cn(
        "w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-hidden",
        !isOpen && "w-0",
      )}
    >
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            AD
          </div>
          <div className={cn(!isOpen && "hidden")}>
            <h1 className="font-bold text-sidebar-foreground">Dashboard</h1>
            <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isExpanded = expandedMenu === item.label
          const hasSubmenu = "submenu" in item && item.submenu

          return (
            <div key={item.label}>
              <button
                onClick={() => hasSubmenu && setExpandedMenu(isExpanded ? null : item.label)}
                className={cn(
                  "w-full px-6 py-3 flex items-center gap-3 hover:bg-sidebar-accent/50 transition-colors group",
                  isExpanded && "bg-sidebar-accent",
                )}
              >
                <Icon className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-sidebar-foreground transition-colors" />
                <span className="text-sm font-medium text-sidebar-foreground flex-1 text-left">{item.label}</span>
                {hasSubmenu && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-sidebar-foreground/60 transition-transform",
                      isExpanded && "rotate-180",
                    )}
                  />
                )}
              </button>

              {hasSubmenu && isExpanded && "submenu" in item && (
                <div className="bg-sidebar-accent/30">
                  {item.submenu.map((subitem) => (
                    <a
                      key={subitem.label}
                      href={subitem.href}
                      className="block px-12 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                    >
                      {subitem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="px-2 py-3 rounded-lg bg-sidebar-accent/30 text-center">
          <p className="text-xs text-sidebar-foreground/60">Admin</p>
          <p className="text-sm font-semibold text-sidebar-foreground">John Doe</p>
        </div>
      </div>
    </aside>
  )
}
