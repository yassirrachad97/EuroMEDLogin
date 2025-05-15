"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { EventList } from "@/components/event-list"
import { useEffect, useState } from "react"
import { getEvents } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"

export default function AllEventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer tous les événements
    const events = getEvents()
    // Trier par date de création (les plus récents d'abord)
    const sortedEvents = [...events].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    setAllEvents(sortedEvents)
    setIsLoading(false)
  }, [])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Tous les événements" text="Découvrez tous les événements de l'université" />

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex justify-center p-4">
            <p>Chargement des événements...</p>
          </div>
        ) : (
          <EventList events={allEvents} showActions={false} />
        )}
      </div>
    </div>
  )
}
