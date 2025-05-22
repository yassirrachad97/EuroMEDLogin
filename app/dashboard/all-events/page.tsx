"use client"

import { useEffect, useState } from "react"
import { getEvents } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { EventList } from "@/components/event-list"
import { EventCarousel } from "@/components/event-carousel"

export default function AllEventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState<"carousel" | "grid">("grid")

  useEffect(() => {
    // Récupérer tous les événements
    const events = getEvents()
    // Trier par date de création (les plus récents d'abord)
    const sortedEvents = [...events].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    setAllEvents(sortedEvents)
    setIsLoading(false)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tous les événements</h1>
        <p className="text-muted-foreground">Découvrez tous les événements de l'université</p>
      </div>

      <Tabs defaultValue="grid" className="w-full" onValueChange={(value) => setActiveView(value as any)}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="grid">Vue Grille</TabsTrigger>
          <TabsTrigger value="carousel">Vue Carrousel</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-0">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <p className="text-gray-500">Chargement des événements...</p>
            </div>
          ) : (
            <EventList events={allEvents} showActions={false} />
          )}
        </TabsContent>

        <TabsContent value="carousel" className="mt-0">
          {isLoading ? (
            <Card>
              <CardContent className="flex justify-center items-center h-96">
                <p className="text-gray-500">Chargement des événements...</p>
              </CardContent>
            </Card>
          ) : (
            <EventCarousel events={allEvents} />
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">À propos des événements</h3>
          <p className="text-gray-600">
            Cette section vous permet de visualiser tous les événements de l'université, quelle que soit la personne qui
            les a créés. Utilisez la vue carrousel pour une présentation immersive ou la vue grille pour voir plusieurs
            événements à la fois.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
