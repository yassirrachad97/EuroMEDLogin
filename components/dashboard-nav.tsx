"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, List, PlusCircle, Calendar, Settings } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Mes événements",
      href: "/dashboard/events",
      icon: <List className="h-5 w-5" />,
      badge: 3,
    },
    {
      title: "Tous les événements",
      href: "/dashboard/all-events",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Ajouter un événement",
      href: "/dashboard/events/new",
      icon: <PlusCircle className="h-5 w-5" />,
    },
   
  ]

  return (
    <nav className="space-y-1 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive ? "bg-violet-700 text-white" : "text-white/80 hover:bg-violet-700/50 hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
