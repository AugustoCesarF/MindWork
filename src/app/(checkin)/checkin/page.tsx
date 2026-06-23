'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Brain,
  Heart,
  Flame,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ClipboardList,
} from 'lucide-react'

import AnonymityBanner from '@/components/checkin/AnonymityBanner'
import { PHQ9_ITEMS, calculatePHQ9, PHQ9_SCALE_INFO } from '@/lib/scales/phq9'
import { GAD7_ITEMS, calculateGAD7, GAD7_SCALE_INFO } from '@/lib/scales/gad7'
import { MASLACH_ITEMS, calculateMaslach, MASLACH_SCALE_INFO } from '@/lib/scales/maslach'
import { createClient } from '@/lib/supabase/client'

import type { ScaleItem, ScaleResult } from '@/lib/scales/phq9'
import type { EscalaType, RiscoType } from '@/types/database'

/* ------------------------------------------------------------------ */
/* Types & Constants                                                   */
/* ------------------------------------------------------------------ */

interface ScaleConfig {
  key: EscalaType
  info: typeof PHQ9_SCALE_INFO
  items: ScaleItem[]
  calculate: (respostas: number[]) => ScaleResult
  icon: React.ElementType
  color: string
  bgGradient: string
  estimatedMinutes: number
}

const SCALES: ScaleConfig[] = [
  {
    key: 'phq9',
    info: PHQ9_SCALE_INFO,
    items: PHQ9_ITEMS,
    calculate: calculatePHQ9,
    icon: Brain,
    color: 'text-violet-600',
    bgGradient: 'from-violet-50 to-purple-50',
    estimatedMinutes: 2,
  },
  {
    key: 'gad7',
    info: GAD7_SCALE_INFO,
    items: GAD7_ITEMS,
    calculate: calculateGAD7,
    icon: Heart,
    color: 'text-rose-500',
    bgGradient: 'from-rose-50 to-pink-50',
    estimatedMinutes: 2,
  },
  {
    key: 'maslach',
    info: MASLACH_SCALE_INFO,
    items: MASLACH_ITEMS,
    calculate: calculateMaslach,
    icon: Flame,
    color: 'text-amber-500',
    bgGradient: 'from-amber-50 to-orange-50',
    estimatedMinutes: 2,
  },
]

