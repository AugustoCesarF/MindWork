import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(process.cwd(), '.env.local') })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function createPsi() {
  const { data: authUser } = await supabase.auth.admin.createUser({
    email: 'psicologo@mindwork-demo.com',
    password: 'demo_password123',
    email_confirm: true,
    user_metadata: { name: 'Dr. Roberto (Demo)' }
  })
  
  if (authUser.user) {
    await supabase.from('profiles').insert({
      id: authUser.user.id,
      role: 'psicologo',
      nome: 'Dr. Roberto (Demo)',
      email: 'psicologo@mindwork-demo.com',
      is_demo: true
    })
    console.log('Psicólogo criado!')
  }
}
createPsi()
