"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
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
  createdAt: string
  createdBy: string
}

interface EventListProps {
  events: Event[]
  showActions?: boolean
  onEventDeleted?: () => void
}

export function EventList({ events, showActions = false, onEventDeleted }: EventListProps) {
  const [eventToDelete, setEventToDelete] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleDelete = (id: string) => {
    const success = deleteEvent(id)

    if (success) {
      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès.",
      })

      // Rafraîchir la liste des événements
      if (onEventDeleted) {
        onEventDeleted()
      } else {
        // Forcer un rafraîchissement de la page si aucun callback n'est fourni
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
        <p className="text-muted-foreground">Aucun événement trouvé</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="card-enhanced overflow-hidden bg-card/90 backdrop-blur-md border-border/50">
          <div className="relative h-48 w-full">
<Image
  src="/enetImg.jpg"
  alt={event.title}
  fill
  className="object-cover"
/>


            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3">
              <h3 className="text-lg font-semibold text-white">{event.title}</h3>
              <p className="text-xs text-white/80">Créé le {formatDate(event.createdAt)}</p>
            </div>
          </div>
          <CardContent className="pt-4">
            <p className="line-clamp-3 text-foreground/90">{event.description}</p>
          </CardContent>
          {showActions && (
            <CardFooter className="flex justify-between border-t border-border/30 pt-4">
              <Link href={`/dashboard/events/${event.id}/edit`}>
                <Button variant="outline" size="sm" className="transition-all hover:bg-primary/10">
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
                <AlertDialogContent className="bg-background/95 backdrop-blur-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action ne peut pas être annulée. Cela supprimera définitivement l'événement "{event.title}"
                      et toutes les données associées.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(event.id)}>Supprimer</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
