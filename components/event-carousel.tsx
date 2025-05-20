"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"
import type { Event } from "@/lib/local-storage"

interface EventCarouselProps {
  events: Event[]
  autoRotate?: boolean
  rotationInterval?: number
}

export function EventCarousel({ events, autoRotate = true, rotationInterval = 5000 }: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
  }, [events.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length)
  }, [events.length])

  // Rotation automatique
  useEffect(() => {
    if (!autoRotate || isPaused || events.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [autoRotate, isPaused, nextSlide, events.length, rotationInterval])

  // Formatage des dates
  const formatEventDate = (dateString?: string) => {
    if (!dateString) return "Date non spécifiée"

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return "Date invalide"

      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date)
    } catch {
      return "Date invalide"
    }
  }

  if (!events.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-white/5 rounded-xl">
        <p className="text-white/70">Aucun événement disponible</p>
      </div>
    )
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.8,
        ease: "easeIn",
      },
    }),
  }

  const currentEvent = events[currentIndex]

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-gradient-to-b from-cyan-900/20 to-black/40 backdrop-blur-sm border border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-white/90 text-sm font-medium">
          {currentIndex + 1} / {events.length}
        </span>
      </div>

      <div className="h-[500px] md:h-[600px] relative perspective-1000">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative h-full w-full flex flex-col">
              {/* Image de l'événement */}
              <div className="relative h-1/2 w-full">
                <Image
                  src={currentEvent.imageUrl || "/placeholder.svg"}
                  alt={currentEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
              </div>

              {/* Contenu de l'événement */}
              <div className="relative flex-1 p-6 flex flex-col justify-between bg-gradient-to-t from-black/80 to-black/40">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{currentEvent.title}</h2>
                  <p className="text-white/80 text-lg mb-4 line-clamp-3">{currentEvent.description}</p>

                  <div className="flex flex-col gap-2 mt-4">
                    {currentEvent.startDate && currentEvent.endDate && (
                      <div className="flex items-center text-white/90">
                        <Calendar className="h-5 w-5 mr-3 text-cyan-400" />
                        <span>
                          {currentEvent.startDate === currentEvent.endDate
                            ? `Le ${formatEventDate(currentEvent.startDate)}`
                            : `Du ${formatEventDate(currentEvent.startDate)} au ${formatEventDate(
                                currentEvent.endDate,
                              )}`}
                        </span>
                      </div>
                    )}

                    {currentEvent.location && (
                      <div className="flex items-center text-white/90">
                        <MapPin className="h-5 w-5 mr-3 text-cyan-400" />
                        <span>{currentEvent.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 p-3 inline-flex">
                    <p className="text-white/70 text-sm">
                      <span className="text-cyan-400 font-medium">Conseil:</span> Survolez le carrousel pour mettre en
                      pause la rotation automatique
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Contrôles de navigation */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-cyan-900/70 border border-white/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Précédent</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-cyan-900/70 border border-white/20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Suivant</span>
        </Button>

        {/* Indicateurs */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-cyan-500" : "w-2 bg-white/50"
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              aria-label={`Aller à l'événement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
