import { corsHeaders } from '../cors.ts'
import { getSupaAdmin, getSupaAnon } from '../supa.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  const supaAnon = getSupaAnon(req.headers.get('Authorization')!)
  const {
    data: { user },
  } = await supaAnon.auth.getUser()
  const supaAdmin = getSupaAdmin()
  if (user?.id) {
    await supaAdmin.auth.admin.deleteUser(user.id)
  }
  return new Response('ok', { headers: corsHeaders })
})
