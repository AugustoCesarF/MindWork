import { RiscoType } from '@/types/database'

export interface ScaleItem {
  id: number
  question: string
  options: { value: number; label: string }[]
}

export interface ScaleResult {
  pontuacao: number
  nivel_risco: RiscoType
  descricao: string
  orientacao: string
}

// PHQ-9 — Patient Health Questionnaire (Rastreio de Depressão)
// Validado em português: Kroenke, Spitzer & Williams (2001)
export const PHQ9_ITEMS: ScaleItem[] = [
  {
    id: 1,
    question: 'Pouco interesse ou prazer em fazer as coisas',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 2,
    question: 'Sentir-se "para baixo", deprimido(a) ou sem esperança',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 3,
    question: 'Dificuldade para pegar no sono ou manter o sono, ou dormir mais do que de costume',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 4,
    question: 'Sentir-se cansado(a) ou com pouca energia',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 5,
    question: 'Falta de apetite ou comer demais',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 6,
    question: 'Sentir-se mal consigo mesmo(a) — ou achar que você é um fracasso ou que decepcionou sua família ou a si mesmo(a)',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 7,
    question: 'Dificuldade para se concentrar nas coisas, como ler o jornal ou ver televisão',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 8,
    question: 'Mover-se ou falar tão devagar que as outras pessoas poderiam ter notado? Ou o contrário — Loss inquieto(a) ou agitado(a) a ponto de se mexer muito mais do que de costume',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
  {
    id: 9,
    question: 'Pensar que seria melhor estar morto(a) ou se machucar de alguma maneira',
    options: [
      { value: 0, label: 'Nenhuma vez' },
      { value: 1, label: 'Vários dias' },
      { value: 2, label: 'Mais da metade dos dias' },
      { value: 3, label: 'Quase todos os dias' },
    ],
  },
]

export function calculatePHQ9(respostas: number[]): ScaleResult {
  const pontuacao = respostas.reduce((sum, val) => sum + val, 0)

  let nivel_risco: RiscoType
  let descricao: string
  let orientacao: string

  if (pontuacao <= 4) {
    nivel_risco = 'baixo'
    descricao = 'Sem sinais significativos de depressão'
    orientacao = 'Continue cuidando do seu bem-estar! Mantenha hábitos saudáveis de sono, alimentação e atividade física.'
  } else if (pontuacao <= 9) {
    nivel_risco = 'baixo'
    descricao = 'Sintomas leves de depressão'
    orientacao = 'Sintomas leves são comuns em períodos de estresse. Procure atividades que te façam bem e mantenha sua rede de apoio.'
  } else if (pontuacao <= 14) {
    nivel_risco = 'moderado'
    descricao = 'Sintomas moderados de depressão'
    orientacao = 'Pode ser útil conversar com um profissional de saúde mental. Cuidar da sua saúde emocional é um sinal de força.'
  } else if (pontuacao <= 19) {
    nivel_risco = 'alto'
    descricao = 'Sintomas moderadamente graves de depressão'
    orientacao = 'Recomendamos que você busque apoio profissional. Estamos aqui para te ajudar a encontrar esse suporte.'
  } else {
    nivel_risco = 'severo'
    descricao = 'Sintomas graves de depressão'
    orientacao = 'É importante buscar ajuda profissional. Você não precisa passar por isso sozinho(a). Considere falar com um psicólogo.'
  }

  return { pontuacao, nivel_risco, descricao, orientacao }
}

export const PHQ9_SCALE_INFO = {
  nome: 'PHQ-9',
  descricao: 'Questionário sobre Saúde do Paciente',
  subtitulo: 'Avaliação de humor e bem-estar emocional',
  instrucao: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por qualquer um dos problemas a seguir?',
  totalItens: 9,
  pontuacaoMaxima: 27,
}
