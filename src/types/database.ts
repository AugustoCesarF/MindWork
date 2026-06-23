export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type PlanoType = 'starter' | 'pro' | 'enterprise'
export type CicloType = 'semanal' | 'quinzenal' | 'mensal'
export type RoleType = 'super_admin' | 'admin_rh' | 'funcionario' | 'psicologo'
export type EscalaType = 'phq9' | 'gad7' | 'maslach'
export type RiscoType = 'baixo' | 'moderado' | 'alto' | 'severo'
export type AlertaStatusType = 'novo' | 'visualizado' | 'encaminhado'
export type ReferralStatusType = 'pendente' | 'contatado' | 'concluido'

export interface Organization {
  id: string
  nome: string
  cnpj: string | null
  plano: PlanoType
  codigo_convite: string
  ciclo_checkin: CicloType
  logo_url: string | null
  created_at: string
}

export interface Profile {
  id: string
  org_id: string | null
  role: RoleType
  nome: string
  email: string | null
  cargo: string | null
  departamento: string | null
  codigo_anonimo: string
  avatar_url: string | null
  created_at: string
}

export interface Checkin {
  id: string
  employee_id: string
  org_id: string
  tipo_escala: EscalaType
  respostas: Json
  pontuacao_total: number
  nivel_risco: RiscoType
  created_at: string
}

export interface RiskAlert {
  id: string
  org_id: string
  employee_codigo_anonimo: string
  departamento: string | null
  nivel_risco: RiscoType
  escala_origem: EscalaType
  pontuacao: number
  status: AlertaStatusType
  created_at: string
}

export interface PsychologistReferral {
  id: string
  employee_codigo_anonimo: string
  org_id: string
  status: ReferralStatusType
  observacoes: string | null
  created_at: string
  updated_at: string
}

// View types
export interface RiskSummary {
  org_id: string
  nivel_risco: RiscoType
  total: number
  percentual: number
}

export interface DepartmentRisk {
  org_id: string
  departamento: string
  nivel_risco: RiscoType
  total: number
  pontuacao_media: number
}

export interface TrendData {
  org_id: string
  semana: string
  tipo_escala: EscalaType
  pontuacao_media: number
  total_respostas: number
  pct_risco_elevado: number
}

export interface AdherenceRate {
  org_id: string
  org_nome: string
  total_funcionarios: number
  responderam: number
  taxa_adesao: number
}
