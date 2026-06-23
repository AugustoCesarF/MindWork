'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  AlertTriangle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Brain,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/alertas', icon: AlertTriangle, label: 'Alertas de Risco' },
  { href: '/configuracoes', icon: Settings, label: 'Configurações' },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-full flex-col bg-[#0F4C5C] text-white shadow-2xl transition-all duration-300 ease-in-out',
          // Desktop: show always, respect collapsed state
          'lg:translate-x-0',
          collapsed ? 'lg:w-20' : 'lg:w-64',
          // Mobile: slide in/out
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'
        )}
      >
        {/* Brand / Logo */}
        <div className="relative flex items-center gap-3 border-b border-white/10 px-4 py-5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6ECEDA] to-[#5B8A72] shadow-lg shadow-[#6ECEDA]/20">
            <Brain className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden transition-all duration-300">
              <h1 className="font-outfit text-xl font-bold tracking-tight">
                MindWork
              </h1>
              <p className="text-[11px] font-medium text-[#6ECEDA]/80">
                Saúde Mental Corporativa
              </p>
            </div>
          )}

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-5 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-7 hidden h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-[#0F4C5C] text-white/70 shadow-lg transition-all hover:bg-[#1a6b7d] hover:text-white lg:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/15 text-white shadow-lg shadow-white/5'
                    : 'text-white/70 hover:bg-white/8 hover:text-white',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 flex-shrink-0 transition-transform duration-200',
                    isActive ? 'text-[#6ECEDA]' : 'text-white/50 group-hover:text-white/80',
                    !collapsed && 'group-hover:scale-110'
                  )}
                />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-[#6ECEDA] shadow-lg shadow-[#6ECEDA]/50" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User info */}
        <div className="border-t border-white/10 p-3">
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/5',
              collapsed && 'justify-center p-2'
            )}
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6ECEDA] to-[#5B8A72] text-sm font-bold shadow-md">
              AR
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold">Admin RH</p>
                <span className="inline-block rounded-full bg-[#6ECEDA]/20 px-2 py-0.5 text-[10px] font-medium text-[#6ECEDA]">
                  Administrador
                </span>
              </div>
            )}
          </div>

          <button
            className={cn(
              'mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-all duration-200 hover:bg-red-500/15 hover:text-red-300',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
