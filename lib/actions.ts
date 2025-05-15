"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Types
interface EventFormData {
  title: string
  description: string
  mediaType: "image" | "video"
  mediaUrl: string
}

// Action pour créer un événement
export async function createEvent(formData: EventFormData) {
  try {
    // Dans une application réelle, vous feriez un appel à votre API ou base de données
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la création de l'événement")
    }

    // Revalider le chemin pour mettre à jour les données
    revalidatePath("/dashboard/events")

    // Rediriger vers la liste des événements
    redirect("/dashboard/events")
  } catch (error) {
    console.error("Erreur lors de la création de l'événement:", error)
    throw error
  }
}

// Action pour mettre à jour un événement
export async function updateEvent(id: string, formData: EventFormData) {
  try {
    // Dans une application réelle, vous feriez un appel à votre API ou base de données
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'événement")
    }

    // Revalider le chemin pour mettre à jour les données
    revalidatePath("/dashboard/events")
    revalidatePath(`/dashboard/events/${id}`)

    // Rediriger vers la liste des événements
    redirect("/dashboard/events")
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement:", error)
    throw error
  }
}

// Action pour supprimer un événement
export async function deleteEvent(id: string) {
  try {
    // Dans une application réelle, vous feriez un appel à votre API ou base de données
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/events/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'événement")
    }

    // Revalider le chemin pour mettre à jour les données
    revalidatePath("/dashboard/events")

    // Pas de redirection ici car l'utilisateur est déjà sur la page des événements
    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement:", error)
    throw error
  }
}
