import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { supa } from '../supabase'
import { ExerciseTemplate } from './supa-types'
import { chatJson0 } from './supa-functions'
import { Messages } from './chat/Chat'
import { AdvancedExerciseName } from './exercises/advancedExercises'

const Context = createContext<{
  setMessages: (messages: Messages) => void
  chatExercises: ExerciseTemplate[] | undefined
  recs: Recs | undefined
  setRecs: (recs: Recs) => void
  recsDone: Set<string>
  setRecsDone: (recsDone: Set<string>) => void
}>(undefined as never)
export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Messages>()
  const [chatExercises, setChatExercises] = useState<ExerciseTemplate[]>()
  const [recs, setRecs] = useState<Recs>()
  const [recsDone, setRecsDone] = useState(new Set<string>())
  useEffect(() => {
    const fetchTemplates = async () => {
      const { data } = await supa.from('exercise_templates').select('*')
      if (data) setChatExercises(data)
    }
    fetchTemplates()
  }, [])
  const getRecs = async (
    messages: Messages,
    chatExercises: ExerciseTemplate[]
  ) => {
    const content = `
      Given that the tutoring session has gone: ${messages},
      From this list: ${chatExercises.map((ex) => ex.name)}, 
      ${
        ''
        // JSON.stringify(
        //   advancedExercisesWithTypes)
      }, select five items in JSON format like {selectedItems:string[]}`

    const { data } = await chatJson0([
      {
        role: 'system',
        content,
      },
    ])
    const exRecs: string[] = JSON.parse(data).selectedItems
    const next = []
    for (const exRec of exRecs) {
      // if (exRec.type == 'chat') {
      const { data: ex } = await supa
        .from('exercise_templates')
        .select()
        .eq('name', exRec)
        .single()
      if (ex) next.push({ type: 'chat', ...ex } as const)
      // } else if (exRec.type == 'advanced') {
      //   next.push({ type: 'advanced', name: exRec.name } as const)
      // }
    }
    setRecs(next)
    setRecsDone(new Set())
  }
  useEffect(() => {
    if (messages && chatExercises) getRecs(messages, chatExercises)
  }, [messages, chatExercises])
  return (
    <Context.Provider
      value={{
        setMessages,
        chatExercises,
        recs,
        setRecs,
        recsDone,
        setRecsDone,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export const useChatExercises = () => {
  return useContext(Context).chatExercises
}
type Recs = (ChatItem | AdvancedItem)[]
type ChatItem = { type: 'chat'; id: number; name: string; description: string }
type AdvancedItem = { type: 'advanced'; name: AdvancedExerciseName }
export const useExercises = () => {
  return useContext(Context)
}
