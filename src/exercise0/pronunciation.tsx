import { Speak } from '../chat/Speak'
import { useEffect, useState } from 'react'
import { IonProgressBar } from '@ionic/react'
import { Listen } from './listen'

export const Pronunciation = ({
  sentence,
  word,
}: {
  sentence: string
  word: string
}) => {
  const [score, setScore] = useState<number>(Math.round(Math.random() * 70))
  const [pieces, setPieces] = useState<[string, number][]>()
  useEffect(() => {
    setPieces(
      word
        .split('')
        .map((piece) => [piece, Math.round(Math.random() * 2 * score)])
    )
  }, [score, word])
  return (
    <>
      <h2>Pronounce the word</h2>
      <Listen word={word} />
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          marginBottom: 20,
          color: 'var(--ion-color-primary)',
        }}
      >
        {word}
      </div>
      <div
        style={{
          backgroundColor: 'white',
          padding: 30,
          borderRadius: 20,
          width: 675,
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        <div style={labelStyle}>You said on the call</div>
        <div style={{ marginBottom: 30, fontSize: 24, fontWeight: 600 }}>
          {sentence}
        </div>
        <div style={labelStyle}>It sounds like you said</div>
        <div style={{ marginBottom: 30 }}>
          {pieces?.map(([piece, score], i) => (
            <span
              key={i}
              style={{
                color: getColorForScore(score),
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              {piece}
            </span>
          ))}
        </div>
        <div style={labelStyle}>Your Score</div>
        <div style={{ fontWeight: 700, fontSize: 20, float: 'right' }}>
          {score}%
        </div>
        <IonProgressBar value={score ? score / 100 : 0} />
      </div>
      <Speak
        text={'Practice'}
        style={{
          width: 600,
          height: 80,
        }}
        onEnd={({ transcript, confidence }) => {
          if (word.toLowerCase() !== transcript.toLowerCase()) confidence /= 2
          setScore(Math.round(confidence * 100))
        }}
      />
    </>
  )
}
const getColorForScore = (score: number): string => {
  let red, green
  if (score <= 50) {
    red = 255
    green = Math.round(255 * (score / 50))
  } else {
    red = Math.round(255 * (1 - (score - 50) / 50))
    green = 255
  }
  return `rgb(${red},${green},0)`
}
const labelStyle = {
  fontWeight: 600,
  color: 'var(--ion-color-medium)',
}
