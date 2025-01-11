import { corsHeaders } from '../cors.ts'
import { openai } from '../openai.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  const messages = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
  })
  return new Response(response.choices[0].message.content, {
    headers: corsHeaders,
  })
})
