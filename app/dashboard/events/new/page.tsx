"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { EventForm } from "@/components/event-form"
import { motion } from "framer-motion"

export default function NewEventPage() {
  return (
    <div className="flex-1 w-full p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 md:px-8 pt-6"
      >
        <DashboardHeader heading="Créer un nouvel événement" text="Ajoutez un nouvel événement à votre liste" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full mt-4"
      >
        <EventForm />
      </motion.div>
    </div>
  )
}
