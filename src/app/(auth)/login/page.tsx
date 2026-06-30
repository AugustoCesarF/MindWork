'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, LogIn, Building2, UserPlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { loginSchema, type LoginFormData } from '@/lib/validators/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { RoleType } from '@/types/database'

const ROLE_REDIRECTS: Record<RoleType, string> = {
  admin_rh: '/dashboard',
  funcionario: '/checkin',
  psicologo: '/encaminhamentos',
  super_admin: '/admin',
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleDemoLogin = async () => {
    setValue('email', 'rh@clinicavitalis-demo.com')
    setValue('password', 'demo_password123')
    await onSubmit({ email: 'rh@clinicavitalis-demo.com', password: 'demo_password123' })
  }

  async function onSubmit(data: LoginFormData) {
    setError(null)

    try {
      const supabase = createClient()

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('E-mail ou senha inválidos. Verifique suas credenciais.')
        } else if (authError.message.includes('Email not confirmed')) {
          setError('E-mail ainda não confirmado. Verifique sua caixa de entrada.')
        } else {
          setError('Erro ao fazer login. Tente novamente.')
        }
        return
      }

      // Fetch profile to determine role and redirect
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError('Erro ao obter dados do usuário.')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role) {
        const redirectTo = ROLE_REDIRECTS[profile.role as RoleType] || '/dashboard'
        router.push(redirectTo)
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('Ocorreu um erro inesperado. Tente novamente.')
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0F4C5C]/10 mb-4">
          <LogIn className="w-7 h-7 text-[#0F4C5C]" />
        </div>
        <h2
          className="text-2xl font-bold text-slate-900"
          style={{ fontFamily: 'var(--font-outfit, "Outfit", sans-serif)' }}
        >
          Entrar no MindWork
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Acesse sua conta para continuar
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-3 rounded-xl bg-[#E63946]/10 border border-[#E63946]/20 text-sm text-[#E63946] flex items-center gap-2">
          <span className="shrink-0">⚠️</span>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="email"
          type="email"
          label="E-mail"
          placeholder="seu@email.com"
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          autoComplete="email"
          {...register('email')}
        />

        <Input
          id="password"
          type="password"
          label="Senha"
          placeholder="••••••••"
          icon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          autoComplete="current-password"
          {...register('password')}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
        <Button
          type="button"
          onClick={handleDemoLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
          size="lg"
        >
          Entrar na Demonstração (Clínica Vitalis)
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white/90 px-3 text-slate-400">
            Ainda não tem conta?
          </span>
        </div>
      </div>

      {/* Registration links */}
      <div className="space-y-3">
        <Link
          href="/cadastro-empresa"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border-2 border-[#0F4C5C]/20 text-[#0F4C5C] text-sm font-medium hover:bg-[#0F4C5C]/5 hover:border-[#0F4C5C]/30 transition-all duration-200"
        >
          <Building2 className="w-4 h-4" />
          Cadastrar minha empresa
        </Link>
        <Link
          href="/cadastro-funcionario"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border-2 border-[#5B8A72]/20 text-[#5B8A72] text-sm font-medium hover:bg-[#5B8A72]/5 hover:border-[#5B8A72]/30 transition-all duration-200"
        >
          <UserPlus className="w-4 h-4" />
          Sou funcionário
        </Link>
      </div>
    </div>
  )
}
