'use client'

import { Menu, Bell } from 'lucide-react'

interface HeaderProps {
  title: string
  onMenuClick: () => void
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page title */}
        <div>
          <h1 className="font-outfit text-lg font-bold text-gray-900 sm:text-xl">
            {title}
          </h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications bell */}
        <button className="relative rounded-xl p-2.5 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600">
          <Bell className="h-5 w-5" />
          {/* Notification dot */}
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E07A5F] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E63946]" />
          </span>
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-8 w-px bg-gray-200 sm:block" />

        {/* User avatar */}
        <button className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-gray-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0F4C5C] to-[#5B8A72] text-sm font-bold text-white shadow-md shadow-[#0F4C5C]/20 transition-transform duration-200 group-hover:scale-105">
            AR
          </div>
          <span className="hidden text-sm font-medium text-gray-700 sm:block">
            Admin RH
          </span>
        </button>
      </div>
    </header>
  )
}
