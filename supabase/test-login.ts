import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(process.cwd(), '.env.local') })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function check() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'colab1.construtorahorizonte@demo.com',
    password: 'demo_password123',
  })
  console.log(error ? error.message : 'Login Success! ' + data.user?.email)
}
check()
