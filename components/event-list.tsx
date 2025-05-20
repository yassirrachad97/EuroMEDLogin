"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, MapPin, GripVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteEvent, updateEventOrder } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { motion, Reorder } from "framer-motion"

interface Event {
  id: string
  title: string
  description: string
  imageUrl: string
  startDate?: string
  endDate?: string
  location?: string
  createdAt: string
  createdBy: string
  order?: number
}

interface EventListProps {
  events: Event[]
  showActions?: boolean
  onEventDeleted?: () => void
  enableDragDrop?: boolean
}

export function EventList({ events, showActions = false, onEventDeleted, enableDragDrop = false }: EventListProps) {
  const [eventToDelete, setEventToDelete] = useState<string | null>(null)
  const [reorderableEvents, setReorderableEvents] = useState<Event[]>(events)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    setReorderableEvents([...events])
  }, [events])

  // Fonction de formatage robuste avec mois en toutes lettres
  const formatEventDate = (dateString?: string) => {
    if (!dateString) return "Date non spécifiée"

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return "Date invalide"

      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date)
    } catch {
      return "Date invalide"
    }
  }

  const handleDelete = (id: string) => {
    const success = deleteEvent(id)

    if (success) {
      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès.",
      })

      if (onEventDeleted) {
        onEventDeleted()
      } else {
        router.refresh()
      }
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'événement.",
        variant: "destructive",
      })
    }

    setEventToDelete(null)
  }

  const handleReorder = (newOrder: Event[]) => {
    setReorderableEvents(newOrder)

    if (enableDragDrop) {
      const updatedEvents = newOrder.map((event, index) => ({
        ...event,
        order: index,
      }))
      updateEventOrder(updatedEvents)

      toast({
        title: "Ordre mis à jour",
        description: "L'ordre des événements a été mis à jour.",
      })
    }
  }

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-white/70">Aucun événement trouvé</p>
      </div>
    )
  }

  const EventCard = ({ event, index, isDraggable = false }: { event: Event; index: number; isDraggable?: boolean }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        layout
        className="h-full w-full"
      >
        <Card
          className={`card-enhanced overflow-hidden bg-white/10 backdrop-blur-md border-white/20 h-full flex flex-col relative ${isDraggable ? "border-cyan-400 border-opacity-50" : ""}`}
        >
          {isDraggable && showActions && (
            <div className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing p-2 rounded-full bg-black/70 text-white hover:bg-cyan-800/70 transition-colors">
              <GripVertical className="h-5 w-5" />
            </div>
          )}

          <div className="relative h-48 w-full">
            <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3">
              <h3 className="text-lg font-semibold text-white">{event.title}</h3>
              <p className="text-xs text-white/80">
                {event.startDate && event.endDate
                  ? `Du ${formatEventDate(event.startDate)} au ${formatEventDate(event.endDate)}`
                  : event.startDate
                    ? `Le ${formatEventDate(event.startDate)}`
                    : "Date non spécifiée"}
              </p>
            </div>
          </div>

          <div className="bg-cyan-900/50 w-full px-4 py-2">
            {event.location && (
              <div className="flex items-center text-white/90 text-sm">
                <MapPin className="h-4 w-4 mr-2 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>

          <CardContent className="pt-4 flex-1">
            <p className="line-clamp-3 text-white/90">{event.description}</p>
          </CardContent>

          {showActions && (
            <CardFooter className="flex justify-between border-t border-white/20 pt-4">
              <Link href={`/dashboard/events/${event.id}/edit`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </Link>
              <AlertDialog open={eventToDelete === event.id} onOpenChange={(open) => !open && setEventToDelete(null)}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="transition-all hover:bg-destructive/90"
                    onClick={() => setEventToDelete(event.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-black/90 backdrop-blur-lg border-white/20 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                    <AlertDialogDescription className="text-white/70">
                      Cette action ne peut pas être annulée. Cela supprimera définitivement l'événement "{event.title}"
                      et toutes les données associées.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
                      Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    )
  }

  if (enableDragDrop && showActions) {
    return (
      <div className="w-full space-y-6">
        <Reorder.Group
          axis="y"
          values={reorderableEvents}
          onReorder={handleReorder}
          className="flex flex-col space-y-6 w-full"
        >
          {reorderableEvents.map((event, index) => (
            <Reorder.Item key={event.id} value={event} className="w-full">
              <EventCard event={event} index={index} isDraggable={true} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </div>
  )
}
