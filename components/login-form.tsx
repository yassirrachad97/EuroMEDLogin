"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { UserIcon, LockIcon, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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
          title: "🎉 Connexion réussie",
          description: `Bienvenue, ${user.name}!`,
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "❌ Échec de la connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect.",
          variant: "destructive",
        })
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="relative w-full max-w-md mx-auto my-8 md:my-12 lg:my-16">
   
      <div className="text-center mb-8 md:mb-10 animate-bounce-in">
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative w-64 h-24 glass-card p-4">
            <Image src="/logoUEMF.png" alt="EUROMED UNIVERSITY OF FES" fill className="object-contain" priority />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Plateforme Événements</h1>
       
      </div>

   
      <div className="glass-card p-6 md:p-8 animate-slide-in-left mb-8 md:mb-12">
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <Sparkles className="h-8 w-8 text-violet-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="flex items-center text-gray-700 mb-2 font-semibold">
              <UserIcon className="mr-2 h-5 w-5 text-violet-600" />
              Nom d'utilisateur
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="modern-input h-12 text-gray-800 placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center text-gray-700 mb-2 font-semibold">
              <LockIcon className="mr-2 h-5 w-5 text-violet-600" />
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modern-input h-12 text-gray-800 placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Switch
                id="stay-signed-in"
                checked={staySignedIn}
                onCheckedChange={setStaySignedIn}
                className="data-[state=checked]:bg-violet-600"
                disabled={isLoading}
              />
              <Label htmlFor="stay-signed-in" className="text-gray-700 font-medium">
                Rester connecté
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-violet-600 hover:text-violet-700 text-sm font-medium transition-colors"
            >
              Mot de passe oublié?
            </Link>
          </div>

          <Button type="submit" className="w-full modern-button h-12 text-lg font-semibold" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connexion en cours...
              </div>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>

     

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-600">© 2025 EUROMED UNIVERSITY OF FES</div>
      </div>
    </div>
  )
}
