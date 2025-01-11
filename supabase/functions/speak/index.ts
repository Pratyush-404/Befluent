import { getChatJson, openai } from '../openai.ts'
import { corsHeaders } from '../cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (!req.body) throw new Error('no body')
  const formData = await req.formData()
  const blob = formData.get('blob') as Blob
  const file = new File([blob], 'file.' + blob.type.split('/')[1])
  const transcript = (
    await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    })
  ).text

  const data = await getData(transcript)

  return Response.json(
    { transcript, ...data },
    {
      headers: corsHeaders,
    }
  )
})

async function getData(transcript: string): Promise<object> {
  // const match = response?.match(/(a1|a2|b1|b2|c1|c2)/i)?.[0].toLowerCase()
  return await getChatJson(`
    User transcript: ${transcript}
    Level: You classify the user into a CEFR standard (Common European Framework of Reference for Languages) level for English. You answer with one of (a1, a2, b1, b2, c1, c2).
    Feedback: English proficiency feedback based on the user's speech. You answer with a string.
    Improvement notes: Suggestions for the user to improve their English. You answer with a string.
    return JSON format like { 
      "level": "a1" | "a2" | "b1" | "b2" | "c1" | "c2"
      "feedback": string
      "improvement notes": string
    }
  `)
}
