import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "Mes événements",
      href: "/dashboard/events",
      icon: "list",
    },
    {
      title: "Nouvel événement",
      href: "/dashboard/events/new",
      icon: "plus-circle",
    },
    {
      title: "Tous les événements",
      href: "/dashboard/all-events",
      icon: "calendar",
    },
    {
      title: "Utilisateurs",
      href: "/dashboard/users",
      icon: "users",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col relative">
        {/* Image de fond et overlay pour le dashboard */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/formation.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <header className="sticky top-0 z-40 border-b border-white/20 bg-black/70 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white">Université - Gestion d'événements</h1>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <div className="flex flex-1 z-10">
          <Sidebar className="bg-black/80 backdrop-blur-md border-r border-r-white/20">
            <SidebarHeader className="border-b border-white/10 pb-4">
              <div className="flex items-center px-2">
                <span className="text-xl font-bold text-cyan-400">Université</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav items={navItems} />
            </SidebarContent>
            <SidebarFooter>
              <div className="px-3 py-2 border-t border-white/10 mt-2">
                <div className="text-xs text-white/70">© 2023 Université</div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <main className="flex flex-1 flex-col bg-black/40 backdrop-blur-sm">
              <div className="animate-fadeIn">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
