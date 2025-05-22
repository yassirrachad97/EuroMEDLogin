"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, MapPin, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
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
import { deleteEvent } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

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
  compact?: boolean
}

export function EventList({ events, showActions = false, onEventDeleted, compact = false }: EventListProps) {
  const [eventToDelete, setEventToDelete] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

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

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-gray-500">Aucun événement trouvé</p>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">{event.title}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>
                  {event.startDate && event.endDate ? `${formatEventDate(event.startDate)}` : "Date non spécifiée"}
                </span>
              </div>
            </div>
            {event.location && (
              <div className="text-xs text-gray-500 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate max-w-[100px]">{event.location}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card
          key={event.id}
          className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={event.imageUrl || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Badge de date */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="flex items-center text-xs font-medium text-gray-700">
                <Clock className="h-3 w-3 mr-1" />
                {event.startDate ? formatEventDate(event.startDate).split(" ")[0] : "TBD"}
              </div>
            </div>

            {/* Titre sur l'image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{event.title}</h3>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>

            <div className="space-y-2">
              {event.startDate && event.endDate && (
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-4 w-4 mr-2 text-violet-500" />
                  <span>
                    {event.startDate === event.endDate
                      ? `Le ${formatEventDate(event.startDate)}`
                      : `Du ${formatEventDate(event.startDate)} au ${formatEventDate(event.endDate)}`}
                  </span>
                </div>
              )}

              {event.location && (
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-4 w-4 mr-2 text-violet-500" />
                  <span className="truncate">{event.location}</span>
                </div>
              )}
            </div>

            {showActions && (
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Link href={`/dashboard/events/${event.id}/edit`} className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-violet-600 border-violet-200 hover:bg-violet-50 hover:border-violet-300"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                </Link>
                <AlertDialog open={eventToDelete === event.id} onOpenChange={(open) => !open && setEventToDelete(null)}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                      onClick={() => setEventToDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action ne peut pas être annulée. Cela supprimera définitivement l'événement "{event.title}
                        " et toutes les données associées.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
