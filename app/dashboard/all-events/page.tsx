"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { EventList } from "@/components/event-list"
import { EventCarousel } from "@/components/event-carousel"
import { useEffect, useState } from "react"
import { getEvents } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AllEventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState<"carousel" | "grid">("carousel")

  useEffect(() => {
    // Récupérer tous les événements
    const events = getEvents()
    // Trier par date de création (les plus récents d'abord)
    const sortedEvents = [...events].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    setAllEvents(sortedEvents)
    setIsLoading(false)
  }, [])

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <DashboardHeader heading="Tous les événements" text="Découvrez tous les événements de l'université" />
      </motion.div>

      <Tabs defaultValue="carousel" className="w-full" onValueChange={(value) => setActiveView(value as any)}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="carousel" className="data-[state=active]:bg-cyan-500">
            Vue Carrousel
          </TabsTrigger>
          <TabsTrigger value="grid" className="data-[state=active]:bg-cyan-500">
            Vue Grille
          </TabsTrigger>
        </TabsList>

        <TabsContent value="carousel" className="mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="flex justify-center items-center h-96">
                  <p className="text-white/70">Chargement des événements...</p>
                </CardContent>
              </Card>
            ) : (
              <EventCarousel events={allEvents} />
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="grid" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid gap-4"
          >
            {isLoading ? (
              <div className="flex justify-center p-4">
                <p className="text-white/70">Chargement des événements...</p>
              </div>
            ) : (
              <EventList events={allEvents} showActions={false} />
            )}
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">À propos des événements</CardTitle>
            <CardDescription className="text-white/70">
              Découvrez tous les événements organisés par l'université
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Cette section vous permet de visualiser tous les événements de l'université, quelle que soit la personne
              qui les a créés. Utilisez la vue carrousel pour une présentation immersive ou la vue grille pour voir
              plusieurs événements à la fois.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
