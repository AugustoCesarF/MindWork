import { RiscoType } from '@/types/database'
import { ScaleItem, ScaleResult } from './phq9'

// Maslach Burnout Inventory — Versão Reduzida para Ambiente Ocupacional
// Adaptação com 9 itens (3 por dimensão)
// Dimensões: Exaustão Emocional (EE), Despersonalização (DP), Realização Profissional (RP)
export const MASLACH_ITEMS: ScaleItem[] = [
  // Exaustão Emocional (EE) — itens 1-3
  {
    id: 1,
    question: 'Sinto-me emocionalmente esgotado(a) pelo meu trabalho',
    options: [
      { value: 0, label: 'Nunca' },
      { value: 1, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 3, label: 'Frequentemente' },
      { value: 4, label: 'Sempre' },
    ],
  },
  {
    id: 2,
    question: 'Sinto-me exausto(a) no final de um dia de trabalho',
    options: [
      { value: 0, label: 'Nunca' },
      { value: 1, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 3, label: 'Frequentemente' },
      { value: 4, label: 'Sempre' },
    ],
  },
  {
    id: 3,
    question: 'Sinto-me cansado(a) quando me levanto de manhã e tenho que enfrentar outro dia de trabalho',
    options: [
      { value: 0, label: 'Nunca' },
      { value: 1, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 3, label: 'Frequentemente' },
      { value: 4, label: 'Sempre' },
    ],
  },
  // Despersonalização (DP) — itens 4-6
  {
    id: 4,
    question: 'Sinto que trato algumas pessoas do trabalho como se fossem objetos impessoais',
    options: [
      { value: 0, label: 'Nunca' },
      { value: 1, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 3, label: 'Frequentemente' },
      { value: 4, label: 'Sempre' },
    ],
  },
  {
    id: 5,
    question: 'Sinto que me tornei mais insensível com as pessoas desde que comecei este trabalho',
    options: [
      { value: 0, label: 'Nunca' },
      { value: 1, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 3, label: 'Frequentemente' },
      { value: 4, label: 'Sempre' },
    ],
  },
  {
    id: 6,
    question: 'Preocupa-me que este trabalho esteja me endurecendo emocionalmente',
    options: [
      { value: 0, label: 'Nunca' },
      { value: 1, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 3, label: 'Frequentemente' },
      { value: 4, label: 'Sempre' },
    ],
  },
  // Realização Profissional (RP) — itens 7-9 (escala invertida)
  {
    id: 7,
    question: 'Lido de forma eficaz com os problemas das pessoas no meu trabalho',
    options: [
      { value: 4, label: 'Nunca' },
      { value: 3, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 1, label: 'Frequentemente' },
      { value: 0, label: 'Sempre' },
    ],
  },
  {
    id: 8,
    question: 'Sinto que estou influenciando positivamente a vida das pessoas por meio do meu trabalho',
    options: [
      { value: 4, label: 'Nunca' },
      { value: 3, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 1, label: 'Frequentemente' },
      { value: 0, label: 'Sempre' },
    ],
  },
  {
    id: 9,
    question: 'Sinto-me cheio(a) de energia e entusiasmo no meu trabalho',
    options: [
      { value: 4, label: 'Nunca' },
      { value: 3, label: 'Raramente' },
      { value: 2, label: 'Às vezes' },
      { value: 1, label: 'Frequentemente' },
      { value: 0, label: 'Sempre' },
    ],
  },
]

export function calculateMaslach(respostas: number[]): ScaleResult {
  const pontuacao = respostas.reduce((sum, val) => sum + val, 0)
  // Max score: 9 items × 4 = 36

  let nivel_risco: RiscoType
  let descricao: string
  let orientacao: string

  if (pontuacao <= 9) {
    nivel_risco = 'baixo'
    descricao = 'Baixo risco de burnout'
    orientacao = 'Você está lidando bem com as demandas do trabalho. Continue mantendo um equilíbrio saudável!'
  } else if (pontuacao <= 18) {
    nivel_risco = 'moderado'
    descricao = 'Risco moderado de burnout'
    orientacao = 'Alguns sinais de desgaste profissional estão presentes. Considere avaliar sua carga de trabalho e buscar momentos de descanso.'
  } else if (pontuacao <= 27) {
    nivel_risco = 'alto'
    descricao = 'Risco elevado de burnout'
    orientacao = 'Sinais significativos de esgotamento profissional. É importante conversar com alguém sobre como você está se sentindo.'
  } else {
    nivel_risco = 'severo'
    descricao = 'Risco muito elevado de burnout'
    orientacao = 'Você pode estar vivenciando burnout. Buscar apoio profissional é fundamental para sua recuperação e bem-estar.'
  }

  return { pontuacao, nivel_risco, descricao, orientacao }
}

export const MASLACH_SCALE_INFO = {
  nome: 'Burnout',
  descricao: 'Inventário de Burnout (Maslach adaptado)',
  subtitulo: 'Avaliação de esgotamento profissional',
  instrucao: 'Indique com que frequência você vivencia cada uma das situações a seguir em relação ao seu trabalho:',
  totalItens: 9,
  pontuacaoMaxima: 36,
}
