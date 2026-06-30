'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, ChevronRight, ChevronLeft, Play, Shield, BarChart3, Heart, Users } from 'lucide-react'
import { Button } from './button'

import Image from 'next/image'

const slides = [
  {
    icon: <X className="w-12 h-12 text-[#0F4C5C]" />,
    title: 'Apresentação MindWork',
    description: 'A solução definitiva para prever, intervir e monitorar a saúde mental corporativa.',
    image: null
  },
  {
    icon: <Shield className="w-12 h-12 text-[#81B29A]" />,
    title: 'Anonimato Garantido (Mobile-First)',
    description: 'Plataforma intuitiva e 100% anônima para que colaboradores façam check-ins de saúde mental com total segurança.',
    image: '/images/checkin_func.jpeg',
    imageAlt: 'Check-in do Funcionário MindWork'
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-[#F2CC8F]" />,
    title: 'Inteligência para o RH',
    description: 'Monitoramento em tempo real do bem-estar da empresa, com mapas de risco e identificação proativa de setores vulneráveis.',
    image: '/images/dashboard_rh.jpeg',
    imageAlt: 'Dashboard de RH MindWork'
  },
  {
    icon: <Heart className="w-12 h-12 text-[#E07A5F]" />,
    title: 'Intervenção Precoce (Psicólogos)',
    description: 'Acompanhamento integrado com profissionais, garantindo privacidade e suporte direto sem expor dados ao RH.',
    image: '/images/painel_psicologo.jpeg',
    imageAlt: 'Painel do Psicólogo MindWork'
  }
]

export function PresentationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  if (!isOpen) return null

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(curr => curr + 1)
    } else {
      startDemo()
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(curr => curr - 1)
  }

  const startDemo = async () => {
    setLoading(true)
    // Para simplificar a demo, vamos direcionar para a tela de login que já tem o botão de auto-login
    router.push('/login')
  }

  const slide = slides[currentSlide]

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F4C5C]/90 backdrop-blur-sm p-4">
        <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col relative max-h-[90vh]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
            {/* Texto */}
            <div className={`p-8 sm:p-12 flex flex-col justify-center text-left ${slide.image ? 'lg:w-1/2' : 'w-full items-center text-center'} min-h-[300px]`}>
              {!slide.image && (
                <div className="mb-6 p-4 rounded-full bg-slate-50 border border-slate-100 shadow-inner">
                  {slide.icon}
                </div>
              )}
              <h2 className="text-3xl font-outfit font-bold text-[#0A3540] mb-4">
                {slide.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {slide.description}
              </p>
            </div>

            {/* Imagem (se houver) */}
            {slide.image && (
              <div className="lg:w-1/2 bg-slate-100 p-6 flex flex-col items-center justify-center border-l border-slate-200">
                <p className="text-sm text-slate-500 mb-3 font-semibold uppercase tracking-wider">Clique na imagem para expandir</p>
                <div 
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-white cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => setZoomedImage(slide.image!)}
                >
                  <Image 
                    src={slide.image} 
                    alt={slide.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 border-t p-6 flex items-center justify-between mt-auto">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[#0F4C5C]' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
            </Button>
            <Button 
              className="bg-[#0F4C5C] hover:bg-[#1A6B7A] text-white" 
              onClick={handleNext}
              loading={loading}
            >
              {currentSlide === slides.length - 1 ? 'Acessar App' : 'Próximo'} 
              {currentSlide < slides.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
    {/* Fullscreen Image Zoom */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-full">
            <Image 
              src={zoomedImage} 
              alt="Zoomed preview" 
              fill 
              className="object-contain"
            />
            <button 
              className="absolute top-0 right-0 p-3 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all m-4"
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null) }}
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
