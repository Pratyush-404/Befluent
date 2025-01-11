import { MultipleChoice } from './types/multipleChoice'

export const Spelling = () => {
  return (
    <MultipleChoice
      instruction={'Select the correct spelling.'}
      dataPrompt={`You provide two versions of a word / phrase. 
        One version is spelled incorrectly. 
        The other version is spelled correctly. 
        Example: { "incorrectSpelling": "werd phraze", "correctSpelling": "word phrase" }. 
        You return JSON like { "incorrectSpelling": string, "correctSpelling": string}`}
      dataConform={(data: {
        incorrectSpelling: string
        correctSpelling: string
      }) => ({
        sentence: '',
        incorrectOption: data.incorrectSpelling,
        correctOption: data.correctSpelling,
      })}
    />
  )
}
