import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ClipboardCheck, BarChart3, Heart, Shield, CheckCircle2, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-md">
              <Heart className="h-5 w-5" />
            </div>
            <span className="font-outfit text-xl font-bold text-white">MindWork</span>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro-empresa">
              <Button className="bg-white text-[#0F4C5C] hover:bg-slate-100">
                Cadastrar Empresa
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-[#0A3540] via-[#0F4C5C] to-[#1A6B7A] pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-32">
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(110,206,218,0.15),transparent)]"></div>
          
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center slide-up">
              <h1 className="font-outfit text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Cuide do bem-estar mental da sua equipe
              </h1>
              <p className="mt-6 text-lg leading-8 text-teal-100">
                O MindWork monitora a saúde emocional dos seus colaboradores de forma anônima e segura, ajudando sua empresa a prevenir o burnout e criar um ambiente de trabalho mais saudável.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/cadastro-empresa">
                  <Button size="lg" className="bg-white text-[#0F4C5C] hover:bg-slate-100 text-base h-14 px-8 rounded-full shadow-xl shadow-teal-900/20">
                    Começar Gratuitamente
                  </Button>
                </Link>
                <Link href="/login" className="text-sm font-semibold leading-6 text-white hover:text-teal-200 transition-colors flex items-center">
                  Já tenho uma conta <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-outfit text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Como funciona o MindWork?
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Uma plataforma simples, segura e eficaz para monitoramento contínuo.
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 font-outfit text-xl font-semibold leading-7 text-slate-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                      <ClipboardCheck className="h-6 w-6 text-teal-700" />
                    </div>
                    1. Check-in Anônimo
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">Funcionários respondem questionários curtos e validados cientificamente (PHQ-9, GAD-7, Maslach) pelo celular. Nenhuma resposta é vinculada ao nome ou e-mail.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 font-outfit text-xl font-semibold leading-7 text-slate-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                      <BarChart3 className="h-6 w-6 text-amber-700" />
                    </div>
                    2. Dashboard Inteligente
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">O RH visualiza dados agregados de bem-estar por departamento. Identifique áreas com maior risco de burnout e ansiedade para atuar de forma preventiva.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 font-outfit text-xl font-semibold leading-7 text-slate-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                      <Heart className="h-6 w-6 text-orange-700" />
                    </div>
                    3. Suporte Profissional
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">Funcionários classificados com risco alto podem solicitar, com um clique e de forma sigilosa, o contato de um psicólogo parceiro da plataforma.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Anonymity Section */}
        <div className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h2 className="max-w-2xl font-outfit text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl xl:col-auto">
                O anonimato é a base da nossa confiança
              </h2>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-slate-600">
                  Sabemos que a honestidade nas respostas só existe com segurança psicológica. A arquitetura do MindWork foi construída do zero para garantir que o RH nunca veja quem respondeu o quê.
                </p>
                <div className="mt-10 flex flex-col gap-y-4">
                  <div className="flex gap-x-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-teal-600" />
                    <span className="text-slate-600"><strong className="font-semibold text-slate-900">Códigos Anônimos.</strong> Ao se cadastrar, cada funcionário recebe um ID aleatório. Nomes não são salvos junto às respostas.</span>
                  </div>
                  <div className="flex gap-x-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-teal-600" />
                    <span className="text-slate-600"><strong className="font-semibold text-slate-900">Agregação de Dados.</strong> Gráficos só mostram dados de um departamento se houver um número mínimo de respondentes.</span>
                  </div>
                  <div className="flex gap-x-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-teal-600" />
                    <span className="text-slate-600"><strong className="font-semibold text-slate-900">Sigilo Profissional.</strong> Solicitações de terapia vão direto para o psicólogo, sem passar pelo painel da empresa.</span>
                  </div>
                </div>
              </div>
              <div className="mt-10 xl:col-auto xl:row-span-2 xl:mt-0 flex items-center justify-center lg:justify-end">
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 shadow-2xl">
                  <div className="absolute inset-2 rounded-full bg-white/20 backdrop-blur-sm"></div>
                  <Shield className="relative z-10 h-32 w-32 text-white drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 to-[#0F4C5C] px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
              <h2 className="mx-auto max-w-2xl font-outfit text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Pronto para transformar o clima da sua empresa?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Cadastre sua empresa em menos de 2 minutos e gere seu primeiro código de convite para a equipe.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/cadastro-empresa">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white font-semibold h-14 px-8 rounded-full shadow-lg">
                    Começar Agora — É Grátis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-teal-600" />
              <span className="font-outfit text-lg font-bold text-slate-900">MindWork</span>
            </div>
            <p className="mt-4 text-center text-sm leading-5 text-slate-500 md:mt-0">
              &copy; 2024 MindWork. Tecnologia para Saúde Mental Corporativa. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
