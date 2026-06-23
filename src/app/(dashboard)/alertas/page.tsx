'use client'

import { useState } from 'react'
import {
  Eye,
  ArrowUpRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Download,
} from 'lucide-react'
import { cn, RISK_COLORS, RISK_LABELS, RISK_BG_CLASSES, SCALE_LABELS, formatDateTime } from '@/lib/utils'
import type { RiscoType, AlertaStatusType, EscalaType } from '@/types/database'

// ─── MOCK DATA ──────────────────────────────────────────────

const MOCK_ALERTS = [
  { id: '1', employee_codigo_anonimo: 'MW-3K8P2N', departamento: 'Comercial', nivel_risco: 'severo' as RiscoType, escala_origem: 'phq9' as EscalaType, pontuacao: 22, status: 'novo' as AlertaStatusType, created_at: '2026-06-22T10:30:00Z' },
  { id: '2', employee_codigo_anonimo: 'MW-7R4T9M', departamento: 'Operações', nivel_risco: 'severo' as RiscoType, escala_origem: 'gad7' as EscalaType, pontuacao: 19, status: 'novo' as AlertaStatusType, created_at: '2026-06-22T09:15:00Z' },
  { id: '3', employee_codigo_anonimo: 'MW-5H2L6J', departamento: 'Tecnologia', nivel_risco: 'alto' as RiscoType, escala_origem: 'maslach' as EscalaType, pontuacao: 16, status: 'visualizado' as AlertaStatusType, created_at: '2026-06-21T16:45:00Z' },
  { id: '4', employee_codigo_anonimo: 'MW-9B6W3Q', departamento: 'Comercial', nivel_risco: 'alto' as RiscoType, escala_origem: 'phq9' as EscalaType, pontuacao: 15, status: 'visualizado' as AlertaStatusType, created_at: '2026-06-21T14:20:00Z' },
  { id: '5', employee_codigo_anonimo: 'MW-1D4X8F', departamento: 'Financeiro', nivel_risco: 'alto' as RiscoType, escala_origem: 'gad7' as EscalaType, pontuacao: 14, status: 'encaminhado' as AlertaStatusType, created_at: '2026-06-20T11:00:00Z' },
  { id: '6', employee_codigo_anonimo: 'MW-2G7Y5A', departamento: 'Marketing', nivel_risco: 'severo' as RiscoType, escala_origem: 'phq9' as EscalaType, pontuacao: 24, status: 'encaminhado' as AlertaStatusType, created_at: '2026-06-20T08:30:00Z' },
  { id: '7', employee_codigo_anonimo: 'MW-8N3K7P', departamento: 'Tecnologia', nivel_risco: 'moderado' as RiscoType, escala_origem: 'gad7' as EscalaType, pontuacao: 11, status: 'novo' as AlertaStatusType, created_at: '2026-06-19T17:10:00Z' },
  { id: '8', employee_codigo_anonimo: 'MW-4F9R2L', departamento: 'RH', nivel_risco: 'moderado' as RiscoType, escala_origem: 'maslach' as EscalaType, pontuacao: 10, status: 'visualizado' as AlertaStatusType, created_at: '2026-06-19T15:30:00Z' },
  { id: '9', employee_codigo_anonimo: 'MW-6T5M8W', departamento: 'Operações', nivel_risco: 'alto' as RiscoType, escala_origem: 'phq9' as EscalaType, pontuacao: 17, status: 'novo' as AlertaStatusType, created_at: '2026-06-18T12:00:00Z' },
  { id: '10', employee_codigo_anonimo: 'MW-0J2H4D', departamento: 'Financeiro', nivel_risco: 'severo' as RiscoType, escala_origem: 'gad7' as EscalaType, pontuacao: 20, status: 'encaminhado' as AlertaStatusType, created_at: '2026-06-18T09:45:00Z' },
  { id: '11', employee_codigo_anonimo: 'MW-3P7B9X', departamento: 'Comercial', nivel_risco: 'moderado' as RiscoType, escala_origem: 'maslach' as EscalaType, pontuacao: 12, status: 'visualizado' as AlertaStatusType, created_at: '2026-06-17T14:20:00Z' },
  { id: '12', employee_codigo_anonimo: 'MW-5Q1N6A', departamento: 'Marketing', nivel_risco: 'alto' as RiscoType, escala_origem: 'phq9' as EscalaType, pontuacao: 15, status: 'novo' as AlertaStatusType, created_at: '2026-06-17T11:30:00Z' },
]

const DEPARTMENTS = ['Todos', 'Tecnologia', 'Comercial', 'RH', 'Financeiro', 'Marketing', 'Operações']

