import { z } from 'zod'

export const checkinResponseSchema = z.object({
  tipo_escala: z.enum(['phq9', 'gad7', 'maslach']),
  respostas: z.array(z.number().min(0).max(4)),
})

export type CheckinResponseData = z.infer<typeof checkinResponseSchema>
