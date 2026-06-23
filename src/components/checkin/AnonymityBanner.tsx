'use client'

import { Shield, Lock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface AnonymityBannerProps {
  variant?: 'full' | 'compact'
}

export default function AnonymityBanner({ variant = 'full' }: AnonymityBannerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (variant === 'compact') {
    return (
      <div
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl
          bg-gradient-to-r from-teal-50 to-cyan-50
          border border-teal-200/60
          transition-all duration-500
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
        `}
      >
        <Shield className="h-4 w-4 text-teal-600 flex-shrink-0" />
        <p className="text-xs text-teal-700 font-medium">
          Suas respostas são anônimas e confidenciais
        </p>
        <Lock
          className={`
            h-3 w-3 text-teal-500 flex-shrink-0 ml-auto
            transition-all duration-700 delay-300
            ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
          `}
        />
      </div>
    )
  }

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50
        border border-teal-200/60
        p-5 sm:p-6
        transition-all duration-600
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
    >
      {/* Decorative background circles */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-100/40" />
      <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-cyan-100/40" />

      <div className="relative flex items-start gap-4">
        {/* Shield icon with pulse animation */}
        <div
          className={`
            flex-shrink-0 flex items-center justify-center
            h-12 w-12 rounded-xl
            bg-gradient-to-br from-teal-500 to-cyan-600
            shadow-lg shadow-teal-200/50
            transition-all duration-700 delay-200
            ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
        >
          <Shield className="h-6 w-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-base font-semibold text-teal-900">
              Anonimato Garantido
            </h3>
            <Lock
              className={`
                h-3.5 w-3.5 text-teal-600
                transition-all duration-700 delay-500
                ${mounted ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'}
              `}
            />
          </div>
          <p className="text-sm text-teal-700/90 leading-relaxed">
            Suas respostas são completamente anônimas e confidenciais. 
            Nenhuma informação será associada ao seu nome.
          </p>
        </div>
      </div>
    </div>
  )
}
