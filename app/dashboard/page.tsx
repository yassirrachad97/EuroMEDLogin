"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { EventList } from "@/components/event-list"
import { DashboardHeader } from "@/components/dashboard-header"
import { useEffect, useState } from "react"
import { getCurrentUser, getUserEvents } from "@/lib/local-storage"
import type { Event } from "@/lib/local-storage"
import { WelcomeBanner } from "@/components/welcome-banner"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [recentEvents, setRecentEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
  
    const currentUser = getCurrentUser()

    if (currentUser) {
     
      const userEvents = getUserEvents(currentUser.id)
    
      const sortedEvents = [...userEvents].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
     
      setRecentEvents(sortedEvents.slice(0, 2))
    }

    setIsLoading(false)
  }, [])

  const refreshEvents = () => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      const userEvents = getUserEvents(currentUser.id)
      const sortedEvents = [...userEvents].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      setRecentEvents(sortedEvents.slice(0, 2))
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <WelcomeBanner />

      <DashboardHeader heading="Tableau de bord" text="Gérez vos événements universitaires">
        <Link href="/dashboard/events/new">
          <Button size="sm" className="h-10 bg-cyan-500 hover:bg-cyan-600 text-white font-medium">
            <PlusCircle className="mr-2 h-5 w-5" />
            Ajouter un événement
          </Button>
        </Link>
        
      </DashboardHeader>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="card-enhanced bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-white">Total des événements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{recentEvents.length}</div>
              <p className="text-sm text-white/70">+0% depuis le mois dernier</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="card-enhanced bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-white">Vues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">120</div>
              <p className="text-sm text-white/70">+10% depuis le mois dernier</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="card-enhanced bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-white">Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">45</div>
              <p className="text-sm text-white/70">+25% depuis le mois dernier</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-1 lg:grid-cols-1"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="card-enhanced col-span-1 bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-xl font-medium text-white">Vos événements récents</CardTitle>
              <CardDescription className="text-white/70">
                {isLoading ? "Chargement..." : `Vous avez créé ${recentEvents.length} événements récemment`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <p className="text-white/70">Chargement des événements...</p>
                </div>
              ) : (
                <EventList events={recentEvents} showActions={true} onEventDeleted={refreshEvents} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