const RISK_STYLES: Record<RiscoType, { bg: string; text: string; border: string; dot: string; label: string }> = {
  baixo:    { bg: 'bg-[#81B29A]/10', text: 'text-[#81B29A]', border: 'border-[#81B29A]/30', dot: 'bg-[#81B29A]', label: 'Baixo' },
  moderado: { bg: 'bg-[#F2CC8F]/10', text: 'text-[#d4a843]', border: 'border-[#F2CC8F]/40', dot: 'bg-[#F2CC8F]', label: 'Moderado' },
  alto:     { bg: 'bg-[#E07A5F]/10', text: 'text-[#E07A5F]', border: 'border-[#E07A5F]/30', dot: 'bg-[#E07A5F]', label: 'Alto' },
  severo:   { bg: 'bg-[#E63946]/10', text: 'text-[#E63946]', border: 'border-[#E63946]/30', dot: 'bg-[#E63946]', label: 'Severo' },
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function CheckinPage() {
  // Wizard state
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0)

  // Scale selection
  const [selectedScaleKeys, setSelectedScaleKeys] = useState<EscalaType[]>([])
  const [currentScaleIdx, setCurrentScaleIdx] = useState(0)

  // Questions state
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left')
  const [isAnimating, setIsAnimating] = useState(false)

  // Results state
  const [completedResults, setCompletedResults] = useState<
    { key: EscalaType; result: ScaleResult }[]
  >([])
  const [currentResult, setCurrentResult] = useState<ScaleResult | null>(null)

  // Loading / submitting
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Derived
  const currentScale = SCALES.find((s) => s.key === selectedScaleKeys[currentScaleIdx])
  const totalQuestions = currentScale?.items.length ?? 0

  /* ---------------------------------------------------------------- */
  /* Handlers                                                          */
  /* ---------------------------------------------------------------- */


  // Start scale needs to run AFTER selectedScaleKeys is set,
  // so we use a useEffect to transition
  const [shouldStart, setShouldStart] = useState(false)

  const handleSelectSingle = (key: EscalaType) => {
    setSelectedScaleKeys([key])
    setShouldStart(true)
  }

  const handleSelectAll = () => {
    setSelectedScaleKeys(SCALES.map((s) => s.key))
    setShouldStart(true)
  }

  useEffect(() => {
    if (shouldStart) {
      setCurrentQ(0)
      setAnswers([])
      setSelectedOption(null)
      setStep(1)
      setShouldStart(false)
    }
  }, [shouldStart])

  const handleOptionSelect = useCallback(
    (value: number) => {
      if (isAnimating) return
      setSelectedOption(value)

      // Auto-advance after 300ms
      setTimeout(() => {
        const newAnswers = [...answers]
        newAnswers[currentQ] = value

        if (currentQ < totalQuestions - 1) {
          setSlideDir('left')
          setIsAnimating(true)
          setTimeout(() => {
            setAnswers(newAnswers)
            setCurrentQ(currentQ + 1)
            setSelectedOption(newAnswers[currentQ + 1] ?? null)
            setIsAnimating(false)
          }, 200)
        } else {
          // Last question — calculate result
          setAnswers(newAnswers)
          finishCurrentScale(newAnswers)
        }
      }, 300)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQ, answers, totalQuestions, isAnimating]
  )

  const goBack = () => {
    if (currentQ > 0) {
      setSlideDir('right')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQ(currentQ - 1)
        setSelectedOption(answers[currentQ - 1] ?? null)
        setIsAnimating(false)
      }, 200)
    } else {
      setStep(0)
    }
  }

  const finishCurrentScale = async (finalAnswers: number[]) => {
    if (!currentScale) return

    const result = currentScale.calculate(finalAnswers)
    setCurrentResult(result)

    // Submit to Supabase
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Get profile to find org_id
        const { data: profile } = await supabase
          .from('profiles')
          .select('org_id, codigo_anonimo, departamento')
          .eq('id', user.id)
          .single()

        if (profile?.org_id) {
          // Insert check-in
          await supabase.from('checkins').insert({
            employee_id: user.id,
            org_id: profile.org_id,
            tipo_escala: currentScale.key,
            respostas: finalAnswers,
            pontuacao_total: result.pontuacao,
            nivel_risco: result.nivel_risco,
          })

          // Create risk alert if alto or severo
          if (result.nivel_risco === 'alto' || result.nivel_risco === 'severo') {
            await supabase.from('risk_alerts').insert({
              org_id: profile.org_id,
              employee_codigo_anonimo: profile.codigo_anonimo,
              departamento: profile.departamento,
              nivel_risco: result.nivel_risco,
              escala_origem: currentScale.key,
              pontuacao: result.pontuacao,
              status: 'novo',
            })
          }
        }
      }
    } catch (err) {
      console.error('Erro ao salvar check-in:', err)
    } finally {
      setIsSubmitting(false)
    }

    setCompletedResults((prev) => [
      ...prev,
      { key: currentScale.key, result },
    ])
    setStep(2)
  }

  const handlePsychologistReferral = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('org_id, codigo_anonimo')
          .eq('id', user.id)
          .single()

        if (profile?.org_id) {
          await supabase.from('psychologist_referrals').insert({
            employee_codigo_anonimo: profile.codigo_anonimo,
            org_id: profile.org_id,
            status: 'pendente',
          })
        }
      }
    } catch (err) {
      console.error('Erro ao criar encaminhamento:', err)
    }

    advanceAfterResult()
  }

  const advanceAfterResult = () => {
    const nextIdx = currentScaleIdx + 1
    if (nextIdx < selectedScaleKeys.length) {
      setCurrentScaleIdx(nextIdx)
      setCurrentQ(0)
      setAnswers([])
      setSelectedOption(null)
      setCurrentResult(null)
      setStep(1)
    } else {
      setStep(3)
    }
  }

  const resetWizard = () => {
    setStep(0)
    setSelectedScaleKeys([])
    setCurrentScaleIdx(0)
    setCurrentQ(0)
    setAnswers([])
    setSelectedOption(null)
    setCompletedResults([])
    setCurrentResult(null)
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-[60vh]">
      {/* Step 0: Welcome */}
      {step === 0 && <WelcomeStep onSelectScale={handleSelectSingle} onSelectAll={handleSelectAll} />}

      {/* Step 1: Questions */}
      {step === 1 && currentScale && (
        <QuestionStep
          scale={currentScale}
          currentQ={currentQ}
          totalQuestions={totalQuestions}
          selectedOption={selectedOption}
          slideDir={slideDir}
          isAnimating={isAnimating}
          onSelect={handleOptionSelect}
          onBack={goBack}
        />
      )}

      {/* Step 2: Results */}
      {step === 2 && currentResult && currentScale && (
        <ResultStep
          result={currentResult}
          scale={currentScale}
          hasMoreScales={currentScaleIdx + 1 < selectedScaleKeys.length}
          isSubmitting={isSubmitting}
          onNext={advanceAfterResult}
          onReferral={handlePsychologistReferral}
        />
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <ConfirmationStep
          completedResults={completedResults}
          onReset={resetWizard}
        />
      )}
    </div>
  )
}

