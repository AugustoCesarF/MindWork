'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Brain,
  Heart,
  Flame,
  Calendar,
  ClipboardList,
  ChevronRight,
  Inbox,
} from 'lucide-react'
import Link from 'next/link'

import type { EscalaType, RiscoType, Checkin } from '@/types/database'

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const SCALE_META: Record<
  EscalaType,
  { nome: string; icon: React.ElementType; color: string; bgGradient: string }
> = {
  phq9: {
    nome: 'PHQ-9',
    icon: Brain,
    color: 'text-violet-600',
    bgGradient: 'from-violet-50 to-purple-50',
  },
  gad7: {
    nome: 'GAD-7',
    icon: Heart,
    color: 'text-rose-500',
    bgGradient: 'from-rose-50 to-pink-50',
  },
  maslach: {
    nome: 'Burnout',
    icon: Flame,
    color: 'text-amber-500',
    bgGradient: 'from-amber-50 to-orange-50',
  },
}

const RISK_STYLES: Record<
  RiscoType,
  { bg: string; text: string; border: string; dot: string; label: string }
> = {
  baixo: {
    bg: 'bg-[#81B29A]/10',
    text: 'text-[#81B29A]',
    border: 'border-[#81B29A]/30',
    dot: 'bg-[#81B29A]',
    label: 'Baixo',
  },
  moderado: {
    bg: 'bg-[#F2CC8F]/10',
    text: 'text-[#d4a843]',
    border: 'border-[#F2CC8F]/40',
    dot: 'bg-[#F2CC8F]',
    label: 'Moderado',
  },
  alto: {
    bg: 'bg-[#E07A5F]/10',
    text: 'text-[#E07A5F]',
    border: 'border-[#E07A5F]/30',
    dot: 'bg-[#E07A5F]',
    label: 'Alto',
  },
  severo: {
    bg: 'bg-[#E63946]/10',
    text: 'text-[#E63946]',
    border: 'border-[#E63946]/30',
    dot: 'bg-[#E63946]',
    label: 'Severo',
  },
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function HistoricoPage() {
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCheckins() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          const { data } = await supabase
            .from('checkins')
            .select('*')
            .eq('employee_id', user.id)
            .order('created_at', { ascending: false })

          if (data) {
            setCheckins(data as Checkin[])
          }
        }
      } catch (err) {
        console.error('Erro ao buscar histórico:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCheckins()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-800">
          Meu Histórico de Check-ins
        </h1>
        <p className="text-sm text-slate-500">
          Acompanhe suas avaliações anteriores
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/60 p-5 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-slate-100 rounded" />
                  <div className="h-3 w-36 bg-slate-100 rounded" />
                </div>
                <div className="h-6 w-16 bg-slate-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && checkins.length === 0 && (
        <div className="text-center py-16 space-y-5">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-slate-50 border border-slate-100">
            <Inbox className="h-10 w-10 text-slate-300" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-semibold text-slate-600">
              Nenhum check-in encontrado
            </h2>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              Você ainda não realizou nenhum check-in. Que tal começar agora?
            </p>
          </div>
          <Link
            href="/checkin"
            className="
              inline-flex items-center gap-2 px-5 py-3 rounded-xl
              bg-gradient-to-r from-[#0F4C5C] to-[#5B8A72]
              text-white font-semibold text-sm
              shadow-lg shadow-[#0F4C5C]/20
              hover:shadow-xl active:scale-[0.98]
              transition-all duration-200
            "
          >
            <ClipboardList className="h-4 w-4" />
            Fazer meu primeiro check-in
          </Link>
        </div>
      )}

      {/* Check-in list */}
      {!loading && checkins.length > 0 && (
        <div className="space-y-3">
          {checkins.map((checkin) => {
            const scaleMeta = SCALE_META[checkin.tipo_escala]
            const risk = RISK_STYLES[checkin.nivel_risco]
            const Icon = scaleMeta.icon

            return (
              <div
                key={checkin.id}
                className={`
                  bg-white rounded-2xl border border-slate-200/60
                  shadow-sm hover:shadow-md
                  transition-all duration-200
                  p-4 sm:p-5
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Scale icon */}
                  <div
                    className={`
                      flex-shrink-0 flex items-center justify-center
                      h-12 w-12 rounded-xl
                      bg-gradient-to-br ${scaleMeta.bgGradient}
                    `}
                  >
                    <Icon className={`h-6 w-6 ${scaleMeta.color}`} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800 text-sm">
                        {scaleMeta.nome}
                      </h3>
                      <span className="text-sm text-slate-400 font-medium">
                        {checkin.pontuacao_total} pts
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs text-slate-400">
                        {formatDate(checkin.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Risk badge */}
                  <div
                    className={`
                      flex-shrink-0 inline-flex items-center gap-1.5
                      px-2.5 py-1 rounded-full
                      ${risk.bg} ${risk.border} border
                    `}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full ${risk.dot}`} />
                    <span className={`text-xs font-medium ${risk.text}`}>
                      {risk.label}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Back to checkin link */}
      {!loading && checkins.length > 0 && (
        <div className="text-center pt-2">
          <Link
            href="/checkin"
            className="
              inline-flex items-center gap-1.5 text-sm font-medium
              text-[#0F4C5C] hover:text-[#5B8A72]
              transition-colors
            "
          >
            Fazer novo check-in
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
