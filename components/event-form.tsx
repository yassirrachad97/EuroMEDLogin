"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, VideoIcon } from "lucide-react"
import { createEvent, updateEvent } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Le titre doit contenir au moins 2 caractères.",
    })
    .max(100, {
      message: "Le titre ne peut pas dépasser 100 caractères.",
    }),
  description: z
    .string()
    .min(10, {
      message: "La description doit contenir au moins 10 caractères.",
    })
    .max(1000, {
      message: "La description ne peut pas dépasser 1000 caractères.",
    }),
  mediaType: z.enum(["image", "video"]),
  mediaUrl: z.string().url({
    message: "Veuillez entrer une URL valide.",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface EventFormProps {
  event?: {
    id: string
    title: string
    description: string
    imageUrl: string
    videoUrl?: string | null
  }
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const defaultValues: Partial<FormValues> = {
    title: event?.title || "",
    description: event?.description || "",
    mediaType: event?.videoUrl ? "video" : "image",
    mediaUrl: event?.videoUrl || event?.imageUrl || "",
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // Préparer les données de l'événement
      const eventData = {
        title: values.title,
        description: values.description,
        imageUrl: values.mediaType === "image" ? values.mediaUrl : "",
        videoUrl: values.mediaType === "video" ? values.mediaUrl : null,
      }

      // Créer ou mettre à jour l'événement
      if (event?.id) {
        // Mise à jour
        const updatedEvent = updateEvent(event.id, eventData)
        if (updatedEvent) {
          toast({
            title: "Événement mis à jour",
            description: "L'événement a été mis à jour avec succès.",
          })
        } else {
          throw new Error("Impossible de mettre à jour l'événement")
        }
      } else {
        // Création
        createEvent(eventData)
        toast({
          title: "Événement créé",
          description: "L'événement a été créé avec succès.",
        })
      }

      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Rediriger vers la liste des événements
      router.push("/dashboard/events")
      router.refresh()
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de l'événement.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de l'événement" {...field} />
                  </FormControl>
                  <FormDescription>Donnez un titre clair et concis à votre événement.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description détaillée de l'événement" className="min-h-32" {...field} />
                  </FormControl>
                  <FormDescription>Décrivez votre événement en détail.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mediaType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type de média</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="image" id="image" />
                        <Label htmlFor="image" className="flex items-center">
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Image
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="video" />
                        <Label htmlFor="video" className="flex items-center">
                          <VideoIcon className="mr-2 h-4 w-4" />
                          Vidéo
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mediaUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du média</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.watch("mediaType") === "image"
                          ? "https://exemple.com/image.jpg"
                          : "https://exemple.com/video.mp4"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.watch("mediaType") === "image"
                      ? "URL de l'image à afficher pour l'événement."
                      : "URL de la vidéo à afficher pour l'événement."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/events")}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : event ? "Mettre à jour" : "Créer l'événement"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
