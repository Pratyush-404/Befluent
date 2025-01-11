import { MultipleChoice } from './types/multipleChoice'

export const Clarity = () => {
  return (
    <MultipleChoice
      instruction={'Improve the clarity of the sentence'}
      dataPrompt={`Description:
          originalSentenceWithMarks: a sentence with a phrase that can be improved for clarity.
          originalMarks: the phrase that can be improved.
          incorrectMarks: the incorrect phrase.
          correctMarks: the correct phrase.
          
          Example:
          originalSentenceWithMarks: For his birthday, he <mark>got</mark> many presents.
          originalMarks: got
          incorrectMarks: found
          correctMarks: received
          
          Example:
          originalSentenceWithMarks: There is a <mark>chance</mark> of rain tomorrow.
          originalMarks: chance
          incorrectMarks: run
          correctMarks: forecast
          
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
