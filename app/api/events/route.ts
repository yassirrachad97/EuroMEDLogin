import { NextResponse } from "next/server"

// Cette route est un exemple de comment vous pourriez gérer les événements
// Dans une application réelle, vous utiliseriez une base de données

const events = [
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

export async function GET() {
  return NextResponse.json(events)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation simple
    if (!body.title || !body.description) {
      return NextResponse.json({ success: false, message: "Titre et description requis" }, { status: 400 })
    }

    const newEvent = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      imageUrl: body.mediaType === "image" ? body.mediaUrl : "/placeholder.svg?height=200&width=400",
      videoUrl: body.mediaType === "video" ? body.mediaUrl : null,
      createdAt: new Date().toISOString(),
      createdBy: "user1", // Normalement, vous utiliseriez l'ID de l'utilisateur authentifié
    }

    events.push(newEvent)

    return NextResponse.json({ success: true, event: newEvent })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Une erreur est survenue" }, { status: 500 })
  }
}
