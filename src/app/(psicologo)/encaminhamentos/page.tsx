'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/lib/utils'
import { UserCircle, Calendar, Building, MessageSquare, ChevronDown, ChevronUp, Save, CheckCircle2 } from 'lucide-react'

// Mock data para MVP
const MOCK_REFERRALS = [
  { id: '1', employee_codigo_anonimo: 'TN1J7P09', org_nome: 'TechNova Soluções', status: 'contatado', observacoes: 'Paciente apresenta sinais de esgotamento severo. Agendada primeira sessão.', created_at: '2024-05-01T10:00:00Z', updated_at: '2024-05-03T14:30:00Z' },
  { id: '2', employee_codigo_anonimo: 'TN4W1B21', org_nome: 'TechNova Soluções', status: 'concluido', observacoes: 'Acompanhamento de 4 sessões realizado. Melhora significativa com técnicas de reestruturação cognitiva e limites de horário.', created_at: '2024-04-15T09:20:00Z', updated_at: '2024-05-20T11:15:00Z' },
  { id: '3', employee_codigo_anonimo: 'CH6E3K05', org_nome: 'Construtora Horizonte', status: 'contatado', observacoes: 'Primeiro contato realizado. Alta pressão no setor de obras relata sobrecarga de turnos.', created_at: '2024-05-20T16:45:00Z', updated_at: '2024-05-22T08:10:00Z' },
  { id: '4', employee_codigo_anonimo: 'BV8G5M07', org_nome: 'Clínica Bem Viver', status: 'pendente', observacoes: null, created_at: '2024-06-01T13:20:00Z', updated_at: '2024-06-01T13:20:00Z' },
  { id: '5', employee_codigo_anonimo: 'TN6P3U14', org_nome: 'TechNova Soluções', status: 'pendente', observacoes: null, created_at: '2024-06-10T11:05:00Z', updated_at: '2024-06-10T11:05:00Z' },
  { id: '6', employee_codigo_anonimo: 'BV6E3K05', org_nome: 'Clínica Bem Viver', status: 'pendente', observacoes: null, created_at: '2024-06-15T15:40:00Z', updated_at: '2024-06-15T15:40:00Z' },
]

export default function EncaminhamentosPage() {
  const [referrals, setReferrals] = useState(MOCK_REFERRALS)
  const [filterStatus, setFilterStatus] = useState<string>('todos')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [obsText, setObsText] = useState<{ [key: string]: string }>({})
  const [savingId, setSavingId] = useState<string | null>(null)

  const stats = {
    pendentes: referrals.filter((r) => r.status === 'pendente').length,
    contatados: referrals.filter((r) => r.status === 'contatado').length,
    concluidos: referrals.filter((r) => r.status === 'concluido').length,
  }

  const filteredReferrals = referrals.filter(
    (r) => filterStatus === 'todos' || r.status === filterStatus
  )

  const handleStatusCycle = (id: string, currentStatus: string) => {
    const statusMap: Record<string, string> = {
      pendente: 'contatado',
      contatado: 'concluido',
      concluido: 'pendente',
    }
    const nextStatus = statusMap[currentStatus]
    setReferrals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: nextStatus, updated_at: new Date().toISOString() } : r))
    )
  }

  const handleSaveObs = (id: string) => {
    setSavingId(id)
    setTimeout(() => {
      setReferrals((prev) =>
        prev.map((r) => (r.id === id ? { ...r, observacoes: obsText[id] || r.observacoes, updated_at: new Date().toISOString() } : r))
      )
      setSavingId(null)
    }, 600)
  }

  return (
    <div className="space-y-6 slide-up">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-outfit text-2xl font-bold tracking-tight text-slate-800">
            Encaminhamentos
          </h2>
          <p className="text-slate-500">
            Gerencie as solicitações de apoio de forma anônima.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card variant="glass" className="border-l-4 border-l-amber-400">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Aguardando Contato</p>
                <p className="font-outfit text-3xl font-bold text-slate-800">{stats.pendentes}</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card variant="glass" className="border-l-4 border-l-blue-400">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Em Acompanhamento</p>
                <p className="font-outfit text-3xl font-bold text-slate-800">{stats.contatados}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <UserCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card variant="glass" className="border-l-4 border-l-emerald-400">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Casos Concluídos</p>
                <p className="font-outfit text-3xl font-bold text-slate-800">{stats.concluidos}</p>
              </div>
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card variant="glass">
        <div className="border-b border-slate-100 p-4 sm:px-6">
          <div className="flex items-center gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="todos">Todos os Status</option>
              <option value="pendente">Pendentes</option>
              <option value="contatado">Em Acompanhamento</option>
              <option value="concluido">Concluídos</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredReferrals.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              Nenhum encaminhamento encontrado com os filtros atuais.
            </div>
          ) : (
            filteredReferrals.map((ref) => {
              const isExpanded = expandedId === ref.id
              let badgeVariant: 'default' | 'moderado' | 'info' | 'baixo' = 'default'
              let statusLabel = ''
              if (ref.status === 'pendente') {
                badgeVariant = 'moderado'
                statusLabel = 'Pendente'
              } else if (ref.status === 'contatado') {
                badgeVariant = 'info'
                statusLabel = 'Em Acompanhamento'
              } else if (ref.status === 'concluido') {
                badgeVariant = 'baixo'
                statusLabel = 'Concluído'
              }

              return (
                <div key={ref.id} className="flex flex-col p-4 transition-colors hover:bg-slate-50/50 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <UserCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-lg font-bold text-slate-800">
                            {ref.employee_codigo_anonimo}
                          </span>
                          <Badge variant={badgeVariant} className="cursor-pointer" onClick={() => handleStatusCycle(ref.id, ref.status)}>
                            {statusLabel}
                          </Badge>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Building className="h-3.5 w-3.5" />
                            {ref.org_nome}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            Solicitado: {formatDateTime(ref.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      onClick={() => setExpandedId(isExpanded ? null : ref.id)}
                      className="w-full sm:w-auto"
                    >
                      {isExpanded ? (
                        <>Esconder Detalhes <ChevronUp className="ml-2 h-4 w-4" /></>
                      ) : (
                        <>Ver Detalhes / Anotações <ChevronDown className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 slide-up">
                      <h4 className="mb-2 text-sm font-semibold text-slate-700">Anotações Clínicas (Sigiloso)</h4>
                      <textarea
                        className="w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        rows={4}
                        placeholder="Adicione suas observações confidenciais aqui..."
                        defaultValue={ref.observacoes || ''}
                        onChange={(e) => setObsText({ ...obsText, [ref.id]: e.target.value })}
                      />
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs text-slate-400">
                          Última atualização: {formatDateTime(ref.updated_at)}
                        </p>
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveObs(ref.id)}
                          disabled={savingId === ref.id}
                        >
                          {savingId === ref.id ? 'Salvando...' : (
                            <><Save className="mr-2 h-4 w-4" /> Salvar Anotações</>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </Card>
    </div>
  )
}
