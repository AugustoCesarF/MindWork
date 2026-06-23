'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Building2, Users, FileCheck, TrendingUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Mock data
const MOCK_ORGS = [
  { id: '1', nome: 'TechNova Soluções', cnpj: '12.345.678/0001-90', plano: 'pro', funcionarios: 30, checkins: 63, adesao: 73.2, created_at: '2024-03-15T10:00:00Z' },
  { id: '2', nome: 'Construtora Horizonte', cnpj: '98.765.432/0001-10', plano: 'starter', funcionarios: 20, checkins: 21, adesao: 55.0, created_at: '2024-04-20T14:30:00Z' },
  { id: '3', nome: 'Clínica Bem Viver', cnpj: '55.555.555/0001-55', plano: 'enterprise', funcionarios: 15, checkins: 19, adesao: 66.7, created_at: '2024-05-05T09:15:00Z' },
]

export default function SuperAdminPage() {
  const stats = {
    orgs: 3,
    funcionarios: 65,
    checkins: 103,
    adesao_media: '65.0%',
  }

  return (
    <div className="space-y-6 slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-outfit text-2xl font-bold tracking-tight text-slate-800">
            Visão Geral do Sistema
          </h2>
          <p className="text-slate-500">
            Métricas globais da plataforma MindWork.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Organizações</p>
                <p className="font-outfit text-3xl font-bold text-slate-800">{stats.orgs}</p>
              </div>
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Funcionários</p>
                <p className="font-outfit text-3xl font-bold text-slate-800">{stats.funcionarios}</p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Check-ins</p>
                <p className="font-outfit text-3xl font-bold text-slate-800">{stats.checkins}</p>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                <FileCheck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Adesão Média</p>
                <p className="font-outfit text-3xl font-bold text-slate-800">{stats.adesao_media}</p>
              </div>
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="border-b border-slate-100 p-6">
          <h3 className="font-outfit text-lg font-semibold text-slate-800">Organizações Cadastradas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Empresa</th>
                <th className="px-6 py-4 font-medium">Plano</th>
                <th className="px-6 py-4 font-medium text-center">Usuários</th>
                <th className="px-6 py-4 font-medium text-center">Check-ins</th>
                <th className="px-6 py-4 font-medium text-center">Adesão</th>
                <th className="px-6 py-4 font-medium">Cadastro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ORGS.map((org) => {
                let badgeColor = 'bg-slate-100 text-slate-700'
                if (org.plano === 'pro') badgeColor = 'bg-blue-100 text-blue-700'
                if (org.plano === 'enterprise') badgeColor = 'bg-purple-100 text-purple-700'

                return (
                  <tr key={org.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{org.nome}</p>
                      <p className="text-xs text-slate-500">{org.cnpj}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${badgeColor}`}>
                        {org.plano}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-slate-900">{org.funcionarios}</td>
                    <td className="px-6 py-4 text-center font-medium text-slate-900">{org.checkins}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
                          <div 
                            className="h-full rounded-full bg-emerald-500" 
                            style={{ width: `${org.adesao}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{org.adesao}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {formatDate(org.created_at)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
