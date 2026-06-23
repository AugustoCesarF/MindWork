import type { ReactNode } from 'react'
import { Brain } from 'lucide-react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0A3140] via-[#0F4C5C] to-[#5B8A72]">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#6ECEDA]/10 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#5B8A72]/15 blur-3xl"
          style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#6ECEDA]/8 blur-3xl"
          style={{ animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s' }}
        />
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-[20%] w-4 h-4 rounded-full bg-[#6ECEDA]/30 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 left-[15%] w-3 h-3 rounded-full bg-white/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-[40%] right-[10%] w-2 h-2 rounded-full bg-[#81B29A]/40 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-[20%] right-[30%] w-5 h-5 rounded-full bg-white/10 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }} />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 shadow-lg">
          <Brain className="w-7 h-7 text-[#6ECEDA]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit, "Outfit", sans-serif)' }}>
            MindWork
          </h1>
          <p className="text-xs text-[#6ECEDA]/80 tracking-wider uppercase">
            Saúde Mental Corporativa
          </p>
        </div>
      </div>

      {/* Content card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="rounded-2xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-8 text-center">
        <p className="text-sm text-white/50">
          MindWork © 2024 — Tecnologia para Saúde Mental Corporativa
        </p>
      </footer>
    </div>
  )
}
