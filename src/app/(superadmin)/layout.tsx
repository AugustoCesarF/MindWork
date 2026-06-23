'use client'

import { LayoutDashboard, Users, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function SuperAdminLayout({
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
    <div className="flex min-h-screen bg-slate-50 font-inter">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0A2530] text-slate-300">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
              <Settings className="h-5 w-5" />
            </div>
            <h1 className="font-outfit text-xl font-bold tracking-tight text-white">MindWork</h1>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Super Admin</p>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          <a href="/admin" className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Visão Geral
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <Users className="h-5 w-5" />
            Organizações
          </a>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-4 flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Administrador</p>
              <p className="text-xs text-slate-500">Sistema</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-white/5 hover:text-white" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair do sistema
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <h2 className="font-outfit text-lg font-semibold text-slate-800">Painel Geral</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
