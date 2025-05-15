import { DashboardHeader } from "@/components/dashboard-header"
import { EventForm } from "@/components/event-form"

export default function NewEventPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Créer un nouvel événement" text="Ajoutez un nouvel événement à votre liste" />

      <div className="grid gap-4">
        <EventForm />
      </div>
    </div>
  )
}
