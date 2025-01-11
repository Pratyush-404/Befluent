import { ErrorCorrect } from './types/errorCorrect'
import { useState } from 'react'
import { TTS } from '../../tts'

export const Pronunciation = () => {
  const [audioSrc, setAudioSrc] = useState('')
  return (
    <ErrorCorrect
      instruction={'Is the pronunciation of the word correct?'}
      dataPrompt={`Description:
          word: a random vocabulary word based on the user's interests.
          wordPronounced: a pronunciation of the word.
          wordMispronounced: a mispronunciation of the word.
          
          You return JSON: {
            "word": string,
            "wordPronounced": string,
            "wordMispronounced": string,
          }`}
      dataConform={(data) => {
        const useCorrect = Math.random() > 0.5
        const spokenWord = useCorrect ? data.word : data.wordMispronounced
        TTS(spokenWord).then(setAudioSrc)
        return {
          sentence: data.word,
          valid: useCorrect,
          explanation: 'The correct pronunciation is ' + data.wordPronounced,
        }
      }}
    >
      <audio src={audioSrc} controls />
    </ErrorCorrect>
  )
}
