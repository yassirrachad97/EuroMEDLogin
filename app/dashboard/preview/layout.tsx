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

export default function DashboardPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    {
      title: "Aperçu",
      href: "/dashboard/preview",
      icon: "home",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">Université - Aperçu du Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center px-2">
                <span className="text-lg font-bold">Université</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav items={navItems} />
            </SidebarContent>
            <SidebarFooter>
              <div className="px-3 py-2">
                <div className="text-xs text-muted-foreground">© 2023 Université</div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <main className="flex flex-1 flex-col">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
