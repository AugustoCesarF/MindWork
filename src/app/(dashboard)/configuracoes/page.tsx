'use client'

import { useState } from 'react'
import {
  Building2,
  Hash,
  CreditCard,
  Copy,
  Check,
  Calendar,
  Users,
  Plus,
  X,
  Briefcase,
  RefreshCw,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CicloType, PlanoType } from '@/types/database'

// ─── MOCK DATA ──────────────────────────────────────────────

const MOCK_ORG = {
  id: 'org-001',
  nome: 'TechSaúde Ltda',
  cnpj: '12.345.678/0001-90',
  plano: 'pro' as PlanoType,
  codigo_convite: 'MW4K9P',
  ciclo_checkin: 'quinzenal' as CicloType,
  total_funcionarios: 48,
}

const MOCK_DEPARTMENTS = [
  'Tecnologia',
  'Comercial',
  'RH',
  'Financeiro',
  'Marketing',
  'Operações',
]

const CICLO_OPTIONS: { value: CicloType; label: string; desc: string }[] = [
  { value: 'semanal', label: 'Semanal', desc: 'Check-ins toda semana' },
  { value: 'quinzenal', label: 'Quinzenal', desc: 'Check-ins a cada 2 semanas' },
  { value: 'mensal', label: 'Mensal', desc: 'Check-ins uma vez por mês' },
]

const PLANO_LABELS: Record<PlanoType, { label: string; color: string }> = {
  starter: { label: 'Starter', color: 'bg-gray-100 text-gray-700' },
  pro: { label: 'Profissional', color: 'bg-[#6ECEDA]/15 text-[#0F4C5C]' },
  enterprise: { label: 'Enterprise', color: 'bg-purple-100 text-purple-700' },
}

export default function ConfiguracoesPage() {
  const [copied, setCopied] = useState(false)
  const [ciclo, setCiclo] = useState<CicloType>(MOCK_ORG.ciclo_checkin)
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS)
  const [newDept, setNewDept] = useState('')
  const [showAddDept, setShowAddDept] = useState(false)

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(MOCK_ORG.codigo_convite)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const handleAddDepartment = () => {
    const trimmed = newDept.trim()
    if (trimmed && !departments.includes(trimmed)) {
      setDepartments((prev) => [...prev, trimmed])
      setNewDept('')
      setShowAddDept(false)
    }
  }

  const handleRemoveDepartment = (dept: string) => {
    setDepartments((prev) => prev.filter((d) => d !== dept))
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="font-outfit text-2xl font-bold text-gray-900">
          Configurações
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Gerencie sua organização e preferências
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ─── Organization Info ─────────────────────────── */}
        <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C5C]/10">
              <Building2 className="h-5 w-5 text-[#0F4C5C]" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-gray-900">
                Informações da Organização
              </h3>
              <p className="text-xs text-gray-400">Dados da sua empresa</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Nome */}
            <div className="flex items-center gap-3 rounded-xl bg-gray-50/80 p-4">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-400">Nome da Empresa</p>
                <p className="text-sm font-semibold text-gray-800">{MOCK_ORG.nome}</p>
              </div>
            </div>

            {/* CNPJ */}
            <div className="flex items-center gap-3 rounded-xl bg-gray-50/80 p-4">
              <Hash className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-400">CNPJ</p>
                <p className="text-sm font-semibold text-gray-800">{MOCK_ORG.cnpj}</p>
              </div>
            </div>

            {/* Plano */}
            <div className="flex items-center gap-3 rounded-xl bg-gray-50/80 p-4">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-400">Plano Atual</p>
                <span className={cn(
                  'mt-0.5 inline-block rounded-full px-3 py-1 text-xs font-bold',
                  PLANO_LABELS[MOCK_ORG.plano].color
                )}>
                  {PLANO_LABELS[MOCK_ORG.plano].label}
                </span>
              </div>
            </div>

            {/* Employee count */}
            <div className="flex items-center gap-3 rounded-xl bg-gray-50/80 p-4">
              <Users className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-400">Total de Funcionários</p>
                <p className="text-sm font-semibold text-gray-800">{MOCK_ORG.total_funcionarios} colaboradores</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Invite Code ───────────────────────────────── */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-[#0F4C5C] to-[#1a6b7d] p-6 shadow-lg shadow-[#0F4C5C]/15">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                <Shield className="h-5 w-5 text-[#6ECEDA]" />
              </div>
              <div>
                <h3 className="font-outfit text-base font-bold text-white">
                  Código de Convite
                </h3>
                <p className="text-xs text-white/60">
                  Compartilhe com seus colaboradores
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-center font-mono text-3xl font-black tracking-[0.3em] text-white">
                  {MOCK_ORG.codigo_convite}
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className={cn(
                  'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300',
                  copied
                    ? 'bg-emerald-400 text-white'
                    : 'bg-white/15 text-white hover:bg-white/25'
                )}
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-white/50">
              Funcionários usam este código para se cadastrar na plataforma
            </p>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
              <RefreshCw className="h-4 w-4" />
              Gerar Novo Código
            </button>
          </div>

          {/* ─── Checkin Cycle ──────────────────────────── */}
          <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5B8A72]/10">
                <Calendar className="h-5 w-5 text-[#5B8A72]" />
              </div>
              <div>
                <h3 className="font-outfit text-base font-bold text-gray-900">
                  Ciclo de Check-in
                </h3>
                <p className="text-xs text-gray-400">
                  Frequência dos questionários
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {CICLO_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCiclo(option.value)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all duration-200',
                    ciclo === option.value
                      ? 'border-[#0F4C5C] bg-[#0F4C5C]/5 shadow-sm'
                      : 'border-transparent bg-gray-50/80 hover:border-gray-200 hover:bg-gray-50'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors',
                      ciclo === option.value
                        ? 'border-[#0F4C5C]'
                        : 'border-gray-300'
                    )}
                  >
                    {ciclo === option.value && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#0F4C5C]" />
                    )}
                  </div>
                  <div>
                    <p className={cn(
                      'text-sm font-semibold',
                      ciclo === option.value ? 'text-[#0F4C5C]' : 'text-gray-700'
                    )}>
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-400">{option.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Department Management ─────────────────────── */}
      <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6ECEDA]/10">
              <Building2 className="h-5 w-5 text-[#6ECEDA]" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-gray-900">
                Departamentos
              </h3>
              <p className="text-xs text-gray-400">
                {departments.length} departamentos cadastrados
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddDept(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#0F4C5C] px-3.5 py-2 text-sm font-medium text-white shadow-md shadow-[#0F4C5C]/15 transition-all hover:bg-[#0F4C5C]/90 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>

        {/* Add department input */}
        {showAddDept && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border-2 border-[#6ECEDA] bg-[#6ECEDA]/5 p-3 transition-all">
            <input
              type="text"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddDepartment()}
              placeholder="Nome do departamento..."
              className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              autoFocus
            />
            <button
              onClick={handleAddDepartment}
              className="rounded-lg bg-[#0F4C5C] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0F4C5C]/80"
            >
              Salvar
            </button>
            <button
              onClick={() => { setShowAddDept(false); setNewDept('') }}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Department list */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept}
              className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 transition-all hover:border-gray-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-[#6ECEDA]" />
                <span className="text-sm font-medium text-gray-700">{dept}</span>
              </div>
              <button
                onClick={() => handleRemoveDepartment(dept)}
                className="rounded-lg p-1 text-gray-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                title="Remover departamento"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
