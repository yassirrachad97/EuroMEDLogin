"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { EventForm } from "@/components/event-form"
import { useEffect, useState } from "react"
import { getEventById } from "@/lib/local-storage"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

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
      <div className="flex-1 w-full p-0">
        <div className="px-4 md:px-8 pt-6">
          <DashboardHeader heading="Chargement..." text="Veuillez patienter" />
          <div className="flex justify-center p-4">
            <p className="text-white/70">Chargement des données de l'événement...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex-1 w-full p-0">
        <div className="px-4 md:px-8 pt-6">
          <DashboardHeader heading="Événement non trouvé" text="L'événement que vous cherchez n'existe pas" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 md:px-8 pt-6"
      >
        <DashboardHeader heading="Modifier l'événement" text="Modifiez les détails de votre événement" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full mt-4"
      >
        <EventForm event={event} />
      </motion.div>
    </div>
  )
}
