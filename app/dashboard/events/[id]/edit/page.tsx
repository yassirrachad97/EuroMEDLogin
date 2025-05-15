"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { EventForm } from "@/components/event-form"
import { useEffect, useState } from "react"
import { getEventById } from "@/lib/local-storage"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function EditEventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Récupérer l'événement par son ID
    const eventData = getEventById(params.id)

    if (eventData) {
      setEvent(eventData)
    } else {
      toast({
        title: "Événement non trouvé",
        description: "L'événement que vous essayez de modifier n'existe pas.",
        variant: "destructive",
      })
      router.push("/dashboard/events")
    }

    setIsLoading(false)
  }, [params.id, router, toast])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader heading="Chargement..." text="Veuillez patienter" />
        <div className="flex justify-center p-4">
          <p>Chargement des données de l'événement...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader heading="Événement non trouvé" text="L'événement que vous cherchez n'existe pas" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Modifier l'événement" text="Modifiez les détails de votre événement" />

      <div className="grid gap-4">
        <EventForm event={event} />
      </div>
    </div>
  )
}
