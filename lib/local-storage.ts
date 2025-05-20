// Types
export interface Event {
  id: string
  title: string
  description: string
  imageUrl: string
  videoUrl?: string | null
  startDate?: string
  endDate?: string
  location?: string
  createdAt: string
  createdBy: string
  order?: number
}

export interface User {
  id: string
  username: string
  name: string
}

// Clés pour le localStorage
const EVENTS_KEY = "university_events"
const CURRENT_USER_KEY = "university_current_user"

// Fonction pour réinitialiser les données
export function resetEventData() {
  if (typeof window === "undefined") return

  // Données initiales avec vos nouvelles images
  const initialEvents: Event[] = [
    {
      id: "1",
      title: "Conférence sur l'IA",
      description: "Une conférence sur l'intelligence artificielle et son impact sur l'éducation",
      imageUrl: "/eventImg1.jpg",
      startDate: "2023-05-15",
      endDate: "2023-05-15",
      location: "Amphithéâtre A, UEMF",
      createdAt: "2023-05-15T10:00:00Z",
      createdBy: "user1",
      order: 0,
    },
    {
      id: "2",
      title: "Atelier de programmation",
      description: "Apprenez les bases de la programmation web avec React",
      imageUrl: "/eventImg2.jpg",
      startDate: "2023-05-10",
      endDate: "2023-05-10",
      location: "Salle informatique B12, UEMF",
      createdAt: "2023-05-10T14:30:00Z",
      createdBy: "user1",
      order: 1,
    },
    {
      id: "3",
      title: "Séminaire sur la cybersécurité",
      description: "Découvrez les dernières tendances en matière de cybersécurité",
      imageUrl: "/eventImg3.jpeg",
      startDate: "2023-04-20",
      endDate: "2023-04-21",
      location: "Centre de conférences, UEMF",
      createdAt: "2023-04-20T09:15:00Z",
      createdBy: "user1",
      order: 2,
    },
    {
      id: "4",
      title: "Journée portes ouvertes",
      description: "Venez découvrir notre université et nos programmes",
      imageUrl: "/enetImg.jpg",
      startDate: "2023-06-05",
      endDate: "2023-06-05",
      location: "Campus principal, UEMF",
      createdAt: "2023-06-05T11:00:00Z",
      createdBy: "user2",
      order: 3,
    },
    {
      id: "5",
      title: "Conférence sur le développement durable",
      description: "Comment intégrer le développement durable dans nos pratiques quotidiennes",
      imageUrl: "/eventImg1.jpg",
      startDate: "2023-06-10",
      endDate: "2023-06-11",
      location: "Salle de conférence C, UEMF",
      createdAt: "2023-06-10T15:30:00Z",
      createdBy: "user3",
      order: 4,
    },
  ]

  localStorage.setItem(EVENTS_KEY, JSON.stringify(initialEvents))
}

// Fonctions pour les événements
export function getEvents(): Event[] {
  if (typeof window === "undefined") return []

  const eventsJson = localStorage.getItem(EVENTS_KEY)
  if (!eventsJson) {
    // Réinitialiser avec les données initiales
    resetEventData()
    return getEvents()
  }

  try {
    const events = JSON.parse(eventsJson)

    // Vérifier si les événements ont les propriétés requises
    const hasValidEvents = events.every(
      (event: any) =>
        event.id &&
        event.title &&
        event.description &&
        typeof event.startDate !== "undefined" &&
        typeof event.endDate !== "undefined",
    )

    if (!hasValidEvents) {
      console.warn("Données d'événements invalides détectées, réinitialisation...")
      resetEventData()
      return getEvents()
    }

    return events
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error)
    resetEventData()
    return getEvents()
  }
}

export function getEventById(id: string): Event | undefined {
  const events = getEvents()
  return events.find((event) => event.id === id)
}

export function getUserEvents(userId: string): Event[] {
  const events = getEvents()
  return events.filter((event) => event.createdBy === userId).sort((a, b) => (a.order || 0) - (b.order || 0))
}

export function createEvent(eventData: Omit<Event, "id" | "createdAt" | "createdBy" | "order">): Event {
  const events = getEvents()
  const currentUser = getCurrentUser()

  const newEvent: Event = {
    id: Date.now().toString(),
    ...eventData,
    createdAt: new Date().toISOString(),
    createdBy: currentUser?.id || "user1",
    order: events.length,
  }

  events.push(newEvent)
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))

  return newEvent
}

export function updateEvent(id: string, eventData: Partial<Event>): Event | null {
  const events = getEvents()
  const eventIndex = events.findIndex((event) => event.id === id)

  if (eventIndex === -1) return null

  events[eventIndex] = {
    ...events[eventIndex],
    ...eventData,
    id: events[eventIndex].id,
    createdBy: events[eventIndex].createdBy,
    createdAt: events[eventIndex].createdAt,
    order: events[eventIndex].order,
  }

  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))

  return events[eventIndex]
}

export function updateEventOrder(updatedEvents: Event[]): boolean {
  try {
    const allEvents = getEvents()

    // Créer un map des événements mis à jour pour un accès rapide
    const updatedEventsMap = new Map(updatedEvents.map((event) => [event.id, event]))

    // Mettre à jour l'ordre des événements existants
    const newEvents = allEvents.map((event) => {
      if (updatedEventsMap.has(event.id)) {
        return {
          ...event,
          order: updatedEventsMap.get(event.id)?.order || event.order,
        }
      }
      return event
    })

    localStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents))
    return true
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ordre des événements:", error)
    return false
  }
}

export function deleteEvent(id: string): boolean {
  const events = getEvents()
  const filteredEvents = events.filter((event) => event.id !== id)

  if (filteredEvents.length === events.length) return false

  localStorage.setItem(EVENTS_KEY, JSON.stringify(filteredEvents))

  return true
}

// Fonctions pour l'utilisateur
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userJson = localStorage.getItem(CURRENT_USER_KEY)
  if (!userJson) {
    // Utilisateur par défaut
    const defaultUser: User = {
      id: "user1",
      username: "admin",
      name: "Administrateur",
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser))
    return defaultUser
  }

  return JSON.parse(userJson)
}

export function login(username: string, password: string): User | null {
  // Simulation d'authentification simple
  if (username === "admin" && password === "password") {
    const user: User = {
      id: "user1",
      username: "admin",
      name: "Administrateur",
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    return user
  }

  return null
}

export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}
