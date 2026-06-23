'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, Building2, User, Briefcase, Copy, Check, ArrowLeft, PartyPopper } from 'lucide-react'
import { cadastroEmpresaSchema, type CadastroEmpresaFormData } from '@/lib/validators/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CadastroEmpresaPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [codigoConvite, setCodigoConvite] = useState('')
  const [copied, setCopied] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroEmpresaFormData>({
    resolver: zodResolver(cadastroEmpresaSchema),
  })

  async function onSubmit(data: CadastroEmpresaFormData) {
    setError(null)

    try {
      const res = await fetch('/api/auth/cadastro-empresa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'Erro ao cadastrar empresa. Tente novamente.')
        return
      }

      setCodigoConvite(result.codigo_convite)
      setSuccess(true)
    } catch {
      setError('Ocorreu um erro inesperado. Tente novamente.')
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codigoConvite)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = codigoConvite
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Success state
  if (success) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#81B29A]/10 mb-4">
          <PartyPopper className="w-8 h-8 text-[#5B8A72]" />
        </div>
        <h2
          className="text-2xl font-bold text-slate-900 mb-2"
          style={{ fontFamily: 'var(--font-outfit, "Outfit", sans-serif)' }}
        >
          Empresa Cadastrada!
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Compartilhe o código de convite com seus funcionários para que eles se cadastrem na plataforma.
        </p>

        {/* Invite code display */}
        <div className="relative mb-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F4C5C] to-[#5B8A72] text-white">
            <p className="text-xs uppercase tracking-wider text-white/60 mb-2">
              Código de Convite
            </p>
            <p className="text-4xl font-mono font-bold tracking-[0.3em]">
              {codigoConvite}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            title="Copiar código"
          >
            {copied ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Copy className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {copied && (
          <p className="text-xs text-[#5B8A72] mb-4 animate-pulse">
            ✓ Código copiado para a área de transferência!
          </p>
        )}

        <Button
          onClick={() => router.push('/dashboard')}
          className="w-full"
          size="lg"
        >
          Ir para o Painel
        </Button>
      </div>
    )
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
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0F4C5C]/10 mb-4">
          <Building2 className="w-7 h-7 text-[#0F4C5C]" />
        </div>
        <h2
          className="text-2xl font-bold text-slate-900"
          style={{ fontFamily: 'var(--font-outfit, "Outfit", sans-serif)' }}
        >
          Cadastre sua Empresa
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Comece a cuidar do bem-estar da sua equipe
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="nome_empresa"
          label="Nome da Empresa"
          placeholder="Ex: Empresa Feliz Ltda"
          icon={<Building2 className="w-4 h-4" />}
          error={errors.nome_empresa?.message}
          {...register('nome_empresa')}
        />

        <Input
          id="cnpj"
          label="CNPJ (opcional)"
          placeholder="00.000.000/0000-00"
          error={errors.cnpj?.message}
          {...register('cnpj')}
        />

        <Input
          id="nome_admin"
          label="Seu Nome"
          placeholder="Nome completo"
          icon={<User className="w-4 h-4" />}
          error={errors.nome_admin?.message}
          {...register('nome_admin')}
        />

        <Input
          id="email"
          type="email"
          label="E-mail"
          placeholder="admin@empresa.com"
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

        <Input
          id="cargo"
          label="Cargo (opcional)"
          placeholder="Ex: Gerente de RH"
          icon={<Briefcase className="w-4 h-4" />}
          error={errors.cargo?.message}
          {...register('cargo')}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Empresa'}
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
