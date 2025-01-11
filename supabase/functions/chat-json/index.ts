import { corsHeaders } from '../cors.ts'
import { openai } from '../openai.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  const { messages, temperature } = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    response_format: { type: 'json_object' },
    temperature,
  })
  return new Response(response.choices[0].message.content, {
    headers: corsHeaders,
  })
})
