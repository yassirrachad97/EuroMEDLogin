"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { EventList } from "@/components/event-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCurrentUser, getUserEvents } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"

export default function EventsPage() {
  const [myEvents, setMyEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = () => {
    // Récupérer l'utilisateur actuel
    const currentUser = getCurrentUser()

    if (currentUser) {
      // Récupérer les événements de l'utilisateur
      const userEvents = getUserEvents(currentUser.id)
      // Trier par date de création (les plus récents d'abord)
      const sortedEvents = [...userEvents].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      setMyEvents(sortedEvents)
    }

    setIsLoading(false)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Mes événements" text="Gérez vos événements universitaires">
        <Link href="/dashboard/events/new">
          <Button size="sm" className="h-9">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un événement
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex justify-center p-4">
            <p>Chargement des événements...</p>
          </div>
        ) : (
          <EventList events={myEvents} showActions={true} onEventDeleted={loadEvents} />
        )}
      </div>
    </div>
  )
}
