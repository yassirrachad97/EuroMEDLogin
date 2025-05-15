"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { EventList } from "@/components/event-list"
import { DashboardHeader } from "@/components/dashboard-header"
import { useEffect, useState } from "react"
import { getCurrentUser, getUserEvents } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"

export default function DashboardPage() {
  const [recentEvents, setRecentEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
 
    const currentUser = getCurrentUser()

    if (currentUser) {
     
      const userEvents = getUserEvents(currentUser.id)
    
      const sortedEvents = [...userEvents].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
     
      setRecentEvents(sortedEvents.slice(0, 2))
    }

    setIsLoading(false)
  }, [])

  const refreshEvents = () => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      const userEvents = getUserEvents(currentUser.id)
      const sortedEvents = [...userEvents].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      setRecentEvents(sortedEvents.slice(0, 2))
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <DashboardHeader heading="Tableau de bord" text="Gérez vos événements universitaires">
        <Link href="/dashboard/events/new">
          <Button size="sm" className="h-9 transition-all hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un événement
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-enhanced bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des événements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{recentEvents.length}</div>
            <p className="text-xs text-muted-foreground">+0% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="card-enhanced bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">120</div>
            <p className="text-xs text-muted-foreground">+10% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="card-enhanced bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">45</div>
            <p className="text-xs text-muted-foreground">+25% depuis le mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        <Card className="card-enhanced col-span-1 bg-card/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Vos événements récents</CardTitle>
            <CardDescription>
              {isLoading ? "Chargement..." : `Vous avez créé ${recentEvents.length} événements récemment`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <p>Chargement des événements...</p>
              </div>
            ) : (
              <EventList events={recentEvents} showActions={true} onEventDeleted={refreshEvents} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
