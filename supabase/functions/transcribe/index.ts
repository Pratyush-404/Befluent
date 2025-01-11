import { openai } from '../openai.ts'
import { corsHeaders } from '../cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (!req.body) throw new Error('no body')

  const blob = await req.blob()
  const file = new File([blob], 'file.webm')
  const transcript = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'],
    language: 'en',
  })

  return Response.json(transcript, {
    headers: corsHeaders,
  })
})
