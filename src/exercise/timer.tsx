import { useEffect, useState } from 'react'
import { CircularProgressBar } from '../circularProgressBar'

export const Timer = ({
  setFeedback,
  newQuestion,
}: {
  setFeedback: (f: string) => void
  newQuestion: boolean
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds)
  useEffect(() => {
    if (secondsRemaining === 0) return setFeedback('Time is up!')
    const timeout = setTimeout(() => {
      setSecondsRemaining(secondsRemaining - 1)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [secondsRemaining])
  useEffect(() => {
    if (newQuestion) setSecondsRemaining(initialSeconds)
  }, [newQuestion])
  return (
    <CircularProgressBar
      remaining={secondsRemaining}
      total={initialSeconds}
      color={'warning'}
    />
  )
}
const initialSeconds = 30