const STATUS_CONFIG: Record<AlertaStatusType, { icon: typeof Eye; label: string; class: string }> = {
  novo: { icon: Clock, label: 'Novo', class: 'bg-blue-100 text-blue-700 border-blue-200' },
  visualizado: { icon: Eye, label: 'Visualizado', class: 'bg-amber-100 text-amber-700 border-amber-200' },
  encaminhado: { icon: ArrowUpRight, label: 'Encaminhado', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
}

const STATUS_OPTIONS: AlertaStatusType[] = ['novo', 'visualizado', 'encaminhado']

const ITEMS_PER_PAGE = 8

export default function AlertasPage() {
  const [filterRisk, setFilterRisk] = useState<RiscoType | 'todos'>('todos')
  const [filterDept, setFilterDept] = useState('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [alerts, setAlerts] = useState(MOCK_ALERTS)

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (filterRisk !== 'todos' && alert.nivel_risco !== filterRisk) return false
    if (filterDept !== 'Todos' && alert.departamento !== filterDept) return false
    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredAlerts.length / ITEMS_PER_PAGE)
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Update status
  const handleStatusChange = (alertId: string, newStatus: AlertaStatusType) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
    )
  }

  // Count by status
  const countByStatus = (status: AlertaStatusType) =>
    alerts.filter((a) => a.status === status).length

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-outfit text-2xl font-bold text-gray-900">
            Alertas de Risco
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitoramento e gestão de alertas de saúde mental
          </p>
        </div>
        <button className="flex items-center gap-2 self-start rounded-xl bg-[#0F4C5C] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#0F4C5C]/20 transition-all hover:bg-[#0F4C5C]/90 hover:shadow-xl">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STATUS_OPTIONS.map((status) => {
          const config = STATUS_CONFIG[status]
          const Icon = config.icon
          const count = countByStatus(status)
          return (
            <button
              key={status}
              onClick={() => {/* future filter by status */}}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', config.class)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-gray-500">{config.label}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          <Filter className="h-4 w-4" />
          Filtros:
        </div>

        {/* Risk level filter */}
        <select
          value={filterRisk}
          onChange={(e) => { setFilterRisk(e.target.value as RiscoType | 'todos'); setCurrentPage(1) }}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-[#6ECEDA] focus:ring-2 focus:ring-[#6ECEDA]/20"
        >
          <option value="todos">Todos os Níveis</option>
          <option value="baixo">🟢 Baixo</option>
          <option value="moderado">🟡 Moderado</option>
          <option value="alto">🟠 Alto</option>
          <option value="severo">🔴 Severo</option>
        </select>

        {/* Department filter */}
        <select
          value={filterDept}
          onChange={(e) => { setFilterDept(e.target.value); setCurrentPage(1) }}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-[#6ECEDA] focus:ring-2 focus:ring-[#6ECEDA]/20"
        >
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>{dept === 'Todos' ? 'Todos os Departamentos' : dept}</option>
          ))}
        </select>

        <div className="ml-auto text-xs text-gray-400">
          {filteredAlerts.length} alerta{filteredAlerts.length !== 1 ? 's' : ''} encontrado{filteredAlerts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Alerts table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white/80 shadow-sm backdrop-blur-sm">
        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Código Anônimo
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Departamento
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Nível de Risco
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Escala
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Pontuação
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Data
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-sm font-semibold text-gray-800">
                      {alert.employee_codigo_anonimo}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                    {alert.departamento}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
                      RISK_BG_CLASSES[alert.nivel_risco]
                    )}>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: RISK_COLORS[alert.nivel_risco] }}
                      />
                      {RISK_LABELS[alert.nivel_risco]}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                    {SCALE_LABELS[alert.escala_origem]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className="text-sm font-bold text-gray-800">
                      {alert.pontuacao}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-500">
                    {formatDateTime(alert.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <select
                      value={alert.status}
                      onChange={(e) => handleStatusChange(alert.id, e.target.value as AlertaStatusType)}
                      className={cn(
                        'cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold outline-none transition-colors',
                        STATUS_CONFIG[alert.status].class
                      )}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-gray-50 md:hidden">
          {paginatedAlerts.map((alert) => (
            <div key={alert.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 font-mono text-sm font-semibold text-gray-800">
                    {alert.employee_codigo_anonimo}
                  </span>
                  <p className="mt-1.5 text-sm text-gray-600">{alert.departamento}</p>
                </div>
                <span className={cn(
                  'rounded-full border px-2.5 py-1 text-[10px] font-semibold',
                  RISK_BG_CLASSES[alert.nivel_risco]
                )}>
                  {RISK_LABELS[alert.nivel_risco]}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                <span>{SCALE_LABELS[alert.escala_origem]}</span>
                <span>Pontuação: <b className="text-gray-700">{alert.pontuacao}</b></span>
                <span>{formatDateTime(alert.created_at)}</span>
              </div>
              <div className="mt-3">
                <select
                  value={alert.status}
                  onChange={(e) => handleStatusChange(alert.id, e.target.value as AlertaStatusType)}
                  className={cn(
                    'cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold outline-none',
                    STATUS_CONFIG[alert.status].class
                  )}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredAlerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Search className="mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">Nenhum alerta encontrado</p>
            <p className="mt-1 text-xs text-gray-400">Tente ajustar os filtros</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-500">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                    page === currentPage
                      ? 'bg-[#0F4C5C] text-white shadow-md'
                      : 'text-gray-500 hover:bg-gray-100'
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
