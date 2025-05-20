"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { UserIcon, LockIcon } from "lucide-react"
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
  <div className="min-h-screen flex items-center justify-center  from-gray-900 to-gray-950 px-4">
   <div className="relative w-full max-w-md mx-auto">
  <div className="text-center mb-4">
    <div className="flex justify-center mb-3">
      <div className="relative w-40 h-16">
  <Image src="/logoUEMF.png" alt="EUROMED UNIVERSITY OF FES" fill className="object-contain" priority />
</div>

    </div>
    <p className="text-white/80 text-sm">Plateforme de gestion d'événements</p>
  </div>

 <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border-l-4 border-cyan-500 shadow-2xl">

    <h2 className="text-xl font-semibold text-white mb-4 text-center">Connexion</h2>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="username" className="flex items-center text-white mb-1 text-sm">
          <span>Nom d'utilisateur</span>
          <UserIcon className="ml-2 h-4 w-4 text-cyan-400" />
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-white/10 border-white/20 text-white h-10"
          disabled={isLoading}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="password" className="flex items-center text-white mb-1 text-sm">
          <span>Mot de passe</span>
          <LockIcon className="ml-2 h-4 w-4 text-cyan-400" />
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/10 border-white/20 text-white h-10"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="stay-signed-in"
            checked={staySignedIn}
            onCheckedChange={setStaySignedIn}
            className="data-[state=checked]:bg-cyan-500"
            disabled={isLoading}
          />
          <Label htmlFor="stay-signed-in" className="text-white text-sm">
            Rester connecté
          </Label>
        </div>
        <Link href="/forgot-password" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">
          Mot de passe oublié?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-10 rounded-md font-medium transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  </div>
</div>

  </div>
)

}
