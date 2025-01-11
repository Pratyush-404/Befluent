import { MultipleChoice } from './types/multipleChoice'

export const Concision = () => {
  return (
    <MultipleChoice
      instruction={'Improve the concision of the sentence'}
      dataPrompt={`Description:
          originalSentenceWithMarks: a sentence with a phrase that can be improved for concision.
          originalMarks: the phrase that can be improved.
          incorrectMarks: the incorrect phrase. This is a different phrase from correctMarks.
          correctMarks: the correct phrase. This is a different phrase from incorrectMarks.
          
          Example:
          originalSentenceWithMarks: For his birthday, he <mark>was in receipt of</mark> many presents.
          originalMarks: was in receipt of
          incorrectMarks: included
          correctMarks: received
          
          Example:
          originalSentenceWithMarks: <mark>There may be a chance of</mark> rain tomorrow.
          originalMarks: There may be a chance of
          incorrectMarks: It will
          correctMarks: It might
          
          You return JSON: {
          "originalSentenceWithMarks": string, 
          "originalMarks": string, 
          "incorrectMarks": string, 
          "correctMarks": string 
          }`}
      dataConform={(data) => ({
        sentence: data.originalSentenceWithMarks,
        incorrectOption: data.incorrectMarks,
        correctOption: data.correctMarks,
      })}
    />
  )
}
