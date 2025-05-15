import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PreviewPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Aperçu du Dashboard</h1>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Page d'accueil du Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] border rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=800&text=Dashboard+Home"
                alt="Dashboard Home"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-white text-2xl font-bold">Tableau de bord principal</h2>
                <p className="text-white/80">
                  Vue d'ensemble avec statistiques, événements récents et accès rapide aux fonctionnalités
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Statistiques</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">
                    Événements récents
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Navigation</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="mb-2">
                <strong>Caractéristiques :</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Sidebar de navigation avec accès à toutes les sections</li>
                <li>Cartes de statistiques montrant le nombre total d'événements, vues et participants</li>
                <li>Liste des événements récents créés par l'utilisateur</li>
                <li>Bouton d'action rapide pour créer un nouvel événement</li>
                <li>Profil utilisateur accessible depuis l'en-tête</li>
                <li>Thème clair/sombre configurable</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Liste de mes événements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] border rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=800&text=My+Events+List"
                alt="My Events List"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-white text-2xl font-bold">Mes événements</h2>
                <p className="text-white/80">
                  Liste complète des événements créés par l'utilisateur avec options de gestion
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Modifier</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Supprimer</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Ajouter</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="mb-2">
                <strong>Caractéristiques :</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Affichage en grille des événements avec image, titre et description</li>
                <li>Boutons d'action pour modifier ou supprimer chaque événement</li>
                <li>Confirmation avant suppression définitive</li>
                <li>Bouton pour ajouter un nouvel événement</li>
                <li>Mise en page responsive qui s'adapte à toutes les tailles d'écran</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Formulaire de création/modification d'événement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] border rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=800&text=Event+Form"
                alt="Event Form"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-white text-2xl font-bold">Formulaire d'événement</h2>
                <p className="text-white/80">Interface pour créer ou modifier les détails d'un événement</p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Titre</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Description</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Image/Vidéo</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="mb-2">
                <strong>Caractéristiques :</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Formulaire avec validation des champs</li>
                <li>Choix entre l'ajout d'une image ou d'une vidéo</li>
                <li>Champ de description avec éditeur de texte enrichi</li>
                <li>Boutons pour annuler ou soumettre le formulaire</li>
                <li>Pré-remplissage des champs en mode édition</li>
                <li>Indication visuelle pendant la soumission</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Tous les événements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] border rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=800&text=All+Events"
                alt="All Events"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-white text-2xl font-bold">Tous les événements</h2>
                <p className="text-white/80">Vue globale de tous les événements de l'université</p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Filtres</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Recherche</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">Détails</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="mb-2">
                <strong>Caractéristiques :</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Affichage de tous les événements de tous les utilisateurs</li>
                <li>Mise en page en grille avec image, titre, description et date</li>
                <li>Indication de l'auteur de chaque événement</li>
                <li>Possibilité de voir les détails complets d'un événement</li>
                <li>Interface responsive qui s'adapte à toutes les tailles d'écran</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
