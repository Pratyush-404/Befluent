import OpenAI from 'https://deno.land/x/openai@v4.56.0/mod.ts'
import {
  ResponseFormatJSONObject,
  ResponseFormatJSONSchema,
  ResponseFormatText,
} from 'https://deno.land/x/openai@v4.56.0/resources/shared.ts'
type ResponseFormat =
  | ResponseFormatText
  | ResponseFormatJSONObject
  | ResponseFormatJSONSchema
  | undefined
export const openai = new OpenAI()
export async function getChat(
  system: string,
  options: { response_format?: ResponseFormat } = {}
) {
  return (
    await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: system,
        },
      ],
      ...options,
    })
  ).choices[0].message.content
}
export async function getChatJson<T extends object>(
  system: string,
  options: { response_format?: ResponseFormat } = {}
) {
  return JSON.parse((await getChat(system, options)) || 'null') as T
}
