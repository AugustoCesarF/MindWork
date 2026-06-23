'use client'

import { useState, useEffect } from 'react'
import {
  Shield,
  AlertTriangle,
  AlertOctagon,
  TrendingUp,
  Users,
  ArrowRight,
  Eye,
  ArrowUpRight,
  Clock,
  Activity,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { cn, RISK_COLORS, RISK_LABELS, RISK_BG_CLASSES, SCALE_LABELS } from '@/lib/utils'
import type { RiscoType, AlertaStatusType, EscalaType } from '@/types/database'
import Link from 'next/link'

// ─── MOCK DATA ──────────────────────────────────────────────

const MOCK_RISK_SUMMARY = [
  { nivel_risco: 'baixo' as RiscoType, total: 28, percentual: 58.3 },
  { nivel_risco: 'moderado' as RiscoType, total: 12, percentual: 25.0 },
  { nivel_risco: 'alto' as RiscoType, total: 5, percentual: 10.4 },
  { nivel_risco: 'severo' as RiscoType, total: 3, percentual: 6.3 },
]

const MOCK_TREND_DATA = [
  { semana: 'Sem 1', phq9: 6.2, gad7: 5.8, maslach: 4.1, pct_risco_elevado: 12 },
  { semana: 'Sem 2', phq9: 6.5, gad7: 5.5, maslach: 4.3, pct_risco_elevado: 14 },
  { semana: 'Sem 3', phq9: 5.8, gad7: 5.2, maslach: 4.0, pct_risco_elevado: 11 },
  { semana: 'Sem 4', phq9: 5.4, gad7: 5.0, maslach: 3.8, pct_risco_elevado: 10 },
  { semana: 'Sem 5', phq9: 5.9, gad7: 5.6, maslach: 4.2, pct_risco_elevado: 13 },
  { semana: 'Sem 6', phq9: 5.1, gad7: 4.8, maslach: 3.6, pct_risco_elevado: 9 },
  { semana: 'Sem 7', phq9: 4.8, gad7: 4.5, maslach: 3.4, pct_risco_elevado: 8 },
  { semana: 'Sem 8', phq9: 4.6, gad7: 4.3, maslach: 3.2, pct_risco_elevado: 7 },
]

const MOCK_ADHERENCE = {
  total_funcionarios: 48,
  responderam: 39,
  taxa_adesao: 81.3,
}

const MOCK_DEPARTMENT_RISK = [
  { departamento: 'Tecnologia', pontuacao_media: 4.2, total: 12 },
  { departamento: 'Comercial', pontuacao_media: 6.8, total: 10 },
  { departamento: 'RH', pontuacao_media: 3.1, total: 6 },
  { departamento: 'Financeiro', pontuacao_media: 5.5, total: 8 },
  { departamento: 'Marketing', pontuacao_media: 4.9, total: 7 },
  { departamento: 'Operações', pontuacao_media: 7.2, total: 5 },
]

const MOCK_RECENT_ALERTS = [
  { id: '1', employee_codigo_anonimo: 'MW-3K8P2N', departamento: 'Comercial', nivel_risco: 'severo' as RiscoType, escala_origem: 'phq9' as EscalaType, pontuacao: 22, status: 'novo' as AlertaStatusType, created_at: '2026-06-22T10:30:00Z' },
  { id: '2', employee_codigo_anonimo: 'MW-7R4T9M', departamento: 'Operações', nivel_risco: 'severo' as RiscoType, escala_origem: 'gad7' as EscalaType, pontuacao: 19, status: 'novo' as AlertaStatusType, created_at: '2026-06-22T09:15:00Z' },
  { id: '3', employee_codigo_anonimo: 'MW-5H2L6J', departamento: 'Tecnologia', nivel_risco: 'alto' as RiscoType, escala_origem: 'maslach' as EscalaType, pontuacao: 16, status: 'visualizado' as AlertaStatusType, created_at: '2026-06-21T16:45:00Z' },
  { id: '4', employee_codigo_anonimo: 'MW-9B6W3Q', departamento: 'Comercial', nivel_risco: 'alto' as RiscoType, escala_origem: 'phq9' as EscalaType, pontuacao: 15, status: 'visualizado' as AlertaStatusType, created_at: '2026-06-21T14:20:00Z' },
  { id: '5', employee_codigo_anonimo: 'MW-1D4X8F', departamento: 'Financeiro', nivel_risco: 'alto' as RiscoType, escala_origem: 'gad7' as EscalaType, pontuacao: 14, status: 'encaminhado' as AlertaStatusType, created_at: '2026-06-20T11:00:00Z' },
  { id: '6', employee_codigo_anonimo: 'MW-2G7Y5A', departamento: 'Marketing', nivel_risco: 'severo' as RiscoType, escala_origem: 'phq9' as EscalaType, pontuacao: 24, status: 'encaminhado' as AlertaStatusType, created_at: '2026-06-20T08:30:00Z' },
]

// ─── RISK CARD ICONS ────────────────────────────────────────

const RISK_ICONS: Record<RiscoType, typeof Shield> = {
  baixo: Shield,
  moderado: AlertTriangle,
  alto: AlertTriangle,
  severo: AlertOctagon,
}

const RISK_CARD_STYLES: Record<RiscoType, string> = {
  baixo: 'border-l-[#81B29A] from-emerald-50/50',
  moderado: 'border-l-[#F2CC8F] from-amber-50/50',
  alto: 'border-l-[#E07A5F] from-orange-50/50',
  severo: 'border-l-[#E63946] from-red-50/50',
}

const STATUS_CONFIG: Record<AlertaStatusType, { icon: typeof Eye; label: string; class: string }> = {
  novo: { icon: Clock, label: 'Novo', class: 'bg-blue-100 text-blue-700' },
  visualizado: { icon: Eye, label: 'Visualizado', class: 'bg-amber-100 text-amber-700' },
  encaminhado: { icon: ArrowUpRight, label: 'Encaminhado', class: 'bg-emerald-100 text-emerald-700' },
}

// ─── CUSTOM TOOLTIP ─────────────────────────────────────────

function TrendTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload) return null
  return (
    <div className="rounded-xl border border-gray-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm">
      <p className="mb-1.5 text-xs font-semibold text-gray-500">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          <span className="font-medium">{entry.name}:</span> {entry.value.toFixed(1)}
        </p>
      ))}
    </div>
  )
}

function DeptTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload) return null
  return (
    <div className="rounded-xl border border-gray-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className="text-sm font-bold text-[#0F4C5C]">
        Pontuação média: {payload[0]?.value.toFixed(1)}
      </p>
    </div>
  )
}

// ─── ADHERENCE RING ─────────────────────────────────────────

function AdherenceRing({ percentage }: { percentage: number }) {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const color = percentage > 70 ? '#81B29A' : percentage > 40 ? '#F2CC8F' : '#E63946'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="10"
        />
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-gray-900">{percentage.toFixed(0)}%</span>
        <span className="text-[10px] font-medium text-gray-400">adesão</span>
      </div>
    </div>
  )
}

// ─── MAIN DASHBOARD PAGE ────────────────────────────────────

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalEmployees = MOCK_RISK_SUMMARY.reduce((acc, r) => acc + r.total, 0)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-outfit text-2xl font-bold text-gray-900">
            Visão Geral
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitoramento de saúde mental • {totalEmployees} colaboradores
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm shadow-sm">
          <Activity className="h-4 w-4 text-[#6ECEDA]" />
          <span className="text-gray-500">Último ciclo:</span>
          <span className="font-semibold text-gray-700">Jun 2026</span>
        </div>
      </div>

      {/* ─── ROW 1: Risk Summary Cards ─────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_RISK_SUMMARY.map((item, index) => {
          const Icon = RISK_ICONS[item.nivel_risco]
          const color = RISK_COLORS[item.nivel_risco]
          return (
            <div
              key={item.nivel_risco}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/60 border-l-4 bg-gradient-to-br to-white p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                RISK_CARD_STYLES[item.nivel_risco],
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background decoration */}
              <div
                className="absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150"
                style={{ backgroundColor: color }}
              />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-gray-900">
                    {item.percentual.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-sm font-semibold" style={{ color }}>
                    {RISK_LABELS[item.nivel_risco]}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {item.total} colaboradores
                  </p>
                </div>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── ROW 2: Trend Chart + Adherence ────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trend Chart */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-outfit text-base font-bold text-gray-900">
                  Evolução do Risco ao Longo do Tempo
                </h3>
                <p className="mt-0.5 text-xs text-gray-400">
                  Pontuação média por escala nas últimas 8 semanas
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">
                  Tendência positiva
                </span>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TREND_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradPHQ9" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0F4C5C" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0F4C5C" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradGAD7" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6ECEDA" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6ECEDA" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradMaslach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5B8A72" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#5B8A72" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="semana"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 10]}
                  />
                  <Tooltip content={<TrendTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="phq9"
                    name="PHQ-9 (Depressão)"
                    stroke="#0F4C5C"
                    fill="url(#gradPHQ9)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#0F4C5C', strokeWidth: 0 }}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="gad7"
                    name="GAD-7 (Ansiedade)"
                    stroke="#6ECEDA"
                    fill="url(#gradGAD7)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#6ECEDA', strokeWidth: 0 }}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="maslach"
                    name="Burnout (Maslach)"
                    stroke="#5B8A72"
                    fill="url(#gradMaslach)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#5B8A72', strokeWidth: 0 }}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Adherence Card */}
        <div className="lg:col-span-1">
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <h3 className="mb-1 font-outfit text-base font-bold text-gray-900">
              Taxa de Adesão
            </h3>
            <p className="mb-6 text-center text-xs text-gray-400">
              Ciclo atual de check-in
            </p>

            <AdherenceRing percentage={MOCK_ADHERENCE.taxa_adesao} />

            <p className="mt-6 text-center text-sm text-gray-500">
              <span className="font-bold text-gray-900">{MOCK_ADHERENCE.responderam}</span>
              {' '}de{' '}
              <span className="font-bold text-gray-900">{MOCK_ADHERENCE.total_funcionarios}</span>
              {' '}funcionários
            </p>
            <p className="mt-1 text-xs text-gray-400">responderam neste ciclo</p>

            <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5">
              <Users className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                +5% vs. ciclo anterior
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ROW 3: Department + Recent Alerts ─────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Department Risk Chart */}
        <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h3 className="mb-1 font-outfit text-base font-bold text-gray-900">
            Risco por Departamento
          </h3>
          <p className="mb-6 text-xs text-gray-400">
            Pontuação média de risco por área
          </p>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_DEPARTMENT_RISK.sort((a, b) => b.pontuacao_media - a.pontuacao_media)}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 10]}
                />
                <YAxis
                  type="category"
                  dataKey="departamento"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  width={85}
                />
                <Tooltip content={<DeptTooltip />} />
                <Bar
                  dataKey="pontuacao_media"
                  radius={[0, 8, 8, 0]}
                  maxBarSize={28}
                >
                  {MOCK_DEPARTMENT_RISK.sort((a, b) => b.pontuacao_media - a.pontuacao_media).map((entry, i) => {
                    const color =
                      entry.pontuacao_media >= 7 ? RISK_COLORS.severo :
                      entry.pontuacao_media >= 5 ? RISK_COLORS.alto :
                      entry.pontuacao_media >= 3 ? RISK_COLORS.moderado :
                      RISK_COLORS.baixo
                    return (
                      <rect key={i} fill={color} />
                    )
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-outfit text-base font-bold text-gray-900">
                Alertas Recentes
              </h3>
              <p className="mt-0.5 text-xs text-gray-400">
                Últimos alertas de risco elevado
              </p>
            </div>
            <Link
              href="/alertas"
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#0F4C5C] transition-colors hover:bg-[#0F4C5C]/5"
            >
              Ver todos
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_RECENT_ALERTS.map((alert) => {
              const StatusIcon = STATUS_CONFIG[alert.status].icon
              return (
                <div
                  key={alert.id}
                  className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-all duration-200 hover:border-gray-200 hover:shadow-sm"
                >
                  {/* Risk indicator dot */}
                  <div
                    className="h-10 w-1 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: RISK_COLORS[alert.nivel_risco] }}
                  />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">
                        {alert.employee_codigo_anonimo}
                      </span>
                      <span className={cn(
                        'rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                        RISK_BG_CLASSES[alert.nivel_risco]
                      )}>
                        {RISK_LABELS[alert.nivel_risco]}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">
                      <span>{alert.departamento}</span>
                      <span>•</span>
                      <span>{SCALE_LABELS[alert.escala_origem]}</span>
                      <span>•</span>
                      <span>Pontuação: {alert.pontuacao}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className={cn(
                    'flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold',
                    STATUS_CONFIG[alert.status].class
                  )}>
                    <StatusIcon className="h-3 w-3" />
                    {STATUS_CONFIG[alert.status].label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
