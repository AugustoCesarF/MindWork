import { RiscoType } from '@/types/database'
import { ScaleItem, ScaleResult } from './phq9'

// GAD-7 — Generalized Anxiety Disorder Scale (Rastreio de Ansiedade)
// Validado em português: Spitzer, Kroenke, Williams & Löwe (2006)
export const GAD7_ITEMS: ScaleItem[] = [
  {
    id: 1,
    question: 'Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 2,
    question: 'Não ser capaz de impedir ou de controlar as preocupações',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 3,
    question: 'Preocupar-se muito com diversas coisas',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 4,
    question: 'Dificuldade para relaxar',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 5,
    question: 'Ficar tão agitado(a) que é difícil ficar parado(a)',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 6,
    question: 'Ficar facilmente aborrecido(a) ou irritado(a)',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 7,
    question: 'Sentir medo como se algo horrível pudesse acontecer',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
]

export function calculateGAD7(respostas: number[]): ScaleResult {
  const pontuacao = respostas.reduce((sum, val) => sum + val, 0)

  let nivel_risco: RiscoType
  let descricao: string
  let orientacao: string

  if (pontuacao <= 4) {
    nivel_risco = 'baixo'
    descricao = 'Ansiedade mínima'
    orientacao = 'Seus níveis de ansiedade estão dentro do esperado. Continue praticando autocuidado!'
  } else if (pontuacao <= 9) {
    nivel_risco = 'moderado'
    descricao = 'Ansiedade leve'
    orientacao = 'Você pode estar passando por um momento de mais ansiedade. Técnicas de respiração e mindfulness podem ajudar.'
  } else if (pontuacao <= 14) {
    nivel_risco = 'alto'
    descricao = 'Ansiedade moderada'
    orientacao = 'Seus níveis de ansiedade merecem atenção. Considere conversar com um profissional de saúde mental.'
  } else {
    nivel_risco = 'severo'
    descricao = 'Ansiedade grave'
    orientacao = 'É importante buscar apoio profissional. A ansiedade em níveis altos pode ser tratada com eficácia.'
  }

  return { pontuacao, nivel_risco, descricao, orientacao }
}

export const GAD7_SCALE_INFO = {
  nome: 'GAD-7',
  descricao: 'Escala de Transtorno de Ansiedade Generalizada',
  subtitulo: 'Avaliação do nível de ansiedade',
  instrucao: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) pelos seguintes problemas?',
  totalItens: 7,
  pontuacaoMaxima: 21,
}
