import { ErrorCorrect } from './types/errorCorrect'

export const Diction = () => {
  return (
    <ErrorCorrect
      instruction={'Is the highlighted word valid?'}
      dataPrompt={`Examples:
          sentence: Iqra was anxious <mark>by</mark> speaking in public.
          valid: false
          explanation: Use "about" instead of "by" to show the cause of the anxiety.
          
          sentence: Steve always drives <mark>careful.</mark>
          valid: false
          explanation: Use "carefully" instead of "careful" to modify the verb "drives."
          
          sentence: Of the two cars, mine is <mark>messier.</mark>
          valid: true
          explanation: "Messier" is the comparative form of "messy."
          
          sentence: The <mark>principle</mark> reason for the delay was the weather.
          valid: true
          explanation: "Principle" is a noun meaning "a fundamental truth or proposition."
          
          You return a new example in JSON: { "sentence": string, "valid": boolean, "explanation": string}`}
      dataConform={(data) => ({
        sentence: data.sentence,
        valid: data.valid,
        explanation: data.explanation,
      })}
    />
  )
}
