"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { UserIcon, LockIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [staySignedIn, setStaySignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      const user = login(username, password)

      if (user) {
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${user.name}!`,
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect.",
          variant: "destructive",
        })
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-cyan-400">EUROMED</span>
        </h1>
        <p className="text-white/80 text-lg">Plateforme de gestion d'événements</p>
      </div>

      <div className="bg-black/60 backdrop-blur-md rounded-xl p-8 border-l-4 border-cyan-500 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Connexion</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="username" className="flex items-center text-white mb-2 text-base">
              <span>Nom d'utilisateur</span>
              <UserIcon className="ml-2 h-4 w-4 text-cyan-400" />
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/10 border-white/20 text-white h-12 focus:border-cyan-400 focus:ring-cyan-400/20"
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password" className="flex items-center text-white mb-2 text-base">
              <span>Mot de passe</span>
              <LockIcon className="ml-2 h-4 w-4 text-cyan-400" />
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white h-12 focus:border-cyan-400 focus:ring-cyan-400/20"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="stay-signed-in"
                checked={staySignedIn}
                onCheckedChange={setStaySignedIn}
                className="data-[state=checked]:bg-cyan-500"
                disabled={isLoading}
              />
              <Label htmlFor="stay-signed-in" className="text-white">
                Rester connecté
              </Label>
            </div>
            <Link href="/forgot-password" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
              Mot de passe oublié?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-12 rounded-md font-medium transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-white/70">
          © 2025 Université - Plateforme de gestion d'événements
        </div>

      
      </div>
    </div>
  )
}
