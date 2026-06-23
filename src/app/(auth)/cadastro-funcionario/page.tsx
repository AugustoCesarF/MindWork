'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, KeyRound, Shield, ArrowLeft, Users } from 'lucide-react'
import { cadastroFuncionarioSchema, type CadastroFuncionarioFormData } from '@/lib/validators/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CadastroFuncionarioPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFuncionarioFormData>({
    resolver: zodResolver(cadastroFuncionarioSchema),
  })

  async function onSubmit(data: CadastroFuncionarioFormData) {
    setError(null)

    try {
      const res = await fetch('/api/auth/cadastro-funcionario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          codigo_convite: data.codigo_convite.toUpperCase(),
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'Erro ao cadastrar. Tente novamente.')
        return
      }

      router.push('/checkin')
    } catch {
      setError('Ocorreu um erro inesperado. Tente novamente.')
    }
  }

  return (
    <div className="p-8">
      {/* Back link */}
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Voltar ao login
      </Link>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#5B8A72]/10 mb-4">
          <Users className="w-7 h-7 text-[#5B8A72]" />
        </div>
        <h2
          className="text-2xl font-bold text-slate-900"
          style={{ fontFamily: 'var(--font-outfit, "Outfit", sans-serif)' }}
        >
          Entrar como Funcionário
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Use o código de convite fornecido pela sua empresa
        </p>
      </div>

      {/* Anonymity banner */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#5B8A72]/10 to-[#6ECEDA]/10 border border-[#5B8A72]/20">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#5B8A72]/20">
              <Shield className="w-4 h-4 text-[#5B8A72]" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0F4C5C]">
              Suas respostas são totalmente anônimas
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Sua empresa não terá acesso à sua identidade. Apenas dados agregados e anônimos são compartilhados.
            </p>
          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-3 rounded-xl bg-[#E63946]/10 border border-[#E63946]/20 text-sm text-[#E63946] flex items-center gap-2">
          <span className="shrink-0">⚠️</span>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="codigo_convite"
          label="Código de Convite"
          placeholder="Ex: A3B7K9"
          icon={<KeyRound className="w-4 h-4" />}
          error={errors.codigo_convite?.message}
          maxLength={6}
          className="uppercase tracking-[0.2em] font-mono text-center text-lg"
          {...register('codigo_convite')}
        />

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
          placeholder="Mínimo 6 caracteres"
          icon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          autoComplete="new-password"
          {...register('password')}
        />

        <div>
          <label
            htmlFor="departamento"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Departamento (opcional)
          </label>
          <select
            id="departamento"
            className="block w-full rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-slate-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6ECEDA]/50 focus:border-[#6ECEDA] hover:border-slate-300"
            {...register('departamento')}
          >
            <option value="">Selecione seu departamento</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Comercial">Comercial</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Marketing">Marketing</option>
            <option value="Operações">Operações</option>
            <option value="RH">Recursos Humanos</option>
            <option value="TI">Tecnologia da Informação</option>
            <option value="Jurídico">Jurídico</option>
            <option value="Logística">Logística</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            variant="secondary"
            size="lg"
            loading={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar e Iniciar'}
          </Button>
        </div>
      </form>

      {/* Footer link */}
      <p className="text-center text-xs text-slate-400 mt-6">
        Já tem uma conta?{' '}
        <Link href="/login" className="text-[#0F4C5C] hover:underline font-medium">
          Faça login
        </Link>
      </p>
    </div>
  )
}
