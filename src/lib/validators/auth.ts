import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const cadastroEmpresaSchema = z.object({
  nome_empresa: z.string().min(2, 'Nome da empresa é obrigatório'),
  cnpj: z.string().min(14, 'CNPJ inválido').max(18, 'CNPJ inválido').optional(),
  nome_admin: z.string().min(2, 'Seu nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  cargo: z.string().optional(),
})

export const cadastroFuncionarioSchema = z.object({
  codigo_convite: z.string().length(6, 'O código de convite deve ter 6 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  departamento: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type CadastroEmpresaFormData = z.infer<typeof cadastroEmpresaSchema>
export type CadastroFuncionarioFormData = z.infer<typeof cadastroFuncionarioSchema>
