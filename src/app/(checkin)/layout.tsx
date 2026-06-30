import { Leaf } from 'lucide-react'
import Link from 'next/link'
import LogoutButton from '@/components/layout/LogoutButton'

export default function CheckinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/checkin" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-[#0F4C5C] to-[#5B8A72] shadow-sm group-hover:shadow-md transition-shadow">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-[#0F4C5C] to-[#5B8A72] bg-clip-text text-transparent">
                MindWork
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="/historico"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors hidden sm:block"
              >
                Meu Histórico
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-safe">
        {children}
      </main>

      {/* Bottom safe area spacer for mobile */}
      <div className="h-6 sm:h-0" />
    </div>
  )
}
