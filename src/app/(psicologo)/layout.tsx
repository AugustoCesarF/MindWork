'use client'

import { Shield, LogOut, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function PsicologoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-amber-50 font-inter text-slate-800">
      <header className="sticky top-0 z-40 w-full border-b border-orange-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-red-400 text-white shadow-lg">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-outfit text-xl font-bold tracking-tight text-slate-800">MindWork</h1>
              <p className="text-xs font-medium text-slate-500">Painel do Psicólogo</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600 hover:text-slate-900">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="bg-orange-100/50 px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-start gap-3 rounded-lg border border-orange-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:items-center">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-orange-500 sm:mt-0" />
          <p className="text-sm font-medium text-slate-700">
            <strong>Este módulo opera sob sigilo profissional.</strong> As informações aqui contidas são estritamente confidenciais e 
            <span className="text-orange-600"> NUNCA </span> são compartilhadas com o RH das empresas. O acompanhamento é vinculado apenas a códigos anônimos.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
