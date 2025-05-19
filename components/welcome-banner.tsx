"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/local-storage"
import { motion } from "framer-motion"

export function WelcomeBanner() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [greeting, setGreeting] = useState("")

  useEffect(() => {

    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser({
        name: currentUser.name,
      })
    }


    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting("Bonjour")
    } else if (hour < 18) {
      setGreeting("Bon après-midi")
    } else {
      setGreeting("Bonsoir")
    }
  }, [])

  if (!user) return null

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-none shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="mr-4 bg-cyan-500 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {greeting}, {user.name} !
              </h2>
              <p className="text-white/80">
                Bienvenue dans votre tableau de bord de gestion d'événements universitaires.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
