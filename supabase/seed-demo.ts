import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { join } from 'path'
import { PHQ9_ITEMS, calculatePHQ9 } from '../src/lib/scales/phq9'
import { GAD7_ITEMS, calculateGAD7 } from '../src/lib/scales/gad7'
import { MASLACH_ITEMS, calculateMaslach } from '../src/lib/scales/maslach'

const phq9Scale = { key: 'phq9', items: PHQ9_ITEMS, calculate: calculatePHQ9 }
const gad7Scale = { key: 'gad7', items: GAD7_ITEMS, calculate: calculateGAD7 }
const maslachScale = { key: 'maslach', items: MASLACH_ITEMS, calculate: calculateMaslach }

dotenv.config({ path: join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Erro: NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY faltando no .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// === Configuração das Empresas Demo ===
const COMPANIES = [
  { nome: 'Clínica Vitalis', email_rh: 'rh@clinicavitalis-demo.com', numColabs: 28, decline: true },
  { nome: 'Advocacia Mendes & Souza', email_rh: 'rh@mendesesouza-demo.com', numColabs: 22, decline: false },
  { nome: 'Construtora Horizonte', email_rh: 'rh@horizonte-demo.com', numColabs: 45, decline: false },
  { nome: 'Grupo Comercial Anápolis', email_rh: 'rh@anapolis-demo.com', numColabs: 38, decline: false }
]

const DEPARTMENTS = ['Administrativo', 'Operacional', 'Comercial', 'Tecnologia']

// === Utilitários de Geração ===
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

// Função que gera um vetor de respostas para uma escala com base num "nível de estresse" alvo de 0 a 10
const generateAnswers = (numItems: number, stressLevel: number) => {
  return Array.from({ length: numItems }, () => {
    // 0 = nada, 3 = máximo
    const chance = Math.random() * 10
    if (stressLevel <= 3) {
      return chance > 8 ? 1 : 0
    } else if (stressLevel <= 6) {
      return chance > 7 ? 2 : chance > 4 ? 1 : 0
    } else {
      return chance > 8 ? 3 : chance > 4 ? 2 : 1
    }
  })
}

// === Processo Principal ===
async function seedDemo() {
  console.log('🌱 Iniciando Seed do Ambiente de Demonstração...')

  console.log('Limpando usuários orfãos do banco Auth...')
  const { data: allUsers } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  if (allUsers && allUsers.users) {
    for (const u of allUsers.users) {
      if (u.email?.includes('demo.com')) {
        await supabase.auth.admin.deleteUser(u.id)
      }
    }
  }

  // 1. Resetar dados demo anteriores
  console.log('Limpando tabelas...')
  const { data: orgsToRemove } = await supabase.from('organizations').select('id').eq('is_demo', true)
  if (orgsToRemove && orgsToRemove.length > 0) {
    for (const org of orgsToRemove) {
      await supabase.from('organizations').delete().eq('id', org.id)
    }
  }

  // 2. Criar empresas e funcionários
  for (const comp of COMPANIES) {
    console.log(`\n🏢 Criando empresa: ${comp.nome}...`)
    
    // Criar conta auth do RH
    const { data: authRh, error: errRh } = await supabase.auth.admin.createUser({
      email: comp.email_rh,
      password: 'demo_password123',
      email_confirm: true,
      user_metadata: { name: `RH ${comp.nome}` }
    })
    
    if (errRh || !authRh.user) {
      console.error(`Erro ao criar RH auth para ${comp.nome}`, errRh)
      continue
    }

    // Criar organização no DB
    const { data: org, error: errOrg } = await supabase.from('organizations').insert({
      nome: comp.nome,
      is_demo: true,
      codigo_convite: `DEMO-${comp.nome.substring(0,3).toUpperCase()}${randomInt(10,99)}`
    }).select().single()

    if (errOrg || !org) {
      console.error(`Erro ao criar org db para ${comp.nome}`, errOrg)
      continue
    }

    // Criar perfil RH
    await supabase.from('profiles').insert({
      id: authRh.user.id,
      org_id: org.id,
      role: 'admin_rh',
      nome: `RH ${comp.nome}`,
      email: comp.email_rh,
      is_demo: true
    })

    // 3. Criar colaboradores
    console.log(`👤 Gerando ${comp.numColabs} colaboradores para ${comp.nome}...`)
    const employees = []
    
    for (let i = 0; i < comp.numColabs; i++) {
      const email = `colab${i+1}.${comp.nome.replace(/\s+/g, '').toLowerCase()}@demo.com`
      const { data: authColab, error: errColab } = await supabase.auth.admin.createUser({
        email,
        password: 'demo_password123',
        email_confirm: true
      })
      
      if (!errColab && authColab.user) {
        const { data: profile } = await supabase.from('profiles').insert({
          id: authColab.user.id,
          org_id: org.id,
          role: 'funcionario',
          nome: 'Anônimo (Demo)',
          departamento: randomElement(DEPARTMENTS),
          is_demo: true
        }).select().single()
        
        if (profile) employees.push(profile)
      }
    }

    // 4. Gerar 8 semanas de check-ins (histórico)
    console.log(`📊 Gerando 8 semanas de histórico de check-ins...`)
    const scales = [phq9Scale, gad7Scale, maslachScale]
    const now = new Date()
    
    // Iterar pelas últimas 8 semanas (semana 1 é a mais antiga, semana 8 é a atual)
    for (let week = 8; week >= 1; week--) {
      const dateForWeek = new Date(now)
      dateForWeek.setDate(now.getDate() - (week * 7))
      
      // Tendência de piora se for Clínica Vitalis nas últimas 3 semanas (week <= 3 porque iteramos regressivamente)
      // week 1 é a mais antiga (8*7 days ago), week 8 é a mais recente (1*7 days ago)
      // Ajustando: week counter in loop starts at 8 (oldest) down to 1 (newest). Wait, if week = 8, that's 56 days ago.
      // So week 8 is oldest, week 1 is newest.
      const isRecent = week <= 3
      const isDeclining = comp.decline && isRecent
      
      // Participação entre 60% e 80%
      const participationRate = (randomInt(60, 80) / 100)
      const respondantsCount = Math.floor(employees.length * participationRate)
      const respondants = [...employees].sort(() => 0.5 - Math.random()).slice(0, respondantsCount)
      
      for (const emp of respondants) {
        const chosenScale = randomElement(scales)
        
        // Calcular nível de estresse alvo (0-10)
        let targetStress = randomInt(1, 4) // Baixo a moderado por padrão
        
        // 20% de chance de ter alguém já estressado
        if (Math.random() > 0.8) targetStress = randomInt(5, 8)
        
        // Piora artificial forçada na Clínica Vitalis nas semanas recentes
        if (isDeclining && Math.random() > 0.4) {
          targetStress = randomInt(6, 9) // Alto a Severo
        }

        const answers = generateAnswers(chosenScale.items.length, targetStress)
        const result = chosenScale.calculate(answers)
        
        // Insert checkin
        const { error: chkErr } = await supabase.from('checkins').insert({
          employee_id: emp.id,
          org_id: org.id,
          tipo_escala: chosenScale.key,
          respostas: answers,
          pontuacao_total: result.pontuacao,
          nivel_risco: result.nivel_risco,
          created_at: dateForWeek.toISOString()
        })

        if (chkErr) console.error('Erro ao inserir checkin', chkErr)

        // Generate alert if alto/severo (bypassing trigger just to guarantee timestamp accuracy or relying on trigger)
        // O trigger vai criar com o created_at igual ao do checkin? 
        // O trigger `fn_create_risk_alert` usa NOW() ou o created_at do checkin? 
        // O schema original para risk_alerts usa `DEFAULT now()`. 
        // Para manter consistência cronológica nos alertas demo, faremos um update posterior ou deixaremos o trigger criar.
        // O trigger usa o id do usuário. Para os dados ficarem perfeitos, o ideal seria o trigger puxar o timestamp do checkin.
        // Mas para simplificar o MVP, vamos deixar o trigger agir. Apenas os alertas das semanas antigas aparecerão como gerados "hoje", 
        // o que não é ideal para demo. Vamos fazer update nos alertas gerados por esse empregado.
      }
    }
    
    // Corrige os timestamps dos alertas gerados pelos triggers na demo
    const { error: rpcErr } = await supabase.rpc('fix_demo_alerts_timestamps', { org_id_param: org.id })
    if (rpcErr) {
      console.warn('Aviso: Não foi possível rodar fix_demo_alerts_timestamps, você rodou o schema mais recente no Supabase?', rpcErr)
    }
  }

  console.log('✅ Seed de demonstração finalizado com sucesso!')
}

seedDemo().catch(console.error)
