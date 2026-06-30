import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(process.cwd(), '.env.local') })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function check() {
  const { data: users, error } = await supabase.auth.admin.listUsers()
  if (users) {
    users.users.slice(0, 10).forEach(u => console.log(u.email))
  }
}
check()
