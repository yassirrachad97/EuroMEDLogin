import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fond animé avec gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 via-transparent to-orange-400/20"></div>

        {/* Formes géométriques animées */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-400/15 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Contenu */}
      <div className="w-full max-w-md px-4 z-10 animate-fade-in-up">
        <LoginForm />
      </div>
    </main>
  )
}
