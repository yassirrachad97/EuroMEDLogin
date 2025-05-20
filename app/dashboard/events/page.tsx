"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { EventList } from "@/components/event-list"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowDownUp, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCurrentUser, getUserEvents, resetEventData } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function EventsPage() {
  const [myEvents, setMyEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [enableDragDrop, setEnableDragDrop] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = () => {
    // Récupérer l'utilisateur actuel
    const currentUser = getCurrentUser()

    if (currentUser) {
      // Récupérer les événements de l'utilisateur
      const userEvents = getUserEvents(currentUser.id)
      setMyEvents(userEvents)
    }

    setIsLoading(false)
  }

  const handleReset = () => {
    resetEventData()
    loadEvents()
    toast({
      title: "Données réinitialisées",
      description: "Les données d'événements ont été réinitialisées avec succès.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <DashboardHeader heading="Mes événements" text="Gérez vos événements universitaires" />
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Switch
                id="drag-drop-mode"
                checked={enableDragDrop}
                onCheckedChange={setEnableDragDrop}
                className="data-[state=checked]:bg-cyan-500"
              />
              <Label htmlFor="drag-drop-mode" className="text-white flex items-center">
                <ArrowDownUp className="mr-2 h-4 w-4 text-cyan-400" />
                Mode réorganisation
              </Label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Réinitialiser
            </Button>
            <Link href="/dashboard/events/new">
              <Button size="sm" className="h-10 bg-cyan-500 hover:bg-cyan-600 text-white font-medium">
                <PlusCircle className="mr-2 h-5 w-5" />
                Ajouter un événement
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

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
          <EventList events={myEvents} showActions={true} onEventDeleted={loadEvents} enableDragDrop={enableDragDrop} />
        )}
      </motion.div>
    </div>
  )
}
