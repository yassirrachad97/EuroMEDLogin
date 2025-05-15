import { NextResponse } from "next/server"

// Cette route est un exemple de comment vous pourriez gérer les événements individuels
// Dans une application réelle, vous utiliseriez une base de données

// Référence aux événements définis dans route.ts
let events = [
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
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    return NextResponse.json({ success: false, message: "Événement non trouvé" }, { status: 404 })
  }

  return NextResponse.json(event)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const eventIndex = events.findIndex((e) => e.id === params.id)

    if (eventIndex === -1) {
      return NextResponse.json({ success: false, message: "Événement non trouvé" }, { status: 404 })
    }

    // Mise à jour de l'événement
    events[eventIndex] = {
      ...events[eventIndex],
      title: body.title || events[eventIndex].title,
      description: body.description || events[eventIndex].description,
      imageUrl: body.mediaType === "image" ? body.mediaUrl : events[eventIndex].imageUrl,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, event: events[eventIndex] })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Une erreur est survenue" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const eventIndex = events.findIndex((e) => e.id === params.id)

  if (eventIndex === -1) {
    return NextResponse.json({ success: false, message: "Événement non trouvé" }, { status: 404 })
  }

  // Suppression de l'événement
  const deletedEvent = events[eventIndex]
  events = events.filter((e) => e.id !== params.id)

  return NextResponse.json({ success: true, event: deletedEvent })
}
