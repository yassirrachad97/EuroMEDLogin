// Types
export interface Event {
  id: string
  title: string
  description: string
  imageUrl: string
  videoUrl?: string | null
  createdAt: string
  createdBy: string
}

export interface User {
  id: string
  username: string
  name: string
}

// Clés pour le localStorage
const EVENTS_KEY = "university_events"
const CURRENT_USER_KEY = "university_current_user"

// Fonctions pour les événements
export function getEvents(): Event[] {
  if (typeof window === "undefined") return []

  const eventsJson = localStorage.getItem(EVENTS_KEY)
  if (!eventsJson) {
    // Données initiales si aucun événement n'existe
    const initialEvents: Event[] = [
      {
        id: "1",
        title: "Conférence sur l'IA",
        description: "Une conférence sur l'intelligence artificielle et son impact sur l'éducation",
        imageUrl: "/placeholder.svg?height=200&width=400",
        createdAt: "2023-05-15T10:00:00Z",
        createdBy: "user1",
      },
      {
        id: "2",
        title: "Atelier de programmation",
        description: "Apprenez les bases de la programmation web avec React",
        imageUrl: "/placeholder.svg?height=200&width=400",
        createdAt: "2023-05-10T14:30:00Z",
        createdBy: "user1",
      },
      {
        id: "3",
        title: "Séminaire sur la cybersécurité",
        description: "Découvrez les dernières tendances en matière de cybersécurité",
        imageUrl: "/placeholder.svg?height=200&width=400",
        createdAt: "2023-04-20T09:15:00Z",
        createdBy: "user1",
      },
      {
        id: "4",
        title: "Journée portes ouvertes",
        description: "Venez découvrir notre université et nos programmes",
        imageUrl: "/placeholder.svg?height=200&width=400",
        createdAt: "2023-06-05T11:00:00Z",
        createdBy: "user2",
      },
      {
        id: "5",
        title: "Conférence sur le développement durable",
        description: "Comment intégrer le développement durable dans nos pratiques quotidiennes",
        imageUrl: "/placeholder.svg?height=200&width=400",
        createdAt: "2023-06-10T15:30:00Z",
        createdBy: "user3",
      },
    ]
    localStorage.setItem(EVENTS_KEY, JSON.stringify(initialEvents))
    return initialEvents
  }

  return JSON.parse(eventsJson)
}

export function getEventById(id: string): Event | undefined {
  const events = getEvents()
  return events.find((event) => event.id === id)
}

export function getUserEvents(userId: string): Event[] {
  const events = getEvents()
  return events.filter((event) => event.createdBy === userId)
}

export function createEvent(eventData: Omit<Event, "id" | "createdAt" | "createdBy">): Event {
  const events = getEvents()
  const currentUser = getCurrentUser()

  const newEvent: Event = {
    id: Date.now().toString(),
    ...eventData,
    createdAt: new Date().toISOString(),
    createdBy: currentUser?.id || "user1", // Fallback à user1 si pas d'utilisateur connecté
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
    id: events[eventIndex].id, // Assure que l'ID ne change pas
    createdBy: events[eventIndex].createdBy, // Assure que le créateur ne change pas
    createdAt: events[eventIndex].createdAt, // Assure que la date de création ne change pas
  }

  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))

  return events[eventIndex]
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
