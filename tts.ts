import { supa } from './supabase'

/**
 * This function returns an Object URL representing the blob
 * @param text - The text to be converted to speech
 * @returns Promise<string> - A promise that resolves to an Object URL
 */
export const TTS = async (text: string) => {
  const r = await supa.functions.invoke(`tts?text=${text}`)
  const blob = await r.data
  return URL.createObjectURL(blob)
}

export const tts = async (text: string) => {
  const url = await TTS(text)
  const audio = new Audio(url)
  await audio.play()
}
