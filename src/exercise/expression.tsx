import { ErrorCorrect } from './types/errorCorrect'

export const Expression = () => {
  return (
    <ErrorCorrect
      instruction={'Is the expression valid?'}
      dataPrompt={`Exercise: Expression
          Exercise Description:
          Master tricky everyday phrases and sayings
          Learn to avoid errors in your writing
          
          Question: Is the expression valid?
          
          Example 1:
          Sentence: The source was willing to speak only of the record to the Washington Post reporter.
          Valid: false
          Expression Explanation: It should be "off the record."
          
          Example 2:
          Sentence: A pickpocket on the train from Munich left me high in dry.
          Valid: false
          Expression Explanation: It should be "high and dry." "High in dry" is not a phrase. "High and dry" means being left stranded.
          
          You return JSON like: { "sentence": string, "valid": boolean, "explanation": string}
        `}
      dataConform={(data) => ({
        sentence: data.sentence,
        valid: data.valid,
        explanation: data.explanation,
      })}
    />
  )
}
