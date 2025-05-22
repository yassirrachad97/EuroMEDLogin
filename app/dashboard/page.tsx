"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser, getUserEvents, getEvents } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { EventList } from "@/components/event-list"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [recentEvents, setRecentEvents] = useState<Event[]>([])
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer l'utilisateur actuel
    const currentUser = getCurrentUser()

    if (currentUser) {
      // Récupérer les événements de l'utilisateur
      const userEvents = getUserEvents(currentUser.id)
      // Trier par date de création (les plus récents d'abord)
      const sortedEvents = [...userEvents].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      // Prendre les 2 premiers événements
      setRecentEvents(sortedEvents.slice(0, 2))

      // Récupérer tous les événements
      const events = getEvents()
      setAllEvents(events)
    }

    setIsLoading(false)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenue sur votre tableau de bord de gestion d'événements.</p>
        </div>
        <Link href="/dashboard/events/new">
          <Button className="bg-violet-600 hover:bg-violet-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvel événement
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-violet-500 to-violet-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Événements</CardTitle>
            <div className="h-4 w-4 bg-white/20 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allEvents.length}</div>
            <p className="text-xs text-white/80">+0% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mes Événements</CardTitle>
            <div className="h-4 w-4 bg-white/20 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentEvents.length}</div>
            <p className="text-xs text-white/80">+0% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues</CardTitle>
            <div className="h-4 w-4 bg-white/20 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-white/80">+10% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <div className="h-4 w-4 bg-white/20 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-white/80">+25% depuis le mois dernier</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Events */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Activité des événements</CardTitle>
            <CardDescription>Nombre d'événements créés par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Statistiques de participation</CardTitle>
            <CardDescription>Évolution du nombre de participants</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Events and Distribution */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Événements récents</CardTitle>
              <CardDescription>Vos derniers événements créés</CardDescription>
            </div>
            <Link href="/dashboard/events">
              <Button variant="outline" size="sm" className="gap-1">
                Voir tout
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <p className="text-muted-foreground">Chargement des événements...</p>
              </div>
            ) : (
              <EventList events={recentEvents} showActions={false} compact={true} />
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Distribution par type</CardTitle>
            <CardDescription>Répartition des événements par catégorie</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
