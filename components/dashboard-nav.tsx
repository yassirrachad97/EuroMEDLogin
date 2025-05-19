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

  // Fonction pour obtenir l'icône en fonction du nom
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-5 w-5" />
      case "list":
        return <List className="h-5 w-5" />
      case "plus-circle":
        return <PlusCircle className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "users":
        return <Users className="h-5 w-5" />
      case "dashboard":
        return <LayoutDashboard className="h-5 w-5" />
      case "settings":
        return <Settings className="h-5 w-5" />
      case "file-text":
        return <FileText className="h-5 w-5" />
      case "bell":
        return <Bell className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = pathname === item.href

        return (
          <SidebarMenuItem key={item.href} className="mb-2">
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={item.title}
              className={`text-base font-medium ${
                isActive
                  ? "bg-cyan-500/20 text-white border-l-4 border-cyan-500"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              } transition-all duration-200 rounded-md`}
            >
              <Link href={item.href} className="py-3 px-4">
                {getIcon(item.icon)}
                <span className="ml-3">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