/* ================================================================== */
/* STEP 0 — Welcome                                                    */
/* ================================================================== */

function WelcomeStep({
  onSelectScale,
  onSelectAll,
}: {
  onSelectScale: (key: EscalaType) => void
  onSelectAll: () => void
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={`space-y-6 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Hero section */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0F4C5C] to-[#5B8A72] shadow-lg shadow-[#0F4C5C]/20 mb-2">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-[family-name:var(--font-geist-sans)]">
          Bem-vindo ao seu Check-in<br />de Bem-Estar
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Este questionário leva cerca de 3 minutos e nos ajuda a entender como
          podemos melhorar o ambiente de trabalho.
        </p>
      </div>

      {/* Anonymity banner */}
      <AnonymityBanner variant="full" />

      {/* Scale cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-1">
          Escolha uma avaliação
        </h2>
        {SCALES.map((scale) => {
          const Icon = scale.icon
          return (
            <button
              key={scale.key}
              onClick={() => onSelectScale(scale.key)}
              className={`
                w-full text-left p-4 sm:p-5 rounded-2xl
                bg-gradient-to-r ${scale.bgGradient}
                border border-slate-200/60
                hover:border-slate-300 hover:shadow-md
                active:scale-[0.98]
                transition-all duration-200
                group
              `}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`
                    flex items-center justify-center h-12 w-12 rounded-xl
                    bg-white shadow-sm
                    group-hover:shadow-md transition-shadow
                  `}
                >
                  <Icon className={`h-6 w-6 ${scale.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                      {scale.info.nome}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {scale.info.subtitulo}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <ClipboardList className="h-3.5 w-3.5" />
                      {scale.info.totalItens} perguntas
                    </span>
                    <span>~{scale.estimatedMinutes} min</span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Respond all button */}
      <button
        onClick={onSelectAll}
        className="
          w-full py-4 px-6 rounded-2xl
          bg-gradient-to-r from-[#0F4C5C] to-[#5B8A72]
          text-white font-semibold text-base
          shadow-lg shadow-[#0F4C5C]/20
          hover:shadow-xl hover:shadow-[#0F4C5C]/30
          active:scale-[0.98]
          transition-all duration-200
          flex items-center justify-center gap-2
        "
      >
        <ClipboardList className="h-5 w-5" />
        Responder Todos
        <span className="text-white/70 text-sm ml-1">(~5 min)</span>
      </button>
    </div>
  )
}

/* ================================================================== */
/* STEP 1 — Question                                                   */
/* ================================================================== */

function QuestionStep({
  scale,
  currentQ,
  totalQuestions,
  selectedOption,
  slideDir,
  isAnimating,
  onSelect,
  onBack,
}: {
  scale: ScaleConfig
  currentQ: number
  totalQuestions: number
  selectedOption: number | null
  slideDir: 'left' | 'right'
  isAnimating: boolean
  onSelect: (value: number) => void
  onBack: () => void
}) {
  const item = scale.items[currentQ]
  const Icon = scale.icon
  const progress = ((currentQ + 1) / totalQuestions) * 100

  return (
    <div className="space-y-5">
      {/* Top bar: back button + scale badge */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors p-1 -ml-1"
        >
          <ChevronLeft className="h-5 w-5" />
          Voltar
        </button>
        <div
          className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-gradient-to-r ${scale.bgGradient}
            text-xs font-medium ${scale.color}
          `}
        >
          <Icon className="h-3.5 w-3.5" />
          {scale.info.nome}
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Pergunta {currentQ + 1} de {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0F4C5C] to-[#6ECEDA] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Instruction (first question only) */}
      {currentQ === 0 && (
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed">
            {scale.info.instrucao}
          </p>
        </div>
      )}

      {/* Anonymity compact banner */}
      <AnonymityBanner variant="compact" />

      {/* Question card */}
      <div
        className={`
          transition-all duration-200 ease-out
          ${isAnimating
            ? slideDir === 'left'
              ? 'opacity-0 -translate-x-4'
              : 'opacity-0 translate-x-4'
            : 'opacity-100 translate-x-0'
          }
        `}
      >
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 sm:p-6 mb-4">
          <p className="text-lg sm:text-xl font-medium text-slate-800 leading-relaxed">
            {item.question}
          </p>
        </div>

        {/* Option cards */}
        <div className="space-y-2.5">
          {item.options.map((option) => {
            const isSelected = selectedOption === option.value
            return (
              <button
                key={option.value}
                onClick={() => onSelect(option.value)}
                disabled={isAnimating}
                className={`
                  w-full text-left min-h-[52px] px-4 py-3.5 rounded-xl
                  border-2 transition-all duration-200
                  flex items-center justify-between gap-3
                  active:scale-[0.98]
                  ${
                    isSelected
                      ? 'border-[#0F4C5C] bg-[#0F4C5C]/5 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }
                `}
              >
                <span
                  className={`
                    text-base font-medium
                    ${isSelected ? 'text-[#0F4C5C]' : 'text-slate-700'}
                  `}
                >
                  {option.label}
                </span>
                {isSelected && (
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0F4C5C] flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/* STEP 2 — Results                                                    */
/* ================================================================== */

function ResultStep({
  result,
  scale,
  hasMoreScales,
  isSubmitting,
  onNext,
  onReferral,
}: {
  result: ScaleResult
  scale: ScaleConfig
  hasMoreScales: boolean
  isSubmitting: boolean
  onNext: () => void
  onReferral: () => void
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const risk = RISK_STYLES[result.nivel_risco]
  const isHighRisk = result.nivel_risco === 'alto' || result.nivel_risco === 'severo'
  const Icon = scale.icon

  const scorePercent = Math.round(
    (result.pontuacao / scale.info.pontuacaoMaxima) * 100
  )

  return (
    <div className={`space-y-6 transition-all duration-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Scale badge */}
      <div className="flex justify-center">
        <div
          className={`
            inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full
            bg-gradient-to-r ${scale.bgGradient}
            text-sm font-medium ${scale.color}
          `}
        >
          <Icon className="h-4 w-4" />
          {scale.info.nome} — Resultado
        </div>
      </div>

      {/* Score circle */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {/* Background ring */}
          <svg className="h-36 w-36 -rotate-90" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="62"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-100"
            />
            <circle
              cx="72"
              cy="72"
              r="62"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${scorePercent * 3.9} 390`}
              className={risk.text}
              style={{
                transition: 'stroke-dasharray 1s ease-out',
              }}
            />
          </svg>
          {/* Center score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-800">
              {result.pontuacao}
            </span>
            <span className="text-xs text-slate-400">
              de {scale.info.pontuacaoMaxima}
            </span>
          </div>
        </div>

        {/* Risk badge */}
        <div
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full
            ${risk.bg} ${risk.border} border
          `}
        >
          <div className={`h-2.5 w-2.5 rounded-full ${risk.dot}`} />
          <span className={`text-sm font-semibold ${risk.text}`}>
            Risco {risk.label}
          </span>
        </div>
      </div>

      {/* Description card */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-3">
        <h3 className="font-semibold text-slate-800">{result.descricao}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {result.orientacao}
        </p>
      </div>

      {/* High risk actions */}
      {isHighRisk && (
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200/60 p-5 space-y-4">
          <p className="text-sm text-rose-700 leading-relaxed">
            Sabemos que não é fácil, e reconhecemos sua coragem em responder com
            sinceridade. Lembre-se: buscar ajuda é um ato de força, não de
            fraqueza.
          </p>
          <button
            onClick={onReferral}
            className="
              w-full py-3.5 px-4 rounded-xl
              bg-gradient-to-r from-rose-500 to-pink-500
              text-white font-semibold text-sm
              shadow-lg shadow-rose-200/50
              hover:shadow-xl active:scale-[0.98]
              transition-all duration-200
              flex items-center justify-center gap-2
            "
          >
            <Heart className="h-5 w-5" />
            Quero conversar com um psicólogo
          </button>
          <p className="text-xs text-rose-400 text-center">
            Isso cria um encaminhamento anônimo. Nenhum dado pessoal é
            compartilhado.
          </p>
          <button
            onClick={onNext}
            className="w-full text-center text-sm text-slate-500 hover:text-slate-700 transition-colors py-2"
          >
            Agora não, obrigado(a)
          </button>
        </div>
      )}

      {/* Navigation */}
      {!isHighRisk && (
        <button
          onClick={onNext}
          disabled={isSubmitting}
          className="
            w-full py-4 px-6 rounded-2xl
            bg-gradient-to-r from-[#0F4C5C] to-[#5B8A72]
            text-white font-semibold text-base
            shadow-lg shadow-[#0F4C5C]/20
            hover:shadow-xl active:scale-[0.98]
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          {isSubmitting ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : hasMoreScales ? (
            <>
              Próxima avaliação
              <ArrowRight className="h-5 w-5" />
            </>
          ) : (
            <>
              Finalizar
              <Check className="h-5 w-5" />
            </>
          )}
        </button>
      )}
    </div>
  )
}

/* ================================================================== */
/* STEP 3 — Confirmation                                               */
/* ================================================================== */

function ConfirmationStep({
  completedResults,
  onReset,
}: {
  completedResults: { key: EscalaType; result: ScaleResult }[]
  onReset: () => void
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className={`space-y-6 text-center transition-all duration-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Animated check mark */}
      <div className="flex justify-center pt-6">
        <div
          className={`
            h-24 w-24 rounded-full
            bg-gradient-to-br from-[#81B29A] to-[#5B8A72]
            flex items-center justify-center
            shadow-xl shadow-[#5B8A72]/30
            transition-all duration-700
            ${mounted ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
          `}
        >
          <CheckCircle2 className="h-12 w-12 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">
          Resposta enviada com sucesso!
        </h1>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Sua resposta foi registrada de forma anônima e confidencial.
        </p>
      </div>

      {/* Summary of completed scales */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Resumo
        </h3>
        <div className="space-y-3">
          {completedResults.map(({ key, result }) => {
            const scale = SCALES.find((s) => s.key === key)!
            const risk = RISK_STYLES[result.nivel_risco]
            const Icon = scale.icon
            return (
              <div
                key={key}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${scale.color}`} />
                  <span className="font-medium text-slate-700 text-sm">
                    {scale.info.nome}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-600">
                    {result.pontuacao}/{scale.info.pontuacaoMaxima}
                  </span>
                  <div
                    className={`
                      inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
                      ${risk.bg} ${risk.border} border text-xs font-medium ${risk.text}
                    `}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full ${risk.dot}`} />
                    {risk.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Back button */}
      <button
        onClick={onReset}
        className="
          w-full py-4 px-6 rounded-2xl
          bg-gradient-to-r from-[#0F4C5C] to-[#5B8A72]
          text-white font-semibold text-base
          shadow-lg shadow-[#0F4C5C]/20
          hover:shadow-xl active:scale-[0.98]
          transition-all duration-200
          flex items-center justify-center gap-2
        "
      >
        Voltar ao início
      </button>
    </div>
  )
}
