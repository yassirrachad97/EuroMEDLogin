"use client"
import { EventList } from "@/components/event-list"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowDownUp, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCurrentUser, getUserEvents, resetEventData } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mes événements</h1>
          <p className="text-muted-foreground">Gérez vos événements universitaires</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Réinitialiser
          </Button>
          <Link href="/dashboard/events/new">
            <Button className="bg-violet-600 hover:bg-violet-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un événement
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Options d'affichage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="drag-drop-mode" checked={enableDragDrop} onCheckedChange={setEnableDragDrop} />
            <Label htmlFor="drag-drop-mode" className="flex items-center">
              <ArrowDownUp className="mr-2 h-4 w-4 text-violet-600" />
              Mode réorganisation
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex justify-center p-4">
            <p className="text-gray-500">Chargement des événements...</p>
          </div>
        ) : (
          <EventList events={myEvents} showActions={true} onEventDeleted={loadEvents} />
        )}
      </div>
    </div>
  )
}
