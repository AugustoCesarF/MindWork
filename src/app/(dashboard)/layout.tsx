'use client'

import { useState, useCallback, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'


import { createClient } from '@/lib/supabase/client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    async function checkDemo() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('is_demo').eq('id', user.id).single()
        if (profile?.is_demo) {
          setIsDemo(true)
        }
      }
    }
    checkDemo()
  }, [])

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50/80">
      {isDemo && (
        <div className="bg-orange-500 text-white text-center py-1 text-xs font-semibold uppercase tracking-wider sticky top-0 z-[100]">
          Ambiente de Demonstração — Dados de Exemplo
        </div>
      )}
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* Main content area - offset by sidebar width on desktop */}
      <div className="transition-all duration-300 lg:pl-64">
        {/* Header */}
        <Header
          title="MindWork"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
