import { supa } from '../supabase'
import { Messages } from './chat/Chat'

export const chat = async (system: string): Promise<string> => {
  const r = await supa.functions.invoke('chat', {
    body: [
      {
        role: 'system',
        content: system,
      },
    ],
  })
  return r.data
}
export const chatJson = async (system: string) => {
  const r = await supa.functions.invoke('chat-json', {
    body: {
      messages: [
        {
          role: 'system',
          content: system,
        },
      ],
    },
  })
  return JSON.parse(r.data)
}

export const chatJson0 = async (messages: Messages, temperature?: number) =>
  await supa.functions.invoke('chat-json', {
    body: { messages, temperature },
  })
export const chatJson1 = async (messages: Messages, temperature?: number) => {
  const r = await supa.functions.invoke('chat-json', {
    body: { messages, temperature },
  })
  return JSON.parse(r.data)
}
export const transcribe = async (blob: Blob) => {
  return await supa.functions.invoke<{
    task: string
    language: string
    duration: number
    text: string
    segments: Array<{
      id: number
      seek: number
      start: number
      end: number
      text: string
      tokens: number[]
      temperature: number
      avg_logprob: number
      compression_ratio: number
      no_speech_prob: number
    }>
  }>('transcribe', {
    body: blob,
  })
}
