"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPreviewPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Aperçu du Dashboard" text="Visualisez les différentes sections du dashboard" />

      <Tabs defaultValue="dashboard" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
          <TabsTrigger value="my-events">Mes événements</TabsTrigger>
          <TabsTrigger value="event-form">Formulaire</TabsTrigger>
          <TabsTrigger value="all-events">Tous les événements</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex flex-col">
                  {/* Header */}
                  <div className="h-16 border-b bg-background flex items-center justify-between px-4">
                    <div className="font-bold text-xl">Université - Gestion d'événements</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs">UN</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-64 border-r bg-muted/30 p-4">
                      <div className="font-bold mb-4">Université</div>
                      <div className="space-y-2">
                        <div className="bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-primary-foreground/20"></div>
                          Tableau de bord
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Mes événements
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Nouvel événement
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Tous les événements
                        </div>
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-6 overflow-auto">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h1 className="text-3xl font-bold">Tableau de bord</h1>
                          <p className="text-muted-foreground">Gérez vos événements universitaires</p>
                        </div>
                        <button className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm flex items-center">
                          <span className="w-4 h-4 mr-2 rounded-full bg-primary-foreground/20"></span>
                          Ajouter un événement
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-card p-4 rounded-lg border">
                          <div className="text-sm font-medium mb-1">Total des événements</div>
                          <div className="text-2xl font-bold">2</div>
                          <div className="text-xs text-muted-foreground">+0% depuis le mois dernier</div>
                        </div>
                        <div className="bg-card p-4 rounded-lg border">
                          <div className="text-sm font-medium mb-1">Vues</div>
                          <div className="text-2xl font-bold">120</div>
                          <div className="text-xs text-muted-foreground">+10% depuis le mois dernier</div>
                        </div>
                        <div className="bg-card p-4 rounded-lg border">
                          <div className="text-sm font-medium mb-1">Participants</div>
                          <div className="text-2xl font-bold">45</div>
                          <div className="text-xs text-muted-foreground">+25% depuis le mois dernier</div>
                        </div>
                      </div>

                      {/* Recent events */}
                      <div className="bg-card rounded-lg border">
                        <div className="p-4 border-b">
                          <div className="font-medium">Vos événements récents</div>
                          <div className="text-sm text-muted-foreground">Vous avez créé 2 événements récemment</div>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="border rounded-md overflow-hidden">
                              <div className="h-32 bg-muted"></div>
                              <div className="p-3">
                                <div className="font-medium">Conférence sur l'IA</div>
                                <div className="text-xs text-muted-foreground">15/05/2023</div>
                                <div className="text-sm mt-2 line-clamp-2">
                                  Une conférence sur l'intelligence artificielle et son impact sur l'éducation
                                </div>
                              </div>
                            </div>
                            <div className="border rounded-md overflow-hidden">
                              <div className="h-32 bg-muted"></div>
                              <div className="p-3">
                                <div className="font-medium">Atelier de programmation</div>
                                <div className="text-xs text-muted-foreground">10/05/2023</div>
                                <div className="text-sm mt-2 line-clamp-2">
                                  Apprenez les bases de la programmation web avec React
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-events" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex flex-col">
                  {/* Header */}
                  <div className="h-16 border-b bg-background flex items-center justify-between px-4">
                    <div className="font-bold text-xl">Université - Gestion d'événements</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs">UN</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-64 border-r bg-muted/30 p-4">
                      <div className="font-bold mb-4">Université</div>
                      <div className="space-y-2">
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Tableau de bord
                        </div>
                        <div className="bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-primary-foreground/20"></div>
                          Mes événements
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Nouvel événement
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Tous les événements
                        </div>
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-6 overflow-auto">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h1 className="text-3xl font-bold">Mes événements</h1>
                          <p className="text-muted-foreground">Gérez vos événements universitaires</p>
                        </div>
                        <button className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm flex items-center">
                          <span className="w-4 h-4 mr-2 rounded-full bg-primary-foreground/20"></span>
                          Ajouter un événement
                        </button>
                      </div>

                      {/* Events list */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="border rounded-md overflow-hidden">
                          <div className="h-48 bg-muted"></div>
                          <div className="p-4">
                            <div className="font-medium">Conférence sur l'IA</div>
                            <div className="text-xs text-muted-foreground">15/05/2023</div>
                            <div className="text-sm mt-2 line-clamp-3">
                              Une conférence sur l'intelligence artificielle et son impact sur l'éducation
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button className="border px-3 py-1 rounded text-xs flex items-center">
                                <span className="w-3 h-3 mr-1 rounded-full bg-foreground/20"></span>
                                Modifier
                              </button>
                              <button className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-xs flex items-center">
                                <span className="w-3 h-3 mr-1 rounded-full bg-destructive-foreground/20"></span>
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-md overflow-hidden">
                          <div className="h-48 bg-muted"></div>
                          <div className="p-4">
                            <div className="font-medium">Atelier de programmation</div>
                            <div className="text-xs text-muted-foreground">10/05/2023</div>
                            <div className="text-sm mt-2 line-clamp-3">
                              Apprenez les bases de la programmation web avec React
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button className="border px-3 py-1 rounded text-xs flex items-center">
                                <span className="w-3 h-3 mr-1 rounded-full bg-foreground/20"></span>
                                Modifier
                              </button>
                              <button className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-xs flex items-center">
                                <span className="w-3 h-3 mr-1 rounded-full bg-destructive-foreground/20"></span>
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-md overflow-hidden">
                          <div className="h-48 bg-muted"></div>
                          <div className="p-4">
                            <div className="font-medium">Séminaire sur la cybersécurité</div>
                            <div className="text-xs text-muted-foreground">20/04/2023</div>
                            <div className="text-sm mt-2 line-clamp-3">
                              Découvrez les dernières tendances en matière de cybersécurité
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button className="border px-3 py-1 rounded text-xs flex items-center">
                                <span className="w-3 h-3 mr-1 rounded-full bg-foreground/20"></span>
                                Modifier
                              </button>
                              <button className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-xs flex items-center">
                                <span className="w-3 h-3 mr-1 rounded-full bg-destructive-foreground/20"></span>
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="event-form" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex flex-col">
                  {/* Header */}
                  <div className="h-16 border-b bg-background flex items-center justify-between px-4">
                    <div className="font-bold text-xl">Université - Gestion d'événements</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs">UN</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-64 border-r bg-muted/30 p-4">
                      <div className="font-bold mb-4">Université</div>
                      <div className="space-y-2">
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Tableau de bord
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Mes événements
                        </div>
                        <div className="bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-primary-foreground/20"></div>
                          Nouvel événement
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Tous les événements
                        </div>
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-6 overflow-auto">
                      <div className="mb-6">
                        <h1 className="text-3xl font-bold">Créer un nouvel événement</h1>
                        <p className="text-muted-foreground">Ajoutez un nouvel événement à votre liste</p>
                      </div>

                      {/* Form */}
                      <div className="bg-card border rounded-lg p-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium block mb-1">Titre</label>
                            <div className="h-10 rounded-md border bg-background px-3"></div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Donnez un titre clair et concis à votre événement.
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium block mb-1">Description</label>
                            <div className="h-32 rounded-md border bg-background px-3"></div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Décrivez votre événement en détail.
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium block mb-1">Type de média</label>
                            <div className="flex gap-4">
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full border mr-2 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                                </div>
                                <span className="text-sm">Image</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full border mr-2"></div>
                                <span className="text-sm">Vidéo</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium block mb-1">URL du média</label>
                            <div className="h-10 rounded-md border bg-background px-3"></div>
                            <div className="text-xs text-muted-foreground mt-1">
                              URL de l'image à afficher pour l'événement.
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-4">
                            <button className="border px-4 py-2 rounded text-sm">Annuler</button>
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm">
                              Créer l'événement
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-events" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex flex-col">
                  {/* Header */}
                  <div className="h-16 border-b bg-background flex items-center justify-between px-4">
                    <div className="font-bold text-xl">Université - Gestion d'événements</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs">UN</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-64 border-r bg-muted/30 p-4">
                      <div className="font-bold mb-4">Université</div>
                      <div className="space-y-2">
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Tableau de bord
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Mes événements
                        </div>
                        <div className="text-foreground/70 rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-foreground/20"></div>
                          Nouvel événement
                        </div>
                        <div className="bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm flex items-center">
                          <div className="w-4 h-4 mr-2 rounded-full bg-primary-foreground/20"></div>
                          Tous les événements
                        </div>
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-6 overflow-auto">
                      <div className="mb-6">
                        <h1 className="text-3xl font-bold">Tous les événements</h1>
                        <p className="text-muted-foreground">Découvrez tous les événements de l'université</p>
                      </div>

                      {/* Events grid */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="border rounded-md overflow-hidden">
                          <div className="h-48 bg-muted"></div>
                          <div className="p-4">
                            <div className="font-medium">Conférence sur l'IA</div>
                            <div className="text-xs text-muted-foreground">15/05/2023 • Utilisateur 1</div>
                            <div className="text-sm mt-2 line-clamp-3">
                              Une conférence sur l'intelligence artificielle et son impact sur l'éducation
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-md overflow-hidden">
                          <div className="h-48 bg-muted"></div>
                          <div className="p-4">
                            <div className="font-medium">Atelier de programmation</div>
                            <div className="text-xs text-muted-foreground">10/05/2023 • Utilisateur 1</div>
                            <div className="text-sm mt-2 line-clamp-3">
                              Apprenez les bases de la programmation web avec React
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-md overflow-hidden">
                          <div className="h-48 bg-muted"></div>
                          <div className="p-4">
                            <div className="font-medium">Séminaire sur la cybersécurité</div>
                            <div className="text-xs text-muted-foreground">20/04/2023 • Utilisateur 1</div>
                            <div className="text-sm mt-2 line-clamp-3">
                              Découvrez les dernières tendances en matière de cybersécurité
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-md overflow-hidden">
                          <div className="h-48 bg-muted"></div>
                          <div className="p-4">
                            <div className="font-medium">Journée portes ouvertes</div>
                            <div className="text-xs text-muted-foreground">05/06/2023 • Utilisateur 2</div>
                            <div className="text-sm mt-2 line-clamp-3">
                              Venez découvrir notre université et nos programmes
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-md overflow-hidden">
                          <div className="h-48 bg-muted"></div>
                          <div className="p-4">
                            <div className="font-medium">Conférence sur le développement durable</div>
                            <div className="text-xs text-muted-foreground">10/06/2023 • Utilisateur 3</div>
                            <div className="text-sm mt-2 line-clamp-3">
                              Comment intégrer le développement durable dans nos pratiques quotidiennes
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
