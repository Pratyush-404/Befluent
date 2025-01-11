import React, { useState, useEffect } from 'react'
import { supa } from '../supabase'
import { LoadingPage } from './loading-page'

type EvalContextType = {
  questionsPracticed: number
  correctPercent: number
  sessionCount: number
  read_score: number
  write_score: number
  listen_score: number
  speak_score: number | never
}
export const EvalContext = React.createContext<EvalContextType>({} as never)

export const EvalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<EvalContextType>()
  useEffect(() => {
    supa
      .from('users')
      .select(
        'correct_count, incorrect_count, session_count, read_score, write_score, listen_score, speak_score'
      )
      .single()
      .then((res) => {
        if (!res.data) return
        const total = res.data.correct_count + res.data.incorrect_count
        setData({
          questionsPracticed: total,
          correctPercent: res.data.correct_count / total,
          sessionCount: res.data.session_count,
          read_score: res.data.read_score,
          write_score: res.data.write_score,
          listen_score: res.data.listen_score,
          speak_score: res.data.speak_score,
        })
      })
  }, [])
  if (!data) return <LoadingPage />
  return <EvalContext.Provider value={data}>{children}</EvalContext.Provider>
}
export const useEval = () => React.useContext(EvalContext)
