import { RiscoType, EscalaType } from '@/types/database'

export const RISK_COLORS: Record<RiscoType, string> = {
  baixo: '#81B29A',
  moderado: '#F2CC8F',
  alto: '#E07A5F',
  severo: '#E63946',
}

export const RISK_LABELS: Record<RiscoType, string> = {
  baixo: 'Baixo',
  moderado: 'Moderado',
  alto: 'Alto',
  severo: 'Severo',
}

export const RISK_BG_CLASSES: Record<RiscoType, string> = {
  baixo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  moderado: 'bg-amber-50 text-amber-700 border-amber-200',
  alto: 'bg-orange-50 text-orange-700 border-orange-200',
  severo: 'bg-red-50 text-red-700 border-red-200',
}

export const SCALE_LABELS: Record<EscalaType, string> = {
  phq9: 'PHQ-9 (Depressão)',
  gad7: 'GAD-7 (Ansiedade)',
  maslach: 'Burnout (Maslach)',
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export function generateAnonymousCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}
