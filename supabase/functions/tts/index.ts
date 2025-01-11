import { corsHeaders } from '../cors.ts'
import { openai } from '../openai.ts'

Deno.serve(async (req) => {
  const text = new URL(req.url).searchParams.get('text')
  if (!text) {
    return new Response('text is required', {
      status: 400,
      headers: corsHeaders,
    })
  }
  const r = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input: text,
  })
  return new Response(r.body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      ...corsHeaders,
    },
  })
})
