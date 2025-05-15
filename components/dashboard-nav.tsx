"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Home, List, PlusCircle, Calendar, Users, LayoutDashboard, Settings, FileText, Bell } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: string
}

interface DashboardNavProps {
  items: NavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname()

  if (!items?.length) {
    return null
  }

 
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-4 w-4" />
      case "list":
        return <List className="h-4 w-4" />
      case "plus-circle":
        return <PlusCircle className="h-4 w-4" />
      case "calendar":
        return <Calendar className="h-4 w-4" />
      case "users":
        return <Users className="h-4 w-4" />
      case "dashboard":
        return <LayoutDashboard className="h-4 w-4" />
      case "settings":
        return <Settings className="h-4 w-4" />
      case "file-text":
        return <FileText className="h-4 w-4" />
      case "bell":
        return <Bell className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = pathname === item.href

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <Link href={item.href}>
                {getIcon(item.icon)}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
